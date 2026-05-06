import {
  adminPageSlugToRouteKey,
  getPageForAdmin,
  syncAboutProfileImageToOtherLocales,
  writePageMarkdown,
} from "@/lib/content";
import { requireCmsAuth } from "@/lib/cms/guard";
import { pageWriteSchema } from "@/lib/cms/schemas";
import { localeFromRequest } from "@/lib/cms/query";
import { siteConfig } from "@/lib/site-config";
import {
  fetchCmsPageOverlay,
  routeKeyToDbPageKey,
  upsertCmsPageRow,
} from "@/lib/cms-pages-db";
import { getDb } from "@/lib/db";

function coercePageWriteBody(raw: unknown) {
  const o = raw as {
    meta?: { title?: string; description?: string; date?: string };
    block?: string;
    slots?: Record<string, unknown>;
  };
  const slots: Record<string, string> = {};
  for (const [k, v] of Object.entries(o.slots ?? {})) {
    slots[k] = typeof v === "string" ? v : String(v ?? "");
  }
  const title = String(o.meta?.title ?? "").trim();
  const description = String(o.meta?.description ?? "").trim();
  const dateRaw = o.meta?.date;
  return {
    block: String(o.block ?? ""),
    slots,
    meta: {
      title: title || siteConfig.seo.title,
      description:
        description ||
        title ||
        siteConfig.seo.description,
      ...(dateRaw != null && String(dateRaw).trim() !== ""
        ? { date: String(dateRaw).trim() }
        : {}),
    },
  };
}

export async function GET(
  req: Request,
  ctx: { params: Promise<{ slug: string }> },
) {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  const locale = localeFromRequest(req);
  if (!locale) {
    return Response.json({ error: "Missing or invalid ?locale=en|lv" }, { status: 400 });
  }
  const { slug } = await ctx.params;
  const routeKey = adminPageSlugToRouteKey(slug);
  if (routeKey === null) {
    return Response.json({ error: "Unknown page" }, { status: 404 });
  }
  const page = await getPageForAdmin(locale, routeKey);
  if (!page) return Response.json({ error: "Not found" }, { status: 404 });
  const url = new URL(req.url);
  const debug = url.searchParams.get("debug") === "1";
  if (!debug) return Response.json({ routeKey, ...page });

  const db = getDb();
  const pageKey = routeKeyToDbPageKey(routeKey);
  let overlay: unknown = null;
  let overlayError: string | null = null;
  if (db) {
    try {
      overlay = await fetchCmsPageOverlay(pageKey, locale);
    } catch (e) {
      overlayError = e instanceof Error ? e.message : String(e);
    }
  }

  return Response.json({
    routeKey,
    ...page,
    debug: {
      vercel: process.env.VERCEL ?? null,
      vercelEnv: process.env.VERCEL_ENV ?? null,
      dbConfigured: !!db,
      pageKey,
      overlay,
      overlayError,
    },
  });
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ slug: string }> },
) {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  const locale = localeFromRequest(req);
  if (!locale) {
    return Response.json({ error: "Missing or invalid ?locale=en|lv" }, { status: 400 });
  }
  const { slug } = await ctx.params;
  const routeKey = adminPageSlugToRouteKey(slug);
  if (routeKey === null) {
    return Response.json({ error: "Unknown page" }, { status: 404 });
  }
  const json = await req.json();
  const normalized = coercePageWriteBody(json);
  const parsed = pageWriteSchema.safeParse(normalized);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    if (process.env.VERCEL === "1") {
      const db = getDb();
      if (!db) {
        return Response.json(
          {
            error:
              "Vercel admin page saves need Postgres. Add DATABASE_URL or POSTGRES_URL (your Neon connection string) in Vercel → Settings → Environment Variables for Production, redeploy, then from your machine run: pnpm db:migrate",
          },
          { status: 503 },
        );
      }
      await upsertCmsPageRow(routeKeyToDbPageKey(routeKey), locale, {
        meta: parsed.data.meta,
        slots: parsed.data.slots,
        block: parsed.data.block,
      });
      if (routeKey === "about") {
        await syncAboutProfileImageToOtherLocales(
          locale,
          parsed.data.slots.profile_image ?? "",
        );
      }
    } else {
      writePageMarkdown(
        locale,
        routeKey,
        parsed.data.meta,
        parsed.data.block,
        parsed.data.slots,
      );
      if (routeKey === "about") {
        await syncAboutProfileImageToOtherLocales(
          locale,
          parsed.data.slots.profile_image ?? "",
        );
      }
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[admin/pages PUT]", e);
    const code = typeof e === "object" && e !== null && "code" in e ? String((e as { code: unknown }).code) : "";
    const missingTable =
      code === "42P01" || /relation ["']cms_pages["'] does not exist/i.test(msg);
    if (missingTable) {
      return Response.json(
        {
          error:
            "The cms_pages table is missing. On your computer run pnpm db:migrate using the same Neon URL as Vercel (DATABASE_URL or POSTGRES_URL), then try Save again.",
        },
        { status: 503 },
      );
    }
    return Response.json(
      {
        error: `Could not save (${msg}).`,
      },
      { status: 503 },
    );
  }
  return Response.json({ ok: true });
}

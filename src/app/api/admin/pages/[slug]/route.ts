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
  const page = getPageForAdmin(locale, routeKey);
  if (!page) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ routeKey, ...page });
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
  writePageMarkdown(locale, routeKey, parsed.data.meta, parsed.data.block, parsed.data.slots);
  if (routeKey === "about") {
    syncAboutProfileImageToOtherLocales(locale, parsed.data.slots.profile_image ?? "");
  }
  return Response.json({ ok: true });
}

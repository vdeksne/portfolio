import {
  deleteArticleFile,
  getArticle,
  writeArticleFile,
} from "@/lib/content";
import { requireCmsAuth } from "@/lib/cms/guard";
import { rejectIfVercelCmsFilesystemWrite } from "@/lib/cms/vercel-readonly-guard";
import { articleWriteSchema } from "@/lib/cms/schemas";
import { localeFromRequest } from "@/lib/cms/query";

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
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return Response.json({ error: "Invalid slug" }, { status: 400 });
  }
  const article = getArticle(locale, slug);
  if (!article) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(article);
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ slug: string }> },
) {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  const readonlyFs = rejectIfVercelCmsFilesystemWrite();
  if (readonlyFs) return readonlyFs;
  const locale = localeFromRequest(req);
  if (!locale) {
    return Response.json({ error: "Missing or invalid ?locale=en|lv" }, { status: 400 });
  }
  const { slug } = await ctx.params;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return Response.json({ error: "Invalid slug" }, { status: 400 });
  }
  const json = await req.json();
  const parsed = articleWriteSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  writeArticleFile(locale, slug, parsed.data.meta, parsed.data.body);
  return Response.json({ ok: true });
}

export async function DELETE(
  req: Request,
  ctx: { params: Promise<{ slug: string }> },
) {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  const readonlyFs = rejectIfVercelCmsFilesystemWrite();
  if (readonlyFs) return readonlyFs;
  const locale = localeFromRequest(req);
  if (!locale) {
    return Response.json({ error: "Missing or invalid ?locale=en|lv" }, { status: 400 });
  }
  const { slug } = await ctx.params;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return Response.json({ error: "Invalid slug" }, { status: 400 });
  }
  deleteArticleFile(locale, slug);
  return Response.json({ ok: true });
}

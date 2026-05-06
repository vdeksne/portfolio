import {
  writeArticleFile,
  listArticles,
} from "@/lib/content";
import { requireCmsAuth } from "@/lib/cms/guard";
import { articleCreateSchema } from "@/lib/cms/schemas";
import { localeFromRequest } from "@/lib/cms/query";

export async function GET(req: Request) {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  const locale = localeFromRequest(req);
  if (!locale) {
    return Response.json({ error: "Missing or invalid ?locale=en|lv" }, { status: 400 });
  }
  return Response.json(listArticles(locale));
}

export async function POST(req: Request) {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  const locale = localeFromRequest(req);
  if (!locale) {
    return Response.json({ error: "Missing or invalid ?locale=en|lv" }, { status: 400 });
  }
  const json = await req.json();
  const parsed = articleCreateSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  writeArticleFile(locale, parsed.data.slug, parsed.data.meta, parsed.data.body);
  return Response.json({ ok: true, slug: parsed.data.slug });
}

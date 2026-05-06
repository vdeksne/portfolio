import {
  listProjectRows,
  writeProjectFile,
  type Project,
} from "@/lib/content";
import { requireCmsAuth } from "@/lib/cms/guard";
import { projectSchema } from "@/lib/cms/schemas";
import { localeFromRequest } from "@/lib/cms/query";
import * as z from "zod";

const createBodySchema = z.object({
  id: z.string().regex(/^[a-z0-9][a-z0-9-]{0,120}$/i),
  project: projectSchema,
});

export async function GET(req: Request) {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  const locale = localeFromRequest(req);
  if (!locale) {
    return Response.json({ error: "Missing or invalid ?locale=en|lv" }, { status: 400 });
  }
  return Response.json(listProjectRows(locale));
}

export async function POST(req: Request) {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  const locale = localeFromRequest(req);
  if (!locale) {
    return Response.json({ error: "Missing or invalid ?locale=en|lv" }, { status: 400 });
  }
  const json = await req.json();
  const parsed = createBodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const id = parsed.data.id.toLowerCase();
  writeProjectFile(locale, id, parsed.data.project as Project);
  return Response.json({ ok: true, id });
}

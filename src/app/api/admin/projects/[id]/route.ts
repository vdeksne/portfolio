import {
  deleteProjectFile,
  readProjectFile,
  writeProjectFile,
  type Project,
} from "@/lib/content";
import { requireCmsAuth } from "@/lib/cms/guard";
import { rejectIfVercelCmsFilesystemWrite } from "@/lib/cms/vercel-readonly-guard";
import { projectSchema } from "@/lib/cms/schemas";
import { localeFromRequest } from "@/lib/cms/query";

export async function GET(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  const locale = localeFromRequest(req);
  if (!locale) {
    return Response.json({ error: "Missing or invalid ?locale=en|lv" }, { status: 400 });
  }
  const { id } = await ctx.params;
  const project = readProjectFile(locale, id);
  if (!project) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(project);
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  const readonlyFs = rejectIfVercelCmsFilesystemWrite();
  if (readonlyFs) return readonlyFs;
  const locale = localeFromRequest(req);
  if (!locale) {
    return Response.json({ error: "Missing or invalid ?locale=en|lv" }, { status: 400 });
  }
  const { id } = await ctx.params;
  if (!/^[a-z0-9][a-z0-9-]{0,120}$/i.test(id)) {
    return Response.json({ error: "Invalid id" }, { status: 400 });
  }
  const json = await req.json();
  const parsed = projectSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  writeProjectFile(locale, id.toLowerCase(), parsed.data as Project);
  return Response.json({ ok: true });
}

export async function DELETE(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  const readonlyFs = rejectIfVercelCmsFilesystemWrite();
  if (readonlyFs) return readonlyFs;
  const locale = localeFromRequest(req);
  if (!locale) {
    return Response.json({ error: "Missing or invalid ?locale=en|lv" }, { status: 400 });
  }
  const { id } = await ctx.params;
  if (!/^[a-z0-9][a-z0-9-]{0,120}$/i.test(id)) {
    return Response.json({ error: "Invalid id" }, { status: 400 });
  }
  deleteProjectFile(locale, id);
  return Response.json({ ok: true });
}

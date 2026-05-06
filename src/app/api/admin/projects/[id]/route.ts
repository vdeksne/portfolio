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
import { getDb } from "@/lib/db";
import { deleteProjectFromDb, getProjectFromDb, upsertProjectToDb } from "@/lib/projects-db";

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
  if (process.env.VERCEL === "1") {
    const db = getDb();
    if (db) {
      const p = await getProjectFromDb(locale, id.toLowerCase());
      if (p) return Response.json(p);
    }
  }
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
  if (process.env.VERCEL === "1") {
    await upsertProjectToDb(locale, id.toLowerCase(), parsed.data as Project);
  } else {
    const readonlyFs = rejectIfVercelCmsFilesystemWrite();
    if (readonlyFs) return readonlyFs;
    writeProjectFile(locale, id.toLowerCase(), parsed.data as Project);
  }
  return Response.json({ ok: true });
}

export async function DELETE(
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
  if (!/^[a-z0-9][a-z0-9-]{0,120}$/i.test(id)) {
    return Response.json({ error: "Invalid id" }, { status: 400 });
  }
  if (process.env.VERCEL === "1") {
    await deleteProjectFromDb(locale, id.toLowerCase());
  } else {
    const readonlyFs = rejectIfVercelCmsFilesystemWrite();
    if (readonlyFs) return readonlyFs;
    deleteProjectFile(locale, id);
  }
  return Response.json({ ok: true });
}

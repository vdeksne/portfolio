import { getExperiences, writeExperiencesFile } from "@/lib/content";
import { requireCmsAuth } from "@/lib/cms/guard";
import { rejectIfVercelCmsFilesystemWrite } from "@/lib/cms/vercel-readonly-guard";
import { experiencesSchema } from "@/lib/cms/schemas";

export async function GET() {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  return Response.json(getExperiences());
}

export async function PUT(req: Request) {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  const readonlyFs = rejectIfVercelCmsFilesystemWrite();
  if (readonlyFs) return readonlyFs;
  const json = await req.json();
  const parsed = experiencesSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  writeExperiencesFile(parsed.data);
  return Response.json({ ok: true });
}


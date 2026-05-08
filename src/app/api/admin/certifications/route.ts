import { getCertifications, writeCertificationsFile } from "@/lib/content";
import { requireCmsAuth } from "@/lib/cms/guard";
import { rejectIfVercelCmsFilesystemWrite } from "@/lib/cms/vercel-readonly-guard";
import { certificationsSchema } from "@/lib/cms/schemas";

export async function GET() {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  return Response.json(getCertifications());
}

export async function PUT(req: Request) {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  const readonlyFs = rejectIfVercelCmsFilesystemWrite();
  if (readonlyFs) return readonlyFs;
  const json = await req.json();
  const parsed = certificationsSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  writeCertificationsFile(parsed.data);
  return Response.json({ ok: true });
}

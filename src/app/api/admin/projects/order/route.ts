import { readProjectFile, writeProjectFile, type Project } from "@/lib/content";
import { requireCmsAuth } from "@/lib/cms/guard";
import { rejectIfVercelCmsFilesystemWrite } from "@/lib/cms/vercel-readonly-guard";
import { localeFromRequest } from "@/lib/cms/query";
import { z } from "zod";

const bodySchema = z.object({
  ids: z.array(z.string().regex(/^[a-z0-9][a-z0-9-]{0,120}$/i)).min(1),
});

export async function PUT(req: Request) {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  const readonlyFs = rejectIfVercelCmsFilesystemWrite();
  if (readonlyFs) return readonlyFs;
  const locale = localeFromRequest(req);
  if (!locale) {
    return Response.json({ error: "Missing or invalid ?locale=en|lv" }, { status: 400 });
  }
  const json = await req.json();
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const seen = new Set<string>();
  const ids = parsed.data.ids.map((s) => s.toLowerCase()).filter((id) => {
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i]!;
    const existing = readProjectFile(locale, id);
    if (!existing) continue;
    const next: Project = { ...existing, order: i };
    writeProjectFile(locale, id, next);
  }

  return Response.json({ ok: true });
}


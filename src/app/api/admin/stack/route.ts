import { getStack, writeStackFile } from "@/lib/content";
import { requireCmsAuth } from "@/lib/cms/guard";
import { stackSchema } from "@/lib/cms/schemas";

export async function GET() {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  return Response.json(getStack());
}

export async function PUT(req: Request) {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  const json = await req.json();
  const parsed = stackSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  writeStackFile(parsed.data);
  return Response.json({ ok: true });
}

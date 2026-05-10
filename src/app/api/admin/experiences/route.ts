import { getExperiencesResolved, writeExperiencesFile } from "@/lib/content";
import { requireCmsAuth } from "@/lib/cms/guard";
import { upsertCmsJsonDoc } from "@/lib/cms-json-docs-db";
import { getDb } from "@/lib/db";
import { experiencesSchema } from "@/lib/cms/schemas";

export async function GET() {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  return Response.json(await getExperiencesResolved());
}

export async function PUT(req: Request) {
  const denied = await requireCmsAuth();
  if (denied) return denied;
  const json = await req.json();
  const parsed = experiencesSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (process.env.VERCEL === "1") {
    const db = getDb();
    if (!db) {
      return Response.json(
        {
          error:
            "Vercel cannot write content/experiences.json. Add DATABASE_URL or POSTGRES_URL (Neon) in Vercel → Environment Variables for Production, redeploy, then run pnpm db:migrate on your machine with the same URL so the cms_json_docs table exists.",
        },
        { status: 503 },
      );
    }
    try {
      await upsertCmsJsonDoc("experiences", parsed.data);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      const code =
        typeof e === "object" && e !== null && "code" in e
          ? String((e as { code: unknown }).code)
          : "";
      const missingTable =
        code === "42P01" ||
        /relation ["']cms_json_docs["'] does not exist/i.test(msg);
      if (missingTable) {
        return Response.json(
          {
            error:
              "Table cms_json_docs is missing. Run pnpm db:migrate using the same Neon URL as Vercel, then try Save again.",
          },
          { status: 503 },
        );
      }
      console.error("[admin/experiences PUT]", e);
      return Response.json({ error: `Could not save (${msg}).` }, { status: 503 });
    }
    return Response.json({ ok: true });
  }

  writeExperiencesFile(parsed.data);
  return Response.json({ ok: true });
}


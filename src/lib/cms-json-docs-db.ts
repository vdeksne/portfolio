import { getDb } from "@/lib/db";

type NeonSql = NonNullable<ReturnType<typeof getDb>>;

/**
 * One DDL pass per serverless instance (CREATE IF NOT EXISTS is idempotent).
 */
let cmsJsonDocsDdlDone = false;

async function ensureCmsJsonDocsTable(db: NeonSql): Promise<void> {
  if (cmsJsonDocsDdlDone) return;
  try {
    await db`
      CREATE TABLE IF NOT EXISTS cms_json_docs (
        doc_key TEXT PRIMARY KEY,
        payload JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;
    await db`
      CREATE INDEX IF NOT EXISTS idx_cms_json_docs_updated_at
      ON cms_json_docs (updated_at DESC)
    `;
  } catch (e) {
    console.error("[ensureCmsJsonDocsTable]", e);
    throw e;
  }
  cmsJsonDocsDdlDone = true;
}

/**
 * Generic JSON document store for file-based CMS data on Vercel (read-only disk).
 * @see database/migrations/003_cms_json_docs.sql
 */
export async function fetchCmsJsonDoc(docKey: string): Promise<unknown | null> {
  const db = getDb();
  if (!db) return null;
  try {
    await ensureCmsJsonDocsTable(db);
    const rows = (await db`
      SELECT payload FROM cms_json_docs WHERE doc_key = ${docKey} LIMIT 1
    `) as { payload: unknown }[];
    const row = rows[0];
    if (!row) return null;
    return row.payload;
  } catch (e) {
    console.warn(
      "[cms_json_docs]",
      docKey,
      e instanceof Error ? e.message : String(e),
    );
    return null;
  }
}

export async function upsertCmsJsonDoc(
  docKey: string,
  payload: unknown,
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not configured");
  await ensureCmsJsonDocsTable(db);
  const json = JSON.stringify(payload);
  await db`
    INSERT INTO cms_json_docs (doc_key, payload, updated_at)
    VALUES (${docKey}, ${json}::jsonb, NOW())
    ON CONFLICT (doc_key) DO UPDATE SET
      payload = EXCLUDED.payload,
      updated_at = NOW()
  `;
}

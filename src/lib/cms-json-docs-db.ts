import { getDb } from "@/lib/db";

/**
 * Generic JSON document store for file-based CMS data on Vercel (read-only disk).
 * @see database/migrations/003_cms_json_docs.sql
 */
export async function fetchCmsJsonDoc(docKey: string): Promise<unknown | null> {
  const db = getDb();
  if (!db) return null;
  const rows = (await db`
    SELECT payload FROM cms_json_docs WHERE doc_key = ${docKey} LIMIT 1
  `) as { payload: unknown }[];
  const row = rows[0];
  if (!row) return null;
  return row.payload;
}

export async function upsertCmsJsonDoc(
  docKey: string,
  payload: unknown,
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not configured");
  const json = JSON.stringify(payload);
  await db`
    INSERT INTO cms_json_docs (doc_key, payload, updated_at)
    VALUES (${docKey}, ${json}::jsonb, NOW())
    ON CONFLICT (doc_key) DO UPDATE SET
      payload = EXCLUDED.payload,
      updated_at = NOW()
  `;
}

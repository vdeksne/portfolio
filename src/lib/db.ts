import { neon } from "@neondatabase/serverless";
import { normalizeNeonConnectionString } from "@/lib/neon-connection-string";

type NeonSql = ReturnType<typeof neon>;

let sqlSingleton: NeonSql | null = null;
let normalizedUrl: string | null = null;

/** SQL client for Neon (HTTP). Returns `null` when `DATABASE_URL` is unset — uploads still work from disk only. */
export function getDb(): NeonSql | null {
  const raw = process.env.DATABASE_URL?.trim();
  if (!raw) return null;
  const url = normalizeNeonConnectionString(raw);
  if (!url.startsWith("postgres")) return null;
  if (!sqlSingleton || normalizedUrl !== url) {
    sqlSingleton = neon(url);
    normalizedUrl = url;
  }
  return sqlSingleton;
}

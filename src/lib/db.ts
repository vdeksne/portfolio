import { neon } from "@neondatabase/serverless";
import { resolvePostgresUrlFromEnv } from "@/lib/neon-connection-string";

type NeonSql = ReturnType<typeof neon>;

let sqlSingleton: NeonSql | null = null;
let normalizedUrl: string | null = null;

/**
 * SQL client for Neon (HTTP). Returns `null` when no Postgres URL env is set.
 * Checks `DATABASE_URL`, `POSTGRES_URL`, `NEON_DATABASE_URL`, `POSTGRES_PRISMA_URL`.
 */
export function getDb(): NeonSql | null {
  const url = resolvePostgresUrlFromEnv();
  if (!url) return null;
  if (!sqlSingleton || normalizedUrl !== url) {
    sqlSingleton = neon(url);
    normalizedUrl = url;
  }
  return sqlSingleton;
}

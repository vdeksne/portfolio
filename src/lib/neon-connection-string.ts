/**
 * Neon’s UI sometimes copies `psql 'postgresql://…'` instead of the URL alone.
 * `neon()` and connection parsers expect a bare `postgresql://` (or `postgres://`) URL.
 */
export function normalizeNeonConnectionString(raw: string): string {
  let s = raw.trim();
  s = s.replace(/^psql\s+/i, "").trim();
  if (
    (s.startsWith("'") && s.endsWith("'")) ||
    (s.startsWith('"') && s.endsWith('"'))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s;
}

/** First env value that looks like a `postgresql://` URL (Vercel + Neon vary naming). */
export function resolvePostgresUrlFromEnv(): string | undefined {
  const keys = [
    "DATABASE_URL",
    "POSTGRES_URL",
    "NEON_DATABASE_URL",
    "POSTGRES_PRISMA_URL",
  ] as const;
  for (const key of keys) {
    const raw = process.env[key]?.trim();
    if (!raw) continue;
    const url = normalizeNeonConnectionString(raw);
    if (url.startsWith("postgres")) return url;
  }
  return undefined;
}

/**
 * Apply schema to Neon. Run: `pnpm run db:migrate`
 * Loads `DATABASE_URL` from the environment or from `.env` in the project root.
 * @see database/migrations/001_init.sql
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";

/** @see src/lib/neon-connection-string.ts */
function normalizeNeonConnectionString(raw) {
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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const s = line.trim();
    if (!s || s.startsWith("#")) continue;
    const i = s.indexOf("=");
    if (i === -1) continue;
    const key = s.slice(0, i).trim();
    let val = s.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

const raw = process.env.DATABASE_URL?.trim();
if (!raw) {
  console.error(
    "DATABASE_URL is not set. Add your Neon connection string to .env (copy from .env.example), or run:\n" +
      '  DATABASE_URL="postgresql://…" pnpm run db:migrate',
  );
  process.exit(1);
}

const url = normalizeNeonConnectionString(raw);
if (!url.startsWith("postgres")) {
  console.error(
    "DATABASE_URL must be a postgres URL (postgresql://…), not a shell command.\n" +
      "From Neon: copy only the connection string, or paste `psql '…'` — this script strips the psql wrapper.",
  );
  process.exit(1);
}

const sql = neon(url);

async function main() {
  await sql`
    CREATE TABLE IF NOT EXISTS uploaded_files (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      public_url TEXT NOT NULL,
      storage_path TEXT NOT NULL,
      mime_type TEXT,
      byte_size INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_uploaded_files_created_at
    ON uploaded_files (created_at DESC)
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS portfolio_projects (
      id TEXT NOT NULL,
      locale TEXT NOT NULL,
      payload JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (id, locale)
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_portfolio_projects_locale
    ON portfolio_projects (locale)
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS cms_pages (
      page_key TEXT NOT NULL,
      locale TEXT NOT NULL,
      meta JSONB NOT NULL DEFAULT '{}'::jsonb,
      slots JSONB NOT NULL DEFAULT '{}'::jsonb,
      block TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY (page_key, locale)
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_cms_pages_updated_at ON cms_pages (updated_at DESC)
  `;

  console.log("Migrations applied: uploaded_files, portfolio_projects, cms_pages");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

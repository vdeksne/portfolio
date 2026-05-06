-- Run via `npm run db:migrate` (uses Neon HTTP driver) or: psql "$DATABASE_URL" -f database/migrations/001_init.sql

CREATE TABLE IF NOT EXISTS uploaded_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  public_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  mime_type TEXT,
  byte_size INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_uploaded_files_created_at
  ON uploaded_files (created_at DESC);

-- Optional mirror of project cards (JSON) per locale — use when move off flat JSON files.
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id TEXT NOT NULL,
  locale TEXT NOT NULL,
  payload JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id, locale)
);

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_locale
  ON portfolio_projects (locale);

CREATE TABLE IF NOT EXISTS cms_pages (
  page_key TEXT NOT NULL,
  locale TEXT NOT NULL,
  meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  slots JSONB NOT NULL DEFAULT '{}'::jsonb,
  block TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (page_key, locale)
);

CREATE INDEX IF NOT EXISTS idx_cms_pages_updated_at ON cms_pages (updated_at DESC);

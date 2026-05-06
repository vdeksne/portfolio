-- CMS page overlays for serverless (Vercel): markdown stays in the repo; runtime edits merge from this table.
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

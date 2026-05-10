-- Key/value JSON blobs for admin content that normally lives under content/*.json
-- (Vercel serverless cannot write the repo filesystem; use Neon like cms_pages.)
CREATE TABLE IF NOT EXISTS cms_json_docs (
  doc_key TEXT PRIMARY KEY,
  payload JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cms_json_docs_updated_at ON cms_json_docs (updated_at DESC);

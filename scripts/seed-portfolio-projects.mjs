/**
 * Copy on-disk portfolio JSON (content/<locale>/projects/*.json) into Neon `portfolio_projects`.
 *
 * Run: `pnpm run db:seed-projects`
 * Options:
 *   --dry-run     Print actions only
 *   --locale=en   Only one locale (default: seed both en + lv from available files)
 *
 * Uses the same DATABASE_URL resolution as `pnpm run db:migrate`.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";

/** @param {string} raw */
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
const projectRoot = path.join(__dirname, "..");
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

function resolveRawPostgresEnv() {
  const keys = [
    "DATABASE_URL",
    "POSTGRES_URL",
    "NEON_DATABASE_URL",
    "POSTGRES_PRISMA_URL",
  ];
  for (const key of keys) {
    const v = process.env[key]?.trim();
    if (!v) continue;
    const normalized = normalizeNeonConnectionString(v);
    if (normalized.startsWith("postgres")) return v;
  }
  return undefined;
}

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const localeArg = args.find((a) => a.startsWith("--locale="));
const locales = localeArg
  ? [localeArg.split("=", 2)[1]?.trim()].filter(Boolean)
  : ["en", "lv"];

const raw = resolveRawPostgresEnv();
if (!raw) {
  console.error(
    "No Postgres URL. Set DATABASE_URL (or POSTGRES_URL, etc.) in .env, then run:\n" +
      "  pnpm run db:seed-projects"
  );
  process.exit(1);
}

const url = normalizeNeonConnectionString(raw);
if (!url.startsWith("postgres")) {
  console.error("DATABASE_URL must be a postgresql:// connection string.");
  process.exit(1);
}

const sql = neon(url);

async function main() {
  for (const locale of locales) {
    if (locale !== "en" && locale !== "lv") {
      console.error(`Unknown locale: ${locale}`);
      process.exit(1);
    }
    // Projects are locale-neutral: allow seeding lv from en files if lv folder is absent.
    const preferredDir = path.join(projectRoot, "content", locale, "projects");
    const fallbackDir = path.join(projectRoot, "content", "en", "projects");
    const readFiles = (dir) =>
      fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".json"))
        .sort();

    let dir = preferredDir;
    let files = fs.existsSync(preferredDir) ? readFiles(preferredDir) : [];
    if (!files.length) {
      dir = fallbackDir;
      files = fs.existsSync(fallbackDir) ? readFiles(fallbackDir) : [];
    }
    if (!files.length) {
      console.warn(
        `Skip locale ${locale}: no project JSON found in ${preferredDir} (or ${fallbackDir})`,
      );
      continue;
    }
    for (const file of files) {
      const id = file.replace(/\.json$/i, "").toLowerCase();
      const rawFile = fs.readFileSync(path.join(dir, file), "utf8");
      let project;
      try {
        project = JSON.parse(rawFile);
      } catch (e) {
        console.error(`Skip ${locale}/${file}: invalid JSON`, e);
        continue;
      }
      if (
        typeof project !== "object" ||
        project === null ||
        typeof project.name !== "string" ||
        typeof project.image !== "string" ||
        typeof project.link !== "string" ||
        typeof project.release !== "string"
      ) {
        console.error(
          `Skip ${locale}/${file}: missing name/image/link/release`
        );
        continue;
      }
      const payload = JSON.stringify(project);
      if (dryRun) {
        console.log(`[dry-run] upsert ${locale} ${id}`);
        continue;
      }
      await sql`
        INSERT INTO portfolio_projects (id, locale, payload, updated_at)
        VALUES (${id}, ${locale}, ${payload}::jsonb, NOW())
        ON CONFLICT (id, locale) DO UPDATE SET
          payload = EXCLUDED.payload,
          updated_at = NOW()
      `;
      console.log(`OK ${locale} ${id}`);
    }
  }
  if (dryRun) {
    console.log("Dry run complete (no writes).");
  } else {
    console.log("Seed complete.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

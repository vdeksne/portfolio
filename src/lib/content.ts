import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  firstMdcBlockName,
  parseMdcBlock,
  serializeMdcBlock,
} from "./mdc";
import type { Locale } from "./types";
import {
  fetchCmsPageOverlay,
  mergeCmsOverlay,
  routeKeyToDbPageKey,
  upsertCmsPageRow,
} from "./cms-pages-db";
import { getDb } from "./db";
import { fetchCmsJsonDoc } from "./cms-json-docs-db";
import { listProjectsFromDb } from "./projects-db";

const CONTENT_DIR = path.join(process.cwd(), "content");

/** Projects are locale-neutral: use this locale’s JSON if present, else English. */
function resolveProjectsContentDir(locale: Locale): string {
  const preferred = path.join(CONTENT_DIR, locale, "projects");
  if (!fs.existsSync(preferred)) {
    return path.join(CONTENT_DIR, "en", "projects");
  }
  const hasJson = fs
    .readdirSync(preferred)
    .some((f) => f.endsWith(".json"));
  if (!hasJson && locale !== "en") {
    return path.join(CONTENT_DIR, "en", "projects");
  }
  return preferred;
}

export type PageMeta = {
  title: string;
  description: string;
  date?: string;
};

export type ArticleMeta = {
  title: string;
  description: string;
  date: string;
  image: string;
  readingTime: string;
  tags: string[];
};

export type Project = {
  /** Stable id (from filename / DB key). Set by `listProjects`. */
  id?: string;
  name: string;
  image: string;
  link: string;
  release: string;
  /** Optional longer blurb shown in Works modal. */
  description?: string;
  /** Optional list of tools used (e.g. ["Next.js","Tailwind"]). */
  tools?: string[];
  date?: string;
  featured?: boolean;
  /** Admin-controlled sort order (lower comes first). */
  order?: number;
};

export type ProjectFileRow = { id: string; project: Project };

function projectYear(p: Project): number | null {
  const date = (p.date ?? "").trim();
  const m1 = date.match(/^(\d{4})/);
  if (m1?.[1]) return Number(m1[1]);
  const rel = (p.release ?? "").trim();
  const m2 = rel.match(/(19\d{2}|20\d{2})/);
  if (m2?.[1]) return Number(m2[1]);
  return null;
}

/** DB row must look like a real saved project before it can override repo JSON on Vercel. */
export function isCompleteProjectPayload(p: unknown): p is Project {
  if (!p || typeof p !== "object" || Array.isArray(p)) return false;
  const o = p as Record<string, unknown>;
  const req = (v: unknown) => typeof v === "string" && v.trim().length > 0;
  return req(o.name) && req(o.image) && req(o.link) && req(o.release);
}

function sortProjectFileRows(rows: ProjectFileRow[]): ProjectFileRow[] {
  return [...rows].sort((a, b) => {
    const pa = a.project;
    const pb = b.project;
    const ao =
      typeof pa.order === "number" ? pa.order : Number.POSITIVE_INFINITY;
    const bo =
      typeof pb.order === "number" ? pb.order : Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    const ay = projectYear(pa) ?? Number.NEGATIVE_INFINITY;
    const by = projectYear(pb) ?? Number.NEGATIVE_INFINITY;
    if (ay !== by) return by - ay;
    const af = pa.featured ? 1 : 0;
    const bf = pb.featured ? 1 : 0;
    if (af !== bf) return bf - af;
    return String(pa.name ?? "").localeCompare(String(pb.name ?? ""));
  });
}

async function mergeDiskAndDbProjectRows(locale: Locale): Promise<ProjectFileRow[]> {
  const diskRows = listProjectRows(locale);
  const byId = new Map<string, ProjectFileRow>(
    diskRows.map((r) => [r.id, r]),
  );
  const dbRows = (await listProjectsFromDb(locale)) ?? [];
  for (const row of dbRows) {
    if (!isCompleteProjectPayload(row.project)) continue;
    byId.set(row.id, { id: row.id, project: row.project });
  }
  return sortProjectFileRows([...byId.values()]);
}

/**
 * Repo JSON is the default on Vercel; Postgres overlays per-id when the row is complete.
 * Prevents empty/partial DB state from hiding bundled portfolio mock data after deploy.
 */
export async function listProjectRowsWithDbOverlay(
  locale: Locale,
): Promise<ProjectFileRow[]> {
  if (process.env.VERCEL === "1" && getDb()) {
    return mergeDiskAndDbProjectRows(locale);
  }
  return listProjectRows(locale);
}

export type Experience = {
  title: string;
  company: string;
  date: string;
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  /** Optional verify / info URL */
  link?: string;
};

export type Education = {
  school: string;
  location?: string;
  program: string;
  date: string;
};

export const PAGE_FILES: Record<string, string> = {
  "": "1.index",
  works: "2.works",
  writing: "3.writing",
  about: "4.about",
  contact: "5.contact",
};

const ALL_LOCALES: Locale[] = ["en", "lv"];

/**
 * After saving About in one locale, copy `profile_image` into the other locale’s file
 * (local) or DB row (Vercel).
 */
export async function syncAboutProfileImageToOtherLocales(
  savedLocale: Locale,
  profileImage: string,
) {
  if (process.env.VERCEL === "1") {
    const db = getDb();
    if (!db) return;
    const pageKey = routeKeyToDbPageKey("about");
    for (const loc of ALL_LOCALES) {
      if (loc === savedLocale) continue;
      const disk = loadPageFromDisk(loc, "about");
      if (!disk) continue;
      const overlay = await fetchCmsPageOverlay(pageKey, loc);
      const merged = mergeCmsOverlay(disk, overlay);
      const slots = { ...merged.slots, profile_image: profileImage };
      await upsertCmsPageRow(pageKey, loc, { ...merged, slots });
    }
    return;
  }
  for (const loc of ALL_LOCALES) {
    if (loc === savedLocale) continue;
    const page = await getPageForAdmin(loc, "about");
    if (!page) continue;
    const slots = { ...page.slots, profile_image: profileImage };
    writePageMarkdown(loc, "about", page.meta, page.block, slots);
  }
}

/** Markdown on disk only (no DB overlay). */
export function loadPageFromDisk(locale: Locale, routeKey: string) {
  const base = PAGE_FILES[routeKey];
  if (!base) return null;
  const filePath = path.join(CONTENT_DIR, locale, `${base}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const block = firstMdcBlockName(content);
  const slots = parseMdcBlock(content, block);
  return {
    meta: data as PageMeta,
    slots,
    block,
  };
}

export async function getPageByRoute(locale: Locale, routeKey: string) {
  const disk = loadPageFromDisk(locale, routeKey);
  if (!disk) return null;
  const overlay = await fetchCmsPageOverlay(
    routeKeyToDbPageKey(routeKey),
    locale,
  );
  return mergeCmsOverlay(disk, overlay);
}

export async function getPageForAdmin(locale: Locale, routeKey: string) {
  return getPageByRoute(locale, routeKey);
}

/** Writing is locale-neutral: English is canonical; other locales merge translated frontmatter when present. */
function mergeArticleMeta(
  base: ArticleMeta,
  override?: ArticleMeta,
): ArticleMeta {
  if (!override) return base;
  return { ...base, ...override };
}

export function listArticles(locale: Locale): {
  slug: string;
  meta: ArticleMeta;
}[] {
  const enDir = path.join(CONTENT_DIR, "en", "articles");
  const locDir = path.join(CONTENT_DIR, locale, "articles");

  const readMetaMap = (dir: string) => {
    const m = new Map<string, ArticleMeta>();
    if (!fs.existsSync(dir)) return m;
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".md"))) {
      const slug = f.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      m.set(slug, matter(raw).data as ArticleMeta);
    }
    return m;
  };

  if (locale === "en") {
    if (!fs.existsSync(enDir)) return [];
    return fs
      .readdirSync(enDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => {
        const slug = f.replace(/\.md$/, "");
        const raw = fs.readFileSync(path.join(enDir, f), "utf8");
        return { slug, meta: matter(raw).data as ArticleMeta };
      });
  }

  const enMetas = readMetaMap(enDir);
  const locMetas = readMetaMap(locDir);
  const slugs = new Set<string>([...enMetas.keys(), ...locMetas.keys()]);
  const items = [...slugs]
    .map((slug) => {
      const enMeta = enMetas.get(slug);
      const locMeta = locMetas.get(slug);
      if (!enMeta && locMeta) return { slug, meta: locMeta };
      if (!enMeta) return null;
      return {
        slug,
        meta: mergeArticleMeta(enMeta, locMeta),
      };
    })
    .filter(Boolean) as { slug: string; meta: ArticleMeta }[];
  return items;
}

export function getArticle(locale: Locale, slug: string) {
  const enPath = path.join(CONTENT_DIR, "en", "articles", `${slug}.md`);
  const locPath = path.join(CONTENT_DIR, locale, "articles", `${slug}.md`);

  if (locale === "en") {
    if (!fs.existsSync(enPath)) return null;
    const raw = fs.readFileSync(enPath, "utf8");
    const { data, content } = matter(raw);
    return { meta: data as ArticleMeta, body: content.trim() };
  }

  const hasEn = fs.existsSync(enPath);
  const hasLoc = fs.existsSync(locPath);

  if (!hasEn && hasLoc) {
    const raw = fs.readFileSync(locPath, "utf8");
    const { data, content } = matter(raw);
    return { meta: data as ArticleMeta, body: content.trim() };
  }

  if (!hasEn) return null;

  const enRaw = fs.readFileSync(enPath, "utf8");
  const enParsed = matter(enRaw);
  const enMeta = enParsed.data as ArticleMeta;
  const enBody = enParsed.content.trim();

  if (!hasLoc) {
    return { meta: enMeta, body: enBody };
  }

  const locParsed = matter(fs.readFileSync(locPath, "utf8"));
  const locMeta = locParsed.data as ArticleMeta;
  const locBody = locParsed.content.trim();
  const meta = mergeArticleMeta(enMeta, locMeta);
  const body = locBody.length > 0 ? locBody : enBody;
  return { meta, body };
}

export async function listProjects(locale: Locale): Promise<Project[]> {
  const rows = await listProjectRowsWithDbOverlay(locale);
  return rows.map((r) => ({ ...r.project, id: r.id }));
}

export function getStack() {
  const raw = fs.readFileSync(
    path.join(CONTENT_DIR, "stack.json"),
    "utf8",
  );
  return JSON.parse(raw) as {
    items: { name: string; link: string; icon: string }[];
  };
}

export function getExperiences() {
  const raw = fs.readFileSync(
    path.join(CONTENT_DIR, "experiences.json"),
    "utf8",
  );
  return JSON.parse(raw) as {
    items: Experience[];
  };
}

function parseExperiencesDoc(v: unknown): { items: Experience[] } | null {
  if (!v || typeof v !== "object") return null;
  const items = (v as { items?: unknown }).items;
  if (!Array.isArray(items)) return null;
  const out: Experience[] = [];
  for (const x of items) {
    if (!x || typeof x !== "object") return null;
    const o = x as Record<string, unknown>;
    if (
      typeof o.title !== "string" ||
      typeof o.company !== "string" ||
      typeof o.date !== "string"
    ) {
      return null;
    }
    out.push({ title: o.title, company: o.company, date: o.date });
  }
  return { items: out };
}

/** Repo JSON default; on Vercel, `cms_json_docs` row replaces when present & valid. */
export async function getExperiencesResolved(): Promise<{ items: Experience[] }> {
  if (process.env.VERCEL === "1") {
    const raw = await fetchCmsJsonDoc("experiences");
    const parsed = parseExperiencesDoc(raw);
    if (parsed) return parsed;
  }
  return getExperiences();
}

export function getCertifications() {
  const raw = fs.readFileSync(
    path.join(CONTENT_DIR, "certifications.json"),
    "utf8",
  );
  return JSON.parse(raw) as {
    items: Certification[];
  };
}

export function getEducation() {
  const raw = fs.readFileSync(
    path.join(CONTENT_DIR, "education.json"),
    "utf8",
  );
  return JSON.parse(raw) as {
    items: Education[];
  };
}

export type FaqData = {
  title: string;
  subtitle: string;
  faqQuestions: {
    title: string;
    questions: { label: string; content: string }[];
  }[];
};

export function getFaq(locale: Locale): FaqData {
  const raw = fs.readFileSync(
    path.join(CONTENT_DIR, locale, "faq.json"),
    "utf8",
  );
  return JSON.parse(raw) as FaqData;
}

/** URL segment → `PAGE_FILES` key (empty string = home). */
export const ADMIN_PAGE_SLUG_TO_ROUTE: Record<string, string> = {
  home: "",
  works: "works",
  writing: "writing",
  about: "about",
  contact: "contact",
};

export function adminPageSlugToRouteKey(slug: string): string | null {
  return Object.prototype.hasOwnProperty.call(ADMIN_PAGE_SLUG_TO_ROUTE, slug)
    ? ADMIN_PAGE_SLUG_TO_ROUTE[slug]
    : null;
}

export function routeKeyToAdminSlug(routeKey: string): string {
  if (routeKey === "") return "home";
  return routeKey;
}

export function writePageMarkdown(
  locale: Locale,
  routeKey: string,
  meta: PageMeta,
  block: string,
  slots: Record<string, string>,
) {
  const base = PAGE_FILES[routeKey];
  if (!base) throw new Error("Invalid route key");
  const body = serializeMdcBlock(block, slots);
  const raw = matter.stringify(body.trimEnd(), meta);
  const filePath = path.join(CONTENT_DIR, locale, `${base}.md`);
  fs.writeFileSync(filePath, raw, "utf8");
}

export function writeFaqFile(locale: Locale, data: FaqData) {
  const filePath = path.join(CONTENT_DIR, locale, "faq.json");
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function writeStackFile(data: { items: { name: string; link: string; icon: string }[] }) {
  const filePath = path.join(CONTENT_DIR, "stack.json");
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function writeExperiencesFile(data: { items: Experience[] }) {
  const filePath = path.join(CONTENT_DIR, "experiences.json");
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function writeCertificationsFile(data: { items: Certification[] }) {
  const filePath = path.join(CONTENT_DIR, "certifications.json");
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function writeEducationFile(data: { items: Education[] }) {
  const filePath = path.join(CONTENT_DIR, "education.json");
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function listProjectRows(locale: Locale): ProjectFileRow[] {
  const dir = resolveProjectsContentDir(locale);
  if (!fs.existsSync(dir)) return [];
  const rows = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const id = f.replace(/\.json$/, "");
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      return { id, project: JSON.parse(raw) as Project };
    });
  rows.sort((a, b) => {
    const ao =
      typeof a.project.order === "number"
        ? a.project.order
        : Number.POSITIVE_INFINITY;
    const bo =
      typeof b.project.order === "number"
        ? b.project.order
        : Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    const ay = projectYear(a.project) ?? Number.NEGATIVE_INFINITY;
    const by = projectYear(b.project) ?? Number.NEGATIVE_INFINITY;
    if (ay !== by) return by - ay; // newest first
    return a.id.localeCompare(b.id);
  });
  return rows;
}

export function readProjectFile(locale: Locale, id: string): Project | null {
  if (!/^[a-z0-9][a-z0-9-]{0,120}$/i.test(id)) return null;
  const tryPath = (loc: Locale) =>
    path.join(CONTENT_DIR, loc, "projects", `${id.toLowerCase()}.json`);
  let filePath = tryPath(locale);
  if (!fs.existsSync(filePath) && locale !== "en") {
    filePath = tryPath("en");
  }
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as Project;
}

export function writeProjectFile(locale: Locale, id: string, project: Project) {
  if (!/^[a-z0-9][a-z0-9-]{0,120}$/i.test(id)) throw new Error("Invalid project id");
  const dir = path.join(CONTENT_DIR, locale, "projects");
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `${id}.json`);
  fs.writeFileSync(filePath, `${JSON.stringify(project, null, 2)}\n`, "utf8");
}

export function deleteProjectFile(locale: Locale, id: string) {
  if (!/^[a-z0-9][a-z0-9-]{0,120}$/i.test(id)) throw new Error("Invalid project id");
  const filePath = path.join(CONTENT_DIR, locale, "projects", `${id}.json`);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

export function writeArticleFile(
  locale: Locale,
  slug: string,
  meta: ArticleMeta,
  body: string,
) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Invalid slug");
  const dir = path.join(CONTENT_DIR, locale, "articles");
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, `${slug}.md`);
  const raw = matter.stringify(body.trimEnd() ? `${body.trimEnd()}\n` : "", meta);
  fs.writeFileSync(filePath, raw, "utf8");
}

export function deleteArticleFile(locale: Locale, slug: string) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Invalid slug");
  const filePath = path.join(CONTENT_DIR, locale, "articles", `${slug}.md`);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

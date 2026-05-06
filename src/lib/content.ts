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
import { listProjectsFromDb } from "./projects-db";

const CONTENT_DIR = path.join(process.cwd(), "content");

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
  name: string;
  image: string;
  link: string;
  release: string;
  date?: string;
  featured?: boolean;
  /** Admin-controlled sort order (lower comes first). */
  order?: number;
};

function projectYear(p: Project): number | null {
  const date = (p.date ?? "").trim();
  const m1 = date.match(/^(\d{4})/);
  if (m1?.[1]) return Number(m1[1]);
  const rel = (p.release ?? "").trim();
  const m2 = rel.match(/(19\d{2}|20\d{2})/);
  if (m2?.[1]) return Number(m2[1]);
  return null;
}

export type Experience = {
  title: string;
  company: string;
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

export function listArticles(locale: Locale): {
  slug: string;
  meta: ArticleMeta;
}[] {
  const dir = path.join(CONTENT_DIR, locale, "articles");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      const { data } = matter(raw);
      return { slug, meta: data as ArticleMeta };
    });
}

export function getArticle(locale: Locale, slug: string) {
  const filePath = path.join(CONTENT_DIR, locale, "articles", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return { meta: data as ArticleMeta, body: content.trim() };
}

export async function listProjects(locale: Locale): Promise<Project[]> {
  if (process.env.VERCEL === "1") {
    const dbRows = await listProjectsFromDb(locale);
    if (dbRows) {
      const items = dbRows.map((r) => r.project);
      items.sort((a, b) => {
        const ao =
          typeof a.order === "number" ? a.order : Number.POSITIVE_INFINITY;
        const bo =
          typeof b.order === "number" ? b.order : Number.POSITIVE_INFINITY;
        if (ao !== bo) return ao - bo;
        const ay = projectYear(a) ?? Number.NEGATIVE_INFINITY;
        const by = projectYear(b) ?? Number.NEGATIVE_INFINITY;
        if (ay !== by) return by - ay;
        const af = a.featured ? 1 : 0;
        const bf = b.featured ? 1 : 0;
        if (af !== bf) return bf - af;
        return String(a.name ?? "").localeCompare(String(b.name ?? ""));
      });
      return items;
    }
  }
  const dir = path.join(CONTENT_DIR, locale, "projects");
  if (!fs.existsSync(dir)) return [];
  const items = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      return JSON.parse(raw) as Project;
    });
  items.sort((a, b) => {
    const ao = typeof a.order === "number" ? a.order : Number.POSITIVE_INFINITY;
    const bo = typeof b.order === "number" ? b.order : Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    const ay = projectYear(a) ?? Number.NEGATIVE_INFINITY;
    const by = projectYear(b) ?? Number.NEGATIVE_INFINITY;
    if (ay !== by) return by - ay; // newest first
    const af = a.featured ? 1 : 0;
    const bf = b.featured ? 1 : 0;
    if (af !== bf) return bf - af;
    return String(a.name ?? "").localeCompare(String(b.name ?? ""));
  });
  return items;
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

export type ProjectFileRow = { id: string; project: Project };

export function listProjectRows(locale: Locale): ProjectFileRow[] {
  const dir = path.join(CONTENT_DIR, locale, "projects");
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
  const filePath = path.join(CONTENT_DIR, locale, "projects", `${id}.json`);
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

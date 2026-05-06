import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  firstMdcBlockName,
  parseMdcBlock,
  serializeMdcBlock,
} from "./mdc";
import type { Locale } from "./types";

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
};

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
 * After saving About in one locale, copy `profile_image` into the other locale’s file.
 * One photo URL avoids “upload works in admin but /en/about still shows the old GitHub image”.
 */
export function syncAboutProfileImageToOtherLocales(
  savedLocale: Locale,
  profileImage: string,
) {
  for (const loc of ALL_LOCALES) {
    if (loc === savedLocale) continue;
    const page = getPageForAdmin(loc, "about");
    if (!page) continue;
    const slots = { ...page.slots, profile_image: profileImage };
    writePageMarkdown(loc, "about", page.meta, page.block, slots);
  }
}

function readPageFile(locale: Locale, base: string) {
  const filePath = path.join(CONTENT_DIR, locale, `${base}.md`);
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

export function getPageByRoute(locale: Locale, routeKey: string) {
  const base = PAGE_FILES[routeKey];
  if (!base) return null;
  return readPageFile(locale, base);
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

export function listProjects(locale: Locale): Project[] {
  const dir = path.join(CONTENT_DIR, locale, "projects");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      return JSON.parse(raw) as Project;
    });
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

export function getPageForAdmin(locale: Locale, routeKey: string) {
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
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const id = f.replace(/\.json$/, "");
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      return { id, project: JSON.parse(raw) as Project };
    });
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

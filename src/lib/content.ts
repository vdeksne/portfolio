import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { firstMdcBlockName, parseMdcBlock } from "./mdc";
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
  date: string;
  featured?: boolean;
};

export const PAGE_FILES: Record<string, string> = {
  "": "1.index",
  works: "2.works",
  writing: "3.writing",
  about: "4.about",
  contact: "5.contact",
};

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

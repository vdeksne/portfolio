"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { ArticleMeta } from "@/lib/content";
import { ArticleCard } from "./article-card";
import { Divider } from "./divider";

export function WritingGrid({
  slots,
  articles,
}: {
  slots: { title?: string; subtitle?: string };
  articles: { slug: string; meta: ArticleMeta }[];
}) {
  const t = useTranslations("writing");
  const [showSearch, setShowSearch] = useState(false);
  const [searchedTitle, setSearchedTitle] = useState("");
  const [searchedTags, setSearchedTags] = useState<string[]>([]);

  const tags = useMemo(
    () => Array.from(new Set(articles.flatMap((a) => a.meta.tags))),
    [articles],
  );

  const filtered = useMemo(
    () =>
      articles.filter(
        (a) =>
          (searchedTags.length === 0 ||
            searchedTags.some((tag) => a.meta.tags.includes(tag))) &&
          (searchedTitle === "" ||
            a.meta.title.toLowerCase().includes(searchedTitle.toLowerCase())),
      ),
    [articles, searchedTags, searchedTitle],
  );

  const toggleTag = (tag: string) => {
    setSearchedTags((prev) =>
      prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag],
    );
  };

  return (
    <section className="mx-auto mt-4 flex max-w-4xl flex-col p-7 sm:mt-20">
      <h1 className="font-newsreader text-center text-4xl text-white-shadow">
        {slots.title}
      </h1>
      <h2 className="text-center text-lg font-extralight text-muted">
        {slots.subtitle}
      </h2>
      <Divider className="mb-8 mt-2" />
      <div className={showSearch ? "" : "mb-3"}>
        <button
          type="button"
          className="font-newsreader cursor-pointer select-none text-lg text-white-shadow"
          onClick={() => setShowSearch((v) => !v)}
        >
          {showSearch ? t("hide_search") : t("show_search")}
        </button>
      </div>
      {showSearch ? (
        <div className="mb-4 flex flex-col gap-2">
          <div className="my-4">
            <input
              value={searchedTitle}
              onChange={(e) => setSearchedTitle(e.target.value)}
              placeholder={t("search_article")}
              className="w-full rounded-md border border-white/10 bg-[#010F19] px-3 py-2 text-sm text-[var(--font-primary)] sm:w-96"
            />
          </div>
          {tags.length > 0 ? (
            <div className="mb-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`flex cursor-pointer items-center rounded-md px-2 py-1 text-xs shadow-sm transition-colors sm:text-sm ${
                    searchedTags.includes(tag)
                      ? "bg-zinc-700"
                      : "bg-neutral-800 hover:bg-neutral-700"
                  }`}
                >
                  <span className="font-extralight">{tag}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
      {filtered.length ? (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((article) => (
            <li key={article.slug}>
              <ArticleCard
                title={article.meta.title}
                date={article.meta.date}
                image={article.meta.image}
                slug={article.slug}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex h-64 flex-col items-center justify-center gap-2">
          <span className="text-2xl">{t("not_found")}</span>
          <span className="text-sm">{t("not_found_description")}</span>
        </div>
      )}
    </section>
  );
}

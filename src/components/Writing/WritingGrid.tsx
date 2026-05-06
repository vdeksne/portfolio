"use client";

import { useMemo, useReducer } from "react";
import { useTranslations } from "next-intl";
import type { ArticleMeta } from "@/lib/content";
import { ArticleCard } from "@/components/Article/ArticleCard";
import { Divider } from "@/components/primitives/Divider";

type SearchState = {
  showSearch: boolean;
  searchedTitle: string;
  searchedTags: string[];
};

type SearchAction =
  | { type: "TOGGLE_SEARCH" }
  | { type: "SET_TITLE"; payload: string }
  | { type: "TOGGLE_TAG"; payload: string };

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case "TOGGLE_SEARCH":
      return { ...state, showSearch: !state.showSearch };
    case "SET_TITLE":
      return { ...state, searchedTitle: action.payload };
    case "TOGGLE_TAG": {
      const tag = action.payload;
      const has = state.searchedTags.includes(tag);
      return {
        ...state,
        searchedTags: has
          ? state.searchedTags.filter((x) => x !== tag)
          : [...state.searchedTags, tag],
      };
    }
  }
}

const initialSearch: SearchState = {
  showSearch: false,
  searchedTitle: "",
  searchedTags: [],
};

export function WritingGrid({
  slots,
  articles,
}: {
  slots: { title?: string; subtitle?: string };
  articles: { slug: string; meta: ArticleMeta }[];
}) {
  const t = useTranslations("writing");
  const [search, dispatch] = useReducer(searchReducer, initialSearch);

  const tags = useMemo(
    () => Array.from(new Set(articles.flatMap((a) => a.meta.tags))),
    [articles],
  );

  const filtered = useMemo(
    () =>
      articles.filter(
        (a) =>
          (search.searchedTags.length === 0 ||
            search.searchedTags.some((tag) => a.meta.tags.includes(tag))) &&
          (search.searchedTitle === "" ||
            a.meta.title
              .toLowerCase()
              .includes(search.searchedTitle.toLowerCase())),
      ),
    [articles, search.searchedTags, search.searchedTitle],
  );

  return (
    <section className="mx-auto mt-4 flex w-full max-w-5xl flex-col p-7 sm:mt-20 xl:max-w-6xl">
      <h1 className="font-newsreader text-left text-4xl text-white-shadow">
        {slots.title}
      </h1>
      <h2 className="mt-5 text-left text-lg font-extralight text-muted sm:mt-6">
        {slots.subtitle}
      </h2>
      <Divider className="mb-8 mt-2" />
      <div className={search.showSearch ? "" : "mb-3"}>
        <button
          type="button"
          className="font-newsreader cursor-pointer select-none text-lg text-white-shadow"
          onClick={() => dispatch({ type: "TOGGLE_SEARCH" })}
        >
          {search.showSearch ? t("hide_search") : t("show_search")}
        </button>
      </div>
      {search.showSearch ? (
        <div className="mb-4 flex flex-col gap-2 sm:items-center">
          <div className="my-4 flex w-full justify-center">
            <input
              value={search.searchedTitle}
              onChange={(e) =>
                dispatch({ type: "SET_TITLE", payload: e.target.value })
              }
              placeholder={t("search_article")}
              className="w-full rounded-md bg-zinc-900/85 px-3 py-2 text-sm text-[var(--font-primary)] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-white/25"
            />
          </div>
          {tags.length > 0 ? (
            <div className="mb-4 flex w-full max-w-full flex-wrap justify-center gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => dispatch({ type: "TOGGLE_TAG", payload: tag })}
                  className={`flex cursor-pointer items-center rounded-md px-2 py-1 text-xs shadow-sm transition-colors sm:text-sm ${
                    search.searchedTags.includes(tag)
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
        <div className="flex h-64 min-h-64 flex-col items-start justify-center gap-2 text-left">
          <span className="text-2xl">{t("not_found")}</span>
          <span className="text-sm">{t("not_found_description")}</span>
        </div>
      )}
    </section>
  );
}

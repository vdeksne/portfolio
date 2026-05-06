import type { Metadata } from "next";
import { getPageByRoute, listArticles } from "@/lib/content";
import type { Locale } from "@/lib/types";
import { WritingGrid } from "@/components/Writing/WritingGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = getPageByRoute(locale, "writing");
  return {
    title: page?.meta.title,
    description: page?.meta.description,
  };
}

export default async function WritingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const page = getPageByRoute(locale, "writing");
  if (!page) throw new Error("Missing writing content");
  const articles = listArticles(locale);
  return <WritingGrid slots={page.slots} articles={articles} />;
}

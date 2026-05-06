import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, listArticles } from "@/lib/content";
import type { Locale } from "@/lib/types";
import { Link, routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { MarkdownBody } from "@/components/MarkdownBody";

export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const { slug } of listArticles(locale)) {
      paths.push({ locale, slug });
    }
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(locale, slug);
  if (!article) return { title: "Not found" };
  return {
    title: article.meta.title,
    description: article.meta.description,
    openGraph: {
      images: [{ url: article.meta.image }],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticle(locale, slug);
  if (!article) notFound();
  const t = await getTranslations("writing");
  const { meta, body } = article;

  return (
    <>
      <Link
        href="/writing"
        className="mx-auto my-8 flex w-full max-w-5xl cursor-pointer items-center gap-2 px-4 text-muted transition-colors duration-200 hover:text-[var(--font-primary)] xl:max-w-6xl"
      >
        <ArrowLeft className="size-4 flex-shrink-0" />
        <span className="text-sm font-extralight">{t("title")}</span>
      </Link>
      <article className="writing mx-auto w-full max-w-5xl px-4 pb-16 xl:max-w-6xl">
        <h1>{meta.title}</h1>
        <div className="info-section mt-4 flex flex-col gap-2 text-[#7d8084] sm:mt-5 sm:flex-row sm:gap-4">
          <p>{meta.date}</p>
          <p className="hidden sm:block">|</p>
          <p>
            {meta.readingTime} {t("readingTime")}
          </p>
        </div>
        <MarkdownBody source={body} />
      </article>
    </>
  );
}

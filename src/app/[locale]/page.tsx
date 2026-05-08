import type { Metadata } from "next";
import { getFaq, getPageByRoute, listProjects } from "@/lib/content";
import type { Locale } from "@/lib/types";
import { siteConfig } from "@/lib/site-config";
import { HomeSection } from "@/components/Home/HomeSection";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = await getPageByRoute(locale, "");
  return {
    title: page?.meta.title,
    description: page?.meta.description,
    openGraph: {
      title: page?.meta.title,
      description: page?.meta.description,
      url: siteConfig.seo.url,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Viktorija Deksne — Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page?.meta.title ?? undefined,
      description: page?.meta.description ?? undefined,
      images: ["/twitter-image"],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const page = await getPageByRoute(locale, "");
  if (!page) throw new Error("Missing home content");
  const projects = await listProjects(locale);
  const faq = getFaq(locale);
  const { hero_title: heroTitle, hero_subtitle: heroSubtitle } = page.slots;
  if (!heroTitle || !heroSubtitle) throw new Error("Home slots missing");

  return (
    <HomeSection
      heroTitle={heroTitle}
      heroSubtitle={heroSubtitle}
      projects={projects}
      faq={faq}
    />
  );
}

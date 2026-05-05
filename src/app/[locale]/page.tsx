import type { Metadata } from "next";
import { getFaq, getPageByRoute, listProjects } from "@/lib/content";
import type { Locale } from "@/lib/types";
import { siteConfig } from "@/lib/site-config";
import { HomeSection } from "@/components/home-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = getPageByRoute(locale, "");
  return {
    title: page?.meta.title,
    description: page?.meta.description,
    openGraph: {
      title: page?.meta.title,
      description: page?.meta.description,
      url: siteConfig.seo.url,
      type: "website",
      images: [{ url: siteConfig.seo.ogImage }],
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const page = getPageByRoute(locale, "");
  if (!page) throw new Error("Missing home content");
  const projects = listProjects(locale);
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

import type { Metadata } from "next";
import { getPageByRoute } from "@/lib/content";
import type { Locale } from "@/lib/types";
import { AboutSection } from "@/components/about-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = getPageByRoute(locale, "about");
  return {
    title: page?.meta.title,
    description: page?.meta.description,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const page = getPageByRoute(locale, "about");
  if (!page) throw new Error("Missing about content");
  return <AboutSection slots={page.slots} />;
}

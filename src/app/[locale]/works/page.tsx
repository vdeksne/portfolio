import type { Metadata } from "next";
import { getPageByRoute, listProjects } from "@/lib/content";
import type { Locale } from "@/lib/types";
import { WorksSection } from "@/components/Works/WorksSection";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = await getPageByRoute(locale, "works");
  return {
    title: page?.meta.title,
    description: page?.meta.description,
  };
}

export default async function WorksPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const page = await getPageByRoute(locale, "works");
  if (!page) throw new Error("Missing works content");
  const projects = await listProjects(locale);
  return <WorksSection slots={page.slots} projects={projects} />;
}

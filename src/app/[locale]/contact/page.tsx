import type { Metadata } from "next";
import { getPageByRoute } from "@/lib/content";
import type { Locale } from "@/lib/types";
import { ContactForm } from "@/components/Contact/ContactForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = await getPageByRoute(locale, "contact");
  return {
    title: page?.meta.title,
    description: page?.meta.description,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const page = await getPageByRoute(locale, "contact");
  if (!page) throw new Error("Missing contact content");
  const resendEnabled = !!(
    process.env.RESEND_API_KEY || process.env.NUXT_PRIVATE_RESEND_API_KEY
  );
  return <ContactForm resendEnabled={resendEnabled} slots={page.slots} />;
}

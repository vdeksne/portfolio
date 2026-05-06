import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/types";

/**
 * Render locale pages dynamically so CMS DB overlays (e.g. About profile image) show immediately
 * after saving in /admin, without requiring a redeploy.
 */
export const dynamic = "force-dynamic";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  const messages = await getMessages({ locale });
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SiteLayout>{children}</SiteLayout>
    </NextIntlClientProvider>
  );
}

import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";

import en from "@/messages/en.json";
import lv from "@/messages/lv.json";

const MESSAGES: Record<string, Record<string, unknown>> = { en, lv };

export function IntlDecorator({
  locale,
  children,
}: {
  locale: "en" | "lv";
  children: ReactNode;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={MESSAGES[locale]}>
      {children}
    </NextIntlClientProvider>
  );
}


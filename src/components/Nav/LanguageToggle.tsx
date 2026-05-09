"use client";

import { useLocale } from "next-intl";
import { Fragment } from "react";
import clsx from "clsx";
import { Link, routing, usePathname } from "@/i18n/routing";

const labelShort: Record<string, string> = {
  en: "ENG",
  lv: "LV",
};

const labelLong: Record<string, string> = {
  en: "English",
  lv: "Latviešu",
};

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className="flex items-center gap-2 px-1 py-1 text-xs"
      role="navigation"
      aria-label="Language"
    >
      {routing.locales.map((loc, idx) => (
        <Fragment key={loc}>
          {idx > 0 ? (
            <span className="text-muted select-none opacity-60" aria-hidden>
              |
            </span>
          ) : null}
          <Link
            href={pathname}
            locale={loc}
            lang={loc}
            title={labelLong[loc] ?? loc}
            aria-label={labelLong[loc] ?? loc}
            aria-current={locale === loc ? "true" : undefined}
            className={clsx(
              "inline-flex touch-manipulation items-center justify-center font-medium tabular-nums tracking-wide outline-none underline-offset-[0.35rem] transition-[color,text-decoration-color] focus-visible:ring-2 focus-visible:ring-(--font-primary)/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070707]",
              locale === loc
                ? "text-(--font-primary) underline decoration-current/70 decoration-2"
                : "text-muted hover:text-(--font-primary) hover:underline hover:decoration-current/25",
            )}
          >
            {labelShort[loc] ?? loc.toUpperCase()}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}

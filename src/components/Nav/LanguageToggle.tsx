"use client";

import { useLocale } from "next-intl";
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
      className="fixed right-[max(0.625rem,env(safe-area-inset-right,0px))] top-[max(0.5rem,env(safe-area-inset-top,0px))] z-60 flex min-h-[44px] items-stretch gap-px rounded-full bg-(--ui-bg)/90 px-0.5 py-0.5 text-[0.6875rem] shadow-lg backdrop-blur-md sm:right-[max(0.875rem,env(safe-area-inset-right,0px))] sm:top-4 sm:min-h-0 sm:gap-0.5 sm:px-1 sm:py-1 sm:text-xs"
      role="navigation"
      aria-label="Language"
    >
      {routing.locales.map((loc) => (
        <Link
          key={loc}
          href={pathname}
          locale={loc}
          lang={loc}
          title={labelLong[loc] ?? loc}
          aria-label={labelLong[loc] ?? loc}
          aria-current={locale === loc ? "true" : undefined}
          className={clsx(
            "inline-flex min-h-[44px] min-w-[2.75rem] flex-1 touch-manipulation items-center justify-center rounded-full px-2 font-semibold tabular-nums tracking-wide transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--font-primary)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-(--ui-bg) sm:h-auto sm:min-h-0 sm:min-w-0 sm:flex-none sm:px-3 sm:py-1.5",
            locale === loc
              ? "bg-(--bg-card) text-(--font-primary) shadow-inner"
              : "text-muted hover:bg-white/5 hover:text-[var(--font-primary)]"
          )}
        >
          {labelShort[loc] ?? loc.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}

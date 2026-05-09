"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { getHomeNavItems } from "@/lib/get-navigation";
import { Logo } from "@/components/Logo";
import { LanguageToggle } from "@/components/Nav/LanguageToggle";
import { ThemeToggle } from "@/components/Nav/ThemeToggle";
import clsx from "clsx";

/** Mobile header breakpoint (px): <= this is “mobile”. */
const MOBILE_MAX_PX = 888;
const SCROLL_DELTA = 10;
/** Always show bar when near top of page. */
const TOP_REVEAL_PX = 32;

export function Navbar() {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const items = getHomeNavItems();
  const [concealed, setConcealed] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_PX}px)`);

    const onResizeMode = () => {
      if (!mq.matches) setConcealed(false);
    };
    onResizeMode();
    mq.addEventListener("change", onResizeMode);

    const onScroll = () => {
      if (!mq.matches) return;
      const y = window.scrollY;
      const prev = lastScrollY.current;
      lastScrollY.current = y;

      if (y <= TOP_REVEAL_PX) {
        setConcealed(false);
        return;
      }

      const dy = y - prev;
      if (dy > SCROLL_DELTA) setConcealed(true);
      else if (dy < -SCROLL_DELTA) setConcealed(false);
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      mq.removeEventListener("change", onResizeMode);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      inert={concealed ? true : undefined}
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 bg-(--ui-bg)/90 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md",
        "max-[888px]:transition-transform max-[888px]:duration-300 max-[888px]:ease-out motion-reduce:max-[888px]:transition-none",
        concealed &&
          "max-[888px]:pointer-events-none max-[888px]:-translate-y-full"
      )}
    >
      <div
        className={clsx(
          "relative mx-auto w-full max-w-7xl 2xl:max-w-360",
          "max-[888px]:flex max-[888px]:flex-col max-[888px]:items-center max-[888px]:gap-1 max-[888px]:pb-1.5 max-[888px]:pt-3",
          "max-[888px]:pl-[max(0.625rem,env(safe-area-inset-left,0px))] max-[888px]:pr-[max(0.625rem,env(safe-area-inset-right,0px))]",
          "min-[889px]:grid min-[889px]:grid-cols-[1fr_auto_1fr] min-[889px]:items-center",
          "min-[889px]:min-h-[56px] min-[889px]:py-3 min-[889px]:px-[max(1rem,calc(env(safe-area-inset-left,0px)+0.625rem))] min-[889px]:pb-0 md:py-4"
        )}
      >
        <div className="relative z-20 flex max-[888px]:justify-center min-[889px]:w-12 min-[889px]:min-h-[44px] min-[889px]:items-center">
          <Logo size={16} />
        </div>
        <nav
          aria-label="Main"
          className={clsx(
            "flex w-full items-center",
            "relative z-10 max-[888px]:pointer-events-auto",
            "min-[889px]:w-auto min-[889px]:justify-center"
          )}
        >
          <div
            className={clsx(
              "pointer-events-auto w-full",
              "max-[888px]:snap-x max-[888px]:snap-mandatory max-[888px]:overflow-x-auto max-[888px]:overflow-y-hidden max-[888px]:overscroll-x-contain max-[888px]:[-ms-overflow-style:none] max-[888px]:[scrollbar-width:none] max-[888px]:[&::-webkit-scrollbar]:hidden max-[888px]:touch-pan-x",
              "max-[888px]:px-[max(1.5rem,calc(0.375rem+env(safe-area-inset-right,0px)))]",
              "min-[889px]:w-auto min-[889px]:px-0"
            )}
          >
            <div
              className={clsx(
                "max-[888px]:flex max-[888px]:min-w-full max-[888px]:w-max max-[888px]:justify-center",
                "min-[889px]:contents"
              )}
            >
              <div
                className={clsx(
                  "flex flex-nowrap items-stretch max-[888px]:shrink-0 max-[888px]:gap-x-0.5 max-[888px]:py-0",
                  "min-[889px]:w-full min-[889px]:flex-wrap min-[889px]:items-center min-[889px]:justify-center min-[889px]:gap-x-5 min-[889px]:gap-y-2 md:gap-x-7 lg:gap-x-9"
                )}
              >
                {items.map((item) => {
                  const href = item.to;
                  const active =
                    href === "/"
                      ? pathname === "/" || pathname === ""
                      : pathname.startsWith(href);
                  return (
                    <Link
                      key={item.name}
                      href={href}
                      prefetch
                      className={clsx(
                        "max-[888px]:snap-start",
                        "inline-flex shrink-0 items-center justify-center font-medium tracking-wide uppercase motion-safe:transition-[color,text-decoration-color]",
                        "max-[888px]:min-h-10 max-[888px]:px-1.5 max-[888px]:text-xs max-[888px]:leading-tight max-[888px]:underline-offset-[0.4rem]",
                        "min-[889px]:min-h-[44px] min-[889px]:px-2 min-[889px]:py-2 min-[889px]:text-sm min-[889px]:underline-offset-[0.65rem] md:px-3 md:text-[0.9375rem]",
                        "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-(--font-primary)/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070707]",
                        active
                          ? "underline decoration-2 text-(--font-primary) decoration-(--font-primary) max-[888px]:decoration-1"
                          : "no-underline text-muted hover:underline hover:decoration-2 hover:text-(--font-primary) hover:decoration-current/25 active:text-(--font-primary) max-[888px]:hover:decoration-1"
                      )}
                    >
                      {t(item.name)}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>
        {/* Desktop: keep controls together on the right. Mobile: theme left, language right. */}
        <div className="relative z-20 hidden items-center justify-end gap-2 min-[889px]:flex min-[889px]:min-h-[44px]">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div
          className={clsx(
            "relative z-20 hidden max-[888px]:flex",
            "max-[888px]:absolute max-[888px]:left-[max(0.625rem,env(safe-area-inset-left,0px))] max-[888px]:top-[max(0.5rem,env(safe-area-inset-top,0px))]"
          )}
        >
          <ThemeToggle />
        </div>
        <div
          className={clsx(
            "relative z-20 hidden max-[888px]:flex",
            "max-[888px]:absolute max-[888px]:right-[max(0.625rem,env(safe-area-inset-right,0px))] max-[888px]:top-[max(0.5rem,env(safe-area-inset-top,0px))]"
          )}
        >
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}

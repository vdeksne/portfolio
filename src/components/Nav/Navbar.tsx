"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { getHomeNavItems } from "@/lib/get-navigation";
import { Logo } from "@/components/Logo";
import clsx from "clsx";

/** Tailwind `sm` upper bound — auto-hide header only below this width. */
const MOBILE_MAX_PX = 639;
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
        "fixed top-0 left-0 right-0 z-50 bg-[#070707]/90 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md",
        "max-sm:transition-transform max-sm:duration-300 max-sm:ease-out motion-reduce:max-sm:transition-none",
        concealed && "max-sm:pointer-events-none max-sm:-translate-y-full",
      )}
    >
      <div
        className={clsx(
          "relative mx-auto w-full max-w-7xl 2xl:max-w-[90rem]",
          "max-sm:flex max-sm:flex-col max-sm:items-center max-sm:gap-1 max-sm:pb-1.5 max-sm:pt-3",
          "max-sm:pl-[max(0.625rem,env(safe-area-inset-left,0px))] max-sm:pr-[max(0.625rem,env(safe-area-inset-right,0px))]",
          "sm:min-h-[56px] sm:py-3 sm:pl-[max(1rem,calc(env(safe-area-inset-left,0px)+0.625rem))] sm:pb-0 md:py-4",
        )}
      >
        <div className="relative z-20 flex max-sm:justify-center sm:inline-flex sm:min-h-[44px] sm:items-center">
          <Logo size={12} />
        </div>
        <nav
          aria-label="Main"
          className={clsx(
            "flex w-full items-center",
            "relative z-10 max-sm:pointer-events-auto",
            "sm:pointer-events-none sm:absolute sm:inset-y-0 sm:justify-center",
            "sm:left-[max(4.25rem,calc(max(1rem,env(safe-area-inset-left,0px)+0.625rem)+3rem+0.5rem))] sm:right-28 lg:right-32",
          )}
        >
          <div
            className={clsx(
              "pointer-events-auto w-full",
              "max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:overflow-y-hidden max-sm:overscroll-x-contain max-sm:[-ms-overflow-style:none] max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden max-sm:touch-pan-x",
              "max-sm:px-[max(3.25rem,calc(0.375rem+env(safe-area-inset-right,0px)))]",
              "sm:w-full sm:px-0",
            )}
          >
            <div
              className={clsx(
                "max-sm:flex max-sm:min-w-full max-sm:w-max max-sm:justify-center",
                "sm:contents",
              )}
            >
              <div
                className={clsx(
                  "flex flex-nowrap items-stretch max-sm:shrink-0 max-sm:gap-x-0.5 max-sm:py-0",
                  "sm:w-full sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-5 sm:gap-y-2 md:gap-x-7 lg:gap-x-9",
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
                    className={clsx(
                      "max-sm:snap-start",
                      "inline-flex shrink-0 items-center justify-center font-medium tracking-wide motion-safe:transition-[color,text-decoration-color]",
                      "max-sm:min-h-8 max-sm:px-1 max-sm:text-[0.6875rem] max-sm:leading-tight max-sm:underline-offset-[0.4rem]",
                      "sm:min-h-[44px] sm:px-2 sm:py-2 sm:text-sm sm:underline-offset-[0.65rem] md:px-3 md:text-[0.9375rem]",
                      "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--font-primary)]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070707]",
                      active
                        ? "underline decoration-2 text-[var(--font-primary)] decoration-[var(--font-primary)] max-sm:decoration-1"
                        : "no-underline text-white/45 hover:underline hover:decoration-2 hover:text-white/88 hover:decoration-white/25 active:text-white/92 max-sm:hover:decoration-1",
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
      </div>
    </header>
  );
}

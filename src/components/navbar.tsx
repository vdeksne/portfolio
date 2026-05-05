"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { getHomeNavItems } from "@/lib/get-navigation";
import { Briefcase, Home, Library, Mail, User } from "lucide-react";
import clsx from "clsx";

const icons = {
  Home,
  Briefcase,
  Library,
  User,
  Mail,
} as const;

export function Navbar() {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const items = getHomeNavItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center sm:bottom-auto sm:top-0">
      <header className="rounded-full border border-white/10 bg-[#010F19]/40 backdrop-blur-md">
        <nav
          className="z-10 flex h-[50px] justify-around gap-2 p-1 transition-all duration-300 ease-in-out sm:h-[45px] sm:hover:gap-4"
          aria-label="Main"
        >
          {items.map((item) => {
            const href = item.to;
            const active =
              href === "/"
                ? pathname === "/" || pathname === ""
                : pathname.startsWith(href);
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <Link
                key={item.name}
                href={href}
                aria-label={`${t(item.name)} navigation link`}
                className={clsx(
                  "flex items-center rounded-full border border-transparent px-4 py-1 transition-all duration-300 ease-in-out hover:border-[#010F19]/5 hover:bg-[#010F19]/50 hover:backdrop-blur-3xl sm:px-6",
                  active
                    ? "border border-[#010F19]/5 bg-[#010F19] text-white/75 shadow-2xl shadow-[#010F19]/50 backdrop-blur-3xl"
                    : "text-muted",
                )}
              >
                <Icon className="size-7 font-light sm:size-6" strokeWidth={1.25} />
              </Link>
            );
          })}
        </nav>
      </header>
    </div>
  );
}

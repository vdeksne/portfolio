"use client";

import { useTranslations } from "next-intl";
import clsx from "clsx";
import { siteConfig } from "@/lib/site-config";

export function Availability({
  background,
  className,
}: {
  background?: boolean;
  className?: string;
}) {
  const t = useTranslations("global");
  const available = siteConfig.global.available;
  const current = available
    ? {
        color: "bg-[#0AFA94]/80",
        bgColor: "bg-[#0AEF8A]/80",
        textColor: "text-[#0AEF8A]/80",
        key: "available" as const,
      }
    : {
        color: "bg-red-500",
        bgColor: "bg-red-400",
        textColor: "text-red-400",
        key: "unavailable" as const,
      };

  return (
    <div
      className={clsx(
        "flex items-center rounded-full",
        background &&
          "border border-white/10 bg-[#010F19]/80 px-5 py-2 backdrop-blur-3xl",
        className,
      )}
    >
      <span className="relative flex size-3">
        <span
          className={clsx(
            "absolute inline-flex size-full animate-ping rounded-full opacity-75",
            current.color,
          )}
        />
        <span
          className={clsx(
            "relative inline-flex size-3 scale-90 rounded-full",
            current.bgColor,
          )}
        />
      </span>
      <span className={clsx("ml-2 text-sm font-medium", current.textColor)}>
        {t(current.key)}
      </span>
    </div>
  );
}

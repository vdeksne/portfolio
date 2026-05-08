"use client";

import { useTranslations } from "next-intl";
import { Download } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function AboutDownloadButton() {
  const t = useTranslations("global");
  const { href, fileName } = siteConfig.global.resume;
  const isSameOrigin = href.startsWith("/");

  return (
    <a
      href={href}
      {...(isSameOrigin ? { download: fileName } : {})}
      className="group inline-flex w-fit items-center gap-2.5 rounded-full border border-(--border-primary) bg-(--ui-bg)/55 px-4 py-2.5 text-sm font-semibold tracking-tight text-(--font-primary) shadow-[0_1px_0_rgba(0,0,0,0.05)_inset] backdrop-blur-md transition-[border-color,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] hover:border-(--border-primary-hover) hover:bg-(--bg-card)/70 hover:shadow-[0_8px_28px_-8px_rgba(0,0,0,0.18)] dark:bg-(--ui-bg)/35 dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] dark:hover:shadow-[0_12px_36px_-12px_rgba(0,0,0,0.72)]"
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-(--font-primary)/10 text-(--font-primary) ring-1 ring-(--border-primary) transition-[background-color,transform,box-shadow,ring-color] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.06] group-hover:bg-(--font-primary)/16 group-hover:ring-(--font-primary)/20 group-hover:shadow-sm dark:group-hover:shadow-[0_0_22px_-6px_rgba(255,255,255,0.14)]">
        <Download className="size-4 opacity-90" strokeWidth={2} aria-hidden />
      </span>
      {t("cv")}
    </a>
  );
}

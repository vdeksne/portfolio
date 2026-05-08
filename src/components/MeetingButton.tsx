"use client";

import { useTranslations } from "next-intl";
import { CalendarDays } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function MeetingButton() {
  const t = useTranslations("global");
  return (
    <a
      href={siteConfig.global.meetingLink}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-3 rounded-full border border-(--border-primary) bg-(--bg-card) px-1.5 py-1.5 pl-4 text-sm font-semibold tracking-tight text-(--font-primary) shadow-[0_1px_0_rgba(0,0,0,0.05)_inset] transition-[border-color,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] hover:border-(--border-primary-hover) hover:shadow-[0_8px_28px_-6px_rgba(0,0,0,0.14)] dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] dark:hover:shadow-[0_12px_36px_-10px_rgba(0,0,0,0.75)]"
    >
      <span className="pr-0.5">{t("meeting")}</span>
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-(--font-primary)/10 text-(--font-primary) ring-1 ring-(--border-primary) transition-[background-color,box-shadow,transform,ring-color] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.06] group-hover:bg-(--font-primary)/16 group-hover:ring-(--font-primary)/20 group-hover:shadow-sm dark:group-hover:shadow-[0_0_22px_-6px_rgba(255,255,255,0.14)]"
        aria-hidden
      >
        <CalendarDays className="size-4 opacity-90" strokeWidth={2} />
      </span>
    </a>
  );
}

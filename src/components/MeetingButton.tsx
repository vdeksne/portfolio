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
      className="group inline-flex items-center gap-2 text-sm font-medium text-muted underline-offset-[0.35rem] transition-[color,text-decoration-color] hover:text-(--font-primary) hover:underline hover:decoration-current/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--font-primary)/20 focus-visible:ring-offset-2 focus-visible:ring-offset-(--ui-bg)"
    >
      <span>{t("meeting")}</span>
      <CalendarDays
        className="size-4 opacity-70 transition-opacity group-hover:opacity-90"
        strokeWidth={2}
        aria-hidden
      />
    </a>
  );
}

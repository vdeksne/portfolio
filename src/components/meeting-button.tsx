"use client";

import { useTranslations } from "next-intl";
import { CalendarDays } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { SpotlightButton } from "./spotlight-button";

export function MeetingButton() {
  const t = useTranslations("global");
  return (
    <div className="flex gap-4 sm:gap-2">
      <SpotlightButton>
        <a
          href={siteConfig.global.meetingLink}
          className="relative flex items-center justify-center gap-2 bg-gradient-to-b from-white/25 to-white bg-clip-text text-lg font-medium text-transparent"
          target="_blank"
          rel="noreferrer"
        >
          {t("meeting")}
          <CalendarDays className="size-5 text-white/80" />
        </a>
      </SpotlightButton>
    </div>
  );
}

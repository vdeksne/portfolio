"use client";

import { useTranslations } from "next-intl";
import { CalendarDays } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { SpotlightButton } from "@/components/primitives/SpotlightButton";

export function MeetingButton() {
  const t = useTranslations("global");
  return (
    <div className="flex gap-4 sm:gap-2">
      <SpotlightButton>
        <a
          href={siteConfig.global.meetingLink}
          className="relative flex items-center justify-center gap-2 text-lg font-medium text-white"
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

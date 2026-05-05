"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Mail } from "lucide-react";
import { SpotlightButton } from "./spotlight-button";
import { MeetingButton } from "./meeting-button";

export function HomeCTA() {
  const t = useTranslations("global");
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:gap-2">
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2">
        <SpotlightButton>
          <Link
            href="/contact"
            className="relative flex items-center justify-center gap-2 bg-gradient-to-b from-white/25 to-white bg-clip-text text-lg font-medium text-transparent"
          >
            {t("contact")}
            <Mail className="size-5 text-white/80" />
          </Link>
        </SpotlightButton>
        <MeetingButton />
      </div>
    </div>
  );
}

import clsx from "clsx";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

const socialMediaRegexMap = [
  { regex: /github\.com/, name: "GitHub", icon: "github" },
  { regex: /twitter\.com/, name: "X / Twitter", icon: "x" },
  { regex: /linkedin\.com/, name: "LinkedIn", icon: "linkedin" },
  { regex: /instagram\.com/, name: "Instagram", icon: "instagram" },
  { regex: /spotify\.com/, name: "Spotify", icon: "spotify" },
] as const;

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  const mappedSocials = Object.values(siteConfig.socials).map((link) => {
    const found = socialMediaRegexMap.find((s) => s.regex.test(link));
    if (!found) throw new Error(`No social media found for link: ${link}`);
    return { name: found.name, link, icon: found.icon };
  });

  return (
    <div
      className={clsx(
        "flex flex-wrap items-center justify-center",
        compact
          ? "gap-x-1 gap-y-0.5"
          : "gap-x-5 gap-y-4 sm:gap-x-7 sm:gap-y-4 md:gap-x-9",
      )}
    >
      {mappedSocials.map((social) => (
        <a
          key={social.name}
          href={social.link}
          target="_blank"
          rel="noreferrer"
          className={clsx(
            "flex shrink-0 touch-manipulation items-center justify-center rounded-md text-(--font-primary) transition-opacity hover:opacity-80 active:opacity-70",
            compact
              ? "size-6 p-0.5 sm:size-6"
              : "size-11 min-h-11 min-w-11 sm:size-10 sm:min-h-10 sm:min-w-10",
          )}
          aria-label={`Go to ${social.name} profile`}
        >
          <Image
            src={`/icons/${social.icon}.svg`}
            alt=""
            width={compact ? 12 : 24}
            height={compact ? 12 : 24}
            className={clsx(
              "social-links-icon",
              compact ? "size-3" : "size-6 sm:size-7",
            )}
          />
        </a>
      ))}
    </div>
  );
}

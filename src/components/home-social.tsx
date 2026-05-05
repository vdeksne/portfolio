import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

const socialMediaRegexMap = [
  { regex: /github\.com/, name: "GitHub", icon: "github" },
  { regex: /twitter\.com/, name: "X / Twitter", icon: "x" },
  { regex: /linkedin\.com/, name: "LinkedIn", icon: "linkedin" },
  { regex: /instagram\.com/, name: "Instagram", icon: "instagram" },
  { regex: /spotify\.com/, name: "Spotify", icon: "spotify" },
] as const;

export function HomeSocial() {
  const mappedSocials = Object.values(siteConfig.socials).map((link) => {
    const found = socialMediaRegexMap.find((s) => s.regex.test(link));
    if (!found) throw new Error(`No social media found for link: ${link}`);
    return { name: found.name, link, icon: found.icon };
  });

  return (
    <div className="my-7 flex items-center justify-center gap-6 sm:gap-10">
      {mappedSocials.map((social) => (
        <a
          key={social.name}
          href={social.link}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center"
          aria-label={`Go to ${social.name} profile`}
        >
          <Image
            src={`/icons/${social.icon}.svg`}
            alt=""
            width={24}
            height={24}
            className="size-6 text-muted transition-all duration-300 hover:opacity-80"
          />
        </a>
      ))}
    </div>
  );
}

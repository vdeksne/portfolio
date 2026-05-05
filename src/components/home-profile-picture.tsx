import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { SpotlightButton } from "./spotlight-button";

export function HomeProfilePicture() {
  const { picture } = siteConfig.profile;
  return (
    <div className="z-10 flex items-center justify-center">
      <SpotlightButton rounded className="p-0">
        <span className="relative flex items-center justify-center gap-2 bg-gradient-to-b from-white/25 to-white bg-clip-text text-lg font-medium text-transparent">
          <Image
            width={96}
            height={96}
            src={picture}
            className="size-24 rounded-full border-2 border-neutral-800/30 object-cover"
            alt={`${siteConfig.profile.name} profile`}
          />
        </span>
      </SpotlightButton>
    </div>
  );
}

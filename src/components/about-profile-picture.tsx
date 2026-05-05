import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { SpotlightCard } from "./spotlight-card";

export function AboutProfilePicture() {
  const { picture } = siteConfig.profile;
  return (
    <div className="flex justify-center">
      <SpotlightCard
        mode="after"
        from="rgba(255,255,255,0.1)"
        size={400}
        className="group hidden w-64 rounded-2xl border border-white/10 bg-white/5 p-2 pb-4 sm:flex"
      >
        <div className="relative">
          <Image
            width={256}
            height={256}
            src={picture}
            className="absolute inset-0 size-64 scale-110 rounded-xl object-cover blur-xl grayscale saturate-200 transition-all duration-300 group-hover:blur-[32px] group-hover:grayscale-0"
            alt=""
          />
          <Image
            width={256}
            height={256}
            src={picture}
            className="relative size-64 rounded-xl object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
            alt={`${siteConfig.profile.name} photo`}
          />
        </div>
      </SpotlightCard>
      <SpotlightCard
        mode="after"
        from="rgba(255,255,255,0.1)"
        size={400}
        className="group w-64 rounded-2xl border border-white/10 bg-white/5 p-2 pb-4 sm:hidden"
      >
        <Image
          width={256}
          height={256}
          src={picture}
          className="size-64 rounded-xl object-cover transition-all duration-300"
          alt={`${siteConfig.profile.name} photo`}
        />
      </SpotlightCard>
    </div>
  );
}

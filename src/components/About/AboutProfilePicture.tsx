import Image from "next/image";
import { SpotlightCard } from "@/components/primitives/SpotlightCard";
import { normalizePublicImageUrl } from "@/lib/image-url";
import { siteConfig } from "@/lib/site-config";

type AboutProfilePictureProps = {
  /** From About CMS slot; falls back to `siteConfig.profile.picture`. */
  pictureSrc?: string;
};

export function AboutProfilePicture({ pictureSrc }: AboutProfilePictureProps) {
  const fromCms = normalizePublicImageUrl(pictureSrc ?? "");
  const picture = fromCms || siteConfig.profile.picture;
  const isLocalUpload = picture.startsWith("/uploads/");
  const isVercelBlob = /^https?:\/\/.+\.public\.blob\.vercel-storage\.com\//.test(picture);
  const unoptimized = isLocalUpload || isVercelBlob;
  const alt = `${siteConfig.profile.name} photo`;

  return (
    <div className="flex justify-start self-start">
      <SpotlightCard className="group hidden w-64 bg-white/5 sm:flex">
        <div className="relative size-64 overflow-hidden">
          <Image
            src={picture}
            alt=""
            fill
            sizes="256px"
            unoptimized={unoptimized}
            className="z-0 object-cover blur-xl grayscale saturate-200 transition-all duration-300 scale-110 group-hover:blur-[32px] group-hover:grayscale-0"
            aria-hidden
          />
          <Image
            src={picture}
            alt={alt}
            fill
            sizes="256px"
            unoptimized={unoptimized}
            className="z-10 object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
          />
        </div>
      </SpotlightCard>
      <SpotlightCard className="group w-64 bg-white/5 sm:hidden">
        <div className="relative size-64 overflow-hidden">
          <Image
            src={picture}
            alt={alt}
            fill
            sizes="256px"
            unoptimized={unoptimized}
            className="object-cover transition-all duration-300"
          />
        </div>
      </SpotlightCard>
    </div>
  );
}

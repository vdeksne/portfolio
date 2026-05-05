"use client";

import Script from "next/script";

export function PlausibleScript() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const src =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT ||
    "https://plausible.io/js/script.js";
  if (!domain) return null;
  return (
    <Script
      src={src}
      data-domain={domain}
      strategy="afterInteractive"
    />
  );
}

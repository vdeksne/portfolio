"use client";

import dynamic from "next/dynamic";

export const HomeGlobeDynamic = dynamic(
  () => import("@/components/Home/HomeGlobe").then((m) => m.HomeGlobe),
  { ssr: false, loading: () => null },
);

import { ImageResponse } from "next/og";
import { buildOgShareElement } from "@/lib/og-share-element";

export const runtime = "nodejs";

export const alt = "Viktorija Deksne — Portfolio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(await buildOgShareElement(), {
    ...size,
  });
}

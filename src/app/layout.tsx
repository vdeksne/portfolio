import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site-config";

const metadataBaseUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || siteConfig.seo.url
).replace(/\/?$/, "/");

export const metadata: Metadata = {
  metadataBase: new URL(metadataBaseUrl),
  title: {
    default: "Viktorija Deksne Portfolio",
    template: "%s | Viktorija Deksne Portfolio",
  },
  description: "Made with ❤️ by Viktorija Deksne.",
  openGraph: {
    type: "website",
    siteName: siteConfig.seo.title,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Viktorija Deksne — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: ["/twitter-image"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className="dark font-geist text-left text-[var(--font-primary)] transition-colors duration-300 selection:bg-white/60 selection:text-zinc-800"
      suppressHydrationWarning
    >
      <body className="relative min-h-screen antialiased">{children}</body>
    </html>
  );
}

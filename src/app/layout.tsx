import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Viktorija Deksne Portfolio",
    template: "%s | Viktorija Deksne Portfolio",
  },
  description: "Made with ❤️ by Viktorija Deksne.",
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

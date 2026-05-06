import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Viktorija Deksne Portfolio",
    template: "%s | Viktorija Deksne Portfolio",
  },
  description: "Made with ❤️ by Viktorija Deksne.",
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

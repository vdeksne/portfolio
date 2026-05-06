import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  /** Ensure markdown/JSON under `content/` ships with serverless functions (not always traced from `fs` usage). */
  outputFileTracingIncludes: {
    "/*": ["./content/**/*"],
  },
  async redirects() {
    return [
      { source: "/fr", destination: "/lv", permanent: true },
      { source: "/fr/:path*", destination: "/lv/:path*", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "canvas.hrcd.fr",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);

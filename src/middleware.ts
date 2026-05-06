import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /** Admin lives outside `[locale]`; strip mistaken locale prefix from bookmarks/old links */
  const prefixedAdmin = pathname.match(/^\/(en|lv)(\/admin(?:\/.*)?)$/);
  if (prefixedAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = prefixedAdmin[2] ?? "/admin";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Exclude api, admin, static and framework paths from running middleware at all
    "/((?!api|admin|_next|_vercel|.*\\..*).*)",
    "/",
  ],
};

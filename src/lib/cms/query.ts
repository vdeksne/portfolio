import type { Locale } from "@/lib/types";

export function localeFromRequest(req: Request): Locale | null {
  const { searchParams } = new URL(req.url);
  const l = searchParams.get("locale");
  return l === "en" || l === "lv" ? l : null;
}

/** Trim and strip whitespace from URL paths (avoids broken `/uploads/…` after copy-paste / line wrap). */
export function normalizePublicImageUrl(raw: string): string {
  return raw.trim().replace(/\s+/g, "");
}

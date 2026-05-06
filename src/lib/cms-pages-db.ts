import { getDb } from "@/lib/db";
import type { Locale } from "@/lib/types";

export function routeKeyToDbPageKey(routeKey: string): string {
  return routeKey === "" ? "home" : routeKey;
}

export type CmsPageMeta = {
  title: string;
  description: string;
  date?: string;
};

export type CmsPageData = {
  meta: CmsPageMeta;
  slots: Record<string, string>;
  block: string;
};

function safeJsonObject<T extends Record<string, unknown>>(
  v: unknown,
): T | null {
  if (!v) return null;
  if (typeof v === "string") {
    try {
      const parsed = JSON.parse(v) as unknown;
      return safeJsonObject<T>(parsed);
    } catch {
      return null;
    }
  }
  if (typeof v !== "object" || Array.isArray(v)) return null;
  return v as T;
}

export async function fetchCmsPageOverlay(
  pageKey: string,
  locale: Locale,
): Promise<CmsPageData | null> {
  const db = getDb();
  if (!db) return null;
  const rows = (await db`
    SELECT meta, slots, block FROM cms_pages
    WHERE page_key = ${pageKey} AND locale = ${locale}
    LIMIT 1
  `) as { meta: unknown; slots: unknown; block: unknown }[];
  const row = rows[0];
  if (!row) return null;
  const metaObj = safeJsonObject<CmsPageMeta>(row.meta) ?? ({} as CmsPageMeta);
  const slotsObj = safeJsonObject<Record<string, string>>(row.slots) ?? {};
  return {
    meta: { ...metaObj },
    slots: { ...slotsObj },
    block: typeof row.block === "string" ? row.block : "",
  };
}

export async function upsertCmsPageRow(
  pageKey: string,
  locale: Locale,
  data: CmsPageData,
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not configured");
  const metaJson = JSON.stringify(data.meta);
  const slotsJson = JSON.stringify(data.slots);
  await db`
    INSERT INTO cms_pages (page_key, locale, meta, slots, block, updated_at)
    VALUES (
      ${pageKey},
      ${locale},
      ${metaJson}::jsonb,
      ${slotsJson}::jsonb,
      ${data.block},
      NOW()
    )
    ON CONFLICT (page_key, locale) DO UPDATE SET
      meta = EXCLUDED.meta,
      slots = EXCLUDED.slots,
      block = EXCLUDED.block,
      updated_at = NOW()
  `;
}

export function mergeCmsOverlay(
  disk: CmsPageData,
  overlay: CmsPageData | null,
): CmsPageData {
  if (!overlay) return disk;
  return {
    meta: { ...disk.meta, ...overlay.meta },
    slots: { ...disk.slots, ...overlay.slots },
    block: overlay.block.trim() !== "" ? overlay.block : disk.block,
  };
}

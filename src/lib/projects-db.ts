import { getDb } from "@/lib/db";
import type { Locale } from "@/lib/types";
import type { Project, ProjectFileRow } from "@/lib/content";

function safeJsonObject<T extends Record<string, unknown>>(v: unknown): T | null {
  if (!v) return null;
  if (typeof v === "string") {
    try {
      return safeJsonObject<T>(JSON.parse(v) as unknown);
    } catch {
      return null;
    }
  }
  if (typeof v !== "object" || Array.isArray(v)) return null;
  return v as T;
}

export async function listProjectsFromDb(locale: Locale): Promise<ProjectFileRow[] | null> {
  const db = getDb();
  if (!db) return null;
  const rows = (await db`
    SELECT id, payload
    FROM portfolio_projects
    WHERE locale = ${locale}
    ORDER BY updated_at DESC
  `) as { id: string; payload: unknown }[];
  return rows
    .map((r) => {
      const obj = safeJsonObject<Project>(r.payload) ?? null;
      if (!obj) return null;
      return { id: r.id, project: obj } satisfies ProjectFileRow;
    })
    .filter(Boolean) as ProjectFileRow[];
}

export async function getProjectFromDb(
  locale: Locale,
  id: string,
): Promise<Project | null> {
  const db = getDb();
  if (!db) return null;
  const rows = (await db`
    SELECT payload
    FROM portfolio_projects
    WHERE id = ${id} AND locale = ${locale}
    LIMIT 1
  `) as { payload: unknown }[];
  const row = rows[0];
  if (!row) return null;
  return safeJsonObject<Project>(row.payload) ?? null;
}

export async function upsertProjectToDb(
  locale: Locale,
  id: string,
  project: Project,
): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not configured");
  const payload = JSON.stringify(project);
  await db`
    INSERT INTO portfolio_projects (id, locale, payload, updated_at)
    VALUES (${id}, ${locale}, ${payload}::jsonb, NOW())
    ON CONFLICT (id, locale) DO UPDATE SET
      payload = EXCLUDED.payload,
      updated_at = NOW()
  `;
}

export async function deleteProjectFromDb(locale: Locale, id: string): Promise<void> {
  const db = getDb();
  if (!db) throw new Error("Database not configured");
  await db`
    DELETE FROM portfolio_projects
    WHERE id = ${id} AND locale = ${locale}
  `;
}


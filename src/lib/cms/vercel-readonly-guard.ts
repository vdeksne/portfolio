/**
 * Vercel serverless uses a read-only app filesystem. File-based CMS writes must be done locally + git.
 */
export const VERCEL_READONLY_CMS_MESSAGE =
  "This deployment cannot save content files (read-only disk). Edit markdown/JSON under content/ locally, commit, and push—or run pnpm dev and use /admin on your machine.";

export function rejectIfVercelCmsFilesystemWrite(): Response | null {
  if (process.env.VERCEL !== "1") return null;
  return Response.json({ error: VERCEL_READONLY_CMS_MESSAGE }, { status: 503 });
}

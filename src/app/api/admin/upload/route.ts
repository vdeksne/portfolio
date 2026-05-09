import fs from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { put } from "@vercel/blob";
import { requireCmsAuth } from "@/lib/cms/guard";
import { getDb } from "@/lib/db";

/** Local: `public/uploads`. Production (Vercel): set `BLOB_READ_WRITE_TOKEN` (Blob store) — disk writes are not supported. */
export const runtime = "nodejs";

/** Stay under typical serverless request body limits (~4.5 MB on Vercel). */
const MAX_BYTES = 4 * 1024 * 1024;

const MIME_TO_EXT = new Map<string, string>([
  ["image/jpeg", ".jpg"],
  ["image/jpg", ".jpg"],
  ["image/pjpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/x-png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
  ["image/svg+xml", ".svg"],
  ["image/svg", ".svg"],
  ["image/avif", ".avif"],
  ["application/pdf", ".pdf"],
]);

const EXT_FROM_NAME = new Map<string, string>([
  ["jpg", ".jpg"],
  ["jpeg", ".jpg"],
  ["png", ".png"],
  ["webp", ".webp"],
  ["gif", ".gif"],
  ["svg", ".svg"],
  ["avif", ".avif"],
  ["pdf", ".pdf"],
]);

const EXT_TO_MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".pdf": "application/pdf",
};

function extFromFilename(filename: string): string | null {
  const m = filename.toLowerCase().match(/\.([a-z0-9]+)$/);
  if (!m?.[1]) return null;
  return EXT_FROM_NAME.get(m[1]) ?? null;
}

/** Detect HEIC/HEIF (common iPhone default) — we don’t transcode. */
function isHeicHeif(buf: Buffer): boolean {
  if (buf.length < 12) return false;
  if (buf.subarray(4, 8).toString("ascii") !== "ftyp") return false;
  const brand = buf.subarray(8, 12).toString("ascii").toLowerCase();
  if (brand.startsWith("avif")) return false;
  return (
    brand.startsWith("heic") ||
    brand.startsWith("heix") ||
    brand.startsWith("hevc") ||
    brand.startsWith("mif1") ||
    brand.startsWith("msf1")
  );
}

function sniffExt(buf: Buffer): string | null {
  // PDF
  if (
    buf.length >= 5 &&
    buf.subarray(0, 5).toString("ascii") === "%PDF-"
  ) {
    return ".pdf";
  }
  if (buf.length >= 12 && buf.subarray(4, 8).toString("ascii") === "ftyp") {
    const brand = buf.subarray(8, 12).toString("ascii").toLowerCase();
    if (brand.startsWith("avif")) return ".avif";
  }
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return ".jpg";
  }
  if (
    buf.length >= 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  ) {
    return ".png";
  }
  if (
    buf.length >= 12 &&
    buf.subarray(0, 4).toString("ascii") === "RIFF" &&
    buf.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return ".webp";
  }
  if (
    buf.length >= 6 &&
    (buf.subarray(0, 6).toString("ascii") === "GIF87a" ||
      buf.subarray(0, 6).toString("ascii") === "GIF89a")
  ) {
    return ".gif";
  }
  const head = buf
    .subarray(0, Math.min(buf.length, 256))
    .toString("utf8")
    .trimStart();
  if (head.startsWith("<svg") || head.startsWith("<?xml")) {
    return ".svg";
  }
  return null;
}

function resolveExtension(file: File, buf: Buffer): { ext: string } | { error: string } {
  if (isHeicHeif(buf)) {
    return {
      error:
        "HEIC/HEIF isn’t supported here. Export the photo as JPEG or PNG (Photos: File → Export, or AirDrop “Most Compatible”).",
    };
  }

  const mime = file.type.trim().toLowerCase();
  if (mime && mime !== "application/octet-stream") {
    const fromMime = MIME_TO_EXT.get(mime);
    if (fromMime) return { ext: fromMime };
  }

  const fromName = extFromFilename(file.name);
  if (fromName) return { ext: fromName };

  const sniffed = sniffExt(buf);
  if (sniffed) return { ext: sniffed };

  return {
    error:
      "Could not detect file type. Use PDF or an image (JPEG, PNG, WebP, GIF, SVG, AVIF).",
  };
}

export async function POST(req: Request) {
  const denied = await requireCmsAuth();
  if (denied) return denied;

  /** Production/preview serverless: disk is read-only — Blob required unless token set. `vercel dev` uses VERCEL_ENV=development and can write public/uploads. */
  const blobRequiredOnVercel =
    process.env.VERCEL === "1" &&
    process.env.VERCEL_ENV !== "development" &&
    !process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (blobRequiredOnVercel) {
    return Response.json(
      {
        error:
          "Upload requires Vercel Blob. Project → Storage → Blob → create or link a store (sets BLOB_READ_WRITE_TOKEN), or paste an external URL.",
      },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return Response.json({ error: "Invalid form data." }, { status: 400 });
  }

  const file = form.get("file");
  if (!file || !(file instanceof File)) {
    return Response.json(
      { error: "Choose a file to upload (field name: file)." },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return Response.json(
      { error: "File is too large. Maximum size is 4 MB." },
      { status: 400 },
    );
  }

  let buf: Buffer;
  try {
    buf = Buffer.from(await file.arrayBuffer());
  } catch {
    return Response.json({ error: "Could not read file data." }, { status: 400 });
  }

  const resolved = resolveExtension(file, buf);
  if ("error" in resolved) {
    return Response.json({ error: resolved.error }, { status: 400 });
  }

  const filename = `${Date.now()}-${randomBytes(8).toString("hex")}${resolved.ext}`;
  const mimeForDb =
    file.type?.trim() || EXT_TO_MIME[resolved.ext] || "application/octet-stream";

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  let publicUrl: string;
  let storagePath: string;

  if (blobToken) {
    try {
      const pathname = `uploads/${filename}`;
      const blob = await put(pathname, buf, {
        access: "public",
        token: blobToken,
        contentType: mimeForDb,
      });
      publicUrl = blob.url;
      storagePath = pathname;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Blob upload failed.";
      console.error("[admin/upload] Vercel Blob upload failed", e);
      return Response.json(
        {
          error: `Could not upload file (${msg}). Check BLOB_READ_WRITE_TOKEN and the Blob store in your Vercel project.`,
        },
        { status: 502 },
      );
    }
  } else {
    const dir = path.join(process.cwd(), "public", "uploads");
    try {
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, filename), buf);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Write failed.";
      return Response.json(
        {
          error: `Could not save file (${msg}). On Vercel, add a Blob store so BLOB_READ_WRITE_TOKEN is set, or paste an image URL instead.`,
        },
        { status: 500 },
      );
    }
    publicUrl = `/uploads/${filename}`;
    storagePath = filename;
  }

  const db = getDb();
  if (db) {
    try {
      await db`
        INSERT INTO uploaded_files (public_url, storage_path, mime_type, byte_size)
        VALUES (${publicUrl}, ${storagePath}, ${mimeForDb}, ${buf.length})
      `;
    } catch (e) {
      console.error("[admin/upload] DB insert failed (upload succeeded)", e);
    }
  }

  return Response.json({ url: publicUrl });
}

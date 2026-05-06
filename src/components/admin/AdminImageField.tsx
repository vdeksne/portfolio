"use client";

import { useEffect, useRef, useState } from "react";
import { adminUploadImage, inputCls } from "@/components/admin/adminFetch";
import { btnSecondary, labelText } from "@/components/admin/adminUi";
import { normalizePublicImageUrl } from "@/lib/image-url";

export function AdminImageField({
  label,
  value,
  onChange,
  setErr,
  helper,
  /** Match public About: 256×256 square preview */
  largeProfilePreview = false,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  setErr: (msg: string | null) => void;
  helper?: string;
  largeProfilePreview?: boolean;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [previewBroken, setPreviewBroken] = useState(false);
  const normalized = normalizePublicImageUrl(value);

  useEffect(() => {
    setPreviewBroken(false);
  }, [normalized]);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setErr(null);
    setBusy(true);
    try {
      const { url } = await adminUploadImage(file);
      onChange(normalizePublicImageUrl(url));
    } catch (err) {
      setErr(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className={`flex flex-col gap-1.5 ${largeProfilePreview ? "" : "sm:col-span-2"}`}
    >
      <span className={labelText}>{label}</span>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <input
          value={value}
          onChange={(e) => onChange(normalizePublicImageUrl(e.target.value))}
          className={`${inputCls} min-w-0 flex-1`}
          placeholder="https://… or /uploads/… after upload"
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className={`${btnSecondary} shrink-0 px-4`}
          aria-label="Upload image file"
        >
          {busy ? "Uploading…" : "Upload image"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,image/avif,.jpg,.jpeg,.png,.webp,.gif,.svg,.avif"
          className="hidden"
          onChange={(e) => void onPick(e)}
        />
      </div>
      {helper ? <span className="text-xs text-white/45">{helper}</span> : null}
      {normalized ? (
        <div className="mt-3 flex flex-col gap-2">
          <span className="text-xs font-medium text-white/50">Preview</span>
          <div
            className={
              largeProfilePreview
                ? "relative aspect-square w-full max-w-64 overflow-hidden border border-white/15 bg-black/30"
                : "relative h-36 w-36 overflow-hidden rounded-xl border border-white/15 bg-black/30"
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={normalized}
              alt=""
              className="h-full w-full object-cover"
              onLoad={() => setPreviewBroken(false)}
              onError={() => setPreviewBroken(true)}
            />
          </div>
          {previewBroken ? (
            <p className="max-w-md text-xs leading-relaxed text-amber-100/90">
              This URL did not load. Often the file is missing under{" "}
              <code className="rounded bg-white/10 px-1 text-[0.7rem]">public/uploads</code> — use
              <strong className="font-medium text-white/80"> Upload image</strong> again, then save
              the page. Use the same dev URL (localhost + port) for the site and /admin.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

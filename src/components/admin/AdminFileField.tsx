"use client";

import { useRef, useState } from "react";
import { adminUploadFile, inputCls } from "@/components/admin/adminFetch";
import { btnSecondary, labelText } from "@/components/admin/adminUi";

export function AdminFileField({
  label,
  value,
  onChange,
  setErr,
  helper,
  accept = "application/pdf,.pdf",
  buttonLabel = "Upload file",
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  setErr: (msg: string | null) => void;
  helper?: string;
  accept?: string;
  buttonLabel?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setErr(null);
    setBusy(true);
    try {
      const { url } = await adminUploadFile(file);
      onChange(url);
    } catch (err) {
      setErr(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className={labelText}>{label}</span>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputCls} min-w-0 flex-1`}
          placeholder="https://… or /uploads/… after upload"
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className={`${btnSecondary} shrink-0 px-4`}
          aria-label={buttonLabel}
        >
          {busy ? "Uploading…" : buttonLabel}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => void onPick(e)}
        />
      </div>
      {helper ? <span className="text-xs text-white/45">{helper}</span> : null}
      {value?.trim() ? (
        <a
          href={value.trim()}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex w-fit rounded-sm text-xs text-white/70 underline decoration-current/25 underline-offset-2 hover:text-white/85"
        >
          Open file
        </a>
      ) : null}
    </div>
  );
}


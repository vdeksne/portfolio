export async function adminUploadImage(file: File): Promise<{ url: string }> {
  const body = new FormData();
  body.set("file", file);
  const res = await fetch("/api/admin/upload", {
    method: "POST",
    credentials: "include",
    body,
  });
  const data = (await res.json().catch(() => ({}))) as { error?: unknown; url?: string };
  if (!res.ok) {
    const msg =
      typeof data.error === "string" ? data.error : JSON.stringify(data.error ?? res.statusText);
    throw new Error(msg);
  }
  if (typeof data.url !== "string" || !data.url.startsWith("/uploads/")) {
    throw new Error("Upload failed.");
  }
  return { url: data.url };
}

export async function adminJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers as Record<string, string>),
    },
  });
  const data = (await res.json().catch(() => ({}))) as { error?: unknown };
  if (!res.ok) {
    const msg =
      typeof data.error === "string"
        ? data.error
        : JSON.stringify(data.error ?? res.statusText);
    throw new Error(msg);
  }
  return data as T;
}

export const inputCls =
  "w-full rounded-lg border border-white/15 bg-zinc-900/90 px-3 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition-[border-color,box-shadow] focus:border-white/28 focus-visible:ring-2 focus-visible:ring-white/18 disabled:cursor-not-allowed disabled:opacity-55";

/** Selects: replaces native chevron with an inset SVG so the arrow isn’t flush to the border. */
export const selectCls = [
  inputCls,
  "cursor-pointer appearance-none pr-10",
  "bg-size-[1.125rem]",
  "bg-position-[right_0.75rem_center]",
  "bg-no-repeat",
  // Full literal (no `${}`) so Tailwind/webpack don’t treat the data URL as a CSS module path.
  "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23a1a1aa%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')]",
].join(" ");

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminLogo } from "@/components/admin/AdminLogo";
import { inputCls } from "@/components/admin/adminFetch";
import { btnPrimary, introText, panelCard } from "@/components/admin/adminUi";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error ?? "Could not sign you in. Check the password and try again.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-col items-center gap-6">
        <AdminLogo size={12} />
        <div className="text-center">
          <h1 className="font-newsreader text-2xl font-medium text-white sm:text-3xl">
            Content admin
          </h1>
          <p className={`${introText} mx-auto mt-3 max-w-sm text-center`}>
            Sign in with the password from <code className="text-white/65">CMS_SECRET</code> in
            your environment.
          </p>
        </div>
      </div>
      <div className={panelCard}>
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-white/80">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
              placeholder="Enter CMS password"
              required
            />
          </label>
          {error ? (
            <div
              className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-100"
              role="alert"
            >
              {error}
            </div>
          ) : null}
          <button type="submit" disabled={loading} className={`${btnPrimary} w-full`}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

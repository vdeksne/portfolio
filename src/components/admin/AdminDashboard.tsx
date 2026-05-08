"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArticlesPanel,
  CertificationsPanel,
  EducationPanel,
  ExperiencesPanel,
  FaqPanel,
  PAGE_OPTIONS,
  PagesPanel,
  ProjectsPanel,
  StackPanel,
} from "@/components/admin/AdminPanels";
import type { PageEditorSlug } from "@/components/admin/pageEditorConfig";
import { AdminContentLocaleProvider, useAdminContentLocale } from "@/components/admin/AdminContentLocale";
import { AdminLogo } from "@/components/admin/AdminLogo";
import {
  dashboardTab,
  dashboardTabActive,
  dashboardTabIdle,
  labelText,
  panelCard,
} from "@/components/admin/adminUi";
import type { Locale } from "@/lib/types";

type Tab =
  | "pages"
  | "projects"
  | "faq"
  | "stack"
  | "experiences"
  | "education"
  | "certifications"
  | "articles";

const TABS: { id: Tab; label: string; description: string }[] = [
  {
    id: "pages",
    label: "Pages",
    description:
      "Main site copy and SEO for Home, Works, Writing, About, and Contact—no code required.",
  },
  {
    id: "projects",
    label: "Projects",
    description:
      "Portfolio items on the Works page and home list. Pick a card, edit fields, or add a new project file.",
  },
  {
    id: "faq",
    label: "FAQ",
    description:
      "Homepage questions and answers. The editor uses JSON: keep commas and brackets valid.",
  },
  {
    id: "stack",
    label: "Stack",
    description:
      "Tool names and links for the About page text list. Shared JSON (name, link per row; icon id optional).",
  },
  {
    id: "experiences",
    label: "Experiences",
    description:
      "Work history shown on the About page. Reorder, edit, delete, or add entries — shared JSON.",
  },
  {
    id: "education",
    label: "Education",
    description:
      "Education history shown on the About page (between Experiences and Stack). Shared JSON (school, program, date, optional location).",
  },
  {
    id: "certifications",
    label: "Certifications",
    description:
      "Certificates and credentials below Stack on About. Shared JSON (name, issuer, date, optional link).",
  },
  {
    id: "articles",
    label: "Articles",
    description: "Blog posts under Writing: metadata, tags, and full Markdown body.",
  },
];

const CONTENT_LANG_OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "lv", label: "Latviešu" },
];

function AdminDashboardInner() {
  const { locale, setLocale } = useAdminContentLocale();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("pages");
  const [pageSlug, setPageSlug] = useState<PageEditorSlug>("home");
  const [status, setStatus] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const flash = useCallback((ok: string) => {
    setStatus(ok);
    setErr(null);
    window.setTimeout(() => setStatus(null), 4200);
  }, []);

  function selectTab(id: Tab) {
    setErr(null);
    setStatus(null);
    setTab(id);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    router.replace("/admin/login");
    router.refresh();
  }

  const activeMeta = TABS.find((t) => t.id === tab)!;

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6 lg:py-10">
      <header className="flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <AdminLogo size={12} />
          <div>
            <h1 className="font-newsreader text-xl font-medium text-white sm:text-2xl">
              Content
            </h1>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/50">
              Copy and data for the selected language live under{" "}
              <code className="rounded bg-white/10 px-1 py-0.5 text-xs text-white/70">
                content/{locale}
              </code>
              . Save after each section—there is no auto-save.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-stretch gap-4 sm:items-end">
          <div
            className="flex flex-col gap-2"
            role="group"
            aria-label="Content language"
          >
            <span className={`${labelText} text-xs text-white/50`}>Language</span>
            <div className="flex flex-wrap gap-1.5">
              {CONTENT_LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={locale === opt.value}
                  onClick={() => setLocale(opt.value)}
                  className={`${dashboardTab} ${locale === opt.value ? dashboardTabActive : dashboardTabIdle}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => void logout()}
            className="rounded-lg border border-white/20 px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/8"
          >
            Log out
          </button>
        </div>
      </header>

      <nav
        className="mt-8 flex flex-col gap-5 border-b border-white/10 pb-6"
        aria-label="Admin navigation"
      >
        <div className="flex flex-col gap-2">
          <span className={`${labelText} text-xs text-white/45`}>Editor</span>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Editor sections">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                id={`admin-tab-${t.id}`}
                aria-controls={`admin-panel-${t.id}`}
                onClick={() => selectTab(t.id)}
                className={`${dashboardTab} ${tab === t.id ? dashboardTabActive : dashboardTabIdle}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        {tab === "pages" ? (
          <div className="flex flex-col gap-2">
            <span className={`${labelText} text-xs text-white/45`}>Site page</span>
            <div
              className="flex flex-wrap gap-2"
              role="tablist"
              aria-label="Pages to edit"
            >
              {PAGE_OPTIONS.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  role="tab"
                  aria-selected={pageSlug === p.slug}
                  id={`admin-page-${p.slug}`}
                  onClick={() => {
                    setErr(null);
                    setPageSlug(p.slug);
                  }}
                  className={`${dashboardTab} ${pageSlug === p.slug ? dashboardTabActive : dashboardTabIdle}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <p
          id={`admin-tab-desc-${tab}`}
          className="text-sm leading-relaxed text-white/45"
          aria-live="polite"
        >
          {activeMeta.description}
        </p>
      </nav>

      <div className={`${panelCard} mt-6`}>
        {status ? (
          <div
            className="mb-6 rounded-lg border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100"
            role="status"
            aria-live="polite"
          >
            {status}
          </div>
        ) : null}
        {err ? (
          <div
            className="mb-6 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100"
            role="alert"
          >
            <p className="font-medium text-red-50">Something went wrong</p>
            <p className="mt-1 whitespace-pre-wrap text-red-100/90">{err}</p>
          </div>
        ) : null}

        <div
          role="tabpanel"
          id={`admin-panel-${tab}`}
          aria-labelledby={`admin-tab-${tab}`}
        >
          {tab === "pages" ? (
            <PagesPanel pageSlug={pageSlug} flash={flash} setErr={setErr} />
          ) : null}
          {tab === "projects" ? <ProjectsPanel flash={flash} setErr={setErr} /> : null}
          {tab === "faq" ? <FaqPanel flash={flash} setErr={setErr} /> : null}
          {tab === "stack" ? <StackPanel flash={flash} setErr={setErr} /> : null}
          {tab === "experiences" ? <ExperiencesPanel flash={flash} setErr={setErr} /> : null}
          {tab === "education" ? <EducationPanel flash={flash} setErr={setErr} /> : null}
          {tab === "certifications" ? (
            <CertificationsPanel flash={flash} setErr={setErr} />
          ) : null}
          {tab === "articles" ? <ArticlesPanel flash={flash} setErr={setErr} /> : null}
        </div>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  return (
    <AdminContentLocaleProvider>
      <AdminDashboardInner />
    </AdminContentLocaleProvider>
  );
}

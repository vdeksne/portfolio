"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AlignLeft,
  ArrowDown,
  ArrowUp,
  FileCode2,
  Heading2,
  Image as ImageIcon,
  Layers,
  Plus,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FaqData, Project } from "@/lib/content";
import { adminJson, inputCls, selectCls } from "@/components/admin/adminFetch";
import { AdminImageField } from "@/components/admin/AdminImageField";
import { useAdminContentLocale } from "@/components/admin/AdminContentLocale";
import {
  btnDanger,
  btnPrimary,
  btnSecondary,
  introText,
  labelText,
  panelCard,
  sectionTitle,
  tipBox,
} from "@/components/admin/adminUi";
import {
  PAGE_EDITOR,
  type PageEditorSlug,
} from "@/components/admin/pageEditorConfig";
import { normalizePublicImageUrl } from "@/lib/image-url";

export const PAGE_OPTIONS: { slug: PageEditorSlug; label: string }[] = [
  { slug: "home", label: "Home" },
  { slug: "works", label: "Works" },
  { slug: "writing", label: "Writing" },
  { slug: "about", label: "About" },
  { slug: "contact", label: "Contact" },
];

export function FaqPanel({
  flash,
  setErr,
}: {
  flash: (s: string) => void;
  setErr: (s: string | null) => void;
}) {
  const { locale } = useAdminContentLocale();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErr(null);
    adminJson<FaqData>(`/api/admin/faq?locale=${locale}`)
      .then((data) => {
        if (!cancelled) setText(JSON.stringify(data, null, 2));
      })
      .catch((e: Error) => setErr(e.message))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [setErr, locale]);

  async function save() {
    setErr(null);
    try {
      const data = JSON.parse(text) as FaqData;
      await adminJson(`/api/admin/faq?locale=${locale}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      flash("FAQ saved.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Invalid JSON or server error");
    }
  }

  if (loading) {
    return (
      <p className="text-sm text-white/55" role="status">
        Loading FAQ…
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <p className={introText}>
        These blocks power the collapsible FAQ on the homepage. Invalid JSON won’t save—use a
        validator if you’re unsure.
      </p>
      <p className={tipBox}>
        Tip: duplicate an existing question object in the file to add a new Q&amp;A; keep the
        same property names (<code className="text-amber-50/90">label</code>,{" "}
        <code className="text-amber-50/90">content</code>).
      </p>
      <label className="flex flex-col gap-2">
        <span className={sectionTitle}>JSON</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={22}
          className={`${inputCls} font-mono text-xs leading-relaxed sm:text-sm`}
          spellCheck={false}
        />
      </label>
      <button type="button" onClick={() => void save()} className={`${btnPrimary} w-fit`}>
        Save FAQ
      </button>
    </div>
  );
}

export function StackPanel({
  flash,
  setErr,
}: {
  flash: (s: string) => void;
  setErr: (s: string | null) => void;
}) {
  const [items, setItems] = useState<{ name: string; link: string; icon: string }[]>([]);
  const [advanced, setAdvanced] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErr(null);
    adminJson<{ items: { name: string; link: string; icon: string }[] }>(
      "/api/admin/stack",
    )
      .then((data) => {
        if (cancelled) return;
        setItems(data.items ?? []);
        setText(JSON.stringify(data, null, 2));
      })
      .catch((e: Error) => setErr(e.message))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [setErr]);

  async function save() {
    setErr(null);
    const payload = { items };
    try {
      await adminJson("/api/admin/stack", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      setText(JSON.stringify(payload, null, 2));
      flash("Stack saved.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
    }
  }

  if (loading) {
    return (
      <p className="text-sm text-white/55" role="status">
        Loading stack…
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <p className={introText}>
        Each <code className="rounded bg-white/10 px-1 text-xs">item</code> is one{" "}
        <strong className="font-medium text-white/70">linked name</strong> in the About page stack
        section (minimal text list, not icons). Use <code className="rounded bg-white/10 px-1 text-xs">name</code> and{" "}
        <code className="rounded bg-white/10 px-1 text-xs">link</code>. The{" "}
        <code className="rounded bg-white/10 px-1 text-xs">icon</code> field is kept for backwards
        compatibility but is not shown there.
      </p>
      <p className={tipBox}>
        This list is shared for every language — it lives in{" "}
        <code className="text-amber-50/90">content/stack.json</code>, not under{" "}
        <code className="text-amber-50/90">content/en</code> or{" "}
        <code className="text-amber-50/90">content/lv</code>.
      </p>
      <p className={tipBox}>
        You can reorder, edit, or delete items below. Use Advanced JSON only if you need it.
      </p>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
            Items ({items.length})
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setItems((prev) => [...prev, { name: "New item", link: "https://", icon: "" }])
              }
              className={btnSecondary}
            >
              <Plus className="mr-2 size-4" aria-hidden />
              Add item
            </button>
            <button
              type="button"
              onClick={() => setAdvanced((v) => !v)}
              className="w-max text-left text-sm font-medium text-white/55 underline decoration-white/25 underline-offset-4 hover:text-white/80"
            >
              {advanced ? "Hide advanced JSON" : "Advanced JSON"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {items.length === 0 ? (
            <p className="text-sm text-white/55">No stack items yet. Click “Add item”.</p>
          ) : null}
          {items.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="rounded-xl border border-white/10 bg-black/20 p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className={labelText}>Name</span>
                    <input
                      value={item.name}
                      onChange={(e) =>
                        setItems((prev) =>
                          prev.map((p, i) => (i === idx ? { ...p, name: e.target.value } : p)),
                        )
                      }
                      className={inputCls}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className={labelText}>Link</span>
                    <input
                      value={item.link}
                      onChange={(e) =>
                        setItems((prev) =>
                          prev.map((p, i) => (i === idx ? { ...p, link: e.target.value } : p)),
                        )
                      }
                      className={inputCls}
                    />
                  </label>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-stretch">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() =>
                      setItems((prev) => {
                        if (idx === 0) return prev;
                        const next = [...prev];
                        const t = next[idx - 1]!;
                        next[idx - 1] = next[idx]!;
                        next[idx] = t;
                        return next;
                      })
                    }
                    className={`${btnSecondary} px-3`}
                    aria-label="Move up"
                  >
                    <ArrowUp className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    disabled={idx === items.length - 1}
                    onClick={() =>
                      setItems((prev) => {
                        if (idx >= prev.length - 1) return prev;
                        const next = [...prev];
                        const t = next[idx + 1]!;
                        next[idx + 1] = next[idx]!;
                        next[idx] = t;
                        return next;
                      })
                    }
                    className={`${btnSecondary} px-3`}
                    aria-label="Move down"
                  >
                    <ArrowDown className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => setItems((prev) => prev.filter((_, i) => i !== idx))}
                    className={`${btnDanger} px-3 py-2`}
                    aria-label="Delete"
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {advanced ? (
          <div className="flex flex-col gap-2 rounded-lg border border-white/10 bg-black/20 p-4">
            <p className="text-xs leading-relaxed text-white/45">
              Advanced mode. Editing JSON updates the list above once valid.
            </p>
            <textarea
              value={text}
              onChange={(e) => {
                const v = e.target.value;
                setText(v);
                try {
                  const parsed = JSON.parse(v) as { items?: { name: string; link: string; icon?: string }[] };
                  if (parsed?.items && Array.isArray(parsed.items)) {
                    setItems(
                      parsed.items.map((x) => ({
                        name: String(x.name ?? ""),
                        link: String(x.link ?? ""),
                        icon: String((x as { icon?: string }).icon ?? ""),
                      })),
                    );
                  }
                } catch {
                  // keep text, don’t overwrite list until JSON is valid
                }
              }}
              rows={14}
              className={`${inputCls} font-mono text-xs leading-relaxed sm:text-sm`}
              spellCheck={false}
            />
          </div>
        ) : null}
      </div>

      <button type="button" onClick={() => void save()} className={`${btnPrimary} w-fit`}>
        Save stack
      </button>
    </div>
  );
}

export function ExperiencesPanel({
  flash,
  setErr,
}: {
  flash: (s: string) => void;
  setErr: (s: string | null) => void;
}) {
  const [items, setItems] = useState<{ title: string; company: string; date: string }[]>([]);
  const [advanced, setAdvanced] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErr(null);
    adminJson<{ items: { title: string; company: string; date: string }[] }>(
      "/api/admin/experiences",
    )
      .then((data) => {
        if (cancelled) return;
        setItems(data.items ?? []);
        setText(JSON.stringify(data, null, 2));
      })
      .catch((e: Error) => setErr(e.message))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [setErr]);

  async function save() {
    setErr(null);
    const payload = { items };
    try {
      await adminJson("/api/admin/experiences", {
        method: "PUT",
        body: JSON.stringify(payload),
      });
      setText(JSON.stringify(payload, null, 2));
      flash("Experiences saved.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
    }
  }

  if (loading) {
    return (
      <p className="text-sm text-white/55" role="status">
        Loading experiences…
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <p className={introText}>
        This list powers the <strong className="font-medium text-white/70">Experiences</strong>{" "}
        section on the public About page. Reorder, edit, delete, or add items here.
      </p>
      <p className={tipBox}>
        Shared for every language — stored in{" "}
        <code className="text-amber-50/90">content/experiences.json</code>.
      </p>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
            Items ({items.length})
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                setItems((prev) => [
                  ...prev,
                  { title: "New role", company: "Company", date: "Year - Year" },
                ])
              }
              className={btnSecondary}
            >
              <Plus className="mr-2 size-4" aria-hidden />
              Add experience
            </button>
            <button
              type="button"
              onClick={() => setAdvanced((v) => !v)}
              className="w-max text-left text-sm font-medium text-white/55 underline decoration-white/25 underline-offset-4 hover:text-white/80"
            >
              {advanced ? "Hide advanced JSON" : "Advanced JSON"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {items.length === 0 ? (
            <p className="text-sm text-white/55">No experiences yet. Click “Add experience”.</p>
          ) : null}
          {items.map((item, idx) => (
            <div
              key={`${item.title}-${item.company}-${idx}`}
              className="rounded-xl border border-white/10 bg-black/20 p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className={labelText}>Title</span>
                    <input
                      value={item.title}
                      onChange={(e) =>
                        setItems((prev) =>
                          prev.map((p, i) => (i === idx ? { ...p, title: e.target.value } : p)),
                        )
                      }
                      className={inputCls}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className={labelText}>Company</span>
                    <input
                      value={item.company}
                      onChange={(e) =>
                        setItems((prev) =>
                          prev.map((p, i) => (i === idx ? { ...p, company: e.target.value } : p)),
                        )
                      }
                      className={inputCls}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 sm:col-span-2">
                    <span className={labelText}>Date</span>
                    <input
                      value={item.date}
                      onChange={(e) =>
                        setItems((prev) =>
                          prev.map((p, i) => (i === idx ? { ...p, date: e.target.value } : p)),
                        )
                      }
                      className={inputCls}
                    />
                  </label>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2 sm:flex-col sm:items-stretch">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() =>
                      setItems((prev) => {
                        if (idx === 0) return prev;
                        const next = [...prev];
                        const t = next[idx - 1]!;
                        next[idx - 1] = next[idx]!;
                        next[idx] = t;
                        return next;
                      })
                    }
                    className={`${btnSecondary} px-3`}
                    aria-label="Move up"
                  >
                    <ArrowUp className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    disabled={idx === items.length - 1}
                    onClick={() =>
                      setItems((prev) => {
                        if (idx >= prev.length - 1) return prev;
                        const next = [...prev];
                        const t = next[idx + 1]!;
                        next[idx + 1] = next[idx]!;
                        next[idx] = t;
                        return next;
                      })
                    }
                    className={`${btnSecondary} px-3`}
                    aria-label="Move down"
                  >
                    <ArrowDown className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => setItems((prev) => prev.filter((_, i) => i !== idx))}
                    className={`${btnDanger} px-3 py-2`}
                    aria-label="Delete"
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {advanced ? (
          <div className="flex flex-col gap-2 rounded-lg border border-white/10 bg-black/20 p-4">
            <p className="text-xs leading-relaxed text-white/45">
              Advanced mode. Editing JSON updates the list above once valid.
            </p>
            <textarea
              value={text}
              onChange={(e) => {
                const v = e.target.value;
                setText(v);
                try {
                  const parsed = JSON.parse(v) as { items?: { title: string; company: string; date: string }[] };
                  if (parsed?.items && Array.isArray(parsed.items)) {
                    setItems(
                      parsed.items.map((x) => ({
                        title: String(x.title ?? ""),
                        company: String(x.company ?? ""),
                        date: String(x.date ?? ""),
                      })),
                    );
                  }
                } catch {
                  // keep text, don’t overwrite list until JSON is valid
                }
              }}
              rows={14}
              className={`${inputCls} font-mono text-xs leading-relaxed sm:text-sm`}
              spellCheck={false}
            />
          </div>
        ) : null}
      </div>

      <button type="button" onClick={() => void save()} className={`${btnPrimary} w-fit`}>
        Save experiences
      </button>
    </div>
  );
}

type ProjectRow = { id: string; project: Project };

export function ProjectsPanel({
  flash,
  setErr,
}: {
  flash: (s: string) => void;
  setErr: (s: string | null) => void;
}) {
  const { locale } = useAdminContentLocale();
  const [rows, setRows] = useState<ProjectRow[]>([]);
  const [selected, setSelected] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [release, setRelease] = useState("");
  const [date, setDate] = useState("");
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const load = useCallback(async () => {
    setErr(null);
    const list = await adminJson<ProjectRow[]>(
      `/api/admin/projects?locale=${locale}`,
    );
    setRows(list);
    return list;
  }, [setErr, locale]);

  useEffect(() => {
    setSelected("");
    setId("");
    setName("");
    setImage("");
    setLink("");
    setRelease("");
    setDate("");
    setFeatured(false);
  }, [locale]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    load()
      .catch((e: Error) => {
        if (!cancelled) setErr(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [load, setErr]);

  function fillFrom(p: Project, fileId: string) {
    setId(fileId);
    setSelected(fileId);
    setName(p.name);
    setImage(p.image);
    setLink(p.link);
    setRelease(p.release);
    setDate(p.date ?? "");
    setFeatured(Boolean(p.featured));
  }

  useEffect(() => {
    if (!selected || !rows.length) return;
    const row = rows.find((r) => r.id === selected);
    if (!row) return;
    const p = row.project;
    setId(row.id);
    setName(p.name);
    setImage(p.image);
    setLink(p.link);
    setRelease(p.release);
    setDate(p.date ?? "");
    setFeatured(Boolean(p.featured));
  }, [selected, rows]);

  async function save() {
    setErr(null);
    const project: Project = {
      name,
      image,
      link,
      release,
      ...(date.trim() ? { date: date.trim() } : {}),
    };
    if (featured) project.featured = true;
    try {
      await adminJson(`/api/admin/projects/${encodeURIComponent(id)}?locale=${locale}`, {
        method: "PUT",
        body: JSON.stringify(project),
      });
      flash("Project saved.");
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
    }
  }

  async function createNew() {
    setErr(null);
    const newId = window.prompt("File id (lowercase, e.g. my-app):");
    if (!newId?.trim()) return;
    const slug = newId.trim().toLowerCase();
    if (!/^[a-z0-9][a-z0-9-]{0,120}$/i.test(slug)) {
      setErr("Invalid id: use letters, numbers, hyphens only.");
      return;
    }
    try {
      const proj: Project = {
        name: name || "New project",
        image: image || "https://",
        link: link || "https://",
        release: release || "soon",
        ...(date.trim() ? { date: date.trim() } : {}),
      };
      if (featured) proj.featured = true;
      await adminJson(`/api/admin/projects?locale=${locale}`, {
        method: "POST",
        body: JSON.stringify({
          id: slug,
          project: proj,
        }),
      });
      setCreating(false);
      flash("Project created.");
      const list = await load();
      const row = list.find((r) => r.id === slug);
      if (row) fillFrom(row.project, row.id);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Create failed");
    }
  }

  async function remove() {
    if (!id || !window.confirm(`Delete project file "${id}.json"?`)) return;
    setErr(null);
    try {
      await adminJson(`/api/admin/projects/${encodeURIComponent(id)}?locale=${locale}`, {
        method: "DELETE",
      });
      flash("Project deleted.");
      setSelected("");
      setId("");
      setName("");
      setImage("");
      setLink("");
      setRelease("");
      setDate("");
      setFeatured(false);
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Delete failed");
    }
  }

  if (loading) {
    return (
      <p className="text-sm text-white/55" role="status">
        Loading projects…
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <p className={introText}>
        Each entry is a file in{" "}
        <code className="rounded bg-white/10 px-1 text-xs">
          content/{locale}/projects/
        </code>
        . Pick a project, change the fields, then save. Turn on{" "}
        <strong className="font-medium text-white/70">Featured on home</strong> for the project
        highlighted on the landing page.
      </p>
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1.5">
          <span className={labelText}>Project</span>
          <select
            value={selected}
            onChange={(e) => {
              const v = e.target.value;
              setSelected(v);
              const row = rows.find((r) => r.id === v);
              if (row) fillFrom(row.project, row.id);
            }}
            className={`${selectCls} w-full max-w-md sm:w-72`}
          >
            <option value="">Select a project…</option>
            {rows.map((r) => (
              <option key={r.id} value={r.id}>
                {r.id} — {r.project.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => {
            setCreating(true);
            setSelected("");
            setId("");
            setName("");
            setImage("");
            setLink("");
            setRelease("");
            setDate("");
            setFeatured(false);
          }}
          className={btnSecondary}
        >
          New project…
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={labelText}>File id</span>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={!creating && Boolean(selected)}
            className={inputCls}
            placeholder="e.g. wn"
          />
          <span className="text-xs text-white/40">Lowercase; becomes the .json filename.</span>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelText}>Display name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </label>
        <AdminImageField
          label="Card image"
          value={image}
          onChange={setImage}
          setErr={setErr}
          helper="Upload a file (max 4 MB) or paste an external URL. Uploaded files are saved as /uploads/… on this server."
        />
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className={labelText}>Project link</span>
          <input value={link} onChange={(e) => setLink(e.target.value)} className={inputCls} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelText}>Release label</span>
          <input
            value={release}
            onChange={(e) => setRelease(e.target.value)}
            className={inputCls}
            placeholder="e.g. 2024 · Live"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelText}>Date (optional)</span>
          <input value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
        </label>
      </div>
      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-white/80">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="size-4 rounded border-white/30 accent-white"
        />
        Featured on home
      </label>
      <div className="flex flex-wrap gap-2">
        {creating ? (
          <button type="button" onClick={() => void createNew()} className={btnPrimary}>
            Create project
          </button>
        ) : (
          <button type="button" onClick={() => void save()} disabled={!id} className={btnPrimary}>
            Save changes
          </button>
        )}
        <button
          type="button"
          onClick={() => void remove()}
          disabled={!selected}
          className={btnDanger}
        >
          Delete file
        </button>
      </div>
    </div>
  );
}

function EditorSectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-white/65 ring-1 ring-white/10"
          aria-hidden
        >
          <Icon className="size-[1.125rem]" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold tracking-tight text-white">{title}</h4>
          {description ? (
            <p className="mt-1 text-xs leading-relaxed text-white/45">{description}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** Richer layout for About: mirrors public page blocks (header → photo + bio → stack). */
function AboutPageFields({
  slots,
  setSlot,
  setErr,
}: {
  slots: Record<string, string>;
  setSlot: (key: string, value: string) => void;
  setErr: (msg: string | null) => void;
}) {
  const about = PAGE_EDITOR.about;
  const field = (key: string) => about.fields.find((f) => f.key === key);

  const titleF = field("title")!;
  const subtitleF = field("subtitle")!;
  const imageF = field("profile_image")!;
  const introF = field("intro")!;
  const stackTitleF = field("stack_title")!;
  const stackDescF = field("stack_description")!;
  const expF = field("experiences")!;

  return (
    <div className="flex flex-col gap-5">
      <div className={`${tipBox} border-white/10 bg-white/[0.04] text-white/70`}>
        <p className="text-sm leading-relaxed">
          This mirrors your live <strong className="font-medium text-white/85">About</strong> page:
          headline, square photo beside your bio, experiences, then a{" "}
          <strong className="font-medium text-white/85">text-only stack</strong> (title + description
          here; tool names come from the <strong className="font-medium text-white/85">Stack</strong>{" "}
          tab). Saving syncs the <strong className="font-medium text-white/85">profile photo URL</strong>{" "}
          across English and Latvian.
        </p>
      </div>

      <div className={panelCard}>
        <EditorSectionHeader
          icon={Heading2}
          title="Page header"
          description="Main title and line under it — matches the H1 and subtitle on /about."
        />
        <div className="grid gap-4">
          <label className="flex flex-col gap-1.5">
            <span className={labelText}>{titleF.label}</span>
            <input
              value={slots.title ?? ""}
              onChange={(e) => setSlot("title", e.target.value)}
              className={inputCls}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelText}>{subtitleF.label}</span>
            <textarea
              value={slots.subtitle ?? ""}
              onChange={(e) => setSlot("subtitle", e.target.value)}
              rows={subtitleF.rows ?? 2}
              className={`${inputCls} min-h-11`}
            />
          </label>
        </div>
      </div>

      <div className={panelCard}>
        <EditorSectionHeader
          icon={ImageIcon}
          title="Profile & introduction"
          description="Square crop on the site. Upload stays under public/uploads — paste an HTTPS URL if you prefer."
        />
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,17.5rem)_minmax(0,1fr)] lg:items-start lg:gap-10">
          <div className="flex flex-col">
            <AdminImageField
              label={imageF.label}
              value={slots.profile_image ?? ""}
              onChange={(url) => setSlot("profile_image", url)}
              setErr={setErr}
              helper={imageF.hint}
              largeProfilePreview
            />
          </div>
          <label className="flex min-h-[8rem] flex-col gap-1.5 lg:pt-0">
            <span className={`${labelText} flex items-center gap-2`}>
              <AlignLeft className="size-3.5 text-white/35" strokeWidth={2} aria-hidden />
              {introF.label}
            </span>
            <textarea
              value={slots.intro ?? ""}
              onChange={(e) => setSlot("intro", e.target.value)}
              rows={introF.rows ?? 10}
              className={`${inputCls} min-h-[12rem] flex-1 leading-relaxed`}
            />
            {introF.hint ? (
              <span className="text-xs font-normal text-white/45">{introF.hint}</span>
            ) : null}
          </label>
        </div>
      </div>

      <div className={panelCard}>
        <EditorSectionHeader
          icon={Layers}
          title="Stack section"
          description="Title and intro above the linked tool names. Edit the list itself under Editor → Stack (content/stack.json)."
        />
        <div className="grid gap-4">
          <label className="flex flex-col gap-1.5">
            <span className={labelText}>{stackTitleF.label}</span>
            <input
              value={slots.stack_title ?? ""}
              onChange={(e) => setSlot("stack_title", e.target.value)}
              className={inputCls}
            />
            {stackTitleF.hint ? (
              <span className="text-xs font-normal text-white/45">{stackTitleF.hint}</span>
            ) : null}
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={labelText}>{stackDescF.label}</span>
            <textarea
              value={slots.stack_description ?? ""}
              onChange={(e) => setSlot("stack_description", e.target.value)}
              rows={stackDescF.rows ?? 3}
              className={`${inputCls} min-h-11`}
            />
            {stackDescF.hint ? (
              <span className="text-xs font-normal text-white/45">{stackDescF.hint}</span>
            ) : null}
          </label>
        </div>
      </div>

      <div className={`${panelCard} border-white/[0.06] bg-black/15`}>
        <EditorSectionHeader
          icon={FileCode2}
          title="Experience block (optional)"
          description="Raw MDC slot for advanced layouts; leave empty if you don’t use it."
        />
        <label className="flex flex-col gap-1.5">
          <span className={labelText}>{expF.label}</span>
          <textarea
            value={slots.experiences ?? ""}
            onChange={(e) => setSlot("experiences", e.target.value)}
            rows={expF.rows ?? 12}
            className={`${inputCls} min-h-[10rem] font-mono text-xs leading-relaxed sm:text-sm`}
            spellCheck={false}
          />
          {expF.hint ? (
            <span className="text-xs font-normal text-white/45">{expF.hint}</span>
          ) : null}
        </label>
      </div>
    </div>
  );
}

export function PagesPanel({
  pageSlug,
  flash,
  setErr,
}: {
  pageSlug: PageEditorSlug;
  flash: (s: string) => void;
  setErr: (s: string | null) => void;
}) {
  const { locale } = useAdminContentLocale();
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [slots, setSlots] = useState<Record<string, string>>({});
  const [extraSlotsJson, setExtraSlotsJson] = useState("{}");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErr(null);
    adminJson<{
      meta: { title?: string; description?: string };
      block: string;
      slots: Record<string, string>;
    }>(`/api/admin/pages/${pageSlug}?locale=${locale}`)
      .then((data) => {
        if (cancelled) return;
        setMetaTitle(data.meta.title ?? "");
        setMetaDesc(data.meta.description ?? "");
        setSlots({ ...data.slots });
        const known = new Set(
          PAGE_EDITOR[pageSlug].fields.map((f) => f.key),
        );
        const extra: Record<string, string> = {};
        for (const [k, v] of Object.entries(data.slots)) {
          if (!known.has(k)) extra[k] = v;
        }
        setExtraSlotsJson(JSON.stringify(extra, null, 2));
      })
      .catch((e: Error) => setErr(e.message))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [pageSlug, setErr, locale]);

  function setSlot(key: string, value: string) {
    setSlots((prev) => ({ ...prev, [key]: value }));
  }

  async function save() {
    setErr(null);
    let extra: Record<string, string>;
    try {
      extra = JSON.parse(extraSlotsJson) as Record<string, string>;
      if (extra === null || typeof extra !== "object" || Array.isArray(extra)) {
        setErr("Advanced “extra slots” must be a JSON object.");
        return;
      }
      for (const k of Object.keys(extra)) {
        if (typeof extra[k] !== "string") {
          setErr(`Extra slot "${k}" must be a string value.`);
          return;
        }
      }
    } catch {
      setErr("Advanced “extra slots” must be valid JSON.");
      return;
    }

    const def = PAGE_EDITOR[pageSlug];
    const knownKeys = new Set(def.fields.map((f) => f.key));
    const merged: Record<string, string> = { ...extra };
    for (const key of knownKeys) {
      let v = slots[key] ?? "";
      const fieldDef = def.fields.find((f) => f.key === key);
      if (fieldDef?.kind === "image") {
        v = normalizePublicImageUrl(v);
      }
      merged[key] = v;
    }

    try {
      await adminJson(`/api/admin/pages/${pageSlug}?locale=${locale}`, {
        method: "PUT",
        body: JSON.stringify({
          meta: { title: metaTitle, description: metaDesc },
          block: def.block,
          slots: merged,
        }),
      });
      flash("Page saved.");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
    }
  }

  const def = PAGE_EDITOR[pageSlug];

  return (
    <div className="flex flex-col gap-6">
      <p className={introText}>
        {pageSlug === "about" ? (
          <>
            <strong className="font-medium text-white/70">SEO</strong> controls the browser tab title
            and snippet. Content below is grouped like your public About page (header, photo + intro,
            stack, optional MDC).
          </>
        ) : (
          <>
            Choose a route and edit the fields below. The{" "}
            <strong className="font-medium text-white/70">About</strong> page uses a richer editor with
            sections; other routes use a simple list of fields.{" "}
            <strong className="font-medium text-white/70">SEO</strong> sets the browser tab title and
            search description.
          </>
        )}
      </p>
      {loading ? (
        <p className="text-sm text-white/55" role="status">
          Loading page…
        </p>
      ) : (
        <>
          <p className="text-sm font-medium text-white/70">{def.group}</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 sm:col-span-2">
              <span className={labelText}>SEO title</span>
              <input
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className={inputCls}
                placeholder="Browser tab & search title"
              />
            </label>
            <label className="flex flex-col gap-1.5 sm:col-span-2">
              <span className={labelText}>SEO description</span>
              <textarea
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                rows={3}
                className={inputCls}
                placeholder="Short summary for search and social previews"
              />
            </label>
          </div>

          <div className="flex flex-col gap-5 border-t border-white/10 pt-6">
            <h3 className={sectionTitle}>Page content</h3>
            {pageSlug === "about" ? (
              <AboutPageFields slots={slots} setSlot={setSlot} setErr={setErr} />
            ) : (
              <div className="flex flex-col gap-5">
                {def.fields.map((f) =>
                  f.kind === "image" ? (
                    <div key={f.key}>
                      <AdminImageField
                        label={f.label}
                        value={slots[f.key] ?? ""}
                        onChange={(url) => setSlot(f.key, url)}
                        setErr={setErr}
                        helper={f.hint}
                      />
                    </div>
                  ) : (
                    <label key={f.key} className="flex flex-col gap-1.5 text-sm text-white/80">
                      <span className={labelText}>{f.label}</span>
                      <textarea
                        value={slots[f.key] ?? ""}
                        onChange={(e) => setSlot(f.key, e.target.value)}
                        rows={f.rows ?? 3}
                        className={`${inputCls} min-h-11`}
                      />
                      {f.hint ? (
                        <span className="text-xs font-normal text-white/45">{f.hint}</span>
                      ) : null}
                    </label>
                  ),
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className="w-max text-left text-sm font-medium text-white/55 underline decoration-white/25 underline-offset-4 hover:text-white/80"
          >
            {showAdvanced ? "Hide advanced JSON" : "Advanced — extra MDC slots (JSON)"}
          </button>
          {showAdvanced ? (
            <div className="flex flex-col gap-2 rounded-lg border border-white/10 bg-black/20 p-4">
              <p className="text-xs leading-relaxed text-white/45">
                For rare MDC keys not listed above. Must be a JSON object of strings. Keys here
                must not duplicate the main fields.
              </p>
              <textarea
                value={extraSlotsJson}
                onChange={(e) => setExtraSlotsJson(e.target.value)}
                rows={8}
                className={`${inputCls} font-mono text-xs sm:text-sm`}
                spellCheck={false}
              />
            </div>
          ) : null}

          <button type="button" onClick={() => void save()} className={`${btnPrimary} w-fit`}>
            Save page
          </button>
        </>
      )}
    </div>
  );
}

type ArticleListItem = { slug: string; meta: { title: string } };

export function ArticlesPanel({
  flash,
  setErr,
}: {
  flash: (s: string) => void;
  setErr: (s: string | null) => void;
}) {
  const { locale } = useAdminContentLocale();
  const [list, setList] = useState<ArticleListItem[]>([]);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [tagsStr, setTagsStr] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const loadList = useCallback(async () => {
    const rows = await adminJson<{ slug: string; meta: { title: string } }[]>(
      `/api/admin/articles?locale=${locale}`,
    );
    setList(rows);
    return rows;
  }, [locale]);

  useEffect(() => {
    setSlug("");
    setTitle("");
    setDescription("");
    setDate("");
    setImage("");
    setReadingTime("");
    setTagsStr("");
    setBody("");
    setCreating(false);
  }, [locale]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErr(null);
    loadList()
      .catch((e: Error) => {
        if (!cancelled) setErr(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [loadList, setErr]);

  async function loadArticle(s: string) {
    setErr(null);
    const a = await adminJson<{
      meta: {
        title: string;
        description: string;
        date: string;
        image: string;
        readingTime: string;
        tags: string[];
      };
      body: string;
    }>(`/api/admin/articles/${encodeURIComponent(s)}?locale=${locale}`);
    setSlug(s);
    setTitle(a.meta.title);
    setDescription(a.meta.description);
    setDate(a.meta.date);
    setImage(a.meta.image);
    setReadingTime(a.meta.readingTime);
    setTagsStr(a.meta.tags.join(", "));
    setBody(a.body);
    setCreating(false);
  }

  function blankArticle() {
    setCreating(true);
    setSlug("");
    setTitle("");
    setDescription("");
    setDate("");
    setImage("");
    setReadingTime("5");
    setTagsStr("");
    setBody("");
  }

  async function save() {
    setErr(null);
    const tags = tagsStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const meta = {
      title,
      description,
      date,
      image,
      readingTime,
      tags,
    };
    try {
      if (creating) {
        const s = window.prompt("Article slug (e.g. my-new-post):");
        if (!s?.trim()) return;
        const newSlug = s.trim().toLowerCase();
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(newSlug)) {
          setErr("Invalid slug.");
          return;
        }
        await adminJson(`/api/admin/articles?locale=${locale}`, {
          method: "POST",
          body: JSON.stringify({ slug: newSlug, meta, body }),
        });
        flash("Article created.");
        setSlug(newSlug);
        setCreating(false);
      } else {
        if (!slug) {
          setErr("Select or create an article first.");
          return;
        }
        await adminJson(`/api/admin/articles/${encodeURIComponent(slug)}?locale=${locale}`, {
          method: "PUT",
          body: JSON.stringify({ meta, body }),
        });
        flash("Article saved.");
      }
      await loadList();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
    }
  }

  async function remove() {
    if (!slug || !window.confirm(`Delete "${slug}.md"?`)) return;
    setErr(null);
    try {
      await adminJson(`/api/admin/articles/${encodeURIComponent(slug)}?locale=${locale}`, {
        method: "DELETE",
      });
      flash("Article deleted.");
      blankArticle();
      await loadList();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Delete failed");
    }
  }

  if (loading) {
    return (
      <p className="text-sm text-white/55" role="status">
        Loading articles…
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <p className={introText}>
        Pick an article to edit, or choose &quot;New article&quot; and fill the form. Creating an
        article asks for a <strong className="font-medium text-white/70">slug</strong> (URL
        segment, lowercase with hyphens).
      </p>
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1.5">
          <span className={labelText}>Article</span>
          <select
            value={slug}
            onChange={(e) => {
              const v = e.target.value;
              if (!v) {
                blankArticle();
                return;
              }
              void loadArticle(v);
            }}
            className={`${selectCls} max-w-md`}
          >
            <option value="">New article…</option>
            {list.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.slug} — {a.meta.title}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={blankArticle} className={btnSecondary}>
          Clear form
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className={labelText}>Title</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
        </label>
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className={labelText}>Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className={inputCls}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelText}>Date</span>
          <input value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={labelText}>Reading time (minutes)</span>
          <input
            value={readingTime}
            onChange={(e) => setReadingTime(e.target.value)}
            className={inputCls}
          />
        </label>
        <AdminImageField
          label="Cover image"
          value={image}
          onChange={setImage}
          setErr={setErr}
          helper="Used on the writing grid and article header. JPEG, PNG, WebP, GIF, AVIF, or SVG — max 4 MB."
        />
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className={labelText}>Tags</span>
          <input
            value={tagsStr}
            onChange={(e) => setTagsStr(e.target.value)}
            className={inputCls}
            placeholder="Comma-separated, e.g. design, nextjs"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5">
        <span className={labelText}>Markdown body</span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={18}
          className={`${inputCls} font-mono text-xs leading-relaxed sm:text-sm`}
          spellCheck={false}
        />
      </label>
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => void save()} className={btnPrimary}>
          {creating || !slug ? "Create article" : "Save article"}
        </button>
        <button
          type="button"
          onClick={() => void remove()}
          disabled={!slug || creating}
          className={btnDanger}
        >
          Delete article
        </button>
      </div>
    </div>
  );
}

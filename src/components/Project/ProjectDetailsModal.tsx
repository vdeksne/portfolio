"use client";

import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import clsx from "clsx";
import { ArrowRight, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Project } from "@/lib/content";

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

export function ProjectDetailsModal({
  project,
  trigger,
  initialOpen,
}: {
  project: Project;
  trigger: (args: { open: boolean; onOpen: () => void }) => ReactNode;
  initialOpen?: boolean;
}) {
  const t = useTranslations("global");
  const [open, setOpen] = useState(false);
  const dialogId = useId();
  useLockBodyScroll(open);

  const tools = useMemo(
    () => (project.tools ?? []).map((x) => x.trim()).filter(Boolean),
    [project.tools],
  );

  useEffect(() => {
    if (initialOpen) setOpen(true);
    // Only on mount; avoid reopening if parent re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      {trigger({ open, onOpen: () => setOpen(true) })}

      {open ? (
        <div
          id={dialogId}
          role="dialog"
          aria-modal="true"
          aria-label={project.name}
          className="fixed inset-0 z-70 flex items-end justify-center sm:items-center"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
            aria-label={t("close")}
          />

          <div
            className={clsx(
              "project-card-frame relative z-10 w-full max-w-3xl rounded-t-2xl bg-(--ui-bg) p-2 shadow-2xl sm:rounded-2xl sm:p-3",
              "mx-[max(0.75rem,env(safe-area-inset-left))] mb-[max(0.75rem,env(safe-area-inset-bottom))] sm:mx-6 sm:mb-6",
            )}
          >
            <div className="flex gap-1 px-1 py-[2px]">
              <div className="size-2 rounded-full bg-white/10" />
              <div className="size-2 rounded-full bg-white/10" />
              <div className="size-2 rounded-full bg-white/10" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="ml-auto inline-flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:text-(--font-primary)"
                aria-label={t("close")}
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl bg-(--bg-card)">
              <div className="relative h-56 w-full sm:h-72">
                <Image
                  fill
                  sizes="(max-width: 640px) 100vw, 768px"
                  alt={`${project.name} preview`}
                  src={project.image}
                  className="object-cover"
                />
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-newsreader text-2xl tracking-tight text-(--font-primary) sm:text-3xl">
                    {project.name}
                  </h3>
                  <span className="text-muted text-sm">
                    {project.release === "soon" ? `${t("soon")}...` : project.release}
                  </span>
                </div>

                {project.description?.trim() ? (
                  <p className="text-muted mt-4 whitespace-pre-wrap text-sm leading-relaxed sm:text-base">
                    {project.description.trim()}
                  </p>
                ) : null}

                {tools.length ? (
                  <div className="mt-5">
                    <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted">
                      {t("tools_used")}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full border border-(--border-primary) bg-(--ui-bg)/55 px-3 py-1 text-xs font-medium text-(--font-primary)"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {project.release !== "soon" ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-(--border-primary) bg-(--ui-bg)/55 px-5 text-sm font-semibold tracking-tight text-(--font-primary) transition-colors hover:border-(--border-primary-hover) hover:bg-(--bg-card)"
                    >
                      {t("visit_site")}
                      <ArrowRight className="ml-2 size-4" aria-hidden />
                    </a>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex min-h-11 items-center justify-center rounded-full px-4 text-sm font-medium text-muted transition-colors hover:text-(--font-primary)"
                  >
                    {t("close")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}


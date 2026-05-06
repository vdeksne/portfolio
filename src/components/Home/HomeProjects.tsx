"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { Project } from "@/lib/content";

export function HomeProjects({ projects }: { projects: Project[] }) {
  const t = useTranslations();
  const featured = projects.filter((p) => p.featured);
  return (
    <div className="flex min-w-0 w-full flex-col gap-5 sm:gap-6">
      <h3 className="font-newsreader text-xl text-white-shadow sm:text-2xl">
        {t("navigation.works")}
      </h3>
      <div className="flex min-w-0 w-full flex-col gap-3 sm:gap-4">
        {featured.map((project) => {
          const releaseLabel =
            project.release === "soon"
              ? `${t("global.soon")}...`
              : project.release;
          const row = (
            <>
              <span className="min-w-0 break-words font-medium sm:shrink-0 sm:whitespace-nowrap">
                {project.name}
              </span>
              <span
                className="hidden min-w-[0.5rem] flex-1 sm:block"
                aria-hidden
              />
              <span className="min-w-0 text-sm text-white/75 sm:shrink-0 sm:whitespace-nowrap sm:text-base">
                {releaseLabel}
              </span>
            </>
          );
          const className =
            "flex min-h-11 min-w-0 cursor-pointer flex-col gap-1 rounded-lg px-3 py-3 touch-manipulation sm:min-h-0 sm:flex-row sm:items-center sm:gap-2 sm:px-4 sm:py-2 hover:bg-[#070707] hover:drop-shadow-[0px_0px_2px_#ffffff] active:bg-[#070707]/80";
          if (project.release === "soon") {
            return (
              <Link
                key={project.name}
                href="/"
                className={className}
                aria-label={`go to ${project.name} project website`}
              >
                {row}
              </Link>
            );
          }
          return (
            <a
              key={project.name}
              href={project.link}
              className={className}
              aria-label={`go to ${project.name} project website`}
              target="_blank"
              rel="noreferrer"
            >
              {row}
            </a>
          );
        })}
      </div>
      <Link
        href="/works"
        className="inline-flex min-h-11 max-w-max items-center touch-manipulation sm:min-h-0"
      >
        <span className="font-newsreader text-white-shadow cursor-pointer text-base sm:text-lg">
          {t("global.see_more")}
        </span>
      </Link>
    </div>
  );
}

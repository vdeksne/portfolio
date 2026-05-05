"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import type { Project } from "@/lib/content";

export function HomeProjects({ projects }: { projects: Project[] }) {
  const t = useTranslations();
  const featured = projects.filter((p) => p.featured);
  return (
    <div className="flex w-full flex-col gap-6">
      <h3 className="font-newsreader text-white-shadow text-xl">
        {t("navigation.works")}
      </h3>
      <div className="flex w-full flex-col gap-4">
        {featured.map((project) => {
          const row = (
            <>
              <span className="whitespace-nowrap font-medium">
                {project.name}
              </span>
              <div className="mx-2 h-[0.1px] w-full bg-[var(--font-muted)] opacity-40" />
              <span className="whitespace-nowrap">
                {project.release === "soon"
                  ? `${t("global.soon")}...`
                  : project.release}
              </span>
            </>
          );
          const className =
            "flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 hover:bg-[#010F19] hover:drop-shadow-[0px_0px_2px_#0AFA94]";
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
      <Link href="/works">
        <span className="font-newsreader text-white-shadow cursor-pointer">
          {t("global.see_more")}
        </span>
      </Link>
    </div>
  );
}

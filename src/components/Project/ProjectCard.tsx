"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { Project } from "@/lib/content";

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("global");
  return (
    <a
      aria-label={`${project.name} project link`}
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="project-card-frame group relative flex cursor-pointer flex-col gap-1 rounded-lg bg-zinc-900/80 p-1 shadow-2xl shadow-zinc-950/50 backdrop-blur-sm"
    >
      <div className="flex gap-1 px-1 py-[2px]">
        <div className="size-2 rounded-full bg-red-500/90 transition-all duration-300 group-hover:bg-red-500/90 sm:bg-white/10" />
        <div className="size-2 rounded-full bg-yellow-500/90 transition-all duration-300 group-hover:bg-yellow-500/90 sm:bg-white/10" />
        <div className="size-2 rounded-full bg-white/90 transition-all duration-300 group-hover:bg-white/90 sm:bg-white/10" />
      </div>
      <div className="flex h-56 justify-center overflow-hidden rounded-lg">
        <Image
          width={1536}
          height={224}
          alt={`${project.name} project image`}
          className="h-full rounded-lg object-cover transition-all duration-300 hover:scale-105"
          src={project.image}
        />
      </div>
      <div className="absolute bottom-0 flex w-full justify-center">
        <div className="project-card-caption rounded-t-lg bg-zinc-950/85 px-4 py-[5px] shadow-md backdrop-blur-md sm:w-2/3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="project-card-title whitespace-nowrap text-sm font-semibold text-white">
                {project.name}
              </span>
              <span className="project-card-meta whitespace-nowrap text-xs text-neutral-500">
                {project.release === "soon"
                  ? `${t("soon")}...`
                  : project.release}
              </span>
            </div>
            <div className="flex items-center justify-center rounded-full p-1 shadow-md backdrop-blur-md transition-all duration-500 group-hover:-rotate-45">
              <ArrowRight className="project-card-arrow size-3 text-white" />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

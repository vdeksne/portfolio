import { Divider } from "./divider";
import { ProjectCard } from "./project-card";
import type { Project } from "@/lib/content";

export function WorksSection({
  slots,
  projects,
}: {
  slots: { title?: string; subtitle?: string };
  projects: Project[];
}) {
  return (
    <section className="mx-auto mt-4 flex max-w-4xl flex-col p-7 sm:mt-20">
      <h1 className="font-newsreader text-center text-4xl text-white-shadow">
        {slots.title}
      </h1>
      <h2 className="text-center text-lg font-extralight text-muted">
        {slots.subtitle}
      </h2>
      <Divider className="mb-8 mt-2" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}

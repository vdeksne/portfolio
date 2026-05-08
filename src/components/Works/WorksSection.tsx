import { Divider } from "@/components/primitives/Divider";
import { ProjectCardModal } from "@/components/Project/ProjectCardModal";
import type { Project } from "@/lib/content";

export function WorksSection({
  slots,
  projects,
}: {
  slots: { title?: string; subtitle?: string };
  projects: Project[];
}) {
  return (
    <section className="mx-auto mt-4 flex w-full max-w-5xl flex-col p-7 sm:mt-20 xl:max-w-6xl">
      <h1 className="font-newsreader text-left text-4xl text-white-shadow">
        {slots.title}
      </h1>
      <h2 className="mt-5 text-left text-lg font-extralight text-muted sm:mt-6">
        {slots.subtitle}
      </h2>
      <Divider className="mb-8 mt-2" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCardModal key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}

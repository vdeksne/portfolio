import type { CSSProperties } from "react";
import { Divider } from "@/components/primitives/Divider";
import { HomeFaq } from "@/components/Home/HomeFaq";
import { HomeGlobeDynamic } from "@/components/Home/HomeGlobeDynamic";
import { HomeProjects } from "@/components/Home/HomeProjects";
import type { FaqData } from "@/lib/content";
import type { Project } from "@/lib/content";

type HomeSectionProps = {
  heroTitle: string;
  heroSubtitle: string;
  projects: Project[];
  faq: FaqData;
};

export function HomeSection({
  heroTitle,
  heroSubtitle,
  projects,
  faq,
}: HomeSectionProps) {
  return (
    <section className="relative min-w-0 overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        <div
          className="absolute left-1/2 top-[36%] h-[min(92vw,30rem)] w-[min(92vw,30rem)] max-w-[min(100vw,52rem)] -translate-x-1/2 -translate-y-1/2 opacity-[0.7] sm:top-[38%] sm:h-[min(88vw,34rem)] sm:w-[min(88vw,34rem)] md:top-[40%] md:h-[min(80vh,46rem)] md:w-[min(80vh,46rem)] lg:h-[min(84vh,50rem)] lg:w-[min(84vh,50rem)] xl:h-[min(86vh,52rem)] xl:w-[min(86vh,52rem)]"
          aria-hidden
        >
          <HomeGlobeDynamic />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-black/52"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_68%_58%_at_50%_42%,transparent_0%,transparent_42%,var(--ui-bg)_88%)] opacity-[0.86]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[30%] bg-gradient-to-t from-[var(--ui-bg)] via-[var(--ui-bg)]/55 to-transparent sm:h-[34%]"
          aria-hidden
        />
      </div>
      <div className="relative z-10 mx-auto flex min-w-0 w-full max-w-7xl flex-col justify-center gap-6 sm:gap-8 py-10 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:px-8 sm:py-14 md:px-12 lg:px-16 lg:py-20 xl:px-20 xl:py-24 2xl:max-w-[90rem]">
        <div className="relative z-10 flex min-w-0 w-full flex-col items-stretch sm:items-center">
          <div
            className="relative z-20 font-geist w-full min-w-0 max-w-5xl xl:max-w-6xl [text-shadow:0_2px_32px_var(--ui-bg),0_1px_12px_rgba(7,7,7,0.9)]"
            style={{ "--stagger": 1, "--delay": "10ms" } as CSSProperties}
            data-animate
          >
            <h1 className="text-balance text-left text-2xl font-medium leading-tight text-[var(--font-primary)] sm:text-3xl sm:leading-snug lg:text-4xl lg:leading-snug xl:text-5xl">
              {heroTitle}
            </h1>
            <h2 className="mt-5 max-w-xl text-left text-base leading-relaxed text-white/60 antialiased sm:mt-6 sm:max-w-2xl md:max-w-3xl sm:text-lg sm:leading-relaxed">
              {heroSubtitle}
            </h2>
          </div>
          <div
            style={{ "--stagger": 2 } as CSSProperties}
            data-animate
            className="mt-10 flex min-w-0 w-full max-w-5xl flex-col gap-4 sm:mt-14 lg:mt-16 xl:max-w-6xl"
          >
            <HomeProjects projects={projects} />
          </div>
          <Divider className="my-10 sm:my-12 lg:my-14" />
          <div
            className="min-w-0 w-full pb-[max(2rem,env(safe-area-inset-bottom))] sm:pb-10 lg:pb-12"
            style={{ "--stagger": 3 } as CSSProperties}
            data-animate
          >
            <HomeFaq faq={faq} />
          </div>
        </div>
      </div>
    </section>
  );
}

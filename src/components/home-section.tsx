import type { CSSProperties } from "react";
import { Availability } from "./availability";
import { Divider } from "./divider";
import { HomeCTA } from "./home-cta";
import { HomeFaq } from "./home-faq";
import { HomeProfilePicture } from "./home-profile-picture";
import { HomeProjects } from "./home-projects";
import { HomeSocial } from "./home-social";
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
    <section className="relative pt-12">
      <div className="pointer-events-none absolute inset-0 bg-center bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)]" />
      <div className="relative mx-auto flex max-w-7xl flex-col justify-center gap-4 px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <div className="absolute -top-8 left-1/2 size-72 -translate-x-1/2 rounded-full bg-white/25 blur-[120px] lg:-top-8 lg:size-[32rem] lg:blur-[200px]" />
        <HomeProfilePicture />
        <div className="z-20 flex flex-col items-center justify-center">
          <div
            className="font-geist"
            style={{ "--stagger": 1, "--delay": "10ms" } as CSSProperties}
            data-animate
          >
            <h1 className="mx-auto max-w-3xl bg-gradient-to-b from-white/90 to-white/30 bg-clip-text text-center text-3xl font-medium text-pretty text-transparent lg:text-4xl">
              {heroTitle}
            </h1>
            <h2 className="mx-auto mt-4 max-w-xl text-center text-lg text-white/60 antialiased">
              {heroSubtitle}
            </h2>
          </div>
          <div style={{ "--stagger": 2 } as CSSProperties} data-animate>
            <Availability background className="mt-2" />
          </div>
          <div style={{ "--stagger": 3 } as CSSProperties} data-animate>
            <HomeSocial />
          </div>
          <div style={{ "--stagger": 4 } as CSSProperties} data-animate>
            <HomeCTA />
          </div>
          <div
            style={{ "--stagger": 5 } as CSSProperties}
            data-animate
            className="mt-12 flex w-full max-w-3xl flex-col gap-4 lg:mt-16"
          >
            <HomeProjects projects={projects} />
          </div>
          <Divider className="my-9" />
          <div style={{ "--stagger": 6 } as CSSProperties} data-animate>
            <HomeFaq faq={faq} />
          </div>
        </div>
      </div>
    </section>
  );
}

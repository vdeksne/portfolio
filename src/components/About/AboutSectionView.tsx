import { Fragment } from "react";
import { ExperiencesList } from "@/components/About/ExperiencesList";
import { AboutProfilePicture } from "@/components/About/AboutProfilePicture";

export type AboutStackItem = { name: string; link: string };
export type AboutExperience = { title: string; company: string; date: string };

export type AboutSectionViewProps = {
  title?: string;
  subtitle?: string;
  profileImage?: string;
  intro?: string;
  introLabel: string;
  experiencesLabel: string;
  experiences: AboutExperience[];
  stackHeading: string;
  stackDescription?: string;
  stackItems: AboutStackItem[];
};

export function AboutSectionView({
  title,
  subtitle,
  profileImage,
  intro,
  introLabel,
  experiencesLabel,
  experiences,
  stackHeading,
  stackDescription,
  stackItems,
}: AboutSectionViewProps) {
  return (
    <section className="mx-auto mt-4 flex w-full max-w-4xl flex-col px-6 py-10 text-(--font-primary) sm:mt-16 sm:px-8 lg:px-10">
      <header className="max-w-2xl">
        <h1 className="font-newsreader text-3xl font-medium tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-base font-light leading-relaxed text-white/50 sm:text-[1.05rem]">
          {subtitle}
        </p>
      </header>

      <div className="mt-14 flex flex-col gap-12 sm:mt-16 sm:flex-row sm:items-start sm:gap-10 lg:gap-14">
        <div className="shrink-0">
          <AboutProfilePicture pictureSrc={profileImage} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-white/35">
            {introLabel}
          </p>
          <div className="whitespace-pre-wrap text-base leading-[1.75] text-white/80 sm:text-[1.0625rem]">
            {intro}
          </div>
        </div>
      </div>

      <div className="mt-20 border-t border-white/6 pt-16 sm:mt-24 sm:pt-20">
        <ExperiencesList experiences={experiences} heading={experiencesLabel} />
      </div>

      <div className="mt-20 border-t border-white/6 pt-16 sm:mt-24 sm:pt-20">
        <h2 className="font-newsreader text-2xl tracking-tight text-white sm:text-3xl">
          {stackHeading}
        </h2>
        {stackDescription?.trim() ? (
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/45 sm:text-base">
            {stackDescription}
          </p>
        ) : null}
        <div
          className="mt-10 flex max-w-2xl flex-wrap items-baseline gap-y-2 text-[0.9375rem] leading-snug text-white/60 sm:text-base"
          aria-label={stackHeading}
        >
          {stackItems.map((item, i) => (
            <Fragment key={item.name}>
              {i > 0 ? (
                <span
                  className="mx-2.5 inline select-none text-[0.55rem] text-white/18 sm:mx-3"
                  aria-hidden
                >
                  ·
                </span>
              ) : null}
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm underline decoration-white/15 decoration-1 underline-offset-[0.28em] transition-colors hover:text-white hover:decoration-white/40 focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/20"
              >
                {item.name}
              </a>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}


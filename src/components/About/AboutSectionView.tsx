import { Fragment } from "react";
import { AboutDownloadButton } from "@/components/About/AboutDownloadButton";
import { CertificationsList } from "@/components/About/CertificationsList";
import { EducationList } from "@/components/About/EducationList";
import { ExperiencesList } from "@/components/About/ExperiencesList";
import { AboutProfilePicture } from "@/components/About/AboutProfilePicture";
import type { Certification, Education } from "@/lib/content";

export type AboutStackItem = { name: string; link: string };
export type AboutExperience = { title: string; company: string; date: string };

export type AboutSectionViewProps = {
  title?: string;
  subtitle?: string;
  profileImage?: string;
  intro?: string;
  resumeHref?: string;
  resumeFileName?: string;
  introLabel: string;
  experiencesLabel: string;
  experiences: AboutExperience[];
  stackHeading: string;
  stackDescription?: string;
  stackItems: AboutStackItem[];
  education: Education[];
  educationHeading: string;
  educationDescription?: string;
  certifications: Certification[];
  certificationsHeading: string;
  certificationsDescription?: string;
};

export function AboutSectionView({
  title,
  subtitle,
  profileImage,
  intro,
  resumeHref,
  resumeFileName,
  introLabel,
  experiencesLabel,
  experiences,
  stackHeading,
  stackDescription,
  stackItems,
  education,
  educationHeading,
  educationDescription,
  certifications,
  certificationsHeading,
  certificationsDescription,
}: AboutSectionViewProps) {
  return (
    <section className="mx-auto mt-3 flex w-full max-w-4xl flex-col px-6 py-8 text-(--font-primary) sm:mt-10 sm:px-8 lg:px-10">
      <header className="max-w-2xl">
        <h1 className="font-newsreader text-3xl font-medium tracking-tight text-(--font-primary) sm:text-4xl">
          {title}
        </h1>
        <p className="text-muted mt-4 text-base font-light leading-relaxed sm:text-[1.05rem]">
          {subtitle}
        </p>
      </header>

      <div className="mt-10 flex flex-col gap-10 sm:mt-12 sm:flex-row sm:items-start sm:gap-8 lg:gap-10">
        <div className="shrink-0">
          <AboutProfilePicture pictureSrc={profileImage} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted">
            {introLabel}
          </p>
          <div className="whitespace-pre-wrap text-base leading-[1.75] text-(--font-primary) sm:text-[1.0625rem]">
            {intro}
          </div>
        </div>
      </div>

      <div className="mt-14 border-t border-white/6 pt-10 sm:mt-16 sm:pt-12">
        <ExperiencesList experiences={experiences} heading={experiencesLabel} />
      </div>

      {education.length > 0 ? (
        <div className="mt-14 border-t border-white/6 pt-10 sm:mt-16 sm:pt-12">
          <EducationList
            education={education}
            heading={educationHeading}
            description={educationDescription}
          />
        </div>
      ) : null}

      <div className="mt-14 border-t border-white/6 pt-10 sm:mt-16 sm:pt-12">
        <h2 className="font-newsreader text-2xl tracking-tight text-(--font-primary) sm:text-3xl">
          {stackHeading}
        </h2>
        {stackDescription?.trim() ? (
          <p className="text-muted mt-4 max-w-xl text-sm leading-relaxed sm:text-base">
            {stackDescription}
          </p>
        ) : null}
        <div
          className="text-muted mt-7 flex max-w-2xl flex-wrap items-baseline gap-y-2 text-[0.9375rem] leading-snug sm:text-base"
          aria-label={stackHeading}
        >
          {stackItems.map((item, i) => (
            <Fragment key={item.name}>
              {i > 0 ? (
                <span
                  className="mx-2.5 inline select-none text-[0.55rem] opacity-40 sm:mx-3"
                  aria-hidden
                >
                  ·
                </span>
              ) : null}
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm underline decoration-current/20 decoration-1 underline-offset-[0.28em] transition-colors hover:text-(--font-primary) hover:decoration-current/40 focus-visible:outline focus-visible:ring-2 focus-visible:ring-(--font-primary)/20"
              >
                {item.name}
              </a>
            </Fragment>
          ))}
        </div>
      </div>

      {certifications.length > 0 ? (
        <div className="mt-14 border-t border-white/6 pt-10 sm:mt-16 sm:pt-12">
          <CertificationsList
            certifications={certifications}
            heading={certificationsHeading}
            description={certificationsDescription}
          />
        </div>
      ) : null}

      <div className="mt-14 border-t border-white/6 pt-10 sm:mt-16 sm:pt-12">
        <AboutDownloadButton
          hrefOverride={resumeHref}
          fileNameOverride={resumeFileName}
        />
      </div>
    </section>
  );
}


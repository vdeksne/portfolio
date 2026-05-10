import { getTranslations } from "next-intl/server";
import {
  getCertifications,
  getEducation,
  getExperiencesResolved,
  getStack,
} from "@/lib/content";
import { AboutSectionView } from "@/components/About/AboutSectionView";

type AboutSlots = {
  title?: string;
  subtitle?: string;
  profile_image?: string;
  intro?: string;
  resume_href?: string;
  resume_filename?: string;
  stack_title?: string;
  stack_description?: string;
  education_title?: string;
  education_description?: string;
  certifications_title?: string;
  certifications_description?: string;
};

export async function AboutSection({ slots }: { slots: AboutSlots }) {
  const stack = getStack();
  const experiences = await getExperiencesResolved();
  const education = getEducation();
  const certifications = getCertifications();
  const t = await getTranslations("global");
  const tNav = await getTranslations("navigation");
  const stackHeading = slots.stack_title?.trim() || tNav("stack");
  const educationHeading = slots.education_title?.trim() || t("education");
  const certificationsHeading =
    slots.certifications_title?.trim() || t("certifications");

  return (
    <AboutSectionView
      title={slots.title}
      subtitle={slots.subtitle}
      profileImage={slots.profile_image}
      intro={slots.intro}
      resumeHref={slots.resume_href}
      resumeFileName={slots.resume_filename}
      introLabel={t("about_intro")}
      experiencesLabel={t("experiences")}
      experiences={experiences.items}
      stackHeading={stackHeading}
      stackDescription={slots.stack_description}
      stackItems={stack.items.map((x) => ({ name: x.name, link: x.link }))}
      education={education.items}
      educationHeading={educationHeading}
      educationDescription={slots.education_description}
      certifications={certifications.items}
      certificationsHeading={certificationsHeading}
      certificationsDescription={slots.certifications_description}
    />
  );
}

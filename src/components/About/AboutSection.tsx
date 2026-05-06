import { getTranslations } from "next-intl/server";
import { getExperiences, getStack } from "@/lib/content";
import { AboutSectionView } from "@/components/About/AboutSectionView";

type AboutSlots = {
  title?: string;
  subtitle?: string;
  profile_image?: string;
  intro?: string;
  stack_title?: string;
  stack_description?: string;
};

export async function AboutSection({ slots }: { slots: AboutSlots }) {
  const stack = getStack();
  const experiences = getExperiences();
  const t = await getTranslations("global");
  const tNav = await getTranslations("navigation");
  const stackHeading = slots.stack_title?.trim() || tNav("stack");

  return (
    <AboutSectionView
      title={slots.title}
      subtitle={slots.subtitle}
      profileImage={slots.profile_image}
      intro={slots.intro}
      introLabel={t("about_intro")}
      experiencesLabel={t("experiences")}
      experiences={experiences.items}
      stackHeading={stackHeading}
      stackDescription={slots.stack_description}
      stackItems={stack.items.map((x) => ({ name: x.name, link: x.link }))}
    />
  );
}

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { iconSrc } from "@/lib/icon";
import { getStack } from "@/lib/content";
import { ExperiencesList } from "./experiences-list";
import { AboutProfilePicture } from "./about-profile-picture";
import { Divider } from "./divider";
import { Signature } from "./signature";
import { experiences } from "@/lib/site-config";
import { SpotlightCard } from "./spotlight-card";

type AboutSlots = {
  title?: string;
  subtitle?: string;
  intro?: string;
  stack_title?: string;
  stack_description?: string;
};

export async function AboutSection({ slots }: { slots: AboutSlots }) {
  const stack = getStack();
  const t = await getTranslations("global");
  return (
    <section className="mx-auto mt-4 flex max-w-4xl flex-col p-7 text-[var(--font-primary)] sm:mt-20">
      <h1 className="font-newsreader text-center text-4xl text-white-shadow">
        {slots.title}
      </h1>
      <h2 className="text-center text-lg font-extralight text-muted">
        {slots.subtitle}
      </h2>
      <Divider className="mb-8 mt-2" />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <AboutProfilePicture />
        <div className="relative flex flex-col gap-3 sm:ml-4">
          <h3 className="text-lg">Introduction</h3>
          <div className="flex flex-col gap-4 whitespace-pre-wrap">{slots.intro}</div>
          <div className="absolute -bottom-24 right-0 hidden w-40 sm:block">
            <Signature />
          </div>
          <div className="absolute -bottom-24 -right-2 w-32 sm:hidden">
            <Signature />
          </div>
        </div>
      </div>
      <Divider className="my-8" />
      <ExperiencesList experiences={experiences} heading={t("experiences")} />
      <Divider className="my-8" />
      <div className="flex flex-col gap-3">
        <div className="mb-6 flex flex-col gap-1">
          <h3 className="font-newsreader text-3xl text-white-shadow">
            {slots.stack_title}
          </h3>
          <p>{slots.stack_description}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {stack.items.map((item) => (
            <SpotlightCard white key={item.name}>
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`${item.name} link`}
                className="flex gap-2 p-6"
              >
                <Image
                  src={iconSrc(item.icon)}
                  alt=""
                  width={36}
                  height={36}
                  className="size-9"
                />
              </a>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

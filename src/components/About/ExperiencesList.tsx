export function ExperiencesList({
  experiences,
  heading,
}: {
  experiences: readonly { title: string; date: string; company: string }[];
  heading: string;
}) {
  return (
    <div className="flex w-full flex-col gap-3 text-left">
      <h3 className="mb-6 font-newsreader text-2xl tracking-tight text-(--font-primary) sm:text-3xl">
        {heading}
      </h3>
      <div className="flex flex-col gap-4">
        {experiences.map((experience) => (
          <div key={`${experience.title}-${experience.company}`}>
            <h4 className="font-semibold">{experience.title}</h4>
            <div className="mt-0.5 flex flex-wrap items-baseline justify-start gap-x-1 gap-y-0">
              <p className="text-muted">{experience.date}</p>
              <span className="text-muted mx-1" aria-hidden>
                /
              </span>
              <p className="text-muted">{experience.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

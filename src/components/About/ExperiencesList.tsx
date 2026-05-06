export function ExperiencesList({
  experiences,
  heading,
}: {
  experiences: readonly { title: string; date: string; company: string }[];
  heading: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="mb-6 font-newsreader text-2xl tracking-tight text-white sm:text-3xl">
        {heading}
      </h3>
      <div className="flex flex-col gap-4">
        {experiences.map((experience) => (
          <div key={`${experience.title}-${experience.company}`}>
            <h4 className="font-semibold">{experience.title}</h4>
            <div className="flex gap-1">
              <p>{experience.date}</p>
              <span className="mx-1"> / </span>
              <p>{experience.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

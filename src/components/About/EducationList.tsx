import type { Education } from "@/lib/content";

function maxYearKey(date: string): number {
  const matches = String(date).match(/\b(19|20)\d{2}\b/g);
  if (!matches?.length) return Number.NEGATIVE_INFINITY;
  return Math.max(...matches.map((y) => Number(y)));
}

export function EducationList({
  education,
  heading,
  description,
}: {
  education: readonly Education[];
  heading: string;
  description?: string;
}) {
  const items = [...education].sort((a, b) => maxYearKey(b.date) - maxYearKey(a.date));

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-newsreader text-2xl tracking-tight text-(--font-primary) sm:text-3xl">
        {heading}
      </h2>
      {description?.trim() ? (
        <p className="text-muted max-w-xl text-sm leading-relaxed sm:text-base">
          {description.trim()}
        </p>
      ) : null}
      <div className="mt-4 flex flex-col gap-4">
        {items.map((e, idx) => (
          <div key={`edu-${idx}-${e.school}-${e.program}`}>
            <h3 className="font-semibold">{e.school}</h3>
            {e.location?.trim() ? (
              <p className="text-muted mt-0.5 text-sm leading-relaxed">{e.location.trim()}</p>
            ) : null}
            <div className="mt-1 flex flex-col gap-0.5">
              {e.program
                .split(";")
                .map((x) => x.trim())
                .filter(Boolean)
                .map((line, i) => (
                  <p key={`edu-${idx}-program-${i}`} className="text-muted">
                    {line}
                  </p>
                ))}
              <p className="text-muted">{e.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


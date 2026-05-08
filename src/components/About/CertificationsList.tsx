import type { Certification } from "@/lib/content";

function certificationHref(link?: string): string | null {
  const t = link?.trim();
  if (!t) return null;
  if (t.startsWith("https://") || t.startsWith("http://") || t.startsWith("/")) {
    return t;
  }
  return null;
}

function yearKey(date: string): number {
  const m = String(date).match(/\b(19|20)\d{2}\b/);
  return m ? Number(m[0]) : Number.NEGATIVE_INFINITY;
}

export function CertificationsList({
  certifications,
  heading,
  description,
}: {
  certifications: readonly Certification[];
  heading: string;
  description?: string;
}) {
  const items = [...certifications].sort((a, b) => yearKey(b.date) - yearKey(a.date));

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
        {items.map((c, idx) => {
          const href = certificationHref(c.link);
          return (
            <div key={`cert-${idx}-${c.name}-${c.issuer}`}>
              <h3 className="font-semibold">
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("/") ? undefined : "_blank"}
                    rel={href.startsWith("/") ? undefined : "noreferrer"}
                    className="rounded-sm underline decoration-current/20 decoration-1 underline-offset-[0.28em] transition-colors hover:text-(--font-primary) hover:decoration-current/40 focus-visible:outline focus-visible:ring-2 focus-visible:ring-(--font-primary)/20"
                  >
                    {c.name}
                  </a>
                ) : (
                  c.name
                )}
              </h3>
              <div className="flex flex-wrap gap-x-1 gap-y-0">
                <p className="text-muted">{c.date}</p>
                <span className="text-muted mx-1">/</span>
                <p className="text-muted">{c.issuer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

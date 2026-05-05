"use client";

import { useState } from "react";
import type { FaqData } from "@/lib/content";
import clsx from "clsx";
import { Plus } from "lucide-react";

export function HomeFaq({ faq }: { faq: FaqData }) {
  const [tab, setTab] = useState(0);
  const items = faq.faqQuestions.map((f) => ({
    label: f.title,
    key: f.title.toLowerCase(),
    questions: f.questions,
  }));

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-8 sm:px-20 md:px-30">
      <div className="flex flex-col items-center justify-center gap-2">
        <h3 className="font-newsreader text-white-shadow text-4xl">
          {faq.title}
        </h3>
        <p className="text-center text-sm font-medium text-muted">
          {faq.subtitle}
        </p>
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="relative flex flex-wrap justify-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(i)}
              className={clsx(
                "relative inline-flex flex-shrink-0 items-center justify-center rounded-full border-2 border-white/10 px-3 py-2 font-medium transition-colors duration-200",
                tab === i
                  ? "text-[#0AFA94]"
                  : "text-neutral-400 hover:bg-[#010F19]/80",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {items[tab].questions.map((q) => (
            <details
              key={q.label}
              className="group mb-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition duration-500 hover:bg-white/[0.075]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 font-medium">
                {q.label}
                <Plus className="size-4 shrink-0 transition-transform group-open:rotate-135" />
              </summary>
              <p className="mt-3 text-sm text-muted leading-relaxed">
                {q.content}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

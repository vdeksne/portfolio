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
    <div className="flex min-w-0 w-full flex-col items-stretch space-y-6 sm:space-y-8">
      <div className="mx-auto flex min-w-0 w-full max-w-5xl flex-col gap-2 xl:max-w-6xl">
        <h3 className="text-left font-newsreader text-2xl text-white-shadow leading-tight sm:text-3xl md:text-4xl">
          {faq.title}
        </h3>
        <p className="text-left text-sm font-medium leading-snug text-muted sm:text-base">
          {faq.subtitle}
        </p>
      </div>
      <div className="mx-auto flex min-w-0 w-full max-w-5xl flex-col gap-4 xl:max-w-6xl">
        <div
          className="relative flex w-full flex-wrap justify-center gap-2 sm:gap-2.5"
          role="tablist"
          aria-label={faq.title}
        >
          {items.map((item, i) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={clsx(
                "relative inline-flex min-h-11 min-w-0 max-w-full items-center justify-start rounded-full bg-white/[0.06] px-4 py-2.5 text-left text-sm font-medium touch-manipulation transition-colors duration-200 sm:min-h-10 sm:px-3 sm:py-2 sm:text-base",
                tab === i
                  ? "bg-white/12 text-white"
                  : "text-neutral-400 hover:bg-[#070707]/80 active:bg-[#070707]",
              )}
            >
              <span className="break-words text-left">
                {item.label}
              </span>
            </button>
          ))}
        </div>
        <div className="flex min-w-0 w-full flex-col gap-2">
          {items[tab].questions.map((q) => (
            <details
              key={q.label}
              className="group mb-2 min-w-0 rounded-xl bg-white/5 px-3 py-3 transition duration-500 touch-manipulation sm:px-4 sm:py-3 hover:bg-white/[0.075]"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 font-medium sm:items-center">
                <span className="min-w-0 flex-1 break-words text-sm leading-snug sm:text-base">
                  {q.label}
                </span>
                <Plus className="mt-0.5 size-4 shrink-0 transition-transform group-open:rotate-135 sm:mt-0" />
              </summary>
              <p className="mt-3 break-words text-sm leading-relaxed text-muted sm:text-base">
                {q.content}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

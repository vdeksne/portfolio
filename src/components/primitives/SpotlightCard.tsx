"use client";

import clsx from "clsx";
import type { ReactNode } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  white?: boolean;
};

export function SpotlightCard({
  children,
  className,
  white = false,
}: SpotlightCardProps) {
  if (white) {
    return (
      <div
        className={clsx(
          "relative overflow-hidden rounded-lg bg-zinc-950",
          className,
        )}
      >
        <div className="relative flex h-full flex-col">{children}</div>
      </div>
    );
  }

  return <div className={clsx("relative overflow-hidden", className)}>{children}</div>;
}

"use client";

import { type ReactNode, useCallback, useRef, useState } from "react";
import clsx from "clsx";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  from?: string;
  via?: string | null;
  to?: string;
  size?: number;
  mode?: "before" | "after";
  white?: boolean;
};

export function SpotlightCard({
  children,
  className,
  from = "rgba(255,255,255,0.8)",
  via = null,
  to = "transparent",
  size = 250,
  mode = "before",
  white = false,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  const spotlightColorStops = [from, via, to].filter(Boolean).join(",");

  if (white) {
    return (
      <div className={clsx("relative rounded-lg", className)}>
        <div className="absolute inset-x-0 bottom-0 top-0 rounded-t-lg bg-gradient-to-b from-white/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        <div className="absolute inset-px rounded-lg bg-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_128px_at_50%_0%,theme(backgroundColor.white/5%),transparent)]" />
        <div className="relative flex h-full flex-col">{children}</div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={clsx(
        "relative transform-gpu overflow-hidden",
        mode === "before" &&
          "before:absolute before:inset-0 before:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),var(--spotlight-color-stops))]",
        mode === "after" &&
          "after:absolute after:inset-0 after:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),var(--spotlight-color-stops))]",
        className,
      )}
      style={
        {
          "--x": `${pos.x}px`,
          "--y": `${pos.y}px`,
          "--spotlight-color-stops": spotlightColorStops,
          "--spotlight-size": `${size}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

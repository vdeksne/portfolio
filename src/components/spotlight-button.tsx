"use client";

import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type SpotlightButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  rounded?: boolean;
  animate?: boolean;
  transparent?: boolean;
  children: ReactNode;
};

export function SpotlightButton({
  rounded,
  animate = true,
  transparent,
  className,
  children,
  type = "button",
  ...rest
}: SpotlightButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "group relative inline-flex items-center overflow-hidden transition",
        rounded ? "rounded-full" : "rounded-md px-8 py-1",
        transparent ? "" : "bg-[#11202A]",
        className,
      )}
      {...rest}
    >
      {animate ? (
        <div className="absolute inset-0 flex items-center [container-type:inline-size]">
          <div className="absolute size-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(255,255,255,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.5)_360deg)] opacity-0 transition duration-300 group-hover:opacity-100" />
        </div>
      ) : null}
      <div
        className={clsx(
          "absolute inset-0.5 bg-[#010F19] sm:bg-[#010F19]/80 sm:backdrop-blur-md",
          transparent ? "" : "bg-[#11202A]",
          rounded ? "rounded-full" : "rounded-md",
        )}
      />
      <div
        className={clsx(
          "absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 bg-white/10 opacity-50 blur-md transition-all duration-500 group-hover:h-2/3 group-hover:opacity-100",
          rounded ? "rounded-full" : "rounded-md",
        )}
      />
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </button>
  );
}

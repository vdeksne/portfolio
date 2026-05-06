"use client";

import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type SpotlightButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  rounded?: boolean;
  transparent?: boolean;
  children: ReactNode;
};

export function SpotlightButton({
  rounded,
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
        "relative inline-flex items-center overflow-hidden transition",
        rounded ? "rounded-full" : "rounded-md px-8 py-1",
        transparent ? "" : "bg-[#070707]",
        className,
      )}
      {...rest}
    >
      <div
        className={clsx(
          "absolute inset-0.5 bg-[#070707]",
          rounded ? "rounded-full" : "rounded-md",
        )}
      />
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </button>
  );
}

import clsx from "clsx";
import { useId } from "react";

type DotPatternProps = {
  className?: string;
  size?: number;
  radius?: number;
  offsetX?: number;
  offsetY?: number;
};

export function DotPattern({
  className,
  size = 16,
  radius = 1,
  offsetX = 0,
  offsetY = 0,
}: DotPatternProps) {
  const id = useId();
  const pid = id.replace(/:/g, "");
  return (
    <svg className={clsx("h-full w-full", className)} aria-hidden>
      <defs>
        <pattern
          id={`dot-pattern-${pid}`}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <circle cx={size / 2} cy={size / 2} r={radius} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#dot-pattern-${pid})`} />
    </svg>
  );
}

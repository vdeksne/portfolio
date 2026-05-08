"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

function getStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem("theme");
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") root.classList.add("light");
  else root.classList.remove("light");
  root.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Always start in dark mode (site default), regardless of system preference or past storage.
    const initial: Theme = "dark";
    setTheme(initial);
    applyTheme(initial);
    try {
      localStorage.setItem("theme", initial);
    } catch {
      // ignore
    }
  }, []);

  const next = useMemo<Theme>(() => (theme === "dark" ? "light" : "dark"), [theme]);

  return (
    <button
      type="button"
      onClick={() => {
        const t = next;
        setTheme(t);
        applyTheme(t);
        try {
          localStorage.setItem("theme", t);
        } catch {
          // ignore
        }
      }}
      className={clsx(
        "fixed z-60 flex min-h-[44px] items-center justify-center rounded-full bg-(--ui-bg)/90 px-3 shadow-lg backdrop-blur-md",
        "right-[max(0.625rem,env(safe-area-inset-right,0px))] bottom-[max(0.625rem,env(safe-area-inset-bottom,0px))]",
        "text-muted hover:bg-white/5 hover:text-(--font-primary)",
        "outline-none focus-visible:ring-2 focus-visible:ring-(--font-primary)/50 focus-visible:ring-offset-2 focus-visible:ring-offset-(--ui-bg)",
        "sm:right-[max(0.875rem,env(safe-area-inset-right,0px))] sm:bottom-4 sm:min-h-0 sm:px-3 sm:py-1.5",
      )}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {theme === "dark" ? (
        <Sun className="size-5" aria-hidden />
      ) : (
        <Moon className="size-5" aria-hidden />
      )}
    </button>
  );
}


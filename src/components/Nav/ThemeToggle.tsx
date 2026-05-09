"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

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
        "inline-flex size-9 items-center justify-center text-muted",
        "hover:text-(--font-primary)",
        "outline-none focus-visible:ring-2 focus-visible:ring-(--font-primary)/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070707]",
      )}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
    >
      {theme === "dark" ? (
        <Sun className="size-4.5" aria-hidden />
      ) : (
        <Moon className="size-4.5" aria-hidden />
      )}
    </button>
  );
}


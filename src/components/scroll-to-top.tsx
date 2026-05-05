"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { SpotlightButton } from "./spotlight-button";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-36 right-3 z-50 sm:bottom-20">
      <SpotlightButton
        aria-label="scroll to top button"
        className={`flex size-10 items-center justify-center p-1 text-muted transition-all duration-200 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        rounded
        onClick={() =>
          window.scrollTo({ top: 0, behavior: "smooth" })
        }
      >
        <ArrowUp className="z-20 size-6" />
      </SpotlightButton>
    </div>
  );
}

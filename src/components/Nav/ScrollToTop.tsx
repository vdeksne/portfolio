"use client";

import { ArrowUp } from "lucide-react";
import { useSyncExternalStore } from "react";
import { SpotlightButton } from "@/components/primitives/SpotlightButton";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

function getSnapshot() {
  return window.scrollY > 0;
}

function getServerSnapshot() {
  return false;
}

export function ScrollToTop() {
  const visible = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return (
    <div className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))] left-[max(0.75rem,env(safe-area-inset-left,0px))] z-50 sm:bottom-8 sm:left-4">
      <SpotlightButton
        aria-label="scroll to top button"
        className={`flex size-10 items-center justify-center p-1 text-muted transition-all duration-200 ${
          visible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        rounded
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp className="z-20 size-6" />
      </SpotlightButton>
    </div>
  );
}

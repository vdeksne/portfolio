"use client";

import { useEffect } from "react";

function isImageTarget(t: EventTarget | null): boolean {
  if (!(t instanceof Element)) return false;
  return Boolean(t.closest("img, picture, [data-no-image-copy]"));
}

/** Best-effort deterrent: prevent right-click + drag-start on images. */
export function NoImageCopy() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => {
      if (isImageTarget(e.target)) e.preventDefault();
    };
    const onDragStart = (e: DragEvent) => {
      if (isImageTarget(e.target)) e.preventDefault();
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}


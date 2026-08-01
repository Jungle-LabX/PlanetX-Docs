"use client";

/* eslint-disable @next/next/no-img-element -- Markdown images have source-defined dimensions and open in a native lightbox. */

import { useEffect, useRef, useState } from "react";

export function ImageLightbox({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", close);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", close);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button ref={triggerRef} className="doc-image" type="button" onClick={() => setOpen(true)}>
        <img src={src} alt={alt} loading="lazy" />
        <span>Open full size</span>
      </button>
      {open ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={() => setOpen(false)}>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close image">×</button>
          <img src={src} alt={alt} onClick={(event) => event.stopPropagation()} />
        </div>
      ) : null}
    </>
  );
}

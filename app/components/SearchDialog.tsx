"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { docs } from "@/content/docs";

const searchable = docs.map((doc) => ({
  ...doc,
  haystack: `${doc.title} ${doc.description} ${doc.content}`.toLocaleLowerCase(),
}));

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const closeDialog = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    const show = () => {
      returnFocusRef.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        show();
      }
      if (event.key === "Escape") closeDialog();
    };
    window.addEventListener("planetx:open-search", show);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("planetx:open-search", show);
      window.removeEventListener("keydown", onKey);
    };
  }, [closeDialog]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("modal-open");
      window.setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      document.body.classList.remove("modal-open");
      returnFocusRef.current?.focus?.();
    }
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  const results = useMemo(() => {
    const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return searchable.slice(0, 8);
    return searchable
      .filter((doc) => terms.every((term) => doc.haystack.includes(term)))
      .sort((left, right) => {
        const leftTitle = terms.some((term) => left.title.toLocaleLowerCase().includes(term));
        const rightTitle = terms.some((term) => right.title.toLocaleLowerCase().includes(term));
        return Number(rightTitle) - Number(leftTitle) || left.order - right.order;
      })
      .slice(0, 12);
  }, [query]);

  if (!open) return null;

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={closeDialog}>
      <section
        className="search-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="search-dialog__input-row">
          <span aria-hidden="true">⌕</span>
          <label className="sr-only" htmlFor="docs-search">Search documentation</label>
          <input
            id="docs-search"
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search PlanetX documentation"
            autoComplete="off"
          />
          <button type="button" onClick={closeDialog} aria-label="Close search">Esc</button>
        </div>
        <h2 id="search-dialog-title" className="sr-only">Documentation search</h2>
        <div className="search-results" role="listbox" aria-label="Search results">
          {results.length ? results.map((doc) => (
            <Link
              key={doc.id}
              href={`/docs/${doc.lang}/${doc.slug}`}
              className="search-result"
              onClick={closeDialog}
            >
              <span className="search-result__meta">{doc.lang.toUpperCase()} · {doc.category}</span>
              <strong>{doc.title}</strong>
              <span>{doc.description}</span>
            </Link>
          )) : (
            <p className="search-empty">No matching documents. Try a product term such as “Proxy”, “Transition”, or “Section”.</p>
          )}
        </div>
        <footer className="search-dialog__footer">
          <span>Local index · no query leaves your device</span>
          <span>↑↓ Navigate · Enter Open</span>
        </footer>
      </section>
    </div>
  );
}

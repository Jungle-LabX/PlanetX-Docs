"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { docs, getDocHref, type DocLanguage } from "@/content/docs";
import { canonicalSearchAliases, glossaryEntries } from "@/content/search";

type SearchResult = {
  id: string;
  kind: "document" | "term";
  href: string;
  title: string;
  description: string;
  meta: string;
  haystack: string;
  order: number;
  slug?: string;
};

const featuredSlugs = ["quick-start-same-world", "introduction", "faq", "known-issues"];

function buildResults(language: DocLanguage): SearchResult[] {
  const documentResults = docs
    .filter((doc) => doc.public && doc.lang === language)
    .map((doc) => {
      const title = doc.navigationTitle;
      const category = doc.categoryTitle;
      const description = doc.description;
      const aliases = canonicalSearchAliases[doc.slug] ?? [];
      return {
        id: doc.id,
        kind: "document" as const,
        href: getDocHref(doc.lang, doc.slug),
        title,
        description,
        meta: `${doc.lang.toUpperCase()} · ${category}`,
        haystack: `${title} ${doc.title} ${description} ${doc.description} ${doc.content} ${aliases.join(" ")}`.toLocaleLowerCase(),
        order: doc.order,
        slug: doc.slug,
      };
    });

  const glossaryResults = glossaryEntries.map((entry, index) => ({
    id: `term-${entry.id}-${language}`,
    kind: "term" as const,
    href: `/docs/${language}/${entry.route}`,
    title: language === "ko" ? entry.ko : entry.term,
    description: entry.definition[language],
    meta: language === "ko" ? "용어 · 표준 용어" : "TERM · CANONICAL",
    haystack: `${entry.term} ${entry.ko} ${entry.definition.en} ${entry.definition.ko} ${entry.aliases.join(" ")}`.toLocaleLowerCase(),
    order: -100 + index,
  }));

  return [...glossaryResults, ...documentResults];
}

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState<DocLanguage>("en");
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const closeDialog = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    const show = () => {
      returnFocusRef.current = document.activeElement as HTMLElement;
      const stored = window.sessionStorage.getItem("planetx-language");
      setLanguage(stored === "ko" || stored === "en" ? stored : (document.documentElement.lang === "ko" ? "ko" : "en"));
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
    const allResults = buildResults(language);
    const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) {
      return allResults
        .filter((result) => result.kind === "document" && result.slug && featuredSlugs.includes(result.slug))
        .sort((left, right) => featuredSlugs.indexOf(left.slug ?? "") - featuredSlugs.indexOf(right.slug ?? ""));
    }

    return allResults
      .filter((result) => terms.every((term) => result.haystack.includes(term)))
      .sort((left, right) => {
        const leftTitle = terms.some((term) => left.title.toLocaleLowerCase().includes(term));
        const rightTitle = terms.some((term) => right.title.toLocaleLowerCase().includes(term));
        return Number(rightTitle) - Number(leftTitle) || left.order - right.order;
      })
      .slice(0, 14);
  }, [language, query]);

  if (!open) return null;

  const labels = language === "ko"
    ? {
        input: "PlanetX 문서, 기능, 용어 검색",
        dialog: "문서 검색",
        results: "검색 결과",
        empty: "일치하는 항목이 없습니다. Proxy Bake, Transition, Section 같은 표준 용어로 검색해 보세요.",
        privacy: "로컬 색인 · 검색어는 기기를 떠나지 않습니다",
        navigation: "Tab 이동 · Enter 열기",
      }
    : {
        input: "Search PlanetX docs, features, and terms",
        dialog: "Documentation search",
        results: "Search results",
        empty: "No matches. Try a canonical term such as Proxy Bake, Transition, or Section.",
        privacy: "Local index · documents, aliases, and canonical terms",
        navigation: "Tab Navigate · Enter Open",
      };

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
          <label className="sr-only" htmlFor="docs-search">{labels.input}</label>
          <input
            id="docs-search"
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.input}
            autoComplete="off"
          />
          <button type="button" onClick={closeDialog} aria-label="Close search">Esc</button>
        </div>
        <h2 id="search-dialog-title" className="sr-only">{labels.dialog}</h2>
        <div className="search-results" role="listbox" aria-label={labels.results}>
          {results.length ? results.map((result) => (
            <Link
              key={result.id}
              href={`${result.href}#main-content`}
              className={`search-result${result.kind === "term" ? " search-result--term" : ""}`}
              onClick={closeDialog}
            >
              <span className="search-result__meta">{result.meta}</span>
              <strong>{result.title}</strong>
              <span>{result.description}</span>
            </Link>
          )) : (
            <p className="search-empty">{labels.empty}</p>
          )}
        </div>
        <footer className="search-dialog__footer">
          <span>{labels.privacy}</span>
          <span>{labels.navigation}</span>
        </footer>
      </section>
    </div>
  );
}

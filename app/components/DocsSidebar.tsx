"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { getCategoryGroups, type DocLanguage } from "@/content/docs";
import { getCanonicalCategoryTitle, getCanonicalDocTitle } from "@/content/navigation";

export function DocsSidebar({ lang, activeSlug }: { lang: DocLanguage; activeSlug: string }) {
  const sidebarRef = useRef<HTMLElement>(null);
  const activeLinkRef = useRef<HTMLAnchorElement>(null);
  const labels = lang === "ko"
    ? { home: "문서 홈", pending: "번역 대기" }
    : { home: "Documentation home", pending: "Translation pending" };

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const sidebar = sidebarRef.current;
      const activeLink = activeLinkRef.current;
      if (!sidebar || !activeLink || window.matchMedia("(max-width: 960px)").matches) return;
      const sidebarRect = sidebar.getBoundingClientRect();
      const activeRect = activeLink.getBoundingClientRect();
      const centeredTop = sidebar.scrollTop + activeRect.top - sidebarRect.top - (sidebar.clientHeight - activeRect.height) / 2;
      sidebar.scrollTo({ top: Math.max(0, centeredTop), behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeSlug]);

  return (
    <aside ref={sidebarRef} className="docs-sidebar" aria-label="Documentation navigation">
      <Link href="/docs#main-content" className="docs-sidebar__home">{labels.home}</Link>
      {getCategoryGroups(lang).map(([category, categoryDocs]) => (
        <section key={category}>
          <h2>{getCanonicalCategoryTitle(category, lang)}</h2>
          <ul>
            {categoryDocs.map((doc) => (
              <li key={doc.id}>
                <Link
                  ref={doc.slug === activeSlug ? activeLinkRef : undefined}
                  href={`/docs/${doc.lang}/${doc.slug}#main-content`}
                  aria-current={doc.slug === activeSlug ? "page" : undefined}
                >
                  <span>{getCanonicalDocTitle(doc.slug, lang, doc.title)}</span>
                  {doc.translation.status === "language-only" ? <small>{labels.pending}</small> : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </aside>
  );
}

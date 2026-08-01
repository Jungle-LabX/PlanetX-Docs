import Link from "next/link";
import { getCategoryGroups, type DocLanguage } from "@/content/docs";
import { getCanonicalCategoryTitle, getCanonicalDocTitle } from "@/content/navigation";

export function DocsSidebar({ lang, activeSlug }: { lang: DocLanguage; activeSlug: string }) {
  const labels = lang === "ko"
    ? { home: "문서 홈", pending: "번역 대기" }
    : { home: "Documentation home", pending: "Translation pending" };

  return (
    <aside className="docs-sidebar" aria-label="Documentation navigation">
      <Link href="/docs" className="docs-sidebar__home">{labels.home}</Link>
      {getCategoryGroups(lang).map(([category, categoryDocs]) => (
        <section key={category}>
          <h2>{getCanonicalCategoryTitle(category, lang)}</h2>
          <ul>
            {categoryDocs.map((doc) => (
              <li key={doc.id}>
                <Link
                  href={`/docs/${doc.lang}/${doc.slug}`}
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

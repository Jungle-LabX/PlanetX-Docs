import Link from "next/link";
import type { DocRecord } from "@/content/docs";
import { getAdjacentDocs, getAlternateDoc } from "@/content/docs";
import { DocsSidebar } from "./DocsSidebar";
import { DocsToc } from "./DocsToc";
import { MarkdownContent } from "./MarkdownContent";
import { SiteHeader } from "./SiteHeader";
import { DocumentationDownloads } from "./DocumentationDownloads";
import { getCanonicalCategoryTitle, getCanonicalDocDescription, getCanonicalDocTitle } from "@/content/navigation";

export function DocsPage({ doc }: { doc: DocRecord }) {
  const alternate = getAlternateDoc(doc);
  const adjacent = getAdjacentDocs(doc);
  const isKorean = doc.lang === "ko";
  const title = getCanonicalDocTitle(doc.slug, doc.lang, doc.title);
  const description = getCanonicalDocDescription(doc.slug, doc.lang, doc.description);
  const category = getCanonicalCategoryTitle(doc.category, doc.lang);

  return (
    <div className="docs-site">
      <SiteHeader
        tone="light"
        language={doc.lang}
        alternateHref={alternate ? `/docs/${alternate.lang}/${alternate.slug}#main-content` : `/docs/${doc.lang === "en" ? "ko" : "en"}/overview#main-content`}
      />

      <div className="docs-utility-bar">
        <div>
          <strong>PlanetX Docs</strong>
          <span className="version-badge">v1.0</span>
        </div>
        <div>
          <span>{isKorean ? "문서 언어" : "Language"}: {doc.lang.toUpperCase()}</span>
          <span>{isKorean ? "최종 감사" : "Last audited"}: {doc.lastReviewed}</span>
        </div>
      </div>

      <div className="docs-layout">
        <DocsSidebar lang={doc.lang} activeSlug={doc.slug} />

        <main className="docs-main" id="main-content" tabIndex={-1}>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">PlanetX</Link><span>/</span>
            <Link href="/docs#main-content">Docs</Link><span>/</span>
            <span aria-current="page">{title}</span>
          </nav>

          <header className="doc-header">
            <div className="doc-header__eyebrow">
              <span>{category}</span>
              <span className={`review-state review-state--${doc.verificationStatus}`}>
                {doc.verificationStatus === "verified"
                  ? (isKorean ? "원문 검증 완료" : "Source verified")
                  : (isKorean ? "제품 검증 필요" : "Product review required")}
              </span>
            </div>
            <h1>{title}</h1>
            <p>{description}</p>
            <DocumentationDownloads language={doc.lang} slug={doc.slug} scope="page" />
            {doc.translation.status === "language-only" ? (
              <aside className="translation-note">
                <strong>{isKorean ? "영문 번역 대기 중" : "Translation pending"}</strong>
                <span>{isKorean ? "이 심화 문서는 현재 한국어 원문만 제공됩니다." : "This deep guide is currently available only in its source language."}</span>
              </aside>
            ) : null}
          </header>

          <MarkdownContent content={doc.content} />

          <footer className="doc-footer">
            <div className="doc-provenance">
              <span>{isKorean ? "원본" : "Source"}: <code>{doc.sourceFile}</code></span>
              <span>{isKorean ? "검토일" : "Reviewed"}: {doc.lastReviewed}</span>
            </div>
            <nav className="doc-pagination" aria-label="Document pagination">
              {adjacent.previous ? (
                <Link href={`/docs/${adjacent.previous.lang}/${adjacent.previous.slug}#main-content`}>
                  <small>← {isKorean ? "이전" : "Previous"}</small>
                  <strong>{getCanonicalDocTitle(adjacent.previous.slug, adjacent.previous.lang, adjacent.previous.title)}</strong>
                </Link>
              ) : <span />}
              {adjacent.next ? (
                <Link href={`/docs/${adjacent.next.lang}/${adjacent.next.slug}#main-content`}>
                  <small>{isKorean ? "다음" : "Next"} →</small>
                  <strong>{getCanonicalDocTitle(adjacent.next.slug, adjacent.next.lang, adjacent.next.title)}</strong>
                </Link>
              ) : null}
            </nav>
          </footer>
        </main>

        <DocsToc headings={doc.headings} />
      </div>
    </div>
  );
}

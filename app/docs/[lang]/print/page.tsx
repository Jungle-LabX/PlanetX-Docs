import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/app/components/MarkdownContent";
import { PrintControls } from "@/app/components/PrintControls";
import { SiteHeader } from "@/app/components/SiteHeader";
import { getDocsForLanguage, type DocLanguage } from "@/content/docs";
import { getCanonicalDocDescription, getCanonicalDocTitle } from "@/content/navigation";

type PrintPageProps = { params: Promise<{ lang: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ko" }];
}

export async function generateMetadata({ params }: PrintPageProps): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "ko" ? "PlanetX 공식 문서" : "PlanetX Official Documentation" };
}

export default async function DocumentationPrintPage({ params }: PrintPageProps) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "ko") notFound();
  const language = lang as DocLanguage;
  const documents = getDocsForLanguage(language);
  const isKorean = language === "ko";

  return (
    <div className="docs-print">
      <SiteHeader
        tone="light"
        language={language}
        alternateHref={`/docs/${language === "ko" ? "en" : "ko"}/print`}
      />
      <PrintControls language={language} />
      <main id="main-content">
        <header className="docs-print__cover">
          <span>PlanetX · LabX</span>
          <h1>{isKorean ? "PlanetX 공식 문서" : "PlanetX Official Documentation"}</h1>
          <p>{isKorean ? "현재 한국어 세션의 전체 공개 문서" : "Complete public documentation for the current English session"}</p>
          <small>Version 1.0 · Last reviewed 2026-08-01</small>
        </header>
        {documents.map((doc) => (
          <article className="docs-print__document" key={doc.id}>
            <header>
              <span>{doc.category}</span>
              <h1>{getCanonicalDocTitle(doc.slug, language, doc.title)}</h1>
              <p>{getCanonicalDocDescription(doc.slug, language, doc.description)}</p>
            </header>
            <MarkdownContent content={doc.content} />
          </article>
        ))}
      </main>
    </div>
  );
}

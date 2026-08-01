"use client";

import { useEffect, useState } from "react";
import type { DocLanguage } from "@/content/docs";

type DocumentationDownloadsProps = {
  language?: DocLanguage;
  slug?: string;
  scope: "collection" | "page";
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

export function DocumentationDownloads({ language = "en", slug, scope }: DocumentationDownloadsProps) {
  const [activeLanguage, setActiveLanguage] = useState<DocLanguage>(language);

  useEffect(() => {
    if (scope !== "collection") return;
    const stored = window.sessionStorage.getItem("planetx-language");
    if (stored === "en" || stored === "ko") {
      const frame = window.requestAnimationFrame(() => setActiveLanguage(stored));
      return () => window.cancelAnimationFrame(frame);
    }
  }, [scope]);

  const isKorean = activeLanguage === "ko";
  const markdownHref = scope === "collection"
    ? `${basePath}/downloads/planetx-docs-${activeLanguage}.md`
    : `${basePath}/downloads/${activeLanguage}/${slug}.md`;
  const printHref = `${basePath}/docs/${activeLanguage}/print/?autoprint=1`;

  return (
    <div className={`documentation-downloads documentation-downloads--${scope}`} aria-label={isKorean ? "문서 다운로드" : "Documentation downloads"}>
      <span className="documentation-downloads__label">
        {scope === "collection"
          ? (isKorean ? `전체 문서 · ${activeLanguage.toUpperCase()}` : `Complete edition · ${activeLanguage.toUpperCase()}`)
          : (isKorean ? "이 페이지 받기" : "Download this page")}
      </span>
      <a className="documentation-downloads__action" href={markdownHref} download>
        <span aria-hidden="true">MD</span>
        <strong>Markdown</strong>
      </a>
      {scope === "collection" ? (
        <a className="documentation-downloads__action" href={printHref} target="_blank" rel="noreferrer">
          <span aria-hidden="true">PDF</span>
          <strong>{isKorean ? "PDF로 저장" : "Save as PDF"}</strong>
        </a>
      ) : (
        <button className="documentation-downloads__action" type="button" onClick={() => window.print()}>
          <span aria-hidden="true">PDF</span>
          <strong>{isKorean ? "PDF로 저장" : "Save as PDF"}</strong>
        </button>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DocLanguage } from "@/content/docs";
import docsManifest from "@/source-docs/docs-manifest.json";
import { DocumentationDownloads } from "./DocumentationDownloads";
import { SiteHeader } from "./SiteHeader";

const homeCopy = {
  en: {
    eyebrow: "PlanetX Documentation · Version 1.0",
    title: <>Build your first proxy.<br />Connect the full journey.</>,
    intro: "Choose a language to open the official technical documentation. Both editions provide the same reviewed public scope across 48 guides.",
    paths: [
      ["New to PlanetX?", "Follow the Same World path from installation through your first playable planet.", "Start Here", "quick-start-same-world"],
      ["Integrating runtime?", "Understand Planet, Coordinate, Movement, and Travel responsibilities.", "Runtime Integration", "runtime-integration"],
      ["Solving a failure?", "Start from setup checks, then follow the guide for the visible symptom.", "Troubleshooting", "setup-configuration"],
    ],
  },
  ko: {
    eyebrow: "PlanetX 공식 문서 · 버전 1.0",
    title: <>첫 Proxy를 만들고.<br />전체 여정을 연결하세요.</>,
    intro: "언어를 선택해 공식 기술 문서를 확인하세요. 두 언어판 모두 검토된 공개 범위 48개 문서를 동일하게 제공합니다.",
    paths: [
      ["PlanetX를 처음 사용하나요?", "설치부터 첫 플레이 가능한 행성까지 Same World 경로를 따라갑니다.", "여기서 시작", "quick-start-same-world"],
      ["Runtime을 통합하나요?", "Planet, Coordinate, Movement와 Travel의 책임 범위를 확인합니다.", "Runtime 통합", "runtime-integration"],
      ["오류를 해결하고 있나요?", "설정 점검부터 시작해 증상에 맞는 안내를 따릅니다.", "문제 해결", "setup-configuration"],
    ],
  },
} as const;

const defaultDocSlug = docsManifest.defaultSlug;
const coreDocCount = docsManifest.categories.reduce(
  (total, category) => total + category.documents.length,
  0,
);

export function DocumentationHome() {
  const [language, setLanguage] = useState<DocLanguage>("en");

  useEffect(() => {
    const stored = window.sessionStorage.getItem("planetx-language");
    if (stored !== "en" && stored !== "ko") return;
    const frame = window.requestAnimationFrame(() => setLanguage(stored));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const text = homeCopy[language];
  const alternateLanguage = language === "ko" ? "en" : "ko";

  return (
    <div className="docs-home">
      <SiteHeader
        tone="light"
        language={language}
        alternateHref={`/docs/${alternateLanguage}/${defaultDocSlug}#main-content`}
      />
      <main id="main-content" tabIndex={-1}>
        <span className="eyebrow">{text.eyebrow}</span>
        <h1>{text.title}</h1>
        <p>{text.intro}</p>
        <DocumentationDownloads language={language} scope="collection" />
        <div className="docs-home__languages">
          <Link href={`/docs/en/${defaultDocSlug}#main-content`} onClick={() => window.sessionStorage.setItem("planetx-language", "en")}>
            <span>EN</span><div><strong>English</strong><small>{coreDocCount} documentation guides · reviewed public edition</small></div><i>→</i>
          </Link>
          <Link href={`/docs/ko/${defaultDocSlug}#main-content`} onClick={() => window.sessionStorage.setItem("planetx-language", "ko")}>
            <span>KO</span><div><strong>한국어</strong><small>기술 문서 {coreDocCount}개 · 영어판과 동일한 공개 범위</small></div><i>→</i>
          </Link>
        </div>
        <div className="docs-home__paths">
          {text.paths.map(([title, description, label, slug], index) => (
            <article key={slug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{title}</h2>
              <p>{description}</p>
              <Link href={`/docs/${language}/${slug}#main-content`}>{label} →</Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

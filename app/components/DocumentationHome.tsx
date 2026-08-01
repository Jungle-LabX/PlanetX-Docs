"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DocLanguage } from "@/content/docs";
import { DocumentationDownloads } from "./DocumentationDownloads";
import { SiteHeader } from "./SiteHeader";

const homeCopy = {
  en: {
    eyebrow: "PlanetX Documentation · Version 1.0",
    title: <>Build your first proxy.<br />Connect the full journey.</>,
    intro: "Choose a language to open the official technical documentation. Both editions preserve the reviewed source material; translation gaps remain visible.",
    paths: [
      ["New to PlanetX?", "Create a Planet Asset, review source content, and bake your first proxy.", "Quick Start", "getting-started"],
      ["Integrating runtime?", "Understand Planet, Coordinate, Movement, and Travel responsibilities.", "Runtime Integration", "runtime-integration"],
      ["Solving a failure?", "Start from the visible symptom, then follow the documented recovery order.", "Troubleshooting", "troubleshooting"],
    ],
  },
  ko: {
    eyebrow: "PlanetX 공식 문서 · 버전 1.0",
    title: <>첫 Proxy를 만들고.<br />전체 여정을 연결하세요.</>,
    intro: "현재 세션 언어로 공식 기술 문서를 확인하세요. 검수된 원문 범위와 번역 상태를 구분해 제공하며, 번역되지 않은 심화 문서는 상태를 명확히 표시합니다.",
    paths: [
      ["PlanetX를 처음 사용하나요?", "Planet Asset을 만들고 Source를 검토한 뒤 첫 Orbit Proxy를 Bake합니다.", "빠른 시작", "getting-started"],
      ["Runtime을 통합하나요?", "Planet, Coordinate, Movement와 Travel의 책임 범위를 확인합니다.", "Runtime 통합", "runtime-integration"],
      ["오류를 해결하고 있나요?", "화면에 나타난 증상부터 시작해 검증된 복구 순서를 따릅니다.", "문제 해결", "troubleshooting"],
    ],
  },
} as const;

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
        alternateHref={`/docs/${alternateLanguage}/overview#main-content`}
      />
      <main id="main-content" tabIndex={-1}>
        <span className="eyebrow">{text.eyebrow}</span>
        <h1>{text.title}</h1>
        <p>{text.intro}</p>
        <DocumentationDownloads language={language} scope="collection" />
        <div className="docs-home__languages">
          <Link href="/docs/en/overview#main-content" onClick={() => window.sessionStorage.setItem("planetx-language", "en")}>
            <span>EN</span><div><strong>English</strong><small>13 documents · reviewed public guide</small></div><i>→</i>
          </Link>
          <Link href="/docs/ko/overview#main-content" onClick={() => window.sessionStorage.setItem("planetx-language", "ko")}>
            <span>KO</span><div><strong>한국어</strong><small>15개 문서 · API 및 Runtime 심화 가이드 포함</small></div><i>→</i>
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

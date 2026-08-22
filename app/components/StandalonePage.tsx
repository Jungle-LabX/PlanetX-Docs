"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DocLanguage, DocRecord } from "@/content/docs";
import { getCanonicalDocDescription, getCanonicalDocTitle } from "@/content/navigation";
import { MarkdownContent } from "./MarkdownContent";
import { SiteHeader } from "./SiteHeader";

type StandaloneKind = "known-issues" | "faq" | "release-notes" | "about";

type StandalonePageProps = {
  kind: StandaloneKind;
  documents?: Partial<Record<DocLanguage, DocRecord>>;
  initialLanguage?: DocLanguage;
};

const pageCopy = {
  en: {
    "known-issues": { eyebrow: "Product status", title: "Known Issues", intro: "Publication status and reporting guidance for product-reviewed issues." },
    faq: { eyebrow: "Product guidance", title: "Frequently Asked Questions", intro: "Direct answers about PlanetX scope, runtime ownership, Bake, and integration." },
    "release-notes": { eyebrow: "PlanetX updates", title: "Release Notes", intro: "Published and pending PlanetX update notes." },
    about: { eyebrow: "Independent product team", title: "About LabX", intro: "LabX builds focused tools that make ambitious Unreal Engine workflows easier to author, review, and ship." },
  },
  ko: {
    "known-issues": { eyebrow: "제품 상태", title: "알려진 문제", intro: "제품 검토를 거친 이슈의 게시 상태와 문제 보고 준비 사항을 안내합니다." },
    faq: { eyebrow: "제품 안내", title: "자주 묻는 질문", intro: "PlanetX의 범위, Runtime 책임, Bake, 통합 과정에 관한 핵심 답변을 확인하세요." },
    "release-notes": { eyebrow: "PlanetX 업데이트", title: "릴리스 노트", intro: "공개 및 예정된 PlanetX 업데이트 노트입니다." },
    about: { eyebrow: "독립 개발 팀", title: "LabX 소개", intro: "LabX는 Unreal Engine의 복잡한 제작 과정을 더 쉽게 구성하고 검토하며 배포할 수 있도록 집중도 높은 도구를 만듭니다." },
  },
} as const;

const aboutCopy = {
  en: {
    productTitle: "What we are building",
    productBody: "PlanetX connects a familiar flat Level-authoring workflow to a curved planetary representation. The plugin keeps Ground detail where it belongs and provides the data needed to hand off through Transition into Orbit.",
    approachTitle: "How we work",
    approachBody: "We favor explicit states, reviewable Editor steps, and honest compatibility claims. Product behavior and documentation are developed together so Unreal Engine users can see what PlanetX owns—and what remains game-owned.",
    independentTitle: "Independent development",
    independentBody: "PlanetX was independently developed by LabX while participating in the Epic Project, a developer-support program of the KRAFTON JUNGLE GameTech Lab. All rights, title, and interest in the product are exclusively vested in LabX. KRAFTON was not involved in its development or distribution and assumes no responsibility or liability for consequences arising from its use.",
    docs: "Read the documentation",
    github: "View the project on GitHub",
  },
  ko: {
    productTitle: "만들고 있는 것",
    productBody: "PlanetX는 익숙한 평면 Level 제작 워크플로를 곡면 행성 표현과 연결합니다. Ground의 디테일은 그대로 유지하고, Transition을 거쳐 Orbit으로 전환하는 데 필요한 데이터를 제공합니다.",
    approachTitle: "개발 원칙",
    approachBody: "명시적인 상태, 검토 가능한 Editor 단계, 검증된 호환성 정보에 집중합니다. PlanetX가 담당하는 영역과 게임이 담당해야 하는 영역을 UE 사용자가 분명히 파악할 수 있도록 제품과 문서를 함께 개발합니다.",
    independentTitle: "독립 개발 안내",
    independentBody: "PlanetX는 KRAFTON JUNGLE GameTech Lab의 개발자 지원 프로그램인 Epic Project 참여 기간에 LabX가 독립적으로 개발한 제품입니다. 제품에 관한 모든 권리와 소유권은 LabX에 있으며, KRAFTON은 개발 및 유통에 관여하지 않았고 제품 사용으로 발생하는 결과에 책임을 지지 않습니다.",
    docs: "문서 보기",
    github: "GitHub에서 프로젝트 보기",
  },
} as const;

function standaloneBody(content: string) {
  const firstSection = content.indexOf("## ");
  return firstSection >= 0 ? content.slice(firstSection) : content;
}

export function StandalonePage({ kind, documents, initialLanguage = "en" }: StandalonePageProps) {
  const [language, setLanguage] = useState<DocLanguage>(initialLanguage);

  useEffect(() => {
    const stored = window.sessionStorage.getItem("planetx-language");
    if (stored !== "en" && stored !== "ko") return;
    const frame = window.requestAnimationFrame(() => setLanguage(stored));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const changeLanguage = (nextLanguage: DocLanguage) => {
    window.sessionStorage.setItem("planetx-language", nextLanguage);
    setLanguage(nextLanguage);
  };

  const copy = pageCopy[language][kind];
  const document = documents?.[language] ?? documents?.en ?? documents?.ko;
  const about = aboutCopy[language];
  // Release notes must expose their document title and status in the hero.
  // A static "PlanetX 1.0" hero made a pending update look already shipped.
  const title = document
    ? (kind === "release-notes"
      ? document.title
      : getCanonicalDocTitle(document.slug, language, copy.title))
    : copy.title;
  const intro = document
    ? getCanonicalDocDescription(document.slug, language, copy.intro)
    : copy.intro;

  return (
    <div className={`standalone-page standalone-page--${kind}`}>
      <SiteHeader tone="light" language={language} onLanguageChange={changeLanguage} />
      <main id="main-content" tabIndex={-1}>
        <header className="standalone-hero">
          <span className="eyebrow">{copy.eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
        </header>

        {kind === "about" ? (
          <div className="about-sections">
            <article><span>01</span><h2>{about.productTitle}</h2><p>{about.productBody}</p></article>
            <article><span>02</span><h2>{about.approachTitle}</h2><p>{about.approachBody}</p></article>
            <article className="about-sections__legal"><span>03</span><h2>{about.independentTitle}</h2><p>{about.independentBody}</p></article>
            <nav className="about-actions" aria-label={language === "ko" ? "LabX 관련 링크" : "LabX links"}>
              <Link className="button button--primary" href="/docs#main-content">{about.docs}</Link>
              <a className="button button--text" href="https://github.com/Jungle-LabX/PlanetX-Docs" target="_blank" rel="noreferrer">{about.github} ↗</a>
            </nav>
          </div>
        ) : document ? (
          <section className="standalone-content" aria-label={title}>
            <MarkdownContent content={standaloneBody(document.content)} />
          </section>
        ) : null}
      </main>
    </div>
  );
}

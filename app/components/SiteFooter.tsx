"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DocLanguage } from "@/content/docs";
import { BrandMark } from "./BrandMark";

const footerCopy = {
  en: {
    tagline: "Planet-scale world workflow tools for Unreal Engine.",
    main: "Main",
    docs: "Documentation",
    issues: "Known Issues",
    faq: "FAQ",
    releases: "Release notes",
    about: "About Us",
    disclaimer: "PlanetX was independently developed by LabX while participating in the Epic Project, a developer-support program of the KRAFTON JUNGLE GameTech Lab. All rights, title, and interest in the product are exclusively vested in LabX. KRAFTON was not involved in its development or distribution and assumes no responsibility or liability for consequences arising from its use.",
    rights: "© 2026 LabX. PlanetX documentation version 1.0.",
  },
  ko: {
    tagline: "Unreal Engine을 위한 행성 규모 World 워크플로 도구.",
    main: "메인",
    docs: "문서",
    issues: "알려진 문제",
    faq: "FAQ",
    releases: "릴리스 노트",
    about: "소개",
    disclaimer: "PlanetX는 KRAFTON JUNGLE GameTech Lab의 개발자 지원 프로그램인 Epic Project 참여 과정에서 LabX가 독립적으로 개발한 제품입니다. 제품에 관한 모든 권리와 소유권은 LabX에 있으며, KRAFTON은 개발 및 유통에 관여하지 않았고 제품 사용으로 발생하는 결과에 대해 책임을 부담하지 않습니다.",
    rights: "© 2026 LabX. PlanetX 문서 버전 1.0.",
  },
} as const;

export function SiteFooter() {
  const [language, setLanguage] = useState<DocLanguage>("en");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const stored = window.sessionStorage.getItem("planetx-language");
        const nextLanguage = stored === "en" || stored === "ko"
          ? stored
          : (document.documentElement.lang === "ko" ? "ko" : "en");
        setLanguage(nextLanguage);
      });
    };
    update();
    const languageObserver = new MutationObserver(update);
    languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => {
      window.cancelAnimationFrame(frame);
      languageObserver.disconnect();
    };
  }, []);

  const text = footerCopy[language];

  return (
    <footer className="site-footer">
      <div className="site-footer__brand"><BrandMark size={40} /><span><strong>PlanetX</strong><small>by LabX</small></span></div>
      <p>{text.tagline}</p>
      <nav aria-label={language === "ko" ? "Footer 탐색" : "Footer navigation"}>
        <Link href="/#site-top">{text.main}</Link>
        <Link href="/docs#main-content">{text.docs}</Link>
        <Link href="/known-issues#main-content">{text.issues}</Link>
        <Link href="/faq#main-content">{text.faq}</Link>
        <Link href="/release-notes#main-content">{text.releases}</Link>
        <Link href="/about#main-content">{text.about}</Link>
        <a href="https://github.com/Jungle-LabX/PlanetX-Docs" target="_blank" rel="noreferrer">GitHub</a>
      </nav>
      <p className="site-footer__disclaimer">{text.disclaimer}</p>
      <small className="site-footer__rights">{text.rights}</small>
    </footer>
  );
}

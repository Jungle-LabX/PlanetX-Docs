"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandMark } from "./BrandMark";
import { ThemeToggle } from "./ThemeToggle";
import { primaryNavigation } from "@/content/navigation";

type SiteHeaderProps = {
  tone?: "light" | "dark";
  language?: "en" | "ko";
  alternateHref?: string;
  onLanguageChange?: (language: "en" | "ko") => void;
};

export function SiteHeader({
  tone = "dark",
  language = "en",
  alternateHref = "/docs/ko/overview",
  onLanguageChange,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = language;
    if (window.location.pathname.includes(`/docs/${language}/`)) {
      window.sessionStorage.setItem("planetx-language", language);
    }
  }, [language]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent("planetx:open-search"));
  };

  const isKorean = language === "ko";
  const nextLanguage = isKorean ? "en" : "ko";
  const labels = isKorean
    ? {
        search: "문서 검색",
        toggleNavigation: "메뉴 열기/닫기",
      }
    : {
        search: "Search documentation",
        toggleNavigation: "Toggle navigation",
      };

  const languageControl = onLanguageChange ? (
    <button
      className="language-link"
      type="button"
      onClick={() => onLanguageChange(nextLanguage)}
      aria-label={isKorean ? "Switch landing page to English" : "메인 페이지를 한국어로 전환"}
      aria-pressed={isKorean}
    >
      {language.toUpperCase()}
    </button>
  ) : (
    <Link
      className="language-link"
      href={alternateHref}
      hrefLang={nextLanguage}
      aria-label={isKorean ? "Switch documentation to English" : "문서를 한국어로 전환"}
      onClick={() => window.sessionStorage.setItem("planetx-language", nextLanguage)}
    >
      {language.toUpperCase()}
    </Link>
  );

  return (
    <header className={`site-header site-header--${tone}`}>
      <div className="site-header__inner">
        <Link className="brand" href="/" aria-label="PlanetX home">
          <BrandMark className="brand__mark" size={38} />
          <span>PlanetX <small>by LabX</small></span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryNavigation.map((item) => (
            <Link key={item.id} href={item.href(language)}>{item.label[language]}</Link>
          ))}
        </nav>

        <div className="site-header__actions">
          <button
            className="search-trigger"
            type="button"
            onClick={openSearch}
            aria-label={labels.search}
          >
            <span aria-hidden="true">⌕</span>
            <span className="search-trigger__label">{isKorean ? "검색" : "Search"}</span>
            <kbd>⌘K</kbd>
          </button>
          {languageControl}
          <ThemeToggle />
          <button
            className="menu-trigger"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span className="sr-only">{labels.toggleNavigation}</span>
            <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {primaryNavigation.map((item) => (
            <Link key={item.id} href={item.href(language)} onClick={() => setMenuOpen(false)}>{item.label[language]}</Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

type SiteHeaderProps = {
  tone?: "light" | "dark";
  language?: "en" | "ko";
  alternateHref?: string;
};

export function SiteHeader({
  tone = "dark",
  language = "en",
  alternateHref = "/docs/ko/overview",
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <header className={`site-header site-header--${tone}`}>
      <div className="site-header__inner">
        <Link className="brand" href="/" aria-label="PlanetX home">
          <Image src={`${basePath}/brand/planetx-icon.png`} alt="" width={34} height={34} priority />
          <span>PlanetX</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/#product">Product</Link>
          <Link href="/docs">Documentation</Link>
          <Link href="/#compatibility">Compatibility</Link>
          <Link href="/docs/en/support-release-notes">Release notes</Link>
          <Link href="/docs/en/troubleshooting">Support</Link>
        </nav>

        <div className="site-header__actions">
          <button
            className="search-trigger"
            type="button"
            onClick={openSearch}
            aria-label="Search documentation"
          >
            <span aria-hidden="true">⌕</span>
            <span className="search-trigger__label">Search</span>
            <kbd>⌘ K</kbd>
          </button>
          <Link className="language-link" href={alternateHref} hrefLang={language === "en" ? "ko" : "en"}>
            {language === "en" ? "KO" : "EN"}
          </Link>
          <button
            className="menu-trigger"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span className="sr-only">Toggle navigation</span>
            <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          <Link href="/#product" onClick={() => setMenuOpen(false)}>Product</Link>
          <Link href="/docs" onClick={() => setMenuOpen(false)}>Documentation</Link>
          <Link href="/#compatibility" onClick={() => setMenuOpen(false)}>Compatibility</Link>
          <Link href="/docs/en/support-release-notes" onClick={() => setMenuOpen(false)}>Release notes</Link>
          <Link href="/docs/en/troubleshooting" onClick={() => setMenuOpen(false)}>Support</Link>
        </nav>
      ) : null}
    </header>
  );
}

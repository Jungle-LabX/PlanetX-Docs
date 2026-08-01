"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DocLanguage } from "@/content/docs";

export default function NotFound() {
  const [language, setLanguage] = useState<DocLanguage>("en");

  useEffect(() => {
    const stored = window.sessionStorage.getItem("planetx-language");
    if (stored !== "en" && stored !== "ko") return;
    const frame = window.requestAnimationFrame(() => {
      setLanguage(stored);
      document.documentElement.lang = stored;
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const isKorean = language === "ko";

  return (
    <main className="not-found" id="main-content">
      <span>404 · {isKorean ? "Orbit 경로 이탈" : "Lost in orbit"}</span>
      <h1>{isKorean ? "현재 항로에서 찾을 수 없는 경로입니다." : "This route is outside the current chart."}</h1>
      <p>{isKorean ? "문서가 이동했거나 해당 언어의 번역이 아직 제공되지 않을 수 있습니다." : "The document may have moved, or the translation may not exist yet."}</p>
      <div>
        <Link className="button button--primary" href="/docs">{isKorean ? "문서 열기" : "Open documentation"}</Link>
        <Link className="button button--ghost" href="/">{isKorean ? "메인으로 돌아가기" : "Return home"}</Link>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { DocLanguage } from "@/content/docs";

export function PrintControls({ language }: { language: DocLanguage }) {
  const isKorean = language === "ko";

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("autoprint") !== "1") return;
    let cancelled = false;
    const printWhenReady = async () => {
      await document.fonts?.ready;
      const deadline = Date.now() + 5000;
      while (!cancelled && Date.now() < deadline) {
        const diagrams = document.querySelectorAll(".mermaid-diagram").length;
        const renderedDiagrams = document.querySelectorAll(".mermaid-diagram svg").length;
        if (diagrams === renderedDiagrams) break;
        await new Promise((resolve) => window.setTimeout(resolve, 120));
      }
      if (!cancelled) window.print();
    };
    void printWhenReady();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="print-controls">
      <div>
        <strong>{isKorean ? "전체 문서 PDF" : "Complete documentation PDF"}</strong>
        <span>{isKorean ? "인쇄 창에서 ‘PDF로 저장’을 선택하십시오." : "Choose “Save as PDF” in the print dialog."}</span>
      </div>
      <button type="button" onClick={() => window.print()}>{isKorean ? "인쇄 창 열기" : "Open print dialog"}</button>
      <Link href="/docs">{isKorean ? "문서 홈" : "Documentation home"}</Link>
    </div>
  );
}

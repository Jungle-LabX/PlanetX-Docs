"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [isKorean, setIsKorean] = useState(false);

  useEffect(() => {
    const update = () => {
      setVisible(window.scrollY > 560);
      setIsKorean(document.documentElement.lang === "ko");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    const languageObserver = new MutationObserver(update);
    languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => {
      window.removeEventListener("scroll", update);
      languageObserver.disconnect();
    };
  }, []);

  return (
    <button
      type="button"
      className={`back-to-top${visible ? " is-visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={isKorean ? "페이지 맨 위로 이동" : "Back to top"}
      title={isKorean ? "맨 위로" : "Back to top"}
      tabIndex={visible ? 0 : -1}
    >
      <span aria-hidden="true">↑</span>
      <small>{isKorean ? "맨 위로" : "TOP"}</small>
    </button>
  );
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MainContentFocus() {
  const pathname = usePathname();

  useEffect(() => {
    const focusMain = () => {
      if (window.location.hash !== "#main-content") return;
      window.requestAnimationFrame(() => {
        const main = document.getElementById("main-content");
        if (!(main instanceof HTMLElement)) return;
        main.focus({ preventScroll: true });
        main.scrollIntoView({ block: "start", behavior: "auto" });
        window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}`);
      });
    };

    focusMain();
    window.addEventListener("hashchange", focusMain);
    return () => window.removeEventListener("hashchange", focusMain);
  }, [pathname]);

  return null;
}

"use client";

import { useEffect, useId, useRef, useState } from "react";

export function MermaidDiagram({ code }: { code: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const readTheme = () => setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    queueMicrotask(readTheme);
    const observer = new MutationObserver(readTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;

    const renderDiagram = async () => {
      try {
        setError(null);
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          themeVariables: theme === "dark"
            ? {
                background: "#0a111d",
                primaryColor: "#122a3b",
                primaryTextColor: "#eefbff",
                primaryBorderColor: "#57d8e8",
                lineColor: "#7e8cff",
                secondaryColor: "#161e36",
                tertiaryColor: "#111b28",
                noteBkgColor: "#1b2635",
                noteTextColor: "#eefbff",
                fontSize: "16px",
              }
            : {
                background: "#f8fbfd",
                primaryColor: "#e6f7fa",
                primaryTextColor: "#102235",
                primaryBorderColor: "#138ba2",
                lineColor: "#4f5ecf",
                secondaryColor: "#eef0ff",
                tertiaryColor: "#f3f7fa",
                noteBkgColor: "#fff8eb",
                noteTextColor: "#102235",
                fontSize: "16px",
              },
          flowchart: { useMaxWidth: true, htmlLabels: true, curve: "basis" },
        });

        const renderId = `planetx-mermaid-${reactId}-${theme}`;
        const { svg, bindFunctions } = await mermaid.render(renderId, code);
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = svg;
        bindFunctions?.(containerRef.current);
      } catch (reason) {
        if (cancelled) return;
        setError(reason instanceof Error ? reason.message : "Unable to render this diagram.");
      }
    };

    void renderDiagram();
    return () => { cancelled = true; };
  }, [code, reactId, theme]);

  return (
    <figure className="mermaid-diagram">
      <div className="mermaid-diagram__toolbar">
        <span><i aria-hidden="true" /> Mermaid diagram</span>
        <small>Rendered locally</small>
      </div>
      {error ? (
        <div className="mermaid-diagram__error" role="alert">
          <strong>Diagram rendering failed</strong>
          <span>{error}</span>
        </div>
      ) : null}
      <div ref={containerRef} className="mermaid-diagram__canvas" aria-label="Rendered Mermaid diagram" />
      <details className="mermaid-diagram__source">
        <summary>View diagram source</summary>
        <pre><code>{code}</code></pre>
      </details>
    </figure>
  );
}

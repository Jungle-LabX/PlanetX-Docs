import type { ReactElement, ReactNode } from "react";
import React from "react";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./CodeBlock";
import { ImageLightbox } from "./ImageLightbox";
import { MermaidDiagram } from "./MermaidDiagram";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";

function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (React.isValidElement<{ children?: ReactNode }>(node)) return nodeText(node.props.children);
  return "";
}

function slugify(value: string) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase()
    .replace(/&/g, " and ")
    .replace(/_/g, " ")
    .replace(/[`*]/g, "")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

export function MarkdownContent({ content }: { content: string }) {
  const headingCounts = new Map<string, number>();

  const heading = (level: 2 | 3 | 4) => {
    const Component = `h${level}` as const;
    return function Heading({ children }: { children?: ReactNode }) {
      const base = slugify(nodeText(children));
      const count = headingCounts.get(base) ?? 0;
      headingCounts.set(base, count + 1);
      const id = count ? `${base}-${count + 1}` : base;
      return (
        <Component id={id} className="anchored-heading">
          <a href={`#${id}`} aria-label={`Link to ${nodeText(children)}`}>#</a>
          {children}
        </Component>
      );
    };
  };

  const components: Components = {
    h2: heading(2),
    h3: heading(3),
    h4: heading(4),
    a({ href = "", children, ...props }) {
      if (href.startsWith("/")) {
        return <Link href={href}>{children}</Link>;
      }
      return <a href={href} target="_blank" rel="noreferrer" {...props}>{children}</a>;
    },
    pre({ children }) {
      const child = React.Children.only(children) as ReactElement<{
        children?: ReactNode;
        className?: string;
      }>;
      const code = nodeText(child.props.children).replace(/\n$/, "");
      const language = child.props.className?.replace("language-", "");
      if (language?.toLocaleLowerCase() === "mermaid") {
        return <MermaidDiagram code={code} />;
      }
      return <CodeBlock code={code} language={language} />;
    },
    img({ src = "", alt = "" }) {
      const imageSrc = typeof src === "string" ? src : "";
      const resolvedSrc = imageSrc.startsWith("/") ? `${basePath}${imageSrc}` : imageSrc;
      return <ImageLightbox src={resolvedSrc} alt={alt} />;
    },
    table({ children }) {
      return <div className="table-wrap"><table>{children}</table></div>;
    },
    blockquote({ children }) {
      return <aside className="admonition"><span aria-hidden="true">i</span><div>{children}</div></aside>;
    },
  };

  return (
    <div className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

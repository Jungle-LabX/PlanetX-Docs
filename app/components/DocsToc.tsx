import type { DocHeading } from "@/content/docs";

export function DocsToc({ headings }: { headings: DocHeading[] }) {
  const visible = headings.filter((heading) => heading.level === 2 || heading.level === 3);
  if (!visible.length) return null;

  return (
    <aside className="docs-toc" aria-label="On this page">
      <h2>On this page</h2>
      <ol>
        {visible.map((heading, index) => (
          <li key={`${heading.id}-${index}`} data-level={heading.level}>
            <a href={`#${heading.id}`}>{heading.title}</a>
          </li>
        ))}
      </ol>
    </aside>
  );
}

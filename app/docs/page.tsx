import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";
import { DocumentationDownloads } from "../components/DocumentationDownloads";

export const metadata: Metadata = {
  title: "Documentation",
  description: "PlanetX documentation in English and Korean.",
};

export default function DocumentationHome() {
  return (
    <div className="docs-home">
      <SiteHeader tone="light" />
      <main id="main-content">
        <span className="eyebrow">PlanetX Documentation · Version 1.0</span>
        <h1>Build your first proxy.<br />Connect the full journey.</h1>
        <p>Choose a language to open the official technical documentation. Both editions preserve the reviewed source material; translation gaps remain visible.</p>
        <DocumentationDownloads scope="collection" />
        <div className="docs-home__languages">
          <Link href="/docs/en/overview">
            <span>EN</span><div><strong>English</strong><small>13 documents · reviewed public guide</small></div><i>→</i>
          </Link>
          <Link href="/docs/ko/overview">
            <span>KO</span><div><strong>한국어</strong><small>15개 문서 · API 및 Runtime 심화 가이드 포함</small></div><i>→</i>
          </Link>
        </div>
        <div className="docs-home__paths">
          <article><span>01</span><h2>New to PlanetX?</h2><p>Create a Planet Asset, review source content, and bake your first proxy.</p><Link href="/docs/en/getting-started">Quick Start →</Link></article>
          <article><span>02</span><h2>Integrating runtime?</h2><p>Understand Planet, Coordinate, Movement, and travel responsibilities.</p><Link href="/docs/en/runtime-integration">Runtime Integration →</Link></article>
          <article><span>03</span><h2>Solving a failure?</h2><p>Start from the visible symptom, then follow the documented recovery order.</p><Link href="/docs/en/troubleshooting">Troubleshooting →</Link></article>
        </div>
      </main>
    </div>
  );
}

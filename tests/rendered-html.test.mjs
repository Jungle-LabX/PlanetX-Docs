import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the PlanetX product landing page", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Author the ground/);
  assert.match(html, /Reveal the planet/);
  assert.match(html, /Download on FAB/);
  assert.match(html, /PlanetX 1\.0/);
  assert.match(html, /independently developed by LabX/);
  assert.doesNotMatch(html, /World structure|Coordinate model|Editor sequence/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("renders English and Korean documentation routes", async () => {
  const [english, korean] = await Promise.all([
    render("/docs/en/overview/"),
    render("/docs/ko/user-api/"),
  ]);
  assert.equal(english.status, 200);
  assert.equal(korean.status, 200);
  const englishHtml = await english.text();
  assert.match(englishHtml, /Overview/);
  assert.match(englishHtml, /mermaid-diagram__canvas/);
  const koreanHtml = await korean.text();
  assert.match(koreanHtml, /PlanetX 사용자 제공 API/);
  assert.match(koreanHtml, /영문 번역 대기 중/);
});

test("renders standalone product information outside the documentation hierarchy", async () => {
  const responses = await Promise.all([
    render("/faq/"),
    render("/known-issues/"),
    render("/release-notes/"),
    render("/about/"),
  ]);
  for (const response of responses) assert.equal(response.status, 200);
  const htmlPages = await Promise.all(responses.map((response) => response.text()));
  for (const html of htmlPages) {
    assert.doesNotMatch(html, /docs-sidebar|docs-utility-bar/);
  }
  assert.match(htmlPages[0], /Frequently Asked Questions/);
  assert.match(htmlPages[1], /Known Issues/);
  assert.match(htmlPages[2], /Release Notes/);
  assert.match(htmlPages[3], /About LabX/);
});

test("uses the canonical global navigation order", async () => {
  const html = await (await render("/")).text();
  const labels = ["Main", "Documentation", "Known Issues", "FAQ", "Release Notes", "About Us"];
  const positions = labels.map((label) => html.indexOf(`>${label}</a>`));
  assert.equal(positions.every((position) => position >= 0), true);
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  assert.doesNotMatch(html, />Product<\/a>|>Compatibility<\/a>/);
});

test("publishes page and complete-edition documentation downloads", async () => {
  const [home, englishPrint, englishMarkdown, koreanMarkdown] = await Promise.all([
    render("/docs/"),
    render("/docs/en/print/"),
    readFile(new URL("../public/downloads/planetx-docs-en.md", import.meta.url), "utf8"),
    readFile(new URL("../public/downloads/planetx-docs-ko.md", import.meta.url), "utf8"),
  ]);
  assert.equal(home.status, 200);
  assert.match(await home.text(), /downloads\/planetx-docs-en\.md/);
  assert.equal(englishPrint.status, 200);
  assert.match(await englishPrint.text(), /Complete documentation PDF/);
  assert.match(englishMarkdown, /^# PlanetX Official Documentation/m);
  assert.match(koreanMarkdown, /^# PlanetX /m);
  assert.doesNotMatch(englishMarkdown, /^## (Frequently Asked Questions|Known Issues|Support and Release Notes)$/m);
});

test("renders the shared LabX footer across product, docs, print, and error routes", async () => {
  const responses = await Promise.all([
    render("/"),
    render("/docs/"),
    render("/docs/en/overview/"),
    render("/docs/en/print/"),
    render("/route-outside-the-chart/"),
  ]);
  for (const response of responses) {
    assert.equal(response.status === 200 || response.status === 404, true);
    const html = await response.text();
    assert.match(html, /PlanetX/);
    assert.match(html, /by LabX/);
    assert.match(html, /independently developed by LabX/);
  }
});

test("routes documentation navigation to a focusable main region", async () => {
  const response = await render("/docs/en/overview/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /id="main-content"[^>]*tabindex="-1"/i);
  assert.match(html, /\/docs\/en\/getting-started#main-content/);
  assert.doesNotMatch(html, /\/docs\/en\/(known-issues|faq|support-release-notes)#main-content/);

  const [focusSource, sidebarSource] = await Promise.all([
    readFile(new URL("../app/components/MainContentFocus.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/DocsSidebar.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(focusSource, /main\.focus\(\{ preventScroll: true \}\)/);
  assert.match(focusSource, /main\.scrollIntoView/);
  assert.match(sidebarSource, /sidebar\.scrollTo/);
  assert.match(sidebarSource, /activeLinkRef/);
});

test("keeps the starter preview removed", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton|drizzle/);
  await assert.rejects(access(new URL("../app/_sites-preview/page.tsx", import.meta.url)));
});

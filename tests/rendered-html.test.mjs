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
  assert.match(html, /Build the ground/);
  assert.match(html, /Reveal the planet/);
  assert.match(html, /PlanetX 1\.0/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("renders English and Korean documentation routes", async () => {
  const [english, korean] = await Promise.all([
    render("/docs/en/overview/"),
    render("/docs/ko/user-api/"),
  ]);
  assert.equal(english.status, 200);
  assert.equal(korean.status, 200);
  assert.match(await english.text(), /PlanetX Overview/);
  const koreanHtml = await korean.text();
  assert.match(koreanHtml, /PlanetX 사용자 제공 API/);
  assert.match(koreanHtml, /영문 번역 대기 중/);
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

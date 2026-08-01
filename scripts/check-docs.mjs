import { readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const GENERATED_DOCS = path.join(ROOT, "content", "generated-docs.json");
const INVENTORY_FILE = path.join(ROOT, "migration", "source-inventory.json");
const DOCUMENT_MAP_FILE = path.join(ROOT, "migration", "document-map.json");
const EXPECTED_COUNTS = { en: 13, ko: 15, total: 28, sharedSubjects: 13, languageOnlySubjects: 2 };
const REQUIRED_FIELDS = [
  "id",
  "lang",
  "slug",
  "title",
  "description",
  "category",
  "order",
  "sourceFile",
  "sourcePath",
  "content",
  "headings",
  "public",
  "verificationStatus",
  "screenshotRequirements",
  "translation",
  "lastReviewed",
];
const VALID_LANGS = new Set(["en", "ko"]);
const VALID_VERIFICATION = new Set(["verified", "needs-product-review"]);
const VALID_TRANSLATION = new Set(["current", "missing", "language-only"]);

function fail(errors, message) {
  errors.push(message);
}

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

function validateRequiredMetadata(doc, errors) {
  for (const field of REQUIRED_FIELDS) {
    if (!(field in doc)) {
      fail(errors, `${doc.id ?? "(missing id)"} is missing ${field}`);
    }
  }

  if (!VALID_LANGS.has(doc.lang)) fail(errors, `${doc.id} has invalid lang ${doc.lang}`);
  if (typeof doc.slug !== "string" || doc.slug.length === 0) fail(errors, `${doc.id} has invalid slug`);
  if (typeof doc.title !== "string" || doc.title.length === 0) fail(errors, `${doc.id} has invalid title`);
  if (typeof doc.description !== "string") fail(errors, `${doc.id} has invalid description`);
  if (typeof doc.category !== "string" || doc.category.length === 0) fail(errors, `${doc.id} has invalid category`);
  if (!Number.isInteger(doc.order)) fail(errors, `${doc.id} has invalid order`);
  if (typeof doc.sourceFile !== "string" || !doc.sourceFile.endsWith(".md")) fail(errors, `${doc.id} has invalid sourceFile`);
  if (typeof doc.sourcePath !== "string" || !doc.sourcePath.startsWith(`source-docs/${doc.lang}/`)) fail(errors, `${doc.id} has invalid sourcePath`);
  if (typeof doc.content !== "string" || doc.content.length === 0) fail(errors, `${doc.id} has empty content`);
  if (!Array.isArray(doc.headings) || doc.headings.length === 0) fail(errors, `${doc.id} has no headings`);
  if (typeof doc.public !== "boolean") fail(errors, `${doc.id} has invalid public flag`);
  if (!VALID_VERIFICATION.has(doc.verificationStatus)) fail(errors, `${doc.id} has invalid verificationStatus`);
  if (!Array.isArray(doc.screenshotRequirements)) fail(errors, `${doc.id} has invalid screenshotRequirements`);
  if (!doc.translation || !VALID_TRANSLATION.has(doc.translation.status)) fail(errors, `${doc.id} has invalid translation status`);
  if (!doc.translation || !("counterpartId" in doc.translation)) fail(errors, `${doc.id} is missing translation.counterpartId`);
  if (doc.lastReviewed !== "2026-08-01") fail(errors, `${doc.id} has invalid lastReviewed`);

  for (const heading of doc.headings ?? []) {
    if (!Number.isInteger(heading.level) || heading.level < 1 || heading.level > 6) {
      fail(errors, `${doc.id} has invalid heading level`);
    }
    if (typeof heading.title !== "string" || heading.title.length === 0) {
      fail(errors, `${doc.id} has invalid heading title`);
    }
    if (typeof heading.id !== "string" || heading.id.length === 0) {
      fail(errors, `${doc.id} has invalid heading id`);
    }
  }
}

function validateLinks(doc, docsByRoute, errors) {
  for (const match of doc.content.matchAll(/\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const target = match[1];
    if (/\.md(?:#|\)|$)/i.test(target)) {
      fail(errors, `${doc.id} still contains raw Markdown link ${target}`);
    }
    if (/\.\.\/|^source-docs\//.test(target)) {
      fail(errors, `${doc.id} still contains unresolved relative link ${target}`);
    }
    if (target.startsWith("/docs/") && !target.includes("#") && !docsByRoute.has(target)) {
      fail(errors, `${doc.id} links to missing route ${target}`);
    }
    if (target.startsWith("/docs/") && target.includes("#")) {
      const [route] = target.split("#");
      if (!docsByRoute.has(route)) {
        fail(errors, `${doc.id} links to missing route ${target}`);
      }
    }
    if (/\.(png|jpe?g|gif|webp|svg)$/i.test(target) && target !== "/images/proxy-bake-refresh-review.png") {
      fail(errors, `${doc.id} contains unexpected image route ${target}`);
    }
  }
}

function validatePairing(docs, errors) {
  const byId = new Map(docs.map((doc) => [doc.id, doc]));
  const bySlug = Map.groupBy ? Map.groupBy(docs, (doc) => doc.slug) : docs.reduce((map, doc) => {
    const list = map.get(doc.slug) ?? [];
    list.push(doc);
    map.set(doc.slug, list);
    return map;
  }, new Map());

  for (const [slug, group] of bySlug) {
    const langs = new Set(group.map((doc) => doc.lang));
    if (langs.has("en") && langs.has("ko")) {
      for (const doc of group) {
        if (doc.translation.status !== "current") {
          fail(errors, `${doc.id} should have current translation status`);
        }
        if (!doc.translation.counterpartId || !byId.has(doc.translation.counterpartId)) {
          fail(errors, `${doc.id} has missing counterpart ${doc.translation.counterpartId}`);
        }
      }
    } else if (langs.has("ko") && !langs.has("en")) {
      const doc = group[0];
      if (doc.translation.status !== "language-only") {
        fail(errors, `${doc.id} should be language-only`);
      }
      if (doc.translation.counterpartId !== null) {
        fail(errors, `${doc.id} language-only counterpart must be null`);
      }
    } else {
      fail(errors, `${slug} has unsupported language pairing`);
    }
  }
}

function validateCounts(docs, inventory, documentMap, errors) {
  const en = docs.filter((doc) => doc.lang === "en").length;
  const ko = docs.filter((doc) => doc.lang === "ko").length;
  const sharedSubjects = new Set(docs.filter((doc) => doc.translation.status === "current").map((doc) => doc.slug)).size;
  const languageOnlySubjects = docs.filter((doc) => doc.translation.status === "language-only").length;

  const actual = { en, ko, total: docs.length, sharedSubjects, languageOnlySubjects };
  for (const [key, expected] of Object.entries(EXPECTED_COUNTS)) {
    if (actual[key] !== expected) {
      fail(errors, `Expected ${key}=${expected}, got ${actual[key]}`);
    }
    if (inventory.counts?.[key] !== expected) {
      fail(errors, `Inventory ${key} expected ${expected}, got ${inventory.counts?.[key]}`);
    }
  }

  if (!Array.isArray(documentMap) || documentMap.length !== EXPECTED_COUNTS.sharedSubjects + EXPECTED_COUNTS.languageOnlySubjects) {
    fail(errors, `Document map should contain 15 entries, got ${Array.isArray(documentMap) ? documentMap.length : "non-array"}`);
  }
}

async function main() {
  const docs = await readJson(GENERATED_DOCS);
  const inventory = await readJson(INVENTORY_FILE);
  const documentMap = await readJson(DOCUMENT_MAP_FILE);
  const errors = [];

  if (!Array.isArray(docs)) {
    throw new Error("content/generated-docs.json root must be an array.");
  }

  const docsByRoute = new Set(docs.map((doc) => `/docs/${doc.lang}/${doc.slug}`));
  const ids = new Set();
  for (const doc of docs) {
    if (ids.has(doc.id)) fail(errors, `Duplicate id ${doc.id}`);
    ids.add(doc.id);
    validateRequiredMetadata(doc, errors);
    validateLinks(doc, docsByRoute, errors);
  }

  validatePairing(docs, errors);
  validateCounts(docs, inventory, documentMap, errors);

  if (errors.length > 0) {
    console.error(`Documentation check failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(`Documentation check passed: ${docs.length} documents, ${EXPECTED_COUNTS.sharedSubjects} shared subjects, ${EXPECTED_COUNTS.languageOnlySubjects} language-only subjects.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

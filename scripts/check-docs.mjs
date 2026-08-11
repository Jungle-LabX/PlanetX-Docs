import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE_ROOT = path.join(ROOT, "source-docs");
const MANIFEST_FILE = path.join(SOURCE_ROOT, "docs-manifest.json");
const GENERATED_DOCS = path.join(ROOT, "content", "generated-docs.json");
const INVENTORY_FILE = path.join(ROOT, "migration", "source-inventory.json");
const DOCUMENT_MAP_FILE = path.join(ROOT, "migration", "document-map.json");
const UNRESOLVED_FILE = path.join(ROOT, "migration", "unresolved-documents.md");
const TERMINOLOGY_FILE = path.join(ROOT, "migration", "terminology.en-ko.json");
const PUBLIC_DIR = path.join(ROOT, "public");
const PUBLIC_IMAGE_DIR = path.join(PUBLIC_DIR, "images", "docs");
const DOWNLOAD_DIR = path.join(PUBLIC_DIR, "downloads");
const LANGUAGES = ["en", "ko"];
const VALID_LANGS = new Set(LANGUAGES);
const VALID_VERIFICATION = new Set(["verified", "needs-product-review"]);
const VALID_SCOPES = new Set(["offline", "web-supplemental"]);
const REQUIRED_FIELDS = [
  "id",
  "lang",
  "slug",
  "title",
  "navigationTitle",
  "description",
  "category",
  "categoryTitle",
  "categoryOrder",
  "orderInCategory",
  "order",
  "scope",
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

function fail(errors, message) {
  errors.push(message);
}

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

function resolveAlias(slug, aliases, errors = null) {
  let current = slug;
  const seen = new Set();
  while (aliases[current]) {
    if (seen.has(current)) {
      if (errors) fail(errors, `Alias cycle detected at ${slug}`);
      return current;
    }
    seen.add(current);
    current = aliases[current];
  }
  return current;
}

function expectedSubjects(manifest) {
  const subjects = [];
  let order = 0;
  for (const [categoryOrder, category] of manifest.categories.entries()) {
    for (const [orderInCategory, document] of category.documents.entries()) {
      subjects.push({
        slug: document.slug,
        titles: document.titles,
        category: category.id,
        categoryTitles: category.titles,
        categoryOrder,
        orderInCategory,
        order,
        scope: "offline",
        sources: Object.fromEntries(LANGUAGES.map((lang) => [lang, `${lang}/${category.id}/${document.slug}.md`])),
      });
      order += 1;
    }
  }
  for (const [orderInCategory, document] of manifest.supplemental.entries()) {
    subjects.push({
      slug: document.slug,
      titles: document.titles,
      category: document.category,
      categoryTitles: { en: "Support", ko: "지원" },
      categoryOrder: manifest.categories.length,
      orderInCategory,
      order,
      scope: document.scope,
      sources: document.sources,
    });
    order += 1;
  }
  return subjects;
}

function validateManifest(manifest, errors) {
  if (manifest?.version !== 1) fail(errors, "Manifest version must be 1.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(manifest?.lastReviewed ?? "")) {
    fail(errors, "Manifest lastReviewed must be YYYY-MM-DD.");
  }
  if (!Array.isArray(manifest?.categories) || manifest.categories.length === 0) {
    fail(errors, "Manifest must contain categories.");
    return;
  }
  if (!Array.isArray(manifest.supplemental)) fail(errors, "Manifest supplemental must be an array.");

  const categoryIds = new Set();
  const slugs = new Set();
  for (const category of manifest.categories) {
    if (!category.id || categoryIds.has(category.id)) fail(errors, `Duplicate or empty category id: ${category.id ?? "<empty>"}`);
    categoryIds.add(category.id);
    if (!Array.isArray(category.documents) || category.documents.length === 0) fail(errors, `Category ${category.id} has no documents.`);
    for (const lang of LANGUAGES) {
      if (!category.titles?.[lang]) fail(errors, `Category ${category.id} is missing a ${lang} title.`);
    }
    for (const document of category.documents ?? []) {
      if (!document.slug || slugs.has(document.slug)) fail(errors, `Duplicate or empty document slug: ${document.slug ?? "<empty>"}`);
      slugs.add(document.slug);
      for (const lang of LANGUAGES) {
        if (!document.titles?.[lang]) fail(errors, `${document.slug} is missing a ${lang} title.`);
      }
    }
  }
  for (const document of manifest.supplemental ?? []) {
    if (!document.slug || slugs.has(document.slug)) fail(errors, `Duplicate or empty supplemental slug: ${document.slug ?? "<empty>"}`);
    slugs.add(document.slug);
    if (document.scope !== "web-supplemental") fail(errors, `${document.slug} has invalid supplemental scope.`);
    for (const lang of LANGUAGES) {
      if (!document.titles?.[lang] || !document.sources?.[lang]) fail(errors, `${document.slug} is missing ${lang} metadata.`);
    }
  }

  if (!slugs.has(manifest.defaultSlug)) fail(errors, `Default slug does not exist: ${manifest.defaultSlug}`);
  for (const [alias, target] of Object.entries(manifest.aliases ?? {})) {
    if (!alias || slugs.has(alias)) fail(errors, `Alias collides with a document slug: ${alias}`);
    const resolved = resolveAlias(target, manifest.aliases, errors);
    if (!slugs.has(resolved)) fail(errors, `Alias ${alias} points to unknown target ${target}.`);
  }
  for (const slug of Object.keys(manifest.standaloneRoutes ?? {})) {
    if (!slugs.has(slug)) fail(errors, `Standalone route references unknown slug ${slug}.`);
  }
}

function validateRequiredMetadata(doc, manifest, errors) {
  for (const field of REQUIRED_FIELDS) {
    if (!(field in doc)) fail(errors, `${doc.id ?? "(missing id)"} is missing ${field}`);
  }
  if (!VALID_LANGS.has(doc.lang)) fail(errors, `${doc.id} has invalid lang ${doc.lang}`);
  if (typeof doc.slug !== "string" || doc.slug.length === 0) fail(errors, `${doc.id} has invalid slug`);
  if (doc.id !== `${doc.lang}-${doc.slug}`) fail(errors, `${doc.id} does not match its language and slug`);
  if (typeof doc.title !== "string" || doc.title.length === 0) fail(errors, `${doc.id} has invalid title`);
  if (typeof doc.navigationTitle !== "string" || doc.navigationTitle.length === 0) fail(errors, `${doc.id} has invalid navigationTitle`);
  if (typeof doc.description !== "string" || doc.description.length === 0) fail(errors, `${doc.id} has invalid description`);
  if (typeof doc.category !== "string" || doc.category.length === 0) fail(errors, `${doc.id} has invalid category`);
  if (typeof doc.categoryTitle !== "string" || doc.categoryTitle.length === 0) fail(errors, `${doc.id} has invalid categoryTitle`);
  if (!Number.isInteger(doc.categoryOrder) || doc.categoryOrder < 0) fail(errors, `${doc.id} has invalid categoryOrder`);
  if (!Number.isInteger(doc.orderInCategory) || doc.orderInCategory < 0) fail(errors, `${doc.id} has invalid orderInCategory`);
  if (!Number.isInteger(doc.order) || doc.order < 0) fail(errors, `${doc.id} has invalid order`);
  if (!VALID_SCOPES.has(doc.scope)) fail(errors, `${doc.id} has invalid scope ${doc.scope}`);
  if (typeof doc.sourceFile !== "string" || !doc.sourceFile.endsWith(".md")) fail(errors, `${doc.id} has invalid sourceFile`);
  if (typeof doc.sourcePath !== "string" || !doc.sourcePath.startsWith(`source-docs/${doc.lang}/`)) fail(errors, `${doc.id} has invalid sourcePath`);
  if (typeof doc.content !== "string" || doc.content.length === 0) fail(errors, `${doc.id} has empty content`);
  if (!Array.isArray(doc.headings) || doc.headings.length === 0) fail(errors, `${doc.id} has no headings`);
  if (doc.public !== true) fail(errors, `${doc.id} must be public`);
  if (!VALID_VERIFICATION.has(doc.verificationStatus)) fail(errors, `${doc.id} has invalid verificationStatus`);
  if (doc.scope === "web-supplemental" && doc.verificationStatus !== "needs-product-review") {
    fail(errors, `${doc.id} supplemental content must require product review`);
  }
  if (!Array.isArray(doc.screenshotRequirements)) fail(errors, `${doc.id} has invalid screenshotRequirements`);
  if (doc.translation?.status !== "current") fail(errors, `${doc.id} must have current translation status`);
  if (doc.translation?.counterpartId !== `${doc.lang === "en" ? "ko" : "en"}-${doc.slug}`) {
    fail(errors, `${doc.id} has invalid counterpart ${doc.translation?.counterpartId}`);
  }
  if (doc.lastReviewed !== manifest.lastReviewed) fail(errors, `${doc.id} has invalid lastReviewed`);

  const headingIds = new Set();
  for (const heading of doc.headings ?? []) {
    if (!Number.isInteger(heading.level) || heading.level < 1 || heading.level > 6) fail(errors, `${doc.id} has invalid heading level`);
    if (typeof heading.title !== "string" || heading.title.length === 0) fail(errors, `${doc.id} has invalid heading title`);
    if (typeof heading.id !== "string" || heading.id.length === 0) fail(errors, `${doc.id} has invalid heading id`);
    if (headingIds.has(heading.id)) fail(errors, `${doc.id} has duplicate heading id ${heading.id}`);
    headingIds.add(heading.id);
  }

  if (/\?lang=(?:en|ko)&doc=/.test(doc.content)) fail(errors, `${doc.id} still contains an offline query link`);
  if (/C:\\Users\\|\/Users\/|\\Perforce\\|\/Perforce\//i.test(doc.content)) fail(errors, `${doc.id} exposes a private workstation path`);
}

function validateLinks(doc, docsByRoute, standaloneRoutes, errors) {
  for (const match of doc.content.matchAll(/(!?)\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const [, bang, target] = match;
    if (/\.md(?:#|$)/i.test(target)) fail(errors, `${doc.id} still contains raw Markdown link ${target}`);
    if (/^\.\.?(?:\/|\\)|^source-docs\//i.test(target)) fail(errors, `${doc.id} still contains unresolved relative link ${target}`);
    if (target.startsWith("/docs/")) {
      const [route] = target.split("#");
      if (!docsByRoute.has(route)) fail(errors, `${doc.id} links to missing route ${target}`);
    } else if (target.startsWith("/") && !bang) {
      const [route] = target.split("#");
      if (!Object.values(standaloneRoutes).includes(route)) {
        fail(errors, `${doc.id} links to an unrecognized local route ${target}`);
      }
    }
    if (bang && target.startsWith("/images/") && !/^\/images\/docs\/[a-z0-9][a-z0-9.-]*\.(png|jpe?g|gif|webp|svg)$/i.test(target)) {
      fail(errors, `${doc.id} contains unexpected image route ${target}`);
    }
  }
}

function validateManifestAlignment(docs, manifest, subjects, errors) {
  const byId = new Map(docs.map((doc) => [doc.id, doc]));
  for (const subject of subjects) {
    for (const lang of LANGUAGES) {
      const id = `${lang}-${subject.slug}`;
      const doc = byId.get(id);
      if (!doc) {
        fail(errors, `Generated document is missing: ${id}`);
        continue;
      }
      const expectedSourcePath = `source-docs/${subject.sources[lang]}`;
      if (doc.sourcePath !== expectedSourcePath) fail(errors, `${id} sourcePath expected ${expectedSourcePath}, got ${doc.sourcePath}`);
      if (doc.navigationTitle !== subject.titles[lang]) fail(errors, `${id} navigationTitle differs from manifest`);
      if (doc.category !== subject.category) fail(errors, `${id} category differs from manifest`);
      if (doc.categoryTitle !== subject.categoryTitles[lang]) fail(errors, `${id} categoryTitle differs from manifest`);
      for (const field of ["categoryOrder", "orderInCategory", "order", "scope"]) {
        if (doc[field] !== subject[field]) fail(errors, `${id} ${field} expected ${subject[field]}, got ${doc[field]}`);
      }
    }
  }

  const expectedTotal = subjects.length * LANGUAGES.length;
  if (docs.length !== expectedTotal) fail(errors, `Expected ${expectedTotal} generated records, got ${docs.length}`);
  if (byId.size !== docs.length) fail(errors, "Generated documents contain duplicate ids.");
  if (!subjects.some((subject) => subject.slug === manifest.defaultSlug && subject.scope === "offline")) {
    fail(errors, `Default document must be an offline document: ${manifest.defaultSlug}`);
  }
}

function validatePairing(docs, errors) {
  const bySlug = new Map();
  for (const doc of docs) {
    const group = bySlug.get(doc.slug) ?? [];
    group.push(doc);
    bySlug.set(doc.slug, group);
  }
  for (const [slug, group] of bySlug) {
    const langs = new Set(group.map((doc) => doc.lang));
    if (group.length !== LANGUAGES.length || LANGUAGES.some((lang) => !langs.has(lang))) {
      fail(errors, `${slug} does not have one document for every supported language`);
      continue;
    }
    const [first, second] = group;
    for (const field of ["slug", "category", "categoryOrder", "orderInCategory", "order", "scope"]) {
      if (first[field] !== second[field]) fail(errors, `${slug} has EN/KO ${field} mismatch`);
    }
    const firstLevels = first.headings.map((heading) => heading.level).join(",");
    const secondLevels = second.headings.map((heading) => heading.level).join(",");
    if (firstLevels !== secondLevels) fail(errors, `${slug} has EN/KO heading-structure mismatch`);
    const firstImages = [...first.content.matchAll(/!\[[^\]]*]\(([^)]+)\)/g)].length;
    const secondImages = [...second.content.matchAll(/!\[[^\]]*]\(([^)]+)\)/g)].length;
    if (firstImages !== secondImages) fail(errors, `${slug} has EN/KO image-count mismatch (${firstImages} vs ${secondImages})`);
  }
}

function validateInventory(inventory, documents, subjects, manifest, errors) {
  const coreSubjects = subjects.filter((subject) => subject.scope === "offline").length;
  const supplementalSubjects = subjects.length - coreSubjects;
  const expected = {
    en: subjects.length,
    ko: subjects.length,
    total: documents.length,
    sharedSubjects: subjects.length,
    languageOnlySubjects: 0,
    corePerLanguage: coreSubjects,
    supplementalPerLanguage: supplementalSubjects,
  };
  if (inventory.auditDate !== manifest.lastReviewed) fail(errors, "Inventory auditDate differs from manifest.");
  for (const [key, value] of Object.entries(expected)) {
    if (inventory.counts?.[key] !== value) fail(errors, `Inventory ${key} expected ${value}, got ${inventory.counts?.[key]}`);
  }
  for (const lang of LANGUAGES) {
    if (!Array.isArray(inventory.languages?.[lang]) || inventory.languages[lang].length !== subjects.length) {
      fail(errors, `Inventory ${lang} list should contain ${subjects.length} records.`);
    }
  }
}

function validateDocumentMap(documentMap, subjects, manifest, errors) {
  if (!Array.isArray(documentMap) || documentMap.length !== subjects.length) {
    fail(errors, `Document map should contain ${subjects.length} entries, got ${Array.isArray(documentMap) ? documentMap.length : "non-array"}`);
    return;
  }
  const bySlug = new Map(documentMap.map((entry) => [entry.slug, entry]));
  for (const subject of subjects) {
    const entry = bySlug.get(subject.slug);
    if (!entry) {
      fail(errors, `Document map is missing ${subject.slug}`);
      continue;
    }
    if (entry.order !== subject.order || entry.category !== subject.category || entry.scope !== subject.scope) {
      fail(errors, `Document map metadata differs for ${subject.slug}`);
    }
    for (const lang of LANGUAGES) {
      const expectedDocumentRoute = `/docs/${lang}/${subject.slug}`;
      if (entry.documentRoutes?.[lang] !== expectedDocumentRoute) fail(errors, `Document map route differs for ${lang}/${subject.slug}`);
      const expectedPreferredRoute = manifest.standaloneRoutes?.[subject.slug] ?? expectedDocumentRoute;
      if (entry.routes?.[lang] !== expectedPreferredRoute) fail(errors, `Document map preferred route differs for ${lang}/${subject.slug}`);
    }
  }
  for (const [alias, target] of Object.entries(manifest.aliases)) {
    const resolved = resolveAlias(target, manifest.aliases);
    if (!bySlug.get(resolved)?.aliases?.includes(alias)) fail(errors, `Document map is missing alias ${alias} -> ${resolved}`);
  }
}

async function validatePublishedImages(docs, errors) {
  const referenced = new Set();
  for (const doc of docs) {
    for (const match of doc.content.matchAll(/!\[[^\]]*]\((\/images\/docs\/[^)\s]+)\)/g)) referenced.add(match[1]);
  }
  const published = new Set((await readdir(PUBLIC_IMAGE_DIR, { withFileTypes: true }))
    .filter((entry) => entry.isFile())
    .map((entry) => `/images/docs/${entry.name}`));
  for (const route of referenced) {
    try {
      await access(path.join(PUBLIC_DIR, ...route.slice(1).split("/")));
    } catch {
      fail(errors, `Published document image is missing: ${route}`);
    }
  }
  for (const route of published) {
    if (!referenced.has(route)) fail(errors, `Stale unreferenced generated image: ${route}`);
  }
}

async function validateDownloads(subjects, manifest, errors) {
  const coreSlugs = new Set(subjects.filter((subject) => subject.scope === "offline").map((subject) => subject.slug));
  const aliases = Object.entries(manifest.aliases);
  const expectedDownloadSlugs = new Set([...coreSlugs, ...aliases.map(([alias]) => alias)]);
  for (const lang of LANGUAGES) {
    const languageDirectory = path.join(DOWNLOAD_DIR, lang);
    const files = (await readdir(languageDirectory, { withFileTypes: true }))
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map((entry) => entry.name.replace(/\.md$/i, ""));
    if (files.length !== expectedDownloadSlugs.size) {
      fail(errors, `${lang} download directory should contain ${expectedDownloadSlugs.size} canonical and alias files, got ${files.length}`);
    }
    for (const slug of files) {
      if (!expectedDownloadSlugs.has(slug)) fail(errors, `${lang} download directory contains stale or supplemental file ${slug}.md`);
    }
    for (const [alias, target] of aliases) {
      const resolvedTarget = resolveAlias(target, manifest.aliases);
      if (!coreSlugs.has(resolvedTarget)) {
        fail(errors, `Download alias ${alias} points to non-offline target ${resolvedTarget}`);
        continue;
      }
      try {
        const [aliasContent, canonicalContent] = await Promise.all([
          readFile(path.join(languageDirectory, `${alias}.md`), "utf8"),
          readFile(path.join(languageDirectory, `${resolvedTarget}.md`), "utf8"),
        ]);
        if (aliasContent !== canonicalContent) {
          fail(errors, `${lang} download alias ${alias}.md differs from canonical ${resolvedTarget}.md`);
        }
      } catch {
        fail(errors, `${lang} download alias ${alias}.md or canonical target ${resolvedTarget}.md is missing`);
      }
    }
    try {
      await access(path.join(DOWNLOAD_DIR, `planetx-docs-${lang}.md`));
    } catch {
      fail(errors, `Combined ${lang} documentation download is missing.`);
    }
  }
}

async function main() {
  const [manifest, docs, inventory, documentMap, unresolvedReport, terminology] = await Promise.all([
    readJson(MANIFEST_FILE),
    readJson(GENERATED_DOCS),
    readJson(INVENTORY_FILE),
    readJson(DOCUMENT_MAP_FILE),
    readFile(UNRESOLVED_FILE, "utf8"),
    readJson(TERMINOLOGY_FILE),
  ]);
  const errors = [];
  validateManifest(manifest, errors);
  if (!Array.isArray(docs)) throw new Error("content/generated-docs.json root must be an array.");
  const subjects = expectedSubjects(manifest);
  const docsByRoute = new Set(docs.map((doc) => `/docs/${doc.lang}/${doc.slug}`));

  for (const doc of docs) {
    validateRequiredMetadata(doc, manifest, errors);
    validateLinks(doc, docsByRoute, manifest.standaloneRoutes, errors);
  }
  validateManifestAlignment(docs, manifest, subjects, errors);
  validatePairing(docs, errors);
  validateInventory(inventory, docs, subjects, manifest, errors);
  validateDocumentMap(documentMap, subjects, manifest, errors);
  await validatePublishedImages(docs, errors);
  await validateDownloads(subjects, manifest, errors);

  if (!/## Unresolved local links or images\s+\n\s*- None/.test(unresolvedReport)) {
    fail(errors, "Unresolved document report contains unresolved local links or images.");
  }
  if (terminology.lastReviewed !== manifest.lastReviewed) fail(errors, "Terminology review date differs from manifest.");

  if (errors.length > 0) {
    console.error(`Documentation check failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  const coreSubjects = subjects.filter((subject) => subject.scope === "offline").length;
  const supplementalSubjects = subjects.length - coreSubjects;
  console.log(`Documentation check passed: ${coreSubjects} core + ${supplementalSubjects} supplemental subjects, ${docs.length} EN/KO records.`);
  console.log(`Validated ${manifest.categories.length} categories, ${Object.keys(manifest.aliases).length} aliases, and published links/images/downloads.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

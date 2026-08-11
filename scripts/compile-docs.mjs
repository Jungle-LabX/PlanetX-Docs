import { access, copyFile, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE_ROOT = path.join(ROOT, "source-docs");
const MANIFEST_FILE = path.join(SOURCE_ROOT, "docs-manifest.json");
const CONTENT_DIR = path.join(ROOT, "content");
const DOWNLOAD_DIR = path.join(ROOT, "public", "downloads");
const PUBLIC_IMAGE_DIR = path.join(ROOT, "public", "images", "docs");
const MIGRATION_DIR = path.join(ROOT, "migration");
const GENERATED_DOCS = path.join(CONTENT_DIR, "generated-docs.json");
const INVENTORY_FILE = path.join(MIGRATION_DIR, "source-inventory.json");
const DOCUMENT_MAP_FILE = path.join(MIGRATION_DIR, "document-map.json");
const UNRESOLVED_FILE = path.join(MIGRATION_DIR, "unresolved-documents.md");
const TERMINOLOGY_FILE = path.join(MIGRATION_DIR, "terminology.en-ko.json");
const LANGUAGES = ["en", "ko"];
const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif|webp|svg)$/i;

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function sourceRelativePath(absolutePath) {
  return toPosix(path.relative(SOURCE_ROOT, absolutePath));
}

function isInside(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

function resolveAlias(slug, aliases) {
  let current = slug;
  const seen = new Set();
  while (aliases[current]) {
    invariant(!seen.has(current), `Alias cycle detected at ${slug}`);
    seen.add(current);
    current = aliases[current];
  }
  return current;
}

function validateManifest(manifest) {
  invariant(manifest?.version === 1, "source-docs/docs-manifest.json must use version 1.");
  invariant(/^\d{4}-\d{2}-\d{2}$/.test(manifest.lastReviewed), "Manifest lastReviewed must be YYYY-MM-DD.");
  invariant(Array.isArray(manifest.categories) && manifest.categories.length > 0, "Manifest has no categories.");
  invariant(Array.isArray(manifest.supplemental), "Manifest supplemental must be an array.");

  const categoryIds = new Set();
  const slugs = new Set();
  for (const [categoryOrder, category] of manifest.categories.entries()) {
    invariant(category.id && !categoryIds.has(category.id), `Duplicate or empty category id: ${category.id ?? "<empty>"}`);
    categoryIds.add(category.id);
    invariant(Array.isArray(category.documents) && category.documents.length > 0, `Category ${category.id} has no documents.`);
    for (const lang of LANGUAGES) {
      invariant(category.titles?.[lang], `Category ${category.id} is missing a ${lang} title.`);
    }
    for (const [order, document] of category.documents.entries()) {
      invariant(document.slug && !slugs.has(document.slug), `Duplicate or empty document slug: ${document.slug ?? "<empty>"}`);
      slugs.add(document.slug);
      for (const lang of LANGUAGES) {
        invariant(document.titles?.[lang], `${document.slug} is missing a ${lang} navigation title.`);
      }
      invariant(Number.isInteger(categoryOrder) && Number.isInteger(order), `Invalid order metadata for ${document.slug}.`);
    }
  }

  for (const document of manifest.supplemental) {
    invariant(document.slug && !slugs.has(document.slug), `Duplicate or empty supplemental slug: ${document.slug ?? "<empty>"}`);
    slugs.add(document.slug);
    invariant(document.scope === "web-supplemental", `${document.slug} must use web-supplemental scope.`);
    for (const lang of LANGUAGES) {
      invariant(document.titles?.[lang], `${document.slug} is missing a ${lang} navigation title.`);
      invariant(document.sources?.[lang], `${document.slug} is missing a ${lang} source.`);
    }
  }

  invariant(slugs.has(manifest.defaultSlug), `Default slug does not exist: ${manifest.defaultSlug}`);
  for (const [alias, target] of Object.entries(manifest.aliases ?? {})) {
    invariant(alias && !slugs.has(alias), `Alias collides with a document slug: ${alias}`);
    invariant(slugs.has(resolveAlias(target, manifest.aliases)), `Alias ${alias} points to unknown target ${target}.`);
  }
  for (const slug of Object.keys(manifest.standaloneRoutes ?? {})) {
    invariant(slugs.has(slug), `Standalone route references unknown slug ${slug}.`);
  }
}

function buildDefinitions(manifest) {
  const definitions = [];
  let subjectOrder = 0;

  for (const [categoryOrder, category] of manifest.categories.entries()) {
    for (const [orderInCategory, document] of category.documents.entries()) {
      for (const lang of LANGUAGES) {
        definitions.push({
          lang,
          slug: document.slug,
          navigationTitle: document.titles[lang],
          category: category.id,
          categoryTitle: category.titles[lang],
          categoryOrder,
          orderInCategory,
          order: subjectOrder,
          scope: "offline",
          sourceRelative: `${lang}/${category.id}/${document.slug}.md`,
          verificationStatus: "verified",
        });
      }
      subjectOrder += 1;
    }
  }

  for (const [supplementalOrder, document] of manifest.supplemental.entries()) {
    for (const lang of LANGUAGES) {
      definitions.push({
        lang,
        slug: document.slug,
        navigationTitle: document.titles[lang],
        category: document.category,
        categoryTitle: lang === "ko" ? "지원" : "Support",
        categoryOrder: manifest.categories.length,
        orderInCategory: supplementalOrder,
        order: subjectOrder,
        scope: document.scope,
        sourceRelative: document.sources[lang],
        verificationStatus: "needs-product-review",
      });
    }
    subjectOrder += 1;
  }

  return definitions;
}

async function listFilesRecursive(directory, predicate) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFilesRecursive(absolutePath, predicate));
    } else if (entry.isFile() && predicate(absolutePath)) {
      files.push(absolutePath);
    }
  }
  return files;
}

async function loadSources(definitions) {
  const expectedSources = new Set(definitions.map((definition) => definition.sourceRelative.toLowerCase()));
  const actualSources = (await listFilesRecursive(
    SOURCE_ROOT,
    (file) => file.toLowerCase().endsWith(".md"),
  )).map(sourceRelativePath);

  for (const source of actualSources) {
    invariant(expectedSources.has(source.toLowerCase()), `Markdown source is not declared in the manifest: source-docs/${source}`);
  }
  invariant(actualSources.length === expectedSources.size, `Manifest declares ${expectedSources.size} Markdown sources, but ${actualSources.length} were found.`);

  const sources = new Map();
  for (const definition of definitions) {
    const absolutePath = path.resolve(SOURCE_ROOT, ...definition.sourceRelative.split("/"));
    invariant(isInside(SOURCE_ROOT, absolutePath), `Source path escapes source-docs: ${definition.sourceRelative}`);
    await access(absolutePath);
    const raw = (await readFile(absolutePath, "utf8")).replace(/\r\n?/g, "\n");
    sources.set(`${definition.lang}:${definition.slug}`, { absolutePath, raw });
  }
  return sources;
}

function publicImageName(file) {
  const extension = path.extname(file).toLowerCase();
  const stem = path.basename(file, path.extname(file))
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  invariant(stem && IMAGE_EXTENSIONS.test(extension), `Invalid documentation image filename: ${file}`);
  return `${stem}${extension}`;
}

function splitTarget(rawTarget) {
  const hashIndex = rawTarget.indexOf("#");
  if (hashIndex === -1) return { target: rawTarget, hash: "" };
  return { target: rawTarget.slice(0, hashIndex), hash: rawTarget.slice(hashIndex) };
}

function isExternalOrRootTarget(target) {
  return /^(https?:|mailto:|tel:|data:|#|\/)/i.test(target);
}

async function collectImageAssets(definitions, sources) {
  const bySource = new Map();
  const byOutput = new Map();

  for (const definition of definitions) {
    const source = sources.get(`${definition.lang}:${definition.slug}`);
    for (const match of source.raw.matchAll(/!\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
      const rawTarget = match[1].replace(/^<|>$/g, "");
      const { target } = splitTarget(rawTarget);
      if (isExternalOrRootTarget(target) || !IMAGE_EXTENSIONS.test(target)) continue;

      const absoluteImage = path.resolve(path.dirname(source.absolutePath), decodeURIComponent(target.replace(/\\/g, "/")));
      invariant(isInside(SOURCE_ROOT, absoluteImage), `Image path escapes source-docs in ${definition.sourceRelative}: ${target}`);
      await access(absoluteImage);
      const sourceKey = absoluteImage.toLowerCase();
      const outputName = publicImageName(absoluteImage);
      const outputKey = outputName.toLowerCase();
      const existingOutput = byOutput.get(outputKey);
      invariant(!existingOutput || existingOutput.sourceKey === sourceKey, `Published image name collision: ${outputName}`);

      const asset = {
        sourceKey,
        sourcePath: absoluteImage,
        outputName,
        route: `/images/docs/${outputName}`,
      };
      bySource.set(sourceKey, asset);
      byOutput.set(outputKey, asset);
    }
  }

  return { bySource, assets: [...byOutput.values()].sort((a, b) => a.outputName.localeCompare(b.outputName)) };
}

function canonicalDocsRoute(target, aliases) {
  const match = target.match(/^\/docs\/(en|ko)\/([^/#?]+)(#[^\s]*)?$/i);
  if (!match) return target;
  const [, lang, rawSlug, hash = ""] = match;
  return `/docs/${lang.toLowerCase()}/${resolveAlias(rawSlug, aliases)}${hash}`;
}

function transformLinks(markdown, definition, source, context, unresolvedLinks) {
  const withImages = markdown.replace(
    /!\[([^\]]*)]\(([^)\s]+)(?:\s+"[^"]*")?\)/g,
    (match, alt, rawTarget) => {
      const target = rawTarget.replace(/^<|>$/g, "");
      const { target: targetWithoutHash } = splitTarget(target);
      if (isExternalOrRootTarget(targetWithoutHash) || !IMAGE_EXTENSIONS.test(targetWithoutHash)) return match;
      const absoluteImage = path.resolve(path.dirname(source.absolutePath), decodeURIComponent(targetWithoutHash.replace(/\\/g, "/")));
      const asset = context.imageAssets.get(absoluteImage.toLowerCase());
      if (!asset) {
        unresolvedLinks.push({ sourcePath: definition.sourceRelative, target, label: alt, type: "image" });
        return match;
      }
      return `![${alt}](${asset.route})`;
    },
  );

  return withImages.replace(
    /(!?)\[([^\]]*)]\(([^)\s]+)(?:\s+"[^"]*")?\)/g,
    (match, bang, label, rawTarget) => {
      if (bang) return match;
      const cleanedTarget = rawTarget.replace(/^<|>$/g, "");
      const { target, hash } = splitTarget(cleanedTarget);

      if (/^\/docs\//i.test(target)) {
        return `[${label}](${canonicalDocsRoute(`${target}${hash}`, context.manifest.aliases)})`;
      }
      if (isExternalOrRootTarget(target)) return match;

      if (target.startsWith("?")) {
        const parameters = new URLSearchParams(target.slice(1));
        const requestedLang = parameters.get("lang") ?? definition.lang;
        const requestedSlug = parameters.get("doc");
        const resolvedSlug = requestedSlug ? resolveAlias(requestedSlug, context.manifest.aliases) : null;
        if (LANGUAGES.includes(requestedLang) && resolvedSlug && context.definitionsBySlug.has(resolvedSlug)) {
          return `[${label}](/docs/${requestedLang}/${resolvedSlug}${hash})`;
        }
        unresolvedLinks.push({ sourcePath: definition.sourceRelative, target: cleanedTarget, label, type: "query" });
        return match;
      }

      if (/\.md$/i.test(target)) {
        const absoluteTarget = path.resolve(path.dirname(source.absolutePath), decodeURIComponent(target.replace(/\\/g, "/")));
        const relativeTarget = sourceRelativePath(absoluteTarget).toLowerCase();
        const targetDefinition = context.definitionsBySource.get(relativeTarget);
        if (targetDefinition) {
          return `[${label}](/docs/${targetDefinition.lang}/${targetDefinition.slug}${hash})`;
        }
        unresolvedLinks.push({ sourcePath: definition.sourceRelative, target: cleanedTarget, label, type: "markdown" });
      }

      return match;
    },
  );
}

function stripSourceChrome(markdown) {
  return markdown.replace(/^#\s+.*\n+/, "");
}

function stripMarkdown(value) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_|~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTitle(markdown, fallback) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

function extractDescription(markdown) {
  const paragraph = markdown
    .replace(/^#\s+.+$/m, "")
    .split(/\n\s*\n/)
    .map((block) => stripMarkdown(block))
    .find((block) => block.length > 0 && !block.startsWith("|") && !/^\[![A-Z]+\]/.test(block));
  if (!paragraph) return "";
  return paragraph.length > 180 ? `${paragraph.slice(0, 177).trim()}...` : paragraph;
}

function slugifyHeading(value) {
  const normalized = stripMarkdown(value)
    .normalize("NFKC")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || "section";
}

function extractHeadings(markdown) {
  const seen = new Map();
  const headings = [];
  for (const match of markdown.matchAll(/^(#{1,6})\s+(.+)$/gm)) {
    const level = match[1].length;
    const title = match[2].trim();
    const baseId = slugifyHeading(title);
    const count = seen.get(baseId) ?? 0;
    seen.set(baseId, count + 1);
    headings.push({ level, title, id: count === 0 ? baseId : `${baseId}-${count + 1}` });
  }
  return headings;
}

function buildDocument(definition, sources, context, unresolvedLinks, lastReviewed) {
  const source = sources.get(`${definition.lang}:${definition.slug}`);
  const transformed = transformLinks(source.raw, definition, source, context, unresolvedLinks);
  const content = stripSourceChrome(transformed);
  const counterpartLang = definition.lang === "en" ? "ko" : "en";
  return {
    id: `${definition.lang}-${definition.slug}`,
    lang: definition.lang,
    slug: definition.slug,
    title: extractTitle(source.raw, definition.navigationTitle),
    navigationTitle: definition.navigationTitle,
    description: extractDescription(source.raw),
    category: definition.category,
    categoryTitle: definition.categoryTitle,
    categoryOrder: definition.categoryOrder,
    orderInCategory: definition.orderInCategory,
    order: definition.order,
    scope: definition.scope,
    sourceFile: path.posix.basename(definition.sourceRelative),
    sourcePath: `source-docs/${definition.sourceRelative}`,
    content,
    headings: extractHeadings(source.raw),
    public: true,
    verificationStatus: definition.verificationStatus,
    screenshotRequirements: [],
    translation: {
      status: "current",
      counterpartId: `${counterpartLang}-${definition.slug}`,
    },
    lastReviewed,
  };
}

function preferredRoute(doc, manifest) {
  return manifest.standaloneRoutes?.[doc.slug] ?? `/docs/${doc.lang}/${doc.slug}`;
}

function buildSourceInventory(documents, manifest) {
  const coreSubjects = manifest.categories.flatMap((category) => category.documents).length;
  const supplementalSubjects = manifest.supplemental.length;
  return {
    auditDate: manifest.lastReviewed,
    manifest: "source-docs/docs-manifest.json",
    counts: {
      en: documents.filter((doc) => doc.lang === "en").length,
      ko: documents.filter((doc) => doc.lang === "ko").length,
      total: documents.length,
      sharedSubjects: new Set(documents.map((doc) => doc.slug)).size,
      languageOnlySubjects: 0,
      corePerLanguage: coreSubjects,
      supplementalPerLanguage: supplementalSubjects,
    },
    languages: Object.fromEntries(LANGUAGES.map((lang) => [
      lang,
      documents.filter((doc) => doc.lang === lang).map((doc) => ({
        file: doc.sourceFile,
        path: doc.sourcePath,
        slug: doc.slug,
        id: doc.id,
        title: doc.title,
        navigationTitle: doc.navigationTitle,
        category: doc.category,
        categoryOrder: doc.categoryOrder,
        order: doc.order,
        scope: doc.scope,
        headings: doc.headings.length,
        public: doc.public,
        verificationStatus: doc.verificationStatus,
        translationStatus: doc.translation.status,
      })),
    ])),
  };
}

function buildDocumentMap(documents, manifest) {
  const aliasesByTarget = new Map();
  for (const alias of Object.keys(manifest.aliases)) {
    const target = resolveAlias(alias, manifest.aliases);
    const aliases = aliasesByTarget.get(target) ?? [];
    aliases.push(alias);
    aliasesByTarget.set(target, aliases);
  }

  return documents
    .filter((doc) => doc.lang === "en")
    .map((doc) => {
      const paired = documents.filter((item) => item.slug === doc.slug);
      return {
        slug: doc.slug,
        aliases: aliasesByTarget.get(doc.slug) ?? [],
        order: doc.order,
        category: doc.category,
        categoryOrder: doc.categoryOrder,
        scope: doc.scope,
        reviewFocus: doc.scope === "web-supplemental"
          ? "Product review is required before changing support claims."
          : "Keep aligned with the canonical PlanetX 1.0 documentation snapshot.",
        routes: Object.fromEntries(paired.map((item) => [item.lang, preferredRoute(item, manifest)])),
        documentRoutes: Object.fromEntries(paired.map((item) => [item.lang, `/docs/${item.lang}/${item.slug}`])),
        sources: Object.fromEntries(paired.map((item) => [item.lang, item.sourcePath])),
        ids: Object.fromEntries(paired.map((item) => [item.lang, item.id])),
        translationStatus: "current",
      };
    })
    .sort((a, b) => a.order - b.order);
}

function buildUnresolvedReport(unresolvedLinks, documents, manifest) {
  const productReviewDocuments = documents.filter((doc) => doc.verificationStatus === "needs-product-review");
  return `${[
    "# Unresolved Documents",
    "",
    `Last reviewed: ${manifest.lastReviewed}`,
    "",
    "## Language-only documents",
    "",
    "- None",
    "",
    "## Missing language counterparts",
    "",
    "- None",
    "",
    "## Unresolved local links or images",
    "",
    ...(unresolvedLinks.length === 0
      ? ["- None"]
      : unresolvedLinks.map((link) => `- \`${link.sourcePath}\`: ${link.type} \`${link.target}\` (${link.label})`)),
    "",
    "## Product review required",
    "",
    ...(productReviewDocuments.length === 0
      ? ["- None"]
      : productReviewDocuments.map((doc) => `- \`${doc.sourcePath}\` (${doc.title})`)),
    "",
  ].join("\n")}\n`;
}

function buildDownloadDocument(doc, headingLevel = 1) {
  const titlePrefix = "#".repeat(headingLevel);
  const content = headingLevel === 1
    ? doc.content.trim()
    : doc.content.trim().replace(/^(#{2,5})(\s+)/gm, "$1#$2");
  return `${titlePrefix} ${doc.title}\n\n${content}\n`;
}

async function resetGeneratedDirectory(directory) {
  invariant(isInside(ROOT, directory), `Refusing to reset a directory outside the repository: ${directory}`);
  invariant(directory === DOWNLOAD_DIR || directory === PUBLIC_IMAGE_DIR, `Refusing to reset non-generated directory: ${directory}`);
  await rm(directory, { recursive: true, force: true });
  await mkdir(directory, { recursive: true });
}

async function publishImageAssets(assets) {
  await resetGeneratedDirectory(PUBLIC_IMAGE_DIR);
  for (const asset of assets) {
    await copyFile(asset.sourcePath, path.join(PUBLIC_IMAGE_DIR, asset.outputName));
  }
}

async function writeMarkdownDownloads(documents, manifest) {
  await resetGeneratedDirectory(DOWNLOAD_DIR);
  for (const lang of LANGUAGES) {
    const languageDocuments = documents.filter((doc) => doc.lang === lang && doc.public && doc.scope === "offline");
    const languageDocumentsBySlug = new Map(languageDocuments.map((doc) => [doc.slug, doc]));
    const languageDirectory = path.join(DOWNLOAD_DIR, lang);
    await mkdir(languageDirectory, { recursive: true });
    for (const doc of languageDocuments) {
      await writeFile(path.join(languageDirectory, `${doc.slug}.md`), buildDownloadDocument(doc), "utf8");
    }
    for (const [alias, target] of Object.entries(manifest.aliases)) {
      const resolvedTarget = resolveAlias(target, manifest.aliases);
      const targetDocument = languageDocumentsBySlug.get(resolvedTarget);
      invariant(targetDocument, `Download alias ${alias} points to a non-offline document: ${resolvedTarget}`);
      await writeFile(
        path.join(languageDirectory, `${alias}.md`),
        buildDownloadDocument(targetDocument),
        "utf8",
      );
    }

    const editionName = lang === "ko" ? "PlanetX 공식 문서" : "PlanetX Official Documentation";
    const combined = [
      `# ${editionName}`,
      "",
      `Version ${manifest.productVersion} · Last reviewed ${manifest.lastReviewed}`,
      "",
      ...languageDocuments.flatMap((doc) => [buildDownloadDocument(doc, 2).trim(), ""]),
    ].join("\n");
    await writeFile(path.join(DOWNLOAD_DIR, `planetx-docs-${lang}.md`), `${combined.trim()}\n`, "utf8");
  }
}

async function updateTerminology(lastReviewed) {
  const terminology = await readJson(TERMINOLOGY_FILE);
  terminology.lastReviewed = lastReviewed;
  await writeFile(TERMINOLOGY_FILE, `${JSON.stringify(terminology, null, 2)}\n`, "utf8");
}

async function main() {
  const manifest = await readJson(MANIFEST_FILE);
  validateManifest(manifest);
  const definitions = buildDefinitions(manifest);
  const sources = await loadSources(definitions);
  const imageRegistry = await collectImageAssets(definitions, sources);
  const definitionsBySource = new Map(definitions.map((definition) => [definition.sourceRelative.toLowerCase(), definition]));
  const definitionsBySlug = new Map(definitions.map((definition) => [definition.slug, definition]));
  const unresolvedLinks = [];
  const context = {
    manifest,
    definitionsBySource,
    definitionsBySlug,
    imageAssets: imageRegistry.bySource,
  };
  const documents = definitions.map((definition) => (
    buildDocument(definition, sources, context, unresolvedLinks, manifest.lastReviewed)
  ));
  documents.sort((a, b) => a.order - b.order || a.lang.localeCompare(b.lang));

  invariant(unresolvedLinks.length === 0, `Cannot generate documentation with ${unresolvedLinks.length} unresolved local link(s) or image(s).`);
  await mkdir(CONTENT_DIR, { recursive: true });
  await mkdir(MIGRATION_DIR, { recursive: true });
  await publishImageAssets(imageRegistry.assets);
  await writeMarkdownDownloads(documents, manifest);
  await writeFile(GENERATED_DOCS, `${JSON.stringify(documents, null, 2)}\n`, "utf8");
  await writeFile(INVENTORY_FILE, `${JSON.stringify(buildSourceInventory(documents, manifest), null, 2)}\n`, "utf8");
  await writeFile(DOCUMENT_MAP_FILE, `${JSON.stringify(buildDocumentMap(documents, manifest), null, 2)}\n`, "utf8");
  await writeFile(UNRESOLVED_FILE, buildUnresolvedReport(unresolvedLinks, documents, manifest), "utf8");
  await updateTerminology(manifest.lastReviewed);

  const coreCount = documents.filter((doc) => doc.scope === "offline").length;
  console.log(`Compiled ${documents.length} documents (${coreCount} offline, ${documents.length - coreCount} web supplemental).`);
  console.log(`Published ${imageRegistry.assets.length} deduplicated documentation images.`);
  console.log(`Generated ${path.relative(ROOT, GENERATED_DOCS)} from ${path.relative(ROOT, MANIFEST_FILE)}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

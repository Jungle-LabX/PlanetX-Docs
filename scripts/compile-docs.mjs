import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE_ROOT = path.join(ROOT, "source-docs");
const CONTENT_DIR = path.join(ROOT, "content");
const MIGRATION_DIR = path.join(ROOT, "migration");
const GENERATED_DOCS = path.join(CONTENT_DIR, "generated-docs.json");
const INVENTORY_FILE = path.join(MIGRATION_DIR, "source-inventory.json");
const DOCUMENT_MAP_FILE = path.join(MIGRATION_DIR, "document-map.json");
const UNRESOLVED_FILE = path.join(MIGRATION_DIR, "unresolved-documents.md");
const TERMINOLOGY_FILE = path.join(MIGRATION_DIR, "terminology.en-ko.json");
const LAST_REVIEWED = "2026-08-01";
const SCREENSHOT_ROUTE = "/images/proxy-bake-refresh-review.png";

const sharedMap = [
  ["00_Overview.md", "overview", "Introduction", "Product positioning and requirement summary"],
  ["01_Getting_Started.md", "getting-started", "Getting Started", "Reproduce every editor step and screenshot"],
  ["02_Editor_Workflow.md", "editor-workflow", "Workflows", "UI labels, bake modes, output states"],
  ["03_Runtime_Integration.md", "runtime-integration", "Runtime", "Actor/component behavior and travel ownership"],
  ["04_Core_Concepts.md", "core-concepts", "Core Concepts", "Projection, IDs, partitions, generated assets"],
  ["05_Supported_Content.md", "supported-content", "Compatibility", "Supported/conditional/unsupported matrix"],
  ["06_Large_World_and_World_Partition.md", "large-world-world-partition", "Workflows", "Discovery, checkpoints, large bake guidance"],
  ["07_Performance_and_Optimization.md", "performance-optimization", "Optimization", "Measured values and tuning order"],
  ["08_Reference.md", "reference", "Reference", "Public symbols and CVars"],
  ["09_Troubleshooting.md", "troubleshooting", "Troubleshooting", "Exact messages and recovery steps"],
  ["10_Support_and_Release_Notes.md", "support-release-notes", "Support", "Support channel and release facts"],
  ["13_FAQ.md", "faq", "Support", "Keep answers aligned with canonical terminology and verified product scope"],
  ["14_Known_Issues.md", "known-issues", "Support", "Keep issue status current and avoid publishing unverified defects"],
];

const languageOnlyMap = [
  ["11_User_API.md", "user-api", "Reference", "Validate every public symbol before release"],
  ["12_Runtime_Actor_Integration.md", "runtime-actor-integration", "Runtime", "Requires Unreal Editor walkthrough QA"],
];

const documentDefinitions = new Map([...sharedMap, ...languageOnlyMap].map(([file, slug, category, reviewFocus], index) => [
  file,
  { file, slug, category, reviewFocus, order: index },
]));

const terminology = [
  ["Planet Asset", "Planet Asset", "Keep product object names in English."],
  ["Section", "Section", "Stable PlanetX authoring unit."],
  ["Level Pair", "Level Pair", "Pairing term used in runtime and bake docs."],
  ["Proxy Bake", "Proxy Bake", "Feature name; do not translate literally."],
  ["Runtime Preview", "Runtime Preview", "Engine feature state."],
  ["Same World", "Same World", "Runtime mode label."],
  ["External Level", "External Level", "Runtime mode label."],
  ["Travel", "Travel", "Unreal-level transition term."],
  ["Bake Data", "Bake Data", "Generated runtime data asset."],
  ["Source Review", "Source Review", "Editor panel name."],
  ["Output Plan", "Output Plan", "Editor panel name."],
  ["World Partition", "World Partition", "Unreal Engine feature name."],
  ["MeshPage", "MeshPage", "PlanetX generated content type."],
  ["InstanceBatch", "InstanceBatch", "PlanetX generated content type."],
].map(([en, ko, note]) => ({ en, ko, note }));

function compareFiles(a, b) {
  const aOrder = Number.parseInt(a.slice(0, 2), 10);
  const bOrder = Number.parseInt(b.slice(0, 2), 10);
  if (Number.isFinite(aOrder) && Number.isFinite(bOrder) && aOrder !== bOrder) {
    return aOrder - bOrder;
  }
  return a.localeCompare(b);
}

function routeSlugForTarget(target, lang) {
  const cleanTarget = target.split("#")[0].replace(/\\/g, "/");
  const base = path.posix.basename(cleanTarget);

  if (/^PlanetX_User_Guide_(EN|KO)\.md$/i.test(base)) {
    return `/docs/${lang}/overview`;
  }

  const definition = documentDefinitions.get(base);
  if (!definition) {
    return null;
  }

  return `/docs/${lang}/${definition.slug}`;
}

function transformLinks(markdown, lang, unresolvedLinks) {
  return markdown.replace(/(!?)\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g, (match, bang, label, rawTarget) => {
    if (/^(https?:|mailto:|#|\/)/i.test(rawTarget)) {
      return match;
    }

    if (/\.(png|jpe?g|gif|webp|svg)$/i.test(rawTarget)) {
      return `${bang}[${label}](${SCREENSHOT_ROUTE})`;
    }

    if (/\.md(?:#.*)?$/i.test(rawTarget)) {
      const hash = rawTarget.includes("#") ? `#${rawTarget.split("#").slice(1).join("#")}` : "";
      const route = routeSlugForTarget(rawTarget, lang);
      if (!route) {
        unresolvedLinks.push({ lang, target: rawTarget, label });
        return match;
      }
      return `${bang}[${label}](${route}${hash})`;
    }

    return match;
  });
}

function stripSourceChrome(markdown) {
  const withoutTitle = markdown.replace(/^#\s+.*\r?\n+/, "");
  return withoutTitle.replace(
    /^\[[^\r\n]+\]\([^)]+\)(?:\s*·\s*\[[^\r\n]+\]\([^)]+\))*\r?\n+/,
    "",
  );
}

function stripMarkdown(value) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[#>*_|~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTitle(markdown, fallback) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback.replace(/\.md$/i, "").replace(/^\d+_/, "").replace(/_/g, " ");
}

function extractDescription(markdown) {
  const withoutTitle = markdown.replace(/^#\s+.+$/m, "");
  const paragraph = withoutTitle
    .split(/\r?\n\r?\n/)
    .map((block) => stripMarkdown(block))
    .find((block) => {
      if (block.length === 0 || block.startsWith("|")) return false;
      if (/^(documentation home|문서 홈|previous:|이전:)/i.test(block)) return false;
      if (/^(next:|다음:)/i.test(block)) return false;
      return true;
    });

  if (!paragraph) {
    return "";
  }

  return paragraph.length > 180 ? `${paragraph.slice(0, 177).trim()}...` : paragraph;
}

function slugifyHeading(value) {
  const normalized = stripMarkdown(value).toLowerCase();
  const ascii = normalized
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return ascii || "section";
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
    headings.push({
      level,
      title,
      id: count === 0 ? baseId : `${baseId}-${count + 1}`,
    });
  }

  return headings;
}

function inferVerificationStatus(file) {
  const productReviewFiles = new Set([
    "01_Getting_Started.md",
    "02_Editor_Workflow.md",
    "03_Runtime_Integration.md",
    "05_Supported_Content.md",
    "06_Large_World_and_World_Partition.md",
    "07_Performance_and_Optimization.md",
    "08_Reference.md",
    "09_Troubleshooting.md",
    "10_Support_and_Release_Notes.md",
    "11_User_API.md",
    "12_Runtime_Actor_Integration.md",
  ]);
  return productReviewFiles.has(file) ? "needs-product-review" : "verified";
}

function inferScreenshotRequirements(file, markdown) {
  const requirements = [];
  if (markdown.includes("ProxyBake_Refresh_Review.png")) {
    requirements.push("Use supplied Proxy Bake Refresh Review screenshot.");
  }

  const workflowScreenshotFiles = new Set([
    "01_Getting_Started.md",
    "02_Editor_Workflow.md",
    "03_Runtime_Integration.md",
    "08_Reference.md",
    "09_Troubleshooting.md",
    "12_Runtime_Actor_Integration.md",
  ]);
  if (workflowScreenshotFiles.has(file)) {
    requirements.push("Capture reviewed Unreal Editor workflow screenshots before public release.");
  }

  if (file === "11_User_API.md") {
    requirements.push("No fabricated screenshots; validate API tables against public headers.");
  }

  return [...new Set(requirements)];
}

async function listMarkdownFiles(lang) {
  const dir = path.join(SOURCE_ROOT, lang);
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name)
    .sort(compareFiles);
}

async function buildDocument(lang, file, allFiles, unresolvedLinks) {
  const definition = documentDefinitions.get(file);
  if (!definition) {
    throw new Error(`No document map entry for ${lang}/${file}`);
  }

  const absolutePath = path.join(SOURCE_ROOT, lang, file);
  const raw = (await readFile(absolutePath, "utf8")).replace(/\r\n?/g, "\n");
  const content = stripSourceChrome(transformLinks(raw, lang, unresolvedLinks));
  const title = extractTitle(raw, file);
  const isLanguageOnly = lang === "ko" && !allFiles.en.includes(file);
  const hasCounterpart = lang === "en" ? allFiles.ko.includes(file) : allFiles.en.includes(file);
  const counterpartId = hasCounterpart ? `${lang === "en" ? "ko" : "en"}-${definition.slug}` : null;

  return {
    id: `${lang}-${definition.slug}`,
    lang,
    slug: definition.slug,
    title,
    description: extractDescription(raw),
    category: definition.category,
    order: definition.order,
    sourceFile: file,
    sourcePath: `source-docs/${lang}/${file}`,
    content,
    headings: extractHeadings(raw),
    public: true,
    verificationStatus: inferVerificationStatus(file),
    screenshotRequirements: inferScreenshotRequirements(file, raw),
    translation: {
      status: hasCounterpart ? "current" : isLanguageOnly ? "language-only" : "missing",
      counterpartId,
    },
    lastReviewed: LAST_REVIEWED,
  };
}

function buildSourceInventory(allFiles, documents) {
  const byLang = Object.fromEntries(["en", "ko"].map((lang) => [
    lang,
    allFiles[lang].map((file) => {
      const doc = documents.find((item) => item.lang === lang && item.sourceFile === file);
      return {
        file,
        path: `source-docs/${lang}/${file}`,
        slug: doc.slug,
        id: doc.id,
        title: doc.title,
        category: doc.category,
        order: doc.order,
        headings: doc.headings.length,
        public: doc.public,
        verificationStatus: doc.verificationStatus,
        translationStatus: doc.translation.status,
      };
    }),
  ]));

  return {
    auditDate: LAST_REVIEWED,
    counts: {
      en: allFiles.en.length,
      ko: allFiles.ko.length,
      total: allFiles.en.length + allFiles.ko.length,
      sharedSubjects: allFiles.en.filter((file) => allFiles.ko.includes(file)).length,
      languageOnlySubjects: allFiles.ko.filter((file) => !allFiles.en.includes(file)).length,
    },
    languages: byLang,
  };
}

function buildDocumentMap(allFiles, documents) {
  return documents
    .filter((doc) => doc.lang === "en" || !allFiles.en.includes(doc.sourceFile))
    .map((doc) => {
      const paired = documents.filter((item) => item.slug === doc.slug);
      return {
        slug: doc.slug,
        order: doc.order,
        category: doc.category,
        reviewFocus: documentDefinitions.get(doc.sourceFile).reviewFocus,
        routes: Object.fromEntries(paired.map((item) => [item.lang, `/docs/${item.lang}/${item.slug}`])),
        sources: Object.fromEntries(paired.map((item) => [item.lang, item.sourcePath])),
        ids: Object.fromEntries(paired.map((item) => [item.lang, item.id])),
        translationStatus: paired.length > 1 ? "current" : "language-only",
      };
    })
    .sort((a, b) => a.order - b.order);
}

function buildUnresolvedReport(allFiles, unresolvedLinks, documents) {
  const languageOnly = documents.filter((doc) => doc.translation.status === "language-only");
  const missingEnglish = allFiles.ko.filter((file) => !allFiles.en.includes(file));
  const lines = [
    "# Unresolved Documents",
    "",
    `Last reviewed: ${LAST_REVIEWED}`,
    "",
    "## Language-only Korean documents",
    "",
    ...languageOnly.map((doc) => `- \`${doc.sourcePath}\` -> \`/docs/${doc.lang}/${doc.slug}\` (${doc.title})`),
    "",
    "## Missing English counterparts",
    "",
    ...missingEnglish.map((file) => {
      const definition = documentDefinitions.get(file);
      return `- \`source-docs/en/${file}\` is not present. Korean route remains \`/docs/ko/${definition.slug}\`.`;
    }),
    "",
    "## Unresolved relative Markdown links",
    "",
    ...(unresolvedLinks.length === 0
      ? ["- None"]
      : unresolvedLinks.map((link) => `- ${link.lang}: \`${link.target}\` (${link.label})`)),
    "",
    "## Product review required",
    "",
    ...documents
      .filter((doc) => doc.verificationStatus === "needs-product-review")
      .map((doc) => `- \`${doc.sourcePath}\`: ${documentDefinitions.get(doc.sourceFile).reviewFocus}`),
    "",
  ];

  return `${lines.join("\n")}\n`;
}

async function main() {
  const allFiles = {
    en: await listMarkdownFiles("en"),
    ko: await listMarkdownFiles("ko"),
  };
  const unresolvedLinks = [];
  const documents = [];

  for (const lang of ["en", "ko"]) {
    for (const file of allFiles[lang]) {
      documents.push(await buildDocument(lang, file, allFiles, unresolvedLinks));
    }
  }

  documents.sort((a, b) => a.order - b.order || a.lang.localeCompare(b.lang));

  await mkdir(CONTENT_DIR, { recursive: true });
  await mkdir(MIGRATION_DIR, { recursive: true });
  await writeFile(GENERATED_DOCS, `${JSON.stringify(documents, null, 2)}\n`, "utf8");
  await writeFile(INVENTORY_FILE, `${JSON.stringify(buildSourceInventory(allFiles, documents), null, 2)}\n`, "utf8");
  await writeFile(DOCUMENT_MAP_FILE, `${JSON.stringify(buildDocumentMap(allFiles, documents), null, 2)}\n`, "utf8");
  await writeFile(UNRESOLVED_FILE, buildUnresolvedReport(allFiles, unresolvedLinks, documents), "utf8");
  await writeFile(TERMINOLOGY_FILE, `${JSON.stringify({ lastReviewed: LAST_REVIEWED, terms: terminology }, null, 2)}\n`, "utf8");

  console.log(`Compiled ${documents.length} documents (${allFiles.en.length} en, ${allFiles.ko.length} ko).`);
  console.log(`Generated ${path.relative(ROOT, GENERATED_DOCS)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

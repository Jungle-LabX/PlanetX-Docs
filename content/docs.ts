import docsJson from "./generated-docs.json";
import manifestJson from "../source-docs/docs-manifest.json";

export type DocLanguage = "en" | "ko";

export type DocHeading = {
  level: number;
  title: string;
  id: string;
};

export type DocRecord = {
  id: string;
  lang: DocLanguage;
  slug: string;
  title: string;
  navigationTitle: string;
  description: string;
  category: string;
  categoryTitle: string;
  categoryOrder: number;
  orderInCategory: number;
  order: number;
  scope: "offline" | "web-supplemental";
  sourceFile: string;
  sourcePath: string;
  content: string;
  headings: DocHeading[];
  public: boolean;
  verificationStatus: "verified" | "needs-product-review";
  screenshotRequirements: string[];
  translation: {
    status: "current" | "missing" | "language-only";
    counterpartId: string | null;
  };
  lastReviewed: string;
};

type DocsManifest = {
  defaultSlug: string;
  lastReviewed: string;
  aliases: Record<string, string>;
  standaloneRoutes: Record<string, string>;
};

export const docsManifest = manifestJson as DocsManifest;
export const defaultDocSlug = docsManifest.defaultSlug;
export const docAliases = docsManifest.aliases;
export const standaloneRoutes = docsManifest.standaloneRoutes;
export const docsLastReviewed = docsManifest.lastReviewed;

export const docs = [...(docsJson as DocRecord[])].sort(
  (left, right) =>
    left.categoryOrder - right.categoryOrder
    || left.orderInCategory - right.orderInCategory
    || left.order - right.order,
);

export const standaloneDocSlugs = new Set(Object.keys(standaloneRoutes));

export function resolveDocSlug(slug: string) {
  let resolved = slug;
  const visited = new Set<string>();

  while (docAliases[resolved] && !visited.has(resolved)) {
    visited.add(resolved);
    resolved = docAliases[resolved];
  }

  return resolved;
}

export function isDocAlias(slug: string) {
  return resolveDocSlug(slug) !== slug;
}

export function getDocsForLanguage(lang: DocLanguage) {
  return docs.filter(
    (doc) => doc.lang === lang && doc.public && doc.scope === "offline",
  );
}

export function getDoc(lang: string, slug: string) {
  const canonicalSlug = resolveDocSlug(slug);
  return docs.find((doc) => doc.lang === lang && doc.slug === canonicalSlug);
}

export function getDocHref(lang: DocLanguage, slug: string) {
  const canonicalSlug = resolveDocSlug(slug);
  const doc = getDoc(lang, canonicalSlug);
  if (doc?.scope === "web-supplemental") {
    return standaloneRoutes[canonicalSlug] ?? `/docs/${lang}/${canonicalSlug}`;
  }
  return `/docs/${lang}/${canonicalSlug}`;
}

export function getStaticDocParams() {
  const params = new Map<string, { lang: DocLanguage; slug: string }>();

  for (const doc of docs) {
    if (!doc.public || doc.scope !== "offline") continue;
    params.set(`${doc.lang}:${doc.slug}`, { lang: doc.lang, slug: doc.slug });
  }

  for (const [alias, target] of Object.entries(docAliases)) {
    for (const lang of ["en", "ko"] as const) {
      const targetDoc = getDoc(lang, target);
      if (!targetDoc?.public || targetDoc.scope !== "offline") continue;
      params.set(`${lang}:${alias}`, { lang, slug: alias });
    }
  }

  return [...params.values()];
}

export function getAlternateDoc(doc: DocRecord) {
  const counterpart = doc.translation.counterpartId
    ? docs.find((candidate) => candidate.id === doc.translation.counterpartId)
    : undefined;
  if (counterpart?.public) return counterpart;

  const alternateLanguage = doc.lang === "en" ? "ko" : "en";
  return getDoc(alternateLanguage, doc.slug) ?? getDoc(alternateLanguage, defaultDocSlug);
}

export function getAdjacentDocs(doc: DocRecord) {
  const languageDocs = getDocsForLanguage(doc.lang);
  const index = languageDocs.findIndex((candidate) => candidate.id === doc.id);
  return {
    previous: index > 0 ? languageDocs[index - 1] : undefined,
    next: index >= 0 && index < languageDocs.length - 1 ? languageDocs[index + 1] : undefined,
  };
}

export function getCategoryGroups(lang: DocLanguage) {
  const groups = new Map<string, DocRecord[]>();
  for (const doc of getDocsForLanguage(lang)) {
    const group = groups.get(doc.category) ?? [];
    group.push(doc);
    groups.set(doc.category, group);
  }
  return [...groups.entries()];
}

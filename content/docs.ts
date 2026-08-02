import docsJson from "./generated-docs.json";

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
  description: string;
  category: string;
  order: number;
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

export const docs = (docsJson as DocRecord[]).sort(
  (left, right) => left.order - right.order,
);

export const standaloneDocSlugs = new Set([
  "support-release-notes",
  "faq",
  "known-issues",
]);

export function getDocsForLanguage(lang: DocLanguage) {
  return docs.filter(
    (doc) => doc.lang === lang && doc.public && !standaloneDocSlugs.has(doc.slug),
  );
}

export function getDoc(lang: string, slug: string) {
  return docs.find((doc) => doc.lang === lang && doc.slug === slug);
}

export function getAlternateDoc(doc: DocRecord) {
  if (!doc.translation.counterpartId) return undefined;
  return docs.find((candidate) => candidate.id === doc.translation.counterpartId);
}

export function getAdjacentDocs(doc: DocRecord) {
  const languageDocs = getDocsForLanguage(doc.lang);
  const index = languageDocs.findIndex((candidate) => candidate.id === doc.id);
  return {
    previous: index > 0 ? languageDocs[index - 1] : undefined,
    next: index < languageDocs.length - 1 ? languageDocs[index + 1] : undefined,
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

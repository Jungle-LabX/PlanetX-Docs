import { docs, getDoc, type DocLanguage } from "./docs";

type LocalizedLabel = Record<DocLanguage, string>;

export const primaryNavigation: Array<{
  id: "main" | "documentation" | "known-issues" | "faq" | "release-notes" | "about";
  label: LocalizedLabel;
  href: (lang: DocLanguage) => string;
}> = [
  { id: "main", label: { en: "Main", ko: "메인" }, href: () => "/#site-top" },
  { id: "documentation", label: { en: "Documentation", ko: "문서" }, href: () => "/docs#main-content" },
  { id: "known-issues", label: { en: "Known Issues", ko: "알려진 문제" }, href: () => "/known-issues#main-content" },
  { id: "faq", label: { en: "FAQ", ko: "FAQ" }, href: () => "/faq#main-content" },
  { id: "release-notes", label: { en: "Release Notes", ko: "릴리스 노트" }, href: () => "/release-notes#main-content" },
  { id: "about", label: { en: "About Us", ko: "소개" }, href: () => "/about#main-content" },
];

export function getCanonicalDocTitle(slug: string, lang: DocLanguage, fallback: string) {
  return getDoc(lang, slug)?.navigationTitle ?? fallback;
}

export function getCanonicalCategoryTitle(category: string, lang: DocLanguage) {
  return docs.find((doc) => doc.lang === lang && doc.category === category)?.categoryTitle ?? category;
}

export function getCanonicalDocDescription(slug: string, lang: DocLanguage, fallback: string) {
  return getDoc(lang, slug)?.description ?? fallback;
}

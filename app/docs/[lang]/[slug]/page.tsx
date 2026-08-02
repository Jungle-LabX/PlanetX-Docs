import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsPage } from "@/app/components/DocsPage";
import { docs, getDoc, standaloneDocSlugs } from "@/content/docs";

export const dynamicParams = false;

export function generateStaticParams() {
  return docs
    .filter((doc) => !standaloneDocSlugs.has(doc.slug))
    .map((doc) => ({ lang: doc.lang, slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const doc = getDoc(lang, slug);
  if (!doc || standaloneDocSlugs.has(slug)) return {};
  return {
    title: doc.title,
    description: doc.description,
    alternates: doc.translation.counterpartId ? {
      languages: {
        [doc.lang]: `/docs/${doc.lang}/${doc.slug}`,
      },
    } : undefined,
  };
}

export default async function DocumentRoute({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const doc = getDoc(lang, slug);
  if (!doc || standaloneDocSlugs.has(slug)) notFound();
  return <DocsPage doc={doc} />;
}

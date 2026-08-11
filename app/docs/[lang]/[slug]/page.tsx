import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsPage } from "@/app/components/DocsPage";
import {
  getAlternateDoc,
  getDoc,
  getDocHref,
  getStaticDocParams,
} from "@/content/docs";

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticDocParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const doc = getDoc(lang, slug);
  if (!doc || !doc.public || doc.scope !== "offline") return {};
  const alternate = getAlternateDoc(doc);
  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: getDocHref(doc.lang, doc.slug),
      languages: {
        [doc.lang]: getDocHref(doc.lang, doc.slug),
        ...(alternate ? { [alternate.lang]: getDocHref(alternate.lang, alternate.slug) } : {}),
      },
    },
  };
}

export default async function DocumentRoute({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const doc = getDoc(lang, slug);
  if (!doc || !doc.public || doc.scope !== "offline") notFound();
  return <DocsPage doc={doc} />;
}

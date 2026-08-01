import type { Metadata } from "next";
import { DocumentationHome } from "../components/DocumentationHome";

export const metadata: Metadata = {
  title: "Documentation",
  description: "PlanetX documentation in English and Korean.",
};

export default function DocumentationHomePage() {
  return <DocumentationHome />;
}

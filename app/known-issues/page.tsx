import type { Metadata } from "next";
import { StandalonePage } from "../components/StandalonePage";
import { getDoc } from "@/content/docs";

export const metadata: Metadata = {
  title: "Known Issues",
  description: "Publication status and reporting guidance for product-reviewed PlanetX issues.",
  alternates: { canonical: "/known-issues" },
};

export default function KnownIssuesPage() {
  return <StandalonePage kind="known-issues" documents={{ en: getDoc("en", "known-issues"), ko: getDoc("ko", "known-issues") }} />;
}

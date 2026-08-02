import type { Metadata } from "next";
import { StandalonePage } from "../components/StandalonePage";
import { getDoc } from "@/content/docs";

export const metadata: Metadata = {
  title: "Release Notes",
  description: "PlanetX release scope, dependencies, update guidance, and known limitations.",
  alternates: { canonical: "/release-notes" },
};

export default function ReleaseNotesPage() {
  return <StandalonePage kind="release-notes" documents={{ en: getDoc("en", "support-release-notes"), ko: getDoc("ko", "support-release-notes") }} />;
}

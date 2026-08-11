import type { Metadata } from "next";
import { StandalonePage } from "../components/StandalonePage";
import { getDoc } from "@/content/docs";

export const metadata: Metadata = {
  title: "Release Notes",
  description: "PlanetX 1.0 release contract, module scope, required dependencies, and distribution note.",
  alternates: { canonical: "/release-notes" },
};

export default function ReleaseNotesPage() {
  return <StandalonePage kind="release-notes" documents={{ en: getDoc("en", "version-1-0"), ko: getDoc("ko", "version-1-0") }} />;
}

import type { Metadata } from "next";
import { StandalonePage } from "../components/StandalonePage";
import { getDoc } from "@/content/docs";

export const metadata: Metadata = {
  title: "PlanetX 1.0.1 - Pending",
  description: "Pending PlanetX 1.0.1 maintenance update. Fab currently distributes PlanetX 1.0 Mercury.",
  alternates: { canonical: "/release-notes" },
};

export default function ReleaseNotesPage() {
  return <StandalonePage kind="release-notes" documents={{ en: getDoc("en", "version-1-0"), ko: getDoc("ko", "version-1-0") }} />;
}

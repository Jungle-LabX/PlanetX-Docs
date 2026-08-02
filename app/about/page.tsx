import type { Metadata } from "next";
import { StandalonePage } from "../components/StandalonePage";

export const metadata: Metadata = {
  title: "About LabX",
  description: "About LabX, the independent team developing PlanetX.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <StandalonePage kind="about" />;
}

import type { Metadata } from "next";
import { StandalonePage } from "../components/StandalonePage";
import { getDoc } from "@/content/docs";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about PlanetX scope, workflows, and integration.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return <StandalonePage kind="faq" documents={{ en: getDoc("en", "faq"), ko: getDoc("ko", "faq") }} />;
}

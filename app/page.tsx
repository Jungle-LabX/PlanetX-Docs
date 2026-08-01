import type { Metadata } from "next";
import { LandingPage } from "./components/LandingPage";

export const metadata: Metadata = {
  title: "PlanetX — Build the ground. Reveal the planet.",
  description: "Official PlanetX product site and documentation for the Unreal Engine planet-scale workflow plugin.",
};

export default function Home() {
  return <LandingPage />;
}

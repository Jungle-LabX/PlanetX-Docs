import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SearchDialog } from "./components/SearchDialog";
import { BackToTop } from "./components/BackToTop";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
const siteRoot = `${(process.env.NEXT_PUBLIC_SITE_URL ?? `http://localhost:3000${basePath}`).replace(/\/$/, "")}/`;
const iconUrl = new URL("brand/planetx-mark.svg", siteRoot).toString();
const socialImageUrl = new URL("og.png", siteRoot).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteRoot),
  title: {
    default: "PlanetX — Official Website & Documentation",
    template: "%s · PlanetX Docs",
  },
  description: "Official product site and technical documentation for the PlanetX Unreal Engine plugin.",
  applicationName: "PlanetX Docs",
  icons: {
    icon: iconUrl,
    shortcut: iconUrl,
  },
  openGraph: {
    type: "website",
    siteName: "PlanetX",
    title: "PlanetX — Build the ground. Reveal the planet.",
    description: "Planet-scale world workflow for Unreal Engine.",
    images: [{ url: socialImageUrl, width: 1734, height: 907, alt: "PlanetX — Build the ground. Reveal the planet." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PlanetX — Build the ground. Reveal the planet.",
    description: "Planet-scale world workflow for Unreal Engine.",
    images: [socialImageUrl],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050b12" },
    { media: "(prefers-color-scheme: light)", color: "#f4f7f8" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var stored=localStorage.getItem('planetx-theme');var theme=stored==='light'||stored==='dark'?stored:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;}catch(e){document.documentElement.dataset.theme='dark';}})();`,
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
        <SearchDialog />
        <BackToTop />
      </body>
    </html>
  );
}

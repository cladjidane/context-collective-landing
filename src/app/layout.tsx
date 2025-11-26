import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WebSiteSchema, OrganizationSchema } from "@/components/seo/json-ld";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://context-collective.org";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Context Collective | Communauté IA Brest",
    template: "%s | Context Collective",
  },
  description:
    "Communauté d'ingénierie IA générative à Brest. Apprendre en public, partager les savoirs, construire ensemble.",
  keywords: [
    "IA",
    "Intelligence Artificielle",
    "Brest",
    "Communauté",
    "Machine Learning",
    "LLM",
    "GenAI",
    "IA Générative",
    "Ingénierie",
    "Tech",
    "Bretagne",
  ],
  authors: [{ name: "Context Collective" }],
  creator: "Context Collective",
  publisher: "Context Collective",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: BASE_URL,
    siteName: "Context Collective",
    title: "Context Collective | Communauté IA Brest",
    description:
      "Communauté d'ingénierie IA générative à Brest. Apprendre en public, partager les savoirs, construire ensemble.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Context Collective - Communauté IA Brest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Context Collective | Communauté IA Brest",
    description:
      "Communauté d'ingénierie IA générative à Brest. Apprendre en public, partager les savoirs, construire ensemble.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${merriweather.variable}`}>
      <head>
        <WebSiteSchema />
        <OrganizationSchema />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

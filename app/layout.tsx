import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { ActionCenter } from "@/components/sections/action-center";
import { Analytics } from "@/components/Analytics";
import { CartProvider } from "@/components/cart/cart-provider";
import { publicEnv } from "@/lib/env";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/json-ld";

const montserrat = localFont({
  src: [
    { path: "../public/fonts/Montserrat-VariableFont_wght.ttf", weight: "100 900", style: "normal" },
    { path: "../public/fonts/Montserrat-Italic-VariableFont_wght.ttf", weight: "100 900", style: "italic" },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

const museoModerno = localFont({
  src: [
    { path: "../public/fonts/MuseoModerno-VariableFont_wght.ttf", weight: "100 900", style: "normal" },
    { path: "../public/fonts/MuseoModerno-Italic-VariableFont_wght.ttf", weight: "100 900", style: "italic" },
  ],
  variable: "--font-museo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  title: {
    template: "%s | TAP",
    default: "TAP — True American Pets",
  },
  description: "Mission-led commerce for the heroes at your feet.",
  icons: {
    icon: [
      { url: "/brand/logo-v2-icon.png", sizes: "any" },
      { url: "/brand/logo-v2-icon-blue.png", sizes: "any", type: "image/png" },
    ],
    apple: [
      { url: "/brand/logo-v2-icon-blue.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "True American Pets",
    description:
      "Mission-led commerce built for the heroes at your feet. Safety-first gear, impact receipts, and hero storytelling.",
    url: publicEnv.siteUrl,
    siteName: "True American Pets",
    images: [
      {
        url: `${publicEnv.siteUrl}/brand/logo-v2-icon-blue.png`,
        width: 512,
        height: 512,
        alt: "True American Pets Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "True American Pets",
    description: "Mission-led commerce for working dogs and family heroes.",
    images: [`${publicEnv.siteUrl}/brand/logo-v2-icon-blue.png`],
  },
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "True American Pets",
    url: publicEnv.siteUrl,
    sameAs: ["https://www.instagram.com", "https://www.tiktok.com"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: publicEnv.siteUrl,
    name: "True American Pets",
    potentialAction: {
      "@type": "SearchAction",
      target: `${publicEnv.siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" data-theme="light">
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background text-foreground antialiased",
          montserrat.variable,
          museoModerno.variable
        )}
      >
        <Analytics />
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <ActionCenter />
        </CartProvider>
      </body>
    </html>
  );
}

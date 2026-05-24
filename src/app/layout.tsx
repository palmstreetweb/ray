import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { business } from "@/lib/business";
import { content } from "@/lib/content";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description,
  metadataBase: new URL(business.url),
  alternates: { canonical: "/" },
  openGraph: {
    title: content.metadata.title,
    description: content.metadata.description,
    url: business.url,
    siteName: `${business.firstName} ${business.lastName}`,
    images: [
      {
        url: content.metadata.ogImage,
        width: 1200,
        height: 630,
        alt: `${business.firstName} ${business.lastName}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: content.metadata.title,
    description: content.metadata.description,
    images: [content.metadata.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${business.url}/#person`,
        name: `${business.firstName} ${business.lastName}`,
        jobTitle: "Model",
        url: business.url,
        sameAs: business.socials.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": `${business.url}/#website`,
        url: business.url,
        name: `${business.firstName} ${business.lastName}`,
        description: business.tagline,
        publisher: { "@id": `${business.url}/#person` },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${mono.variable} h-full antialiased`}
      style={{ scrollBehavior: "smooth" }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[var(--bg)] text-[var(--ink)]">
        {children}
      </body>
    </html>
  );
}

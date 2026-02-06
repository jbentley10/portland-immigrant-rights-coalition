/**
 * @file layout.tsx
 * Server Component - fetches site settings at build time with ISR
 */
// Import styles
import "./globals.css";

// Import dependencies
import React from "react";
import { Antonio, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

// Import components and utils
import LayoutClient from "@/components/layout-client";
import { fetchSiteSettings, REVALIDATE_TIME } from "@/lib/contentfulData";

// Enable ISR - revalidate every hour (3600 seconds)
export const revalidate = REVALIDATE_TIME;

// Declare fonts with CSS variables
const antonio = Antonio({
  subsets: ["latin"],
  variable: '--font-antonio'
});
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch site settings for both locales at build time (with ISR)
  const [englishSettings, spanishSettings] = await Promise.all([
    fetchSiteSettings("en-US"),
    fetchSiteSettings("es"),
  ]);

  return (
    <html lang="en" className={`${antonio.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta
          name="google-site-verification"
          content="Pjo3rv4G1rYIbeMQGWrtsWDiB_c1eL5dbur-SKjBYwk"
        />
      </head>
      <body>
        <LayoutClient
          siteSettings={{ englishSettings, spanishSettings }}
        >
          {children}
        </LayoutClient>
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E3RS2WG2NW"
          strategy="beforeInteractive"
        />
        <Script id="gtag-script">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-E3RS2WG2NW');`}
        </Script>
        <Script
          id="hs-script-loader"
          strategy="lazyOnload"
          src="https://js.hs-scripts.com/47099822.js"
        />
      </body>
    </html>
  );
}

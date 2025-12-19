/**
 * @file layout.tsx
 */
"use client";

// Import styles
import "./globals.css";

// Import dependencies
import React, { useEffect, useState } from "react";
import { Antonio, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

// Import components and utils
import FloatingActionButton from "../components/floating-action-button";
import { LocaleContext } from "./locale-provider";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/footer";
import Script from "next/script";
import { fetchSiteSettings } from "@/lib/contentfulData";
import UpdateBanner from "@/components/update-banner";

export function useSiteSettings(locale: "en-US" | "es" = "en-US") {
  const [siteSettings, setSiteSettings] = useState<Awaited<
    ReturnType<typeof fetchSiteSettings>
  > | null>(null);

  useEffect(() => {
    async function loadSiteSettings() {
      const settings = await fetchSiteSettings(locale);
      setSiteSettings(settings);
    }
    loadSiteSettings();
  }, [locale]);

  return siteSettings;
}

// Declare fonts
const antonio = Antonio({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isEnglish, setIsEnglish] = useState(true);
  const siteSettings = useSiteSettings(isEnglish ? "en-US" : "es");

  return (
    <html lang="en">
      <style jsx global>{`
        h1,
        h2,
        h3,
        h4,
        button,
        span,
        .antonio {
          font-family: ${antonio.style.fontFamily};
        }

        button > a {
          font-family: ${antonio.style.fontFamily};
        }

        p,
        strong,
        a {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta
          name="google-site-verification"
          content="Pjo3rv4G1rYIbeMQGWrtsWDiB_c1eL5dbur-SKjBYwk"
        />
      </head>
      <body>
        <LocaleContext.Provider value={{ isEnglish, setIsEnglish }}>
          {siteSettings?.banner && (
            <UpdateBanner {...siteSettings.banner.fields} />
          )}
          <Navigation />
          {children}
          <Footer />
          <FloatingActionButton />
        </LocaleContext.Provider>
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

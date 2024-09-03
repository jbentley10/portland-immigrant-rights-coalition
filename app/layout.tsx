/**
 * @file layout.tsx
 */
"use client";

// Import styles
import "./globals.css";

// Import dependencies
import React, { useState } from "react";
import { Antonio, Inter } from "next/font/google";

// Import components and utils
import FloatingActionButton from "../components/floating-action-button";
import { LocaleContext } from "./locale-provider";
import { Navigation } from "@/components/navigation";
import Footer from "@/components/footer";

// Declare fonts
const antonio = Antonio({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isEnglish, setIsEnglish] = useState(true);

  return (
    <html lang='en'>
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
        a {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>
      <body>
        <LocaleContext.Provider value={{ isEnglish, setIsEnglish }}>
          <Navigation />
          {children}
          <Footer />
          <FloatingActionButton />
        </LocaleContext.Provider>
      </body>
    </html>
  );
}

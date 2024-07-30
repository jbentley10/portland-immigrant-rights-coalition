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
import Head from "next/head";

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
        a,
        button {
          font-family: ${antonio.style.fontFamily};
        }

        p {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <body>
        <LocaleContext.Provider value={{ isEnglish, setIsEnglish }}>
          <Navigation />
          {children}
          <FloatingActionButton />
        </LocaleContext.Provider>
      </body>
    </html>
  );
}

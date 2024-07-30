/**
 * @file layout.tsx
 */
"use client";

// Import styles
import "./globals.css";

// Import dependencies
import React, { useState } from "react";
import { Inter } from "next/font/google";

// Import components and utils
import FloatingActionButton from "../components/floating-action-button";
import { LocaleContext } from "./locale-provider";
import { Navigation } from "@/components/navigation";

// Declare fonts
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isEnglish, setIsEnglish] = useState(true);

  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        <LocaleContext.Provider value={{ isEnglish, setIsEnglish }}>
          <Navigation />
          {children}
          <FloatingActionButton />
        </LocaleContext.Provider>
      </body>
    </html>
  );
}

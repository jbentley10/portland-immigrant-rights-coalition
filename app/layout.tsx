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
import { Navigation } from "pswd-design-system";
import { Footer } from "pswd-design-system";
import { ThemeProvider } from "@/components/theme-provider";

// Declare fonts
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isEnglish, setIsEnglish] = useState(true);

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LocaleContext.Provider value={{ isEnglish, setIsEnglish }}>
            <Navigation />
            {children}
            <Footer />
            <FloatingActionButton />
          </LocaleContext.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}

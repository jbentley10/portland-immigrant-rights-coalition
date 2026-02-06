/**
 * @file layout-client.tsx
 * Client-side layout wrapper that handles locale state and client components
 */
"use client";

import React, { useState } from "react";
import FloatingActionButton from "./floating-action-button";
import { LocaleContext } from "@/app/locale-provider";
import NavigationWrapper from "@/components/navigation-wrapper";
import Footer from "@/components/footer";
import UpdateBanner from "@/components/update-banner";
import type { Document } from "@contentful/rich-text-types";

type SiteSettingsProps = {
  englishSettings: {
    banner: { fields: { header: string; copy?: Document } } | null;
  } | null;
  spanishSettings: {
    banner: { fields: { header: string; copy?: Document } } | null;
  } | null;
};

export default function LayoutClient({
  children,
  siteSettings,
}: {
  children: React.ReactNode;
  siteSettings: SiteSettingsProps;
}) {
  const [isEnglish, setIsEnglish] = useState(true);

  // Get the correct banner based on locale
  const currentSettings = isEnglish
    ? siteSettings.englishSettings
    : siteSettings.spanishSettings;

  return (
    <LocaleContext.Provider value={{ isEnglish, setIsEnglish }}>
      {currentSettings?.banner && (
        <UpdateBanner {...currentSettings.banner.fields} />
      )}
      <NavigationWrapper />
      {children}
      <Footer />
      <FloatingActionButton />
    </LocaleContext.Provider>
  );
}

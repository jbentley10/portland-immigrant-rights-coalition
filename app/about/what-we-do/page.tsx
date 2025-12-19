/**
 * @file page.tsx
 */
// Import components and utils
import { fetchBlocksBySlug } from "@/lib/contentfulData";
import Content from "@/app/content";

// Set metadata
export const metadata = {
  title: "What We Do | Portland Immigrant Rights Coalition",
  description:
    "Explore the work of the Portland Immigrant Rights Coalition (PIRC). From deportation defense and policy advocacy to community education and a 24/7 hotline, discover how we support immigrant and refugee communities in Portland.",
};

export default async function WhatWeDo() {
  const blocksEnglish = await fetchBlocksBySlug("about/what-we-do", "en-US");
  const blocksSpanish = await fetchBlocksBySlug("about/what-we-do", "es");

  // Wait for the promises to resolve
  const [english, spanish] = await Promise.all([blocksEnglish, blocksSpanish]);

  return (
    <main>
      <Content
        key={Math.random()}
        englishBlocks={english}
        spanishBlocks={spanish}
      />
    </main>
  );
}

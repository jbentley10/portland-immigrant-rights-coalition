/**
 * @file page.tsx
 */
// Import components and utils
import { fetchBlocksBySlug } from "@/lib/contentfulData";
import Content from "@/app/content";

// Set metadata
export const metadata = {
  title: "What To Do If You See ICE | Portland Immigrant Rights Coalition",
  description:
    "Learn what actions to take if you encounter ICE agents in your community.",
};

export default async function WhatToDoIfYouSeeICE() {
  const blocksEnglish = await fetchBlocksBySlug("about/what-to-do-if-you-see-ice", "en-US");
  const blocksSpanish = await fetchBlocksBySlug("about/what-to-do-if-you-see-ice", "es");

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

/**
 * @file page.tsx
 */
// Import components and utils
import { fetchBlocksBySlug } from "../../lib/contentfulData";
import Content from "../content";

// Set metadata
export const metadata = {
  title: "Get Involved | Portland Immigrant Rights Coalition",
  description:
    "Join the Portland Immigrant Rights Coalition (PIRC) in the fight for immigrant and refugee rights. Learn how you can volunteer, participate in events, and take action to support our advocacy, education, and community defense efforts.",
};

export default async function WhatWeDo() {
  const blocksEnglish = await fetchBlocksBySlug("get-involved", "en-US");
  const blocksSpanish = await fetchBlocksBySlug("get-involved", "es");

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

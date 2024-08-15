/**
 * @file page.tsx
 */
// Import components and utils
import { fetchBlocksBySlug } from "../../lib/contentfulData";
import Content from "../content";

// Set metadata
export const metadata = {
  title: process.env.TITLE,
  description: process.env.META_DESCRIPTION,
};

export default async function About() {
  const blocksEnglish = await fetchBlocksBySlug("about", "en-US");
  const blocksSpanish = await fetchBlocksBySlug("about", "es");

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

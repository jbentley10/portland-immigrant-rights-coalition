/**
 * @file page.tsx
 */
// Import components and utils
import { fetchBlocksBySlug, REVALIDATE_TIME } from "../../../lib/contentfulData";
import Content from "../../content";

// Enable ISR - revalidate every hour
export const revalidate = REVALIDATE_TIME;

// Set metadata
export const metadata = {
  title: "PIRC Hotline | Portland Immigrant Rights Coalition",
  description:
    "Learn about the Portland Immigrant Rights Coalition (PIRC) hotline, an mostly volunteer-run service providing response to immediate crises.",
};

export default async function Hotline() {
  const blocksEnglish = await fetchBlocksBySlug("about/hotline", "en-US");
  const blocksSpanish = await fetchBlocksBySlug("about/hotline", "es");

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

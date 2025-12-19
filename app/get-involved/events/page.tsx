/**
 * @file page.tsx
 */
// Import components and utils
import { fetchBlocksBySlug } from "../../../lib/contentfulData";
import Content from "../../content";

// Set metadata
export const metadata = {
  title: "PIRC Events | Portland Immigrant Rights Coalition",
  description:
    "Learn about the Portland Immigrant Rights Coalition (PIRC) events.",
};

export default async function Events() {
  const blocksEnglish = await fetchBlocksBySlug("about/events", "en-US");
  const blocksSpanish = await fetchBlocksBySlug("about/events", "es");

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

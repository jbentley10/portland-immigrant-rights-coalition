/**
 * @file page.tsx
 */
// Import components and utils
import { fetchBlocksBySlug } from "../../../lib/contentfulData";
import Content from "../../content";

// Set metadata
export const metadata = {
  title: "Weekly Updates | Portland Immigrant Rights Coalition",
  description:
    "Get the latest updates from PIRC with our weekly newsletter, featuring news, events, and ways to get involved.",
};

export default async function WeeklyUpdates() {
  const blocksEnglish = await fetchBlocksBySlug("what-we-do/weekly-updates", "en-US");
  const blocksSpanish = await fetchBlocksBySlug("what-we-do/weekly-updates", "es");

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

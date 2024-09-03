/**
 * @file page.tsx
 */
// Import components and utils
import { fetchBlocksBySlug } from "../../lib/contentfulData";
import Content from "../content";

// Set metadata
export const metadata = {
  title: "About | Portland Immigrant Rights Coalition",
  description:
    "Learn about the Portland Immigrant Rights Coalition (PIRC), a grassroots organization dedicated to ending detention and deportation of immigrant families. Discover our mission, history, and commitment to immigrant and refugee rights in Portland.",
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

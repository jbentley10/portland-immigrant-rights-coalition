/**
 * @file page.tsx
 */
// Import components and utils
import { fetchBlocksBySlug } from "../lib/contentfulData";
import Content from "./content";

// Set metadata
export const metadata = {
  title: "Home | Portland Immigrant Rights Coalition",
  description:
    "Portland Immigrant Rights Coalition (PIRC) support immigrant rights through direct assistance, education, legal support, advocacy, and community organizing.",
};

export default async function Home() {
  const blocksEnglish = await fetchBlocksBySlug("home", "en-US");
  const blocksSpanish = await fetchBlocksBySlug("home", "es");

  // Wait for the promises to resolve
  const [english, spanish] = await Promise.all([blocksEnglish, blocksSpanish]);

  return (
    <main>
      <Content englishBlocks={english} spanishBlocks={spanish} />
    </main>
  );
}

/**
 * @file page.tsx
 */
// Import components and utils
import { fetchBlocksBySlug } from "../../lib/contentfulData";
import Content from "../content";

// Set metadata
export const metadata = {
  title: "Resources | Portland Immigrant Rights Coalition",
  description:
    "Access resources from the Portland Immigrant Rights Coalition (PIRC) to support immigrant and refugee communities. Find information on asylum rights, deportation defense, sanctuary law violations, and more.",
};

export default async function Resources() {
  const blocksEnglish = await fetchBlocksBySlug("resources", "en-US");
  const blocksSpanish = await fetchBlocksBySlug("resources", "es");

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

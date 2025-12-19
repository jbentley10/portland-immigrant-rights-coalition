/**
 * @file page.tsx
 */
// Import components and utils
import { fetchBlocksBySlug } from "@/lib/contentfulData";
import Content from "@/app/content";

// Set metadata
export const metadata = {
  title: "Resources | Portland Immigrant Rights Coalition",
  description:
    "Access resources from the Portland Immigrant Rights Coalition (PIRC) to support immigrant and refugee communities. Find information on asylum rights, deportation defense, sanctuary law violations, and more.",
};

export default async function Resources() {
  const blocksEnglish = await fetchBlocksBySlug("about/resource-center", "en-US");
  const blocksSpanish = await fetchBlocksBySlug("about/resource-center", "es");

  return (
    <main>
      <Content
        key={Math.random()}
        englishBlocks={blocksEnglish}
        spanishBlocks={blocksSpanish}
      />
    </main>
  );
}

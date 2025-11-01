/**
 * @file page.tsx
 */
// Import components and utils
import { fetchBlocksBySlug } from "../../lib/contentfulData";
import BilingualResourcesBlock from "../../components/bilingual-resources-block";

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

  // Find the resources blocks from both languages
  const englishResourcesBlock = english.find(
    (block: any) => block.sys.contentType.sys.id === "resourcesBlock"
  );
  const spanishResourcesBlock = spanish.find(
    (block: any) => block.sys.contentType.sys.id === "resourcesBlock"
  );

  return (
    <main>
      {englishResourcesBlock && spanishResourcesBlock && (
        <BilingualResourcesBlock
          englishHeading={englishResourcesBlock.fields.heading}
          englishSubheading={englishResourcesBlock.fields.subheading}
          englishResourceBlocks={englishResourcesBlock.fields.resourceBlocks}
          spanishHeading={spanishResourcesBlock.fields.heading}
          spanishSubheading={spanishResourcesBlock.fields.subheading}
          spanishResourceBlocks={spanishResourcesBlock.fields.resourceBlocks}
        />
      )}
    </main>
  );
}

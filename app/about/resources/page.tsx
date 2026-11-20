/**
 * @file page.tsx
 */
import { fetchBlocksBySlug, fetchResourceFiles } from "@/lib/contentfulData";
import Content from "@/app/content";

// Must be a literal: Next.js statically analyzes this export (same value as REVALIDATE_TIME)
export const revalidate = 86400;

export const metadata = {
  title: "Resources | Portland Immigrant Rights Coalition",
  description:
    "Access resources from the Portland Immigrant Rights Coalition (PIRC) to support immigrant and refugee communities. Find information on asylum rights, deportation defense, sanctuary law violations, and more.",
};

export default async function Resources() {
  const blocksEnglish = await fetchBlocksBySlug("about/resources", "en-US");
  const blocksSpanish = await fetchBlocksBySlug("about/resources", "es");
  const resourceFiles = await fetchResourceFiles();

  return (
    <main>
      <Content
        key={Math.random()}
        englishBlocks={blocksEnglish}
        spanishBlocks={blocksSpanish}
        resourceFiles={resourceFiles}
      />
    </main>
  );
}

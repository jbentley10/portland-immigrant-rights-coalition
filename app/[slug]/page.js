/**
 * @file [slug]/page.js
 */

// Import depdencies
import {
  fetchBlocksBySlug,
  fetchMetadataBySlug,
  REVALIDATE_TIME,
} from "../../lib/contentfulData";

// Import components
import Content from "../content";

// Enable ISR - revalidate every hour
export const revalidate = REVALIDATE_TIME;

export async function generateMetadata({ params }) {
  const metadata = await fetchMetadataBySlug(params.slug);

  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default async function Page({ params }) {
  // Todo: Build some kind of localization friendly component to show when there
  // are no linked blocks
  const blocksEnglish = await fetchBlocksBySlug(params.slug, "en-US");
  const blocksSpanish = await fetchBlocksBySlug(params.slug, "es");

  return (
    <Content englishBlocks={blocksEnglish} spanishBlocks={blocksSpanish} />
  );
}

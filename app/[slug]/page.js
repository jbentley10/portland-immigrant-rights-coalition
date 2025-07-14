/**
 * @file [slug]/page.js
 */

// Import depdencies
import {
  fetchBlocksBySlug,
  fetchMetadataBySlug,
} from "../../lib/contentfulData";

// Import components
import Content from "../content";

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

/**
 * @file [slug]/page.js
 */

// Import dependencies
import {
  fetchPageBySlug,
  REVALIDATE_TIME,
} from "../../lib/contentfulData";

// Import components
import Content from "../content";

// Enable ISR
export const revalidate = REVALIDATE_TIME;

export async function generateMetadata({ params }) {
  const page = await fetchPageBySlug(params.slug, "en-US");

  return {
    title: page?.englishTitle,
    description: page?.description,
  };
}

export default async function Page({ params }) {
  // Todo: Build some kind of localization friendly component to show when there
  // are no linked blocks
  const [pageEn, pageEs] = await Promise.all([
    fetchPageBySlug(params.slug, "en-US"),
    fetchPageBySlug(params.slug, "es"),
  ]);

  const blocksEnglish = pageEn?.blocks?.filter((b) => b !== undefined) || [];
  const blocksSpanish = pageEs?.blocks?.filter((b) => b !== undefined) || [];

  return (
    <Content englishBlocks={blocksEnglish} spanishBlocks={blocksSpanish} />
  );
}

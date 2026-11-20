/**
 * @file [slug]/page.js
 */

// Import dependencies
import {
  fetchPageBySlug,
} from "../../lib/contentfulData";

// Import components
import Content from "../content";

// Enable ISR
// Must be a literal: Next.js statically analyzes this export (same value as REVALIDATE_TIME)
export const revalidate = 86400;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await fetchPageBySlug(slug, "en-US");

  return {
    title: page?.englishTitle,
    description: page?.description,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  // Todo: Build some kind of localization friendly component to show when there
  // are no linked blocks
  const [pageEn, pageEs] = await Promise.all([
    fetchPageBySlug(slug, "en-US"),
    fetchPageBySlug(slug, "es"),
  ]);

  const blocksEnglish = pageEn?.blocks?.filter((b) => b !== undefined) || [];
  const blocksSpanish = pageEs?.blocks?.filter((b) => b !== undefined) || [];

  return (
    <Content englishBlocks={blocksEnglish} spanishBlocks={blocksSpanish} />
  );
}

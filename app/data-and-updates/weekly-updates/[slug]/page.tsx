/**
 * @file [slug]/page.tsx
 * Dynamic route for individual weekly update pages
 */

import {
  fetchBlocksBySlug,
  fetchMetadataBySlug,
} from "@/lib/contentfulData";
import Content from "@/app/content";
import Heading from "@/components/heading";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const fullSlug = `data-and-updates/weekly-updates/${params.slug}`;
  const metadata = await fetchMetadataBySlug(fullSlug);

  return {
    title: `${metadata?.title || 'Weekly Update'} | Portland Immigrant Rights Coalition`,
    description: metadata?.description || '',
  };
}

function formatDateFromSlug(slug: string): string {
  // Parse slug format YYYY-MM-DD to human-readable format
  const date = new Date(slug);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function WeeklyUpdatePage({ params }: { params: { slug: string } }) {
  const fullSlug = `data-and-updates/weekly-updates/${params.slug}`;
  const formattedDate = formatDateFromSlug(params.slug);

  const blocksEnglish = await fetchBlocksBySlug(fullSlug, "en-US");
  const blocksSpanish = await fetchBlocksBySlug(fullSlug, "es");

  return (
    <main>
      <Heading heading={`Weekly Update for ${formattedDate}`} />
      <Content englishBlocks={blocksEnglish} spanishBlocks={blocksSpanish} />
    </main>
  );
}

/**
 * @file [slug]/page.tsx
 * Dynamic route for individual weekly update pages
 */

import {
  fetchPageBySlug,
  REVALIDATE_TIME,
} from "@/lib/contentfulData";
import Content from "@/app/content";
import Heading from "@/components/heading";

// Enable ISR
export const revalidate = REVALIDATE_TIME;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const fullSlug = `data-and-updates/weekly-updates/${params.slug}`;
  const page = await fetchPageBySlug(fullSlug, "en-US");

  return {
    title: `${page?.englishTitle || 'Weekly Update'} | Portland Immigrant Rights Coalition`,
    description: page?.description || '',
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

  const [pageEn, pageEs] = await Promise.all([
    fetchPageBySlug(fullSlug, "en-US"),
    fetchPageBySlug(fullSlug, "es"),
  ]);

  const blocksEnglish = pageEn?.blocks?.filter((b: any) => b !== undefined) || [];
  const blocksSpanish = pageEs?.blocks?.filter((b: any) => b !== undefined) || [];

  return (
    <main>
      <Heading heading={`Weekly Update for ${formattedDate}`} />
      <Content englishBlocks={blocksEnglish} spanishBlocks={blocksSpanish} />
    </main>
  );
}

/**
 * @file [slug]/page.tsx
 * Dynamic route for individual weekly update pages
 */

import {
  fetchPageBySlug,
} from "@/lib/contentfulData";
import Content from "@/app/content";
import Heading from "@/components/heading";

// Enable ISR
// Must be a literal: Next.js statically analyzes this export (same value as REVALIDATE_TIME)
export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fullSlug = `data-and-updates/weekly-updates/${slug}`;
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

export default async function WeeklyUpdatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fullSlug = `data-and-updates/weekly-updates/${slug}`;
  const formattedDate = formatDateFromSlug(slug);

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

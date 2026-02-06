/**
 * @file page.tsx
 * Index page listing all weekly updates
 */
import { fetchChildPagesBySlug, REVALIDATE_TIME } from "@/lib/contentfulData";
import Link from "next/link";
import Heading from "@/components/heading";

// Enable ISR - revalidate every hour
export const revalidate = REVALIDATE_TIME;

// Set metadata
export const metadata = {
  title: "Weekly Updates | Portland Immigrant Rights Coalition",
  description:
    "Get the latest updates from PIRC with our weekly newsletter, featuring news, events, and ways to get involved.",
};

export default async function WeeklyUpdatesIndex() {
  const childPagesEnglish = await fetchChildPagesBySlug(
    "data-and-updates/weekly-updates",
    "en-US"
  );

  return (
    <main>
      <Heading heading="Weekly Updates" />

      <div className="container mx-auto px-4 py-12">
        <p className="mb-8 text-lg">
          Get the latest updates from PIRC with our weekly newsletter, featuring news, events, and ways to get involved.
        </p>

        <div className="space-y-4">
          {childPagesEnglish && childPagesEnglish.length > 0 ? (
            <ul className="list-none space-y-3">
              {childPagesEnglish.map((page: any) => {
                const slugParts = page.fields.slug.split('/');
                const dateSlug = slugParts[slugParts.length - 1];

                return (
                  <li key={page.sys.id} className="border-b border-gray-200 pb-3">
                    <Link
                      href={`/data-and-updates/weekly-updates/${dateSlug}`}
                      className="text-xl text-primary hover:text-primary/80 underline"
                    >
                      {page.fields.englishTitle}
                    </Link>
                    {page.fields.description && (
                      <p className="mt-2 text-gray-600">{page.fields.description}</p>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500">No weekly updates available at this time.</p>
          )}
        </div>
      </div>
    </main>
  );
}

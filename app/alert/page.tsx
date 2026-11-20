/**
 * @file page.tsx
 */
// Import components and utils
import { fetchBlocksBySlug } from "../../lib/contentfulData";
import Content from "../content";

// Enable ISR - revalidate every hour
// Must be a literal: Next.js statically analyzes this export (same value as REVALIDATE_TIME)
export const revalidate = 86400;

// Set metadata
export const metadata = {
  title: "Alert | Portland Immigrant Rights Coalition",
  description:
    "Alert instructions for volunteers and supporters of the Portland Immigrant Rights Coalition.",
};

export default async function Alert() {
  const blocksEnglish = await fetchBlocksBySlug("alert", "en-US");
  const blocksSpanish = await fetchBlocksBySlug("alert", "es");

  // Wait for the promises to resolve
  const [english, spanish] = await Promise.all([blocksEnglish, blocksSpanish]);

  return (
    <main id='alert-page'>
      <div className='pb-12'>
        <em className='text-primary'>
          888-622-1510 is the PIRC Hotline Number
        </em>
      </div>
      <Content
        key={Math.random()}
        englishBlocks={english}
        spanishBlocks={spanish}
      />
    </main>
  );
}

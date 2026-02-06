/**
 * @file page.tsx
 */
// Import components and utils
import { fetchBlocksBySlug, REVALIDATE_TIME } from "../../lib/contentfulData";
import Content from "../content";

// Enable ISR - revalidate every hour
export const revalidate = REVALIDATE_TIME;

// Set metadata
export const metadata = {
  title: "Terms of Service | Portland Immigrant Rights Coalition",
  description:
    "View our terms of service.",
};

export default async function TermsOfService() {
  const blocksEnglish = await fetchBlocksBySlug("terms-of-service", "en-US");
  const blocksSpanish = await fetchBlocksBySlug("terms-of-service", "es");

  // Wait for the promises to resolve
  const [english, spanish] = await Promise.all([blocksEnglish, blocksSpanish]);

  return (
    <main>
      <Content
        key={Math.random()}
        englishBlocks={english}
        spanishBlocks={spanish}
      />
    </main>
  );
}

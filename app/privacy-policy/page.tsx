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
  title: "Privacy Policy | Portland Immigrant Rights Coalition",
  description: "View our privacy policy.",
};

export default async function PrivacyPolicy() {
  const blocksEnglish = await fetchBlocksBySlug("privacy-policy", "en-US");
  const blocksSpanish = await fetchBlocksBySlug("privacy-policy", "es");

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

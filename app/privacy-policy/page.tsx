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

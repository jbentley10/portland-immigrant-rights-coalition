/**
 * @file page.tsx
 */
// Import components and utils
import { fetchBlocksBySlug } from "../../lib/contentfulData";
import Content from "../content";
import Script from "next/script";

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

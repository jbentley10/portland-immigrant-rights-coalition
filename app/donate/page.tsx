/**
 * @file page.tsx
 */
// Import components and utils
import { fetchBlocksBySlug, REVALIDATE_TIME } from "../../lib/contentfulData";
import Content from "../content";
import Script from "next/script";

// Enable ISR - revalidate every hour
export const revalidate = REVALIDATE_TIME;

// Set metadata
export const metadata = {
  title: "Donate | Portland Immigrant Rights Coalition",
  description:
    "Support the Portland Immigrant Rights Coalition (PIRC) in defending immigrant rights. Your donation helps us provide legal defense, maintain our community hotline, employ dedicated staff, and advocate for immigration justice in Portland.",
};

export default async function Donate() {
  const blocksEnglish = await fetchBlocksBySlug("donate", "en-US");
  const blocksSpanish = await fetchBlocksBySlug("donate", "es");

  // Wait for the promises to resolve
  const [english, spanish] = await Promise.all([blocksEnglish, blocksSpanish]);

  return (
    <main>
      <Script
        src='https://secure.actblue.com/cf/assets/actblue.js'
        async
        data-ab-source='snippet-20240903'
      />
      <Script id={"actblue-config"}>window.actblueConfig = {};</Script>
      <Content
        key={Math.random()}
        englishBlocks={english}
        spanishBlocks={spanish}
      />
    </main>
  );
}

/**
 * @file page.tsx
 */
// Import components and utils
import { fetchBlocksBySlug } from "../../../lib/contentfulData";
import Content from "../../content";
import Script from "next/script";

// Set metadata
export const metadata = {
  title: "Donate | Portland Immigrant Rights Coalition",
  description:
    "Support the Portland Immigrant Rights Coalition (PIRC) in defending immigrant rights. Your donation helps us provide legal defense, maintain our community hotline, employ dedicated staff, and advocate for immigration justice in Portland.",
};

export default async function Donations2026() {
  const blocksEnglish = await fetchBlocksBySlug("donate/donations-2026", "en-US");
  const blocksSpanish = await fetchBlocksBySlug("donate/donations-2026", "es");

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

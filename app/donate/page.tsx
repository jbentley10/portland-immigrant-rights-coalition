/**
 * @file page.tsx
 */
// Import components and utils
import ActBlueDonateForm from "@/components/act-blue-donate-form";
import { fetchBlocksBySlug } from "../../lib/contentfulData";
import Content from "../content";
import Script from "next/script";

// Set metadata
export const metadata = {
  title: process.env.TITLE,
  description: process.env.META_DESCRIPTION,
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
      <ActBlueDonateForm />
    </main>
  );
}

/**
 * @file page.tsx
 */
// Import components and utils
import Content from "../../content";
import Script from "next/script";
import DonationModal from "@/components/donation-modal";
import { fetchAsset } from "@/lib/contentfulData";

// Set metadata
export const metadata = {
  title: "Donate | Portland Immigrant Rights Coalition",
  description:
    "Support the Portland Immigrant Rights Coalition (PIRC) in defending immigrant rights. Your donation helps us provide legal defense, maintain our community hotline, employ dedicated staff, and advocate for immigration justice in Portland.",
};

async function getEnglishBlocks() {
  // Fetch the Contentful asset
  const chartImage = await fetchAsset("1OzUKmmaGUX6Imk32WnHhO");
  const heatmapImage = await fetchAsset("58aWEx94WNhLduR3zHEI0l");

  return [
    {
      sys: {
        id: "heading-1",
        contentType: { sys: { id: "heading" } },
      },
      fields: {
        headingText: "Help Us Answer The Calls"
      },
    },
    {
      sys: {
        id: "large-button-1",
        contentType: { sys: { id: "largeButtonBlock" } },
      },
      fields: {
        buttonText: "Donate Now",
        buttonLink: "#donate",
      },
    },
    {
      sys: {
        id: "actblue-form-1",
        contentType: { sys: { id: "actBlueDonateForm" } },
      },
      fields: {
        heading: null,
        body: "The PIRC line rings hundreds of times a day, and is answered by only a few staff members. We connect callers to critical services like legal help and keeping in touch with family members in detention. Please help us grow to meet the overwhelming need immigrant communities are experiencing.",
        vimeoUrl: "https://vimeo.com/1158529302",
      },
    },
    {
      sys: {
        id: "chart-image-block",
        contentType: { sys: { id: "imageAndTextBlock" } },
      },
      fields: {
        heading: "We connect families dealing with ICE with critical services",
        descriptionRich: "Legal Services, Finding loved ones within detention system, what to do if ICE is knocking on their door, social services and assistance, DV support.",
        imageOnLeft: true,
        image: chartImage,
      },
    },
    {
      sys: {
        id: "heatmap-image-block",
        contentType: { sys: { id: "imageAndTextBlock" } },
      },
      fields: {
        heading: "Detentions in Portland",
        descriptionRich: "",
        imageOnLeft: false,
        image: heatmapImage,
        vimeoUrl: "https://vimeo.com/1158553782",
      },
    },
    {
      sys: {
        id: "actblue-form-2",
        contentType: { sys: { id: "actBlueDonateForm" } },
      },
      fields: {
        heading: "Please donate now",
        body: "",
      },
    },
  ];
}

async function getSpanishBlocks() {
  // Fetch the Contentful asset
  const chartImage = await fetchAsset("1OzUKmmaGUX6Imk32WnHhO");

  return [
    {
      sys: {
        id: "heading-1",
        contentType: { sys: { id: "heading" } },
      },
      fields: {
        headingText: "Ayúdanos a Responder las Llamadas"
      },
    },
    {
      sys: {
        id: "large-button-1",
        contentType: { sys: { id: "largeButtonBlock" } },
      },
      fields: {
        buttonText: "Donar Ahora",
        buttonLink: "#donate",
      },
    },
    {
      sys: {
        id: "actblue-form-1",
        contentType: { sys: { id: "actBlueDonateForm" } },
      },
      fields: {
        heading: null,
        body: "The PIRC line rings hundreds of times a day, and is answered by only a few staff members. We connect callers to critical services like legal help and keeping in touch with family members in detention. Please help us grow to meet the overwhelming need immigrant communities are experiencing.",
        vimeoUrl: "https://vimeo.com/988646039",
      },
    },
    {
      sys: {
        id: "chart-image-block",
        contentType: { sys: { id: "imageAndTextBlock" } },
      },
      fields: {
        heading: "Conectamos a familias que enfrentan ICE con servicios críticos",
        descriptionRich: "Servicios legales, encontrar seres queridos dentro del sistema de detención, qué hacer si ICE está tocando su puerta, servicios sociales y asistencia, apoyo para violencia doméstica.",
        imageOnLeft: true,
        image: chartImage,
      },
    },
  ];
}

export default async function Donations2026() {
  const englishBlocks = await getEnglishBlocks();
  const spanishBlocks = await getSpanishBlocks();

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
        englishBlocks={englishBlocks}
        spanishBlocks={spanishBlocks}
      />
      <DonationModal delaySeconds={2} />
    </main>
  );
}

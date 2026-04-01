/**
 * @file page.tsx
 */
// Import components and utils
import Content from "../../content";
import Script from "next/script";
import DonationModal from "@/components/donation-modal";
import { fetchAsset, REVALIDATE_TIME } from "@/lib/contentfulData";

// Enable ISR
export const revalidate = REVALIDATE_TIME;

// Set metadata
export const metadata = {
  title: "Donate | Portland Immigrant Rights Coalition",
  description:
    "Support the Portland Immigrant Rights Coalition (PIRC) in defending immigrant rights. Your donation helps us provide legal defense, maintain our community hotline, employ dedicated staff, and advocate for immigration justice in Portland.",
};

function makeRichText(paragraphs: string[]) {
  return {
    nodeType: "document",
    data: {},
    content: paragraphs.map((text) => ({
      nodeType: "paragraph",
      data: {},
      content: [{ nodeType: "text", value: text, marks: [], data: {} }],
    })),
  };
}

function getEnglishBlocks(chartImage: any, heatmapImage: any) {
  return [
    {
      sys: {
        id: "heading-1",
        contentType: { sys: { id: "heading" } },
      },
      fields: {
        headingText: "Help Us Answer the Calls",
      },
    },
    {
      sys: {
        id: "large-button-1",
        contentType: { sys: { id: "largeButtonBlock" } },
      },
      fields: {
        buttonText: "Donate Now",
        buttonLink: "#ab-form-container",
      },
    },
    {
      sys: {
        id: "actblue-form-1",
        contentType: { sys: { id: "actBlueDonateForm" } },
      },
      fields: {
        heading: "400 calls a day. 4 staff members.",
        body: makeRichText([
          "To be frank, we can't keep up. That's why we need your help.",
          "From legal help to contacting family members in detention, callers depend on us to connect them to critical services",
          "Your donation allows us to meet the increased demand for critical services so that no call goes unanswered.",
        ]),
        vimeoUrl: "https://vimeo.com/1158529302",
      },
    },
    {
      sys: {
        id: "chart-image-block",
        contentType: { sys: { id: "imageAndTextBlock" } },
      },
      fields: {
        heading: "When ICE is near, we're here to help",
        descriptionRich: makeRichText([
          "Through PIRC, families get help with legal services, social services, DV support, finding loved ones in detention centers, and even what to do if ICE is knocking on their door.",
          "Our goal is to have enough staff to meet the demand for immigrant services in our community.",
        ]),
        imageOnLeft: true,
        image: chartImage,
      },
    },
    {
      sys: {
        id: "donate-now-button",
        contentType: { sys: { id: "largeButtonBlock" } },
      },
      fields: {
        buttonText: "Donate Now",
        buttonLink: "#ab-form-container",
      },
    },
    {
      sys: {
        id: "heatmap-image-block",
        contentType: { sys: { id: "imageAndTextBlock" } },
      },
      fields: {
        heading: "Where ICE is most active",
        descriptionRich: makeRichText([
          "Gresham, Hillsboro, Woodburn, and more—communities across Oregon are experiencing increased detentions. We receive 2,000 calls a week asking us to help locate where loved ones are being held.",
        ]),
        imageOnLeft: false,
        image: heatmapImage,
        vimeoUrl: "https://vimeo.com/1158553782",
        linkText: "SEE THE LATEST NUMBERS",
        linkHref: "https://pirc-links.vercel.app/all_time_heatmap.html",
      },
    },
    {
      sys: {
        id: "actblue-form-2",
        contentType: { sys: { id: "actBlueDonateForm" } },
      },
      fields: {
        heading: null,
        body: makeRichText([
          "Your donation helps us locate and assist detainees being held by ICE.",
          "Our ultimate goal is to reunite them with their family members.",
        ]),
      },
    },
  ];
}

function getSpanishBlocks(chartImage: any) {
  return [
    {
      sys: {
        id: "heading-1",
        contentType: { sys: { id: "heading" } },
      },
      fields: {
        headingText: "Ayúdanos a Responder las Llamadas",
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
        heading:
          "Conectamos a familias que enfrentan ICE con servicios críticos",
        descriptionRich:
          "Servicios legales, encontrar seres queridos dentro del sistema de detención, qué hacer si ICE está tocando su puerta, servicios sociales y asistencia, apoyo para violencia doméstica.",
        imageOnLeft: true,
        image: chartImage,
      },
    },
  ];
}

export default async function Donations2026() {
  const [chartImage, heatmapImage] = await Promise.all([
    fetchAsset("1OzUKmmaGUX6Imk32WnHhO"),
    fetchAsset("58aWEx94WNhLduR3zHEI0l"),
  ]);

  const englishBlocks = getEnglishBlocks(chartImage, heatmapImage);
  const spanishBlocks = getSpanishBlocks(chartImage);

  // Separate header from content
  const englishHeader = [englishBlocks[0]];
  const englishContent = englishBlocks.slice(1);
  const spanishHeader = [spanishBlocks[0]];
  const spanishContent = spanishBlocks.slice(1);

  return (
    <main id='donations-2026-page'>
      <Script
        src='https://secure.actblue.com/cf/assets/actblue.js'
        async
        data-ab-source='snippet-20240903'
      />
      <Script id={"actblue-config"} strategy='afterInteractive'>
        {`window.actblueConfig = {};
        window.addEventListener('message', function(event) {
          if (event.origin.includes('actblue.com')) {
            try {
              var data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
              if (data && data.action === 'submitSuccess' && typeof fbq !== 'undefined') {
                fbq('track', 'Donate', { currency: 'USD', value: data.contribution && data.contribution.amount ? data.contribution.amount / 100 : 0 });
              }
            } catch(e) {}
          }
        });`}
      </Script>
      {/* Meta Pixel Code */}
      <Script id='facebook-pixel' strategy='afterInteractive'>
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1293944558257558');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height='1'
          width='1'
          style={{ display: "none" }}
          src='https://www.facebook.com/tr?id=1495620619240202&ev=PageView&noscript=1'
        />
      </noscript>
      {/* End Meta Pixel Code */}
      <Content
        key={Math.random()}
        englishBlocks={englishHeader}
        spanishBlocks={spanishHeader}
      />
      <div style={{ marginLeft: "2rem", marginRight: "2rem" }}>
        <Content
          key={Math.random()}
          englishBlocks={englishContent}
          spanishBlocks={spanishContent}
        />
      </div>
      <DonationModal delaySeconds={30} />
    </main>
  );
}

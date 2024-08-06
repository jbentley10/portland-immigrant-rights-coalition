/**
 * @file content.tsx
 */
"use client";

// Component that's called from inside page.js
// All it does is look at each content block,
// and assign it the appropriate React component(s)

// Import depdencies
import { useState, useContext, useEffect } from "react";

// Import components
import { LocaleContext } from "./locale-provider";
import Hero from "@/components/hero";
import DividerText from "@/components/divider-text";
import ImageGrid, { ContentfulImage } from "@/components/image-grid";
import OurHistory, { HistoryMilestone } from "@/components/our-history";
import DonationTiers, { Tier } from "@/components/donation-tiers";
import ImageSlides, { SlideFields } from "@/components/image-slides";

const blockByType = (block: any) => {
  // Get the content type from the block content properties
  const contentType = block.sys.contentType.sys.id;

  switch (contentType) {
    case "heroBlock":
      return (
        <Hero
          heading={block.fields.heading}
          subheading={block.fields.subHeading}
          buttonLink={block.fields.buttonLink}
          buttonText={block.fields.buttonText}
        />
      );

    case "dividerTextBlock":
      return <DividerText text={block.fields.text} />;

    case "imageGrid":
      if (block.fields) {
        let fields = block.fields;
        let { image1, image2, image3, image4, image5 } = fields;
        let images: Array<ContentfulImage> = [
          image1,
          image2,
          image3,
          image4,
          image5,
        ];

        return (
          <ImageGrid
            images={images}
            textCallout={block.fields.textCallout}
            subtext={block.fields.subtext}
          />
        );
      }
      return false;

    case "ourHistoryBlock":
      if (block.fields) {
        let { year1, text1, year2, text2, year3, text3, year4, text4 } =
          block.fields;
        let milestones: HistoryMilestone[] = [
          {
            year: year1,
            info: text1,
          },
          {
            year: year2,
            info: text2,
          },
          {
            year: year3,
            info: text3,
          },
          {
            year: year4,
            info: text4,
          },
        ];

        return (
          <OurHistory
            heading={block.fields.heading}
            subheading={block.fields.subheading}
            milestones={milestones}
          />
        );
      }

    case "donationTiersBlock":
      if (block.fields) {
        let tiers: Tier[] = [
          {
            heading: block.fields.tier1Heading,
            subheading: block.fields.tier1Subheading,
            index: 0,
          },
          {
            heading: block.fields.tier2Heading,
            subheading: block.fields.tier2Subheading,
            index: 1,
          },
          {
            heading: block.fields.tier3Heading,
            subheading: block.fields.tier3Subheading,
            index: 2,
          },
        ];

        return (
          <DonationTiers
            heading={block.fields.heading}
            subheading={block.fields.subHeading}
            tiers={tiers}
            buttonText={block.fields.ctaText}
            buttonLink={block.fields.ctaLink}
          />
        );
      }

    case "imageSlidesBlock":
      if (block.fields) {
        let imageSlides = block.fields.imageSlide; // Create an easy-to-read variable for the imageSlide field
        let slideFields: SlideFields[] = []; // Initialize an empty array to store the slides and their fields

        // Map through each imageSlide in Contentful
        imageSlides.forEach(function (slide: { fields: SlideFields }) {
          let { fields } = slide;

          slideFields.push(fields); // Push the fields object to a new array
        });

        return <ImageSlides slides={slideFields} />;
      }

    default:
      return false;
  }
};

interface ContentProps {
  englishBlocks: [];
  spanishBlocks: [];
}

// Component recieves a single array of block objects
export default function Content({
  englishBlocks,
  spanishBlocks,
}: ContentProps) {
  const isEnglish = useContext(LocaleContext);
  const [translatedBlocks, setTranslatedBlocks] = useState(englishBlocks);

  useEffect(() => {
    isEnglish?.isEnglish === true
      ? setTranslatedBlocks(englishBlocks)
      : setTranslatedBlocks(spanishBlocks);
  }, [isEnglish?.isEnglish, englishBlocks, spanishBlocks]);

  return (
    translatedBlocks &&
    translatedBlocks.map((block: any) => {
      return blockByType(block);
    })
  );
}

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

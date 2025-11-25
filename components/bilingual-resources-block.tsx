import React from "react";
import { ContentfulImage } from "./image-grid";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface ResourceFields {
  name: string;
  previewImage: ContentfulImage;
  resource: {
    fields: { title: string; file: { url: string } };
  };
}

interface ResourceBlock {
  metadata: object;
  sys: object;
  fields: ResourceFields;
}

function BilingualResourceCard(props: {
  englishName: string;
  englishImageUrl: string;
  englishResourceUrl: string;
  spanishName: string;
  spanishImageUrl: string;
  spanishResourceUrl: string;
}) {
  return (
    <div className="bg-background px-8 py-10 rounded-md shadow-lg border-primary border-2 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* English Version */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl mb-4 text-center">{props.englishName}</h3>
          <Image
            src={`https:${props.englishImageUrl}`}
            width={150}
            height={194}
            alt={`A preview image of the ${props.englishName} file`}
            className="mb-4"
          />
          <Link target="_blank" href={`https:${props.englishResourceUrl}`}>
            <Button variant="secondary" size="sm">
              Download
            </Button>
          </Link>
        </div>

        {/* Spanish Version */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl mb-4 text-center">{props.spanishName}</h3>
          <Image
            src={`https:${props.spanishImageUrl}`}
            width={150}
            height={194}
            alt={`A preview image of the ${props.spanishName} file`}
            className="mb-4"
          />
          <Link target="_blank" href={`https:${props.spanishResourceUrl}`}>
            <Button variant="secondary" size="sm">
              Descargar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function BilingualResourcesBlock(props: {
  englishHeading: string;
  englishSubheading: string;
  englishResourceBlocks: ResourceBlock[];
  spanishHeading: string;
  spanishSubheading: string;
  spanishResourceBlocks: ResourceBlock[];
}) {

  return (
    <section className="component-spacer component-container text-primary">
      <div className="block-heading mb-12">
        <h2 className="pb-4">
          {props.englishHeading} / {props.spanishHeading}
        </h2>
        <p className="mb-2">{props.englishSubheading}</p>
        <p>{props.spanishSubheading}</p>
      </div>
      <div className="flex flex-col gap-8">
        {props.englishResourceBlocks.map(
          (englishBlock: ResourceBlock, index: number) => {
            const spanishBlock = props.spanishResourceBlocks[index];

            return (
              <BilingualResourceCard
                key={index}
                englishName={englishBlock.fields.name}
                englishImageUrl={englishBlock.fields.previewImage.fields.file.url}
                englishResourceUrl={englishBlock.fields.resource.fields.file.url}
                spanishName={spanishBlock.fields.name}
                spanishImageUrl={spanishBlock.fields.previewImage.fields.file.url}
                spanishResourceUrl={spanishBlock.fields.resource.fields.file.url}
              />
            );
          }
        )}
      </div>
    </section>
  );
}

export default BilingualResourcesBlock;

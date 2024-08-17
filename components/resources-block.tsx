import React from "react";
import { ContentfulImage } from "./image-grid";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

function ResourceCard(props: {
  name: string;
  imageUrl: string;
  resourceUrl: string;
}) {
  return (
    <div
      className={
        "bg-background px-12 py-10 rounded-md shadow-lg border-primary border-2 mr-4 mb-8"
      }
    >
      <h3 className={"text-3xl mb-8"}>{props.name}</h3>
      <Image
        src={`https:${props.imageUrl}`}
        width={150}
        height={194}
        alt={`A preview image of the ${props.name} file`}
        className={"mb-8"}
      />
      <Link target='_blank' href={`https:${props.resourceUrl}`}>
        <Button variant={`secondary`} size={"sm"}>
          Download
        </Button>
      </Link>
    </div>
  );
}

function ResourcesBlock(props: {
  heading: string;
  subheading: string;
  resourceBlocks: [];
}) {
  return (
    <section className={"component-spacer component-container text-primary"}>
      <div className={"block-heading mb-20"}>
        <h2 className={"pb-4"}>{props.heading}</h2>
        <p>{props.subheading}</p>
      </div>
      <div
        className={
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-rows-auto"
        }
      >
        {props.resourceBlocks.map(
          (
            block: {
              metadata: object;
              sys: object;
              fields: {
                name: string;
                previewImage: ContentfulImage;
                resource: {
                  fields: { title: string; file: { url: string } };
                };
              };
            },
            index: number
          ) => (
            <ResourceCard
              key={index}
              name={block.fields.name}
              imageUrl={block.fields.previewImage.fields.file.url}
              resourceUrl={block.fields.resource.fields.file.url}
            />
          )
        )}
      </div>
    </section>
  );
}

export default ResourcesBlock;

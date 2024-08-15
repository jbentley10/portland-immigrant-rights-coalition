import { renderDocument } from "@/lib/renderDocument";
import Image from "next/image";
import React from "react";

function ImageTextBlock(props: {
  image: {
    title: string;
    description: string;
    file: {
      url: string;
      details: { image: { width: number; height: number } };
    };
  };
  heading: string;
  subtext: {};
  imageOnLeft: boolean;
}) {
  return (
    <section
      className={`component-container component-spacer flex ${
        props.imageOnLeft === true ? "flex-row" : "flex-row-reverse"
      } items-center text-primary`}
    >
      <Image
        src={`https:${props.image.file.url}`}
        width={props.image.file.details.image.width}
        height={props.image.file.details.image.height}
        alt={props.image.description}
        className={`${props.imageOnLeft === true ? "mr-24" : "ml-24"}`}
      />
      <div>
        <h2 className={"pb-12"}>{props.heading}</h2>
        <div>{renderDocument(props.subtext)}</div>
      </div>
    </section>
  );
}

export default ImageTextBlock;

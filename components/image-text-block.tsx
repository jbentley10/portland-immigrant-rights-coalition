import { renderDocument } from "@/lib/renderDocument";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

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
  linkHref: string;
  linkText: string;
  imageOnLeft: boolean;
}) {
  return (
    <section
      className={`component-container component-spacer flex ${
        props.imageOnLeft === true
          ? "flex-col md:flex-row"
          : "flex-col-reverse md:flex-row-reverse"
      } items-center text-primary`}
    >
      {props.image && props.image.file && props.image.file.url && (
        <Image
          src={`https:${props.image.file.url}`}
          width={props.image.file.details.image.width}
          height={props.image.file.details.image.height}
          alt={props.image.description}
          className={`${
            props.imageOnLeft === true
              ? "md:mr-24 md:w-1/2"
              : "md:ml-24 md:w-1/2"
          }`}
        />
      )}

      <div className={"md:w-1/2"}>
        {props.heading && <h2 className={"pb-12"}>{props.heading}</h2>}
        <div>{renderDocument(props.subtext)}</div>
        {props && props.linkHref && props.linkText && (
          <Link href={props.linkHref}>
            <Button>{props.linkText}</Button>
          </Link>
        )}
      </div>
    </section>
  );
}

export default ImageTextBlock;

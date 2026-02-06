import { renderDocument } from "@/lib/renderDocument";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function ImageTextBlock(props: {
  image?: {
    title: string;
    description: string;
    file: {
      url: string;
      details: { image: { width: number; height: number } };
    };
  };
  heading?: string;
  subtext: {};
  linkHref?: string;
  linkText?: string;
  imageOnLeft: boolean;
  vimeoUrl?: string;
}) {
  // Extract Vimeo video ID from URL
  const getVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  const vimeoId = props.vimeoUrl ? getVimeoId(props.vimeoUrl) : null;
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
              ? "pb-8 md:pb-0 md:mr-24 md:w-1/2"
              : "pb-8 md:pb-0 md:ml-24 md:w-1/2"
          }`}
        />
      )}

      <div className={props.image ? "md:w-1/2" : "w-full text-center"}>
        {props.heading && <h2 className={"pb-12"}>{props.heading}</h2>}
        <div className={vimeoId ? "pb-8" : ""}>
          {typeof props.subtext === 'string' ? (
            <p>{props.subtext}</p>
          ) : (
            renderDocument(props.subtext)
          )}
        </div>

        {/* Vimeo Video Embed */}
        {vimeoId && (
          <div className="relative w-full mb-8" style={{ paddingBottom: '160%' }}>
            <iframe
              src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
              style={{ border: 0 }}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              className="absolute top-0 left-0 w-full h-full"
              title="Vimeo video"
            ></iframe>
          </div>
        )}

        {props && props.linkHref && props.linkText && (
          <Link target="blank" href={props.linkHref}>
            <Button>{props.linkText}</Button>
          </Link>
        )}
      </div>
    </section>
  );
}

export default ImageTextBlock;

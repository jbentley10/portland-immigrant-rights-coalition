import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export interface SlideFields {
  heading: string;
  subheading: string;
  image: {
    metadata: {};
    sys: {};
    fields: {
      title: string;
      description: string;
      file: {
        url: string;
        details: {
          image: {
            width: number;
            height: number;
          };
        };
        fileName: string;
        contentType: string;
      };
    };
  };
  link: string;
}

function ImageSlide(props: { slide: SlideFields }) {
  return (
    <div className='bg-primary flex flex-column'>
      <div className={"py-16 px-28"}>
        <Image
          src={`https:${props.slide.image.fields.file.url}`}
          alt={props.slide.image.fields.description}
          width={props.slide.image.fields.file.details.image.width}
          height={props.slide.image.fields.file.details.image.height}
        />
      </div>
      <div className='text-left py-24 pr-36'>
        <h2 className='text-primary-foreground pb-7'>{props.slide.heading}</h2>
        <p className='text-primary-foreground mb-16'>
          {props.slide.subheading}
        </p>
        <Link href={props.slide.link}>
          <Button size={"lg"} variant={"secondary"}>
            Read More
          </Button>
        </Link>
      </div>
    </div>
  );
}

function ImageSlides(props: { slides: SlideFields[] }) {
  return (
    <div className={"component-container component-spacer"}>
      {props.slides.map((slide: SlideFields, index: number) => (
        <ImageSlide key={index} slide={slide} />
      ))}
    </div>
  );
}

export default ImageSlides;

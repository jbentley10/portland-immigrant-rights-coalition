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
    <div className='bg-primary flex flex-col md:flex-row md:items-center'>
      <div className={"pt-16 px-12 md:py-12 md:px-14 lg:py-16 lg:px-28"}>
        <Image
          src={`https:${props.slide.image.fields.file.url}`}
          alt={props.slide.image.fields.description}
          width={props.slide.image.fields.file.details.image.width}
          height={props.slide.image.fields.file.details.image.height}
        />
      </div>
      <div className='text-left pt-16 pb-24 pr-4 pl-14 md:py-24 md:pl-0 md:pr-36'>
        <h2 className='text-primary-foreground pb-4 md:pb-7'>
          {props.slide.heading}
        </h2>
        <p className='text-primary-foreground mb-12 md:mb-16'>
          {props.slide.subheading}
        </p>
        {props.slide.link && (
          <Link href={props.slide.link}>
            <Button size={"lg"} variant={"secondary"}>
              Read More
            </Button>
          </Link>
        )}
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

import React from "react";

export interface SlideFields {
  heading: string;
  subheading: string;
  image: {};
  link: string;
}

function ImageSlide(props: { slide: SlideFields }) {
  console.log(props);
  return (
    <div>
      <h2>{props.slide.heading}</h2>
    </div>
  );
}

function ImageSlides(props: { slides: SlideFields[] }) {
  return (
    <div>
      {props.slides.map((slide, index) => (
        <ImageSlide key={index} slide={slide} />
      ))}
    </div>
  );
}

export default ImageSlides;

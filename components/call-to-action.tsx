import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function CallToAction(props: {
  heading: string;
  subheading: string;
  buttonText: string;
  buttonLink: string;
}) {
  return (
    <div
      className={
        "text-center component-container component-spacer flex flex-col items-center"
      }
    >
      <div className={"w-1/2"}>
        <h2 className={"text-primary pb-7"}>{props.heading}</h2>
        <p className={"text-primary mb-20"}>{props.subheading}</p>
      </div>
      <Link href={props.buttonLink}>
        <Button size={"lg"} variant={"default"}>
          {props.buttonText}
        </Button>
      </Link>
    </div>
  );
}

export default CallToAction;

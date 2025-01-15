import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function CallToAction(props: {
  heading: string;
  subheading: string;
  buttonText: string;
  buttonLink: string;
  isPhone: boolean;
}) {
  return (
    <div
      className={
        "text-center component-container component-spacer flex flex-col items-center"
      }
    >
      <div className={"w-3/4 md:w-1/2"}>
        <h2 className={"text-primary pb-7"}>{props.heading}</h2>
        <p className={"text-primary mb-20"}>{props.subheading}</p>
      </div>
      { props.isPhone ?
        <a href={props.buttonLink}>
          <Button size={"lg"} variant={"default"}>
            {props.buttonText}
          </Button>
        </a>
        :
        <Link href={props.buttonLink}>
          <Button size={"lg"} variant={"default"}>
            {props.buttonText}
          </Button>
        </Link>
      }
    </div>
  );
}

export default CallToAction;

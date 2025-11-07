import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function HotlineBlock(props: {
  topLine: string;
  bottomLine: string;
  buttonText: string;
  buttonLink: string;
}) {
  return (
    <div className={"text-center text-primary my-12"}>
      <h2>{props.topLine}</h2>
      <h2 className={"pb-12"}>{props.bottomLine}</h2>
      <Link href="https://google.com">
        <Button>Test!</Button>
      </Link>
    </div>
  );
}

export default HotlineBlock;

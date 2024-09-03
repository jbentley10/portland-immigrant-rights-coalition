import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

function ActBlueDonateForm(props: { heading: string; body: string }) {
  return (
    <div className={"flex component-container component-spacer"}>
      <div className={"copy w-1/2 text-primary"}>
        <h2>{props.heading}</h2>
        <p>{props.body}</p>
      </div>
      <div
        data-ab-form
        data-ab-token='fQK9Xh3Faz9cA2XBqfBLKMaF'
        data-ab-height='auto'
        className={"w-1/2"}
      >
        <Link
          target='_blank'
          href='https://secure.actblue.com/donate/donate-for-santuary'
        >
          <Button>Donate</Button>
        </Link>
      </div>
    </div>
  );
}

export default ActBlueDonateForm;

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { renderDocument } from "@/lib/renderDocument";

function ActBlueDonateForm(props: { heading: string; body: any }) {
  return (
    <div
      className={
        "flex flex-col md:flex-row component-container component-spacer"
      }
    >
      <div className={"copy w-full md:w-1/2 text-primary pb-8 md:pb-0"}>
        <h2 className='pb-8'>{props.heading}</h2>
        <div>{renderDocument(props.body)}</div>
      </div>
      <div
        data-ab-form
        data-ab-token='fQK9Xh3Faz9cA2XBqfBLKMaF'
        data-ab-height='auto'
        className={"w-full md:w-1/2"}
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

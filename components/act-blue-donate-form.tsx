import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { renderDocument } from "@/lib/renderDocument";

function ActBlueDonateForm(props: {
  heading: string;
  body: any;
  vimeoUrl?: string;
}) {
  // Extract Vimeo video ID from URL
  const getVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  const vimeoId = props.vimeoUrl ? getVimeoId(props.vimeoUrl) : null;

  return (
    <div
      id="donate"
      className={
        `flex flex-col md:flex-row ${!vimeoId ? "component-container component-spacer" : ""}`
      }
    >
      <div className={"copy w-full md:w-1/2 text-primary pb-8 md:pb-0 md:pr-8"}>
        {/* Heading */}
        {props.heading && <h2 className="pb-8">{props.heading}</h2>}

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

        {/* Body Text */}
        {props.body && (
          <div className="component-container">
            {typeof props.body === 'string' ? (
              <p className="text-lg">{props.body}</p>
            ) : (
              renderDocument(props.body)
            )}
          </div>
        )}
      </div>
      <div
        data-ab-form
        data-ab-token="fQK9Xh3Faz9cA2XBqfBLKMaF"
        data-ab-height="auto"
        className={"w-full md:w-1/2"}
        id="ab-form-container"
      >
        <Link
          target="_blank"
          href="https://secure.actblue.com/donate/donate-for-santuary"
        >
          <Button>Donate</Button>
        </Link>
      </div>
    </div>
  );
}

export default ActBlueDonateForm;

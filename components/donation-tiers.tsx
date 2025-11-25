import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface DonationTiersContent {
  heading: string;
  subheading: string;
  tiers: Tier[];
  buttonText: string;
  buttonLink: string;
}

export interface Tier {
  index: number;
  heading: string;
  subheading: string;
}

function Tier(tier: Tier) {
  let { index, heading, subheading } = tier;
  let dollar: string = index == 0 ? "$" : index == 1 ? "$$" : "$$$";

  return (
    <div
      className={
        "flex flex-col items-center md:items-start mb-12 md:mr-12 md:mb-0"
      }
    >
      <span
        className={
          "text-primary text-5xl md:text-7xl font-extrabold text-center pb-6 xl:pb-8 xl:pt-16"
        }
      >
        {dollar}
      </span>
      <h3 className={"text-2xl xl:text-3xl text-primary pb-2"}>{heading}</h3>
      <p className={"text-primary text-center md:text-left"}>{subheading}</p>
    </div>
  );
}

function DonationTiers(props: DonationTiersContent) {
  let { heading, subheading, tiers, buttonText, buttonLink } = props;

  return (
    <div className={"component-container"}>
      <div className={"text-center"}>
        <h2 className={"text-primary"}>{heading}</h2>
        <p className={"text-primary"}>{subheading}</p>
      </div>
      <div className={"flex flex-col md:flex-row justify-center mt-14"}>
        {tiers.map((tier) => (
          <Tier
            index={tier.index}
            key={tier.index}
            heading={tier.heading}
            subheading={tier.subheading}
          />
        ))}
      </div>
      <div className={"flex justify-center mt-14"}>
        <Link href={buttonLink}>
          <Button size={"lg"} variant={"default"}>
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default DonationTiers;
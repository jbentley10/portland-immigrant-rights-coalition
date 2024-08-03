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
    <div className={"flex flex-col mr-12"}>
      <span className={"text-primary text-7xl font-extrabold text-center pb-6"}>
        {dollar}
      </span>
      <h3 className={"lg:text-2xl text-primary pb-2"}>{heading}</h3>
      <p className={"text-primary"}>{subheading}</p>
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
      <div className={"flex flex-row justify-center mt-14"}>
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
        <Button size={"lg"} variant={"default"}>
          <Link href={buttonLink} />
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default DonationTiers;

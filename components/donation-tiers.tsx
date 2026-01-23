import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  DollarSign,
  Heart,
  Award,
  Crown,
  Star,
  Gift,
  Sparkles,
  BadgeCheck,
  TrendingUp,
  Users,
  HandHeart,
  CircleDollarSign
} from "lucide-react";
import { parseMarkdownLinks } from "@/lib/parseMarkdownLinks";

export type TierIconType =
  | "DollarSign"
  | "Heart"
  | "Award"
  | "Crown"
  | "Star"
  | "Gift"
  | "Sparkles"
  | "BadgeCheck"
  | "TrendingUp"
  | "Users"
  | "HandHeart"
  | "CircleDollarSign";

const iconMap = {
  DollarSign,
  Heart,
  Award,
  Crown,
  Star,
  Gift,
  Sparkles,
  BadgeCheck,
  TrendingUp,
  Users,
  HandHeart,
  CircleDollarSign
};

interface DonationTiersContent {
  heading: string;
  subheading: string;
  tiers: Tier[];
  buttonText: string;
  buttonLink: string;
}

export interface Tier {
  icon: TierIconType;
  heading: string;
  subheading: string;
}

function Tier(tier: Tier) {
  let { icon, heading, subheading } = tier;
  const Icon = iconMap[icon] || DollarSign; // Fallback to DollarSign if icon not found

  return (
    <div
      className={
        "flex flex-col items-center md:items-start mb-12 md:mr-12 md:mb-0"
      }
    >
      <div
        className={
          "text-primary text-center pb-6 xl:pb-8 xl:pt-16"
        }
      >
        <Icon className="w-20 h-20 md:w-28 md:h-28" strokeWidth={1.5} />
      </div>
      <h3 className={"text-2xl xl:text-3xl text-primary pb-2"}>{heading}</h3>
      <p className={"text-primary text-center md:text-left"}>{parseMarkdownLinks(subheading)}</p>
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
        {tiers.map((tier, index) => (
          <Tier
            key={index}
            icon={tier.icon}
            heading={tier.heading}
            subheading={tier.subheading}
          />
        ))}
      </div>
      {buttonLink && buttonText && (
        <div className={"flex justify-center mt-14"}>
          <Link href={buttonLink}>
            <Button size={"lg"} variant={"default"}>
              {buttonText}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default DonationTiers;
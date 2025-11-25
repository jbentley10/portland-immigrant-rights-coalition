import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "lucide-react";

interface IconCalloutSectionProps {
  heading: string;
  subheading: string;
  items: CalloutItem[];
  buttonText?: string;
  buttonLink?: string;
}

export type SocialIcon = "Facebook" | "Twitter" | "Instagram";

export interface CalloutItem {
  icon: SocialIcon;
  heading: string;
  body: string;
  buttonText?: string;
  buttonLink?: string;
}

const iconMap = {
  Facebook: FacebookIcon,
  Twitter: TwitterIcon,
  Instagram: InstagramIcon,
};

function CalloutCard({
  icon,
  heading,
  body,
  buttonText,
  buttonLink,
}: CalloutItem) {
  const IconComponent = iconMap[icon];

  return (
    <div
      className={
        "flex component-container flex-col items-center md:items-start mb-12 md:mr-12 md:mb-0"
      }
    >
      <div
        className={
          "text-primary text-5xl md:text-7xl font-extrabold text-center pb-6 xl:pb-8 xl:pt-16"
        }
      >
        <IconComponent className="w-16 h-16 md:w-20 md:h-20" />
      </div>
      <h3 className={"text-2xl xl:text-3xl text-primary pb-2"}>{heading}</h3>
      <p className={"text-primary text-center md:text-left"}>{body}</p>
      {buttonText && buttonLink && (
        <div className="mt-4">
          <Link target="_blank" href={buttonLink}>
            <Button size="sm" variant="outline">
              {buttonText}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

function IconCalloutSection(props: IconCalloutSectionProps) {
  let { heading, subheading, items, buttonText, buttonLink } = props;

  return (
    <div className={"component-container"}>
      <div className={"text-center"}>
        <h2 className={"text-primary"}>{heading}</h2>
        <p className={"text-primary"}>{subheading}</p>
      </div>
      <div className={"flex flex-col md:flex-row justify-center mt-14"}>
        {items.map((item, index) => (
          <CalloutCard
            key={index}
            icon={item.icon}
            heading={item.heading}
            body={item.body}
            buttonText={item.buttonText}
            buttonLink={item.buttonLink}
          />
        ))}
      </div>
      {buttonText && buttonLink && (
        <div className={"flex justify-center mt-14"}>
          <Link target="_blank" href={buttonLink}>
            <Button size={"lg"} variant={"default"}>
              {buttonText}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default IconCalloutSection;

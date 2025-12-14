"use client";
import { DesktopNavigationLink } from "./desktop-navigation-link";
import { MobileNavigationLink } from "./mobile-navigation-link";

// Link list structure with support for child pages
let linkList = [
  {
    name: "About",
    url: "/about",
    childPages: [
      {
        name: "Hotline",
        url: "/about/hotline",
      },
      {
        name: "Events",
        url: "/about/events",
      },
    ],
  },
  {
    name: "What We Do",
    url: "/what-we-do",
    childPages: [
      {
        name: "Weekly Updates",
        url: "/what-we-do/weekly-updates",
      },
    ],
  },
  {
    name: "Get Involved",
    url: "/get-involved",
  },
  {
    name: "Donate",
    url: "/donate",
  },
  {
    name: "Resources",
    url: "/resources",
  },
];

export const Links = (props: {
  orientation: "horizontal" | "vertical";
  size: "large" | "small" | "mobile";
  onLinkClick?: () => void;
  showChildPages?: boolean;
}) => {
  const getClassName = () => {
    if (props.size === "small") {
      return "font-light text-xs lg:text-sm xl:text-base";
    } else if (props.size === "mobile") {
      return "font-bold text-white block py-3 text-2xl leading-6 min-h-[24px]";
    } else {
      return "font-regular text-base sm:text-base md:text-xl lg:text-2xl xl:text-2xl antonio pb-8";
    }
  };

  const containerClassName =
    props.orientation === "horizontal"
      ? "flex flex-row items-center"
      : props.size === "mobile"
      ? "flex flex-col space-y-2"
      : "flex flex-col pb-2";

  const linkClassName = `
    hover:opacity-50 text-white
    ${props.size === "mobile" ? "" : "mr-2 sm:mr-4 lg:mr-5 xl:mr-6"}
    ${getClassName()}
  `;

  // Use different navigation components based on size
  const isMobile = props.size === "mobile";

  return (
    <div className={containerClassName}>
      {linkList.map((link, index) =>
        isMobile ? (
          <MobileNavigationLink
            key={index}
            name={link.name}
            url={link.url}
            childPages={
              props.showChildPages !== false ? link.childPages : undefined
            }
            className={linkClassName}
            onLinkClick={props.onLinkClick}
          />
        ) : (
          <DesktopNavigationLink
            key={index}
            name={link.name}
            url={link.url}
            childPages={
              props.showChildPages !== false ? link.childPages : undefined
            }
            className={linkClassName}
          />
        )
      )}
      <a
        className={`
          text-white
          ${props.size === "mobile" ? "" : "mr-2 sm:mr-4 lg:mr-5 xl:mr-6"}
          ${getClassName()}
        `}
        href={"tel:+18886221510"}
        onClick={props.onLinkClick}
      >
        Hotline (888) 622-1510
      </a>
    </div>
  );
};

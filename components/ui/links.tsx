import Link from "next/link";

let linkList = [
  {
    name: "About",
    url: "/about",
  },
  {
    name: "What We Do",
    url: "/what-we-do",
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
  }
];

export const Links = (props: {
  orientation: "horizontal" | "vertical";
  size: "large" | "small" | "mobile";
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

  const containerClassName = props.orientation === "horizontal" 
    ? "flex flex-row" 
    : props.size === "mobile" 
      ? "flex flex-col space-y-2" 
      : "flex flex-row sm:flex-col";

  return (
    <div className={containerClassName}>
      {linkList.map((link, index) => (
        <Link
          key={index}
          className={`
            hover:opacity-50 text-white 
            ${props.size === "mobile" ? "" : "mr-2 sm:mr-4 lg:mr-5 xl:mr-6"}
            ${getClassName()}
          `}
          href={link.url}
        >
          {link.name}
        </Link>
      ))}
      <a className={`
          text-white 
            ${props.size === "mobile" ? "" : "mr-2 sm:mr-4 lg:mr-5 xl:mr-6"}
            ${getClassName()}
          `} 
        href={'tel:+18886221510'}>Hotline (888) 622-1510</a>
    </div>
  );
};

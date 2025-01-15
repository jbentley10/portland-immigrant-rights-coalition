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
  size: "large" | "small";
}) => {
  return (
    <div
      className={
        props.orientation == "horizontal"
          ? "flex flex-row"
          : "flex flex-row sm:flex-col"
      }
    >
      {linkList.map((link, index) => (
        <Link
          key={index}
          className={`
            hover:opacity-50 mr-2 sm:mr-4 lg:mr-5 xl:mr-6 text-white 
            ${
              props.size == "small"
                ? "font-light text-xs lg:text-sm xl:text-base"
                : "font-regular text-base sm:text-base md:text-xl lg:text-2xl xl:text-2xl antonio pb-8"
            }
          `}
          href={link.url}
        >
          {link.name}
        </Link>
      ))}
      <a className={`
            hover:opacity-50 mr-2 sm:mr-4 lg:mr-5 xl:mr-6 text-white 
            ${
              props.size == "small"
                ? "font-light text-xs lg:text-sm xl:text-base"
                : "font-regular text-base sm:text-base md:text-xl lg:text-2xl xl:text-2xl antonio pb-8"
            }
          `} 
        href={'tel:+18886221510'}>Hotline (888) 622-1510</a>
    </div>
  );
};

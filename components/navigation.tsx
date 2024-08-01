import Image from "next/image";
import Link from "next/link";

export const Navigation = () => {
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
    },
  ];

  function Links(): JSX.Element {
    return (
      <>
        {linkList.map((link, index) => (
          <Link
            key={index}
            className='hover:opacity-50 mr-2 sm:mr-4 lg:mr-5 xl:mr-6 font-light text-white text-xs lg:text-sm xl:text-base'
            href={link.url}
          >
            {link.name}
          </Link>
        ))}
      </>
    );
  }

  return (
    <nav className='component-container sm:pt-10 md:pt-11 m-0 bg-nav drop-shadow flex flex-col md:flex-row items-center justify-between xs:justify-end'>
      <section className='w-full md:w-1/2' id='logo'>
        <Image src='/logo.svg' width='100' height='95' alt='logo' />
      </section>
      <section
        className='w-full pt-4 pb-8 md:py-0 md:w-1/2 flex flex-row justify-start'
        id='links-and-phone'
      >
        <div className='' id='links'>
          <Links />
        </div>
      </section>
    </nav>
  );
};

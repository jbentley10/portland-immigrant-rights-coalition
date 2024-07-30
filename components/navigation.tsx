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
            className='hover:opacity-50 md:mr-6 sm:mr-4 xs:mr-2 font-semibold lg:text-base sm:text-xs xs:text-xs'
            href={link.url}
          >
            {link.name}
          </Link>
        ))}
      </>
    );
  }

  return (
    <nav className='bg-nav drop-shadow flex flex-row items-center justify-between xs:justify-end lg:py-8 md:py-10 sm:py-8 xs:py-6'>
      <section
        className='md:w-1/4 sm:w-2/6 xs:w-1/4 lg:pl-16 md:pl-24 sm:pl-8 xs:pl-4'
        id='logo'
      >
        <Image src='/logo.svg' width='200' height='95' alt='logo' />
      </section>
      <section
        className='md:w-3/4 sm:w-4/6 xs:w-3/4 flex flex-row xs:justify-end md:space-evenly lg:justify-end align-center items-center lg:pr-16 md:pr-24 sm:pr-2 xs:pr-4'
        id='links-and-phone'
      >
        <div
          className='text-white font-medium xs:mr-2 sm:mr-11 lg:mr-28'
          id='links'
        >
          <Links />
        </div>
      </section>
    </nav>
  );
};

"use client";
import Image from "next/image";

export const MinimalNavigation = () => {
  return (
    <nav className='atf-container sm:pt-10 md:pt-11 m-0 bg-nav drop-shadow flex flex-col md:flex-row items-center justify-between'>
      <section className='w-full flex items-center justify-between' id='logo'>
        <div className="cursor-default">
          <Image src='/logo.svg' width='100' height='95' alt='logo' />
        </div>
      </section>
    </nav>
  );
};

"use client";
import Image from "next/image";
import { Links } from "./ui/links";
import { MobileNavPanel } from "./ui/mobile-nav-panel";
import Link from "next/link";
import { useState } from "react";

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
    <nav className='atf-container sm:pt-10 md:pt-11 m-0 bg-nav drop-shadow flex flex-col md:flex-row items-center justify-between xs:justify-end' style={{ overflow: 'visible' }}>
      <section className='w-full md:w-1/2 flex items-center justify-between' id='logo'>
        <Link href={"/"}>
          <Image src='/logo.svg' width='100' height='95' alt='logo' />
        </Link>
        
        {/* Hamburger menu button - only visible on mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </section>
      
      {/* Desktop navigation */}
      <section
        className='hidden md:flex w-full pt-4 pb-8 md:py-0 md:w-1/2 flex-row justify-start'
        id='links-and-phone'
        style={{ overflow: 'visible' }}
      >
        <div className='' id='links' style={{ overflow: 'visible' }}>
          <Links orientation='horizontal' size='small' showChildPages={true} />
        </div>
      </section>
    </nav>
    
    {/* Mobile navigation panel - separate component */}
    <MobileNavPanel 
      isOpen={isMobileMenuOpen} 
      onClose={toggleMobileMenu} 
    />
  </>
  );
};

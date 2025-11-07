"use client";
import Link from "next/link";
import { useState } from "react";

interface ChildPage {
  name: string;
  url: string;
}

interface DesktopNavigationLinkProps {
  name: string;
  url: string;
  childPages?: ChildPage[];
  className?: string;
}

export const DesktopNavigationLink = ({
  name,
  url,
  childPages,
  className = "",
}: DesktopNavigationLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // If no child pages, render a simple link
  if (!childPages || childPages.length === 0) {
    return (
      <Link href={url} className={className}>
        {name}
      </Link>
    );
  }

  // If has child pages, render with dropdown
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={url} className={`${className} inline-block`}>
        {name}
        <span className="ml-1">▾</span>
      </Link>

      {/* Dropdown menu - absolutely positioned to not affect layout */}
      {isHovered && (
        <div
          className="absolute left-1/2 bg-nav shadow-lg rounded-md min-w-[200px] py-2 whitespace-nowrap"
          style={{
            top: '100%',
            marginTop: '8px',
            zIndex: 9999,
          }}
        >
          {childPages.map((childPage, index) => (
            <Link
              key={index}
              href={childPage.url}
              className="block px-4 py-2 text-white hover:bg-opacity-80 hover:opacity-70 text-sm whitespace-nowrap"
            >
              {childPage.name}
            </Link>

          ))}
        </div>
      )}
    </div>
  );
};
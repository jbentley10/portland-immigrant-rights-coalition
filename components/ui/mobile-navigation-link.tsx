"use client";
import Link from "next/link";
import { useState } from "react";

interface ChildPage {
  name: string;
  url: string;
}

interface MobileNavigationLinkProps {
  name: string;
  url: string;
  childPages?: ChildPage[];
  className?: string;
  onLinkClick?: () => void;
}

export const MobileNavigationLink = ({
  name,
  url,
  childPages,
  className = "",
  onLinkClick,
}: MobileNavigationLinkProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // If no child pages, render a simple link
  if (!childPages || childPages.length === 0) {
    return (
      <Link href={url} className={className} onClick={onLinkClick}>
        {name}
      </Link>
    );
  }

  // If has child pages, render with accordion
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <Link href={url} className={className} onClick={onLinkClick}>
          {name}
        </Link>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white p-2 ml-2"
          aria-label={`Toggle ${name} submenu`}
        >
          <span className="text-xl">{isExpanded ? "−" : "+"}</span>
        </button>
      </div>

      {/* Accordion content */}
      {isExpanded && (
        <div className="pl-4 mt-2 space-y-2">
          {childPages.map((childPage, index) => (
            <Link
              key={index}
              href={childPage.url}
              className="block text-white text-lg py-2 hover:opacity-70"
              onClick={onLinkClick}
            >
              {childPage.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
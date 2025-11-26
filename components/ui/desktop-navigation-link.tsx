"use client";
import Link from "next/link";
import { useRef, useId } from "react";

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
  const popoverId = useId();
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // If no child pages, render a simple link
  if (!childPages || childPages.length === 0) {
    return (
      <Link href={url} className={className}>
        {name}
      </Link>
    );
  }

  // Show popover on mouse enter
  const handleMouseEnter = () => {
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    if (popoverRef.current && triggerRef.current) {
      try {
        // Get the position of the trigger element
        const triggerRect = triggerRef.current.getBoundingClientRect();

        // Position the popover beneath the trigger
        popoverRef.current.style.position = 'fixed';
        popoverRef.current.style.left = `${triggerRect.left}px`;
        popoverRef.current.style.top = `${triggerRect.bottom + 4}px`;

        popoverRef.current.showPopover();
      } catch (e) {
        // Fallback if popover API not supported
        console.warn('Popover API not supported');
      }
    }
  };

  // Hide popover on mouse leave with a small delay
  const handleMouseLeave = () => {
    // Add a small delay before hiding to allow mouse to move to popover
    hideTimeoutRef.current = setTimeout(() => {
      if (popoverRef.current) {
        try {
          popoverRef.current.hidePopover();
        } catch (e) {
          // Fallback if popover API not supported
        }
      }
    }, 150);
  };

  // If has child pages, render with popover dropdown
  return (
    <div
      ref={triggerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={url} className={`${className} inline-block`}>
        {name}
        <span className="ml-1">▾</span>
      </Link>

      {/* Popover dropdown menu */}
      <div
        ref={popoverRef}
        id={popoverId}
        // @ts-ignore - popover attribute is valid but not in TypeScript types yet
        popover="manual"
        className="bg-white shadow-xl rounded-lg min-w-[200px] whitespace-nowrap m-0 border border-gray-200"
        style={{
          padding: '0.5rem',
          backdropFilter: 'blur(8px)',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {childPages.map((childPage, index) => (
          <Link
            key={index}
            href={childPage.url}
            className="block px-4 py-2.5 text-nav hover:bg-gray-100 rounded-md text-xs whitespace-nowrap transition-colors duration-200 font-medium"
          >
            {childPage.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./navigation";
import { MinimalNavigation } from "./minimal-navigation";

export default function NavigationWrapper() {
  const pathname = usePathname();

  // Use minimal navigation for donations-2026 page
  if (pathname === "/donate/donations-2026") {
    return <MinimalNavigation />;
  }

  return <Navigation />;
}

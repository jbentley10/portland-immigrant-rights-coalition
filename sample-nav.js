/**
 * @file navigation.js
 */
"use client";

// Import dependencies
import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LocaleContext } from "./locale-provider";

// Import MUI components
import {
  Container,
  IconButton,
  Toolbar,
  Box,
  AppBar,
  Menu,
} from "@mui/material";

// Import icons
import MenuIcon from "@mui/icons-material/Menu";

// Import styles
import DesktopNavigationLink from "./desktop-navigation-link";
import MobileNavigationLink from "./mobile-navigation-link";

// Navigation gets a single prop (pages) which contains an
// array with all the info required to generate a navigation menu
const Navigation = ({ pages }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [accordionExpanded, setAccordionExpanded] = useState(false);

  const isEnglish = useContext(LocaleContext);

  // Don't reneder component unless we have pages
  if (!pages || pages.length <= 0) return false;

  // Open and close the accordion on mobile
  const handleAccordionChange = (panel) => (event, isAccordionExpanded) => {
    setAccordionExpanded(isAccordionExpanded ? panel : false);
  };

  // Open and close navigation when elements are clicked
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Sort pages alphabetically (in the current language)
  const sortPagesAlpha = (a, b) => {
    if (isEnglish.isEnglish) {
      // Sort by english titles
      if (a.englishTitle < b.englishTitle) return -1;
      if (a.englishTitle > b.englishTitle) return 1;
      return 0;
    } else {
      // Sort by spanish titles
      if (a.spanishTitle < b.spanishTitle) return -1;
      if (a.spanishTitle > b.spanishTitle) return 1;
      return 0;
    }
  };

  // THEN
  // Sort pages based on their order field
  const sortPagesOrder = (a, b) => {
    // Find out if A and B have order fields
    // if not, they are "Infinity" so they always end up last
    const aOrder = a.order ? a.order : Infinity;
    const bOrder = b.order ? b.order : Infinity;

    if (aOrder < bOrder) return -1;
    if (aOrder > bOrder) return 1;

    // Order numbers are equal or neither has an order,
    // their order should not change
    return 0;
  };

  pages.sort(sortPagesAlpha);
  pages.sort(sortPagesOrder);

  return (
    <div className="navigation-wrapper">
      <AppBar position="fixed" className="app-bar">
        <Container maxWidth="xl">
          <Toolbar disableGutters className="site-navigation">
            {/* Desktop styles */}
            <div className="logo">
              <Link href="/" passHref>
                <Image
                  alt={`Pueblo Unido PDX logo`}
                  src={`/images/logo.svg`}
                  fill={true}
                />
              </Link>
            </div>

            <div className="navigation-list">
              {pages.map(
                (page) =>
                  page.slug !== "home" &&
                  page.slug !== "manifest.json" &&
                  page.slug !== undefined &&
                  page.topLevelPage === true && (
                    <div key={page.slug}>
                      <DesktopNavigationLink
                        slug={page.slug}
                        title={
                          isEnglish.isEnglish
                            ? page.englishTitle
                            : page.spanishTitle
                        }
                        childPages={page.childPages ? page.childPages : null}
                        handleCloseNavMenu={handleCloseNavMenu}
                      />
                    </div>
                  )
              )}
            </div>

            {/* Mobile styles */}
            <Box
              sx={{
                flexGrow: 1,
                justifyContent: "flex-end",
                display: { xs: "flex", tablet: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", tablet: "none" },
                }}
                // Prevent padding from being added to header and body when popover is open
                // https://stackoverflow.com/a/64313913
                disableScrollLock={true}
              >
                {pages.map(
                  (page) =>
                    page.slug !== "home" &&
                    page.slug !== "manifest.json" &&
                    page.slug !== undefined &&
                    page.topLevelPage === true && (
                      <MobileNavigationLink
                        key={page.slug}
                        handleAccordionChange={handleAccordionChange}
                        accordionExpanded={accordionExpanded}
                        slug={page.slug}
                        title={
                          isEnglish.isEnglish
                            ? page.englishTitle
                            : page.spanishTitle
                        }
                        childPages={page.childPages ? page.childPages : null}
                        handleCloseNavMenu={handleCloseNavMenu}
                        anchorElNav={anchorElNav}
                        handleOpenNavMenu={handleOpenNavMenu}
                      />
                    )
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div className="navigation-spacer"/>
    </div>
  );
};
export default Navigation;
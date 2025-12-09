/**
 * @file floating-action-button.tsx
 */
"use client";

// Import dependencies
import React from "react";
import { useLocale } from "../app/locale-provider";
import { GrLanguage } from "react-icons/gr";
import { Button } from "./ui/button";

const FloatingActionButton: React.FC = () => {
  const { isEnglish, setIsEnglish } = useLocale();

  return (
    <div
      className={
        "floating-action-button fixed bottom-5 right-5 lg:bottom-14 lg:right-14 xs:bottom-9 xs:right-9 z-[60]"
      }
    >
      <Button
        aria-label="toggle language"
        onClick={() => setIsEnglish((oldValue: boolean) => !oldValue)}
        variant={"secondary"}
        size={"sm"}
      >
        <GrLanguage className={"mr-2"} />
        {isEnglish ? "Leer en Español" : "Read in English"}
      </Button>
    </div>
  );
};

export default FloatingActionButton;

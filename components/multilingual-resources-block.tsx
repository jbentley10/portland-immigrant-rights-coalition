"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { LANGUAGES } from "@/lib/languages";

interface ResourceFile {
  url: string;
  title: string;
}

interface ResourcesByLanguage {
  [langCode: string]: ResourceFile[];
}

function toTitle(fileBase: string): string {
  return fileBase
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function parseResourceFiles(rawAssets: any[]): ResourcesByLanguage {
  const result: ResourcesByLanguage = {};

  for (const asset of rawAssets) {
    const rawFileName: string = asset.fields?.file?.fileName ?? "";
    const title: string = asset.fields?.title ?? "";
    const url: string = asset.fields?.file?.url ?? "";

    // Strip folder path if present (e.g. "folder/file.pdf" → "file.pdf")
    const fileName = rawFileName.split("/").pop() ?? rawFileName;

    // Use filename if it has a language suffix, otherwise fall back to title
    const source = fileName.includes("--") ? fileName.replace(/\.[^.]+$/, "") : title;

    if (!source.includes("--")) continue;

    const dashIndex = source.lastIndexOf("--");
    const fileBase = source.slice(0, dashIndex);
    const langCode = source.slice(dashIndex + 2);
    if (!langCode) continue;

    if (!result[langCode]) result[langCode] = [];
    result[langCode].push({ url, title: toTitle(fileBase) });
  }

  return result;
}

function MultilingualResourcesBlock(props: {
  heading: string;
  subheading: string;
  rawAssets: any[];
}) {
  const resourcesByLanguage = parseResourceFiles(props.rawAssets);

  const availableLanguages = LANGUAGES.filter(
    (lang) => resourcesByLanguage[lang.code]
  );

  const [selectedCode, setSelectedCode] = useState(
    availableLanguages[0]?.code ?? ""
  );

  const selected = resourcesByLanguage[selectedCode];

  return (
    <section className="component-spacer component-container text-primary">
      <div className="block-heading mb-12">
        <h2 className="pb-4">{props.heading}</h2>
        <p>{props.subheading}</p>
      </div>

      <div className="mb-10">
        <label
          htmlFor="language-select"
          className="block text-sm font-medium mb-2"
        >
          Select a language
        </label>
        <select
          id="language-select"
          value={selectedCode}
          onChange={(e) => setSelectedCode(e.target.value)}
          className="border-2 border-primary rounded-md px-4 py-2 bg-background text-primary text-base focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {availableLanguages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {selected && selected.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {selected.map((file, i) => (
            <div
              key={i}
              className="bg-background px-8 py-10 rounded-md shadow-lg border-primary border-2 flex flex-col items-start"
            >
              <h3 className="text-2xl mb-6">{file.title}</h3>
              <Link target="_blank" href={`https:${file.url}`}>
                <Button variant="secondary" size="sm">
                  Download
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MultilingualResourcesBlock;

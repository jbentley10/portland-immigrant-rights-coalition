import React, { useState } from "react";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";

function UpdateBanner({ header, copy }: { header: string; copy?: Document }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-popover text-center p-4 sticky bottom-0 left-0 w-full z-50 transition-all duration-300 pb-14 lg:pb-24 xl:pb-4">
      <button
        className="flex items-center justify-center w-full focus:outline-none"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        aria-controls="update-banner-content"
      >
        <h3 className="text-xl font-bold mb-0 mr-2">{header}</h3>
        <span
          className={`transform transition-transform duration-200 relative top-[1px] ${
            expanded ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {expanded && copy && (
        <div
          id="update-banner-content"
          className="mt-2 text-left max-w-[50em] mx-auto"
        >
          {documentToReactComponents(copy)}
        </div>
      )}
    </div>
  );
}

export default UpdateBanner;

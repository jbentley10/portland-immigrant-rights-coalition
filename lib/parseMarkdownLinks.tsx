import React from "react";

/**
 * Parses markdown-style links in plain text and converts them to React elements
 * Example: "Check out [our page](https://example.com) for more info"
 * becomes: "Check out <a href="https://example.com">our page</a> for more info"
 */
export function parseMarkdownLinks(text: string): React.ReactNode {
  if (!text) return text;

  // Regular expression to match markdown links: [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  // Find all markdown links in the text
  while ((match = markdownLinkRegex.exec(text)) !== null) {
    const [fullMatch, linkText, url] = match;
    const matchIndex = match.index;

    // Add text before the link
    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    // Add the link as a React element
    parts.push(
      <a
        key={matchIndex}
        href={url}
        className="font-bold underline text-primary hover:text-primary/80 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkText}
      </a>
    );

    lastIndex = matchIndex + fullMatch.length;
  }

  // Add any remaining text after the last link
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  // If no links were found, return the original text
  return parts.length > 0 ? parts : text;
}

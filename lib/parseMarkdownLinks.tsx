import React from "react";

/**
 * Parses markdown-style links in plain text and converts them to React elements
 * Example: "Check out [our page](https://example.com) for more info"
 * becomes: "Check out <a href="https://example.com">our page</a> for more info"
 * Also preserves newlines by converting them to <br /> tags
 */
export function parseMarkdownLinks(text: string): React.ReactNode {
  if (!text) return text;

  // Split text by newlines first to preserve line breaks
  const lines = text.split('\n');
  const processedLines: React.ReactNode[] = [];

  lines.forEach((line, lineIndex) => {
    // Regular expression to match markdown links: [text](url)
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    // Find all markdown links in the line
    while ((match = markdownLinkRegex.exec(line)) !== null) {
      const [fullMatch, linkText, url] = match;
      const matchIndex = match.index;

      // Add text before the link
      if (matchIndex > lastIndex) {
        parts.push(line.substring(lastIndex, matchIndex));
      }

      // Add the link as a React element
      parts.push(
        <a
          key={`${lineIndex}-${matchIndex}`}
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
    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    // Add the processed line (or original line if no links found)
    processedLines.push(
      <React.Fragment key={lineIndex}>
        {parts.length > 0 ? parts : line}
        {lineIndex < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });

  return processedLines;
}

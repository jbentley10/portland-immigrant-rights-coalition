import { BLOCKS } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";

export function stringsToRichText(paragraphs: string[]): Document {
  return {
    nodeType: BLOCKS.DOCUMENT,
    data: {},
    content: paragraphs.map((text) => ({
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [{ nodeType: "text", value: text, marks: [], data: {} }],
    })),
  };
}

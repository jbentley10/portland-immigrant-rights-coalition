/**
 * @file renderDocument.js
 */

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Image from "next/image";

export const renderDocument = (document: any) => {
  // Safety check: if document is undefined, null, or doesn't have content
  if (!document || !document.content) {
    return null;
  }

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
        <Image
          src={`https:${node.data?.target?.fields?.file?.url}`}
          alt={node.data?.target?.fields?.title}
          width={node.data?.target?.fields?.file?.details?.image?.width}
          height={node.data?.target?.fields?.file?.details?.image?.height}
        />
      ),
      [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
        <p className={"text-left mb-4"}>{children}</p>
      ),

      [BLOCKS.UL_LIST]: (node: any, children: any) => (
        <ul className="list-disc list-outside ml-6 space-y-1 mb-4">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: any) => (
        <ol className="list-decimal list-outside ml-6 space-y-1">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
        <li className="ml-0 pl-2">{children}</li>
      ),
      [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
        <a
          href={node.data.uri}
          className="font-bold text-primary text-sky-400 hover:text-primary/80 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
    renderText: (text: string) =>
      text
        .split("\n")
        .flatMap((text, i) => [i > 0 && <br key={Math.random()} />, text]),
  };

  return documentToReactComponents(document, options);
};

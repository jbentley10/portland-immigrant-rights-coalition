/**
 * @file renderDocument.js
 */

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Image from "next/image";

export const renderDocument = (document: any) => {
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
        <>
          <p>{children}</p>
          <br />
        </>
      ),

      [BLOCKS.UL_LIST]: (node: any, children: React.ReactNode) => (
        <ul>{children}</ul>
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

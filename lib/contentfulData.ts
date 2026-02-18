import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";

import type { Document } from "@contentful/rich-text-types";
import { EntrySkeletonType } from "contentful";

// Use server-only env vars (fall back to NEXT_PUBLIC_ for backwards compatibility)
const space = process.env.CONTENTFUL_SPACE_ID || process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN || process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const environment = process.env.CONTENTFUL_ENVIRONMENT || process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT;

const client = require("contentful").createClient({
  space: space,
  accessToken: accessToken,
  environment: environment,
});

// Revalidation time in seconds (24 hours)
// Content updates are handled immediately via the /api/revalidate webhook.
// This interval is a safety net for any changes the webhook might miss.
export const REVALIDATE_TIME = 86400;

// ---------------------------------------------------------------------------
// Cached data-fetching functions
//
// Each function is wrapped in Next.js unstable_cache so that the Contentful
// SDK calls (which bypass the built-in fetch cache) are deduplicated across
// pages and revalidation cycles. Cache tags allow on-demand invalidation via
// the /api/revalidate webhook endpoint.
// ---------------------------------------------------------------------------

export const fetchPage = (id: string, locale: string) =>
  unstable_cache(
    async () => {
      const entry = await client.getEntry(id, { locale });
      if (entry.fields) return entry;
      console.log(`Error getting Entry.`);
    },
    [`page-${id}-${locale}`],
    { revalidate: REVALIDATE_TIME, tags: ["contentful", `page-${id}`] }
  )();

export const fetchPages = () =>
  unstable_cache(
    async () => {
      const entries = await client.getEntries({
        content_type: "page",
      });

      if (!entries || entries.total <= 0) {
        console.log("Error finding entries with content type: page");
      }

      const pages = entries.items.map((entry: any) => {
        return Object.assign({
          id: entry.sys.id,
          englishTitle: entry.fields.englishTitle,
          spanishTitle: entry.fields.spanishTitle,
          slug: entry.fields.slug,
          order: entry.fields.order,
          childPages: entry.fields.childPages,
          topLevelPage: entry.fields.topLevelPage,
        });
      });

      return pages;
    },
    ["all-pages"],
    { revalidate: REVALIDATE_TIME, tags: ["contentful"] }
  )();

/**
 * Fetch a full page entry by slug and locale. Used by dynamic routes to get
 * both metadata and blocks from a single cached Contentful call.
 */
export const fetchPageBySlug = (slug: string, locale: string) =>
  unstable_cache(
    async () => {
      const pages = await client.getEntries({
        include: 2,
        "fields.slug": slug,
        content_type: "page",
        locale: locale,
      });

      if (!pages || pages.total <= 0) {
        console.log(`Error finding page with slug: ${slug}`);
        notFound();
      }

      if (pages.items[0]) {
        return pages.items[0].fields;
      }
    },
    [`full-page-${slug}-${locale}`],
    { revalidate: REVALIDATE_TIME, tags: ["contentful", `page-${slug}`] }
  )();

export const fetchMetadataBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      console.log(`Fetching metadata for slug ${slug}...`);

      const pages = await client.getEntries({
        include: 0,
        "fields.slug": slug,
        content_type: "page",
        select: "fields.englishTitle,fields.description",
      });

      if (!pages || pages.total <= 0) {
        console.log(`Error finding metadata with slug: ${slug}`);
        notFound();
      }

      if (pages.items[0]) {
        const metadataTitle = pages.items[0].fields.englishTitle;
        const metadataDescription = pages.items[0].fields.description;

        return {
          title: metadataTitle,
          description: metadataDescription,
        };
      }
    },
    [`metadata-${slug}`],
    { revalidate: REVALIDATE_TIME, tags: ["contentful", `page-${slug}`] }
  )();

export const fetchBlocksBySlug = (slug: string, locale: string) =>
  unstable_cache(
    async () => {
      console.log(`Fetching blocks from ${slug}...`);
      const pages = await client.getEntries({
        include: 2,
        "fields.slug": slug,
        content_type: "page",
        locale: locale,
      });

      if (!pages || pages.total <= 0) {
        console.log(`Error finding pages with slug: ${slug}`);
        notFound();
      }

      if (pages.items[0]) {
        const blocks = pages.items[0].fields.blocks;
        return blocks?.filter((block: any) => block !== undefined) || [];
      }
    },
    [`blocks-${slug}-${locale}`],
    { revalidate: REVALIDATE_TIME, tags: ["contentful", `page-${slug}`] }
  )();

export const fetchChildPagesBySlug = (
  parentSlug: string,
  locale: string = "en-US"
) =>
  unstable_cache(
    async () => {
      console.log(`Fetching child pages for ${parentSlug}...`);

      const pages = await client.getEntries({
        include: 2,
        "fields.slug": parentSlug,
        content_type: "page",
        locale: locale,
      });

      if (!pages || pages.total <= 0) {
        console.log(`Error finding page with slug: ${parentSlug}`);
        notFound();
      }

      if (pages.items[0]) {
        const childPages = pages.items[0].fields.childPages;
        return childPages?.filter((page: any) => page !== undefined) || [];
      }

      return [];
    },
    [`children-${parentSlug}-${locale}`],
    { revalidate: REVALIDATE_TIME, tags: ["contentful", `page-${parentSlug}`] }
  )();

export const fetchAsset = (assetID: string) =>
  unstable_cache(
    async () => {
      const asset = await client.getAsset(assetID);
      if (asset) return asset;
      console.log("Error getting asset.");
    },
    [`asset-${assetID}`],
    { revalidate: REVALIDATE_TIME, tags: ["contentful", "assets"] }
  )();

type UpdateBanner = EntrySkeletonType<
  { header: string; copy?: Document },
  "updateBanner"
>;

type SiteSettings = {
  banner: UpdateBanner | null;
};

export const fetchSiteSettings = (
  locale: "en-US" | "es" = "en-US"
): Promise<SiteSettings | null> =>
  unstable_cache(
    async () => {
      const res = await client.getEntries({
        content_type: "siteSettings",
        limit: 1,
        locale,
      });

      if (!res.items.length) return null;

      return res.items[0].fields as SiteSettings;
    },
    [`site-settings-${locale}`],
    { revalidate: REVALIDATE_TIME, tags: ["contentful", "site-settings"] }
  )();

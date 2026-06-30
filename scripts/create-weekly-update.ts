import dotenv from "dotenv";
import * as readline from "readline";
import { createClient } from "contentful-management";
import { deriveUpdateStrings } from "./lib/dateFormatters";
import { stringsToRichText } from "./lib/richTextConverter";
import inputData from "./weekly-update-input.json";

dotenv.config({ path: ".env.local" });

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BlockInput {
  heading?: { en: string; es: string };
  description: { en: string[]; es: string[] };
  imageAssetId?: string;
  imageOnLeft?: boolean;
  linkText?: string;
  linkHref?: string;
}

interface WeeklyUpdateInput {
  date: string;
  blocks: BlockInput[];
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function isRealCalendarDate(date: string): boolean {
  const [year, month, day] = date.split("-").map(Number);
  const parsed = new Date(year, month - 1, day, 12);
  return (
    parsed.getFullYear() === year &&
    parsed.getMonth() === month - 1 &&
    parsed.getDate() === day
  );
}

function validateInput(input: WeeklyUpdateInput) {
  if (!input.date || !/^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
    throw new Error('Input "date" must be in YYYY-MM-DD format.');
  }
  if (!isRealCalendarDate(input.date)) {
    throw new Error('Input "date" must be a real calendar date.');
  }
  if (!Array.isArray(input.blocks) || input.blocks.length === 0) {
    throw new Error('Input "blocks" must be a non-empty array.');
  }
  for (let i = 0; i < input.blocks.length; i++) {
    const block = input.blocks[i];
    if (
      !block.description?.en?.length ||
      !block.description?.es?.length
    ) {
      throw new Error(
        `Block ${i + 1}: "description.en" and "description.es" are required non-empty arrays.`
      );
    }
    if (block.heading) {
      if (!block.heading.en || !block.heading.es) {
        throw new Error(
          `Block ${i + 1}: if "heading" is present, both "heading.en" and "heading.es" are required.`
        );
      }
    }
    if (
      (block.linkText && !block.linkHref) ||
      (!block.linkText && block.linkHref)
    ) {
      throw new Error(
        `Block ${i + 1}: "linkText" and "linkHref" must both be present or both absent.`
      );
    }
  }
}

// ---------------------------------------------------------------------------
// Confirmation prompt
// ---------------------------------------------------------------------------

function confirm(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === "y");
    });
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const {
    CONTENTFUL_SPACE_ID,
    CONTENTFUL_ENVIRONMENT,
    CONTENTFUL_MANAGEMENT_TOKEN,
  } = process.env;

  if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ENVIRONMENT || !CONTENTFUL_MANAGEMENT_TOKEN) {
    throw new Error(
      "Missing required environment variables: CONTENTFUL_SPACE_ID, CONTENTFUL_ENVIRONMENT, CONTENTFUL_MANAGEMENT_TOKEN"
    );
  }

  const input = inputData as WeeklyUpdateInput;
  validateInput(input);

  const { enTitle, esTitle, slug } = deriveUpdateStrings(input.date);

  console.log("\n=== Weekly Update Preview ===");
  console.log(`Date:          ${input.date}`);
  console.log(`English title: ${enTitle}`);
  console.log(`Spanish title: ${esTitle}`);
  console.log(`Slug:          ${slug}`);
  console.log(`Blocks:        ${input.blocks.length}`);
  console.log("=============================\n");

  const proceed = await confirm("Create this weekly update in Contentful? (y/n): ");
  if (!proceed) {
    console.log("Aborted.");
    process.exit(0);
  }

  // Plain client API, scoped to this space/environment by default so calls
  // below don't need to repeat spaceId/environmentId.
  const client = createClient(
    { accessToken: CONTENTFUL_MANAGEMENT_TOKEN },
    {
      type: "plain",
      defaults: {
        spaceId: CONTENTFUL_SPACE_ID,
        environmentId: CONTENTFUL_ENVIRONMENT,
      },
    }
  );

  // Deterministic entry IDs (derived from the date) make this script
  // resumable: a rerun after a partial failure reuses already-created
  // entries instead of creating duplicates / orphans.
  const pageEntryId = `weekly-update-${input.date}`;
  const blockEntryIds = input.blocks.map(
    (_, i) => `weekly-update-${input.date}-block-${i + 1}`
  );

  // Create (or reuse) imageAndTextBlock entries
  for (let i = 0; i < input.blocks.length; i++) {
    const block = input.blocks[i];
    const entryId = blockEntryIds[i];

    const existingBlock = await client.entry
      .get({ entryId })
      .catch(() => null);

    if (existingBlock) {
      console.log(`Block ${i + 1} of ${input.blocks.length} already exists: ${entryId} (reusing)`);
      continue;
    }

    console.log(`Creating block ${i + 1} of ${input.blocks.length}...`);

    const richTextEn = stringsToRichText(block.description.en);
    const richTextEs = stringsToRichText(block.description.es);

    const fields: Record<string, unknown> = {
      descriptionRich: {
        "en-US": richTextEn,
        es: richTextEs,
      },
      imageOnLeft: {
        "en-US": block.imageOnLeft ?? true,
      },
    };

    if (block.heading) {
      fields.heading = {
        "en-US": block.heading.en,
        es: block.heading.es,
      };
    }

    if (block.imageAssetId) {
      fields.image = {
        "en-US": {
          sys: { type: "Link", linkType: "Asset", id: block.imageAssetId },
        },
      };
    }

    if (block.linkText) {
      fields.linkText = { "en-US": block.linkText };
    }

    if (block.linkHref) {
      fields.linkHref = { "en-US": block.linkHref };
    }

    const blockEntry = await client.entry.createWithId(
      { entryId, contentTypeId: "imageAndTextBlock" },
      { fields }
    );
    await client.entry.publish({ entryId }, blockEntry);
    console.log(`  ✓ Block ${i + 1} created: ${entryId}`);
  }

  // Create (or reuse) the page entry
  let pageEntry = await client.entry.get({ entryId: pageEntryId }).catch(() => null);

  if (pageEntry) {
    console.log(`\nPage already exists for slug "${slug}": ${pageEntryId} (reusing)`);
  } else {
    console.log("\nCreating weekly update page...");

    // Use date-based order so entries sort chronologically (e.g. 20260107)
    const order = parseInt(input.date.replace(/-/g, ""), 10);

    pageEntry = await client.entry.createWithId(
      { entryId: pageEntryId, contentTypeId: "page" },
      {
        fields: {
          englishTitle: { "en-US": enTitle },
          spanishTitle: { "en-US": esTitle },
          slug: { "en-US": slug },
          topLevelPage: { "en-US": false },
          order: { "en-US": order },
          blocks: {
            "en-US": blockEntryIds.map((id) => ({
              sys: { type: "Link", linkType: "Entry", id },
            })),
          },
          childPages: { "en-US": [] },
        },
      }
    );
    await client.entry.publish({ entryId: pageEntryId }, pageEntry);
    console.log(`  ✓ Page created: ${pageEntryId}`);
  }

  // Append new page to parent's childPages (idempotent — only adds the link
  // if it isn't already present, so reruns safely repair a failed prior
  // attempt without creating duplicate links).
  console.log("\nLinking to weekly updates index page...");

  const parentResults = await client.entry.getMany({
    query: {
      content_type: "page",
      "fields.slug": "data-and-updates/weekly-updates",
      limit: 1,
    },
  });

  if (parentResults.items.length === 0) {
    throw new Error(
      'Parent page "data-and-updates/weekly-updates" not found in Contentful.'
    );
  }

  const parentEntry = parentResults.items[0];
  const existingChildren: { sys: { id: string } }[] =
    (parentEntry.fields.childPages as Record<string, { sys: { id: string } }[]> | undefined)?.[
      "en-US"
    ] ?? [];

  const alreadyLinked = existingChildren.some(
    (child) => child.sys.id === pageEntryId
  );

  if (alreadyLinked) {
    console.log("  ✓ Parent page already linked, nothing to do");
  } else {
    (parentEntry.fields as Record<string, unknown>).childPages = {
      "en-US": [
        ...existingChildren,
        { sys: { type: "Link", linkType: "Entry", id: pageEntryId } },
      ],
    };

    const updatedParent = await client.entry.update(
      { entryId: parentEntry.sys.id },
      parentEntry
    );
    await client.entry.publish({ entryId: parentEntry.sys.id }, updatedParent);
    console.log("  ✓ Parent page updated");
  }

  console.log(`
✓ Done! Weekly update published successfully.
  URL: /data-and-updates/weekly-updates/${input.date}

The Contentful webhook will trigger ISR revalidation automatically.
If needed, manually trigger: POST /api/revalidate with the correct secret.
`);
}

main().catch((err) => {
  console.error("\nError:", err.message ?? err);
  process.exit(1);
});

import type {
  ParsedKML,
} from "@/types/kml";

export interface StyleDefinition {

  id: string;

  xml: string;

}

export interface StyleMergeResult {

  styles: StyleDefinition[];

  styleMap: Map<string, string>;

  conflicts: number;

}

function extractStyles(
  xml: string
): StyleDefinition[] {

  const styles: StyleDefinition[] = [];

  const regex =
    /<Style\b[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/Style>/g;

  let match: RegExpExecArray | null;

  while (
    (match = regex.exec(xml)) !== null
  ) {

    styles.push({

      id: match[1],

      xml: match[0],

    });

  }

  return styles;

}

function hashStyle(
  style: StyleDefinition
): string {

  return style.xml
    .replace(/\s+/g, " ")
    .trim();

}
export function mergeStyles(
  documents: string[]
): StyleMergeResult {

  const merged: StyleDefinition[] = [];

  const styleMap =
    new Map<string, string>();

  const seenHashes =
    new Set<string>();

  let conflicts = 0;

  for (const xml of documents) {

    const styles =
      extractStyles(xml);

    for (const style of styles) {

      const hash =
        hashStyle(style);

      if (
        seenHashes.has(hash)
      ) {

        continue;

      }

      const existing =
        merged.find(
          item =>
            item.id === style.id
        );

      if (existing) {

        conflicts++;

        const newId =
          `${style.id}-merged-${conflicts}`;

        styleMap.set(
          style.id,
          newId
        );

        merged.push({

          id: newId,

          xml: style.xml.replace(
            `id="${style.id}"`,
            `id="${newId}"`
          ),

        });

      } else {

        merged.push(style);

      }

      seenHashes.add(hash);

    }

  }

  return {

    styles: merged,

    styleMap,

    conflicts,

  };

}

export function applyStyleMap(
  xml: string,
  styleMap: Map<string, string>
): string {

  let result = xml;

  for (const [oldId, newId] of styleMap) {

    result = result.replace(

      new RegExp(
        `<styleUrl>#${oldId}<\\/styleUrl>`,
        "g"
      ),

      `<styleUrl>#${newId}</styleUrl>`

    );

  }

  return result;

}

import { parseKml } from "./parser";
import { mergeKmlFiles } from "./merge-kml";
import { readKmlFile } from "@/lib/kml";

import type { ParsedKML } from "@/types/kml";

export async function mergeUploadedFiles(
  files: File[]
): Promise<ParsedKML> {
  if (files.length < 2) {
    throw new Error("Upload at least two KML files.");
  }

  const parsed: ParsedKML[] = [];

  for (const file of files) {
    const kml = await readKmlFile(file);

    parsed.push(
      parseKml(
        kml.content,
        file.name
      )
    );
  }

  const result = mergeKmlFiles(parsed);

  return result.data;
}
import { ParsedKML } from "./parser";
import { mergeFolders } from "./merge";

export function mergeKmlFiles(files: ParsedKML[]): ParsedKML {
  if (files.length === 0) {
    throw new Error("No KML files supplied.");
  }

  const merged = structuredClone(files[0]);

  for (let i = 1; i < files.length; i++) {
    mergeFolders(merged.root, files[i].root);
  }

  return merged;
}
import type {
  FolderNode,
} from "@/types/kml";

export interface FolderOptimizationResult {

  emptyFoldersRemoved: number;

  duplicateFoldersMerged: number;

  foldersRenamed: number;

}

function normalizeName(
  name: string
): string {

  return name
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

}

function mergeFolderContents(
  target: FolderNode,
  source: FolderNode
) {

  target.placemarks.push(
    ...source.placemarks
  );

  target.folders.push(
    ...source.folders
  );

}

function optimizeFolder(

  folder: FolderNode,

  result: FolderOptimizationResult

) {

  const map =
    new Map<string, FolderNode>();

  const optimized: FolderNode[] = [];

  for (const child of folder.folders) {

    optimizeFolder(
      child,
      result
    );

    const key =
      normalizeName(
        child.name
      );

    const existing =
      map.get(key);

    if (existing) {

      mergeFolderContents(
        existing,
        child
      );

      result.duplicateFoldersMerged++;

    } else {

      map.set(
        key,
        child
      );

      optimized.push(child);

    }

  }
    folder.folders =
    optimized.filter(
      child => {

        const empty =

          child.folders.length === 0 &&

          child.placemarks.length === 0;

        if (empty) {

          result.emptyFoldersRemoved++;

        }

        return !empty;

      }
    );

  for (const child of folder.folders) {

    const cleaned =
      child.name
        .trim()
        .replace(/\s+/g, " ");

    if (cleaned !== child.name) {

      child.name = cleaned;

      result.foldersRenamed++;

    }

  }

}

export function optimizeFolders(
  root: FolderNode
): FolderOptimizationResult {

  const result: FolderOptimizationResult = {

    emptyFoldersRemoved: 0,

    duplicateFoldersMerged: 0,

    foldersRenamed: 0,

  };

  optimizeFolder(
    root,
    result
  );

  return result;

}
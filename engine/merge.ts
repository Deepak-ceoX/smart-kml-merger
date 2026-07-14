import { FolderNode } from "./parser";

export function mergeFolders(
  target: FolderNode,
  source: FolderNode
): FolderNode {
  // Merge placemarks
  target.placemarks.push(...source.placemarks);

  // Merge child folders recursively
  for (const sourceFolder of source.folders) {
    const existingFolder = target.folders.find(
      (folder) => folder.name === sourceFolder.name
    );

    if (existingFolder) {
      mergeFolders(existingFolder, sourceFolder);
    } else {
      target.folders.push(structuredClone(sourceFolder));
    }
  }

  return target;
}
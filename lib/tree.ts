import { FolderNode } from "@/types/tree";

export function printTree(
  folder: FolderNode,
  depth = 0
) {
  console.log(
    `${" ".repeat(depth * 2)}📁 ${folder.name}`
  );

  for (const child of folder.folders) {
    printTree(child, depth + 1);
  }

  for (const place of folder.placemarks) {
    console.log(
      `${" ".repeat((depth + 1) * 2)}📍 ${place.name}`
    );
  }
}
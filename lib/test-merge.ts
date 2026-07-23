import { mergeFolders } from "@/engine/merge";
import type { FolderNode } from "@/types/kml";

const fileA: FolderNode = {
  id: "folder-a",
  name: "A",
  folders: [
    {
      id: "folder-b",
      name: "B",
      folders: [],
      placemarks: [],
    },
  ],
  placemarks: [],
};

const fileB: FolderNode = {
  id: "folder-a-2",
  name: "A",
  folders: [
    {
      id: "folder-c",
      name: "C",
      folders: [],
      placemarks: [],
    },
  ],
  placemarks: [],
};

const merged = mergeFolders(
  structuredClone(fileA),
  fileB
);

console.log(merged);
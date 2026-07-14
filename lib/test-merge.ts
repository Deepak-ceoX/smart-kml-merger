import { mergeFolders } from "./merge";
import { FolderNode } from "./parser";

const fileA: FolderNode = {
  name: "A",
  folders: [
    {
      name: "B",
      folders: [],
      placemarks: [],
    },
  ],
  placemarks: [],
};

const fileB: FolderNode = {
  name: "A",
  folders: [
    {
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
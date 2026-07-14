export interface PlacemarkNode {
  name: string;
  coordinates: string;
}

export interface FolderNode {
  name: string;
  folders: FolderNode[];
  placemarks: PlacemarkNode[];
}

export interface ParsedKML {
  name: string;
  root: FolderNode;
}

function getText(
  parent: Element,
  tag: string
): string {
  return parent.getElementsByTagName(tag)[0]?.textContent?.trim() ?? "";
}

function parseFolder(folder: Element): FolderNode {
  const node: FolderNode = {
    name: getText(folder, "name"),
    folders: [],
    placemarks: [],
  };

  // Child folders
  const childFolders = Array.from(folder.children).filter(
    (child) => child.tagName === "Folder"
  );

  for (const child of childFolders) {
    node.folders.push(parseFolder(child));
  }

  // Placemarks
  const placemarks = Array.from(folder.children).filter(
    (child) => child.tagName === "Placemark"
  );

  for (const placemark of placemarks) {
    node.placemarks.push({
      name: getText(placemark, "name"),
      coordinates: getText(placemark, "coordinates"),
    });
  }

  return node;
}

export function parseKml(
  xml: string,
  fileName: string
): ParsedKML {
  const parser = new DOMParser();

  const doc = parser.parseFromString(
    xml,
    "application/xml"
  );

  const folder =
    doc.querySelector("Document > Folder") ??
    doc.querySelector("Folder");

  if (!folder) {
    throw new Error("No Folder found.");
  }

  return {
    name: fileName,
    root: parseFolder(folder),
  };
}
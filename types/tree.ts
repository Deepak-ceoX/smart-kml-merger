export interface PlacemarkNode {
  id: string;
  name: string;
  coordinates: string;
}

export interface FolderNode {
  id: string;
  name: string;
  folders: FolderNode[];
  placemarks: PlacemarkNode[];
}

export interface KmlTree {
  name: string;
  root: FolderNode;
}
export type GeometryType =
  | "Point"
  | "LineString"
  | "Polygon"
  | "MultiGeometry"
  | "Unknown";

export interface ExtendedDataItem {
  name: string;
  value: string;
}

export interface GeometryNode {
  type: GeometryType;

  /**
   * Raw coordinate string exactly as found in KML.
   */
  coordinates: string;

  /**
   * Original XML element name.
   */
  tag: string;
}

/* ---------------- Styles ---------------- */

export interface IconStyle {
  color?: string;
  scale?: number;
  href?: string;
}

export interface LineStyle {
  color?: string;
  width?: number;
}

export interface PolyStyle {
  color?: string;
  fill?: boolean;
  outline?: boolean;
}

export interface KmlStyle {
  id: string;

  iconStyle?: IconStyle;

  lineStyle?: LineStyle;

  polyStyle?: PolyStyle;
}

export interface StyleMapPair {
  key: string;

  styleUrl: string;
}

export interface KmlStyleMap {
  id: string;

  pairs: StyleMapPair[];
}

/* ---------------------------------------- */

export interface PlacemarkNode {
  /**
   * Unique id used internally.
   */
  id: string;

  /**
   * Placemark name.
   */
  name: string;

  /**
   * Geometry type.
   */
  geometryType: GeometryType;

  /**
   * Parsed geometry.
   */
  geometry: GeometryNode;

  /**
   * Optional description.
   */
  description?: string;

  /**
   * KML style reference.
   */
  styleUrl?: string;

  /**
   * Visibility flag.
   */
  visibility: boolean;

  /**
   * Time information.
   */
  timeStamp?: string;

  timeSpan?: {
    begin?: string;
    end?: string;
  };

  /**
   * ExtendedData fields.
   */
  extendedData: ExtendedDataItem[];
}

export interface FolderNode {
  id: string;

  name: string;

  folders: FolderNode[];

  placemarks: PlacemarkNode[];
}

export interface ParsedKML {
  id: string;

  name: string;

  root: FolderNode;

  /**
   * Styles defined inside Document.
   */
  styles: KmlStyle[];

  /**
   * StyleMaps defined inside Document.
   */
  styleMaps: KmlStyleMap[];
}

export interface MergeStatistics {
  filesMerged: number;

  foldersMerged: number;

  placemarksMerged: number;

  duplicatesRemoved: number;

  points: number;

  lineStrings: number;

  polygons: number;

  multiGeometries: number;

  mergeTimeMs: number;

  outputSizeBytes: number;
}
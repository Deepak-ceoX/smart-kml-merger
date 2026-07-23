import type {
  ParsedKML,
  FolderNode,
  PlacemarkNode,
  GeometryNode,
  GeometryType,
  ExtendedDataItem,
  KmlStyle,
  KmlStyleMap,
  StyleMapPair,
} from "@/types/kml";

let idCounter = 0;

function createId(prefix: string): string {
  idCounter++;
  return `${prefix}-${idCounter}`;
}

function getText(
  parent: Element,
  tag: string
): string {
  return (
    parent.getElementsByTagName(tag)[0]
      ?.textContent
      ?.trim() ?? ""
  );
}

function getOptionalElement(
  parent: Element,
  tag: string
): Element | null {
  return (
    parent.getElementsByTagName(tag)[0] ??
    null
  );
}

function parseVisibility(
  placemark: Element
): boolean {
  const value = getText(
    placemark,
    "visibility"
  );

  if (!value) return true;

  return value !== "0";
}

function parseDescription(
  placemark: Element
): string | undefined {
  const value = getText(
    placemark,
    "description"
  );

  return value || undefined;
}

function parseStyleUrl(
  placemark: Element
): string | undefined {
  const value = getText(
    placemark,
    "styleUrl"
  );

  return value || undefined;
}

function parseExtendedData(
  placemark: Element
): ExtendedDataItem[] {

  const result: ExtendedDataItem[] = [];

  const extended =
    getOptionalElement(
      placemark,
      "ExtendedData"
    );

  if (!extended) {
    return result;
  }

  const dataNodes =
    Array.from(
      extended.getElementsByTagName(
        "Data"
      )
    );

  for (const node of dataNodes) {

    result.push({

      name:
        node.getAttribute("name") ??
        "",

      value:
        getText(
          node,
          "value"
        ),

    });

  }

  return result;

}
function detectGeometry(
  placemark: Element
): GeometryNode {

  const geometryTypes = [
    "Point",
    "LineString",
    "Polygon",
    "MultiGeometry",
  ];

  for (const tag of geometryTypes) {

    const geometry =
      placemark.getElementsByTagName(
        tag
      )[0];

    if (!geometry) continue;

    // Point & LineString
    if (
      tag === "Point" ||
      tag === "LineString"
    ) {

      return {

        tag,

        type:
          tag as GeometryType,

        coordinates:
          getText(
            geometry,
            "coordinates"
          ),

      };

    }

    // Polygon
    if (tag === "Polygon") {

      const coordinates =
        geometry.getElementsByTagName(
          "coordinates"
        )[0]
          ?.textContent
          ?.trim() ?? "";

      return {

        tag,

        type: "Polygon",

        coordinates,

      };

    }

    // MultiGeometry
    if (tag === "MultiGeometry") {

      const coordinateList =
        Array.from(
          geometry.getElementsByTagName(
            "coordinates"
          )
        )
          .map(
            (node) =>
              node.textContent?.trim() ??
              ""
          )
          .filter(Boolean);

      return {

        tag,

        type:
          "MultiGeometry",

        coordinates:
          coordinateList.join("\n"),

      };

    }

  }

  return {

    tag: "Unknown",

    type: "Unknown",

    coordinates: "",

  };

}
function parseStyles(
  doc: Document
): KmlStyle[] {

  const styles: KmlStyle[] = [];

  const nodes =
    Array.from(
      doc.getElementsByTagName(
        "Style"
      )
    );

  for (const style of nodes) {

    const id =
      style.getAttribute("id");

    if (!id) continue;

    const parsed: KmlStyle = {
      id,
    };

    // ---------------- IconStyle ----------------

    const icon =
      style.getElementsByTagName(
        "IconStyle"
      )[0];

    if (icon) {

      parsed.iconStyle = {

        color:
          getText(
            icon,
            "color"
          ) || undefined,

        scale:
          Number(
            getText(
              icon,
              "scale"
            )
          ) || undefined,

        href:
          getText(
            icon,
            "href"
          ) || undefined,

      };

    }

    // ---------------- LineStyle ----------------

    const line =
      style.getElementsByTagName(
        "LineStyle"
      )[0];

    if (line) {

      parsed.lineStyle = {

        color:
          getText(
            line,
            "color"
          ) || undefined,

        width:
          Number(
            getText(
              line,
              "width"
            )
          ) || undefined,

      };

    }

    // ---------------- PolyStyle ----------------

    const poly =
      style.getElementsByTagName(
        "PolyStyle"
      )[0];

    if (poly) {

      parsed.polyStyle = {

        color:
          getText(
            poly,
            "color"
          ) || undefined,

        fill:
          getText(
            poly,
            "fill"
          ) !== "0",

        outline:
          getText(
            poly,
            "outline"
          ) !== "0",

      };

    }

    styles.push(parsed);

  }

  return styles;

}

function parseStyleMaps(
  doc: Document
): KmlStyleMap[] {

  const styleMaps: KmlStyleMap[] = [];

  const nodes =
    Array.from(
      doc.getElementsByTagName(
        "StyleMap"
      )
    );

  for (const map of nodes) {

    const id =
      map.getAttribute("id");

    if (!id) continue;

    const pairs: StyleMapPair[] = [];

    const pairNodes =
      Array.from(
        map.getElementsByTagName(
          "Pair"
        )
      );

    for (const pair of pairNodes) {

      pairs.push({

        key:
          getText(
            pair,
            "key"
          ),

        styleUrl:
          getText(
            pair,
            "styleUrl"
          ),

      });

    }

    styleMaps.push({

      id,

      pairs,

    });

  }

  return styleMaps;

}
function parsePlacemark(
  placemark: Element
): PlacemarkNode {

  // Detect geometry only once
  const geometry =
    detectGeometry(
      placemark
    );

  const timeStamp =
    getText(
      placemark,
      "when"
    ) || undefined;

  const begin =
    getText(
      placemark,
      "begin"
    ) || undefined;

  const end =
    getText(
      placemark,
      "end"
    ) || undefined;

  return {

    id:
      createId(
        "placemark"
      ),

    name:
      getText(
        placemark,
        "name"
      ) ||
      "Unnamed Placemark",

    geometryType:
      geometry.type,

    geometry,

    description:
      parseDescription(
        placemark
      ),

    styleUrl:
      parseStyleUrl(
        placemark
      ),

    visibility:
      parseVisibility(
        placemark
      ),

    extendedData:
      parseExtendedData(
        placemark
      ),

    timeStamp,

    timeSpan:
      begin || end
        ? {
            begin,
            end,
          }
        : undefined,

  };

}
function parseFolder(
  folder: Element
): FolderNode {

  const node: FolderNode = {

    id:
      createId(
        "folder"
      ),

    name:
      getText(
        folder,
        "name"
      ) ||
      "Unnamed Folder",

    folders: [],

    placemarks: [],

  };

  // Process only direct children
  for (const child of Array.from(folder.children)) {

    switch (child.tagName) {

      case "Folder":

        node.folders.push(
          parseFolder(
            child
          )
        );

        break;

      case "Placemark":

        node.placemarks.push(
          parsePlacemark(
            child
          )
        );

        break;

      default:

        // Ignore unsupported nodes for now
        break;

    }

  }

  // Keep folders sorted alphabetically
  node.folders.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Keep placemarks sorted alphabetically
  node.placemarks.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return node;

}
export function parseKml(
  xml: string,
  fileName: string
): ParsedKML {

  idCounter = 0;

  const parser =
    new DOMParser();

  const doc =
    parser.parseFromString(
      xml,
      "application/xml"
    );

  // Invalid XML
  if (
    doc.querySelector(
      "parsererror"
    )
  ) {

    throw new Error(
      "Invalid KML document."
    );

  }

  // Root Folder
  const rootFolder =
    doc.querySelector(
      "Document > Folder"
    ) ??
    doc.querySelector(
      "Folder"
    );

  if (!rootFolder) {

    throw new Error(
      "No Folder found."
    );

  }

  // Parse styles
  const styles =
    parseStyles(doc);

  // Parse style maps
  const styleMaps =
    parseStyleMaps(doc);

  return {

    id:
      createId(
        "kml"
      ),

    name:
      fileName,

    root:
      parseFolder(
        rootFolder
      ),

    styles,

    styleMaps,

  };

}
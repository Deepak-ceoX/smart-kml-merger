import type {
  ParsedKML,
  FolderNode,
  PlacemarkNode,
  KmlStyle,
  KmlStyleMap,
} from "@/types/kml";

/* ---------------- Utilities ---------------- */

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function bool(value?: boolean): string {
  return value ? "1" : "0";
}

function tag(name: string, value?: string | number): string {
  if (value === undefined || value === null || value === "") {
    return "";
  }

  return `<${name}>${escapeXml(String(value))}</${name}>`;
}

/* ---------------- ExtendedData ---------------- */

function buildExtendedData(
  placemark: PlacemarkNode,
  indent: string
): string {
  if (placemark.extendedData.length === 0) {
    return "";
  }

  let xml = `${indent}<ExtendedData>\n`;

  for (const item of placemark.extendedData) {
    xml += `${indent}  <Data name="${escapeXml(item.name)}">\n`;
    xml += `${indent}    ${tag("value", item.value)}\n`;
    xml += `${indent}  </Data>\n`;
  }

  xml += `${indent}</ExtendedData>\n`;

  return xml;
}

/* ---------------- Styles ---------------- */

function buildStyles(styles: KmlStyle[]): string {
  if (styles.length === 0) return "";

  let xml = "";

  for (const style of styles) {
    xml += `  <Style id="${escapeXml(style.id)}">\n`;

    if (style.iconStyle) {
      xml += `    <IconStyle>\n`;
      xml += `      ${tag("color", style.iconStyle.color)}\n`;
      xml += `      ${tag("scale", style.iconStyle.scale)}\n`;

      if (style.iconStyle.href) {
        xml += `      <Icon>\n`;
        xml += `        ${tag("href", style.iconStyle.href)}\n`;
        xml += `      </Icon>\n`;
      }

      xml += `    </IconStyle>\n`;
    }

    if (style.lineStyle) {
      xml += `    <LineStyle>\n`;
      xml += `      ${tag("color", style.lineStyle.color)}\n`;
      xml += `      ${tag("width", style.lineStyle.width)}\n`;
      xml += `    </LineStyle>\n`;
    }

    if (style.polyStyle) {
      xml += `    <PolyStyle>\n`;
      xml += `      ${tag("color", style.polyStyle.color)}\n`;
      xml += `      ${tag("fill", bool(style.polyStyle.fill))}\n`;
      xml += `      ${tag("outline", bool(style.polyStyle.outline))}\n`;
      xml += `    </PolyStyle>\n`;
    }

    xml += `  </Style>\n\n`;
  }

  return xml;
}

/* ---------------- StyleMaps ---------------- */

function buildStyleMaps(styleMaps: KmlStyleMap[]): string {
  if (styleMaps.length === 0) return "";

  let xml = "";

  for (const map of styleMaps) {
    xml += `  <StyleMap id="${escapeXml(map.id)}">\n`;

    for (const pair of map.pairs) {
      xml += `    <Pair>\n`;
      xml += `      ${tag("key", pair.key)}\n`;
      xml += `      ${tag("styleUrl", pair.styleUrl)}\n`;
      xml += `    </Pair>\n`;
    }

    xml += `  </StyleMap>\n\n`;
  }

  return xml;
}

/* ---------------- Geometry ---------------- */

function buildGeometry(
  placemark: PlacemarkNode,
  indent: string
): string {
  const coordinates = escapeXml(placemark.geometry.coordinates);

  switch (placemark.geometryType) {
    case "Point":
      return `
${indent}<Point>
${indent}  <coordinates>${coordinates}</coordinates>
${indent}</Point>
`;

    case "LineString":
      return `
${indent}<LineString>
${indent}  <coordinates>${coordinates}</coordinates>
${indent}</LineString>
`;

    case "Polygon":
      return `
${indent}<Polygon>
${indent}  <outerBoundaryIs>
${indent}    <LinearRing>
${indent}      <coordinates>${coordinates}</coordinates>
${indent}    </LinearRing>
${indent}  </outerBoundaryIs>
${indent}</Polygon>
`;

    case "MultiGeometry": {
      let xml = `${indent}<MultiGeometry>\n`;

      const parts = coordinates
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean);

      for (const part of parts) {
        xml += `${indent}  <Point>\n`;
        xml += `${indent}    <coordinates>${escapeXml(part)}</coordinates>\n`;
        xml += `${indent}  </Point>\n`;
      }

      xml += `${indent}</MultiGeometry>\n`;

      return xml;
    }

    default:
      return `
${indent}<Point>
${indent}  <coordinates>${coordinates}</coordinates>
${indent}</Point>
`;
  }
}

/* ---------------- Placemark ---------------- */

function buildPlacemark(
  placemark: PlacemarkNode,
  indent = "      "
): string {
  let xml = `${indent}<Placemark>\n`;

  xml += `${indent}  ${tag("name", placemark.name)}\n`;

  if (placemark.description) {
    xml += `${indent}  ${tag("description", placemark.description)}\n`;
  }

  if (placemark.styleUrl) {
    xml += `${indent}  ${tag("styleUrl", placemark.styleUrl)}\n`;
  }

  xml += `${indent}  ${tag("visibility", bool(placemark.visibility))}\n`;

  if (placemark.timeStamp) {
    xml += `${indent}  <TimeStamp>\n`;
    xml += `${indent}    ${tag("when", placemark.timeStamp)}\n`;
    xml += `${indent}  </TimeStamp>\n`;
  }

  if (placemark.timeSpan) {
    xml += `${indent}  <TimeSpan>\n`;

    if (placemark.timeSpan.begin) {
      xml += `${indent}    ${tag("begin", placemark.timeSpan.begin)}\n`;
    }

    if (placemark.timeSpan.end) {
      xml += `${indent}    ${tag("end", placemark.timeSpan.end)}\n`;
    }

    xml += `${indent}  </TimeSpan>\n`;
  }

  xml += buildExtendedData(placemark, indent + "  ");

  xml += buildGeometry(placemark, indent + "  ");

  xml += `${indent}</Placemark>\n`;

  return xml;
}

/* ---------------- Folder ---------------- */

function buildFolder(folder: FolderNode, indent = "    "): string {
  let xml = `${indent}<Folder>\n`;

  xml += `${indent}  ${tag("name", folder.name)}\n`;

  const folders = [...folder.folders].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  for (const child of folders) {
    xml += buildFolder(child, indent + "  ");
  }

  const placemarks = [...folder.placemarks].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  for (const placemark of placemarks) {
    xml += buildPlacemark(placemark, indent + "  ");
  }

  xml += `${indent}</Folder>\n`;

  return xml;
}

/* ---------------- Export ---------------- */

export function exportKml(data: ParsedKML): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>

  ${tag("name", data.name)}

`;

  if (data.styles?.length) {
    xml += buildStyles(data.styles) + "\n";
  }

  if (data.styleMaps?.length) {
    xml += buildStyleMaps(data.styleMaps) + "\n";
  }

  xml += buildFolder(data.root);

  xml += `
</Document>
</kml>
`;

  return xml.trim();
}
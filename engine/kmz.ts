import { exportKml } from "./exporter";

import type {
  ParsedKML,
} from "@/types/kml";

export interface KmzResult {

  blob: Blob;

  size: number;

  compressionRatio: number;

}

export async function exportKmz(

  data: ParsedKML

): Promise<KmzResult> {

  const kml =
    exportKml(data);

  const encoder =
    new TextEncoder();

  const bytes =
    encoder.encode(kml);

  const blob =
    new Blob(

      [bytes],

      {

        type:
          "application/vnd.google-earth.kmz",

      }

    );

  return {

    blob,

    size: blob.size,

    compressionRatio: 1,

  };

}

export function downloadKmz(

  fileName: string,

  blob: Blob

) {

  const url =
    URL.createObjectURL(
      blob
    );

  const link =
    document.createElement("a");

  link.href = url;

  link.download =
    fileName.endsWith(".kmz")
      ? fileName
      : `${fileName}.kmz`;

  document.body.appendChild(
    link
  );

  link.click();

  document.body.removeChild(
    link
  );

  URL.revokeObjectURL(
    url
  );

}

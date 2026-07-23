export interface KmzImportResult {

  kmlContent: string;

  fileName: string;

  extractedFiles: string[];

}

/**
 * Placeholder KMZ importer.
 * This will later be upgraded to use a ZIP library
 * such as JSZip for real KMZ extraction.
 */
export async function importKmz(

  file: File

): Promise<KmzImportResult> {

  if (
    !file.name
      .toLowerCase()
      .endsWith(".kmz")
  ) {

    throw new Error(
      "Only .kmz files are supported."
    );

  }

  const buffer =
    await file.arrayBuffer();

  if (buffer.byteLength === 0) {

    throw new Error(
      "Empty KMZ file."
    );

  }

  return {

    kmlContent: "",

    fileName:
      file.name.replace(
        /\.kmz$/i,
        ".kml"
      ),

    extractedFiles: [

      "doc.kml",

    ],

  };

}

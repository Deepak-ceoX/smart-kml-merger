import { exportKml } from "./exporter";
import { downloadFile } from "@/lib/download";

import type { ParsedKML } from "@/types/kml";

export function downloadMergedKml(
  merged: ParsedKML,
  fileName = "merged.kml"
) {
  const xml = exportKml(merged);

  downloadFile(fileName, xml);
}
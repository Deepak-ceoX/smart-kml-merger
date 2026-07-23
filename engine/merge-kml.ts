import type {
  ParsedKML,
  MergeStatistics,
  KmlStyle,
  KmlStyleMap,
} from "@/types/kml";

import { mergeFolders } from "./merge";
import { exportKml } from "./exporter";

export interface MergeResult {

  data: ParsedKML;

  stats: MergeStatistics;

}

function mergeStyles(
  target: KmlStyle[],
  source: KmlStyle[]
): void {

  for (const style of source) {

    const exists =
      target.some(
        item =>
          item.id === style.id
      );

    if (!exists) {

      target.push(
        structuredClone(style)
      );

    }

  }

}

function mergeStyleMaps(
  target: KmlStyleMap[],
  source: KmlStyleMap[]
): void {

  for (const map of source) {

    const exists =
      target.some(
        item =>
          item.id === map.id
      );

    if (!exists) {

      target.push(
        structuredClone(map)
      );

    }

  }

}
/**
 * Count folders, placemarks and geometry.
 */
function countFolder(
  folder: any,
  stats: MergeStatistics
): void {

  stats.foldersMerged++;

  for (const placemark of folder.placemarks) {

    stats.placemarksMerged++;

    switch (
      placemark.geometryType
    ) {

      case "Point":

        stats.points++;
        break;

      case "LineString":

        stats.lineStrings++;
        break;

      case "Polygon":

        stats.polygons++;
        break;

      case "MultiGeometry":

        stats.multiGeometries++;
        break;

    }

  }

  for (const child of folder.folders) {

    countFolder(
      child,
      stats
    );

  }

}

/**
 * Calculate duplicate count.
 */
function calculateDuplicates(
  files: ParsedKML[],
  stats: MergeStatistics
): void {

  let total = 0;

  for (const file of files) {

    const walk = (
      folder: any
    ) => {

      total +=
        folder.placemarks.length;

      for (const child of folder.folders) {

        walk(child);

      }

    };

    walk(file.root);

  }

  stats.duplicatesRemoved =
    Math.max(
      0,
      total -
      stats.placemarksMerged
    );

}
export function mergeKmlFiles(
  files: ParsedKML[]
): MergeResult {

  if (files.length === 0) {
    throw new Error(
      "No KML files supplied."
    );
  }

  const start =
    performance.now();

  const merged =
    structuredClone(files[0]);

  // Ensure optional collections exist
  merged.styles ??= [];
  merged.styleMaps ??= [];

  const stats: MergeStatistics = {

    filesMerged:
      files.length,

    foldersMerged: 0,

    placemarksMerged: 0,

    duplicatesRemoved: 0,

    points: 0,

    lineStrings: 0,

    polygons: 0,

    multiGeometries: 0,

    mergeTimeMs: 0,

    outputSizeBytes: 0,

  };

  // Merge remaining files
  for (
    let i = 1;
    i < files.length;
    i++
  ) {

    mergeFolders(
      merged.root,
      files[i].root
    );

    mergeStyles(
      merged.styles,
      files[i].styles ?? []
    );

    mergeStyleMaps(
      merged.styleMaps,
      files[i].styleMaps ?? []
    );

  }

  // Statistics
  countFolder(
    merged.root,
    stats
  );

  calculateDuplicates(
    files,
    stats
  );

  stats.mergeTimeMs =
    performance.now() - start;

  // Calculate real exported size
  const exported =
    exportKml(merged);

  stats.outputSizeBytes =
    new TextEncoder()
      .encode(exported)
      .length;

  return {

    data: merged,

    stats,

  };

}

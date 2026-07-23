import type {
  FolderNode,
  MergeStatistics,
  ParsedKML,
} from "@/types/kml";

function walkFolder(

  folder: FolderNode,

  stats: MergeStatistics

) {

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

    walkFolder(

      child,

      stats

    );

  }

}

export function generateStatistics(

  data: ParsedKML,

  filesMerged: number,

  mergeTimeMs: number,

  duplicatesRemoved = 0

): MergeStatistics {

  const stats: MergeStatistics = {

    filesMerged,

    foldersMerged: 0,

    placemarksMerged: 0,

    duplicatesRemoved,

    points: 0,

    lineStrings: 0,

    polygons: 0,

    multiGeometries: 0,

    mergeTimeMs,

    outputSizeBytes: JSON.stringify(data).length,

  };

  walkFolder(

    data.root,

    stats

  );

  return stats;

}

import type {
  FolderNode,
  PlacemarkNode,
  ExtendedDataItem,
} from "@/types/kml";

/**
 * Geometry-aware duplicate detection.
 */
function isSamePlacemark(
  a: PlacemarkNode,
  b: PlacemarkNode
): boolean {
  return (
    a.geometryType === b.geometryType &&
    a.name.trim() === b.name.trim() &&
    a.geometry.coordinates.trim() ===
      b.geometry.coordinates.trim()
  );
}

/**
 * Merge ExtendedData without duplicates.
 */
function mergeExtendedData(
  target: ExtendedDataItem[],
  source: ExtendedDataItem[]
): ExtendedDataItem[] {

  const merged = [...target];

  for (const item of source) {

    const exists = merged.some(
      (existing) =>
        existing.name === item.name &&
        existing.value === item.value
    );

    if (!exists) {
      merged.push(structuredClone(item));
    }

  }

  return merged;

}

/**
 * Merge placemark metadata.
 */
function mergeMetadata(
  target: PlacemarkNode,
  source: PlacemarkNode
) {

  if (!target.description && source.description)
    target.description = source.description;

  if (!target.styleUrl && source.styleUrl)
    target.styleUrl = source.styleUrl;

  target.visibility =
    target.visibility || source.visibility;

  target.extendedData =
    mergeExtendedData(
      target.extendedData,
      source.extendedData
    );

  if (!target.timeStamp && source.timeStamp)
    target.timeStamp = source.timeStamp;

  if (!target.timeSpan && source.timeSpan)
    target.timeSpan =
      structuredClone(source.timeSpan);

}
/**
 * Merge placemarks.
 */
function mergePlacemarks(
  target: FolderNode,
  source: FolderNode
) {

  for (const placemark of source.placemarks) {

    const existing =
      target.placemarks.find(
        (item) =>
          isSamePlacemark(
            item,
            placemark
          )
      );

    if (existing) {

      mergeMetadata(
        existing,
        placemark
      );

    } else {

      target.placemarks.push(
        structuredClone(
          placemark
        )
      );

    }

  }

  // Keep placemarks sorted
  target.placemarks.sort(
    (a, b) =>
      a.name.localeCompare(
        b.name
      )
  );

}

/**
 * Merge folders recursively.
 */
export function mergeFolders(
  target: FolderNode,
  source: FolderNode
): FolderNode {

  // Merge placemarks first
  mergePlacemarks(
    target,
    source
  );

  // Merge child folders
  for (const child of source.folders) {

    const existing =
      target.folders.find(
        (folder) =>
          folder.name.trim() ===
          child.name.trim()
      );

    if (existing) {

      mergeFolders(
        existing,
        child
      );

    } else {

      target.folders.push(
        structuredClone(
          child
        )
      );

    }

  }

  // Keep folders sorted
  target.folders.sort(
    (a, b) =>
      a.name.localeCompare(
        b.name
      )
  );

  return target;

}
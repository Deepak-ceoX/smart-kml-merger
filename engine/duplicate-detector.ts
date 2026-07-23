import type {
  PlacemarkNode,
} from "@/types/kml";

export interface DuplicateResult {

  duplicates: PlacemarkNode[];

  unique: PlacemarkNode[];

}

function normalizeCoordinates(
  coordinates: string
): string {

  return coordinates
    .trim()
    .replace(/\s+/g, " ")
    .replace(/,\s+/g, ",");

}

function geometryHash(
  placemark: PlacemarkNode
): string {

  return [
    placemark.geometryType,
    normalizeCoordinates(
      placemark.geometry.coordinates
    ),
  ].join("|");

}

function strictHash(
  placemark: PlacemarkNode
): string {

  return [
    placemark.name.trim().toLowerCase(),
    geometryHash(placemark),
  ].join("|");

}

export function findDuplicates(
  placemarks: PlacemarkNode[]
): DuplicateResult {

  const seen =
    new Map<string, PlacemarkNode>();

  const duplicates: PlacemarkNode[] = [];

  const unique: PlacemarkNode[] = [];

  for (const placemark of placemarks) {

    const key =
      strictHash(placemark);

    if (seen.has(key)) {

      duplicates.push(placemark);

    } else {

      seen.set(
        key,
        placemark
      );

      unique.push(placemark);

    }

  }

  return {

    duplicates,

    unique,

  };

}
function coordinateSimilarity(
  a: string,
  b: string
): number {

  const ca =
    normalizeCoordinates(a)
      .split(" ");

  const cb =
    normalizeCoordinates(b)
      .split(" ");

  const min =
    Math.min(
      ca.length,
      cb.length
    );

  let matches = 0;

  for (let i = 0; i < min; i++) {

    if (ca[i] === cb[i]) {
      matches++;
    }

  }

  return min === 0
    ? 0
    : matches / min;

}

export function areSimilar(
  a: PlacemarkNode,
  b: PlacemarkNode,
  threshold = 0.95
): boolean {

  if (
    a.geometryType !==
    b.geometryType
  ) {

    return false;

  }

  const nameA =
    a.name.trim().toLowerCase();

  const nameB =
    b.name.trim().toLowerCase();

  if (
    nameA &&
    nameB &&
    nameA !== nameB
  ) {

    return false;

  }

  const similarity =
    coordinateSimilarity(

      a.geometry.coordinates,

      b.geometry.coordinates

    );

  return similarity >= threshold;

}

export function removeDuplicates(
  placemarks: PlacemarkNode[]
): PlacemarkNode[] {

  const result: PlacemarkNode[] = [];

  for (const placemark of placemarks) {

    const duplicate =
      result.find(existing =>
        areSimilar(
          existing,
          placemark
        )
      );

    if (!duplicate) {

      result.push(placemark);

    }

  }

  return result;

}

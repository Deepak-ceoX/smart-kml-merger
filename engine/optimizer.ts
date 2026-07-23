import type {
  FolderNode,
  ParsedKML,
  PlacemarkNode,
} from "@/types/kml";

export interface OptimizationResult {

  data: ParsedKML;

  emptyFoldersRemoved: number;

  duplicateFoldersRemoved: number;

  duplicatePlacemarksRemoved: number;

}

function placemarkKey(

  placemark: PlacemarkNode

) {

  return [

    placemark.name.trim(),

    placemark.geometryType,

    placemark.geometry.coordinates.trim(),

  ].join("|");

}

function optimizeFolder(

  folder: FolderNode,

  result: OptimizationResult

): FolderNode {

  const seenPlacemarks =
    new Set<string>();

  folder.placemarks =
    folder.placemarks.filter(
      placemark => {

        const key =
          placemarkKey(
            placemark
          );

        if (
          seenPlacemarks.has(
            key
          )
        ) {

          result
            .duplicatePlacemarksRemoved++;

          return false;

        }

        seenPlacemarks.add(
          key
        );

        return true;

      }
    );
      for (const child of folder.folders) {

    optimizeFolder(

      child,

      result

    );

  }

  const seenFolders =
    new Set<string>();

  folder.folders =
    folder.folders.filter(
      child => {

        const name =
          child.name.trim();

        if (
          seenFolders.has(
            name
          )
        ) {

          result
            .duplicateFoldersRemoved++;

          return false;

        }

        seenFolders.add(
          name
        );

        return true;

      }
    );

  folder.folders =
    folder.folders.filter(
      child => {

        const empty =

          child.folders.length === 0 &&

          child.placemarks.length === 0;

        if (empty) {

          result
            .emptyFoldersRemoved++;

        }

        return !empty;

      }
    );

  return folder;

}

export function optimizeKml(

  data: ParsedKML

): OptimizationResult {

  const cloned =
    structuredClone(data);

  const result: OptimizationResult = {

    data: cloned,

    emptyFoldersRemoved: 0,

    duplicateFoldersRemoved: 0,

    duplicatePlacemarksRemoved: 0,

  };

  optimizeFolder(

    cloned.root,

    result

  );

  return result;

}
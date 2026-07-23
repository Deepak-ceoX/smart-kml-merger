import type {
  FolderNode,
  PlacemarkNode,
} from "@/types/kml";

export interface SearchResult {

  type: "folder" | "placemark";

  path: string;

  score: number;

  folder?: FolderNode;

  placemark?: PlacemarkNode;

}

function scoreText(
  query: string,
  text: string
): number {

  const q =
    query.toLowerCase();

  const t =
    text.toLowerCase();

  if (t === q) return 100;

  if (t.startsWith(q)) return 75;

  if (t.includes(q)) return 50;

  return 0;

}

function searchFolder(

  folder: FolderNode,

  query: string,

  path: string,

  results: SearchResult[]

) {

  const folderPath =
    `${path}/${folder.name}`;

  const folderScore =
    scoreText(
      query,
      folder.name
    );

  if (folderScore > 0) {

    results.push({

      type: "folder",

      path: folderPath,

      score: folderScore,

      folder,

    });

  }
    for (const placemark of folder.placemarks) {

    let score = scoreText(
      query,
      placemark.name
    );

    if (
      placemark.description
    ) {

      score = Math.max(
        score,
        scoreText(
          query,
          placemark.description
        )
      );

    }

    for (const item of placemark.extendedData) {

      score = Math.max(
        score,
        scoreText(
          query,
          item.name
        ),
        scoreText(
          query,
          item.value
        )
      );

    }

    if (score > 0) {

      results.push({

        type: "placemark",

        path:
          `${folderPath}/${placemark.name}`,

        score,

        placemark,

      });

    }

  }

  for (const child of folder.folders) {

    searchFolder(
      child,
      query,
      folderPath,
      results
    );

  }

}

export function searchKml(
  root: FolderNode,
  query: string
): SearchResult[] {

  const results: SearchResult[] = [];

  if (!query.trim())
    return results;

  searchFolder(
    root,
    query,
    "",
    results
  );

  return results.sort(
    (a, b) =>
      b.score - a.score
  );

}
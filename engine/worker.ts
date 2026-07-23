import type {
  ParsedKML,
} from "@/types/kml";

import {
  mergeKmlFiles,
} from "./merge-kml";

export interface WorkerRequest {

  type: "merge";

  files: ParsedKML[];

}

export interface WorkerResponse {

  type:
    | "progress"
    | "result"
    | "error";

  progress?: number;

  message?: string;

  result?: ReturnType<
    typeof mergeKmlFiles
  >;

}

export async function runMergeWorker(

  files: ParsedKML[],

  onProgress?: (
    progress: number,
    message: string
  ) => void

) {

  onProgress?.(
    5,
    "Preparing merge job..."
  );

  await new Promise(resolve =>
    setTimeout(resolve, 20)
  );

  onProgress?.(
    20,
    "Analyzing folders..."
  );

  await new Promise(resolve =>
    setTimeout(resolve, 20)
  );

  onProgress?.(
    45,
    "Merging placemarks..."
  );

  await new Promise(resolve =>
    setTimeout(resolve, 20)
  );

  onProgress?.(
    70,
    "Resolving duplicates..."
  );

  await new Promise(resolve =>
    setTimeout(resolve, 20)
  );

  const result =
    mergeKmlFiles(files);

  onProgress?.(
    100,
    "Merge completed."
  );

  return result;

}

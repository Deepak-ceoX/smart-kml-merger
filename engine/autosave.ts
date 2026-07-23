import type {
  ParsedKML,
} from "@/types/kml";

const STORAGE_KEY =
  "smart-kml-autosave";

export function saveProject(

  data: ParsedKML

): void {

  if (
    typeof window ===
    "undefined"
  ) {

    return;

  }

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify({

      savedAt:
        Date.now(),

      project:
        data,

    })

  );

}

export function loadProject():

  | ParsedKML
  | null {

  if (
    typeof window ===
    "undefined"
  ) {

    return null;

  }

  const raw =
    localStorage.getItem(
      STORAGE_KEY
    );

  if (!raw)
    return null;

  try {

    const parsed =
      JSON.parse(raw);

    return parsed.project ??
      null;

  } catch {

    return null;

  }

}

export function hasAutoSave() {

  if (
    typeof window ===
    "undefined"
  ) {

    return false;

  }

  return localStorage.getItem(
    STORAGE_KEY
  ) !== null;

}

export function clearAutoSave() {

  if (
    typeof window ===
    "undefined"
  ) {

    return;

  }

  localStorage.removeItem(
    STORAGE_KEY
  );

}

export function getAutoSaveTime():

  | Date
  | null {

  if (
    typeof window ===
    "undefined"
  ) {

    return null;

  }

  const raw =
    localStorage.getItem(
      STORAGE_KEY
    );

  if (!raw)
    return null;

  try {

    return new Date(

      JSON.parse(raw)
        .savedAt

    );

  } catch {

    return null;

  }

}

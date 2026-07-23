export interface StudioSettings {

  darkMode: boolean;

  autoSave: boolean;

  smartMerge: boolean;

  removeDuplicates: boolean;

  geometryAwareMerge: boolean;

  preserveStyles: boolean;

  preserveExtendedData: boolean;

  preserveTimeData: boolean;

  compressionEnabled: boolean;

  kmzEnabled: boolean;

}

const STORAGE_KEY =
  "smart-kml-studio-settings";

export const defaultSettings: StudioSettings = {

  darkMode: true,

  autoSave: true,

  smartMerge: true,

  removeDuplicates: true,

  geometryAwareMerge: true,

  preserveStyles: true,

  preserveExtendedData: true,

  preserveTimeData: true,

  compressionEnabled: true,

  kmzEnabled: false,

};

export function loadSettings(): StudioSettings {

  if (
    typeof window === "undefined"
  ) {

    return defaultSettings;

  }

  try {

    const saved =
      localStorage.getItem(
        STORAGE_KEY
      );

    if (!saved)
      return defaultSettings;

    return {

      ...defaultSettings,

      ...JSON.parse(saved),

    };

  } catch {

    return defaultSettings;

  }

}

export function saveSettings(

  settings: StudioSettings

): void {

  if (
    typeof window === "undefined"
  ) {

    return;

  }

  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(settings)

  );

}

export function resetSettings(): StudioSettings {

  saveSettings(
    defaultSettings
  );

  return defaultSettings;

}

"use client";

import type { PlacemarkNode } from "@/types/kml";

interface TreePlacemarkProps {
  placemark: PlacemarkNode;
}

function geometryIcon(type: string) {
  switch (type) {
    case "Point":
      return "📍";

    case "LineString":
      return "🛣️";

    case "Polygon":
      return "🟩";

    case "MultiGeometry":
      return "🌐";

    default:
      return "📌";
  }
}

export function TreePlacemark({ placemark }: TreePlacemarkProps) {
  return (
    <div className="ml-10 flex items-start gap-3 rounded-lg px-2 py-2 transition hover:bg-zinc-800">
      <span className="mt-1 text-lg">
        {geometryIcon(placemark.geometryType)}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-medium text-zinc-200">
              {placemark.name || "Unnamed Placemark"}
            </p>

            <p className="text-xs text-zinc-500">
              {placemark.geometryType}
            </p>
          </div>

          {!placemark.visibility && (
            <span className="rounded bg-red-500/20 px-2 py-1 text-xs text-red-400">
              Hidden
            </span>
          )}
        </div>

        {placemark.description && (
          <p className="mt-2 text-sm text-zinc-400">
            {placemark.description}
          </p>
        )}

        {placemark.extendedData.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {placemark.extendedData.map((item) => (
              <span
                key={`${item.name}-${item.value}`}
                className="rounded bg-zinc-800 px-2 py-1 text-[10px] text-zinc-400"
              >
                {item.name}: {item.value}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
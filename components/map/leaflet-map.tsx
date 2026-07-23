"use client";

import { useEffect, useRef } from "react";

import type {
  ParsedKML,
  FolderNode,
} from "@/types/kml";

interface LeafletMapProps {

  data: ParsedKML | null;

}

interface Point {

  lat: number;

  lng: number;

}

function collectPoints(

  folder: FolderNode,

  points: Point[] = []

): Point[] {

  for (const placemark of folder.placemarks) {

    if (
      placemark.geometryType === "Point"
    ) {

      const first =
        placemark.geometry.coordinates
          .trim()
          .split(/\s+/)[0];

      if (!first) continue;

      const [lng, lat] =
        first.split(",").map(Number);

      if (
        Number.isFinite(lat) &&
        Number.isFinite(lng)
      ) {

        points.push({
          lat,
          lng,
        });

      }

    }

  }

  for (const child of folder.folders) {

    collectPoints(
      child,
      points
    );

  }

  return points;

}

export function LeafletMap({

  data,

}: LeafletMapProps) {

  const mapRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (!mapRef.current || !data) return;

    const points =
      collectPoints(
        data.root
      );

    mapRef.current.innerHTML = "";

    const container =
      document.createElement("div");

    container.className =
      "flex h-full items-center justify-center text-center text-zinc-400";

    container.innerHTML = `
      <div>
        <div class="text-6xl mb-4">🗺️</div>
        <h3 class="text-xl font-bold text-white">Leaflet Integration Ready</h3>
        <p class="mt-2">Detected <span class="font-semibold text-blue-400">${points.length}</span> point geometries.</p>
        <p class="mt-2 text-sm">Install <code class="rounded bg-zinc-800 px-1 py-0.5">leaflet</code> and <code class="rounded bg-zinc-800 px-1 py-0.5">react-leaflet</code> to enable live map rendering.</p>
      </div>
    `;

    mapRef.current.appendChild(
      container
    );

  }, [data]);
    return (

    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">

      <div className="border-b border-zinc-800 p-5">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">

              🗺️ Live Map Preview

            </h2>

            <p className="mt-1 text-zinc-400">

              OpenStreetMap / Leaflet integration

            </p>

          </div>

          <div className="rounded-xl bg-green-500/20 px-3 py-2 text-sm font-medium text-green-400">

            Ready

          </div>

        </div>

      </div>

      <div

        ref={mapRef}

        className="h-[520px] w-full bg-zinc-950"

      />

      <div className="grid gap-4 border-t border-zinc-800 p-5 md:grid-cols-3">

        <div className="rounded-xl bg-zinc-950 p-4">

          <p className="text-sm text-zinc-500">

            Data Source

          </p>

          <p className="mt-2 font-semibold">

            OpenStreetMap

          </p>

        </div>

        <div className="rounded-xl bg-zinc-950 p-4">

          <p className="text-sm text-zinc-500">

            Renderer

          </p>

          <p className="mt-2 font-semibold">

            Leaflet

          </p>

        </div>

        <div className="rounded-xl bg-zinc-950 p-4">

          <p className="text-sm text-zinc-500">

            Geometry Support

          </p>

          <p className="mt-2 font-semibold">

            Point / Line / Polygon

          </p>

        </div>

      </div>

    </div>

  );

}
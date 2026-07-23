"use client";

import type {

  ParsedKML,

  FolderNode,

} from "@/types/kml";

interface MapPreviewProps {

  data: ParsedKML | null;

}

function countFolders(

  folder: FolderNode

): number {

  let total = 1;

  for (const child of folder.folders) {

    total += countFolders(

      child

    );

  }

  return total;

}

function countPlacemarks(

  folder: FolderNode

): number {

  let total =

    folder.placemarks.length;

  for (const child of folder.folders) {

    total += countPlacemarks(

      child

    );

  }

  return total;

}

export function MapPreview({

  data,

}: MapPreviewProps) {

  if (!data) {

    return (

      <section className="mx-auto mt-10 max-w-6xl px-6">

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">

          <div className="text-7xl">

            🗺️

          </div>

          <h2 className="mt-5 text-3xl font-bold">

            Map Preview

          </h2>

          <p className="mt-3 text-zinc-400">

            Merge KML files to preview the resulting map.

          </p>

        </div>

      </section>

    );

  }

  const folders =

    countFolders(

      data.root

    );

  const placemarks =

    countPlacemarks(

      data.root

    );

  return (

    <section className="mx-auto mt-10 max-w-6xl px-6">

      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">

        <div className="border-b border-zinc-800 p-6">

          <h2 className="text-3xl font-bold">

            🗺️ Map Preview

          </h2>

          <p className="mt-2 text-zinc-400">

            Interactive map integration coming next.

          </p>

        </div>
                <div className="flex h-[500px] items-center justify-center bg-gradient-to-br from-zinc-950 to-zinc-900">

          <div className="text-center">

            <div className="mb-6 text-8xl">

              🌍

            </div>

            <h3 className="text-2xl font-bold">

              Map Engine Ready

            </h3>

            <p className="mt-3 max-w-lg text-zinc-400">

              This placeholder will later be replaced with an interactive
              Leaflet or OpenLayers map capable of displaying Points,
              LineStrings, Polygons and MultiGeometry directly from the
              merged KML.

            </p>

          </div>

        </div>

        <div className="grid gap-4 border-t border-zinc-800 p-6 md:grid-cols-4">

          <div className="rounded-xl bg-zinc-950 p-4">

            <p className="text-sm text-zinc-500">

              Project

            </p>

            <p className="mt-2 font-semibold truncate">

              {data.name}

            </p>

          </div>

          <div className="rounded-xl bg-zinc-950 p-4">

            <p className="text-sm text-zinc-500">

              Folders

            </p>

            <p className="mt-2 text-3xl font-bold">

              {folders}

            </p>

          </div>

          <div className="rounded-xl bg-zinc-950 p-4">

            <p className="text-sm text-zinc-500">

              Placemarks

            </p>

            <p className="mt-2 text-3xl font-bold">

              {placemarks}

            </p>

          </div>

          <div className="rounded-xl bg-zinc-950 p-4">

            <p className="text-sm text-zinc-500">

              Status

            </p>

            <p className="mt-2 font-semibold text-green-400">

              Ready for Visualization

            </p>

          </div>

        </div>

      </div>

    </section>

  );

}
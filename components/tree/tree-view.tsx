"use client";

import { useMemo, useState } from "react";

import type {
  ParsedKML,
  MergeStatistics,
} from "@/types/kml";

import { exportKml } from "@/engine/exporter";
import { downloadFile } from "@/lib/download";

import { TreeFolder } from "./tree-folder";
import { TreeSearch } from "./tree-search";

interface TreeViewProps {
  data: ParsedKML | null;
  stats?: MergeStatistics;
}

export function TreeView({ data, stats }: TreeViewProps) {
  const [search, setSearch] = useState("");

  const qualityScore = useMemo(() => {
    if (!stats) return 100;

    const duplicatePenalty = Math.min(40, stats.duplicatesRemoved);

    return Math.max(60, 100 - duplicatePenalty);
  }, [stats]);

  function handleDownload() {
    if (!data) return;

    const xml = exportKml(data);

    downloadFile(
      `${data.name.replace(".kml", "")}-merged.kml`,
      xml
    );
  }

  if (!data) {
    return (
      <section className="mx-auto mt-10 max-w-6xl px-6">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
          <div className="text-7xl">🌳</div>

          <h2 className="mt-5 text-3xl font-bold">Tree Preview</h2>

          <p className="mt-3 text-zinc-400">
            Merge two or more KML files to preview the merged structure.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto mt-10 max-w-7xl px-6">
      <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900">
        {/* Header */}
        <div className="border-b border-zinc-800 p-6">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold">🌳 Merged Tree</h2>

              <p className="mt-2 text-zinc-400">{data.name}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-xl bg-green-500/20 px-4 py-2 text-green-400">
                Ready
              </div>

              <div className="rounded-xl bg-blue-500/20 px-4 py-2 text-blue-300">
                Quality {qualityScore}%
              </div>

              <button
                onClick={handleDownload}
                className="rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
              >
                📥 Download KML
              </button>
            </div>
          </div>

          <div className="mt-6">
            <TreeSearch value={search} onChange={setSearch} />
          </div>

          {stats && (
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
              <div className="rounded-xl bg-zinc-800 p-3">
                <p className="text-xs text-zinc-400">Files</p>
                <p className="mt-1 text-xl font-bold">{stats.filesMerged}</p>
              </div>

              <div className="rounded-xl bg-zinc-800 p-3">
                <p className="text-xs text-zinc-400">Folders</p>
                <p className="mt-1 text-xl font-bold">{stats.foldersMerged}</p>
              </div>

              <div className="rounded-xl bg-zinc-800 p-3">
                <p className="text-xs text-zinc-400">Placemarks</p>
                <p className="mt-1 text-xl font-bold">{stats.placemarksMerged}</p>
              </div>

              <div className="rounded-xl bg-zinc-800 p-3">
                <p className="text-xs text-zinc-400">Duplicates</p>
                <p className="mt-1 text-xl font-bold text-red-400">
                  {stats.duplicatesRemoved}
                </p>
              </div>

              <div className="rounded-xl bg-zinc-800 p-3">
                <p className="text-xs text-zinc-400">Points</p>
                <p className="mt-1 text-xl font-bold">{stats.points}</p>
              </div>

              <div className="rounded-xl bg-zinc-800 p-3">
                <p className="text-xs text-zinc-400">Lines</p>
                <p className="mt-1 text-xl font-bold">{stats.lineStrings}</p>
              </div>

              <div className="rounded-xl bg-zinc-800 p-3">
                <p className="text-xs text-zinc-400">Polygons</p>
                <p className="mt-1 text-xl font-bold">{stats.polygons}</p>
              </div>

              <div className="rounded-xl bg-zinc-800 p-3">
                <p className="text-xs text-zinc-400">Merge Time</p>
                <p className="mt-1 text-xl font-bold">
                  {stats.mergeTimeMs.toFixed(1)} ms
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Tree */}
        <div className="max-h-[700px] overflow-auto bg-zinc-950 p-6">
          {search.trim() !== "" && (
            <div className="mb-5 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3">
              <span className="text-sm text-blue-300">
                Showing results for
                <span className="ml-2 font-semibold">
                  "{search}"
                </span>
              </span>
            </div>
          )}

          <TreeFolder folder={data.root} search={search} />
        </div>
      </div>
    </section>
  );
}
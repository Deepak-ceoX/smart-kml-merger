import type {
  MergeStatistics,
} from "@/types/kml";

interface TreeStatisticsProps {

  stats: MergeStatistics;

  quality: number;

}

export function TreeStatistics({

  stats,

  quality,

}: TreeStatisticsProps) {

  return (

    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-9">

      <div className="rounded-xl bg-zinc-800 p-3">

        <p className="text-xs text-zinc-400">

          Files

        </p>

        <p className="mt-2 text-xl font-bold">

          {stats.filesMerged}

        </p>

      </div>

      <div className="rounded-xl bg-zinc-800 p-3">

        <p className="text-xs text-zinc-400">

          Folders

        </p>

        <p className="mt-2 text-xl font-bold">

          {stats.foldersMerged}

        </p>

      </div>

      <div className="rounded-xl bg-zinc-800 p-3">

        <p className="text-xs text-zinc-400">

          Placemarks

        </p>

        <p className="mt-2 text-xl font-bold">

          {stats.placemarksMerged}

        </p>

      </div>

      <div className="rounded-xl bg-zinc-800 p-3">

        <p className="text-xs text-zinc-400">

          Duplicates

        </p>

        <p className="mt-2 text-xl font-bold text-red-400">

          {stats.duplicatesRemoved}

        </p>

      </div>

      <div className="rounded-xl bg-zinc-800 p-3">

        <p className="text-xs text-zinc-400">

          Quality

        </p>

        <p className="mt-2 text-xl font-bold text-green-400">

          {quality}%

        </p>

      </div>
            <div className="rounded-xl bg-zinc-800 p-3">

        <p className="text-xs text-zinc-400">

          Points

        </p>

        <p className="mt-2 text-xl font-bold">

          {stats.points}

        </p>

      </div>

      <div className="rounded-xl bg-zinc-800 p-3">

        <p className="text-xs text-zinc-400">

          Lines

        </p>

        <p className="mt-2 text-xl font-bold">

          {stats.lineStrings}

        </p>

      </div>

      <div className="rounded-xl bg-zinc-800 p-3">

        <p className="text-xs text-zinc-400">

          Polygons

        </p>

        <p className="mt-2 text-xl font-bold">

          {stats.polygons}

        </p>

      </div>

      <div className="rounded-xl bg-zinc-800 p-3">

        <p className="text-xs text-zinc-400">

          Merge Time

        </p>

        <p className="mt-2 text-xl font-bold">

          {stats.mergeTimeMs.toFixed(1)} ms

        </p>

      </div>

    </div>

  );

}

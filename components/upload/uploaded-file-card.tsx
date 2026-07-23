import { useMemo } from "react";

interface UploadedFileCardProps {

  file: File;

  index: number;

  onRemove: (
    index: number
  ) => void;

}

export function UploadedFileCard({

  file,

  index,

  onRemove,

}: UploadedFileCardProps) {

  const size =
    useMemo(() => {

      if (
        file.size <
        1024 * 1024
      ) {

        return `${(
          file.size / 1024
        ).toFixed(1)} KB`;

      }

      return `${(
        file.size /
        1024 /
        1024
      ).toFixed(2)} MB`;

    }, [file]);

  return (

    <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-5 transition hover:border-blue-500">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/20 text-3xl">

          📄

        </div>

        <div className="min-w-0 flex-1">

          <h3 className="truncate font-semibold text-white">

            {file.name}

          </h3>

          <div className="mt-2 flex flex-wrap gap-2">

            <span className="rounded bg-zinc-800 px-2 py-1 text-xs">

              KML

            </span>

            <span className="rounded bg-zinc-800 px-2 py-1 text-xs">

              {size}

            </span>

            <span className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-400">

              Ready

            </span>

          </div>

        </div>
                <button

          onClick={() =>
            onRemove(index)
          }

          className="rounded-xl bg-red-500/20 px-4 py-2 text-red-400 transition hover:bg-red-500 hover:text-white"

        >

          ✕ Remove

        </button>

      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">

        <div className="rounded-xl bg-zinc-950 p-3">

          <p className="text-xs text-zinc-500">

            Extension

          </p>

          <p className="mt-1 font-semibold">

            .kml

          </p>

        </div>

        <div className="rounded-xl bg-zinc-950 p-3">

          <p className="text-xs text-zinc-500">

            Last Modified

          </p>

          <p className="mt-1 font-semibold">

            {new Date(
              file.lastModified
            ).toLocaleDateString()}

          </p>

        </div>

        <div className="rounded-xl bg-zinc-950 p-3">

          <p className="text-xs text-zinc-500">

            Status

          </p>

          <p className="mt-1 font-semibold text-green-400">

            Valid

          </p>

        </div>

        <div className="rounded-xl bg-zinc-950 p-3">

          <p className="text-xs text-zinc-500">

            Size

          </p>

          <p className="mt-1 font-semibold">

            {size}

          </p>

        </div>

      </div>

    </div>

  );

}
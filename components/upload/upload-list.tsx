import { useMemo } from "react";

import { UploadedFileCard } from "./uploaded-file-card";

interface UploadListProps {

  files: File[];

  onRemove: (
    index: number
  ) => void;

  onClear: () => void;

  onMerge: () => void;

}

export function UploadList({

  files,

  onRemove,

  onClear,

  onMerge,

}: UploadListProps) {

  const totalSize =
    useMemo(() => {

      return files.reduce(

        (sum, file) =>
          sum + file.size,

        0

      );

    }, [files]);

  const ready =
    files.length >= 2;

  return (

    <div className="mt-10 space-y-6">

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>

          <h2 className="text-2xl font-bold">

            Uploaded Files

          </h2>

          <p className="mt-1 text-zinc-400">

            {files.length} KML file{files.length !== 1 ? "s" : ""} ready

          </p>

        </div>

        <div className="rounded-xl bg-zinc-800 px-4 py-3 text-right">

          <p className="text-xs text-zinc-400">

            Total Size

          </p>

          <p className="text-lg font-bold">

            {(totalSize / 1024 / 1024).toFixed(2)} MB

          </p>

        </div>

      </div>

      <div className="space-y-4">

        {files.map((file, index) => (

          <UploadedFileCard

            key={`${file.name}-${file.lastModified}`}

            file={file}

            index={index}

            onRemove={onRemove}

          />

        ))}

      </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">

          <p className="text-sm text-zinc-400">

            Files

          </p>

          <p className="mt-2 text-3xl font-bold">

            {files.length}

          </p>

        </div>

        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">

          <p className="text-sm text-zinc-400">

            Total Size

          </p>

          <p className="mt-2 text-3xl font-bold">

            {(totalSize / 1024 / 1024).toFixed(2)} MB

          </p>

        </div>

        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">

          <p className="text-sm text-zinc-400">

            Status

          </p>

          <p
            className={`mt-2 text-3xl font-bold ${
              ready
                ? "text-green-400"
                : "text-yellow-400"
            }`}
          >

            {ready
              ? "Ready"
              : "Waiting"}

          </p>

        </div>

        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">

          <p className="text-sm text-zinc-400">

            Format

          </p>

          <p className="mt-2 text-3xl font-bold">

            KML

          </p>

        </div>

      </div>

      <div className="flex flex-wrap gap-4">

        <button

          onClick={onMerge}

          disabled={!ready}

          className={`flex-1 rounded-xl py-3 font-bold transition ${
            ready
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "cursor-not-allowed bg-zinc-700 text-zinc-500"
          }`}

        >

          🔀 Smart Merge

        </button>

        <button

          onClick={onClear}

          className="rounded-xl bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700"

        >

          🗑 Clear All

        </button>

      </div>

    </div>

  );

}
import { UploadedFileCard } from "./uploaded-file-card";

interface UploadListProps {
  files: File[];
  onRemove: (index: number) => void;
  onClear: () => void;
  onMerge: () => void;
}

export function UploadList({
  files,
  onRemove,
  onClear,
  onMerge,
}: UploadListProps) {
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  return (
    <div className="mt-10 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Uploaded Files ({files.length})
        </h2>

        <span className="rounded-lg bg-zinc-800 px-3 py-2 text-sm text-zinc-300">
          {(totalSize / 1024 / 1024).toFixed(2)} MB
        </span>
      </div>

      {/* File Cards */}
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

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
          <p className="text-sm text-zinc-400">Files</p>

          <p className="mt-2 text-3xl font-bold">
            {files.length}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-4">
          <p className="text-sm text-zinc-400">Total Size</p>

          <p className="mt-2 text-3xl font-bold">
            {(totalSize / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={onMerge}
          disabled={files.length < 2}
          className={`flex-1 rounded-xl py-3 font-bold transition ${
            files.length < 2
              ? "cursor-not-allowed bg-zinc-700 text-zinc-500"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          🔀 Merge Files
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
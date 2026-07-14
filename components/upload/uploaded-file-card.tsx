interface UploadedFileCardProps {
  file: File;
  index: number;
  onRemove: (index: number) => void;
}

export function UploadedFileCard({
  file,
  index,
  onRemove,
}: UploadedFileCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-700 bg-zinc-900 p-4 transition hover:border-blue-500">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/20 text-2xl">
          📄
        </div>

        <div>
          <p className="font-semibold text-white">{file.name}</p>

          <p className="text-sm text-zinc-400">
            {(file.size / 1024).toFixed(2)} KB
          </p>

          <span className="mt-1 inline-flex rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400">
            ✓ Parsed
          </span>
        </div>
      </div>

      <button
        onClick={() => onRemove(index)}
        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
}
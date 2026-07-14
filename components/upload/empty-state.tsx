export function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/40 p-12 text-center">
      <div className="mb-4 text-6xl">📂</div>

      <h2 className="text-2xl font-bold text-white">
        No KML Files Uploaded
      </h2>

      <p className="mt-3 text-zinc-400">
        Drag & drop your KML files above or click the upload area to browse.
      </p>

      <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-500">
        Supported format: <span className="font-semibold text-white">.kml</span>
        <br />
        Multiple files are supported.
      </div>
    </div>
  );
}
export function EmptyState() {

  return (

    <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-900/40 p-12 text-center">

      <div className="mb-6 text-7xl">

        🌍

      </div>

      <h2 className="text-3xl font-bold text-white">

        Smart KML Studio

      </h2>

      <p className="mt-3 text-zinc-400">

        Upload two or more KML files to begin an intelligent merge.

      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-left">

          <h3 className="mb-3 font-semibold">

            Supported Geometry

          </h3>

          <ul className="space-y-2 text-sm text-zinc-400">

            <li>📍 Point</li>

            <li>🛣️ LineString</li>

            <li>🟩 Polygon</li>

            <li>🌐 MultiGeometry</li>

          </ul>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-left">

          <h3 className="mb-3 font-semibold">

            Merge Features

          </h3>

          <ul className="space-y-2 text-sm text-zinc-400">

            <li>✅ Smart Folder Merge</li>

            <li>✅ Duplicate Removal</li>

            <li>✅ Style Preservation</li>

            <li>✅ Tree Viewer</li>

            <li>✅ Export KML</li>

            <li>✅ Merge Statistics</li>

          </ul>

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">

        <p className="text-sm text-zinc-500">

          Supported Format:

          <span className="ml-2 font-semibold text-white">

            .kml

          </span>

        </p>

        <p className="mt-2 text-sm text-zinc-500">

          Drag & Drop multiple KML files or click the upload area to browse.

        </p>

      </div>

    </div>

  );

}

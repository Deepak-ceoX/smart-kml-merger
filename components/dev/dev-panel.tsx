"use client";

export function DevPanel() {
  return (
    <section className="mx-auto mt-12 max-w-5xl rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-6">
      <h2 className="mb-4 text-2xl font-bold text-yellow-400">
        🛠 Developer Panel
      </h2>

      <div className="flex flex-wrap gap-4">
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
        >
          Test Parser
        </button>

        <button
          className="rounded-lg bg-green-600 px-4 py-2 hover:bg-green-700"
        >
          Test Merge
        </button>

        <button
          className="rounded-lg bg-purple-600 px-4 py-2 hover:bg-purple-700"
        >
          Generate Sample KML
        </button>

        <button
          className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700"
        >
          Clear Console
        </button>
      </div>
    </section>
  );
}
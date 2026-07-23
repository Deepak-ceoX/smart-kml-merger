export function Hero() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-sm text-blue-400">
        🚀 Open Source • Offline • No API Keys
      </div>

      <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl">
        Smart <span className="text-blue-500">KML</span> Merger
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-zinc-400">
        Merge, clean, optimize, and compress KML files intelligently — all
        locally in your browser.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a
          href="#upload"
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700"
        >
          Upload KML Files
        </a>

        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-zinc-700 px-6 py-3 font-semibold text-white transition hover:border-blue-500 hover:bg-zinc-900"
        >
          Documentation
        </a>
      </div>
    </section>
  );
}
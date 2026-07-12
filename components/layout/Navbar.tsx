export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-bold">
            Smart <span className="text-blue-500">KML</span> Merger
          </h1>
          <p className="text-xs text-zinc-400">
            Merge • Clean • Optimize
          </p>
        </div>

        <button className="rounded-lg border border-zinc-700 px-4 py-2 text-sm transition hover:border-blue-500 hover:bg-zinc-900">
          GitHub
        </button>
      </div>
    </header>
  );
}
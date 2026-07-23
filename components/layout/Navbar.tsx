"use client";

interface NavbarProps {
  onSettings?: () => void;
  onReport?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
}

export function Navbar({
  onSettings,
  onReport,
  onUndo,
  onRedo,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-bold">
            🌍 Smart
            <span className="text-blue-500"> KML Studio</span>
          </h1>

          <p className="text-xs text-zinc-400">
            Merge • Clean • Optimize • Analyze
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-green-500/15 px-3 py-2 text-sm font-medium text-green-400">
            ● Ready
          </div>

          <button
            onClick={onUndo}
            className="rounded-lg border border-zinc-700 px-3 py-2 text-sm transition hover:border-blue-500 hover:bg-zinc-900"
          >
            ↶ Undo
          </button>

          <button
            onClick={onRedo}
            className="rounded-lg border border-zinc-700 px-3 py-2 text-sm transition hover:border-blue-500 hover:bg-zinc-900"
          >
            ↷ Redo
          </button>

          <button
            onClick={onReport}
            className="rounded-lg border border-zinc-700 px-3 py-2 text-sm transition hover:border-blue-500 hover:bg-zinc-900"
          >
            📊 Report
          </button>

          <button
            onClick={onSettings}
            className="rounded-lg border border-zinc-700 px-3 py-2 text-sm transition hover:border-blue-500 hover:bg-zinc-900"
          >
            ⚙ Settings
          </button>

          <button
            onClick={() =>
              window.open(
                "https://github.com/",
                "_blank",
                "noopener,noreferrer"
              )
            }
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            🐙 GitHub
          </button>
        </div>
      </div>
    </header>
  );
}
"use client";

interface ProgressOverlayProps {

  open: boolean;

  progress: number;

  stage: string;

}

export function ProgressOverlay({

  open,

  progress,

  stage,

}: ProgressOverlayProps) {

  if (!open) {

    return null;

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

        <div className="text-center">

          <div className="mb-5 text-6xl">

            🌍

          </div>

          <h2 className="text-3xl font-bold">

            Smart KML Studio

          </h2>

          <p className="mt-3 text-zinc-400">

            {stage}

          </p>

        </div>

        <div className="mt-8">

          <div className="h-4 overflow-hidden rounded-full bg-zinc-800">

            <div

              className="h-full rounded-full bg-blue-500 transition-all duration-300"

              style={{

                width: `${Math.min(
                  100,
                  Math.max(
                    0,
                    progress
                  )
                )}%`,

              }}

            />

          </div>

          <div className="mt-4 flex items-center justify-between text-sm">

            <span className="text-zinc-400">

              Progress

            </span>

            <span className="font-semibold text-blue-400">

              {progress.toFixed(0)}%

            </span>

          </div>

        </div>
                <div className="mt-8 grid grid-cols-3 gap-4">

          <div className="rounded-xl bg-zinc-950 p-4 text-center">

            <div className="text-2xl">

              📂

            </div>

            <p className="mt-2 text-xs text-zinc-500">

              Read Files

            </p>

          </div>

          <div className="rounded-xl bg-zinc-950 p-4 text-center">

            <div className="text-2xl">

              🔀

            </div>

            <p className="mt-2 text-xs text-zinc-500">

              Merge

            </p>

          </div>

          <div className="rounded-xl bg-zinc-950 p-4 text-center">

            <div className="text-2xl">

              📤

            </div>

            <p className="mt-2 text-xs text-zinc-500">

              Export

            </p>

          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4">

          <p className="text-center text-sm text-blue-300">

            Please keep this window open while Smart KML Studio processes your files.

          </p>

        </div>

      </div>

    </div>

  );

}
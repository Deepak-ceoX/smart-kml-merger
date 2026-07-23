"use client";

import type {
  MergeReport,
} from "@/engine/merge-report";

interface MergeReportModalProps {

  open: boolean;

  report: MergeReport | null;

  onClose: () => void;

}

export function MergeReportModal({

  open,

  report,

  onClose,

}: MergeReportModalProps) {

  if (
    !open ||
    !report
  ) {

    return null;

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

      <div className="w-full max-w-4xl rounded-3xl border border-zinc-800 bg-zinc-900">

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div>

            <h2 className="text-3xl font-bold">

              📊 Merge Report

            </h2>

            <p className="mt-2 text-zinc-400">

              Generated {new Date(report.createdAt).toLocaleString()}

            </p>

          </div>

          <button

            onClick={onClose}

            className="rounded-xl bg-red-600 px-5 py-2 font-semibold"

          >

            Close

          </button>

        </div>
                <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl bg-zinc-950 p-5">

            <p className="text-sm text-zinc-400">

              Quality Score

            </p>

            <p className="mt-2 text-4xl font-bold text-green-400">

              {report.qualityScore}

            </p>

          </div>

          <div className="rounded-2xl bg-zinc-950 p-5">

            <p className="text-sm text-zinc-400">

              Files Merged

            </p>

            <p className="mt-2 text-4xl font-bold">

              {report.statistics.filesMerged}

            </p>

          </div>

          <div className="rounded-2xl bg-zinc-950 p-5">

            <p className="text-sm text-zinc-400">

              Folders

            </p>

            <p className="mt-2 text-4xl font-bold">

              {report.statistics.foldersMerged}

            </p>

          </div>

          <div className="rounded-2xl bg-zinc-950 p-5">

            <p className="text-sm text-zinc-400">

              Placemarks

            </p>

            <p className="mt-2 text-4xl font-bold">

              {report.statistics.placemarksMerged}

            </p>

          </div>

        </div>

        <div className="grid gap-6 border-t border-zinc-800 p-6 lg:grid-cols-2">

          <div className="rounded-2xl bg-zinc-950 p-5">

            <h3 className="mb-4 text-xl font-semibold">

              Merge Summary

            </h3>

            <ul className="space-y-3">

              {report.summary.map(

                (item, index) => (

                  <li

                    key={index}

                    className="flex items-start gap-3"

                  >

                    <span>

                      ✅

                    </span>

                    <span>

                      {item}

                    </span>

                  </li>

                )

              )}

            </ul>

          </div>
                    <div className="rounded-2xl bg-zinc-950 p-5">

            <h3 className="mb-4 text-xl font-semibold">

              Performance

            </h3>

            <div className="space-y-3">

              <div className="flex items-center justify-between">

                <span className="text-zinc-400">

                  Merge Time

                </span>

                <span className="font-semibold">

                  {report.performance.duration.toFixed(2)} ms

                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-zinc-400">

                  Memory Used

                </span>

                <span className="font-semibold">

                  {report.performance.memoryUsedMB} MB

                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-zinc-400">

                  Duplicates Removed

                </span>

                <span className="font-semibold">

                  {report.statistics.duplicatesRemoved}

                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-zinc-400">

                  Empty Folders Removed

                </span>

                <span className="font-semibold">

                  {report.optimization.emptyFoldersRemoved}

                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-zinc-400">

                  Duplicate Folders

                </span>

                <span className="font-semibold">

                  {report.optimization.duplicateFoldersRemoved}

                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-zinc-400">

                  Output Size

                </span>

                <span className="font-semibold">

                  {(report.statistics.outputSizeBytes / 1024).toFixed(2)} KB

                </span>

              </div>

            </div>

          </div>

        </div>
                <div className="flex flex-wrap items-center justify-end gap-3 border-t border-zinc-800 p-6">

          <button

            onClick={() => {

              const json = JSON.stringify(

                report,

                null,

                2

              );

              const blob = new Blob(

                [json],

                {

                  type: "application/json",

                }

              );

              const url =
                URL.createObjectURL(
                  blob
                );

              const link =
                document.createElement("a");

              link.href = url;

              link.download =
                "merge-report.json";

              document.body.appendChild(
                link
              );

              link.click();

              document.body.removeChild(
                link
              );

              URL.revokeObjectURL(
                url
              );

            }}

            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"

          >

            📥 Export Report

          </button>

          <button

            onClick={onClose}

            className="rounded-xl bg-zinc-700 px-5 py-3 font-semibold text-white transition hover:bg-zinc-600"

          >

            Close

          </button>

        </div>

      </div>

    </div>

  );

}

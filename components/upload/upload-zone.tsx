"use client";

import { useMemo, useRef, useState } from "react";

import { readKmlFile } from "@/lib/kml";

import {
  parseKml,
} from "@/engine/parser";

import {
  mergeKmlFiles,
  MergeResult,
} from "@/engine/merge-kml";

import type {
  ParsedKML,
} from "@/types/kml";

import { EmptyState } from "./empty-state";
import { UploadList } from "./upload-list";

interface UploadZoneProps {

  onMergeComplete: (
    merged: ParsedKML,
    result: MergeResult
  ) => void;

}

export function UploadZone({

  onMergeComplete,

}: UploadZoneProps) {

  const inputRef =
    useRef<HTMLInputElement>(null);

  const [files, setFiles] =
    useState<File[]>([]);

  const [dragging, setDragging] =
    useState(false);

  const [merging, setMerging] =
    useState(false);

  const totalSize =
    useMemo(() => {

      return files.reduce(

        (sum, file) =>
          sum + file.size,

        0

      );

    }, [files]);
      function addFiles(
    fileList: FileList | null
  ) {

    if (!fileList)
      return;

    const accepted =
      Array.from(fileList)
        .filter(file =>
          file.name
            .toLowerCase()
            .endsWith(".kml")
        );

    setFiles(prev => {

      const existing =
        new Set(
          prev.map(
            file =>
              `${file.name}-${file.size}`
          )
        );

      const unique =
        accepted.filter(
          file =>
            !existing.has(
              `${file.name}-${file.size}`
            )
        );

      return [

        ...prev,

        ...unique,

      ];

    });

  }

  async function processFiles(
    fileList: FileList | null
  ) {

    if (!fileList)
      return;

    try {

      for (const file of Array.from(fileList)) {

        const kml =
          await readKmlFile(file);

        parseKml(
          kml.content,
          kml.name
        );

      }

    } catch (error) {

      console.error(error);

      alert(
        "Invalid KML file detected."
      );

    }

  }

  async function handleBrowse(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    const selected =
      e.target.files;

    addFiles(selected);

    await processFiles(
      selected
    );

    e.target.value = "";

  }

  async function handleDrop(
    e: React.DragEvent<HTMLDivElement>
  ) {

    e.preventDefault();

    setDragging(false);

    const dropped =
      e.dataTransfer.files;

    addFiles(dropped);

    await processFiles(
      dropped
    );

  }
    function removeFile(
    index: number
  ) {

    setFiles(prev =>
      prev.filter(
        (_, i) =>
          i !== index
      )
    );

  }

  function clearFiles() {

    setFiles([]);

  }

  async function mergeFiles() {

    if (files.length < 2) {

      alert(
        "Please upload at least two KML files."
      );

      return;

    }

    setMerging(true);

    try {

      const parsedFiles: ParsedKML[] = [];

      for (const file of files) {

        const kml =
          await readKmlFile(file);

        parsedFiles.push(

          parseKml(
            kml.content,
            file.name
          )

        );

      }

      const result =
        mergeKmlFiles(
          parsedFiles
        );

      onMergeComplete(

        result.data,

        result

      );

      alert(
        `Merge completed successfully.\n\n` +
        `Files: ${result.stats.filesMerged}\n` +
        `Folders: ${result.stats.foldersMerged}\n` +
        `Placemarks: ${result.stats.placemarksMerged}\n` +
        `Duplicates Removed: ${result.stats.duplicatesRemoved}`
      );

    } catch (error) {

      console.error(error);

      alert(
        "Failed to merge KML files."
      );

    } finally {

      setMerging(false);

    }

  }
    return (

    <section
      id="upload"
      className="mx-auto mt-16 max-w-6xl px-6"
    >

      <div

        onClick={() =>
          inputRef.current?.click()
        }

        onDragOver={(e) => {

          e.preventDefault();

          setDragging(true);

        }}

        onDragLeave={() =>
          setDragging(false)
        }

        onDrop={handleDrop}

        className={`cursor-pointer rounded-3xl border-2 border-dashed p-14 text-center transition-all duration-300 ${
          dragging
            ? "border-blue-500 bg-blue-500/10"
            : "border-zinc-700 hover:border-blue-500 hover:bg-zinc-900/30"
        }`}

      >

        <input

          ref={inputRef}

          hidden

          multiple

          type="file"

          accept=".kml"

          onChange={handleBrowse}

        />

        <div className="space-y-5">

          <div className="text-7xl">

            {dragging ? "📥" : "📂"}

          </div>

          <h2 className="text-4xl font-bold">

            Drag & Drop KML Files

          </h2>

          <p className="text-lg text-zinc-400">

            or click anywhere to browse

          </p>

          <button

            type="button"

            onClick={(e) => {

              e.stopPropagation();

              inputRef.current?.click();

            }}

            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"

          >

            Browse Files

          </button>

          <p className="text-sm text-zinc-500">

            Supports multiple .kml files

          </p>

        </div>

      </div>
            {files.length === 0 ? (

        <div className="mt-8">

          <EmptyState />

        </div>

      ) : (

        <UploadList

          files={files}

          onRemove={removeFile}

          onClear={clearFiles}

          onMerge={mergeFiles}

        />

      )}

      {merging && (

        <div className="mt-8 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5">

          <div className="flex items-center gap-3">

            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-400 border-t-transparent"></div>

            <span className="font-medium text-blue-300">

              Smart Merge Engine Running...

            </span>

          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">

            <div className="h-full w-full animate-pulse rounded-full bg-blue-500"></div>

          </div>

        </div>

      )}

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">

        <h3 className="mb-4 text-xl font-semibold">

          Upload Statistics

        </h3>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

          <div className="rounded-xl bg-zinc-900 p-4">

            <p className="text-sm text-zinc-400">

              Files

            </p>

            <p className="mt-2 text-2xl font-bold">

              {files.length}

            </p>

          </div>

          <div className="rounded-xl bg-zinc-900 p-4">

            <p className="text-sm text-zinc-400">

              Total Size

            </p>

            <p className="mt-2 text-2xl font-bold">

              {(totalSize / 1024 / 1024).toFixed(2)} MB

            </p>

          </div>
                    <div className="rounded-xl bg-zinc-900 p-4">

            <p className="text-sm text-zinc-400">

              Ready

            </p>

            <p className="mt-2 text-2xl font-bold text-green-400">

              {files.length > 1
                ? "Yes"
                : "No"}

            </p>

          </div>

          <div className="rounded-xl bg-zinc-900 p-4">

            <p className="text-sm text-zinc-400">

              Status

            </p>

            <p className="mt-2 text-2xl font-bold text-blue-400">

              {merging
                ? "Working"
                : "Idle"}

            </p>

          </div>

        </div>

      </div>

    </section>

  );

}
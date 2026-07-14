"use client";

import { useRef, useState } from "react";

import { readKmlFile } from "@/lib/kml";
import { parseKml } from "@/engine/parser";
import { mergeKmlFiles } from "@/engine/merge-kml";

import { EmptyState } from "./empty-state";
import { UploadList } from "./upload-list";

export function UploadZone() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [merging, setMerging] = useState(false);

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;

    const accepted = Array.from(fileList).filter((file) =>
      file.name.toLowerCase().endsWith(".kml")
    );

    setFiles((prev) => [...prev, ...accepted]);
  }

  async function processFiles(fileList: FileList | null) {
    if (!fileList) return;

    try {
      const parsedFiles = [];

      for (const file of Array.from(fileList)) {
        const kml = await readKmlFile(file);

        const parsed = parseKml(kml.content, kml.name);

        parsedFiles.push(parsed);

        console.log("Parsed:", parsed);
      }
    } catch (err) {
      console.error(err);
      alert("Invalid KML file.");
    }
  }

  async function handleBrowse(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selected = e.target.files;

    addFiles(selected);
    await processFiles(selected);

    e.target.value = "";
  }

  async function handleDrop(
    e: React.DragEvent<HTMLDivElement>
  ) {
    e.preventDefault();

    setDragging(false);

    const dropped = e.dataTransfer.files;

    addFiles(dropped);

    await processFiles(dropped);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function clearFiles() {
    setFiles([]);
  }

  async function mergeFiles() {
    if (files.length < 2) {
      alert("Upload at least two KML files.");
      return;
    }

    setMerging(true);

    try {
      const parsed = [];

      for (const file of files) {
        const kml = await readKmlFile(file);

        parsed.push(parseKml(kml.content, file.name));
      }

      const merged = mergeKmlFiles(parsed);

      console.log("Merged Result");

      console.log(merged);

      alert("Merge completed successfully.");
    } catch (err) {
      console.error(err);
      alert("Merge failed.");
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
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
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
            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
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
        <div className="mt-8 rounded-xl border border-blue-500 bg-blue-500/10 p-4 text-center text-blue-400">
          🔄 Merging KML files...
        </div>
      )}
    </section>
  );
}
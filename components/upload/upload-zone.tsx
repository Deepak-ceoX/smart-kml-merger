"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export function UploadZone() {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("Accepted Files:", acceptedFiles);

    alert(`Uploaded ${acceptedFiles.length} file(s)!`);

    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.google-earth.kml+xml": [".kml"],
    },
    maxFiles: 20,
    maxSize: 100 * 1024 * 1024, // 100 MB
  });

  return (
    <section id="upload" className="mx-auto mt-12 max-w-5xl px-6">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
          isDragActive
            ? "border-blue-500 bg-blue-500/10"
            : "border-zinc-700 hover:border-blue-500 hover:bg-zinc-900/30"
        }`}
      >
        <input {...getInputProps()} />

        <div className="space-y-4">
          <div className="text-6xl">☁️</div>

          <h2 className="text-3xl font-bold">
            Drag & Drop KML Files
          </h2>

          <p className="text-zinc-400">
            or click to browse
          </p>

          <p className="text-sm text-zinc-500">
            Supports <span className="font-semibold">.kml</span> • Max{" "}
            <span className="font-semibold">20 files</span> •{" "}
            <span className="font-semibold">100 MB</span> each
          </p>
        </div>
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-4 text-xl font-bold">
            Uploaded Files ({files.length})
          </h3>

          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={`${file.name}-${file.lastModified}`}
                className="flex items-center justify-between rounded-xl border border-zinc-700 bg-zinc-900 p-4"
              >
                <div>
                  <p className="font-medium">{file.name}</p>

                  <p className="text-sm text-zinc-400">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>

                <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
                  Ready
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
"use client";

import { useState } from "react";

import type {
  ParsedKML,
  MergeStatistics,
} from "@/types/kml";

import type {
  MergeResult,
} from "@/engine/merge-kml";

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Footer } from "@/components/layout/Footer";

import { UploadZone } from "@/components/upload/upload-zone";
import { TreeView } from "@/components/tree/tree-view";

export default function Home() {
  const [mergedData, setMergedData] =
    useState<ParsedKML | null>(null);

  const [stats, setStats] =
    useState<MergeStatistics>();

  function handleMergeComplete(
    merged: ParsedKML,
    result: MergeResult
  ) {
    setMergedData(merged);
    setStats(result.stats);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar
        onSettings={() =>
          alert("⚙ Settings dialog coming next")
        }
        onReport={() =>
          alert("📊 Merge report coming next")
        }
        onUndo={() =>
          alert("↶ Undo functionality coming next")
        }
        onRedo={() =>
          alert("↷ Redo functionality coming next")
        }
      />

      <Hero />

      <UploadZone
        onMergeComplete={handleMergeComplete}
      />

      <TreeView
        data={mergedData}
        stats={stats}
      />

      <Features />

      <Footer />
    </main>
  );
}
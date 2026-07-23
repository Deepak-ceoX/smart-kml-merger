import type {
  MergeStatistics,
} from "@/types/kml";

import type {
  OptimizationResult,
} from "./optimizer";

import type {
  PerformanceMetrics,
} from "./performance";

export interface MergeReport {

  createdAt: string;

  qualityScore: number;

  statistics: MergeStatistics;

  optimization: OptimizationResult;

  performance: PerformanceMetrics;

  summary: string[];

}

function calculateQuality(

  stats: MergeStatistics,

  optimization: OptimizationResult

) {

  let score = 100;

  score -= Math.min(
    20,
    stats.duplicatesRemoved
  );

  score -= Math.min(
    10,
    optimization.emptyFoldersRemoved
  );

  score -= Math.min(
    10,
    optimization.duplicateFoldersRemoved
  );

  return Math.max(
    0,
    score
  );

}

export function generateMergeReport(

  statistics: MergeStatistics,

  optimization: OptimizationResult,

  performance: PerformanceMetrics

): MergeReport {

  const quality =
    calculateQuality(

      statistics,

      optimization

    );

  const summary: string[] = [];

  summary.push(

    `${statistics.filesMerged} files merged.`

  );

  summary.push(

    `${statistics.placemarksMerged} placemarks processed.`

  );

  summary.push(

    `${statistics.duplicatesRemoved} duplicate placemarks removed.`

  );

  summary.push(

    `${optimization.emptyFoldersRemoved} empty folders removed.`

  );

  summary.push(

    `${optimization.duplicateFoldersRemoved} duplicate folders removed.`

  );

  summary.push(

    `Completed in ${performance.duration.toFixed(2)} ms.`

  );

  return {

    createdAt:
      new Date().toISOString(),

    qualityScore:
      quality,

    statistics,

    optimization,

    performance,

    summary,

  };

}

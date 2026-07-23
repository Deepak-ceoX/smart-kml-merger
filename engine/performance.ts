export interface PerformanceMetrics {

  startTime: number;

  endTime: number;

  duration: number;

  filesProcessed: number;

  foldersProcessed: number;

  placemarksProcessed: number;

  memoryUsedMB: number;

}

let start = 0;

export function startPerformance() {

  start = performance.now();

}

export function endPerformance(

  filesProcessed: number,

  foldersProcessed: number,

  placemarksProcessed: number

): PerformanceMetrics {

  const end =
    performance.now();

  let memory = 0;

  if (
    "memory" in performance
  ) {

    const perf =
      performance as Performance & {

        memory?: {

          usedJSHeapSize: number;

        };

      };

    memory =
      (perf.memory
        ?.usedJSHeapSize ?? 0) /
      1024 /
      1024;

  }

  return {

    startTime: start,

    endTime: end,

    duration:
      end - start,

    filesProcessed,

    foldersProcessed,

    placemarksProcessed,

    memoryUsedMB:
      Number(
        memory.toFixed(2)
      ),

  };

}

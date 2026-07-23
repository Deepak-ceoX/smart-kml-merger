export type LogLevel =

  | "info"

  | "success"

  | "warning"

  | "error";

export interface LogEntry {

  id: number;

  level: LogLevel;

  message: string;

  timestamp: Date;

}

let counter = 0;

const logs: LogEntry[] = [];

function add(

  level: LogLevel,

  message: string

) {

  logs.push({

    id: ++counter,

    level,

    message,

    timestamp: new Date(),

  });

}

export function logInfo(

  message: string

) {

  add(

    "info",

    message

  );

}

export function logSuccess(

  message: string

) {

  add(

    "success",

    message

  );

}

export function logWarning(

  message: string

) {

  add(

    "warning",

    message

  );

}

export function logError(

  message: string

) {

  add(

    "error",

    message

  );

}

export function getLogs() {

  return [...logs];

}

export function clearLogs() {

  logs.length = 0;

}

export function exportLogs() {

  return JSON.stringify(

    logs,

    null,

    2

  );

}

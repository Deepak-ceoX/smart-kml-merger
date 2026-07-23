import type {
  ParsedKML,
} from "@/types/kml";

export interface HistoryState {

  timestamp: number;

  label: string;

  data: ParsedKML;

}

const history: HistoryState[] = [];

let pointer = -1;

export function clearHistory() {

  history.length = 0;

  pointer = -1;

}

export function pushHistory(

  label: string,

  data: ParsedKML

) {

  history.splice(
    pointer + 1
  );

  history.push({

    timestamp: Date.now(),

    label,

    data: structuredClone(data),

  });

  pointer = history.length - 1;

}

export function canUndo() {

  return pointer > 0;

}

export function canRedo() {

  return pointer < history.length - 1;

}

export function undo(): ParsedKML | null {

  if (!canUndo())
    return null;

  pointer--;

  return structuredClone(

    history[pointer].data

  );

}

export function redo(): ParsedKML | null {

  if (!canRedo())
    return null;

  pointer++;

  return structuredClone(

    history[pointer].data

  );

}

export function currentHistory() {

  if (pointer < 0)
    return null;

  return history[pointer];

}

export function getHistory() {

  return [...history];

}

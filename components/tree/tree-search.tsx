"use client";

interface TreeSearchProps {

  value: string;

  onChange: (
    value: string
  ) => void;

}

export function TreeSearch({

  value,

  onChange,

}: TreeSearchProps) {

  return (

    <div className="mb-6">

      <div className="relative">

        <span className="absolute left-4 top-1/2 -translate-y-1/2">

          🔍

        </span>

        <input

          value={value}

          onChange={(e) =>
            onChange(
              e.target.value
            )
          }

          placeholder="Search folders, placemarks..."

          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500"

        />

      </div>

    </div>

  );

}

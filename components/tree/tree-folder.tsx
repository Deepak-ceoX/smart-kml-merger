"use client";

import { useMemo, useState } from "react";

import type {
  FolderNode,
} from "@/types/kml";

import { TreePlacemark } from "./tree-placemark";

interface TreeFolderProps {

  folder: FolderNode;

  level?: number;

  search?: string;

}

export function TreeFolder({

  folder,

  level = 0,

  search = "",

}: TreeFolderProps) {

  const [expanded, setExpanded] =
    useState(true);

  const margin =
    level * 20;

  const query =
    search
      .trim()
      .toLowerCase();

  const visibleFolders =
    useMemo(() => {

      if (!query)
        return folder.folders;

      return folder.folders.filter(
        child =>
          child.name
            .toLowerCase()
            .includes(query)
      );

    }, [
      folder.folders,
      query,
    ]);

  const visiblePlacemarks =
    useMemo(() => {

      if (!query)
        return folder.placemarks;

      return folder.placemarks.filter(
        placemark =>
          placemark.name
            .toLowerCase()
            .includes(query)
      );

    }, [
      folder.placemarks,
      query,
    ]);

  return (

    <div
      style={{
        marginLeft: `${margin}px`,
      }}
      className="select-none"
    >

      <div
        onClick={() =>
          setExpanded(
            !expanded
          )
        }
        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 transition hover:bg-zinc-800"
      >

        <span className="w-5 text-center">

          {expanded
            ? "📂"
            : "📁"}

        </span>

        <span className="font-medium text-white">

          {folder.name ||
            "Unnamed Folder"}

        </span>

        <span className="ml-auto text-xs text-zinc-500">

          {visibleFolders.length}
          {" "}
          folders
          {" • "}
          {
            visiblePlacemarks.length
          }
          {" "}
          placemarks

        </span>

      </div>
            {expanded && (

        <div className="mt-1">

          {visibleFolders.map(
            (child) => (

              <TreeFolder
                key={child.id}
                folder={child}
                level={level + 1}
                search={search}
              />

            )
          )}

          {visiblePlacemarks.map(
  (placemark, index) => (

    <TreePlacemark
      key={`${placemark.id}-${placemark.name}-${index}`}
      placemark={placemark}
    />

  )
)}

          {visibleFolders.length === 0 &&
            visiblePlacemarks.length === 0 &&
            query && (

              <div className="ml-8 py-2 text-sm text-zinc-500">

                No matching items

              </div>

          )}

        </div>

      )}

    </div>

  );

}
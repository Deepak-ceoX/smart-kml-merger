"use client";

import { useEffect, useState } from "react";

import {

  defaultSettings,

  loadSettings,

  saveSettings,

  type StudioSettings,

} from "@/engine/settings";

interface SettingsDialogProps {

  open: boolean;

  onClose: () => void;

}

export function SettingsDialog({

  open,

  onClose,

}: SettingsDialogProps) {

  const [settings, setSettings] =

    useState<StudioSettings>(

      defaultSettings

    );

  useEffect(() => {

    if (open) {

      setSettings(

        loadSettings()

      );

    }

  }, [open]);

  if (!open) {

    return null;

  }

  function toggle(

    key: keyof StudioSettings

  ) {

    const updated = {

      ...settings,

      [key]:

        !settings[key],

    };

    setSettings(updated);

    saveSettings(updated);

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">

      <div className="w-full max-w-3xl rounded-3xl border border-zinc-800 bg-zinc-900">

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div>

            <h2 className="text-3xl font-bold">

              ⚙ Settings

            </h2>

            <p className="mt-2 text-zinc-400">

              Configure Smart KML Studio

            </p>

          </div>

          <button

            onClick={onClose}

            className="rounded-xl bg-red-600 px-5 py-2 font-semibold"

          >

            Close

          </button>

        </div>
                <div className="grid gap-4 p-6 md:grid-cols-2">

          {(

            Object.keys(

              settings

            ) as (

              keyof StudioSettings

            )[]

          ).map((key) => (

            <button

              key={key}

              onClick={() =>

                toggle(key)

              }

              className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-left transition hover:border-blue-500"

            >

              <div>

                <h3 className="font-semibold capitalize">

                  {key

                    .replace(

                      /([A-Z])/g,

                      " $1"

                    )

                    .replace(

                      /^./,

                      (c) =>

                        c.toUpperCase()

                    )}

                </h3>

                <p className="mt-1 text-sm text-zinc-500">

                  {settings[key]

                    ? "Enabled"

                    : "Disabled"}

                </p>

              </div>

              <div

                className={`flex h-7 w-14 items-center rounded-full p-1 transition ${
                  settings[key]
                    ? "bg-green-500"
                    : "bg-zinc-700"
                }`}

              >

                <div

                  className={`h-5 w-5 rounded-full bg-white transition ${
                    settings[key]
                      ? "translate-x-7"
                      : ""
                  }`}

                />

              </div>

            </button>

          ))}

        </div>
                <div className="flex items-center justify-between border-t border-zinc-800 p-6">

          <button

            onClick={() => {

              setSettings(

                defaultSettings

              );

              saveSettings(

                defaultSettings

              );

            }}

            className="rounded-xl bg-yellow-600 px-5 py-3 font-semibold text-white transition hover:bg-yellow-700"

          >

            Reset Defaults

          </button>

          <div className="flex gap-3">

            <button

              onClick={onClose}

              className="rounded-xl bg-zinc-700 px-5 py-3 font-semibold text-white transition hover:bg-zinc-600"

            >

              Cancel

            </button>

            <button

              onClick={onClose}

              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"

            >

              Save

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}
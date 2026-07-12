import { FeatureCard } from "./feature-card";

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold">
          Why Smart KML Merger?
        </h2>

        <p className="mt-4 text-zinc-400">
          Everything you need to merge, clean, and optimize KML files.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <FeatureCard
          icon="🧠"
          title="Smart Merge"
          description="Merge folders and documents recursively without creating duplicates."
        />

        <FeatureCard
          icon="🧹"
          title="Smart Cleanup"
          description="Automatically remove duplicate folders, placemarks, and unnecessary XML."
        />

        <FeatureCard
          icon="⚡"
          title="Fast & Offline"
          description="Runs entirely in your browser. No uploads. No API keys. Your data stays local."
        />
      </div>
    </section>
  );
}
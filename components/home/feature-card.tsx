type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
};

export function FeatureCard({
  title,
  description,
  icon,
}: FeatureCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500">
      <div className="mb-4 text-4xl">{icon}</div>

      <h3 className="mb-2 text-xl font-semibold">{title}</h3>

      <p className="text-sm leading-6 text-zinc-400">
        {description}
      </p>
    </div>
  );
}
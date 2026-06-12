import { TrendingUp } from "lucide-react";

/**
 * ImpactMetrics - displays a grid of project impact cards.
 *
 * Props:
 *   metrics: Array<{ label: string, value: string }>
 */
function ImpactMetrics({ metrics = [] }) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <TrendingUp size={16} className="text-emerald-400" />
        <h3 className="text-sm font-inter font-bold text-emerald-400 tracking-[0.15em] uppercase">
          Impact Metrics
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="flex flex-col gap-1 bg-emerald-500/[0.05] border border-emerald-500/15 rounded-xl p-4 hover:border-emerald-500/30 transition-colors"
          >
            <span className="text-xl font-outfit font-extrabold text-emerald-400 leading-none">
              {m.value}
            </span>
            <span className="text-xs font-inter text-zinc-400 leading-snug mt-1">
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImpactMetrics;

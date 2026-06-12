import { Star } from "lucide-react";

/**
 * Gold star badge shown on featured project cards.
 */
function FeaturedBadge({ className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-inter font-bold uppercase tracking-widest border bg-amber-500/10 text-amber-400 border-amber-500/30 backdrop-blur-sm ${className}`}
    >
      <Star size={10} fill="currentColor" />
      Featured
    </span>
  );
}

export default FeaturedBadge;

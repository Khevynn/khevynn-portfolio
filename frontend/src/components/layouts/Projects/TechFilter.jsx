import { useState, useMemo } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";

/** Category labels - order matters for display */
const CATEGORIES = [
  { value: "all", label: "All Projects" },
  { value: "Backend", label: "Backend" },
  { value: "Full Stack", label: "Full Stack" },
  { value: "Frontend", label: "Frontend" },
  { value: "Game Dev", label: "Game Dev" },
  { value: "Other", label: "Other" },
];

/**
 * TechFilter - filter bar for the project list page.
 *
 * Props:
 *   projects: Project[]         - unfiltered list
 *   onFilter: (filtered) => void - callback with filtered result
 */
function TechFilter({ projects = [], onFilter }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTags, setActiveTags] = useState([]);

  // Collect all unique tech tags across projects
  const allTags = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => {
      const tags = Array.isArray(p.techTags) ? p.techTags : [];
      // Also parse comma-separated usedTechnologies for legacy projects
      const legacy = p.usedTechnologies
        ? p.usedTechnologies.split(",").map((t) => t.trim())
        : [];
      [...tags, ...legacy].filter(Boolean).forEach((t) => set.add(t));
    });
    return Array.from(set).sort();
  }, [projects]);

  // Apply filters whenever any filter state changes
  useMemo(() => {
    let result = [...projects];

    // Category filter
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Tech tag filter (AND logic - all active tags must be present)
    if (activeTags.length > 0) {
      result = result.filter((p) => {
        const tags = Array.isArray(p.techTags) ? p.techTags : [];
        const legacy = p.usedTechnologies
          ? p.usedTechnologies.split(",").map((t) => t.trim())
          : [];
        const allProjectTags = [...tags, ...legacy].map((t) => t.toLowerCase());
        return activeTags.every((tag) =>
          allProjectTags.some((t) => t.includes(tag.toLowerCase()))
        );
      });
    }

    // Keyword search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.shortDescription?.toLowerCase().includes(q) ||
          (p.usedTechnologies || "").toLowerCase().includes(q) ||
          (Array.isArray(p.techTags)
            ? p.techTags.some((t) => t.toLowerCase().includes(q))
            : false)
      );
    }

    onFilter(result);
  }, [projects, activeCategory, activeTags, search, onFilter]);

  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAll = () => {
    setSearch("");
    setActiveCategory("all");
    setActiveTags([]);
  };

  const hasFilters = search || activeCategory !== "all" || activeTags.length > 0;

  return (
    <div className="flex flex-col gap-5 bg-white/[0.02] border border-white/5 rounded-2xl p-5 mb-10">
      {/* Top row: search + clear */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, technology, keyword..."
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm font-inter text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/40 focus:bg-white/[0.05] transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {hasFilters && (
          <button
            onClick={clearAll}
            className="shrink-0 flex items-center gap-1.5 text-xs font-inter font-semibold text-zinc-400 hover:text-white border border-white/10 hover:border-white/30 px-3.5 py-2.5 rounded-xl transition-colors"
          >
            <X size={13} />
            Clear all
          </button>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-inter font-semibold tracking-wider uppercase mr-1">
          <SlidersHorizontal size={12} />
          Category
        </div>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`text-xs font-inter font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
              activeCategory === cat.value
                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/40"
                : "bg-white/[0.03] text-zinc-400 border-white/10 hover:border-white/20 hover:text-zinc-300"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tech tag chips */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`text-[10px] font-inter font-bold px-2.5 py-1 rounded border transition-all uppercase tracking-wider ${
                activeTags.includes(tag)
                  ? "bg-sky-500/15 text-sky-400 border-sky-500/40"
                  : "bg-white/[0.02] text-zinc-500 border-white/5 hover:border-white/15 hover:text-zinc-400"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Active filter summary */}
      {activeTags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1 border-t border-white/5">
          <span className="text-xs text-zinc-500 font-inter self-center">Filtering by:</span>
          {activeTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[10px] font-inter font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 border border-sky-500/30 px-2.5 py-1 rounded-full"
            >
              {tag}
              <button onClick={() => toggleTag(tag)} className="hover:text-white">
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default TechFilter;

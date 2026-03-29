import { ArrowRight } from "lucide-react";

function ProjectPreviewBox({ project, onClick }) {
  return (
    <button
      onClick={() => onClick(project)}
      id={`project-${project.id}`}
      className="text-left group flex flex-col bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-300 w-full relative h-full"
    >
      {/* Decorative hover gradient */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#050505] border-b border-white/5 shrink-0">
        <img
          src={project.imageUrl || "https://placehold.co/600x340/1e293b/64748b?text=No+Image"}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-70 group-hover:opacity-100"
        />
        {/* Status badge over image */}
        {project.status && (
          <div className="absolute top-3 right-3 z-10">
            <StatusBadge status={project.status} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col p-6 lg:p-7 flex-1 relative z-10">
        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.usedTechnologies?.split(",").slice(0, 4).map((tech, idx) => (
            <span
              key={tech.trim() + idx}
              className="text-[0.7rem] font-inter font-semibold tracking-wider uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded backdrop-blur-sm"
            >
              {tech.trim()}
            </span>
          ))}
        </div>

        <h2 className="text-zinc-100 font-outfit text-2xl font-bold mb-3 group-hover:text-white transition-colors">
          {project.name}
        </h2>

        <p className="font-inter text-zinc-400 text-sm leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>
      </div>

      {/* Footer */}
      <div className="w-full px-6 py-5 border-t border-white/5 flex items-center justify-between group-hover:bg-white/[0.02] transition-colors mt-auto shrink-0">
        <span className="text-xs font-inter font-medium text-zinc-500 group-hover:text-emerald-400 transition-colors uppercase tracking-widest">
          View Details
        </span>
        <ArrowRight size={16} className="text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
      </div>
    </button>
  );
}

function StatusBadge({ status }) {
  const map = {
    Completed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "In Progress": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  };
  const cls = map[status] || "bg-white/10 text-zinc-300 border-white/20";
  return (
    <span className={`text-[10px] uppercase font-inter font-bold tracking-widest px-3 py-1.5 rounded-full border backdrop-blur-md shadow-lg ${cls}`}>
      {status}
    </span>
  );
}

export default ProjectPreviewBox;

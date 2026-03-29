import { Download, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import GithubOriginal from "react-devicons/github/original";

function StatusBadge({ status }) {
  const map = {
    Completed: {
      icon: <CheckCircle2 size={12} />,
      cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
    "In Progress": {
      icon: <Clock size={12} />,
      cls: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    },
  };
  const { icon, cls } = map[status] || {
    icon: <AlertCircle size={12} />,
    cls: "bg-white/5 text-zinc-400 border-white/10",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase font-inter font-bold tracking-widest px-3 py-1.5 rounded-full border backdrop-blur-sm shadow-xl ${cls}`}>
      {icon}
      {status}
    </span>
  );
}

function ProjectFullBox({ project, onClick }) {
  // We remove the internal links since the modal will handle them
  return (
    <button
      onClick={() => onClick(project)}
      id={String(project.id)}
      className="text-left group flex flex-col bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:-translate-y-1 transition-all duration-300 w-full relative h-full"
    >
      {/* Decorative hover gradient */}
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/10 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden bg-[#050505] border-b border-white/5 shrink-0">
        <img
          src={project.imageUrl || "https://placehold.co/600x400/1e293b/64748b?text=No+Image"}
          alt={project.name}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
        />
        {/* Absolute Status Badge */}
        {project.status && (
          <div className="absolute top-3 right-3 z-10">
            <StatusBadge status={project.status} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col p-6 lg:p-8 flex-1 gap-5 relative z-10">
        
        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.usedTechnologies?.split(",").slice(0, 5).map((tech) => (
            <span
              key={tech.trim()}
              className="text-[0.7rem] font-inter font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded backdrop-blur-sm"
            >
              {tech.trim()}
            </span>
          ))}
        </div>

        {/* Header */}
        <h2 className="text-2xl font-outfit font-bold text-zinc-100 group-hover:text-white transition-colors line-clamp-1">
          {project.name}
        </h2>

        {/* Description */}
        <p className="text-zinc-400 font-inter text-sm leading-relaxed line-clamp-3 flex-1 mb-2">
          {project.description}
        </p>

        <div className="mt-auto text-xs font-inter font-medium text-emerald-500 group-hover:text-emerald-400 uppercase tracking-widest pt-4 border-t border-white/5">
          Read Full Info
        </div>
      </div>
    </button>
  );
}

export default ProjectFullBox;

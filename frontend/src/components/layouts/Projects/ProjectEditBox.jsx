import TechnologyTag from "../../ui/TechnologyTag";
import { Edit3 } from "lucide-react";

function ProjectEditBox({ project }) {
  const handleEditClick = () => {
    window.location.href = `/admin/edit/${project.id}`;
  };

  const technologies = project.usedTechnologies
    ?.split(",")
    .map((tech) => tech.trim())
    .filter(Boolean) || [];

  return (
    <button
      onClick={handleEditClick}
      className="group relative flex flex-col bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-300 w-full max-w-sm text-left"
    >
      {/* Edit Indicator */}
      <div className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
        <Edit3 size={18} />
      </div>

      {/* Image Overlay/Container */}
      <div className="relative w-full aspect-video overflow-hidden bg-[#050505] border-b border-white/5">
        <img
          src={project.imageUrl || "https://placehold.co/600x400/1e293b/64748b?text=No+Image"}
          alt={project.name}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="flex flex-col p-6 flex-1 w-full">
        <h2 className="text-xl font-outfit font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
          {project.name}
        </h2>
        
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {technologies.slice(0, 3).map((tech) => (
            <span 
              key={tech} 
              className="px-2 py-0.5 rounded text-[10px] font-inter font-bold uppercase tracking-wider bg-white/5 text-zinc-400 border border-white/10 transition-colors group-hover:border-emerald-500/20 group-hover:text-emerald-500/70"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 3 && (
            <span className="text-[10px] text-zinc-600 self-center">+{technologies.length - 3}</span>
          )}
        </div>
      </div>
    </button>
  );
}

export default ProjectEditBox;

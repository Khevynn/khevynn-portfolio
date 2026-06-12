import { Edit3, Star, Eye, EyeOff } from "lucide-react";
import { useToggleFeatured, useTogglePublished } from "../../../hooks/useProjects";

function ProjectEditBox({ project }) {
  const { mutate: toggleFeatured, isPending: togglingFeatured } = useToggleFeatured();
  const { mutate: togglePublished, isPending: togglingPublished } = useTogglePublished();

  const handleEditClick = () => {
    window.location.href = `/admin/edit/${project.id}`;
  };

  const techList =
    Array.isArray(project.techTags) && project.techTags.length > 0
      ? project.techTags.slice(0, 3)
      : (project.usedTechnologies || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
          .slice(0, 3);

  const isFeatured = project.isFeatured === 1 || project.isFeatured === true;
  const isPublished = project.isPublished !== 0 && project.isPublished !== false;

  return (
    <div className="group relative flex flex-col bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-300 w-full text-left">

      {/* Image + edit overlay */}
      <button onClick={handleEditClick} className="relative w-full aspect-video overflow-hidden bg-[#050505] border-b border-white/5">
        <img
          src={project.imageUrl || "https://placehold.co/600x400/1e293b/64748b?text=No+Image"}
          alt={project.name}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60" />

        {/* Edit hover indicator */}
        <div className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <Edit3 size={15} />
        </div>

        {/* Draft badge */}
        {!isPublished && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-900/80 border border-white/10 text-[9px] font-inter font-bold uppercase tracking-widest text-zinc-400">
            <EyeOff size={9} /> Draft
          </div>
        )}
      </button>

      {/* Content */}
      <div className="flex flex-col p-5 flex-1 gap-3">
        <button onClick={handleEditClick} className="text-left">
          <h2 className="text-base font-outfit font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
            {project.name}
          </h2>
          {project.category && (
            <p className="text-[10px] font-inter text-zinc-500 uppercase tracking-wider mt-0.5">{project.category}</p>
          )}
        </button>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {techList.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-[9px] font-inter font-bold uppercase tracking-wider bg-white/5 text-zinc-400 border border-white/10"
            >
              {tech}
            </span>
          ))}
          {(Array.isArray(project.techTags) ? project.techTags : (project.usedTechnologies || "").split(",").filter(Boolean)).length > 3 && (
            <span className="text-[9px] text-zinc-600 self-center">
              +{(Array.isArray(project.techTags) ? project.techTags : (project.usedTechnologies || "").split(",").filter(Boolean)).length - 3}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-auto pt-3 border-t border-white/5">
          {/* Star / Featured toggle */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFeatured({ id: project.id });
            }}
            disabled={togglingFeatured}
            title={isFeatured ? "Remove from featured" : "Mark as featured"}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-inter font-semibold border transition-all ${
              isFeatured
                ? "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
                : "bg-white/[0.02] border-white/10 text-zinc-500 hover:text-amber-400 hover:border-amber-500/20"
            }`}
          >
            <Star size={12} fill={isFeatured ? "currentColor" : "none"} />
            {isFeatured ? "Featured" : "Feature"}
          </button>

          {/* Eye / Published toggle */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              togglePublished({ id: project.id });
            }}
            disabled={togglingPublished}
            title={isPublished ? "Set as draft" : "Publish"}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-inter font-semibold border transition-all ${
              isPublished
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                : "bg-white/[0.02] border-white/10 text-zinc-500 hover:text-emerald-400 hover:border-emerald-500/20"
            }`}
          >
            {isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
            {isPublished ? "Live" : "Draft"}
          </button>

          {/* Edit button */}
          <button
            onClick={handleEditClick}
            title="Edit project"
            className="flex items-center justify-center px-3 py-2 rounded-lg text-[11px] font-inter font-semibold border bg-white/[0.02] border-white/10 text-zinc-500 hover:text-white hover:border-white/20 transition-all"
          >
            <Edit3 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectEditBox;

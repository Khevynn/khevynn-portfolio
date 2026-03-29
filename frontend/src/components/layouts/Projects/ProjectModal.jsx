import { X, ExternalLink, Github, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import GithubOriginal from "react-devicons/github/original";

function StatusBadge({ status }) {
  const map = {
    Completed: {
      icon: <CheckCircle2 size={13} />,
      cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    },
    "In Progress": {
      icon: <Clock size={13} />,
      cls: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    },
  };
  const { icon, cls } = map[status] || {
    icon: <AlertCircle size={13} />,
    cls: "bg-white/5 text-zinc-400 border-white/10",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs uppercase font-inter font-bold tracking-widest px-3 py-1.5 rounded-full border backdrop-blur-sm shadow-xl ${cls}`}>
      {icon}
      {status}
    </span>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const hasGithub = project.githubUrl && project.githubUrl !== "https://github.com/Khevynn/none";
  const hasDownload = project.downloadUrl && project.downloadUrl !== "https://none";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row my-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-white/10 text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left Column: Image */}
        <div className="relative w-full md:w-5/12 aspect-video md:aspect-auto border-b md:border-b-0 md:border-r border-white/5 overflow-hidden bg-[#050505] shrink-0">
          <img 
            src={project.imageUrl || "https://placehold.co/600x400/1e293b/64748b?text=No+Image"}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          {project.status && (
            <div className="absolute top-4 left-4">
              <StatusBadge status={project.status} />
            </div>
          )}
        </div>

        {/* Right Column: Content */}
        <div className="flex flex-col p-6 sm:p-8 flex-1 max-h-[80vh] overflow-y-auto custom-scrollbar">
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.usedTechnologies?.split(",").map((tech) => (
              <span
                key={tech.trim()}
                className="text-xs font-inter font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded backdrop-blur-sm"
              >
                {tech.trim()}
              </span>
            ))}
          </div>

          <h2 className="text-3xl font-outfit font-bold text-white mb-6">
            {project.name}
          </h2>

          <div className="font-inter text-zinc-400 text-[0.95rem] leading-relaxed flex-1 space-y-4">
            {project.description.split("\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-8 mt-auto border-t border-white/5">
            {hasGithub && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-200 font-inter text-sm font-semibold hover:bg-white/[0.08] hover:text-white transition-all"
              >
                <GithubOriginal color="#FFFFFF" size="16px" />
                Source Code
              </a>
            )}
            {hasDownload && (
              <a
                href={project.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 border border-emerald-500 text-white font-inter text-sm font-semibold hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <ExternalLink size={16} />
                Live Demo / Download
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;

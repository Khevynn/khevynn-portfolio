import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  FileText,
  PlayCircle,
  CheckCircle2,
  Clock,
  AlertCircle,
  Star,
} from "lucide-react";

import { useProjectBySlug } from "../hooks/useProjectBySlug";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loading from "../components/ui/Loading";
import ProjectGallery from "../components/layouts/Projects/ProjectGallery";
import ImpactMetrics from "../components/layouts/Projects/ImpactMetrics";

/* ── Status badge ────────────────────────────────────────── */
function StatusBadge({ status }) {
  const map = {
    Completed: { icon: <CheckCircle2 size={13} />, cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" },
    "In Progress": { icon: <Clock size={13} />, cls: "bg-amber-500/10 text-amber-400 border-amber-500/30" },
  };
  const { icon, cls } = map[status] || { icon: <AlertCircle size={13} />, cls: "bg-white/5 text-zinc-400 border-white/10" };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs uppercase font-inter font-bold tracking-widest px-3 py-1.5 rounded-full border ${cls}`}>
      {icon}{status}
    </span>
  );
}

/* ── Link button ─────────────────────────────────────────── */
function LinkButton({ href, icon, label, variant = "default" }) {
  if (!href) return null;
  const base = "flex-1 min-w-[140px] inline-flex justify-center items-center gap-2 px-5 py-3 rounded-xl font-inter text-sm font-semibold transition-all";
  const variants = {
    default: `${base} bg-white/[0.03] border border-white/10 text-zinc-200 hover:bg-white/[0.08] hover:text-white`,
    primary: `${base} bg-emerald-600 border border-emerald-500 text-white hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]`,
  };
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={variants[variant]}>
      {icon}{label}
    </a>
  );
}

/* ── Markdown prose styles ───────────────────────────────── */
const markdownComponents = {
  h1: ({ children }) => <h1 className="text-2xl font-outfit font-bold text-white mt-8 mb-4">{children}</h1>,
  h2: ({ children }) => <h2 className="text-xl font-outfit font-bold text-white mt-7 mb-3 pb-2 border-b border-white/10">{children}</h2>,
  h3: ({ children }) => <h3 className="text-lg font-outfit font-semibold text-zinc-100 mt-5 mb-2">{children}</h3>,
  p:  ({ children }) => <p className="text-zinc-400 font-inter text-[0.95rem] leading-relaxed mb-4">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-inside text-zinc-400 font-inter text-sm space-y-1.5 mb-4 pl-2">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside text-zinc-400 font-inter text-sm space-y-1.5 mb-4 pl-2">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a:  ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors">{children}</a>,
  strong: ({ children }) => <strong className="text-zinc-200 font-semibold">{children}</strong>,
  code: ({ inline, children }) =>
    inline
      ? <code className="bg-white/10 text-emerald-300 text-[0.8rem] px-1.5 py-0.5 rounded font-mono">{children}</code>
      : <code>{children}</code>,
  pre: ({ children }) => (
    <pre className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 overflow-x-auto text-sm font-mono text-zinc-300 mb-4">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-emerald-500/50 pl-4 italic text-zinc-500 font-inter text-sm mb-4">{children}</blockquote>
  ),
  hr: () => <hr className="border-white/10 my-6" />,
};

/* ── Main Component ──────────────────────────────────────── */
function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: project, isLoading, error } = useProjectBySlug(slug);

  // Dynamic SEO
  useEffect(() => {
    if (project) {
      document.title = `${project.name} | Khevynn Sá - Backend & Java Developer`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          "content",
          project.shortDescription || project.description || `${project.name} - a project by Khevynn Sá, Backend Java Developer.`
        );
      }
    }
    return () => {
      document.title = "Khevynn Sá | Backend & Java Developer";
    };
  }, [project]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-4 text-center px-4">
        <p className="text-zinc-400 font-inter">Project not found.</p>
        <button
          onClick={() => navigate("/projects")}
          className="text-emerald-400 font-inter text-sm hover:underline"
        >
          ← Back to all projects
        </button>
      </div>
    );
  }

  // Build gallery: cover image + additional gallery images
  const coverImage = project.imageUrl;
  const extraImages = Array.isArray(project.galleryImages) ? project.galleryImages : [];
  const allImages = [coverImage, ...extraImages].filter(Boolean);

  // Tech display
  const techList =
    Array.isArray(project.techTags) && project.techTags.length > 0
      ? project.techTags
      : (project.usedTechnologies || "").split(",").map((t) => t.trim()).filter(Boolean);

  // Impact metrics
  const metrics = Array.isArray(project.impactMetrics) ? project.impactMetrics : [];

  const hasGithub = project.githubUrl && !project.githubUrl.includes("/none");
  const hasLiveDemo = project.liveDemoUrl || (project.downloadUrl && !project.downloadUrl.includes("//none"));
  const hasDocs = project.documentationUrl;
  const hasVideo = project.videoDemoUrl;

  return (
    <div className="relative min-h-screen bg-[#050505] overflow-x-hidden">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-[0.10] z-0" />
      <div className="relative z-10 w-full flex flex-col min-h-screen">
        <NavBar />

        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-28">
          {/* Back button */}
          <button
            onClick={() => navigate("/projects")}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-inter text-sm font-medium transition-colors mb-10 bg-white/5 border border-white/10 hover:border-white/30 px-5 py-2.5 rounded-lg"
          >
            <ArrowLeft size={16} />
            All Projects
          </button>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 xl:gap-16">

            {/* LEFT - main content */}
            <div className="flex flex-col gap-10 min-w-0">

              {/* Header */}
              <div className="flex flex-col gap-4">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  {(project.isFeatured === 1 || project.isFeatured === true) && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-inter font-bold uppercase tracking-widest border bg-amber-500/10 text-amber-400 border-amber-500/30">
                      <Star size={10} fill="currentColor" /> Featured
                    </span>
                  )}
                  {project.status && <StatusBadge status={project.status} />}
                  {project.category && project.category !== "Other" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-inter font-bold uppercase tracking-widest border bg-violet-500/10 text-violet-400 border-violet-500/30">
                      {project.category}
                    </span>
                  )}
                </div>

                <h1 className="text-4xl sm:text-5xl font-outfit font-extrabold text-white leading-tight">
                  {project.name}
                </h1>

                {/* Short description */}
                {project.shortDescription && (
                  <p className="text-lg font-inter text-zinc-400 leading-relaxed max-w-2xl">
                    {project.shortDescription}
                  </p>
                )}
              </div>

              {/* Gallery */}
              {allImages.length > 0 && (
                <ProjectGallery images={allImages} altPrefix={project.name} />
              )}

              {/* Detailed description (Markdown) */}
              {project.detailedDescription ? (
                <div className="prose-project">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {project.detailedDescription}
                  </ReactMarkdown>
                </div>
              ) : project.description ? (
                /* Fallback: plain description */
                <div className="flex flex-col gap-3">
                  {project.description.split("\n").map((para, i) => (
                    <p key={i} className="text-zinc-400 font-inter text-[0.95rem] leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              ) : null}

              {/* Impact Metrics */}
              {metrics.length > 0 && <ImpactMetrics metrics={metrics} />}
            </div>

            {/* RIGHT - sidebar */}
            <div className="flex flex-col gap-6">

              {/* Links */}
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col gap-3">
                <h3 className="text-xs font-inter font-bold text-zinc-500 uppercase tracking-widest mb-1">
                  Project Links
                </h3>
                <div className="flex flex-wrap gap-2">
                  <LinkButton
                    href={hasGithub ? project.githubUrl : null}
                    icon={<Github size={15} />}
                    label="Source Code"
                  />
                  <LinkButton
                    href={hasLiveDemo ? (project.liveDemoUrl || project.downloadUrl) : null}
                    icon={<ExternalLink size={15} />}
                    label="Live Demo"
                    variant="primary"
                  />
                  <LinkButton
                    href={hasDocs ? project.documentationUrl : null}
                    icon={<FileText size={15} />}
                    label="Documentation"
                  />
                  <LinkButton
                    href={hasVideo ? project.videoDemoUrl : null}
                    icon={<PlayCircle size={15} />}
                    label="Video Demo"
                  />
                </div>
                {!hasGithub && !hasLiveDemo && !hasDocs && !hasVideo && (
                  <p className="text-xs text-zinc-600 font-inter text-center py-2">No links available.</p>
                )}
              </div>

              {/* Technologies */}
              {techList.length > 0 && (
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
                  <h3 className="text-xs font-inter font-bold text-zinc-500 uppercase tracking-widest">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {techList.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-inter font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick info card */}
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col gap-3">
                <h3 className="text-xs font-inter font-bold text-zinc-500 uppercase tracking-widest mb-1">
                  Project Info
                </h3>
                {project.category && (
                  <div className="flex items-center justify-between text-sm font-inter">
                    <span className="text-zinc-500">Category</span>
                    <span className="text-zinc-200 font-medium">{project.category}</span>
                  </div>
                )}
                {project.status && (
                  <div className="flex items-center justify-between text-sm font-inter">
                    <span className="text-zinc-500">Status</span>
                    <StatusBadge status={project.status} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default ProjectDetailPage;

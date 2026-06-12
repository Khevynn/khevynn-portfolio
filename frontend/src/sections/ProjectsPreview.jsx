import { useFeaturedProjects } from "../hooks/useFeaturedProjects";
import { useProjects } from "../hooks/useProjects";
import ProjectPreviewBox from "../components/layouts/Projects/ProjectPreviewBox";
import Loading from "../components/ui/Loading";
import NavigateButton from "../components/ui/NavigateButton";
import { ArrowRight, Star } from "lucide-react";

function ProjectsPreview() {
  const { data: featured, isLoading: featuredLoading } = useFeaturedProjects();
  const { data: all, isLoading: allLoading } = useProjects("");

  const isLoading = featuredLoading || allLoading;

  // Use featured if any exist, otherwise fall back to first 3 published projects
  const hasFeatured = Array.isArray(featured) && featured.length > 0;
  const projects = hasFeatured ? featured : Array.isArray(all) ? all.slice(0, 3) : [];

  function RenderProjects() {
    if (isLoading) {
      return (
        <div className="w-full h-64 flex flex-col justify-center items-center gap-3">
          <Loading />
          <p className="text-sm font-inter text-slate-400">Loading projects...</p>
        </div>
      );
    }

    if (projects.length === 0) {
      return (
        <div className="w-full flex justify-center items-center h-64 bg-slate-800 border border-slate-700 rounded-xl">
          <p className="text-slate-400 font-inter text-sm">No projects available right now.</p>
        </div>
      );
    }

    return projects.map((project, index) => (
      <ProjectPreviewBox key={project.id || index} project={project} />
    ));
  }

  return (
    <section
      id="projects-preview"
      className="relative flex flex-col py-16 sm:py-24 overflow-hidden border-t border-white/5"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-12">
        <div>
          <h2 className="text-xs sm:text-sm font-inter text-emerald-400 tracking-[0.2em] uppercase mb-3 font-semibold flex items-center gap-2">
            {hasFeatured && <Star size={12} fill="currentColor" />}
            Portfolio
          </h2>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-outfit text-white">
            {hasFeatured ? "Featured Projects" : "Latest Projects"}
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-xl font-inter leading-relaxed">
            {hasFeatured
              ? "Hand-picked highlights, scalable backend systems, APIs, and software engineering projects."
              : "A selection of recent work spanning backend systems, AI tools, and software engineering."}
          </p>
        </div>
        <NavigateButton
          to="/projects"
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.02] text-zinc-300 font-inter font-medium text-sm hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-400 transition-all"
        >
          View all projects
          <ArrowRight size={16} />
        </NavigateButton>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {RenderProjects()}
      </div>
    </section>
  );
}

export default ProjectsPreview;

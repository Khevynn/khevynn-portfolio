import { useProjects } from "../hooks/useProjects";
import ProjectFullBox from "../components/layouts/Projects/ProjectFullBox";
import ProjectModal from "../components/layouts/Projects/ProjectModal";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import NavigateButton from "../components/ui/NavigateButton";
import Loading from "../components/ui/Loading";
import { ArrowLeft, FolderOpen } from "lucide-react";
import { useState } from "react";

function ProjectList({ projects, isLoading, error, onSelectProject }) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <Loading />
        <p className="text-zinc-400 font-inter text-sm">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 bg-white/5 border border-white/10 rounded-xl">
        <p className="text-red-400 font-inter text-sm">
          Could not load projects: {error.message}
        </p>
      </div>
    );
  }

  if (!Array.isArray(projects) || projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 bg-white/5 border border-white/10 rounded-xl">
        <FolderOpen size={40} className="text-zinc-600" strokeWidth={1.5} />
        <p className="text-zinc-400 font-inter text-sm">No projects available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <ProjectFullBox key={project.id || index} project={project} onClick={onSelectProject} />
      ))}
    </div>
  );
}

function ProjectListPage() {
  const { data: projects, isLoading, error } = useProjects("");
  const [selectedProject, setSelectedProject] = useState(null);

  const projectCount = Array.isArray(projects) ? projects.length : 0;

  return (
    <div className="relative bg-[#050505] min-h-screen flex flex-col">
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-[0.15] z-0"></div>
      <div className="relative z-10 w-full flex flex-col min-h-screen">
        <NavBar />

        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-32">
          {/* Back button */}
          <NavigateButton
            to="/"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white font-inter text-sm font-medium transition-colors mb-12 bg-white/5 border border-white/10 hover:border-white/30 px-5 py-2.5 rounded-lg"
          >
            <ArrowLeft size={16} />
            Back to Home
          </NavigateButton>

          {/* Page header */}
          <div className="mb-12">
            <h2 className="text-sm font-inter text-emerald-400 tracking-[0.2em] uppercase mb-3 font-semibold">
              Portfolio
            </h2>
            <h1 className="text-4xl md:text-5xl font-extrabold font-outfit text-white">
              All Projects
            </h1>
            {!isLoading && !error && projectCount > 0 && (
              <p className="text-zinc-400 font-inter text-base mt-4">
                {projectCount} project{projectCount !== 1 ? "s" : ""} total
              </p>
            )}
          </div>

          {/* Project list */}
          <ProjectList 
            projects={projects} 
            isLoading={isLoading} 
            error={error} 
            onSelectProject={setSelectedProject}
          />
        </main>

        <Footer />
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

export default ProjectListPage;

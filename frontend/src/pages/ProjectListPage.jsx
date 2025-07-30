import { useProjects } from "../hooks/useProjects";
import ProjectFullBox from "../components/layouts/Projects/ProjectFullBox";
import Footer from "../components/Footer";
import NavigateButton from "../components/ui/NavigateButton";
import Loading from "../components/ui/Loading";

function ProjectList({ projects, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="text-gray-400 text-sm font-thin h-64 text-center flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-400">Error loading projects: {error.message}</p>
      </div>
    );
  }

  if (!Array.isArray(projects) || projects.length === 0) {
    return (
      <div className="text-gray-400 text-sm font-thin h-64 text-center flex justify-center items-center">
        No projects available.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 flex-wrap justify-center">
      {projects.map((project, index) => (
        <ProjectFullBox
          key={project.id || index}
          project={project}
          index={index}
        />
      ))}
    </div>
  );
}

function ProjectListPage() {
  const { data: projects, isLoading, error } = useProjects("");

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
        <div className="max-w-5xl mx-auto py-16 px-4">
          <NavigateButton
            to={"/"}
            className="bg-gray-800 hover:bg-gray-700 text-white"
          >
            ← Back to Main Page
          </NavigateButton>

          <h1 className="text-4xl font-extrabold text-white mb-10 text-center drop-shadow">
            Projects
          </h1>

          {/* Render the project list */}
          <ProjectList
            projects={projects}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProjectListPage;

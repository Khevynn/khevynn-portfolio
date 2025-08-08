import { useProjects } from "../hooks/useProjects";
import ProjectPreviewBox from "../components/layouts/Projects/ProjectPreviewBox";
import Loading from "../components/ui/Loading";
import NavigateButton from "../components/ui/NavigateButton";

function ProjectsPreview() {
  const { data: projects, isLoading, error } = useProjects("");
  function RenderProjects() {
    // Show loading state
    if (isLoading) {
      return (
        <div className="text-gray-400 text-sm font-thin h-64 text-center flex justify-center items-center">
          <Loading />
          <p className="ml-2">Loading projects...</p>
          <br />
          <p className="text-gray-500">
            If that's your first time, this may take a few seconds
          </p>
        </div>
      );
    }

    // Show error state
    if (error) {
      return (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-400">
            Error loading projects: {error.message}
          </p>
        </div>
      );
    }

    // Ensure projects is an array before using .map()
    if (!Array.isArray(projects) || projects.length === 0) {
      return (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-400">No projects available.</p>
        </div>
      );
    }

    // Render projects
    return projects
      .slice(0, 3)
      .map((project, index) => (
        <ProjectPreviewBox
          key={project.id || index}
          project={project}
          projectIndex={index}
        />
      ));
  }

  return (
    <div
      id="projects-preview"
      className="flex flex-col min-h-142 bg-gray-950 gap-5 max-md:pb-10 lg:px-10 xl:px-30 2xl:px-50"
    >
      <h1 className="mt-10 text-center text-3xl text-gray-200 font-extrabold">
        Projects
      </h1>
      <p className="text-center text-lg text-gray-200">
        This section will showcase a preview of various projects.
      </p>

      <div className="flex flex-col gap-5 mb-10 items-center justify-center lg:items-start lg:flex-row">
        {RenderProjects()}
      </div>

      <NavigateButton to="/projects" className="mx-auto mb-10">
        See All Projects
      </NavigateButton>
    </div>
  );
}

export default ProjectsPreview;

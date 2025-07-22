import React, { useState, useEffect } from "react";
import ProjectPreviewBox from "../components/ProjectPreviewBox";
import { PROJECTS_API_URL } from "../constants/api";

function ProjectsPreview() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    fetch(PROJECTS_API_URL)
      .then((response) => response.json())
      .then((json) => setProjects(json))
      .catch((error) => console.error(error));
  }, []);

  function RenderProjects() {
    if (!projects) {
      return (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-400">Loading projects...</p>
        </div>
      );
    } else if (projects.length === 0) {
      // If projects is an empty array, show a message
      return (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-400">No projects available.</p>
        </div>
      );
    } else {
      return projects
        .slice(0, 3)
        .map((project) => (
          <ProjectPreviewBox
            project={project}
            projectIndex={projects.indexOf(project)}
          />
        ));
    }
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

      <div className="flex justify-center items-center mb-10">
        <a
          href="/projects"
          className="mb-8 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow"
        >
          See All Projects
        </a>
      </div>

      {/* Add more content or components as needed */}
    </div>
  );
}

export default ProjectsPreview;

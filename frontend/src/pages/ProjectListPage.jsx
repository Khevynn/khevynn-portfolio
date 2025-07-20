import NavBar from "../components/NavBar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PROJECTS_API_URL } from "../constants/api";
import ProjectFullBox from "../components/ProjectFullBox";

function ProjectList({ projects }) {
  // Show loading message if projects are not loaded yet
  if (!projects) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400">Loading projects...</p>
      </div>
    );
  }

  // Render the list of projects using ProjectFullBox component
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
  const navigate = useNavigate();
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    fetch(PROJECTS_API_URL)
      .then((response) => response.json())
      .then((json) => setProjects(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
      <div className="max-w-5xl mx-auto py-16 px-4">
        <button
          className="mb-8 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
        <h1 className="text-4xl font-extrabold text-white mb-10 text-center drop-shadow">
          Projects
        </h1>
        <ProjectList projects={projects} />
      </div>
    </div>
  );
}

export default ProjectListPage;

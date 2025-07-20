import React, { useState } from "react";
import GithubOriginal from "react-devicons/github/original";

function ProjectFullBox({ project, index }) {
  // Helper to get status color
  const getStatusColor = (status) => {
    if (status === "Completed") return "bg-green-500";
    if (status === "In Progress") return "bg-orange-500";
    return "bg-red-500";
  };

  // Inline wave animation CSS for status indicator
  const waveStyle = `
    @keyframes wave {
      0% { transform: scale(0.7); opacity: 0.7; }
      100% { transform: scale(2); opacity: 0; }
    }
    .animate-wave {
      position: absolute;
      inset: 0;
      border-radius: 9999px;
      animation: wave 1.2s infinite;
    }
  `;

  // Render technology tags
  const renderTechnologies = () =>
    project.usedTechnologies.split(",").map((tech) => (
      <span
        key={tech}
        className="text-gray-300 text-sm bg-gray-600 px-2 py-1 rounded"
      >
        {tech}
      </span>
    ));

  // Render status indicator with wave effect
  const renderStatus = () =>
    project.status && (
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex items-center justify-center w-4 h-4">
          {/* Wave animation */}
          <span
            className={`animate-wave ${getStatusColor(project.status)}`}
            title={project.status}
          />
          {/* Solid status dot */}
          <span
            className={`relative w-4 h-4 rounded-full ${getStatusColor(
              project.status
            )} border-2 border-white`}
            title={project.status}
          />
        </span>
        <span className="text-gray-200 text-sm">{project.status}</span>
      </div>
    );

  // Render action buttons (download & GitHub)
  const renderActions = () => (
    <div className="flex items-center gap-1 mt-auto">
      {project.downloadUrl !== "none" && (
        <a
          href={project.downloadUrl}
          className="inline-flex items-center cursor-pointer p-2 rounded text-gray-200 hover:bg-gray-600 transition-colors"
        >
          {/* Download icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383" />
            <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z" />
          </svg>
        </a>
      )}
      {project.githubUrl !== "none" && (
        <a
          href={project.githubUrl}
          className="inline-flex items-center cursor-pointer p-2 rounded text-gray-200 hover:bg-gray-600 transition-colors"
        >
          {/* GitHub icon */}
          <GithubOriginal color="#FFFFFF" size="24px" />
        </a>
      )}
    </div>
  );

  return (
    <>
      {/* Inline style for wave animation */}
      <style>{waveStyle}</style>
      <div
        id={project.id}
        className="group flex flex-col gap-5 bg-gray-700 rounded-xl shadow-lg w-full min-h-80 overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all lg:flex-row relative"
      >
        {/* Project image section */}
        <div
          className={`bg-gray-800 p-7 flex-1 flex items-center justify-center ${
            index % 2 === 0 ? "lg:order-last" : "order-first"
          }`}
        >
          <img
            src={project.imageUrl}
            alt={project.name}
            className="max-w-full max-h-72 h-full object-cover rounded-xl"
          />
        </div>

        {/* Project details section */}
        <div className="flex flex-col p-7 flex-1">
          {/* Project name */}
          <h2 className="text-2xl font-bold text-white mb-2">{project.name}</h2>
          {/* Technologies used */}
          <div className="flex flex-wrap gap-2 mb-4">
            {renderTechnologies()}
          </div>
          {/* Status indicator */}
          {renderStatus()}
          {/* Project description */}
          <p className="text-gray-300 mb-4">{project.description}</p>
          {/* Action buttons */}
          {renderActions()}
        </div>
      </div>
    </>
  );
}

export default ProjectFullBox;

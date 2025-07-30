import { useState } from "react";

function ProjectPreviewBox({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Renders a single project preview box with expandable description
  return (
    <a
      href={`/projects#${project.id}`}
      id={`project-${project.id}`}
      className="group shrink bg-gray-700 rounded-2xl min-h-80 overflow-hidden hover:scale-[1.03] hover:shadow-2xl hover:border-gray-400 transition-all cursor-pointer shadow-xl border border-gray-600 sm:w-100 max-lg:mx-5"
    >
      {/* Project Image & Title */}
      <div className="flex flex-col items-center justify-center bg-gray-800 py-4 gap-5 border-b border-gray-600">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="rounded-4xl w-[320px] h-[200px] object-cover"
        />
        <h1 className="text-gray-200 text-xl font-bold">{project.name}</h1>
        {/* Technologies Used */}
        <div className="flex flex-wrap justify-center items-center gap-2 mt-1">
          {project.usedTechnologies.split(",").map((tech, idx) => (
            <span
              key={tech.trim() + idx}
              className="text-gray-300 text-sm bg-gray-600 px-2 py-1 rounded"
            >
              {tech.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Project Description (Expandable) */}
      <div
        className={`p-2 flex flex-col transition-all ${
          isExpanded ? "" : "max-h-40 overflow-hidden"
        }`}
      >
        <p className="text-gray-300 px-4 py-2">{project.description}</p>
      </div>

      {/* Expand/Collapse Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="focus:outline-none text-gray-300 hover:text-gray-200 transition-colors"
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          <svg
            className={`w-6 h-6 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </a>
  );
}

export default ProjectPreviewBox;

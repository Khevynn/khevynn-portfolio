import TechnologyTag from "../../ui/TechnologyTag";
import EditOverlay from "../../ui/EditOverlay";

// Subcomponent for project image
function ProjectImage({ imageUrl, name }) {
  return (
    <img
      src={imageUrl}
      alt={name}
      className="w-full max-h-72 h-full object-cover"
    />
  );
}

// Subcomponent for project details
function ProjectDetails({ name, technologies }) {
  return (
    <div className="flex flex-col p-7 flex-1">
      <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <TechnologyTag key={tech} tech={tech} />
        ))}
      </div>
    </div>
  );
}

function ProjectEditBox({ project }) {
  const handleEditClick = () => {
    window.location.href = `/admin/edit/${project.id}`;
  };

  const technologies = project.usedTechnologies
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);

  return (
    <div
      id={project.id}
      className="group relative bg-gray-700 rounded-xl shadow-lg min-h-40 overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all"
    >
      <ProjectImage imageUrl={project.imageUrl} name={project.name} />
      <ProjectDetails name={project.name} technologies={technologies} />
      <EditOverlay onClick={handleEditClick} />
    </div>
  );
}

export default ProjectEditBox;

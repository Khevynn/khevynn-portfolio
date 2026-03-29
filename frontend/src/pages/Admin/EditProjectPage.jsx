import { useNavigate } from "react-router-dom";
import {
  useProjects,
  useUpdateProject,
  useDeleteProject,
} from "../../hooks/useProjects";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import LoadingScreen from "../../components/layouts/LoadingScreen";
import ProjectForm from "../../components/layouts/ProjectForm";
import NavigateButton from "../../components/ui/NavigateButton";

function EditProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { data: project, isLoading, error } = useProjects(`/${projectId}`);
  
  const { mutate: updateProject, isPending: isUpdating, error: updateError } = useUpdateProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const onUpdate = (data) => {
    const projectData = {
      ...data,
      image: data.image ? data.image : null,
    };

    updateProject(
      { id: project.id, projectData },
      { onSuccess: () => navigate(`/admin/dashboard`) }
    );
  };

  const onDelete = () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject(
        { id: project.id, projectData: null },
        { onSuccess: () => navigate(`/admin/dashboard`) }
      );
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <LoadingScreen text="Loading project details..." />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] relative py-20 px-6">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <NavigateButton
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </NavigateButton>
            <h1 className="text-4xl font-outfit font-extrabold text-white">Edit Project</h1>
            <p className="text-zinc-500 font-inter mt-1">Refine the details for <span className="text-emerald-400 font-semibold">{project?.name}</span></p>
          </div>
        </div>

        {(isUpdating || isDeleting) && <LoadingScreen text="Processing changes..." />}
        
        <ProjectForm
          project={project}
          onSubmit={onUpdate}
          isPending={isUpdating}
          projectError={updateError}
          hasDeleteButton={true}
          onDelete={onDelete}
        />

        {!project && !isLoading && !error && (
          <div className="text-center py-20 border border-dashed border-white/5 rounded-3xl mt-12 text-zinc-500 font-inter">
            Project not found. It may have been deleted.
          </div>
        )}
      </div>
    </div>
  );
}

export default EditProjectPage;

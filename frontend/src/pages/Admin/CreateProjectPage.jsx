import { useNavigate } from "react-router-dom";
import { useCreateProject } from "../../hooks/useProjects";
import { ArrowLeft } from "lucide-react";

import LoadingScreen from "../../components/layouts/LoadingScreen";
import ProjectForm from "../../components/layouts/ProjectForm";
import NavigateButton from "../../components/ui/NavigateButton";

function CreateProjectPage() {
  const navigate = useNavigate();
  const { mutate, isPending, error: createError } = useCreateProject();

  const onSubmit = (data) => {
    const projectData = {
      ...data,
      image: data.image ? data.image : null,
    };

    mutate(
      { projectData },
      {
        onSuccess: () => navigate(`/admin/dashboard`),
      }
    );
  };

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
            <h1 className="text-4xl font-outfit font-extrabold text-white">Create New Project</h1>
          </div>
        </div>

        {isPending && <LoadingScreen text="Publishing your work..." />}
        
        <ProjectForm
          onSubmit={onSubmit}
          isPending={isPending}
          projectError={createError}
        />
      </div>
    </div>
  );
}

export default CreateProjectPage;

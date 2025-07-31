import { useNavigate } from "react-router-dom";
import {
  useProjects,
  useUpdateProject,
  useDeleteProject,
} from "../../hooks/useProjects";
import { useParams } from "react-router-dom";

import LoadingScreen from "../../components/layouts/LoadingScreen";
import ProjectForm from "../../components/layouts/ProjectForm";
import NavigateButton from "../../components/ui/NavigateButton";

function Header() {
  return (
    <h1 className="text-2xl text-gray-300 font-bold mt-15 mb-6">
      Edit Project
    </h1>
  );
}

function FormRender({ project, navigate }) {
  const { mutate, isPending, error: updateError } = useUpdateProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const onSubmit = (data) => {
    if (data.image && data.image.size > 5 * 1024 * 1024) {
      console.error("File too large");
      return;
    }

    const projectData = {
      ...data,
      image: data.image ? data.image : null,
    };

    mutate(
      {
        id: project.id,
        projectData,
      },
      {
        onSuccess: (data) => {
          console.log("Update successful:", data);
          navigate(`/admin/dashboard`);
        },
        onError: (error) => {
          console.error("Update failed:", error);
        },
      }
    );
  };
  const onDelete = () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject(
        { id: project.id, projectData: null },
        {
          onSuccess: () => {
            console.log("Project deleted successfully");
            navigate(`/admin/dashboard`);
          },
          onError: (error) => {
            console.error("Delete failed:", error);
          },
        }
      );
    }
  };

  return (
    <div>
      {isPending && <LoadingScreen text="Updating project..." />}
      {isDeleting && <LoadingScreen text="Deleting project..." />}
      <ProjectForm
        onSubmit={onSubmit}
        isPending={isPending}
        project={project}
        hasDeleteButton={true}
        onDelete={onDelete}
      />
      {updateError && (
        <p className="text-red-500 mt-4">
          Error updating project: {updateError.message}
        </p>
      )}
    </div>
  );
}

function EditProjectPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { data: project, isLoading, error } = useProjects(`/${projectId}`);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 py-12 px-4">
      <div className="w-full max-w-3xl">
        <div className="relative flex items-center mb-8">
          <NavigateButton
            to="/admin/dashboard"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 shadow"
            aria-label="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="mr-1"
            >
              <path
                fillRule="evenodd"
                d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"
              />
            </svg>
            <span className="font-medium">Back</span>
          </NavigateButton>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-full flex justify-center pointer-events-none">
            <Header />
          </div>
        </div>
        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg">
          <FormRender project={project} navigate={navigate} />
        </div>
        {!project && !isLoading && !error && (
          <p className="text-gray-400 mt-4">Project not found.</p>
        )}
      </div>
    </div>
  );
}

export default EditProjectPage;

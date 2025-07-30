import { useQuery } from "@tanstack/react-query";
import { useProjects } from "../../hooks/useProjects";
import axios from "axios";

import Loading from "../../components/ui/Loading";
import ProjectEditBox from "../../components/layouts/Projects/ProjectEditBox";
import Button from "../../components/ui/Button";
import NavigateButton from "../../components/ui/NavigateButton";

/* Sub-Components for Admin page */
function EditProjectList() {
  const { data: projects, isLoading, error } = useProjects("");

  /* Loading */
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );
  }
  /* Error */
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error loading projects</p>
      </div>
    );
  }

  // CRITICAL FIX: Ensure projects is always an array
  const projectsArray = Array.isArray(projects) ? projects : [];

  if (projectsArray.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-400">No projects available.</p>
      </div>
    );
  }

  /* Projects */
  return (
    <div className="flex gap-6 flex-wrap max-w-7xl justify-center">
      {projectsArray.map((project, index) => (
        <ProjectEditBox key={index} project={project} />
      ))}
    </div>
  );
}
function Header() {
  return (
    <header className="w-full max-w-7xl flex flex-col gap-2 mt-8 mb-6">
      <div className="w-full flex items-center justify-between">
        <NavigateButton
          to={"/"}
          className="bg-gray-800 hover:bg-gray-700 text-white"
        >
          ← Back to Main Page
        </NavigateButton>
      </div>
      <div className="flex flex-col items-center w-full">
        <h1 className="text-4xl font-bold text-gray-100">Admin Panel</h1>
        <p className="text-gray-400 text-lg">
          Manage your projects efficiently from this dashboard.
        </p>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="text-center py-4 text-sm bg-gray-950 mt-6">
      <p className="text-gray-500">
        © {new Date().getFullYear()} Khevynn Sá. All rights reserved.
      </p>
    </footer>
  );
}

/* Main Admin Page */
function AdminPage() {
  const {
    data: loginData,
    isLoading: isLoadingLogin,
    error: loginError,
  } = useQuery({
    queryKey: ["verifyAdmin"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_VERIFY_LOGIN,
          { withCredentials: true }
        );
        return response.data;
      } catch (err) {
        if (err.response && err.response.status === 401) {
          window.location.href = "/admin/login";
        }
        throw err;
      }
    },
  });

  if (isLoadingLogin) return <div>Loading...</div>;
  if (loginError) return <div>Error: {loginError.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-950">
      <Header />
      <div className="my-6">
        <Button
          onClick={() => (window.location.href = "/admin/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Create New Project
        </Button>
      </div>
      <EditProjectList />
      <Footer />
    </div>
  );
}

export default AdminPage;

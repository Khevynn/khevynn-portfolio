import { useQuery } from "@tanstack/react-query";
import { useProjects } from "../../hooks/useProjects";
import axios from "axios";
import { Plus, LayoutGrid, LogOut, ArrowLeft } from "lucide-react";

import Loading from "../../components/ui/Loading";
import ProjectEditBox from "../../components/layouts/Projects/ProjectEditBox";
import Button from "../../components/ui/Button";
import NavigateButton from "../../components/ui/NavigateButton";

function EditProjectList() {
  const { data: projects, isLoading, error } = useProjects("");

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 gap-4">
        <Loading />
        <p className="text-zinc-500 font-inter text-sm">Fetching projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 bg-red-500/5 border border-red-500/20 rounded-3xl p-8">
        <p className="text-red-400 font-inter font-medium text-center">
          Error loading projects: {error.message}
        </p>
      </div>
    );
  }

  const projectsArray = Array.isArray(projects) ? projects : [];

  if (projectsArray.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-64 border-2 border-dashed border-white/5 rounded-3xl">
        <p className="text-zinc-500 font-inter">No projects found. Start by creating one!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projectsArray.map((project, index) => (
        <ProjectEditBox key={project.id || index} project={project} />
      ))}
    </div>
  );
}

function Header() {
  const handleLogout = async () => {
    // Basic logout logic or redirection
    window.location.href = "/admin/login";
  };

  return (
    <header className="w-full flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-inter font-bold uppercase tracking-[0.2em] mb-2">
          <LayoutGrid size={14} />
          Management
        </div>
        <h1 className="text-4xl font-outfit font-extrabold text-white">Admin Panel</h1>
        <p className="text-zinc-500 font-inter">Manage your professional portfolio and experiences.</p>
      </div>

      <div className="flex items-center gap-3">
        <NavigateButton
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/5 bg-white/[0.02] text-zinc-400 font-inter text-sm hover:text-white hover:bg-white/5 transition-all"
        >
          <ArrowLeft size={16} />
          Site Preview
        </NavigateButton>
        <button
          onClick={handleLogout}
          className="p-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/20 transition-all"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}

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
    retry: false,
  });

  if (isLoadingLogin) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
       <Loading />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />
      
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <Header />

        <div className="mb-10 flex items-center justify-between border-b border-white/5 pb-8">
           <h2 className="text-xl font-outfit font-bold text-white flex items-center gap-3">
             Projects Hub
             <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">Live</span>
           </h2>
           <Button
             onClick={() => (window.location.href = "/admin/create")}
             className="flex items-center gap-2"
           >
             <Plus size={18} />
             Create New
           </Button>
        </div>

        <EditProjectList />
      </main>

      <footer className="relative z-10 border-t border-white/5 py-10 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-sm font-inter">
            &copy; {new Date().getFullYear()} Khevynn Sá. Admin Control.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default AdminPage;

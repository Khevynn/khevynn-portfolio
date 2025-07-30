import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// GET hook (for fetching projects)
export const useProjects = (extraUrl) => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await axios.get(
        import.meta.env.VITE_API_GET_PROJECTS_URL + extraUrl
      );
      return response.data;
    },
  });
};

// PUT hook (for updates)
export const useUpdateProject = () => {
  const [status, setStatus] = useState({
    success: false,
    message: "",
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({ id, projectData }) => {
      console.log("Updating project:", id, projectData); // Debug log
      const response = await axios.put(
        `${import.meta.env.VITE_API_UPDATE_PROJECT_URL}/${id}`,
        projectData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      setStatus({
        success: true,
        message: data.message || "Project updated successfully!",
      });
    },
    onError: (error) => {
      setStatus({
        success: false,
        message:
          error?.response?.data?.message || error?.message || "Update failed.",
      });
    },
  });

  return { mutate, isPending, error, status };
};

// POST hook (for creating new projects)
export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState({
    success: false,
    message: "",
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({ projectData }) => {
      console.log("Creating project:", projectData); // Debug log
      const response = await axios.post(
        import.meta.env.VITE_API_CREATE_PROJECT_URL,
        projectData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch projects list
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      setStatus({
        success: true,
        message: data.message || "Project created successfully!",
      });
    },
    onError: (error) => {
      setStatus({
        success: false,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Creation failed.",
      });
    },
  });

  return { mutate, isPending, error, status };
};

// DELETE hook (for deleting projects)
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState({
    success: false,
    message: "",
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({ id }) => {
      console.log("Deleting project:", id); // Debug log
      const response = await axios.delete(
        `${import.meta.env.VITE_API_DELETE_PROJECT_URL}/${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch projects list
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      setStatus({
        success: true,
        message: data.message || "Project deleted successfully!",
      });
    },
    onError: (error) => {
      setStatus({
        success: false,
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Deletion failed.",
      });
    },
  });

  return { mutate, isPending, error, status };
};

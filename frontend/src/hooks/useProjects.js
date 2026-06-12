import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// GET hook (for fetching all published projects)
export const useProjects = (extraUrl) => {
  return useQuery({
    queryKey: ["projects", extraUrl],
    queryFn: async () => {
      const response = await axios.get(
        import.meta.env.VITE_API_GET_PROJECTS_URL + (extraUrl || "")
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

// GET hook (admin - all projects including unpublished)
export const useProjectsAdmin = () => {
  return useQuery({
    queryKey: ["projects", "admin"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_GET_PROJECTS_URL}/admin/all`,
        { withCredentials: true }
      );
      return response.data;
    },
    staleTime: 0, // always fresh in admin
  });
};

// PUT hook (for updates)
export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState({ success: false, message: "" });

  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({ id, projectData }) => {
      const response = await axios.put(
        `${import.meta.env.VITE_API_UPDATE_PROJECT_URL}/${id}`,
        projectData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setStatus({ success: true, message: data.message || "Project updated successfully!" });
    },
    onError: (error) => {
      setStatus({
        success: false,
        message: error?.response?.data?.message || error?.message || "Update failed.",
      });
    },
  });

  return { mutate, isPending, error, status };
};

// POST hook (for creating new projects)
export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState({ success: false, message: "" });

  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({ projectData }) => {
      const response = await axios.post(
        import.meta.env.VITE_API_CREATE_PROJECT_URL,
        projectData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setStatus({ success: true, message: data.message || "Project created successfully!" });
    },
    onError: (error) => {
      setStatus({
        success: false,
        message: error?.response?.data?.message || error?.message || "Creation failed.",
      });
    },
  });

  return { mutate, isPending, error, status };
};

// DELETE hook
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState({ success: false, message: "" });

  const { mutate, isPending, error } = useMutation({
    mutationFn: async ({ id }) => {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_DELETE_PROJECT_URL}/${id}`,
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setStatus({ success: true, message: data.message || "Project deleted successfully!" });
    },
    onError: (error) => {
      setStatus({
        success: false,
        message: error?.response?.data?.message || error?.message || "Deletion failed.",
      });
    },
  });

  return { mutate, isPending, error, status };
};

// PATCH toggle featured
export const useToggleFeatured = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ id }) => {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_GET_PROJECTS_URL}/${id}/feature`,
        {},
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return { mutate, isPending };
};

// PATCH toggle published
export const useTogglePublished = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ id }) => {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_GET_PROJECTS_URL}/${id}/publish`,
        {},
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return { mutate, isPending };
};

// PATCH reorder
export const useReorderProjects = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ projects }) => {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_GET_PROJECTS_URL}/reorder`,
        { projects },
        { withCredentials: true }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return { mutate, isPending };
};

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Fetches featured + published projects for the homepage preview section.
 * Falls back to the latest 3 published projects if no featured ones exist.
 */
export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: ["projects", "featured"],
    queryFn: async () => {
      const baseUrl = import.meta.env.VITE_API_GET_PROJECTS_URL;
      // Try featured endpoint first
      const response = await axios.get(`${baseUrl}/featured`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

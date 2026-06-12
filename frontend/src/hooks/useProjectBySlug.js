import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/**
 * Fetches a single published project by its URL slug.
 * @param {string} slug - The project slug from the URL
 */
export const useProjectBySlug = (slug) => {
  return useQuery({
    queryKey: ["project", "slug", slug],
    queryFn: async () => {
      const baseUrl = import.meta.env.VITE_API_GET_PROJECTS_URL;
      const response = await axios.get(`${baseUrl}/slug/${slug}`);
      return response.data;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
};

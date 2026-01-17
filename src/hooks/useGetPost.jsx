import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

export function useGetPost(slug) {
  const { isLoading, data, error } = useQuery({
    queryKey: [slug],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/posts/${slug}`);
      if (!response.ok) {
        throw new Error("Failed to get this post.");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 2,
  });

  return {
    isLoading,
    error: data ? (data.message ? data.message : error) : null,
    post: data ? data.post : null,
  };
}

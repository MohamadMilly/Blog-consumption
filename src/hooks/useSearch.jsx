import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

async function searchPost(query) {
  const response = await fetch(`${API_URL}/posts?slug=${query}`);
  if (!response.ok) {
    throw new Error("An error happened while searching posts.");
  }
  return response.json();
}

export function useSearch(query) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["search", query],
    queryFn: () => searchPost(query),
    enabled: !!query,
    staleTime: 1000 * 60,
  });
  const posts = data ? data.posts : [];
  return { posts: posts, isLoading, error };
}

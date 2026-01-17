import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export function useGetPost(slug) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/posts/${slug}`);
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Failing to get this post");
        }
        setPost(result.post);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getPost();
  }, [slug]);
  return { isLoading, error, post };
}

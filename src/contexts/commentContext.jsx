import { useQuery } from "@tanstack/react-query";
import { useContext, createContext, useEffect } from "react";
import { useState } from "react";
const CommentsContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL;
async function fetchComments(slug) {
  if (!slug) return { comments: [], post: null };
  const response = await fetch(`${API_URL}/posts/${slug}/comments`);
  if (!response.ok) {
    throw new Error("An error happened while getting comments.");
  }
  return response.json();
}

export function CommentsProvider({ children }) {
  const [isCommentsPanelOpen, setIsCommentsPanelOpen] = useState(false);
  const [slug, setSlug] = useState(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["comments", slug],
    queryFn: () => fetchComments(slug),
  });
  const comments = data ? data.comments : [];
  const post = data ? data.post : [];
  /* 
  useEffect(() => {
    let ignore = false;
    const fetchComments = async () => {
      try {
        if (!slug) return;
        setIsLoading(true);
        setError(null);
        setComments([]);
        const response = await fetch(`${API_URL}/posts/${slug}/comments`);
        if (ignore) return;
        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed getting the comments for this post.",
          );
        }
        const commentsWithStatus = result.comments.map((comment) => ({
          ...comment,
          status: "ready",
        }));
        setComments(commentsWithStatus || []);
        setPost(result.post);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
    return () => (ignore = true);
  }, [slug, API_URL]); */
  return (
    <CommentsContext.Provider
      value={{
        isCommentsPanelOpen,
        setIsCommentsPanelOpen,
        setSlug,
        comments,
        isLoading,
        error,
        slug,
        post,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export const useComments = () => useContext(CommentsContext);

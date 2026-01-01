import { useContext, createContext, useEffect } from "react";
import { useState } from "react";
const CommentsContext = createContext(null);

export function CommentsProvider({ children }) {
  const [isCommentsPanelOpen, setIsCommentsPanelOpen] = useState(false);
  const [slug, setSlug] = useState(null);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

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
            result.message || "Failed getting the comments for this post."
          );
        }
        setComments(result.comments || []);
        setPost(result.post);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
    return () => (ignore = true);
  }, [slug, API_URL]);
  return (
    <CommentsContext.Provider
      value={{
        isCommentsPanelOpen,
        setIsCommentsPanelOpen,
        setSlug,
        comments,
        isLoading,
        error,
        setComments,
        slug,
        post,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

export const useComments = () => useContext(CommentsContext);

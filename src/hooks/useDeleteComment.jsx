import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useComments } from "../contexts/commentContext";

const API_URL = import.meta.env.VITE_API_URL;

export function useDeleteComment() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const { setComments, comments } = useComments();

  const deleteComment = async (commentId, postSlug, setIsAborted) => {
    const commentsClone = [...comments];

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `${API_URL}/posts/${postSlug}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let result;
      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed deleting the comment.");
      }
    } catch (err) {
      if (err.name === "AbortError") {
        setIsAborted(false);
      }
      setComments(commentsClone);
      setError(err.message);
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, deleteComment };
}

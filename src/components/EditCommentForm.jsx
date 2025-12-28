import { useState } from "react";
import { useComments } from "../contexts/commentContext";
import { useAuth } from "../contexts/authContext";

export function EditCommentForm({ initialComment, setIsEditing, id }) {
  const [comment, setComment] = useState(initialComment);
  const { slug, setComments } = useComments();
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSlideUpRunning, setIsSlideUpRunning] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/posts/${slug}/comments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: comment,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed updating the comment.");
      }
      const updatedComment = result.comment;
      setComments((prev) =>
        prev.map((comment) => {
          if (comment.id === updatedComment.id) {
            return updatedComment;
          } else {
            return comment;
          }
        })
      );
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className={
        isSlideUpRunning
          ? "animate-slideup ease-out"
          : "animate-dropdown ease-in"
      }
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <textarea
          className="text-sm px-4 py-2 outline-2 outline-gray-200/20 rounded bg-pink-500/5 min-h-fit focus:outline-gray-200/30 transition-all duration-300 hover:bg-pink-600/6"
          name="comment"
          id="comment"
          value={initialComment || ""}
          onChange={handleCommentChange}
          aria-label="edit comment textarea"
        ></textarea>
      </div>
      <div className="flex gap-x-2 mt-2 items-center">
        <button
          className="bg-pink-700/70 w-14 h-7 text-sm rounded hover:bg-pink-600/70 cursor-pointer transition-all duration-300"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Save"}
        </button>
        <button
          className="border-2 border-pink-700/70 w-14 h-7 text-sm rounded hover:bg-pink-600/70 cursor-pointer transition-all duration-300"
          type="button"
          onClick={() => {
            setIsSlideUpRunning(true);
            setComment(initialComment);
            setTimeout(() => {
              setIsEditing(false);
              setIsSlideUpRunning(false);
            }, 300);
          }}
        >
          Cancel
        </button>
      </div>

      {error && <p>Error: {error}</p>}
    </form>
  );
}

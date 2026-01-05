import { useContext, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { useComments } from "../contexts/commentContext";
import { useUser } from "../contexts/userContext";
import Spinner from "./Spinner";
import { CommentsPanelContext } from "./CommentsPanel";
export function AddCommentForm({ slug, setIsCommenting }) {
  const [comment, setComment] = useState("");
  const { token } = useAuth();
  const { user } = useUser();
  const { setComments } = useComments();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSlideUpRunning, setIsSlideUpRunning] = useState(false);
  const { controller } = useContext(CommentsPanelContext);
  const API_URL = import.meta.env.VITE_API_URL;
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempId = Date.now();
    const OptimisticComment = {
      id: tempId,
      author: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        profile: {
          avatar: user?.profile?.avatar || "/avatar_placeholder.jpg",
        },
      },
      content: comment,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: "sending",
    };

    setComments((prev) => [...prev, OptimisticComment]);

    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch(`${API_URL}/posts/${slug}/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
        }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed adding the comment");
      }
      const addedcomment = result.comment;
      if (addedcomment) {
        setComments((prev) =>
          prev.map((comment) => {
            if (comment.id === OptimisticComment.id) {
              return addedcomment;
            } else {
              return comment;
            }
          })
        );
      }
    } catch (error) {
      if (error.name === "AbortError") return;
      setError(error.message);
      setComments((prev) =>
        prev.filter((comment) => comment.id !== OptimisticComment.id)
      );
    } finally {
      setIsLoading(false);
      setComment("");
    }
  };
  return (
    <form
      className={
        isSlideUpRunning
          ? "animate-slideup easu-out"
          : "animate-dropdown ease-in"
      }
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label className="text-sm mb-2" htmlFor="comment">
          Comment
        </label>
        <textarea
          className="text-sm px-4 py-2 max-w-120 outline-2 outline-gray-200/20 rounded bg-pink-500/5 min-h-20 focus:outline-gray-200/30 transition-all duration-300 hover:bg-pink-600/6"
          name="comment"
          id="comment"
          required
          placeholder="Add a comment..."
          dir="auto"
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
        <div className="flex gap-x-2 mt-2 items-center">
          <button
            className="bg-pink-700/70 disabled:bg-pink-200 w-16 h-8 text-sm rounded hover:bg-pink-600/70 cursor-pointer transition-all duration-300"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner className="w-6 h-6 m-auto" /> : "Add"}
          </button>
          <button
            className="border-2 border-pink-700/70 w-16 h-8 text-sm rounded hover:bg-pink-600/70 cursor-pointer transition-all duration-300"
            type="button"
            onClick={() => {
              setIsSlideUpRunning(true);
              setTimeout(() => {
                setIsCommenting(false);
                setIsSlideUpRunning(false);
              }, 300);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      {error && <p>Error: {error}</p>}
    </form>
  );
}

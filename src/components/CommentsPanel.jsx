import { useLocation } from "react-router";
import { useComments } from "../contexts/commentContext";
import { Comment } from "./Comment";
import { useEffect, useMemo, useRef, useState } from "react";
import { AddCommentForm } from "./AddCommentForm";
import { MessageCircle, X, PlusCircle } from "lucide-react";
import Spinner from "./Spinner";
import { LoadingComments } from "./LoadingComments";
import { createContext } from "react";
export const CommentsPanelContext = createContext(null);

export function CommentsPanel() {
  const {
    isCommentsPanelOpen,
    setIsCommentsPanelOpen,
    comments,
    error,
    isLoading,
    slug,
  } = useComments();
  const [isCommenting, setIsCommenting] = useState(false);
  const [isAborted, setIsAborted] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsCommentsPanelOpen(false);
  }, [location, setIsCommentsPanelOpen]);

  const commentsCount = comments?.length;

  const controller = useMemo(() => new AbortController(), [isAborted]);
  return (
    <CommentsPanelContext value={{ controller, setIsAborted }}>
      <section
        id="drawer-bottom-comments"
        aria-labelledby="drawer-bottom-comments-label"
        className={`fixed bottom-0 left-0 right-0 z-60 h-3/4 w-full px-4
        bg-slate-900
        transform transition-transform duration-300 ease-in-out
        ${isCommentsPanelOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="border-b border-gray-700 py-3 mb-4 flex items-center justify-between">
          <h5
            id="drawer-bottom-comments-label"
            className="flex items-center text-lg font-semibold gap-x-2"
          >
            <MessageCircle className="w-5 h-5" />
            Comments ({commentsCount})
          </h5>
          <button
            type="button"
            onClick={() => setIsCommentsPanelOpen(false)}
            aria-controls="drawer-bottom-comments"
            className="flex items-center justify-center w-9 h-9 rounded-md 
                      hover:bg-pink-600/10 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
            <span className="sr-only">Close comments</span>
          </button>
        </div>
        <div className="w-full sm:my-12 sm:w-3/4 md:w-3/4 lg:w-1/2 mx-auto">
          <div className="mb-4">
            <button
              onClick={() => setIsCommenting(true)}
              className="bg-pink-700/70 px-2 py-1.5 mb-2 text-sm rounded hover:bg-pink-600/70 cursor-pointer transition-all duration-300 flex items-center"
            >
              <PlusCircle className="mr-2" size={18} />
              Add Comment
            </button>
            {isCommenting && (
              <AddCommentForm slug={slug} setIsCommenting={setIsCommenting} />
            )}
          </div>

          <ul className="overflow-y-auto max-h-[50vh] scrollbar-custom">
            {error ? (
              <p className="text-red-400">Error: {error}</p>
            ) : isLoading ? (
              <LoadingComments />
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <Comment
                  author={comment.author}
                  createdAt={comment.createdAt}
                  updatedAt={comment.updatedAt}
                  content={comment.content}
                  id={comment.id}
                  key={comment.id}
                  status={comment.status}
                />
              ))
            ) : (
              <p className="text-gray-200 text-center mask-t-from-0.5">
                No comments yet
              </p>
            )}
          </ul>
        </div>
      </section>
    </CommentsPanelContext>
  );
}

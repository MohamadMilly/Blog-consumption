import { createContext } from "react";
import { useComments } from "../contexts/commentContext";
import { useMemo, useState, useEffect } from "react";
import { AddCommentForm } from "./AddCommentForm";
import { LoadingComments } from "./LoadingComments";
import { Comment } from "./Comment";
import { useAuth } from "../contexts/authContext";

export const ControlContext = createContext(null);

export function CommmentsContainer({ className = "", slug = "" }) {
  const {
    comments,
    isLoading,
    error,
    setSlug,
    slug: globalSlug,
  } = useComments();
  const [isAborted, setIsAborted] = useState(false);
  const { user } = useAuth();
  const controller = useMemo(() => new AbortController(), [isAborted]);
  useEffect(() => {
    if (!slug) return;
    setSlug(slug);
  }, [slug, setSlug]);
  return (
    <ControlContext.Provider value={{ controller, setIsAborted }}>
      <div className={className}>
        {user && <AddCommentForm slug={globalSlug} />}
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
    </ControlContext.Provider>
  );
}

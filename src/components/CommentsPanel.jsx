import { useLocation } from "react-router";
import { useComments } from "../contexts/commentContext";
import { useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { CommmentsContainer } from "./CommentsContainer";

export function CommentsPanel() {
  const { isCommentsPanelOpen, setIsCommentsPanelOpen, comments } =
    useComments();

  const location = useLocation();
  useEffect(() => {
    setIsCommentsPanelOpen(false);
  }, [location, setIsCommentsPanelOpen]);

  const commentsCount = comments?.length;

  return (
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
      <CommmentsContainer
        className={"w-full sm:my-12 sm:w-3/4 md:w-3/4 lg:w-1/2 mx-auto"}
      />
    </section>
  );
}

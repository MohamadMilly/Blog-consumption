import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { EllipsisVertical } from "lucide-react";
import { X } from "lucide-react";
import { SquarePen, Trash } from "lucide-react";
import { useDeleteComment } from "../hooks/useDeleteComment";
import { useAddComment } from "../hooks/useAddComment";
export function CommentDropDown({
  setIsEditing,
  authorId,
  commentId,
  slug,
  status,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { mutation: deleteMutation } = useDeleteComment();
  if (!user || user.id !== authorId) return null;
  return (
    <div className="relative">
      <button
        className="cursor-pointer hover:bg-gray-500/10 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={18} /> : <EllipsisVertical size={18} />}
      </button>
      {isOpen && (
        <ul
          role="menu"
          className="w-30 bg-gray-600/20 backdrop-blur-lg absolute top-0 -left-2 -translate-x-full rounded overflow-hidden
        "
        >
          <li className="hover:bg-gray-500/10 px-1 py-1" role="menuitem">
            <button
              disabled={status === "sending"}
              className="text-sm text-gray-400 flex gap-x-1 items-center cursor-pointer disabled:opacity-20"
              onClick={() => {
                setIsOpen(false);
                setIsEditing(true);
              }}
            >
              <SquarePen size={15} />
              <span>Edit</span>
            </button>
          </li>
          <li className="hover:bg-gray-500/10 px-1 py-1" role="menuitem">
            <button
              disabled={status === "sending"}
              className="text-sm text-gray-400 flex gap-x-1 items-center cursor-pointer disabled:opacity-20"
              onClick={() => {
                deleteMutation.mutate({ commentId, postSlug: slug });
              }}
            >
              <Trash size={15} className="stroke-red-600" />
              <span>Delete</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

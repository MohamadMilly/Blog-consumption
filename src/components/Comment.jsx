import { CommentDropDown } from "./CommentDropdown";
import { useState } from "react";
import { EditCommentForm } from "./EditCommentForm";
import { useAuth } from "../contexts/authContext";
import { useComments } from "../contexts/commentContext";
import { timeAgo } from "../utlis/dateUtlis";
import { Link } from "react-router";

export function Comment({ author, content, createdAt, updatedAt, id }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [isDateVisibie, setIsDateVisible] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const { slug, setComments, comments, post } = useComments();
  const createdAtDate = new Date(createdAt);
  const updatedAtDate = new Date(updatedAt);
  const createdAtDateISO = createdAtDate.toISOString();
  const createdAtDateString = timeAgo(createdAtDate);
  const updatedAtDateISO = updatedAtDate.toISOString();
  const updatedAtDateString = timeAgo(updatedAtDate);
  const profile = author?.profile;
  const avatar = profile?.avatar || "/avatar_placeholder.png";

  const isPostAuthorComment = post.author.id === author.id;
  const handleDelete = async () => {
    try {
      setIsloading(true);
      setError(null);
      const response = await fetch(
        `http://localhost:8000/posts/${slug}/comments/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed deleteing the comment.");
      }
      setComments(
        comments.filter((comment) => comment.id !== result.comment.id)
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setIsloading(false);
    }
  };

  const handleDateVisibilityToggle = () => {
    setIsDateVisible(!isDateVisibie);
  };
  return (
    <li
      onClick={handleDateVisibilityToggle}
      className="mb-2 cursor-pointer flex"
    >
      {" "}
      <Link to={`/users/${author.username}/profile`}>
        <img
          className="w-16 h-16 rounded-full object-cover mr-2"
          src={avatar}
          alt="comment author avatar"
        />
      </Link>
      <div className="grow">
        <div className="px-4 py-2 bg-gray-500/10 rounded-t-lg rounded-br-lg">
          {error && <p className="text-red-600">Error: {error}</p>}
          <div className="text-sm mb-1 flex justify-between items-center">
            <strong className="flex items-center gap-x-2">
              <span>{author.firstname + " " + author.lastname}</span>
              {isPostAuthorComment && (
                <span className="p-1 text-xs bg-pink-600/10 text-pink-400 font-light rounded">
                  Author
                </span>
              )}
            </strong>
            <CommentDropDown
              setIsEditing={setIsEditing}
              authorId={author.id}
              isLoading={isLoading}
              onDelete={handleDelete}
            />
          </div>
          {!isEditing && (
            <p className="whitespace-pre-wrap text-sm">{content}</p>
          )}
          {isEditing && (
            <EditCommentForm
              setIsEditing={setIsEditing}
              initialComment={content}
              id={id}
            />
          )}
        </div>
        {isDateVisibie && (
          <div className="flex gap-x-4 text-xs text-pink-500/80">
            <time dateTime={createdAtDateISO}>
              Created: {createdAtDateString}
            </time>
            <time dateTime={updatedAtDateISO}>
              Updated: {updatedAtDateString}
            </time>
          </div>
        )}
      </div>
    </li>
  );
}

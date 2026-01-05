import { Link, useNavigate } from "react-router";
import { useComments } from "../contexts/commentContext";
import { MoveRight } from "lucide-react";
import { MessageCircle, ArrowRight } from "lucide-react";
import { timeAgo } from "../utlis/dateUtlis";
import { ImageIcon } from "lucide-react";
export function Post({
  title,
  content,
  author,
  categories = [],
  createdAt,
  updatedAt = null,
  slug,
  featuredImageURL,
}) {
  const createdAtDate = new Date(createdAt);
  const updatedAtDate = new Date(updatedAt);

  const createdAtDateISO = createdAtDate.toISOString();
  const updatedAtDateISO = updatedAtDate.toISOString();

  const updatedAtDateString = timeAgo(updatedAtDate);
  const createdAtDateString = timeAgo(createdAtDate);

  const { setSlug, setIsCommentsPanelOpen } = useComments();
  const navigate = useNavigate();

  const authorAvatar = author.profile?.avatar || "/avatar_placeholder.jpg";

  const handleShowComments = () => {
    setIsCommentsPanelOpen(true);
    setSlug(slug);
  };
  return (
    <article className="flex flex-col">
      <div className="text-xs text-gray-300 mb-2 flex justify-between items-center flex-wrap gap-y-2 pb-2 border-b border-gray-400/20">
        <Link
          to={`/users/${author.username}/profile`}
          className="group flex items-center"
          viewTransition
        >
          <img
            className="w-8 h-8 auto object-center mr-2 rounded-full"
            src={authorAvatar}
            alt="author's avatar"
          />
          <span className="group-hover:underline">
            By: {author.firstname + " " + author.lastname}
          </span>
        </Link>
        <time className="block text-gray-400" dateTime={createdAtDateISO}>
          {createdAtDateString}
        </time>
      </div>
      <div className="flex flex-col min-h-80 sm:h-60 sm:min-h-0  sm:flex-row gap-4 bg-gray-800/15 rounded-lg overflow-hidden mb-4 border-2 border-gray-800/10 border-dotted">
        <div className="w-full h-40 sm:h-full sm:w-50 shrink-0 bg-gray-500/10 flex items-center justify-center text-gray-400 overflow-hidden">
          {featuredImageURL ? (
            <img
              className="object-cover w-full h-full vt-image"
              src={featuredImageURL}
              alt="post feature image"
            />
          ) : (
            <ImageIcon size={32} />
          )}
        </div>
        <div className="flex flex-col grow px-4 py-2">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-x-2 group border-b-2 border-pink-600/70 w-fit transition-all duration-300 vt-title">
            <Link viewTransition to={`/posts/${slug}`}>
              {title}
            </Link>
            <MoveRight
              size={18}
              className="group-hover:translate-x-2 transition-all duration-300"
            />
          </h2>
          <p
            dangerouslySetInnerHTML={{
              __html:
                content.length > 100
                  ? content.slice(0, content.lastIndexOf(" ", 100)) + "..."
                  : content,
            }}
            className="text-sm text-gray-200 bg-gray-700/10 p-2 my-2 rounded max-h-20 overflow-hidden"
          />
          <ul className="flex flex-wrap gap-2 mt-3 text-sm">
            {categories.map((category) => (
              <li
                key={category.id}
                tabIndex={0}
                className="px-2 py-1 rounded-full bg-pink-600/10 text-pink-300 cursor-pointer hover:bg-pink-600/20 transition-all duration-300"
                onClick={() => navigate(`/categories?title=${category.title}`)}
              >
                {category.title}
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <button
              onClick={handleShowComments}
              className="w-full flex justify-center items-center gap-x-2 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-700/50 text-gray-200 rounded transition-all duration-300"
            >
              <MessageCircle size={18} />
              <span>Comments</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

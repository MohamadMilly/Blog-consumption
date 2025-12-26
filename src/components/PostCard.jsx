import { Link, useNavigate } from "react-router";
import { useComments } from "../contexts/commentContext";
import { MoveRight } from "lucide-react";
import { Pen } from "lucide-react";
import { MessageCircle } from "lucide-react";
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
  const handleShowComments = () => {
    setIsCommentsPanelOpen(true);
    setSlug(slug);
  };
  return (
    <article className="flex flex-col sm:flex-row gap-4 bg-gray-800/15 rounded-lg p-4 mb-4 border-2 border-gray-800/10 border-dotted">
      <div className="w-full h-48 sm:w-50 shrink-0 bg-gray-500/10 rounded-md flex items-center justify-center text-gray-400 overflow-hidden">
        {featuredImageURL ? (
          <img
            className="object-cover w-full h-full"
            src={featuredImageURL}
            alt="post feature image"
          />
        ) : (
          <ImageIcon size={32} />
        )}
      </div>

      <div className="flex flex-col grow">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-x-2 group border-b-2 border-pink-600/70 w-fit transition-all duration-300">
          <Link to={`/posts/${slug}`}>{title}</Link>
          <MoveRight
            size={18}
            className="group-hover:translate-x-2 transition-all duration-300"
          />
        </h2>

        <div className="text-sm text-gray-300 mb-2">
          <span className="flex items-center gap-x-2">
            <Pen size={15} className="stroke-pink-500" />
            By: {author.firstname} {author.lastname}
          </span>
          <div className="mt-1 space-y-1">
            <time className="block text-gray-400" dateTime={createdAtDateISO}>
              Created: {createdAtDateString}
            </time>
            {updatedAt && (
              <time className="block text-gray-400" dateTime={updatedAtDateISO}>
                Updated: {updatedAtDateString}
              </time>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-200 bg-gray-700/10 p-2 my-2 rounded">
          {content.length > 100
            ? content.slice(0, content.lastIndexOf(" ", 100)) + "..."
            : content}
        </p>

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
    </article>
  );
}

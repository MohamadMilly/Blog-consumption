import { Link, useParams } from "react-router";
import { useComments } from "../contexts/commentContext";
import { usePosts } from "../contexts/postsContext";
import { useEffect, useState } from "react";
import { Comment } from "../components/Comment";
import { formatDate } from "../utlis/dateUtlis";
import { AddCommentForm } from "../components/AddCommentForm";
import { PlusCircle, ArrowRight } from "lucide-react";
import { useMathJax } from "../hooks/useMathJax";
import Spinner from "../components/Spinner";
import { LoadingComments } from "../components/LoadingComments";

export function PostPage() {
  useMathJax();
  const { slug } = useParams();
  const { setSlug, comments, isLoading: isLoadingComments } = useComments();
  const { isLoading: isLoadingPosts, error, posts } = usePosts();
  const [isCommenting, setIsCommenting] = useState(false);
  useEffect(() => {
    setSlug(slug);
  }, [slug, setSlug]);

  if (error) return <p>Error: {error}</p>;
  if (isLoadingPosts)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );

  const post = posts?.find((post) => post.slug === slug);
  const createdAtDateISO = new Date(post?.createdAt).toISOString();
  const createdAtDateString = formatDate(new Date(post?.createdAt));
  const updatedAtDateISO = new Date(post?.updatedAt).toISOString();
  const updatedAtDateString = formatDate(new Date(post?.updatedAt));
  const author = post?.author;
  const authorAvatar = author.profile?.avatar || "/avatar_placeholder.jpg";
  if (!post) return <p>Post is not found</p>;
  return (
    <main className="w-full px-4 sm:px-12 py-4 my-6 max-w-190 mx-auto text-gray-200 transition-all duration-300 mt-12  ">
      <header className="flex flex-col items-center sm:items-start">
        {post.featuredImageURL && (
          <div className="max-w-80">
            <img
              className="w-full max-h-auto"
              src={post.featuredImageURL}
              alt="post feature image"
            />
          </div>
        )}

        <h1 className="bg-pink-600 text-5xl sm:text-6xl font-bold text-black mix-blend-screen px-10 py-5 mb-6">
          {post.title}
        </h1>
        <p className="text-gray-300 text-lg  mr-auto mb-4">
          <Link
            to={`/users/${author.username}/profile`}
            className="group flex items-center"
          >
            <img
              className="w-15 h-15 auto object-center mr-2 rounded-full"
              src={authorAvatar}
              alt="author's avatar"
            />
            <span className="group-hover:underline flex items-center gap-x-1">
              By: {author.firstname + " " + author.lastname}
              <ArrowRight
                className="group-hover:translate-x-2 transition-all duration-300"
                size={18}
              />
            </span>
          </Link>
        </p>
        <div className="flex flex-col p-2 bg-gray-500/10 rounded mb-8">
          <time dateTime={createdAtDateISO}>
            <span className="text-pink-600">Created at: </span>
            {createdAtDateString}
          </time>
          <time dateTime={updatedAtDateISO}>
            <span className="text-pink-600">Updated at: </span>
            {updatedAtDateString}
          </time>
        </div>
      </header>
      <article
        dangerouslySetInnerHTML={{ __html: post.content }}
        className="text-lg text-gray-200 mb-8 whitespace-pre-wrap prose prose-invert"
      />

      <aside>
        <h2 className="text-2xl tracking-tight font-medium border-b-2 border-pink-600 mb-4">
          Comments
        </h2>
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
        <ul className="mb-24">
          {isLoadingComments ? (
            <LoadingComments />
          ) : comments.length > 0 ? (
            comments.map((comment) => {
              return (
                <Comment
                  author={comment.author}
                  createdAt={comment.createdAt}
                  updatedAt={comment.updatedAt}
                  content={comment.content}
                  id={comment.id}
                  key={comment.id}
                />
              );
            })
          ) : (
            <p>No comments yet</p>
          )}
        </ul>
      </aside>
    </main>
  );
}

import { Link, useParams } from "react-router";

import { useEffect } from "react";

import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // VS Code dark theme
import "prismjs/components/prism-javascript"; // add languages you need
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";

import { formatDate } from "../utlis/dateUtlis";

import { ArrowRight } from "lucide-react";
import { useMathJax } from "../hooks/useMathJax";

import { CommmentsContainer } from "../components/CommentsContainer";
import { useGetPost } from "../hooks/useGetPost";
import { PostPageLoading } from "../components/PostPageLoading";

export function PostPage() {
  useMathJax();
  const { slug } = useParams();
  const { isLoading: isLoadingPost, error, post } = useGetPost(slug);

  useEffect(() => {
    if (!post) return;
    document.querySelectorAll("pre").forEach((pre) => {
      pre.classList.add("line-numbers");
      pre.setAttribute("dir", "auto");
    });
    Prism.highlightAll();
  }, [post]);

  if (error) return <p>Error: {error}</p>;

  const createdAtDateISO =
    !isLoadingPost && new Date(post?.createdAt).toISOString();
  const createdAtDateString =
    !isLoadingPost && formatDate(new Date(post?.createdAt));
  const updatedAtDateISO =
    !isLoadingPost && new Date(post?.updatedAt).toISOString();
  const updatedAtDateString =
    !isLoadingPost && formatDate(new Date(post?.updatedAt));
  const author = !isLoadingPost && post?.author;
  const authorAvatar =
    !isLoadingPost && (author.profile?.avatar || "/avatar_placeholder.jpg");

  return (
    <main className="w-full px-4 sm:px-12 py-4 my-6 max-w-190 mx-auto text-gray-200 transition-all duration-300 mt-12">
      {isLoadingPost ? (
        <PostPageLoading slug={slug} />
      ) : (
        <>
          <header className="flex flex-col items-center sm:items-start">
            <h1
              dir="auto"
              style={{ viewTransitionName: `post-title-${slug}` }}
              className="bg-pink-600 text-4xl sm:text-5xl font-bold text-black mix-blend-screen px-10 py-5 mb-6"
            >
              {post.title}
            </h1>
            {post.featuredImageURL && (
              <div className="max-w-90 rounded mb-4">
                <img
                  className="w-full max-h-auto rounded"
                  style={{ viewTransitionName: `post-image-${slug}` }}
                  src={post.featuredImageURL}
                  alt="post feature image"
                />
              </div>
            )}
            <p className="text-gray-300 text-sm mr-auto mb-4">
              <Link
                to={`/users/${author.username}/profile`}
                className="group flex items-center"
              >
                <img
                  className="w-10 h-10 auto object-center mr-2 rounded-full"
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
          </header>
          <hr class="w-1/2 border-t-2 border-pink-600 mx-auto" />
          <article
            dir="auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="mt-8 sm:text-lg text-gray-200 mb-8 whitespace-normal prose prose-invert max-w-prose overflow-x-auto"
          />
          <div className="flex flex-col pl-4 py-2 pr-2 bg-gray-500/10 rounded mb-8 text-sm text-gray-400 border-l-5 border-pink-600">
            <time dateTime={createdAtDateISO}>
              <span className="text-pink-600 mr-2">Created at: </span>
              {createdAtDateString}
            </time>
            <time dateTime={updatedAtDateISO}>
              <span className="text-pink-600 mr-2">Updated at: </span>
              {updatedAtDateString}
            </time>
          </div>
        </>
      )}

      <aside>
        <h2 className="text-lg sm:text-xl tracking-tight font-medium border-b-2 border-pink-600 mb-4">
          Comments
        </h2>
        <CommmentsContainer slug={slug} />
      </aside>
    </main>
  );
}

import { Post } from "../components/PostCard";
import { CommentsPanel } from "../components/CommentsPanel";
import { usePosts } from "../contexts/postsContext";

import { LoadingPostsPage } from "../components/LoadingPostsPage";
import { toast } from "react-toastify";
import InfiniteScroll from "../components/InfiniteScroll";
import Spinner from "../components/Spinner";
export function HomePage() {
  const { isLoading: isLoadingPosts, error, posts } = usePosts();
  const isLoadingMoreData = isLoadingPosts && posts.length > 0;
  const isLoadingInitialData = isLoadingPosts && posts.length === 0;
  if (error) {
    toast.error(error);
  }

  if (posts.length <= 0 && !isLoadingPosts) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white text-sm">No posts yet...</p>
      </div>
    );
  }

  return (
    <main className=" px-4 sm:px-12 py-4 mt-6 max-w-190 mx-auto text-gray-200 transition-all duration-300">
      <h1 className="tracking-tight text-2xl mb-10">Home</h1>
      {isLoadingInitialData ? (
        <LoadingPostsPage />
      ) : (
        <section className="mt-2">
          {posts.map((post) => {
            return (
              <Post
                title={post.title}
                content={post.content}
                author={post.author}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
                slug={post.slug}
                featuredImageURL={post.featuredImageURL}
                categories={post.categories}
                key={post.id}
              />
            );
          })}
        </section>
      )}
      <InfiniteScroll />
      {isLoadingMoreData && (
        <p className="flex justify-center">
          <Spinner />
        </p>
      )}
      <CommentsPanel />
    </main>
  );
}

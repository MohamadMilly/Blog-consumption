import { Post } from "../components/PostCard";
import { CommentsPanel } from "../components/CommentsPanel";
import { usePosts } from "../contexts/postsContext";
import Spinner from "../components/Spinner";
export function HomePage() {
  const { isLoading, error, posts } = usePosts();
  if (error) {
    return <p className="text-red-600 text-center">Error: {error}</p>;
  }
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (posts.length <= 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white text-sm">No posts yet...</p>
      </div>
    );
  }

  return (
    <main className=" px-4 sm:px-12 py-4 mt-6 max-w-190 mx-auto text-gray-200 transition-all duration-300 pb-10">
      <h1 className="tracking-tight text-2xl mb-4">Home</h1>
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
      <CommentsPanel />
    </main>
  );
}

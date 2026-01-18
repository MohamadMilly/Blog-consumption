import { useSubmit, Form, useSearchParams } from "react-router";
import { Post } from "../components/PostCard";
import { CommentsPanel } from "../components/CommentsPanel";
import { LoadingPostsPage } from "../components/LoadingPostsPage";
import { useSearch } from "../hooks/useSearch";
import { useEffect, useState } from "react";
export function SearchPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const submit = useSubmit();

  useEffect(() => {
    const query = searchParams.get("slug")?.trim();
    const timer = setTimeout(() => {
      setQuery(query);
    }, 700);
    return () => clearTimeout(timer);
  }, [query, searchParams]);
  const { isLoading, posts, error } = useSearch(query);
  const resultsCount = posts.length;
  return (
    <main
      className={`w-full sm:px-12 px-4 py-4 my-6 max-w-190 mx-auto text-gray-200 transition-all duration-300`}
    >
      <h1 className="text-2xl tracking-tight mb-6">Search</h1>
      <Form className="bg-gray-600/10 p-2 rounded-lg" method="GET">
        <div>
          <input
            className="px-4 py-2 w-full outline-2 outline-gray-300 focus:outline-pink-600 rounded-lg transition-all duration-300 bg-gray-600/20"
            type="search"
            placeholder="Search by slug..."
            onChange={(e) => {
              let isFirstSearch = query ? false : true;
              submit(e.currentTarget.form, {
                replace: !isFirstSearch,
              });
            }}
            defaultValue={query || ""}
            name="slug"
          />
        </div>
      </Form>
      <section className="flex flex-col justify-center mt-4">
        {query && posts.length > 0 && (
          <p className="text-sm mask-t-from-0% mb-8">Results: {resultsCount}</p>
        )}
        {error ? (
          <p className="text-red-600 text-sm">Error: {error}</p>
        ) : isLoading ? (
          <LoadingPostsPage />
        ) : query && posts.length === 0 ? (
          <p className="text-sm text-center">No results found</p>
        ) : (
          posts.map((post) => {
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
          })
        )}
      </section>
      <CommentsPanel />
    </main>
  );
}

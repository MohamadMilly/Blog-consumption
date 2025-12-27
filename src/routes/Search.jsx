import { useEffect, useState } from "react";
import { useSubmit, Form, useSearchParams } from "react-router";
import { Post } from "../components/PostCard";
import { CommentsPanel } from "../components/CommentsPanel";
import Spinner from "../components/Spinner";
export function SearchPage() {
  const [searchParams] = useSearchParams();
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const submit = useSubmit();

  const query = searchParams.get("slug")?.trim();
  const resultsCount = posts.length;
  const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const fetchPosts = async () => {
      if (!query) {
        setPosts([]);
        setisLoading(false);
        return null;
      }
      try {
        setisLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/posts?slug=${query}`, {
          signal: controller.signal,
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Error searching posts");
        }
        setPosts(result.posts || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        if (active) {
          setisLoading(false);
        }
      }
    };
    fetchPosts();
    return () => {
      controller.abort();
      active = false;
    };
  }, [query, API_URL]);

  return (
    <main
      className={`w-full sm:px-12 px-4 py-4 my-6 sm:my-12 max-w-190 mx-auto border-l-2 ${resultsCount > 0 ? "border-pink-500/70" : "border-white"} text-gray-200 transition-all duration-300`}
    >
      <h1 className="text-2xl tracking-tight mb-4">Search</h1>
      <Form method="GET">
        <div>
          <input
            className="px-4 py-1.5 w-full outline-2 outline-white focus:outline-pink-600 rounded-full transition-all duration-300"
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
      <section className="flex flex-col justify-center mt-8">
        {error ? (
          <p className="text-red-600 text-sm">Error: {error}</p>
        ) : isLoading ? (
          <Spinner />
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
        {query && posts.length > 0 && (
          <p className="text-sm mask-t-from-0% ">Results: {resultsCount}</p>
        )}
      </section>
      <CommentsPanel />
    </main>
  );
}

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Post } from "../components/PostCard";
import { CommentsPanel } from "../components/CommentsPanel";
import { ToggleCategoryButton } from "../components/ToggleCategoryButton";
import Spinner from "../components/Spinner";
import { LoadingPostsPage } from "../components/LoadingPostsPage";
import { useQuery } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

async function getCategories() {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    throw new Error("An error happened while getting available categories.");
  }
  return response.json();
}

export function Categories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get("title")?.split(",") ?? [];
  const { isLoading, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
  });

  const toggleCategory = (title) => {
    const next = selected.includes(title)
      ? selected.filter((t) => t !== title)
      : [...selected, title];
    if (next && next.length === 0) {
      setSearchParams({});
    } else {
      setSearchParams({ title: next.join(",") });
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }
  if (isLoading) {
    return <Spinner />;
  }
  const categories = data.categories;
  if (categories.length === 0) {
    return <p>No existing categories yet</p>;
  }
  return (
    <ul className="flex gap-x-2 mb-4 bg-gray-500/10 px-4 py-2 rounded overflow-x-auto">
      {categories.map((category) => {
        return (
          <li key={category.id}>
            <ToggleCategoryButton
              title={category.title}
              onToggle={() => toggleCategory(category.title)}
            />
          </li>
        );
      })}
    </ul>
  );
}

export function CategoriesPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const selected = searchParams.get("title");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let ignore = false;
    if (!selected) return;
    const getPostsByCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`${API_URL}/posts?categories=${selected}`);
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Failed to filter posts.");
        }
        if (ignore) return null;
        const posts = result.posts;
        setPosts(posts || []);
      } catch (err) {
        setError(err.message);
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getPostsByCategories();
    return () => (ignore = true);
  }, [selected, API_URL]);
  return (
    <main className="px-4 sm:px-12 py-4 my-6 max-w-190 mx-auto text-gray-200 transition-all duration-300">
      <h1 className="text-2xl tracking-tight mb-10">Categories</h1>
      <Categories />
      <section>
        {!selected ? (
          <p className="text-sm text-center mask-t-from-10% mt-10">
            choose a category to filter posts.
          </p>
        ) : error ? (
          <p className="text-sm text-center mask-t-from-10% mt-10 text-red-600">
            Error: {error}.
          </p>
        ) : isLoading ? (
          <LoadingPostsPage />
        ) : posts.length === 0 ? (
          <p>No Posts are found.</p>
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

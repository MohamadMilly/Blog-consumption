import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Post } from "../components/PostCard";
import { CommentsPanel } from "../components/CommentsPanel";
import { ToggleCategoryButton } from "../components/ToggleCategoryButton";
import Spinner from "../components/Spinner";
import { LoadingPostsPage } from "../components/LoadingPostsPage";

export function Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get("title")?.split(",") ?? [];

  const API_URL = import.meta.env.VITE_API_URL;

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

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/categories`);
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (err) {
        setError(err.message);
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCategories();
  }, [API_URL]);
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (isLoading) {
    return <Spinner />;
  }
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
    if (!selected) return;
    const getPostsByCategories = () => {
      setIsLoading(true);
      setError(null);
      fetch(`${API_URL}/posts?categories=${selected}`)
        .then((response) => response.json())
        .then((data) => setPosts(data.posts || []))
        .catch((error) => setError(error.message))
        .finally(() => setIsLoading(false));
    };
    getPostsByCategories();
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

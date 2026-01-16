import { useContext, createContext, useState, useEffect, useRef } from "react";

const PostsContext = createContext([]);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const [cursor, setCursor] = useState(null);
  const firstLoad = useRef(true);
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    const getPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `${API_URL}/posts${cursor ? `?currentCursor=${cursor}` : ""}`
        );
        if (!response.ok) {
          throw new Error("An Error happened while fetching posts");
        }
        const fetchedPostsObj = await response.json();
        setPosts((prev) => [...prev, ...fetchedPostsObj.posts]);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [API_URL, cursor]);
  return (
    <PostsContext.Provider value={{ isLoading, error, posts, setCursor }}>
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => useContext(PostsContext);

import { useContext, createContext, useState, useEffect } from "react";

const PostsContext = createContext([]);

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/posts`);
        if (!response.ok) {
          throw new Error("An Error happened while fetching posts");
        }
        const fetchedPostsObj = await response.json();

        setPosts(fetchedPostsObj.posts);
      } catch (error) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, [API_URL]);
  return (
    <PostsContext.Provider value={{ isLoading, error, posts }}>
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => useContext(PostsContext);

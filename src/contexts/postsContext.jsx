import { useContext, createContext } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
const PostsContext = createContext([]);

const API_URL = import.meta.env.VITE_API_URL;

async function getPosts(cursor) {
  const response = await fetch(
    `${API_URL}/posts${cursor ? `?currentCursor=${cursor}` : ""}`,
  );
  if (!response.ok) {
    throw new Error("An Error happened while fetching posts");
  }
  return response.json();
}

export function PostsProvider({ children }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = null }) => getPosts(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.nextcursor;
    },
    staleTime: 1000 * 60 * 2,
  });

  return (
    <PostsContext.Provider
      value={{
        posts: data ? data.pages.flatMap((page) => page.posts) : [],
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage: isFetchingNextPage,
        isLoading: isLoading,
        error,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => useContext(PostsContext);

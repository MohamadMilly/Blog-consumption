import { useEffect, useRef } from "react";
import { usePosts } from "../contexts/postsContext";

export default function InfiniteScroll() {
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = usePosts();
  const loaderRef = useRef(null);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    const currentLoader = loaderRef.current;
    observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return <div ref={loaderRef} style={{ height: "40px" }} />;
}

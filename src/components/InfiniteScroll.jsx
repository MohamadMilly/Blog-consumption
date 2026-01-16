import { useEffect, useRef } from "react";
import { usePosts } from "../contexts/postsContext";

export default function InfiniteScroll() {
  const { setCursor, posts } = usePosts();
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0];

      if (first.isIntersecting) {
        const lastPost = posts[posts.length - 1];

        if (lastPost) {
          setCursor(lastPost.id);
        }
      }
    });

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [posts, setCursor]);

  return <div ref={loaderRef} style={{ height: "40px" }} />;
}

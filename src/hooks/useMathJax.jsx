import { useEffect } from "react";

export function useMathJax() {
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise();
    }
  });
}

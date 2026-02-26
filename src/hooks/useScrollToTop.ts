import { useEffect } from "react";

// This hook serves as a temporary workaround for React Router <Link> component
// not scrolling to top on the newly opened page.

export const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};

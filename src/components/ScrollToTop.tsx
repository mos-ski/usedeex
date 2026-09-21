import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * A new route starts at the top. Going back does not — a POP restores the
 * position the browser already remembers, so returning from a detail screen
 * leaves you where you were in the list.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "POP") return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, navigationType]);

  return null;
};

export default ScrollToTop;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoSplash from "@/assets/landing/logo-splash.svg";

/** How long the mark holds before the app moves on. */
const HOLD_MS = 1600;

/** Launch screen (Figma 259:1715) — the wordmark centred on the brand navy. */
const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setTimeout(() => navigate("/login", { replace: true }), HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-brand-deepNavy">
      <img
        src={logoSplash}
        alt="DeeX"
        className="h-[58px] w-[216px] max-w-[60vw] animate-in fade-in zoom-in-95 duration-700"
      />
    </div>
  );
};

export default Splash;

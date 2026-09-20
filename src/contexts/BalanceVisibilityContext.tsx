import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "deex.balancesHidden";

const BalanceVisibilityContext = createContext<{ hidden: boolean; toggle: () => void }>({
  hidden: false,
  toggle: () => undefined,
});

/** Hiding balances is a single preference shared by every screen that shows one. */
export const BalanceVisibilityProvider = ({ children }: { children: ReactNode }) => {
  const [hidden, setHidden] = useState(() => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, hidden ? "1" : "0");
    } catch {
      // Private mode can block storage; the choice still holds for this session.
    }
  }, [hidden]);

  const value = useMemo(() => ({ hidden, toggle: () => setHidden((v) => !v) }), [hidden]);

  return <BalanceVisibilityContext.Provider value={value}>{children}</BalanceVisibilityContext.Provider>;
};

export const useBalanceVisibility = () => useContext(BalanceVisibilityContext);

/** Replaces a figure with dots of a similar width while balances are hidden. */
export const maskAmount = (value: string) => "•".repeat(Math.min(Math.max(value.replace(/\s/g, "").length, 4), 9));

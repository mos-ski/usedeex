import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavHistoryIcon, NavHomeIcon, NavMenuIcon, NavWalletIcon } from "./icons";

const items = [
  { label: "Home", path: "/dashboard", Icon: NavHomeIcon },
  { label: "Wallet", path: "/wallet", Icon: NavWalletIcon },
  { label: "History", path: "/activity", Icon: NavHistoryIcon },
  { label: "Menu", path: "/quick-action", Icon: NavMenuIcon },
];

/** Floating pill navigation from the Figma Dashboard (node 259:1385). */
const FloatingNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1.25rem)" }}
    >
      {/* Two-layer pill per the Figma: a 20% grey plate under a transparent blurred bar. */}
      <div className="flex h-[60px] w-full max-w-[289px] items-center justify-center overflow-hidden rounded-[1000px] border border-brand-grey100 bg-brand-surface/80 p-2 backdrop-blur-[99.7px]">
        <div className="flex h-full w-full max-w-[273px] items-center justify-center gap-[2.537px]">
          {items.map(({ label, path, Icon }) => {
            const isActive = pathname === path;
            return (
              <button
                key={path}
                type="button"
                onClick={() => navigate(path)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex min-w-0 flex-1 flex-col items-center justify-center rounded-[100px] py-1 transition-colors",
                  isActive ? "bg-brand-navy text-white" : "text-brand-grey900 hover:bg-brand-grey900/[0.04]",
                )}
              >
                <Icon className="h-6 w-6" />
                <span className="text-[10px] leading-[1.6]">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default FloatingNav;

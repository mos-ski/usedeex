import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { Footer } from "./Footer";

/** Website nav — every destination is a marketing page, never an app screen. */
export const marketingNav = [
  { label: "Products", href: "/products/buy-sell" },
  { label: "Merchant", href: "/merchant" },
  { label: "Rewards", href: "/rewards-programme" },
  { label: "FAQ", href: "/faq" },
];

/**
 * Header and footer for every page of the marketing site, so the footer pages
 * sit in the same frame as the landing page instead of dropping visitors into
 * the app.
 */
export const MarketingShell = ({ children }: { children: ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-roboto">
      <header className="sticky top-0 z-50 border-b border-brand-grey100 bg-white">
        <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-6 lg:px-8">
          <Link to="/" aria-label="DeeX home">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-6 font-manrope text-sm font-bold text-brand-ink md:flex">
            {marketingNav.map((link) => (
              <Link key={link.label} to={link.href} className="transition-colors hover:text-brand-blue500">
                {link.label}
              </Link>
            ))}
            <Link to="/login" className="transition-colors hover:text-brand-blue500">
              Login
            </Link>
            <Button asChild className="rounded-full bg-brand-navy hover:bg-brand-navy/90">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </nav>

          <button
            type="button"
            className="p-2 text-brand-ink md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="flex flex-col gap-1 border-t border-brand-grey100 px-6 pb-6 font-manrope font-semibold text-brand-ink md:hidden">
            {marketingNav.map((link) => (
              <Link key={link.label} to={link.href} className="py-2" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link to="/login" className="py-2" onClick={() => setMobileOpen(false)}>
              Login
            </Link>
            <Button asChild className="mt-2 rounded-full bg-brand-navy hover:bg-brand-navy/90">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </nav>
        )}
      </header>

      <main>{children}</main>

      <Footer />
    </div>
  );
};

export default MarketingShell;

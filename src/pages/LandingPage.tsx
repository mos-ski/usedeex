import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

// Flattened Figma exports from /public
const phoneReceiptMockup = "/phone-receipt.png";
const phoneDashboardMockup = "/phone-dashboard.png";
const depositQr = "/deposit-qr.png";
const giftCardsComposite = "/gift-cards.png";
const buyCryptoWidget = "/buy-crypto-widget.png";

import heroGlow from "@/assets/landing/ellipse-5.png";
import portraitMan from "@/assets/landing/portrait-man.png";
import iconGooglePlayBadge from "@/assets/landing/icon-google-play.svg";
import iconAppleBadge from "@/assets/landing/icon-apple.svg";
import iconArrowRight4 from "@/assets/landing/icon-arrow-right-4.svg";
import checkIcon from "@/assets/landing/check-icon.svg";
import swoosh3 from "@/assets/landing/vector-swoosh-3.svg";
import swoosh4 from "@/assets/landing/vector-swoosh-4.svg";
import swoosh5 from "@/assets/landing/vector-swoosh-5.svg";
import swoosh6 from "@/assets/landing/vector-swoosh-6.svg";
import swoosh305 from "@/assets/landing/swoosh-305.svg";
import swoosh306 from "@/assets/landing/swoosh-306.svg";
import swoosh307 from "@/assets/landing/swoosh-307.svg";
import swoosh308 from "@/assets/landing/swoosh-308.svg";
import swoosh309 from "@/assets/landing/swoosh-309.svg";
import swoosh310 from "@/assets/landing/swoosh-310.svg";
import ellipse4 from "@/assets/landing/ellipse-4.svg";
import ellipse6 from "@/assets/landing/ellipse-6.svg";
import iconUserOctagon from "@/assets/landing/icon-user-octagon.svg";
import iconArrowRight from "@/assets/landing/icon-arrow-right.svg";
import iconWalletAdd from "@/assets/landing/icon-wallet-add.svg";
import iconArrowRight2 from "@/assets/landing/icon-arrow-right-2.svg";
import iconBank from "@/assets/landing/icon-bank.svg";
import iconArrowRight3 from "@/assets/landing/icon-arrow-right-3.svg";
import iconSteam from "@/assets/landing/asset-icon-steam.png";
import iconAmex from "@/assets/landing/asset-icon-amex.png";
import iconRazer from "@/assets/landing/asset-icon-razer.png";
import iconApple from "@/assets/landing/asset-icon-apple.png";
import iconSephora from "@/assets/landing/asset-icon-sephora.png";
import iconNordstrom from "@/assets/landing/asset-icon-nordstrom.png";

// ─── Data ──────────────────────────────────────────────────────────────────────

const navLinks = [
  { label: "Merchant", href: "#merchant" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Help Center", href: "#help" },
];

const features = ["Instant payouts", "Bank-grade security", "Best rates", "Built for you"];

const buyOptions = [
  { icon: iconUserOctagon, arrow: iconArrowRight, title: "Send to DeeX User", description: "Send crypto to other users for free" },
  { icon: iconWalletAdd, arrow: iconArrowRight2, title: "External Wallet", description: "Send crypto to other wallet" },
  { icon: iconBank, arrow: iconArrowRight3, title: "Bank account", description: "Withdraw crypto to your local bank" },
];

type AssetDef = { icon?: string; color?: string; initial?: string; name: string };

type TabData = {
  heading: string;
  subheading: string;
  image: string;
  assets: AssetDef[];
};

const TABS: Record<string, TabData> = {
  "Giftcards": {
    heading: "Fast Payout, Top security and Best Rates",
    subheading: "Supported gift cards",
    image: giftCardsComposite,
    assets: [
      { icon: iconSteam, name: "Steam" },
      { icon: iconAmex, name: "American Express" },
      { icon: iconRazer, name: "Razer Gold" },
      { icon: iconApple, name: "Apple" },
      { icon: iconSephora, name: "Sephora" },
      { icon: iconNordstrom, name: "Nordstrom" },
    ],
  },
  "Digital Coins": {
    heading: "Trade Top Coins Instantly",
    subheading: "Supported cryptocurrencies",
    image: giftCardsComposite, // placeholder — swap when asset is ready
    assets: [
      { color: "#F7931A", initial: "₿", name: "Bitcoin (BTC)" },
      { color: "#627EEA", initial: "Ξ", name: "Ethereum (ETH)" },
      { color: "#26A17B", initial: "₮", name: "Tether (USDT)" },
      { color: "#2775CA", initial: "C", name: "USD Coin (USDC)" },
      { color: "#9945FF", initial: "◎", name: "Solana (SOL)" },
      { color: "#F3BA2F", initial: "B", name: "BNB" },
      { color: "#00AAE4", initial: "✕", name: "XRP" },
    ],
  },
  "Bills": {
    heading: "Pay Your Bills Fast & Easy",
    subheading: "Supported billers",
    image: giftCardsComposite, // placeholder
    assets: [
      { color: "#FFCC00", initial: "M", name: "MTN" },
      { color: "#E40000", initial: "A", name: "Airtel" },
      { color: "#006F3C", initial: "G", name: "Glo" },
      { color: "#009258", initial: "9", name: "9Mobile" },
      { color: "#003B8E", initial: "E", name: "EKEDC (Electricity)" },
      { color: "#001B8C", initial: "D", name: "DStv" },
      { color: "#007A4D", initial: "B", name: "Betway" },
    ],
  },
  "Merchants": {
    heading: "Shop at Top Merchants",
    subheading: "Supported merchants",
    image: giftCardsComposite, // placeholder
    assets: [
      { color: "#FF9900", initial: "A", name: "Amazon" },
      { color: "#F68D1E", initial: "J", name: "Jumia" },
      { color: "#E8002D", initial: "K", name: "Konga" },
      { color: "#EE1C25", initial: "S", name: "Shoprite" },
      { color: "#0071CE", initial: "W", name: "Walmart" },
      { color: "#FF4747", initial: "A", name: "AliExpress" },
    ],
  },
};

const TAB_ORDER = ["Digital Coins", "Giftcards", "Bills", "Merchants"] as const;

// ─── Animation config ──────────────────────────────────────────────────────────

const snap = [0.22, 1, 0.36, 1];
const vp = { once: true, margin: "-60px" } as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: snap } },
};

// ─── Hooks ─────────────────────────────────────────────────────────────────────

function useParallax(maxX = 20, maxY = 12) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 25 });
  const springY = useSpring(y, { stiffness: 200, damping: 25 });

  return {
    onMouseMove(e: React.MouseEvent<HTMLElement>) {
      const r = e.currentTarget.getBoundingClientRect();
      x.set(((e.clientX - r.left) / r.width - 0.5) * 2 * maxX);
      y.set(((e.clientY - r.top) / r.height - 0.5) * 2 * maxY);
    },
    onMouseLeave() {
      x.set(0);
      y.set(0);
    },
    springX,
    springY,
  };
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function Logo({ light = false }: { light?: boolean }) {
  const wordmarkFill = light ? "#FFFFFF" : "#13181B";
  return (
    <div className="flex items-center gap-3">
      <svg width="45" height="38" viewBox="0 0 45.19 37.567" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto shrink-0">
        <path d="M16.6705 18.8021L11.2377 28.2112L8.89606 32.2618L0 27.1241L4.81615 18.7835L0 10.443L8.89872 5.31585L11.134 9.17515L16.6678 18.7623C16.6674 18.7756 16.6683 18.789 16.6705 18.8021V18.8021Z" fill="url(#logoGradA)" />
        <path d="M45.19 18.7862C45.19 21.2527 44.7041 23.6951 43.7601 25.9739C42.8162 28.2527 41.4325 30.3232 39.6883 32.0672C37.944 33.8112 35.8733 35.1945 33.5944 36.1382C31.3155 37.0819 28.873 37.5674 26.4065 37.567H12.0537L13.5262 35.0261L17.4068 28.3015H26.4065C27.6696 28.3226 28.9243 28.0921 30.0974 27.6233C31.2705 27.1545 32.3386 26.4569 33.2393 25.5711C34.14 24.6853 34.8554 23.6291 35.3437 22.4639C35.8321 21.2988 36.0835 20.0482 36.0835 18.7849C36.0835 17.5215 35.8321 16.2709 35.3437 15.1058C34.8554 13.9406 34.14 12.8844 33.2393 11.9986C32.3386 11.1128 31.2705 10.4152 30.0974 9.94639C28.9243 9.47761 27.6696 9.24706 26.4065 9.26817H17.3031L13.5262 2.72703L11.9527 0H26.4065C28.8734 -2.46975e-08 31.3161 0.485938 33.5952 1.43006C35.8743 2.37419 37.9451 3.75801 39.6894 5.50251C41.4336 7.247 42.8172 9.31799 43.761 11.5972C44.7048 13.8764 45.1904 16.3193 45.19 18.7862V18.7862Z" fill="url(#logoGradB)" />
        <defs>
          <linearGradient id="logoGradA" x1="0" y1="18.7835" x2="16.6705" y2="18.7835" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFAF26" /><stop offset="1" stopColor="#F85D31" />
          </linearGradient>
          <linearGradient id="logoGradB" x1="11.9527" y1="18.7835" x2="45.19" y2="18.7835" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EB4E7" /><stop offset="1" stopColor="#0B75C2" />
          </linearGradient>
        </defs>
      </svg>
      <svg width="82" height="18" viewBox="0 0 82 18.1686" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden h-[18px] w-auto sm:block">
        <path d="M0 0H6.2417C11.4679 0 14.7742 2.91218 14.7742 7.55868C14.7742 12.2052 11.491 15.0292 6.2417 15.0292H0V0ZM6.2417 12.2423C9.59442 12.2423 11.6997 10.4152 11.6997 7.52158C11.6997 4.62795 9.57123 2.78233 6.2417 2.78233H2.88899V12.2423H6.2417Z" fill={wordmarkFill} />
        <path d="M18.5906 0H32.8593V2.78233H21.4842V5.88H31.6119V8.66233H21.4842V12.2005L32.8593 12.2237V15.0061H18.5906V0Z" fill={wordmarkFill} />
        <path d="M37.4828 0H51.7515V2.78233H40.3764V5.88H50.5041V8.66233H40.3764V12.2005L51.7515 12.2237V15.0061H37.4828V0Z" fill={wordmarkFill} />
        <path d="M54.8536 15.3863H65.0973V18.1686H54.8536V15.3863Z" fill={wordmarkFill} />
        <path d="M72.5864 7.41956L67.1099 0H70.9217L74.4135 4.73924L77.7198 0H81.5363L76.171 7.12278L82 15.0061H78.1836L74.3208 9.75672L70.6666 15.0061H66.8548L72.5864 7.41956Z" fill={wordmarkFill} />
      </svg>
    </div>
  );
}

function CardGlow({ src, className }: { src: string; className?: string }) {
  return <img src={src} alt="" aria-hidden className={cn("pointer-events-none absolute select-none", className)} />;
}

function AssetIcon({ asset }: { asset: AssetDef }) {
  if (asset.icon) {
    return <img src={asset.icon} alt="" className="h-6 w-6 shrink-0 rounded-[3px] object-cover" />;
  }
  return (
    <div
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
      style={{ backgroundColor: asset.color ?? "#888" }}
    >
      {asset.initial}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<keyof typeof TABS>("Giftcards");

  // Parallax hooks — one per interactive card
  const heroPhoneP = useParallax(18, 10);
  const dashPhoneP = useParallax(16, 8);
  const giftCardsP = useParallax(14, 8);
  const widgetP = useParallax(16, 10);

  const currentTab = TABS[activeTab];

  return (
    <div className="min-h-screen bg-white" style={{ zoom: 0.9 }}>
      {/* Header Nav */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 xl:px-16">
          <div className="flex h-20 items-center justify-between">
            <Logo />
            <nav className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="font-manrope text-sm font-bold text-[#13181B] transition-colors hover:text-[#0B75C2]">
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="hidden md:block">
              <Button className="h-auto rounded-lg bg-[#F28A0F] px-8 py-3 font-manrope text-base font-medium text-white hover:bg-[#d97a0d]">
                Sign Up
              </Button>
            </div>
            <button className="p-2 md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-100 py-4 md:hidden"
            >
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a key={link.label} href={link.href} className="font-manrope text-sm font-bold text-[#13181B]">{link.label}</a>
                ))}
                <Button className="h-auto w-full rounded-lg bg-[#F28A0F] px-8 py-3 font-manrope text-base font-medium text-white hover:bg-[#d97a0d]">
                  Sign Up
                </Button>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] space-y-[120px] px-4 py-[120px] sm:px-6 lg:space-y-[258px] lg:px-10 lg:py-[258px] xl:px-16">

        {/* ── Hero ──────────────────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_460px] lg:gap-8">

          {/* Left: hero card */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, ease: snap }}
            whileHover={{ scale: 1.01, transition: { duration: 0.25 } }}
            className="relative flex min-h-[440px] flex-col justify-between gap-10 overflow-hidden rounded-[24px] bg-[#042741] p-6 sm:p-10 lg:min-h-[560px] lg:p-14"
          >
            <CardGlow src={heroGlow} className="-left-10 -top-16 h-[115%] w-[115%] opacity-70 mix-blend-overlay" />
            <motion.div variants={stagger} initial="hidden" animate="visible" className="relative z-10 max-w-md space-y-6 text-white">
              <motion.h1 variants={staggerItem} className="font-sora text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl xl:text-[72px]">
                Sell crypto.<br />Get ₦2,000 free.
              </motion.h1>
              <motion.p variants={staggerItem} className="max-w-sm font-manrope text-base text-white/85">
                Join DeeX, make your first deposit of just $10, and we drop ₦2,000 straight into your wallet. Fast, secure, built for everyday trader.
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease: snap }}
              className="relative z-10 inline-flex w-fit items-center gap-3 rounded-md border border-white/70 p-2"
            >
              <img src={iconGooglePlayBadge} alt="Google Play" className="h-9 w-9 shrink-0" />
              <img src={iconAppleBadge} alt="App Store" className="h-9 w-9 shrink-0" />
              <div className="pr-2">
                <p className="font-manrope text-[10px] text-white/90">Click to download app.</p>
                <p className="max-w-[160px] font-manrope text-sm font-bold leading-snug text-white">Available on Appstore and Playstore.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: phone receipt with parallax */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: snap }}
            onMouseMove={heroPhoneP.onMouseMove}
            onMouseLeave={heroPhoneP.onMouseLeave}
            className="relative min-h-[440px] overflow-hidden rounded-[24px] bg-[#E5F4FF] lg:min-h-[560px]"
          >
            <CardGlow src={swoosh3} className="-left-[30%] -top-[15%] h-[145%] w-[165%] rotate-[-164deg] opacity-60" />
            {/* Parallax wrapper — phone image floats inside */}
            <motion.div className="absolute inset-0 z-10" style={{ x: heroPhoneP.springX, y: heroPhoneP.springY }}>
              <img
                src={phoneReceiptMockup}
                alt="DeeX receipt screen on a phone"
                className="float-phone-centered absolute left-1/2 top-0 h-full w-auto"
                style={{ animationDelay: "0.85s" }}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ── How it Works ──────────────────────────────────────────────────────── */}
        <section id="how-it-works" className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">

          {/* Download & sign up — parallax on dashboard phone */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={vp}
            transition={{ duration: 0.75, ease: snap }}
            whileHover={{ scale: 1.01, transition: { duration: 0.25 } }}
            onMouseMove={dashPhoneP.onMouseMove}
            onMouseLeave={dashPhoneP.onMouseLeave}
            className="relative min-h-[520px] overflow-hidden rounded-[24px] bg-[#FFF8F6] p-6 sm:p-8 lg:min-h-[640px] lg:p-10"
          >
            <CardGlow src={swoosh4} className="-left-[20%] -top-[90%] h-[260%] w-[220%] rotate-[108deg] opacity-60" />
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} className="relative z-10 max-w-xs space-y-3 lg:max-w-sm">
              <motion.h3 variants={staggerItem} className="font-sora font-bold leading-[1.11] text-[#F43500]" style={{ fontSize: "clamp(40px, 7.5vw, 64px)", letterSpacing: "-0.05em" }}>
                Download &amp; sign up
              </motion.h3>
              <motion.p variants={staggerItem} className="font-manrope text-base text-[#191919]">
                Get the DeeX app and create your account in under a minute.
              </motion.p>
            </motion.div>
            {/* Parallax wrapper for phone */}
            <motion.div className="absolute bottom-0 left-1/2 z-10 w-[78%] max-w-[480px] -translate-x-1/2" style={{ x: dashPhoneP.springX, y: dashPhoneP.springY }}>
              <img
                src={phoneDashboardMockup}
                alt="DeeX dashboard screen on a phone"
                className="float-phone-dash w-full"
                style={{ animationDelay: "0.85s" }}
              />
            </motion.div>
          </motion.div>

          {/* Right column */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Deposit just $10 */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={vp}
              transition={{ duration: 0.7, ease: snap }}
              whileHover={{ scale: 1.01, transition: { duration: 0.25 } }}
              className="relative min-h-[220px] overflow-hidden rounded-[24px] bg-[#FFFEFA] p-6 sm:p-8"
            >
              <CardGlow src={swoosh5} className="-right-1/4 -top-1/2 h-[220%] w-[220%] rotate-[-10deg] opacity-70" />
              <div className="relative z-10 flex h-full flex-col justify-between gap-6 sm:flex-row sm:items-center">
                <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} className="flex-1 space-y-2">
                  <motion.h3 variants={staggerItem} className="font-sora font-bold leading-[1.11] text-[#FFAA00]" style={{ fontSize: "clamp(32px, 5vw, 64px)", letterSpacing: "-0.05em" }}>
                    Deposit<br />just $10
                  </motion.h3>
                  <motion.p variants={staggerItem} className="font-manrope text-sm text-[#191919]">
                    Fund your wallet with $10 in USDT, USDC, SOL and more — quick and secure.
                  </motion.p>
                </motion.div>
                <img src={depositQr} alt="Deposit QR code" className="relative z-10 mx-auto h-auto w-full max-w-[160px] shrink-0" />
              </div>
            </motion.div>

            {/* Get ₦2,000 free */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={vp}
              transition={{ duration: 0.7, delay: 0.08, ease: snap }}
              whileHover={{ scale: 1.01, transition: { duration: 0.25 } }}
              className="relative min-h-[340px] overflow-hidden rounded-[24px] bg-[#F4FFF7] p-6 sm:p-8"
            >
              <CardGlow src={swoosh6} className="-left-1/4 -top-1/3 h-[200%] w-[200%] rotate-[22deg] opacity-70" />
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} className="relative z-10 max-w-sm space-y-1.5">
                <motion.h3 variants={staggerItem} className="font-sora font-bold leading-[1.11] text-[#009F23]" style={{ fontSize: "clamp(32px, 5vw, 64px)", letterSpacing: "-0.05em" }}>
                  Get ₦2,000<br />free
                </motion.h3>
                <motion.p variants={staggerItem} className="font-manrope text-sm text-[#191919]">
                  Your bonus lands in your wallet automatically. Yours to keep.
                </motion.p>
              </motion.div>
              <img src="/bank-account-snippet.png" alt="Bank account withdraw option" className="absolute bottom-0 right-0 z-10 w-[85%] max-w-[380px]" />
            </motion.div>
          </div>
        </section>

        {/* ── Gift Cards / Asset tabs ───────────────────────────────────────────── */}
        <section className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">

          {/* Left: asset promo image — changes with tab */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={vp}
            transition={{ duration: 0.75, ease: snap }}
            onMouseMove={giftCardsP.onMouseMove}
            onMouseLeave={giftCardsP.onMouseLeave}
            className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[24px] bg-[#FFEAEA] p-8 lg:min-h-[420px]"
          >
            <CardGlow src={swoosh305} className="left-1/2 top-1/2 h-[70%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-70" />
            <CardGlow src={swoosh307} className="-left-4 top-1/3 h-[90%] w-[160%] opacity-50" />
            <CardGlow src={swoosh308} className="-left-1/4 top-1/3 h-[110%] w-[160%] -rotate-[31deg] opacity-40" />
            <CardGlow src={ellipse4} className="left-1/2 top-6 h-[60%] w-[45%] -rotate-[54deg] opacity-60" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + "-img"}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
                style={{ x: giftCardsP.springX, y: giftCardsP.springY }}
              >
                <img
                  src={currentTab.image}
                  alt="Supported assets"
                  className="float-gift-cards w-full max-w-[520px]"
                  style={{ animationDelay: "0.8s" }}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right: tab nav + heading + asset list */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="flex flex-col justify-center gap-6 p-8 lg:gap-8 lg:p-14"
          >
            {/* Interactive tab pills */}
            <motion.div variants={staggerItem} className="flex flex-wrap gap-6">
              {TAB_ORDER.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "relative font-manrope text-sm transition-colors duration-200",
                    activeTab === tab ? "font-semibold text-[#279DF3]" : "text-[#869AA9] hover:text-[#273037]",
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[#279DF3]"
                      transition={{ duration: 0.25, ease: snap }}
                    />
                  )}
                </button>
              ))}
            </motion.div>

            {/* Heading — animates on tab change */}
            <AnimatePresence mode="wait">
              <motion.h2
                key={activeTab + "-heading"}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="font-sora font-bold leading-[1.11] text-[#273037]"
                style={{ fontSize: "clamp(40px, 7.5vw, 64px)", letterSpacing: "-0.05em" }}
              >
                {currentTab.heading}
              </motion.h2>
            </AnimatePresence>

            <motion.p variants={staggerItem} className="font-manrope text-base font-semibold text-[#191919]">
              {currentTab.subheading}
            </motion.p>

            {/* Asset list — re-staggers on tab switch */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + "-list"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-3"
              >
                {currentTab.assets.map((asset, i) => (
                  <motion.div
                    key={asset.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.055, ease: snap }}
                    className="flex items-center gap-3"
                  >
                    <AssetIcon asset={asset} />
                    <span className="font-manrope text-sm text-[#1B1A1A]">{asset.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </section>

        {/* ── Features + Buy Crypto widget ─────────────────────────────────────── */}
        <section className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">

          {/* Left: heading + feature list */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="flex flex-col justify-center gap-6 p-8 lg:gap-8 lg:p-14"
          >
            <motion.h2 variants={staggerItem} className="font-sora font-bold leading-[1.11] text-[#273037]" style={{ fontSize: "clamp(40px, 7.5vw, 64px)", letterSpacing: "-0.05em" }}>
              Fast Payout, Top security and Best Rates
            </motion.h2>
            <ul className="space-y-4">
              {features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.45, delay: i * 0.07 + 0.15, ease: snap }}
                  className="flex items-center gap-4"
                >
                  <img src={checkIcon} alt="" className="h-4 w-4 shrink-0" />
                  <span className="font-manrope text-base text-[#001124]">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: buy crypto widget with parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={vp}
            transition={{ duration: 0.75, ease: snap }}
            onMouseMove={widgetP.onMouseMove}
            onMouseLeave={widgetP.onMouseLeave}
            className="relative flex min-h-[440px] items-center justify-center overflow-hidden rounded-[24px] bg-[#D0EBFF] p-6 sm:p-8 lg:min-h-[560px]"
          >
            <CardGlow src={swoosh306} className="-right-1/3 -top-1/3 h-[170%] w-[170%] opacity-60" />
            <CardGlow src={swoosh309} className="-left-1/4 top-1/2 h-[130%] w-[170%] opacity-50" />
            <CardGlow src={swoosh310} className="-right-1/4 top-1/3 h-[110%] w-[160%] rotate-[31deg] opacity-40" />
            <CardGlow src={ellipse6} className="left-1/2 top-8 h-[55%] w-[40%] -rotate-[54deg] opacity-60" />
            <motion.img
              src={buyCryptoWidget}
              alt="Buy Crypto interface"
              className="float-y relative z-10 w-full max-w-[380px] rounded-xl shadow-2xl"
              style={{ x: widgetP.springX, y: widgetP.springY, animationDelay: "0.8s" } as React.CSSProperties}
            />
          </motion.div>
        </section>

        {/* ── CTA Banner ────────────────────────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.75, ease: snap }}
          className="relative overflow-hidden rounded-[24px] bg-[#001124] px-6 py-10 sm:px-10 lg:px-14 lg:py-14"
        >
          <CardGlow src={swoosh306} className="-right-1/4 -top-1/2 h-[240%] w-[70%] opacity-40" />
          <CardGlow src={swoosh309} className="right-1/4 -top-1/2 h-[180%] w-[80%] opacity-30" />
          <CardGlow src={ellipse6} className="right-10 top-0 h-[70%] w-[20%] -rotate-[54deg] opacity-40" />

          {/* Portrait man — absolute center-right, bottom flush */}
          <motion.img
            src={portraitMan}
            alt=""
            className="pointer-events-none absolute bottom-0 hidden w-auto select-none object-contain object-bottom lg:block"
            style={{ left: "50%", height: "108%" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.65, delay: 0.3, ease: snap }}
          />

          {/* Text (left) + Button (far right) */}
          <div className="relative z-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} className="max-w-md space-y-3">
              <motion.h2
                variants={staggerItem}
                className="whitespace-nowrap font-sora font-bold text-white"
                style={{ fontSize: "clamp(28px, 3.2vw, 48px)", letterSpacing: "-0.04em", lineHeight: 1.3 }}
              >
                Your ₦2,000 is waiting.
              </motion.h2>
              <motion.p variants={staggerItem} className="font-manrope text-base text-[#EAE7E7]" style={{ lineHeight: 1.6 }}>
                Sign up and make one deposit of $10 to unlock your bonus.
              </motion.p>
              <motion.div variants={staggerItem} className="flex items-center gap-2">
                <img src={checkIcon} alt="" className="h-4 w-4" />
                <p className="font-manrope text-base text-[#279DF3]">
                  <span className="font-bold">Promo code </span>
                  <span className="font-extrabold">TRADEOFF2</span>
                  <span className="font-bold"> applied</span>
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={vp}
              transition={{ duration: 0.5, delay: 0.45, ease: snap }}
            >
              <Button className="h-auto shrink-0 gap-3 rounded-lg bg-[#0B75C2] font-manrope text-lg font-bold text-[#F7F8F9] hover:bg-[#095a96]" style={{ padding: "15px 38px" }}>
                Claim my Cash Now
                <img src={iconArrowRight4} alt="" className="h-6 w-6" />
              </Button>
            </motion.div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default LandingPage;

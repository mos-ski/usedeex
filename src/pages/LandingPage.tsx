import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import deexLogo from "@/assets/landing-v2/deex-logo.svg";
import deexLogoLight from "@/assets/landing-v2/deex-logo-light.svg";
import topbarArrow from "@/assets/landing-v2/topbar-arrow.svg";

// Flattened, pixel-accurate exports straight from the Figma file (New-DeeX) —
// each already bakes in its rounded card, background tint, and decorative swoosh.
import heroVisual from "@/assets/landing-v2/hero-visual.png";
import qrCode from "@/assets/landing-v2/qr-code.png";
import swapVisual from "@/assets/landing-v2/swap-visual.png";
import storeVisual from "@/assets/landing-v2/store-visual.png";
import sendVisual from "@/assets/landing-v2/send-visual.png";
import receiveVisual from "@/assets/landing-v2/receive-visual.png";
import billsVisual from "@/assets/landing-v2/bills-visual.png";
import merchantVisual from "@/assets/landing-v2/merchant-visual.png";

import arrowRight from "@/assets/landing-v2/arrow-right.svg";
import appleIcon from "@/assets/landing-v2/apple-icon.svg";
import googlePlayIcon from "@/assets/landing-v2/google-play-icon.svg";

import billsProvider1 from "@/assets/landing-v2/bills-provider-1.png";
import billsProvider2 from "@/assets/landing-v2/bills-provider-2.png";
import billsProvider3 from "@/assets/landing-v2/bills-provider-3.png";

import giftcardVisual from "@/assets/landing-v2/giftcard-visual.png";
import giftcardProvider1 from "@/assets/landing-v2/giftcard-provider-1.png";
import giftcardProvider2 from "@/assets/landing-v2/giftcard-provider-2.png";
import giftcardProvider3 from "@/assets/landing-v2/giftcard-provider-3.png";

import footerAppleIcon from "@/assets/landing-v2/footer-apple-icon.svg";
import footerGooglePlayIcon from "@/assets/landing-v2/footer-google-play-icon.svg";
import socialInstagram from "@/assets/landing-v2/social-instagram.svg";
import socialFacebook from "@/assets/landing-v2/social-facebook.svg";
import socialLinkedin from "@/assets/landing-v2/social-linkedin.svg";
import socialTwitter from "@/assets/landing-v2/social-twitter.svg";

const navLinks = [
  { label: "Merchant", href: "#merchant" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "FAQ", href: "/support" },
  { label: "Help Center", href: "/support" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}

// True only on devices with a real mouse — keeps the hover bounce off touchscreens.
function useHoverCapable() {
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(mq.matches);
    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return canHover;
}

function DancingImage({
  src,
  alt,
  className,
  delay = 0,
  duration = 4.5,
  travel = 10,
  rotate = 2,
  dance = true,
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  duration?: number;
  travel?: number;
  rotate?: number;
  dance?: boolean;
}) {
  const canHover = useHoverCapable();
  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      animate={dance ? { y: [0, -travel, 0], rotate: [0, -rotate, 0, rotate, 0] } : undefined}
      transition={dance ? { duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay } : undefined}
      whileHover={
        canHover
          ? { scale: 1.03, y: -4, transition: { type: "spring", stiffness: 320, damping: 14 } }
          : undefined
      }
    />
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center shrink-0">
      <img src={light ? deexLogoLight : deexLogo} alt="Deex" className="h-7 w-auto" />
    </Link>
  );
}

function EyebrowHeadline({
  eyebrow,
  headline,
  body,
  eyebrowClassName,
  headlineClassName,
  bodyClassName,
  cta,
}: {
  eyebrow: string;
  headline: string;
  body: string;
  eyebrowClassName?: string;
  headlineClassName?: string;
  bodyClassName?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col items-start gap-6 lg:gap-8">
      <p className={cn("font-roboto font-medium text-2xl lg:text-4xl text-brand-blue500", eyebrowClassName)}>
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-gasoek uppercase text-brand-ink text-4xl sm:text-5xl lg:text-6xl leading-[1.05]",
          headlineClassName
        )}
      >
        {headline}
      </h2>
      <p className={cn("font-roboto text-lg lg:text-xl text-[#5c5c5c] leading-relaxed max-w-xl", bodyClassName)}>
        {body}
      </p>
      {cta && (
        <Link
          to={cta.href}
          className="inline-flex items-center gap-2 font-manrope font-semibold text-brand-blue400 hover:text-brand-blue500 transition-colors"
        >
          {cta.label}
          <img src={arrowRight} alt="" className="h-6 w-6" />
        </Link>
      )}
    </div>
  );
}

const LandingPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-roboto">
      {/* Marketing banner */}
      <div className="bg-brand-lime overflow-hidden">
        {/* Mobile: horizontal marquee — only the text scrolls, icon stays fixed */}
        <Link to="/ad-2000-offer" className="sm:hidden flex items-center gap-3 py-3 pl-6 pr-4">
          <div className="flex-1 min-w-0 overflow-hidden">
            <motion.div
              className="flex items-center w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              {[0, 1].map((i) => (
                <p key={i} className="font-roboto font-medium text-sm text-[#001124] whitespace-nowrap pr-8">
                  Sign up and make one deposit of $10 to unlock your bonus.
                </p>
              ))}
            </motion.div>
          </div>
          <img src={topbarArrow} alt="" className="h-5 w-5 shrink-0" />
        </Link>
        {/* Tablet/desktop: static single line, fits without scrolling */}
        <Link
          to="/ad-2000-offer"
          className="hidden sm:flex items-center justify-center gap-3 px-6 py-3 text-center hover:brightness-95 transition-[filter]"
        >
          <p className="font-roboto font-medium text-sm text-[#001124]">
            Sign up and make one deposit of $10 to unlock your bonus.
          </p>
          <img src={topbarArrow} alt="" className="h-5 w-5 shrink-0" />
        </Link>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-brand-grey100">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between h-16 px-6 lg:px-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-6 font-manrope font-bold text-sm text-brand-ink">
            {navLinks.map((link) =>
              link.href.startsWith("#") ? (
                <a key={link.label} href={link.href} className="hover:text-brand-blue500 transition-colors">
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} to={link.href} className="hover:text-brand-blue500 transition-colors">
                  {link.label}
                </Link>
              )
            )}
            <Link to="/login" className="hover:text-brand-blue500 transition-colors">
              Login
            </Link>
            <Button asChild className="rounded-full bg-brand-navy hover:bg-brand-navy/90">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </nav>
          <button
            className="md:hidden p-2 text-brand-ink"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="md:hidden flex flex-col gap-1 px-6 pb-6 font-manrope font-semibold text-brand-ink border-t border-brand-grey100">
            {navLinks.map((link) =>
              link.href.startsWith("#") ? (
                <a key={link.label} href={link.href} className="py-3" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} to={link.href} className="py-3" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              )
            )}
            <Link to="/login" className="py-3">
              Login
            </Link>
            <Button asChild className="mt-2 rounded-full bg-brand-navy hover:bg-brand-navy/90 w-full">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section className="bg-brand-navy" id="how-it-works">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal className="flex flex-col items-start gap-8">
            <h1 className="font-gasoek uppercase text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
              <span className="inline-block bg-brand-amberHighlight px-2 -ml-2">Everything</span>
              <br />
              <span className="inline-block bg-brand-amberHighlight px-2 -ml-2 mt-1">a bank</span>
              <br />
              should be.
            </h1>
            <p className="font-roboto text-lg lg:text-xl text-white/90 leading-relaxed max-w-md">
              Deex is the only Crypto Bank you need. Trade, store, swap, and use your money.
              Always on, always yours.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-white text-brand-ink hover:bg-white/90 px-8 py-6 text-base font-bold">
                <Link to="/signup">Create a Free Account</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-brand-amber text-brand-ink hover:bg-brand-amber/90 px-8 py-6 text-base font-bold gap-2"
              >
                <a href="#merchant">
                  I am a Merchant
                  <img src={arrowRight} alt="" className="h-6 w-6" />
                </a>
              </Button>
            </div>
            <div className="flex gap-4">
              <a href="#" className="flex items-center gap-2 border border-brand-sky/40 rounded-md px-3 py-2">
                <img src={appleIcon} alt="" className="h-8 w-8" />
                <span className="flex flex-col text-brand-sky leading-tight">
                  <span className="text-[10px] font-manrope font-medium">Get DeeX</span>
                  <span className="text-sm font-manrope font-bold">App Store</span>
                </span>
              </a>
              <a href="#" className="flex items-center gap-2 border border-brand-sky/40 rounded-md px-3 py-2">
                <img src={googlePlayIcon} alt="" className="h-8 w-8" />
                <span className="flex flex-col text-brand-sky leading-tight">
                  <span className="text-[10px] font-manrope font-medium">Get DeeX</span>
                  <span className="text-sm font-manrope font-bold">Play Store</span>
                </span>
              </a>
            </div>
          </Reveal>
          <Reveal className="relative mx-auto w-full max-w-md">
            <DancingImage
              src={heroVisual}
              alt="A Deex customer, with a QR code to download the app"
              className="w-full h-auto"
              duration={5.5}
              travel={12}
              rotate={1.5}
            />
          </Reveal>
        </div>
      </section>

      {/* Swap & Exchange */}
      <section className="bg-white">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8 py-16 lg:py-28 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <EyebrowHeadline
              eyebrow="SWAP & EXCHANGE"
              headline="Move between assets freely"
              body="USDT, USDC, SOL and more. All your assets in one place, all ready to move. Swap between them or exchange them for cash freely whenever you want."
            />
          </Reveal>
          <Reveal>
            <Link to="/swap-crypto" className="block">
              <DancingImage
                src={swapVisual}
                alt="Fetch live rates and swap Bitcoin on Deex"
                className="w-full h-auto"
                dance={false}
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Store & Hold */}
      <section className="bg-white">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8 py-16 lg:py-28 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal className="order-2 lg:order-1">
            <DancingImage
              src={storeVisual}
              alt="Deex wallet dashboard"
              className="w-full h-auto"
              dance={false}
            />
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <EyebrowHeadline
              eyebrow="STORE & HOLD"
              headline="Hold it safe. Reach it fast."
              body="Store your assets with confidence and access them without asking. Deex keeps them protected for the long run and available the second you need them. Security you feel, freedom you use."
            />
          </Reveal>
        </div>
      </section>

      {/* Send to Anyone */}
      <section className="bg-white">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8 py-16 lg:py-28 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <EyebrowHeadline
              eyebrow="SEND TO ANYONE"
              headline="Any wallet. Any person. One tap."
              body="Move your assets out to any external wallet or straight to another person on Deex. Simple to send, safe to hold, always in your hands."
              cta={{ label: "Send Money", href: "/send-money" }}
            />
          </Reveal>
          <Reveal>
            <DancingImage
              src={sendVisual}
              alt="Sending 1,000 USD in Bitcoin on Deex"
              className="w-full h-auto"
              dance={false}
            />
          </Reveal>
        </div>
      </section>

      {/* Receive & Cash Out */}
      <section className="bg-white">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8 py-16 lg:py-28 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal className="order-2 lg:order-1">
            <DancingImage
              src={receiveVisual}
              alt="Deex receipt confirmation"
              className="w-full h-auto"
              dance={false}
            />
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <EyebrowHeadline
              eyebrow="RECEIVE & CASH OUT"
              headline="From any wallet to your bank account."
              body="Have assets sitting in an outside wallet? Send them to Deex and get paid in cash, straight to the bank account you've set up."
              cta={{ label: "Deposit Now", href: "/deposit" }}
            />
          </Reveal>
        </div>
      </section>

      {/* Bills */}
      <section className="bg-brand-sky">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8 pt-16 lg:pt-28">
          <Reveal className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            <h2 className="font-gasoek uppercase text-brand-ink text-4xl sm:text-5xl lg:text-6xl leading-[1.05] flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1">
              <span>Your</span>
              <DancingImage
                src={billsProvider1}
                alt=""
                className="h-8 w-8 sm:h-10 sm:w-10 lg:h-14 lg:w-14 shadow-md rounded-full"
                delay={0}
                duration={3.2}
                travel={5}
                rotate={6}
              />
              <span>wallet</span>
              <span>balance</span>
              <DancingImage
                src={billsProvider2}
                alt=""
                className="h-8 w-8 sm:h-10 sm:w-10 lg:h-14 lg:w-14 shadow-md rounded-full"
                delay={0.3}
                duration={3.2}
                travel={5}
                rotate={6}
              />
              <span>pays</span>
              <DancingImage
                src={billsProvider3}
                alt=""
                className="h-8 w-8 sm:h-10 sm:w-10 lg:h-14 lg:w-14 shadow-md rounded-full"
                delay={0.6}
                duration={3.2}
                travel={5}
                rotate={6}
              />
              <span>the bills.</span>
            </h2>
            <p className="font-roboto text-lg lg:text-xl text-brand-ink leading-relaxed">
              Turn what you hold into what you need. Top up your phone, keep the lights on, fund
              your betting account, all from the same account that holds your money. One place,
              every payment.
            </p>
            <Link
              to="/bills/airtime"
              className="inline-flex items-center gap-2 font-manrope font-semibold text-brand-blue400 hover:text-brand-blue500 transition-colors"
            >
              Buy Airtime and Data
              <img src={arrowRight} alt="" className="h-6 w-6" />
            </Link>
          </Reveal>
          <Reveal className="relative max-w-2xl mx-auto mt-16 block">
            <DancingImage
              src={billsVisual}
              alt="Deex bill payment history"
              className="w-full h-auto block"
              dance={false}
            />
          </Reveal>
        </div>
      </section>

      {/* Gift Cards */}
      <section className="bg-brand-blush">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8 pt-16 lg:pt-28">
          <Reveal className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            <h2 className="font-gasoek uppercase text-brand-ink text-4xl sm:text-5xl lg:text-6xl leading-[1.05] flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1">
              <span>Turn gift cards</span>
              <DancingImage
                src={giftcardProvider1}
                alt=""
                className="h-8 w-8 sm:h-10 sm:w-10 lg:h-14 lg:w-14 shadow-md rounded-full"
                delay={0.15}
                duration={3.2}
                travel={5}
                rotate={6}
              />
              <span>into real</span>
              <DancingImage
                src={giftcardProvider2}
                alt=""
                className="h-8 w-8 sm:h-10 sm:w-10 lg:h-14 lg:w-14 shadow-md rounded-full"
                delay={0.45}
                duration={3.2}
                travel={5}
                rotate={6}
              />
              <DancingImage
                src={giftcardProvider3}
                alt=""
                className="h-8 w-8 sm:h-10 sm:w-10 lg:h-14 lg:w-14 shadow-md rounded-full"
                delay={0.75}
                duration={3.2}
                travel={5}
                rotate={6}
              />
              <span>money.</span>
            </h2>
            <p className="font-roboto text-lg lg:text-xl text-brand-ink leading-relaxed">
              Got a card sitting unused? Want one in seconds? Deex handles both buy and sell any
              gift card, any brand, straight from your account. Cards in, value out, no middleman
              in between.
            </p>
            <Link
              to="/giftcards"
              className="inline-flex items-center gap-2 font-manrope font-semibold text-brand-blue400 hover:text-brand-blue500 transition-colors"
            >
              Trade your Gift Cards
              <img src={arrowRight} alt="" className="h-6 w-6" />
            </Link>
          </Reveal>
          <Reveal className="relative mt-16 block -mx-6 sm:mx-auto max-w-none sm:max-w-3xl lg:max-w-[1344px]">
            <DancingImage
              src={giftcardVisual}
              alt="Google Play and iTunes gift cards"
              className="w-full h-auto block"
              dance={false}
            />
          </Reveal>
        </div>
      </section>

      {/* Merchants */}
      <section className="bg-white" id="merchant">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8 pt-16 lg:pt-28">
          <Reveal className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
            <h2 className="font-gasoek uppercase text-brand-ink text-4xl sm:text-5xl lg:text-6xl leading-[1.05] flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1">
              <span>Not just</span>
              <DancingImage
                src={qrCode}
                alt=""
                className="h-8 w-8 sm:h-10 sm:w-10 lg:h-14 lg:w-14 shadow-md rounded-lg"
                delay={0.2}
                duration={3.2}
                travel={5}
                rotate={5}
              />
              <span>your money. Your business too.</span>
            </h2>
            <p className="font-roboto text-lg lg:text-xl text-brand-ink leading-relaxed">
              Deex isn't only for traders. Sign up, complete your KYC, and turn your account into a
              way to get paid. Create a payment link, send it to a customer, or print your QR code
              and watch the money land in your wallet or straight to your bank.
            </p>
            <Button asChild size="lg" className="rounded-full bg-brand-navy hover:bg-brand-navy/90 px-8 py-6 text-base font-bold">
              <Link to="/signup">Create Merchant Account</Link>
            </Button>
          </Reveal>
          <Reveal className="relative mt-16 block">
            <DancingImage
              src={merchantVisual}
              alt="Deex merchant checkout"
              className="w-full h-40 sm:h-56 lg:h-auto rounded-t-[32px] lg:rounded-t-[48px] object-cover block"
              dance={false}
            />
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-nearBlack text-white">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="flex flex-col gap-4">
            <Logo light />
            <p className="text-brand-grey600 text-sm">Deexoptions © {new Date().getFullYear()}</p>
            <div className="flex gap-3">
              <a href="#" className="flex items-center gap-2 border border-brand-sky/30 rounded-md px-2.5 py-1.5">
                <img src={footerAppleIcon} alt="" className="h-7 w-7" />
                <span className="flex flex-col text-brand-sky leading-tight">
                  <span className="text-[9px] font-manrope font-medium">Get DeeX</span>
                  <span className="text-xs font-manrope font-bold">App Store</span>
                </span>
              </a>
              <a href="#" className="flex items-center gap-2 border border-brand-sky/30 rounded-md px-2.5 py-1.5">
                <img src={footerGooglePlayIcon} alt="" className="h-7 w-7" />
                <span className="flex flex-col text-brand-sky leading-tight">
                  <span className="text-[9px] font-manrope font-medium">Get DeeX</span>
                  <span className="text-xs font-manrope font-bold">Play Store</span>
                </span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <p className="font-semibold text-white">COMPANY</p>
              <div className="flex flex-col gap-2 text-brand-grey400 text-sm">
                <Link to="/about">About</Link>
                <a href="#merchant">Merchant</a>
                <a href="#">Blog</a>
                <Link to="/support">Contact Us</Link>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-semibold text-white">REWARDS</p>
              <div className="flex flex-col gap-2 text-brand-grey400 text-sm">
                <Link to="/trade-streak">Football Fantasy</Link>
                <Link to="/invite-earn">Refer and Earn</Link>
                <Link to="/rewards">Deex Tasks</Link>
                <a href="#">Become our Influencer</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <p className="font-semibold text-white">PRODUCTS</p>
              <div className="flex flex-col gap-2 text-brand-grey400 text-sm">
                <Link to="/sell-crypto">Buy and Sell</Link>
                <Link to="/swap-crypto">Swap</Link>
                <Link to="/bills/airtime">Utility and Bills</Link>
                <Link to="/giftcards">Giftcards</Link>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-semibold text-white">NEED HELP?</p>
              <div className="flex flex-col gap-2 text-brand-grey500 text-sm">
                <Link to="/support">FAQ</Link>
                <a href="mailto:support@deexoptions.com">support@deexoptions.com</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <p className="font-semibold text-white">LEGAL</p>
              <div className="flex flex-col gap-2 text-brand-grey500 text-sm">
                <a href="#">Terms &amp; Conditions</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Compliance</a>
                <a href="#">AML requirements</a>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-semibold text-white">SOCIALS</p>
              <div className="flex gap-4">
                <a href="#"><img src={socialInstagram} alt="Instagram" className="h-6 w-6" /></a>
                <a href="#"><img src={socialFacebook} alt="Facebook" className="h-6 w-6" /></a>
                <a href="#"><img src={socialLinkedin} alt="LinkedIn" className="h-6 w-6" /></a>
                <a href="#"><img src={socialTwitter} alt="Twitter" className="h-6 w-6" /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

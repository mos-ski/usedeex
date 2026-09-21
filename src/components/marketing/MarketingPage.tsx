import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MarketingShell } from "./MarketingShell";
import { PhoneMockup } from "./PhoneMockup";
import { cn } from "@/lib/utils";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

const Reveal = ({ children, className }: { children: React.ReactNode; className?: string }) => (
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

export type MarketingFeature = { title: string; body: string };

export type MarketingContent = {
  eyebrow: string;
  headline: string;
  body: string;
  /** Screenshot shown in the phone, or omitted for pages that are all copy. */
  screen?: string;
  screenAlt?: string;
  features: MarketingFeature[];
  /** Closing band; defaults to the sign-up pitch. */
  cta?: { headline: string; body: string; label: string; href: string };
};

const DEFAULT_CTA = {
  headline: "Ready when you are",
  body: "Create a DeeX account in a couple of minutes and trade at rates you can see up front.",
  label: "Create an account",
  href: "/signup",
};

/** The shape every footer page takes: hero, what it does, a way in. */
export const MarketingPage = ({ content }: { content: MarketingContent }) => {
  const cta = content.cta ?? DEFAULT_CTA;

  return (
    <MarketingShell>
      {/* Hero */}
      <section className="border-b border-brand-grey100 bg-brand-grey50">
        <div
          className={cn(
            "mx-auto grid max-w-[1360px] items-center gap-12 px-6 py-16 lg:px-8 lg:py-24",
            content.screen && "lg:grid-cols-2",
          )}
        >
          <Reveal className="flex flex-col items-start gap-6">
            <p className="font-roboto text-xl font-medium text-brand-blue500 lg:text-2xl">{content.eyebrow}</p>
            <h1 className="font-gasoek text-4xl uppercase leading-[1.05] text-brand-ink sm:text-5xl lg:text-6xl">
              {content.headline}
            </h1>
            <p className="max-w-xl font-roboto text-lg leading-relaxed text-[#5c5c5c]">{content.body}</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="rounded-full bg-brand-navy px-6 hover:bg-brand-navy/90">
                <Link to="/signup">Get started</Link>
              </Button>
              <Link
                to="/faq"
                className="inline-flex h-10 items-center rounded-full border border-brand-grey300 bg-white px-6 font-manrope text-sm font-semibold text-brand-ink transition-colors hover:border-brand-blue500 hover:text-brand-blue500"
              >
                See how it works
              </Link>
            </div>
          </Reveal>

          {content.screen && (
            <Reveal>
              <PhoneMockup src={content.screen} alt={content.screenAlt ?? `${content.headline} on DeeX`} />
            </Reveal>
          )}
        </div>
      </section>

      {/* What it does */}
      <section className="mx-auto max-w-[1360px] px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-8 md:grid-cols-3">
          {content.features.map((feature) => (
            <Reveal key={feature.title} className="flex flex-col gap-3 rounded-2xl border border-brand-grey100 p-6">
              <h2 className="font-manrope text-lg font-bold text-brand-ink">{feature.title}</h2>
              <p className="font-roboto leading-relaxed text-[#5c5c5c]">{feature.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing band */}
      <section className="bg-brand-deepNavy">
        <div className="mx-auto flex max-w-[1360px] flex-col items-start gap-6 px-6 py-16 lg:px-8 lg:py-20">
          <h2 className="font-gasoek text-3xl uppercase leading-[1.05] text-white sm:text-4xl lg:text-5xl">
            {cta.headline}
          </h2>
          <p className="max-w-xl font-roboto text-lg leading-relaxed text-brand-grey400">{cta.body}</p>
          <Button asChild className="rounded-full bg-brand-blue500 px-6 hover:bg-brand-blue400">
            <Link to={cta.href}>{cta.label}</Link>
          </Button>
        </div>
      </section>
    </MarketingShell>
  );
};

export default MarketingPage;

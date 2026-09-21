import { Link, Navigate, useParams } from "react-router-dom";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { legalDocuments } from "@/data/legalDocuments";
import { cn } from "@/lib/utils";

/**
 * The policies as a website page. The app shows the same documents inside its
 * own shell at /legal/:slug; this is the version a visitor reaches from the
 * footer, without being dropped into the app.
 */
const MarketingPolicy = () => {
  const { slug } = useParams<{ slug: string }>();
  const document = legalDocuments.find((entry) => entry.slug === slug);

  if (!document) return <Navigate to="/" replace />;

  return (
    <MarketingShell>
      <section className="border-b border-brand-grey100 bg-brand-grey50">
        <div className="mx-auto max-w-[1360px] px-6 py-16 lg:px-8 lg:py-20">
          <p className="font-roboto text-xl font-medium text-brand-blue500">Legal</p>
          <h1 className="pt-4 font-gasoek text-4xl uppercase leading-[1.05] text-brand-ink sm:text-5xl">
            {document.title}
          </h1>
          <p className="pt-4 font-roboto text-[#5c5c5c]">{document.updated}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1360px] gap-12 px-6 py-16 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8 lg:py-20">
        <nav aria-label="Policies" className="flex flex-col gap-1">
          {legalDocuments.map((entry) => (
            <Link
              key={entry.slug}
              to={`/policies/${entry.slug}`}
              className={cn(
                "rounded-lg px-3 py-2 font-manrope text-sm transition-colors",
                entry.slug === document.slug
                  ? "bg-brand-tint font-bold text-brand-blue500"
                  : "text-[#5c5c5c] hover:bg-brand-grey50",
              )}
            >
              {entry.title}
            </Link>
          ))}
        </nav>

        <article className="flex max-w-2xl flex-col gap-8">
          {document.sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-2">
              <h2 className="font-manrope text-lg font-bold text-brand-ink">{section.heading}</h2>
              <p className="font-roboto leading-relaxed text-[#5c5c5c]">{section.body}</p>
            </section>
          ))}
        </article>
      </div>
    </MarketingShell>
  );
};

export default MarketingPolicy;

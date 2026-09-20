import { Navigate, useNavigate, useParams } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, SectionCard } from "@/components/dashboard/AppShell";
import { legalDocuments } from "@/data/legalDocuments";

/** Renders one policy from About DeeX. */
const LegalDocument = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const doc = legalDocuments.find((d) => d.slug === slug);

  if (!doc) return <Navigate to="/about" replace />;

  return (
    <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title={doc.title} onBack={() => navigate(-1)} />

        <SectionCard className="px-4 py-5">
          <p className="text-xs leading-[1.3] text-brand-grey400">{doc.updated}</p>
          <div className="flex flex-col gap-5 pt-4">
            {doc.sections.map((section) => (
              <div key={section.heading} className="flex flex-col gap-1.5">
                <h2 className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">{section.heading}</h2>
                <p className="text-sm leading-[1.6] text-brand-bodyText">{section.body}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </PageTransition>
    </AppShell>
  );
};

export default LegalDocument;

import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, SectionCard } from "@/components/dashboard/AppShell";
import { SettingsRow } from "@/components/dashboard/SettingsList";
import { BookOpenIcon, LockIcon, MessageQuestionIcon, PhoneCallIcon, ReceiptIcon } from "@/components/dashboard/icons";
import { legalDocuments } from "@/data/legalDocuments";

import logoMark from "@/assets/landing/logo-mark.svg";

const APP_VERSION = "2.4.1";
const BUILD = "1842";

const policyIcons = [ReceiptIcon, LockIcon, BookOpenIcon];

const AboutDeeX = () => {
  const navigate = useNavigate();

  return (
    <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title="About DeeX" onBack={() => navigate(-1)} />

        <SectionCard className="flex flex-col items-center px-4 py-8 text-center">
          <img src={logoMark} alt="DeeX" className="h-16 w-auto" />
          <p className="pt-4 text-[17px] font-bold leading-[1.4] text-brand-grey900">DeeX</p>
          <p className="text-xs leading-[1.3] text-brand-bodyText">
            Version {APP_VERSION} • Build #{BUILD}
          </p>
          <p className="max-w-[280px] pt-4 text-sm leading-[1.6] text-brand-bodyText">
            DeeX is a fast, secure platform for trading crypto, selling gift cards, paying bills, and sending money —
            all in one app.
          </p>
        </SectionCard>

        <SectionCard className="mt-3 px-4 py-0">
          {legalDocuments.map((doc, index) => (
            <SettingsRow
              key={doc.slug}
              title={doc.title}
              Icon={policyIcons[index]}
              className={index === legalDocuments.length - 1 ? "border-b-0" : undefined}
              onClick={() => navigate(`/legal/${doc.slug}`)}
            />
          ))}
        </SectionCard>

        <SectionCard className="mt-3 px-4 py-0">
          <SettingsRow title="Contact support" detail="Chat with the DeeX team" Icon={MessageQuestionIcon} onClick={() => navigate("/support")} />
          <SettingsRow title="Call us" detail="0700 000 3339" Icon={PhoneCallIcon} className="border-b-0" onClick={() => { window.location.href = "tel:07000003339"; }} />
        </SectionCard>

        <p className="px-4 pt-6 text-center text-xs leading-[1.6] text-brand-grey400">
          © 2026 DeeX Technologies Ltd. All rights reserved.
        </p>
      </PageTransition>
    </AppShell>
  );
};

export default AboutDeeX;

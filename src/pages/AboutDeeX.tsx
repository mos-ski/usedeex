import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, SectionCard } from "@/components/dashboard/AppShell";
import { SettingsRow } from "@/components/dashboard/SettingsList";
import { useState } from "react";
import { toast } from "sonner";
import { PrimaryButton } from "@/components/dashboard/AppShell";
import {
  BookOpenIcon,
  ClipboardListIcon,
  EditPencilIcon,
  LockIcon,
  MessageQuestionIcon,
  PhoneCallIcon,
  ReceiptIcon,
  StarIcon,
} from "@/components/dashboard/icons";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { legalDocuments } from "@/data/legalDocuments";

import logoMark from "@/assets/landing/logo-mark.svg";

const APP_VERSION = "2.4.1";
const BUILD = "1842";

const policyIcons = [ReceiptIcon, LockIcon, BookOpenIcon];

/** Where the store listing lives once the apps are published. */
const STORE_URL = "";

const AboutDeeX = () => {
  const navigate = useNavigate();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const rateUs = () => {
    if (!STORE_URL) {
      toast("Rating opens once DeeX is live on the stores");
      return;
    }
    window.open(STORE_URL, "_blank", "noopener,noreferrer");
  };

  const sendFeedback = () => {
    setFeedbackOpen(false);
    setFeedback("");
    toast.success("Thanks — your feedback is with the team");
  };

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
          <SettingsRow
            title="Take the survey"
            detail="A few questions on how you use DeeX"
            Icon={ClipboardListIcon}
            onClick={() => navigate("/survey")}
          />
          <SettingsRow title="Rate us" detail="Leave a review on the app store" Icon={StarIcon} onClick={rateUs} />
          <SettingsRow
            title="Give feedback"
            detail="Tell us what to fix or build"
            Icon={EditPencilIcon}
            className="border-b-0"
            onClick={() => setFeedbackOpen(true)}
          />
        </SectionCard>

        <SectionCard className="mt-3 px-4 py-0">
          <SettingsRow title="Contact support" detail="Chat with the DeeX team" Icon={MessageQuestionIcon} onClick={() => navigate("/support")} />
          <SettingsRow title="Call us" detail="0700 000 3339" Icon={PhoneCallIcon} className="border-b-0" onClick={() => { window.location.href = "tel:07000003339"; }} />
        </SectionCard>

        <p className="px-4 pt-6 text-center text-xs leading-[1.6] text-brand-grey400">
          © 2026 DeeX Technologies Ltd. All rights reserved.
        </p>
      </PageTransition>

      <Drawer open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DrawerContent className="border-brand-grey100 bg-brand-surface font-roboto">
          <DrawerTitle className="sr-only">Give feedback</DrawerTitle>
          <div className="mx-auto w-full max-w-[560px] px-4 pb-8">
            <p className="py-1.5 text-xs font-semibold leading-[1.4] text-brand-grey900">Give feedback</p>
            <p className="text-xs leading-[1.3] text-brand-bodyText">
              Anything that would make DeeX better — a bug, a rate, a missing coin.
            </p>
            <textarea
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              placeholder="Tell us what is on your mind..."
              maxLength={600}
              aria-label="Your feedback"
              className="mt-3 min-h-[140px] w-full resize-none border-b border-brand-grey100 bg-transparent py-2 text-[15px] leading-[1.6] text-brand-grey900 outline-none placeholder:text-brand-grey300 focus:border-brand-blue500"
            />
            <p className="pt-1 text-right text-xs leading-[1.3] text-brand-bodyText">{feedback.length}/600</p>
            <div className="pt-6">
              <PrimaryButton className="font-bold" disabled={!feedback.trim()} onClick={sendFeedback}>
                Send feedback
              </PrimaryButton>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </AppShell>
  );
};

export default AboutDeeX;

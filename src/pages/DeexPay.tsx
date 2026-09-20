import { useMemo, useState } from "react";
import { Check, Copy, Link2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton, SectionCard } from "@/components/dashboard/AppShell";

const DeexPay = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const paymentLink = useMemo(() => "https://deex.app/pay/lnk_q7m2x9", []);

  const copyLink = async () => {
    await navigator.clipboard.writeText(paymentLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <AppShell className="bg-white" innerClassName="pb-10 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title="Generate payment link" onBack={() => generated ? setGenerated(false) : navigate(-1)} />
        {generated ? (
          <SectionCard className="flex flex-col items-center px-4 py-8 text-center">
            <span className="mb-4 flex size-16 items-center justify-center rounded-full bg-brand-tint text-brand-blue500">
              <Link2 className="size-7" />
            </span>
            <h2 className="text-xl font-bold text-brand-grey900">Payment link ready</h2>
            <p className="mt-1 text-sm text-brand-bodyText">Share this link to receive ${Number(amount).toLocaleString()}</p>
            <button type="button" onClick={copyLink} className="mt-6 flex w-full items-center gap-3 rounded-lg border border-brand-grey100 bg-brand-grey50 px-4 py-3.5 text-left">
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-brand-blue500">{paymentLink}</span>
              {copied ? <Check className="size-5 text-brand-successText" /> : <Copy className="size-5 text-brand-blue500" />}
            </button>
            {description && <p className="mt-3 text-sm text-brand-bodyText">{description}</p>}
            <PrimaryButton className="mt-8" onClick={() => navigate("/dashboard")}>Done</PrimaryButton>
          </SectionCard>
        ) : (
          <SectionCard className="px-4 py-4">
            <p className="mb-5 text-sm leading-relaxed text-brand-bodyText">Create a link your customer can use to pay you in crypto.</p>
            <label className="mb-4 block">
              <span className="mb-2 block text-xs text-brand-bodyText">Amount (USD)</span>
              <input inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value.replace(/[^\d.]/g, ""))} placeholder="0.00" className="h-14 w-full rounded-lg border border-brand-grey100 bg-white px-4 text-xl font-semibold text-brand-grey900 outline-none focus:border-brand-blue500" />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs text-brand-bodyText">Description (optional)</span>
              <input value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What is this payment for?" className="h-14 w-full rounded-lg border border-brand-grey100 bg-white px-4 text-sm text-brand-grey900 outline-none focus:border-brand-blue500" />
            </label>
            <PrimaryButton className="mt-8" disabled={!Number(amount)} onClick={() => setGenerated(true)}>Generate link</PrimaryButton>
          </SectionCard>
        )}
      </PageTransition>
    </AppShell>
  );
};

export default DeexPay;

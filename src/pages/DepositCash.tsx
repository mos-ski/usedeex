import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton } from "@/components/dashboard/AppShell";
import { CopyIcon, InfoCircleIcon } from "@/components/dashboard/icons";

/**
 * The user's dedicated naira collection account — cash paid in here lands in
 * their DeeX Naira Wallet.
 */
const cashAccount = {
  bank: "Wema Bank",
  name: "DeeX/Ossai Precious",
  number: "2209987655",
};

const notes = [
  "Please send your cash into your special account number below",
  "Do not use any crypto related description on your bank app while making this transfer.",
];

const DepositCash = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(cashAccount.number);
    setCopied(true);
    toast.success("Account number copied");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppShell className="bg-white" innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title="Deposit Cash" onBack={() => navigate(-1)} />

        <div className="flex flex-col items-center gap-3 px-4">
          {/* Account */}
          <div className="flex h-[280px] w-full flex-col items-center justify-center gap-1.5">
            <p className="font-manrope text-[13px] font-medium leading-[1.6] text-brand-grey600">{cashAccount.bank}</p>
            <p className="text-center text-xl font-semibold leading-[1.4] text-brand-grey900">{cashAccount.name}</p>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy account number"
              className="flex items-center gap-1 rounded bg-[#EFF8FF] px-2 py-1.5 transition-opacity hover:opacity-80"
            >
              <span className="text-center font-manrope text-xl font-bold leading-[1.6] text-brand-blue500">
                {cashAccount.number}
              </span>
              {copied ? (
                <Check className="size-6 text-brand-successText" />
              ) : (
                <CopyIcon className="size-6 text-brand-blue500" />
              )}
            </button>
          </div>

          {/* Advisory */}
          <div className="flex w-full flex-col gap-3 rounded-lg bg-[#F9F9F9] p-3">
            {notes.map((note) => (
              <p key={note} className="flex gap-1 py-0.5">
                <InfoCircleIcon className="mt-0.5 size-4 shrink-0 text-brand-blue500" />
                <span className="min-w-0 flex-1 text-[13px] font-medium leading-[1.6] text-brand-grey600">{note}</span>
              </p>
            ))}
          </div>

          <PrimaryButton onClick={() => navigate("/naira-wallet")}>Done</PrimaryButton>
        </div>
      </PageTransition>
    </AppShell>
  );
};

export default DepositCash;

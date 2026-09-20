import { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton } from "./AppShell";
import { CopyIcon, InfoCircleIcon } from "./icons";

/**
 * A single copyable detail centred on the page, with advisory notes beneath
 * (Figma 299:23397 Deposit Cash, 299:23537 Share DeeX Tag).
 */
export const ShareDetail = ({
  title,
  eyebrow,
  heading,
  value,
  copyValue,
  copyLabel,
  notes,
  onBack,
  onDone,
}: {
  /** Page header. */
  title: string;
  /** Small muted line above the heading, e.g. the bank name. */
  eyebrow: string;
  /** Bold line under it, e.g. the account holder. */
  heading: string;
  /** The highlighted, copyable value. */
  value: string;
  /** What actually lands on the clipboard; defaults to `value`. */
  copyValue?: string;
  copyLabel: string;
  notes: string[];
  onBack: () => void;
  onDone: () => void;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyValue ?? value);
    setCopied(true);
    toast.success(`${copyLabel} copied`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppShell className="bg-brand-surface" innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title={title} onBack={onBack} />

        <div className="flex flex-col items-center gap-3 px-4">
          <div className="flex h-[280px] w-full flex-col items-center justify-center gap-1.5">
            <p className="font-manrope text-[13px] font-medium leading-[1.6] text-brand-grey600">{eyebrow}</p>
            <p className="text-center text-xl font-semibold leading-[1.4] text-brand-grey900">{heading}</p>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={`Copy ${copyLabel.toLowerCase()}`}
              className="flex items-center gap-1 rounded bg-brand-noteInfo px-2 py-1.5 transition-opacity hover:opacity-80"
            >
              <span className="text-center font-manrope text-xl font-bold leading-[1.6] text-brand-blue500">
                {value}
              </span>
              {copied ? (
                <Check className="size-6 text-brand-successText" />
              ) : (
                <CopyIcon className="size-6 text-brand-blue500" />
              )}
            </button>
          </div>

          <div className="flex w-full flex-col gap-3 rounded-lg bg-brand-noteNeutral p-3">
            {notes.map((note) => (
              <p key={note} className="flex gap-1 py-0.5">
                <InfoCircleIcon className="mt-0.5 size-4 shrink-0 text-brand-blue500" />
                <span className="min-w-0 flex-1 text-[13px] font-medium leading-[1.6] text-brand-grey600">{note}</span>
              </p>
            ))}
          </div>

          <PrimaryButton onClick={onDone}>Done</PrimaryButton>
        </div>
      </PageTransition>
    </AppShell>
  );
};

export default ShareDetail;

import { useState } from "react";
import { X, Check, ArrowRight } from "lucide-react";
import { GiftIcon } from "@/components/dashboard/icons";

interface InviteCodeInputProps {
  onApply: (code: string) => void;
  onClose?: () => void;
  preFilledCode?: string;
  variant?: "modal" | "inline" | "banner";
}

const mockValidCode = {
  code: "DX-WELCOME500",
  depositReward: 200,
  tradeReward: 300,
  totalReward: 500,
  minDeposit: 50,
  minTrade: 100,
};

const InviteCodeInput = ({ onApply, onClose, preFilledCode, variant = "modal" }: InviteCodeInputProps) => {
  const [code, setCode] = useState(preFilledCode || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!code.trim()) {
      setError("Please enter an invite code");
      return;
    }
    setLoading(true);
    setError("");

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    if (code.toUpperCase() === mockValidCode.code) {
      setSuccess(true);
      setTimeout(() => {
        onApply(code);
      }, 1500);
    } else {
      setError("Invalid or expired invite code");
    }
    setLoading(false);
  };

  /** Shared field + Apply button for the two embedded variants. */
  const entry = (
    <>
      <div className="flex items-end gap-3">
        <input
          placeholder="Enter invite code"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setError("");
          }}
          disabled={success}
          aria-label="Invite code"
          className="min-w-0 flex-1 border-b border-brand-grey100 bg-transparent py-2 text-[15px] uppercase leading-[1.4] text-brand-grey900 outline-none placeholder:normal-case placeholder:text-brand-grey300 focus:border-brand-blue500 disabled:text-brand-grey400"
        />
        <button
          type="button"
          onClick={handleApply}
          disabled={loading || success}
          className="shrink-0 rounded-lg bg-brand-blue500 px-4 py-2 font-manrope text-sm font-medium leading-[1.6] text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "…" : success ? <Check className="size-4" /> : "Apply"}
        </button>
      </div>
      {error && <p className="pt-2 text-xs leading-[1.3] text-brand-danger">{error}</p>}
      {success && (
        <div className="mt-3 rounded-lg bg-brand-tint p-3">
          <p className="text-xs font-medium leading-[1.6] text-brand-successText">Code applied successfully!</p>
          <p className="pt-1 text-xs leading-[1.6] text-brand-bodyText">
            Deposit ${mockValidCode.minDeposit} to earn {mockValidCode.depositReward} pts
          </p>
          <p className="text-xs leading-[1.6] text-brand-bodyText">
            Trade ${mockValidCode.minTrade} to earn {mockValidCode.tradeReward} pts
          </p>
        </div>
      )}
    </>
  );

  if (variant === "banner") {
    return (
      <div className="rounded-lg bg-brand-tint p-4">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-primary100 text-brand-blue500">
            <GiftIcon className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">Have an invite code?</p>
            <p className="pb-3 pt-1 text-xs leading-[1.6] text-brand-bodyText">
              Enter it to earn DeeXpoints on your first deposit and trade
            </p>
            {entry}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-xs leading-[1.3] text-brand-bodyText">Invite Code</span>
        {entry}
      </div>
    );
  }

  // Modal variant — light DeeX bottom sheet on mobile, centered dialog above sm.
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-brand-deepNavy/55 sm:items-center sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="invite-code-title"
        className="w-full max-w-[460px] overflow-hidden rounded-t-[28px] bg-brand-surface font-roboto shadow-2xl sm:rounded-[28px]"
      >
        <div className="mx-auto mt-3 h-1.5 w-14 rounded-full bg-brand-grey300 sm:hidden" />
        <div className="flex items-start justify-between gap-4 px-5 pb-3 pt-5 sm:px-6 sm:pt-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-primary100">
              <Gift className="size-5 text-brand-blue500" />
            </span>
            <div>
              <h3 id="invite-code-title" className="text-xl font-bold leading-tight text-brand-grey900">Enter invite code</h3>
              <p className="mt-1 text-sm leading-5 text-brand-grey500">Unlock rewards on your first deposit and trade.</p>
            </div>
          </div>
          {onClose && (
            <button type="button" onClick={onClose} aria-label="Close invite code" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-grey50 text-brand-grey600 transition-colors hover:bg-brand-grey100">
              <X className="size-5" />
            </button>
          )}
        </div>

        <div className="px-5 pb-5 sm:px-6">
          {success ? (
            <div className="py-4 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-[#EAF7EC]">
                <Check className="size-8 text-brand-success" />
              </div>
              <p className="mb-1 text-xl font-bold text-brand-grey900">Code applied!</p>
              <p className="mb-5 text-sm text-brand-grey500">Complete these conditions to earn your rewards.</p>
              <div className="space-y-3 rounded-2xl bg-brand-tint p-4 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-grey600">Deposit ${mockValidCode.minDeposit}</span>
                  <span className="text-sm font-bold text-brand-blue500">+{mockValidCode.depositReward} pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-brand-grey600">Trade ${mockValidCode.minTrade}</span>
                  <span className="text-sm font-bold text-brand-blue500">+{mockValidCode.tradeReward} pts</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4 pt-3">
                <div>
                  <label htmlFor="invite-code" className="mb-2 block text-sm font-medium text-brand-grey900">Invite code</label>
                  <Input
                    id="invite-code"
                    placeholder="e.g. DX-WELCOME500"
                    value={code}
                    onChange={e => { setCode(e.target.value.toUpperCase()); setError(""); }}
                    className="h-[52px] rounded-xl border-brand-grey300 bg-brand-surface px-4 text-base font-medium uppercase tracking-wide text-brand-grey900 placeholder:normal-case placeholder:tracking-normal placeholder:text-brand-grey400 focus-visible:ring-brand-blue500"
                  />
                  {error && <p className="mt-2 text-xs font-medium text-brand-danger">{error}</p>}
                </div>
                <div className="rounded-2xl bg-brand-tint p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Gift className="size-4 text-brand-blue500" />
                    <span className="text-sm font-semibold text-brand-grey900">Reward preview</span>
                  </div>
                  <div className="flex items-center justify-between text-sm leading-6">
                    <span className="text-brand-grey500">First deposit</span>
                    <span className="font-bold text-brand-grey900">{mockValidCode.depositReward} pts</span>
                  </div>
                  <div className="flex items-center justify-between text-sm leading-6">
                    <span className="text-brand-grey500">First trade</span>
                    <span className="font-bold text-brand-grey900">{mockValidCode.tradeReward} pts</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="border-t border-brand-grey100 px-5 pb-[max(20px,env(safe-area-inset-bottom))] pt-4 sm:px-6 sm:pb-6">
          {success ? (
            <Button onClick={onClose} className="h-12 w-full rounded-xl bg-brand-blue500 text-base font-bold text-white hover:bg-brand-navy">
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleApply} disabled={loading || !code.trim()} className="h-12 w-full rounded-xl bg-brand-blue500 text-base font-bold text-white hover:bg-brand-navy disabled:bg-brand-grey300 disabled:text-white">
              {loading ? "Applying..." : "Apply Code"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InviteCodeInput;

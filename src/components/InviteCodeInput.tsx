import { useState } from "react";
import { PrimaryButton } from "@/components/dashboard/AppShell";
import { TextField } from "@/components/dashboard/FormFields";
import { CheckIcon, GiftIcon } from "@/components/dashboard/icons";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";

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
          {loading ? "…" : success ? <CheckIcon className="size-4" /> : "Apply"}
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

  // Modal variant — the app's bottom sheet, same as every other picker.
  return (
    <Drawer open onOpenChange={(next) => !next && onClose?.()}>
      <DrawerContent className="border-brand-grey100 bg-brand-surface font-roboto">
        <DrawerTitle className="sr-only">Enter invite code</DrawerTitle>
        <div className="mx-auto w-full max-w-[560px] px-4 pb-8">
          <div className="flex items-center gap-3 py-1.5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-primary100">
              <GiftIcon className="size-5 text-brand-blue500" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-xs font-semibold leading-[1.4] text-brand-grey900">Enter invite code</span>
              <span className="text-xs leading-[1.3] text-brand-bodyText">
                Unlock rewards on your first deposit and trade
              </span>
            </span>
          </div>

          {success ? (
            <div className="flex flex-col items-center gap-1 pt-6 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-brand-tint text-brand-successText">
                <CheckIcon className="size-7" />
              </span>
              <p className="pt-2 text-[15px] font-semibold leading-[1.4] text-brand-grey900">Code applied</p>
              <p className="text-xs leading-[1.3] text-brand-bodyText">
                Complete these to earn your rewards.
              </p>
            </div>
          ) : (
            <div className="pt-4">
              <TextField
                label="Invite code"
                placeholder="e.g. DX-WELCOME500"
                autoComplete="off"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setError("");
                }}
                helper={error ? <span className="text-brand-danger">{error}</span> : undefined}
              />
            </div>
          )}

          <div className="flex flex-col pt-6">
            <span className="pb-1 text-xs font-semibold leading-[1.4] text-brand-grey900">What you earn</span>
            <div className="flex flex-col border-b border-brand-grey100 py-1.5">
              <span className="text-xs leading-[1.3] text-brand-bodyText">
                Deposit ${mockValidCode.minDeposit}
              </span>
              <span className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                {mockValidCode.depositReward} pts
              </span>
            </div>
            <div className="flex flex-col border-b border-brand-grey100 py-1.5">
              <span className="text-xs leading-[1.3] text-brand-bodyText">
                Trade ${mockValidCode.minTrade}
              </span>
              <span className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                {mockValidCode.tradeReward} pts
              </span>
            </div>
          </div>

          <div className="pt-6">
            <PrimaryButton
              className="font-bold"
              disabled={!success && (loading || !code.trim())}
              onClick={success ? () => onClose?.() : handleApply}
            >
              {success ? "Continue" : loading ? "Applying…" : "Apply code"}
            </PrimaryButton>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default InviteCodeInput;

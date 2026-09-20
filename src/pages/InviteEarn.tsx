import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, SectionCard, SectionHeader } from "@/components/dashboard/AppShell";
import InviteCodeInput from "@/components/InviteCodeInput";
import InviteCodeProgress from "@/components/InviteCodeProgress";
import { InitialMark } from "@/components/dashboard/AssetMark";
import { StatusPill } from "@/components/dashboard/SettingsList";
import { CopyLinearIcon, SendIcon } from "@/components/dashboard/icons";
import { useInviteCode } from "@/contexts/InviteCodeContext";

import qrCode from "@/assets/landing-v2/qr-code.png";

const myInviteCode = "DX-JOHN4F82";
const shareLink = `https://deexoptions.com/app?code=${myInviteCode}`;

const myReferrals = [
  { name: "Chidinma O.", redeemedAt: "Mar 5, 2026", deposit: true, trade: true, rewards: 500 },
  { name: "Ibrahim A.", redeemedAt: "Mar 8, 2026", deposit: true, trade: false, rewards: 200 },
  { name: "Fatima K.", redeemedAt: "Mar 10, 2026", deposit: false, trade: false, rewards: 0 },
];

const InviteEarn = () => {
  const navigate = useNavigate();
  const { appliedCode, depositCompleted, tradeCompleted, applyCode } = useInviteCode();
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard?.writeText(myInviteCode);
    setCopied(true);
    toast.success("Invite code copied");
    window.setTimeout(() => setCopied(false), 2000);
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on DeeX",
          text: `Use my invite code ${myInviteCode} to earn DeeXpoints on DeeX!`,
          url: shareLink,
        });
        return;
      } catch {
        // Share sheet dismissed — fall through to copying.
      }
    }
    navigator.clipboard?.writeText(shareLink);
    toast.success("Invite link copied");
  };

  return (
    <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title="Invite Code" onBack={() => navigate(-1)} />

        {/* Enter a code, or track the one already applied */}
        <SectionCard className="px-4 py-4">
          {appliedCode ? (
            <InviteCodeProgress
              code={appliedCode.code}
              depositReward={appliedCode.depositReward}
              tradeReward={appliedCode.tradeReward}
              minDeposit={appliedCode.minDeposit}
              minTrade={appliedCode.minTrade}
              depositCompleted={depositCompleted}
              tradeCompleted={tradeCompleted}
            />
          ) : (
            <InviteCodeInput variant="inline" onApply={applyCode} />
          )}
        </SectionCard>

        {/* Your own code */}
        <SectionCard className="mt-3 px-4 py-5">
          <SectionHeader title="Your Invite Code" />

          <div className="flex flex-col items-center gap-4 pt-2">
            <div className="text-center">
              <p className="text-xs leading-[1.3] text-brand-bodyText">Share this code with friends</p>
              <p className="pt-1 text-xl font-bold tracking-wider text-brand-grey900">{myInviteCode}</p>
            </div>

            <img src={qrCode} alt={`QR code for invite ${myInviteCode}`} className="size-40 rounded-lg object-contain" />

            <div className="flex w-full items-center gap-2">
              <button
                type="button"
                onClick={copyCode}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-brand-grey50 text-sm font-medium leading-[1.6] text-brand-grey900 transition-colors hover:bg-brand-grey100"
              >
                <CopyLinearIcon className="size-4" />
                {copied ? "Copied" : "Copy Code"}
              </button>
              <button
                type="button"
                onClick={share}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-brand-blue500 text-sm font-medium leading-[1.6] text-white transition-opacity hover:opacity-90"
              >
                <SendIcon className="size-4" />
                Share Link
              </button>
            </div>
          </div>
        </SectionCard>

        {/* Who used it */}
        <SectionCard className="mt-3 px-4 py-3">
          <SectionHeader title="Your Referrals" />
          {myReferrals.length === 0 ? (
            <p className="py-6 text-center text-sm text-brand-bodyText">
              No referrals yet. Share your code to start earning!
            </p>
          ) : (
            <div className="flex flex-col">
              {myReferrals.map((r) => (
                <div key={r.name} className="flex items-center gap-4 border-b border-brand-grey100 py-3 last:border-b-0">
                  <InitialMark name={r.name} />
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">{r.name}</span>
                    <span className="flex items-center gap-2">
                      <StatusPill tone={r.deposit ? "good" : "neutral"}>Deposit</StatusPill>
                      <StatusPill tone={r.trade ? "good" : "neutral"}>Trade</StatusPill>
                    </span>
                    <span className="truncate text-[10px] leading-[1.6] text-brand-bodyText">
                      Redeemed {r.redeemedAt}
                    </span>
                  </span>
                  <span className="shrink-0 text-[15px] font-semibold leading-[1.4] text-brand-blue500">
                    {r.rewards} pts
                  </span>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </PageTransition>
    </AppShell>
  );
};

export default InviteEarn;

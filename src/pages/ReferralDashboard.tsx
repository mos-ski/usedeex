import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, SectionCard, SectionHeader } from "@/components/dashboard/AppShell";
import { InitialMark } from "@/components/dashboard/AssetMark";
import { StatusPill } from "@/components/dashboard/SettingsList";
import { CopyLinearIcon } from "@/components/dashboard/icons";
import { cn } from "@/lib/utils";

const REFERRAL_LINK = "app.deexoption.com/refer001655";

const stats = [
  { label: "Total Referrals", value: "5" },
  { label: "Earned", value: "₦2,000" },
  { label: "Pending", value: "₦1,000" },
];

const referrals = [
  { name: "Adewale M.", status: "Traded", earned: "₦500", date: "Mar 7" },
  { name: "Chidinma O.", status: "Traded", earned: "₦500", date: "Mar 5" },
  { name: "Ibrahim A.", status: "Signed up", earned: "Pending", date: "Mar 4" },
  { name: "Fatima K.", status: "Traded", earned: "₦500", date: "Mar 1" },
  { name: "Victor E.", status: "Signed up", earned: "Pending", date: "Feb 28" },
];

const leaderboard = [
  { rank: 1, name: "Ibrahim Abubakar", referrals: 86, earned: "₦43,000" },
  { rank: 2, name: "Divine Omajuwa", referrals: 52, earned: "₦26,000" },
  { rank: 3, name: "Chibueze Umeh", referrals: 34, earned: "₦17,000" },
  { rank: 4, name: "You", referrals: 5, earned: "₦2,000" },
];

const ReferralDashboard = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard?.writeText(`https://${REFERRAL_LINK}`);
    setCopied(true);
    toast.success("Referral link copied");
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title="Referrals" onBack={() => navigate(-1)} />

        {/* Totals */}
        <SectionCard className="px-4 py-4">
          <div className="flex items-stretch">
            {stats.map((s, index) => (
              <div
                key={s.label}
                className={cn("flex flex-1 flex-col items-center gap-1", index < 2 && "border-r border-brand-grey100")}
              >
                <span className="text-[17px] font-bold leading-[1.4] text-brand-grey900">{s.value}</span>
                <span className="text-center text-[11px] leading-[1.3] text-brand-bodyText">{s.label}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Link */}
        <SectionCard className="mt-3 px-4 py-4">
          <p className="text-xs leading-[1.3] text-brand-bodyText">Your referral link</p>
          <div className="flex items-center gap-3 pt-1">
            <p className="min-w-0 flex-1 truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
              {REFERRAL_LINK}
            </p>
            <button
              type="button"
              onClick={copyLink}
              aria-label="Copy referral link"
              className="shrink-0 text-brand-blue500 transition-opacity hover:opacity-70"
            >
              <CopyLinearIcon className="size-5" />
            </button>
          </div>
          {copied && <p className="pt-1 text-[10px] font-medium text-brand-successText">Copied</p>}
        </SectionCard>

        {/* Referrals */}
        <SectionCard className="mt-3 px-4 py-3">
          <SectionHeader title="Your Referrals" />
          <div className="flex flex-col">
            {referrals.map((r) => (
              <div key={r.name} className="flex items-center gap-4 border-b border-brand-grey100 py-3 last:border-b-0">
                <InitialMark name={r.name} />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">{r.name}</span>
                  <span className="truncate text-xs leading-[1.3] text-brand-bodyText">
                    {r.date} • {r.status}
                  </span>
                </span>
                {r.earned === "Pending" ? (
                  <StatusPill tone="neutral">Pending</StatusPill>
                ) : (
                  <span className="shrink-0 text-[15px] font-semibold leading-[1.4] text-brand-successText">
                    {r.earned}
                  </span>
                )}
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Leaderboard */}
        <SectionCard className="mt-3 px-4 py-3">
          <SectionHeader title="Leaderboard" />
          <div className="flex flex-col">
            {leaderboard.map((l) => (
              <div
                key={l.rank}
                className={cn(
                  "flex items-center gap-4 border-b border-brand-grey100 py-3 last:border-b-0",
                  l.name === "You" && "bg-brand-tint",
                )}
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    l.rank <= 3 ? "bg-brand-noteAmber text-brand-amberBrown" : "bg-brand-grey100 text-brand-grey500",
                  )}
                >
                  {l.rank}
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">{l.name}</span>
                  <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{l.referrals} referrals</span>
                </span>
                <span className="shrink-0 text-[15px] font-semibold leading-[1.4] text-brand-grey900">{l.earned}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </PageTransition>
    </AppShell>
  );
};

export default ReferralDashboard;

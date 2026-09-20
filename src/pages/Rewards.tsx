import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import {
  ActionTile,
  AppShell,
  PageHeader,
  PrimaryButton,
  SectionCard,
  SectionHeader,
} from "@/components/dashboard/AppShell";
import SuccessScreen from "@/components/dashboard/SuccessScreen";
import FloatingNav from "@/components/dashboard/FloatingNav";
import {
  CheckIcon,
  ChevronRightIcon,
  ClockIcon,
  CopyLinearIcon,
  InfoCircleIcon,
  SendIcon,
} from "@/components/dashboard/icons";
import { cn } from "@/lib/utils";

import megaphone from "@/assets/rewards/referral-megaphone.png";
import streakFire from "@/assets/rewards/streak-fire.svg";

const REFERRAL_LINK = "app.deexoption.com/refer001655";

const POINTS_BALANCE = 2450;
const POINT_VALUE = 10;
const MIN_REDEEM = 500;

/** Su–Sa, with today's slot carrying the flame instead of a tick. */
const streakDays = [
  { label: "Su", state: "empty" },
  { label: "Mo", state: "done" },
  { label: "Tu", state: "done" },
  { label: "We", state: "today" },
  { label: "Th", state: "empty" },
  { label: "Fr", state: "empty" },
  { label: "Sa", state: "empty" },
] as const;

const earnings = [
  ["10 Points", "Sandra signed traded on DeeX"],
  ["70 Points", "You logged in for 7days"],
  ["10 Points", "Femi signed traded on DeeX"],
  ["10 Points", "Hushma$$ signed traded on DeeX"],
  ["50 Points", "You referred Tobi78"],
  ["50 Points", "Sandra signed traded on DeeX"],
  ["50 Points", "Sandra signed traded on DeeX"],
] as const;

/**
 * One tappable stat block: label + info dot on the left, the figure and a
 * chevron on the right, then an optional bar and a footnote underneath.
 */
const StatRow = ({
  label,
  value,
  footnote,
  progress,
  progressNote,
  onClick,
}: {
  label: string;
  value: string;
  footnote: string;
  /** 0–1. Renders the cashback meter when given. */
  progress?: number;
  progressNote?: string;
  onClick: () => void;
}) => (
  <SectionCard className="px-6 py-3">
    <button type="button" onClick={onClick} className="flex w-full flex-col items-start text-left">
      <span className="flex w-full items-start gap-0.5">
        <span className="flex min-w-0 flex-1 items-center gap-0.5">
          <span className="whitespace-nowrap text-xs font-semibold leading-[1.4] text-brand-grey900">{label}</span>
          <InfoCircleIcon className="size-3 shrink-0 text-brand-grey400" />
        </span>
        <span className="whitespace-nowrap text-xl font-bold leading-[1.4] text-[#191919]">{value}</span>
        <ChevronRightIcon className="size-6 shrink-0 text-brand-grey900" />
      </span>

      {progress !== undefined && (
        <span className="flex w-full items-center gap-2">
          <span className="relative h-1 min-w-0 flex-1 overflow-hidden rounded-sm bg-brand-grey900">
            <span
              className="absolute inset-y-0 left-0 bg-[#0494FC]"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </span>
          {progressNote && (
            <span className="whitespace-nowrap text-[11px] leading-[1.6] text-brand-grey500">{progressNote}</span>
          )}
        </span>
      )}

      <span className="text-[11px] leading-[1.6] text-brand-grey500">{footnote}</span>
    </button>
  </SectionCard>
);

type View = "main" | "redeem" | "confirm" | "success";

/** Rewards (Figma 300:30402). */
const Rewards = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<View>(searchParams.get("view") === "redeem" ? "redeem" : "main");
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);

  const points = Number(amount) || 0;
  const valid = points >= MIN_REDEEM && points <= POINTS_BALANCE;

  const copyLink = () => {
    navigator.clipboard?.writeText(`https://${REFERRAL_LINK}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  if (view === "success")
    return (
      <SuccessScreen
        title="Redemption submitted"
        message={`${points.toLocaleString()} points (₦${(points * POINT_VALUE).toLocaleString()}) will be credited to your PalmPay account after approval.`}
        onPrimary={() => {
          setView("main");
          setAmount("");
        }}
        onSecondary={() =>
          navigate("/receipt", {
            state: {
              type: "reward",
              data: {
                points: `${points} pts`,
                cash: `₦${(points * POINT_VALUE).toLocaleString()}`,
                status: "Processing",
                account: "8103674006 - PalmPay",
              },
            },
          })
        }
      />
    );

  if (view === "confirm")
    return (
      <AppShell className="bg-white" innerClassName="pb-10 lg:max-w-[480px] lg:px-4">
        <PageTransition>
          <PageHeader title="Confirm redemption" onBack={() => setView("redeem")} />
          <SectionCard className="px-4 py-2">
            {[
              ["Points", `${points.toLocaleString()} pts`],
              ["Rate", `1 pt = ₦${POINT_VALUE}`],
              ["You'll receive", `₦${(points * POINT_VALUE).toLocaleString()}`],
              ["Credit to", "8103674006 · PalmPay"],
              ["Remaining", `${(POINTS_BALANCE - points).toLocaleString()} pts`],
            ].map(([label, value], index, rows) => (
              <div
                key={label}
                className={cn(
                  "flex items-center justify-between gap-4 py-4",
                  index < rows.length - 1 && "border-b border-brand-grey100",
                )}
              >
                <span className="text-sm text-brand-bodyText">{label}</span>
                <span className="text-right text-sm font-semibold text-brand-grey900">{value}</span>
              </div>
            ))}
          </SectionCard>
          <div className="px-4 pt-6">
            <p className="mb-4 text-center text-xs text-brand-bodyText">
              Redemptions are reviewed before disbursement.
            </p>
            <PrimaryButton onClick={() => setView("success")}>Redeem now</PrimaryButton>
          </div>
        </PageTransition>
      </AppShell>
    );

  if (view === "redeem")
    return (
      <AppShell className="bg-white" innerClassName="pb-10 lg:max-w-[480px] lg:px-4">
        <PageTransition>
          <PageHeader title="Redeem points" onBack={() => setView("main")} />
          <SectionCard className="px-4 py-5">
            <div className="rounded-lg bg-brand-navy px-5 py-6 text-center text-white">
              <p className="text-xs text-white/70">Available points</p>
              <p className="mt-1 text-3xl font-bold">{POINTS_BALANCE.toLocaleString()}</p>
              <p className="mt-1 text-sm text-brand-primary100">
                ≈ ₦{(POINTS_BALANCE * POINT_VALUE).toLocaleString()}
              </p>
            </div>
            <label className="mt-6 block">
              <span className="mb-2 block text-xs text-brand-bodyText">Points to redeem</span>
              <input
                type="number"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder={`Minimum ${MIN_REDEEM}`}
                className="h-14 w-full rounded-lg border border-brand-grey100 px-4 text-xl font-semibold text-brand-grey900 outline-none focus:border-brand-blue500"
              />
            </label>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[500, 1000, 2000, POINTS_BALANCE].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(String(value))}
                  className={cn(
                    "rounded-full px-2 py-2 text-xs font-medium",
                    points === value ? "bg-brand-blue500 text-white" : "bg-brand-tint text-brand-blue500",
                  )}
                >
                  {value === POINTS_BALANCE ? "All" : value.toLocaleString()}
                </button>
              ))}
            </div>
            {points > 0 && (
              <p className={cn("mt-3 text-center text-xs", valid ? "text-brand-successText" : "text-brand-danger")}>
                {valid
                  ? `You will receive ₦${(points * POINT_VALUE).toLocaleString()}`
                  : points < MIN_REDEEM
                    ? `Minimum redemption is ${MIN_REDEEM} points`
                    : "Amount exceeds your balance"}
              </p>
            )}
            <PrimaryButton className="mt-7" disabled={!valid} onClick={() => setView("confirm")}>
              Continue
            </PrimaryButton>
          </SectionCard>
        </PageTransition>
      </AppShell>
    );

  return (
    <AppShell topColor="bg-brand-deepNavy" innerClassName="lg:max-w-[760px] lg:px-4">
      <PageTransition>
        <div className="bg-brand-deepNavy">
          <header className="flex h-14 items-center gap-3 px-4">
            <h1 className="text-[19px] font-bold leading-[1.4] text-white">Rewards</h1>
          </header>
          <div className="flex flex-col items-center gap-1 px-6 py-[18px]">
            <p className="text-[10px] font-bold uppercase leading-[1.6] text-brand-grey600">Total Earnings</p>
            <p className="font-gasoek leading-[1.4] text-white">
              <span className="text-[33px]">$1,458.</span>
              <span className="text-[17px]">98</span>
            </p>
          </div>
        </div>

        <SectionCard className="relative mt-3 h-[61px] px-0 py-0">
          <img
            src={megaphone}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -top-1.5 left-2 size-[82px] select-none object-cover"
          />
          <div className="absolute inset-y-0 left-[92px] right-4 flex items-center gap-6 py-3">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p
                className="bg-clip-text text-xs font-semibold leading-[1.4] text-transparent"
                style={{ backgroundImage: "linear-gradient(-67.32deg, #08426C 46.744%, #FF3838 103.77%)" }}
              >
                Your Referral Link
              </p>
              <p className="truncate text-xs font-bold leading-[1.3] text-brand-bodyText">{REFERRAL_LINK}</p>
            </div>
            <button
              type="button"
              onClick={copyLink}
              aria-label="Copy referral link"
              className="shrink-0 text-brand-blue500 transition-opacity hover:opacity-70"
            >
              <CopyLinearIcon className="size-5" />
            </button>
          </div>
          {copied && (
            <span className="absolute bottom-1 right-4 text-[10px] font-medium text-brand-successText">Copied</span>
          )}
        </SectionCard>

        <SectionCard className="mt-3 px-4 py-3">
          <SectionHeader title="Quick Actions" />
          <div className="grid grid-cols-2 gap-1">
            <ActionTile label="Redeem" Icon={SendIcon} onClick={() => setView("redeem")} />
            <ActionTile label="History" Icon={ClockIcon} onClick={() => navigate("/activity")} />
          </div>
        </SectionCard>

        <div className="mt-3 flex flex-col gap-3">
          <StatRow
            label="Available Cashback"
            value="₦50,000"
            progress={0.2958}
            progressNote="₦14,700"
            footnote="4 days : 13 Hours :  23 Mins"
            onClick={() => navigate("/naira-wallet")}
          />
          <StatRow
            label="Sign Up Bonus"
            value="$5"
            footnote="2/3 items completed"
            onClick={() => navigate("/kyc")}
          />
          <StatRow
            label="DeeXpoints"
            value="56/100"
            footnote="₦560 available to withdraw"
            onClick={() => setView("redeem")}
          />
        </div>

        <SectionCard className="mt-3 px-6 py-3">
          <button
            type="button"
            onClick={() => navigate("/trade-streak")}
            className="flex w-full items-start justify-between gap-2 text-left"
          >
            <span className="min-w-0 flex-1 text-xs font-semibold leading-[1.4] text-brand-grey900">Trade Streak</span>
            <span className="whitespace-nowrap text-xl font-bold leading-[1.4] text-[#191919]">$5</span>
            <ChevronRightIcon className="size-6 shrink-0 text-brand-grey900" />
          </button>

          <div className="flex items-center gap-2.5">
            {streakDays.map((day) => (
              <div key={day.label} className="flex flex-col items-center justify-center gap-0.5">
                <span className="w-5 text-[11px] leading-[1.6] text-brand-grey500">{day.label}</span>
                {day.state === "done" ? (
                  <span className="flex size-[22.5px] items-center justify-center rounded-full bg-[#095B97] text-white">
                    <CheckIcon className="size-[13.5px]" />
                  </span>
                ) : day.state === "today" ? (
                  <span className="relative flex size-[22.5px] items-center justify-center">
                    <img
                      src={streakFire}
                      alt=""
                      aria-hidden="true"
                      className="absolute left-1/2 -top-[1.875px] h-[24.375px] w-auto max-w-none -translate-x-1/2"
                    />
                  </span>
                ) : (
                  <span className="size-[22.5px] rounded-full border-[0.75px] border-[#D5D5D5]" />
                )}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard className="mt-3 px-6 py-3">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xs font-semibold leading-[1.4] text-brand-grey900">Earnings</h2>
            <button
              type="button"
              onClick={() => navigate("/activity")}
              className="font-manrope text-sm leading-[1.6] text-brand-grey400 transition-opacity hover:opacity-70"
            >
              History
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {earnings.map(([points, description], index) => (
              <div key={`${points}-${description}-${index}`} className="flex items-start gap-2.5">
                <span className="whitespace-nowrap text-[11px] font-medium leading-[1.6] text-[#34A853]">{points}</span>
                <span className="text-[11px] leading-[1.6] text-brand-grey500">{description}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </PageTransition>

      <FloatingNav />
    </AppShell>
  );
};

export default Rewards;

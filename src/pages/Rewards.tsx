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
import { AmountEntry, BalanceShortcuts, RateRow, groupDigits, parseAmount } from "@/components/dashboard/AmountEntry";
import { FaceIdOverlay, ReviewSheet } from "@/components/dashboard/ReviewSheet";
import FloatingNav from "@/components/dashboard/FloatingNav";
import {
  CheckCircleIcon,
  CheckIcon,
  ChevronRightIcon,
  ClockIcon,
  CopyLinearIcon,
  InfoCircleIcon,
  SendIcon,
} from "@/components/dashboard/icons";
import { formatNgn, trimZeros } from "@/lib/format";
import { cn } from "@/lib/utils";

import megaphone from "@/assets/rewards/referral-megaphone.png";
import streakFire from "@/assets/rewards/streak-fire.svg";

const REFERRAL_LINK = "app.deexoption.com/refer001655";

const POINTS_BALANCE = 2450;
/** Naira a single point is worth, per the redeem rate line. */
const POINT_VALUE_NGN = 1;
/** Rate is quoted per 2,000pts on the redeem screen. */
const REDEEM_UNIT = 2000;

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

/** Sign Up Bonus tasks (Figma 302:31600). */
const bonusTasks = [
  { title: "Complete KYC", detail: "Level one • Completed", done: true },
  { title: "Trade up to $100", detail: "Traded • $59", done: false },
  { title: "Refer a friend to trade $100", detail: "Pending", done: false },
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

type View = "main" | "redeem" | "success";

/** Redeem payout destinations (Figma 302:32336 "Wallet"). */
const payoutWallets = [
  { symbol: "NGN", name: "Naira Wallet", rate: POINT_VALUE_NGN },
  // The frame quotes 234 pts as 2.3 USDT.
  { symbol: "USDT", name: "USDT Crypto", rate: 0.0098 },
] as const;

/** Rewards (Figma 300:30402) and the redeem flow it opens. */
const Rewards = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<View>(searchParams.get("view") === "redeem" ? "redeem" : "main");
  const [amount, setAmount] = useState("");
  const [payout, setPayout] = useState<string>("NGN");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [bonusOpen, setBonusOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const points = parseAmount(amount);
  const wallet = payoutWallets.find((w) => w.symbol === payout) ?? payoutWallets[0];
  const payoutAmount = points * wallet.rate;
  const overBalance = points > POINTS_BALANCE;

  const copyLink = () => {
    navigator.clipboard?.writeText(`https://${REFERRAL_LINK}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const confirm = () => {
    setReviewOpen(false);
    setAuthenticating(true);
    window.setTimeout(() => {
      setAuthenticating(false);
      setView("success");
    }, 1400);
  };

  const formatPayout = (value: number) =>
    wallet.symbol === "NGN" ? formatNgn(value) : `${trimZeros(value.toFixed(4))} ${wallet.symbol}`;

  /* ---------------- Success (Figma 302:31999) ---------------- */
  if (view === "success")
    return (
      <SuccessScreen
        title="Redeem Completed!"
        message={`You have successfully redeemed ${points.toLocaleString()} DeeX pts for ${formatPayout(payoutAmount)} into your ${wallet.name}.`}
        onPrimary={() => {
          setView("main");
          setAmount("");
        }}
        onSecondary={() =>
          navigate("/receipt", {
            state: {
              type: "reward",
              data: {
                points: `${points.toLocaleString()} pts`,
                cash: formatPayout(payoutAmount),
                status: "Completed",
                account: wallet.name,
              },
            },
          })
        }
      />
    );

  /* ---------------- Redeem Points (Figma 302:31712) ---------------- */
  if (view === "redeem")
    return (
      <>
        <AmountEntry
          title="Redeem Points"
          onBack={() => setView("main")}
          value={amount}
          onValueChange={setAmount}
          fromSymbol="PTS"
          fromOptions={[{ symbol: "PTS", hint: "DeeX points" }]}
          onFromChange={() => undefined}
          toSymbol={wallet.symbol}
          toOptions={payoutWallets.map((w) => ({ symbol: w.symbol, hint: w.name }))}
          onToChange={setPayout}
          convertedText={
            wallet.symbol === "NGN"
              ? (points * wallet.rate).toLocaleString("en-US")
              : trimZeros((points * wallet.rate).toFixed(4))
          }
          error={overBalance ? "Amount exceeds your points balance" : undefined}
          footer={
            <>
              <RateRow text={`${REDEEM_UNIT.toLocaleString()}pts ~ ₦${(REDEEM_UNIT * POINT_VALUE_NGN).toLocaleString()}`} />
              <BalanceShortcuts
                balanceLabel={`Bal: ${POINTS_BALANCE.toLocaleString()}pts`}
                onPick={(fraction) => setAmount(groupDigits(String(Math.floor(POINTS_BALANCE * fraction))))}
              />
            </>
          }
          submitDisabled={points <= 0 || overBalance}
          onSubmit={() => setReviewOpen(true)}
        />

        {/* Review (Figma 302:32336) */}
        <ReviewSheet
          open={reviewOpen}
          onOpenChange={setReviewOpen}
          rows={[
            ["Amount", `${points.toLocaleString()} DeeX pts`],
            ["Payouts", formatPayout(payoutAmount)],
            ["Wallet", wallet.name],
          ]}
          onAction={confirm}
        />

        {/* Biometric beat (Figma 302:32626) */}
        <FaceIdOverlay active={authenticating} />
      </>
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
            onClick={() => setBonusOpen(true)}
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

      {/* Sign Up Bonus review (Figma 302:31169) */}
      <ReviewSheet
        open={bonusOpen}
        onOpenChange={setBonusOpen}
        actionLabel="Close"
        withFaceId={false}
        onAction={() => setBonusOpen(false)}
      >
        <div className="flex flex-col border-b border-brand-grey100 py-1.5">
          <span className="text-xs leading-[1.3] text-brand-bodyText">Sign Up Bonus</span>
          <span className="text-[15px] font-semibold leading-[1.4] text-brand-grey900">500 Pts (₦5,000)</span>
        </div>

        <div className="flex flex-col gap-1 py-6">
          {bonusTasks.map((task) => (
            <div key={task.title} className="flex items-center gap-3">
              <span className="flex w-[18px] shrink-0 justify-center">
                {task.done ? (
                  <CheckCircleIcon className="size-[18px] text-[#11C514]" />
                ) : (
                  <span className="size-4 rounded-full border-[1.5px] border-brand-grey300" />
                )}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span
                  className={cn(
                    "text-[13px] font-semibold leading-[1.4] text-brand-grey900",
                    task.done && "line-through opacity-50",
                  )}
                >
                  {task.title}
                </span>
                <span className="text-[10px] leading-[1.3] text-brand-bodyText">{task.detail}</span>
              </span>
            </div>
          ))}
        </div>
      </ReviewSheet>

      <FloatingNav />
    </AppShell>
  );
};

export default Rewards;

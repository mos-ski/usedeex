import { useState } from "react";
import { Check, Clock, Gift, TrendingUp, Users } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton, SectionCard } from "@/components/dashboard/AppShell";
import SuccessScreen from "@/components/dashboard/SuccessScreen";
import { cn } from "@/lib/utils";

const POINTS_BALANCE = 2450;
const POINT_VALUE = 10;
const MIN_REDEEM = 500;

const earnings = [
  ["Referral trade completed", "+100 pts", "Today, 10:24 AM", Users],
  ["Daily trade bonus", "+50 pts", "Yesterday, 4:12 PM", TrendingUp],
  ["7-day trade streak", "+100 pts", "Sep 18, 2026", Check],
  ["KYC completion bonus", "+200 pts", "Sep 16, 2026", Gift],
  ["Referral trade completed", "+100 pts", "Sep 14, 2026", Users],
  ["Weekly cashback reward", "+500 pts", "Sep 12, 2026", TrendingUp],
  ["First crypto trade", "+200 pts", "Sep 10, 2026", Gift],
  ["Daily trade bonus", "+50 pts", "Sep 8, 2026", TrendingUp],
] as const;

type Tab = "rewards" | "earnings";
type View = "main" | "redeem" | "confirm" | "success";

const Rewards = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab: Tab = searchParams.get("tab") === "earnings" ? "earnings" : "rewards";
  const [tab, setTab] = useState<Tab>(initialTab);
  const [view, setView] = useState<View>(searchParams.get("view") === "redeem" ? "redeem" : "main");
  const [amount, setAmount] = useState("");
  const points = Number(amount) || 0;
  const valid = points >= MIN_REDEEM && points <= POINTS_BALANCE;

  const chooseTab = (next: Tab) => {
    setTab(next);
    setSearchParams(next === "earnings" ? { tab: "earnings" } : {});
  };

  if (view === "success") return <SuccessScreen title="Redemption submitted" message={`${points.toLocaleString()} points (₦${(points * POINT_VALUE).toLocaleString()}) will be credited to your PalmPay account after approval.`} onPrimary={() => { setView("main"); setAmount(""); }} onSecondary={() => navigate("/receipt", { state: { type: "reward", data: { points: `${points} pts`, cash: `₦${(points * POINT_VALUE).toLocaleString()}`, status: "Processing", account: "8103674006 - PalmPay" } } })} />;

  if (view === "confirm") return (
    <AppShell className="bg-white" innerClassName="pb-10 lg:max-w-[480px] lg:px-4"><PageTransition><PageHeader title="Confirm redemption" onBack={() => setView("redeem")} /><SectionCard className="px-4 py-2">{[["Points", `${points.toLocaleString()} pts`], ["Rate", `1 pt = ₦${POINT_VALUE}`], ["You'll receive", `₦${(points * POINT_VALUE).toLocaleString()}`], ["Credit to", "8103674006 · PalmPay"], ["Remaining", `${(POINTS_BALANCE - points).toLocaleString()} pts`]].map(([label, value], index, rows) => <div key={label} className={cn("flex items-center justify-between gap-4 py-4", index < rows.length - 1 && "border-b border-brand-grey100")}><span className="text-sm text-brand-bodyText">{label}</span><span className="text-right text-sm font-semibold text-brand-grey900">{value}</span></div>)}</SectionCard><div className="px-4 pt-6"><p className="mb-4 text-center text-xs text-brand-bodyText">Redemptions are reviewed before disbursement.</p><PrimaryButton onClick={() => setView("success")}>Redeem now</PrimaryButton></div></PageTransition></AppShell>
  );

  if (view === "redeem") return (
    <AppShell className="bg-white" innerClassName="pb-10 lg:max-w-[480px] lg:px-4"><PageTransition><PageHeader title="Redeem points" onBack={() => setView("main")} /><SectionCard className="px-4 py-5"><div className="rounded-lg bg-brand-navy px-5 py-6 text-center text-white"><p className="text-xs text-white/70">Available points</p><p className="mt-1 text-3xl font-bold">{POINTS_BALANCE.toLocaleString()}</p><p className="mt-1 text-sm text-brand-primary100">≈ ₦{(POINTS_BALANCE * POINT_VALUE).toLocaleString()}</p></div><label className="mt-6 block"><span className="mb-2 block text-xs text-brand-bodyText">Points to redeem</span><input type="number" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder={`Minimum ${MIN_REDEEM}`} className="h-14 w-full rounded-lg border border-brand-grey100 px-4 text-xl font-semibold text-brand-grey900 outline-none focus:border-brand-blue500" /></label><div className="mt-3 grid grid-cols-4 gap-2">{[500, 1000, 2000, POINTS_BALANCE].map((value) => <button key={value} type="button" onClick={() => setAmount(String(value))} className={cn("rounded-full px-2 py-2 text-xs font-medium", points === value ? "bg-brand-blue500 text-white" : "bg-brand-tint text-brand-blue500")}>{value === POINTS_BALANCE ? "All" : value.toLocaleString()}</button>)}</div>{points > 0 && <p className={cn("mt-3 text-center text-xs", valid ? "text-brand-successText" : "text-red-500")}>{valid ? `You will receive ₦${(points * POINT_VALUE).toLocaleString()}` : points < MIN_REDEEM ? `Minimum redemption is ${MIN_REDEEM} points` : "Amount exceeds your balance"}</p>}<PrimaryButton className="mt-7" disabled={!valid} onClick={() => setView("confirm")}>Continue</PrimaryButton></SectionCard></PageTransition></AppShell>
  );

  return (
    <AppShell innerClassName="pb-32 lg:max-w-[760px] lg:px-4"><PageTransition><PageHeader title="Rewards" onBack={() => navigate(-1)} /><SectionCard className="px-4 py-4"><div className="rounded-lg bg-brand-navy px-5 py-6 text-white"><p className="text-xs text-white/70">DeeX points</p><div className="mt-1 flex items-end justify-between gap-4"><div><p className="text-3xl font-bold">{POINTS_BALANCE.toLocaleString()}</p><p className="mt-1 text-sm text-brand-primary100">Worth ₦{(POINTS_BALANCE * POINT_VALUE).toLocaleString()}</p></div><button type="button" onClick={() => setView("redeem")} className="rounded-lg bg-brand-blue500 px-5 py-2.5 text-sm font-medium text-white">Redeem</button></div></div><div role="tablist" className="mt-4 flex rounded bg-brand-barBg p-0.5">{(["rewards", "earnings"] as const).map((item) => <button key={item} type="button" onClick={() => chooseTab(item)} className={cn("flex-1 rounded px-3 py-2 text-xs font-semibold capitalize", tab === item ? "bg-white text-brand-blue500" : "text-brand-grey900")}>{item}</button>)}</div></SectionCard>{tab === "rewards" ? <><SectionCard className="mt-3 px-4"><h2 className="mb-3 text-xs font-semibold text-brand-grey900">Ways to earn</h2>{[["Refer & earn", "Earn 100 points when a friend completes a trade", Users], ["Trade streak", "Trade for 7 days and earn 100 points", TrendingUp], ["Complete your profile", "Finish verification tasks to unlock bonuses", Gift]].map(([title, subtitle, Icon], index) => <button key={String(title)} type="button" onClick={() => navigate(index === 0 ? "/referrals" : index === 1 ? "/trade-streak" : "/kyc")} className={cn("flex w-full items-center gap-4 py-4 text-left", index < 2 && "border-b border-brand-grey100")}><span className="flex size-10 items-center justify-center rounded-full bg-brand-tint text-brand-blue500"><Icon className="size-5" /></span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-brand-grey900">{title}</span><span className="block text-xs leading-relaxed text-brand-bodyText">{subtitle}</span></span></button>)}</SectionCard></> : <SectionCard className="mt-3 px-4 py-0">{earnings.map(([title, value, date, Icon], index) => <div key={`${title}-${date}`} className={cn("flex items-center gap-4 py-4", index < earnings.length - 1 && "border-b border-brand-grey100")}><span className="flex size-10 items-center justify-center rounded-full bg-brand-tint text-brand-blue500"><Icon className="size-5" /></span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-brand-grey900">{title}</span><span className="block text-xs text-brand-bodyText">{date}</span></span><span className="text-sm font-semibold text-brand-successText">{value}</span></div>)}</SectionCard>}</PageTransition></AppShell>
  );
};

export default Rewards;

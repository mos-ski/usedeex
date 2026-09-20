import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, SectionCard, SectionHeader } from "@/components/dashboard/AppShell";
import { StatusPill } from "@/components/dashboard/SettingsList";
import { CheckIcon } from "@/components/dashboard/icons";
import { cn } from "@/lib/utils";

import streakFire from "@/assets/rewards/streak-fire.svg";

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
/** Which of this week's days have a completed trade; today carries the flame. */
const weeklyProgress = [true, true, true, false, false, false, false];
const today = 3;

const streak = { current: 3, longest: 12, totalBonusEarned: 4500, multiplier: 1.5 };

const milestones = [
  { days: 3, reward: "50 pts", unlocked: true, label: "3-Day Fire" },
  { days: 7, reward: "200 pts", unlocked: false, label: "Weekly Warrior" },
  { days: 14, reward: "500 pts + 2x bonus", unlocked: false, label: "Fortnight Force" },
  { days: 30, reward: "1,500 pts + 3x bonus", unlocked: false, label: "Monthly Master" },
  { days: 60, reward: "5,000 pts + 5x bonus", unlocked: false, label: "Elite Trader" },
  { days: 100, reward: "15,000 pts + 10x bonus", unlocked: false, label: "Legendary" },
];

const bonusHistory = [
  { id: 1, date: "Mar 8, 2026", type: "Daily trade bonus", points: 50, multiplier: "1.5x" },
  { id: 2, date: "Mar 7, 2026", type: "Daily trade bonus", points: 50, multiplier: "1.5x" },
  { id: 3, date: "Mar 6, 2026", type: "Streak milestone", points: 200, multiplier: "—" },
  { id: 4, date: "Mar 5, 2026", type: "Daily trade bonus", points: 50, multiplier: "1x" },
];

const TradeStreak = () => {
  const navigate = useNavigate();

  return (
    <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title="Trade Streak" onBack={() => navigate(-1)} />

        {/* This week */}
        <SectionCard className="px-6 py-5">
          <div className="flex items-end justify-center gap-2">
            <img src={streakFire} alt="" aria-hidden="true" className="h-10 w-auto" />
            <span className="font-gasoek text-[40px] leading-none text-brand-grey900">{streak.current}</span>
            <span className="pb-1 text-sm leading-[1.6] text-brand-bodyText">day streak</span>
          </div>

          <div className="flex items-center justify-center gap-2.5 pt-5">
            {days.map((day, index) => (
              <div key={day} className="flex flex-col items-center justify-center gap-0.5">
                <span className="w-5 text-center text-[11px] leading-[1.6] text-brand-grey500">{day}</span>
                {index === today ? (
                  <span className="relative flex size-[22.5px] items-center justify-center">
                    <img
                      src={streakFire}
                      alt=""
                      aria-hidden="true"
                      className="absolute left-1/2 -top-[1.875px] h-[24.375px] w-auto max-w-none -translate-x-1/2"
                    />
                  </span>
                ) : weeklyProgress[index] ? (
                  <span className="flex size-[22.5px] items-center justify-center rounded-full bg-[#095B97] text-white">
                    <CheckIcon className="size-[13.5px]" />
                  </span>
                ) : (
                  <span className="size-[22.5px] rounded-full border-[0.75px] border-brand-grey300" />
                )}
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Stats */}
        <SectionCard className="mt-3 px-4 py-4">
          <div className="flex items-stretch">
            {[
              { label: "Longest streak", value: `${streak.longest} days` },
              { label: "Bonus earned", value: `${streak.totalBonusEarned.toLocaleString()} pts` },
              { label: "Multiplier", value: `${streak.multiplier}x` },
            ].map((cell, index) => (
              <div
                key={cell.label}
                className={cn("flex flex-1 flex-col items-center gap-1", index < 2 && "border-r border-brand-grey100")}
              >
                <span className="text-[15px] font-bold leading-[1.4] text-brand-grey900">{cell.value}</span>
                <span className="text-center text-[11px] leading-[1.3] text-brand-bodyText">{cell.label}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Milestones */}
        <SectionCard className="mt-3 px-4 py-3">
          <SectionHeader title="Milestones" />
          <div className="flex flex-col">
            {milestones.map((m) => (
              <div
                key={m.days}
                className="flex items-center gap-4 border-b border-brand-grey100 py-3 last:border-b-0"
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    m.unlocked ? "bg-brand-tint text-brand-blue500" : "bg-brand-grey100 text-brand-grey400",
                  )}
                >
                  {m.days}
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">{m.label}</span>
                  <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{m.reward}</span>
                </span>
                <StatusPill tone={m.unlocked ? "good" : "neutral"}>{m.unlocked ? "Unlocked" : "Locked"}</StatusPill>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Bonus history */}
        <SectionCard className="mt-3 px-4 py-3">
          <SectionHeader title="Bonus History" />
          <div className="flex flex-col">
            {bonusHistory.map((b) => (
              <div key={b.id} className="flex items-center gap-4 border-b border-brand-grey100 py-3 last:border-b-0">
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">{b.type}</span>
                  <span className="truncate text-xs leading-[1.3] text-brand-bodyText">
                    {b.date} • {b.multiplier}
                  </span>
                </span>
                <span className="shrink-0 text-[15px] font-semibold leading-[1.4] text-brand-successText">
                  +{b.points} pts
                </span>
              </div>
            ))}
          </div>
        </SectionCard>
      </PageTransition>
    </AppShell>
  );
};

export default TradeStreak;

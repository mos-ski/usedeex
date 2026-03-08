import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Flame, Trophy, Zap, Gift, Star, TrendingUp, Calendar } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import NewBadge from "@/components/NewBadge";

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const currentDay = new Date().getDay();

const streakData = {
  current: 3,
  longest: 12,
  totalBonusEarned: 4500,
  multiplier: 1.5,
};

const weeklyProgress = [true, true, true, false, false, false, false];

const milestones = [
  { days: 3, reward: "50 pts", icon: Flame, unlocked: true, label: "3-Day Fire" },
  { days: 7, reward: "200 pts", icon: Star, unlocked: false, label: "Weekly Warrior" },
  { days: 14, reward: "500 pts + 2x bonus", icon: Zap, unlocked: false, label: "Fortnight Force" },
  { days: 30, reward: "1,500 pts + 3x bonus", icon: Trophy, unlocked: false, label: "Monthly Master" },
  { days: 60, reward: "5,000 pts + 5x bonus", icon: Gift, unlocked: false, label: "Elite Trader" },
  { days: 100, reward: "15,000 pts + 10x bonus", icon: TrendingUp, unlocked: false, label: "Legendary" },
];

const bonusHistory = [
  { id: 1, date: "Mar 8, 2026", type: "Daily trade bonus", points: 50, multiplier: "1.5x" },
  { id: 2, date: "Mar 7, 2026", type: "Daily trade bonus", points: 50, multiplier: "1.3x" },
  { id: 3, date: "Mar 6, 2026", type: "3-Day streak milestone", points: 50, multiplier: "—" },
  { id: 4, date: "Mar 6, 2026", type: "Daily trade bonus", points: 50, multiplier: "1.0x" },
  { id: 5, date: "Feb 28, 2026", type: "Daily trade bonus", points: 50, multiplier: "1.0x" },
  { id: 6, date: "Feb 25, 2026", type: "7-Day streak milestone", points: 200, multiplier: "—" },
  { id: 7, date: "Feb 20, 2026", type: "Daily trade bonus", points: 50, multiplier: "2.0x" },
];

type Tab = "overview" | "milestones" | "history";

const TradeStreak = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const nextMilestone = milestones.find((m) => !m.unlocked);
  const daysToNext = nextMilestone ? nextMilestone.days - streakData.current : 0;

  return (
    <MobileLayout hideNav>
      <PageTransition>
        <div className="px-4 pt-4 pb-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h2 className="text-lg font-bold text-foreground">Trade Streak</h2>
            <NewBadge />
          </div>

          {/* Streak Hero */}
          <div className="bg-gradient-to-br from-deex-orange/20 to-primary/10 border border-deex-orange/30 rounded-2xl p-5 mb-6 text-center">
            <Flame className="w-12 h-12 text-deex-orange mx-auto mb-2" />
            <p className="text-4xl font-extrabold text-foreground">{streakData.current}</p>
            <p className="text-sm text-muted-foreground mb-3">Day Streak</p>
            <div className="flex justify-center gap-6">
              <div>
                <p className="text-lg font-bold text-foreground">{streakData.longest}</p>
                <p className="text-[10px] text-muted-foreground">Best Streak</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="text-lg font-bold text-primary">{streakData.multiplier}x</p>
                <p className="text-[10px] text-muted-foreground">Multiplier</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="text-lg font-bold text-success">{streakData.totalBonusEarned.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground">Pts Earned</p>
              </div>
            </div>
          </div>

          {/* Weekly Calendar */}
          <div className="bg-secondary rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-foreground">This Week</p>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex justify-between">
              {days.map((d, i) => (
                <div key={d} className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] text-muted-foreground">{d}</span>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      weeklyProgress[i]
                        ? "bg-deex-orange text-primary-foreground shadow-md shadow-deex-orange/30"
                        : i === currentDay
                        ? "bg-primary/20 text-primary border-2 border-primary border-dashed"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {weeklyProgress[i] ? "🔥" : i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-secondary rounded-full p-1 mb-5">
            {(["overview", "milestones", "history"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-full text-xs font-medium capitalize transition-colors ${
                  activeTab === tab ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-4">
              {/* Next Milestone Card */}
              {nextMilestone && (
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-xs text-muted-foreground mb-2">Next Milestone</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-deex-orange/20 flex items-center justify-center">
                      <nextMilestone.icon className="w-5 h-5 text-deex-orange" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{nextMilestone.label}</p>
                      <p className="text-xs text-muted-foreground">{daysToNext} more days • {nextMilestone.reward}</p>
                    </div>
                  </div>
                  <div className="mt-3 w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-deex-orange rounded-full transition-all"
                      style={{ width: `${(streakData.current / nextMilestone.days) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* How It Works */}
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-sm font-semibold text-foreground mb-3">How It Works</p>
                <div className="space-y-3">
                  {[
                    { step: "1", text: "Trade any crypto daily to keep your streak" },
                    { step: "2", text: "Earn bonus points with each consecutive day" },
                    { step: "3", text: "Hit milestones for massive bonus rewards" },
                    { step: "4", text: "Higher streaks unlock multipliers on all earnings" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-primary">{item.step}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Multiplier Tiers */}
              <div className="bg-card border border-border rounded-xl p-4">
                <p className="text-sm font-semibold text-foreground mb-3">Multiplier Tiers</p>
                <div className="space-y-2">
                  {[
                    { range: "1–3 days", mult: "1.0x" },
                    { range: "4–7 days", mult: "1.5x" },
                    { range: "8–14 days", mult: "2.0x" },
                    { range: "15–30 days", mult: "3.0x" },
                    { range: "30+ days", mult: "5.0x" },
                  ].map((tier) => (
                    <div key={tier.range} className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{tier.range}</span>
                      <span className="text-xs font-bold text-primary">{tier.mult}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Milestones Tab */}
          {activeTab === "milestones" && (
            <div className="space-y-3">
              {milestones.map((m) => (
                <div
                  key={m.days}
                  className={`border rounded-xl p-4 flex items-center gap-3 transition-all ${
                    m.unlocked
                      ? "bg-deex-orange/10 border-deex-orange/30"
                      : "bg-card border-border"
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center ${
                      m.unlocked ? "bg-deex-orange text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <m.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-semibold ${m.unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                        {m.label}
                      </p>
                      {m.unlocked && (
                        <span className="text-[10px] bg-deex-orange/20 text-deex-orange px-2 py-0.5 rounded-full font-medium">
                          Unlocked
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{m.days}-day streak • {m.reward}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <div className="space-y-2">
              {bonusHistory.map((b) => (
                <div key={b.id} className="bg-card border border-border rounded-xl px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{b.type}</p>
                    <p className="text-xs text-muted-foreground">{b.date} {b.multiplier !== "—" && `• ${b.multiplier}`}</p>
                  </div>
                  <span className="text-sm font-bold text-success">+{b.points}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default TradeStreak;

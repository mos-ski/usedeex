import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Check, Gift, Flame, Users, ChevronRight } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import BottomNav from "@/components/layout/BottomNav";

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const streakDays = [true, true, true, false, false, false, false]; // first 3 done

const Rewards = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const referralLink = "https://deex.app/ref/johndoe";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MobileLayout>
      <div className="px-4 pt-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Rewards</h2>

        {/* Referral Banner */}
        <div className="bg-gradient-to-r from-primary/30 to-accent/20 rounded-2xl p-5 mb-6 border border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <Gift className="w-8 h-8 text-primary" />
            <div>
              <p className="text-sm font-bold text-foreground">Invite Friends & Earn</p>
              <p className="text-xs text-muted-foreground">Earn ₦500 for every friend who trades</p>
            </div>
          </div>
          <div className="flex gap-2">
            <input readOnly value={referralLink} className="flex-1 h-10 bg-secondary/50 rounded-lg px-3 text-xs text-muted-foreground outline-none" />
            <button onClick={handleCopy} className="h-10 px-4 bg-primary rounded-lg text-primary-foreground text-sm font-medium flex items-center gap-1">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Explore */}
        <h3 className="text-sm font-semibold text-foreground mb-3">Explore</h3>
        <div className="flex gap-3 mb-6">
          <div className="flex-1 bg-secondary rounded-xl p-4">
            <Flame className="w-6 h-6 text-deex-orange mb-2" />
            <p className="text-sm font-semibold text-foreground">Trade Streak</p>
            <p className="text-xs text-muted-foreground">Trade daily for bonuses</p>
          </div>
          <div className="flex-1 bg-secondary rounded-xl p-4">
            <Users className="w-6 h-6 text-primary mb-2" />
            <p className="text-sm font-semibold text-foreground">Refer & Win</p>
            <p className="text-xs text-muted-foreground">Win up to ₦50,000</p>
          </div>
        </div>

        {/* Weekly Cashback */}
        <div className="bg-secondary rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-foreground">Weekly Cashback</p>
            <span className="text-xs text-muted-foreground">4d 12h left</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full mb-1">
            <div className="h-2 bg-primary rounded-full" style={{ width: "65%" }} />
          </div>
          <p className="text-xs text-muted-foreground">₦6,500 / ₦10,000 target</p>
        </div>

        {/* DeeXpoints */}
        <div className="bg-secondary rounded-xl p-4 mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">DeeXpoints</p>
            <p className="text-2xl font-bold text-primary">2,450</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>

        {/* Daily Streak */}
        <div className="bg-secondary rounded-xl p-4 mb-4">
          <p className="text-sm font-semibold text-foreground mb-3">Daily Streak</p>
          <div className="flex justify-between">
            {days.map((d, i) => (
              <div key={d} className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground">{d}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${streakDays[i] ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                  {streakDays[i] ? "✓" : i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </MobileLayout>
  );
};

export default Rewards;

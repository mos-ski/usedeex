import { Info, TrendingUp } from "lucide-react";
import { useState } from "react";

interface CashbackCardProps {
  currentVolume: number;
  targetVolume: number;
  cashbackReward: number;
  timeLeft: string;
}

const CashbackCard = ({ currentVolume, targetVolume, cashbackReward, timeLeft }: CashbackCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const progress = Math.min((currentVolume / targetVolume) * 100, 100);
  const eligible = currentVolume >= targetVolume;

  return (
    <div className="bg-secondary rounded-2xl p-5 mb-5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <p className="text-sm font-semibold text-foreground">Weekly Cashback</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{timeLeft} left</span>
          <button onClick={() => setShowTooltip(!showTooltip)} className="relative">
            <Info className="w-3.5 h-3.5 text-muted-foreground" />
            {showTooltip && (
              <div className="absolute right-0 top-5 z-10 bg-card border border-border rounded-lg p-3 w-48 shadow-lg">
                <p className="text-[10px] text-muted-foreground">Trade ₦2M in a week to earn ₦50,000 cashback. Pool resets every Sunday. Unclaimed cashbacks cannot be recovered.</p>
              </div>
            )}
          </button>
        </div>
      </div>
      <div className="w-full h-2 bg-muted rounded-full mb-2 overflow-hidden">
        <div className="h-2 bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">₦{currentVolume.toLocaleString()} / ₦{targetVolume.toLocaleString()}</p>
        {eligible ? (
          <button className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">Redeem ₦{cashbackReward.toLocaleString()}</button>
        ) : (
          <p className="text-xs text-muted-foreground">₦{(targetVolume - currentVolume).toLocaleString()} to go</p>
        )}
      </div>
    </div>
  );
};

export default CashbackCard;

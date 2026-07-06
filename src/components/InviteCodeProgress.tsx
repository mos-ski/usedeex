import { Check, Clock, Gift, TrendingUp, ArrowDownLeft } from "lucide-react";

interface InviteCodeProgressProps {
  code: string;
  depositReward: number;
  tradeReward: number;
  minDeposit: number;
  minTrade: number;
  depositCompleted: boolean;
  tradeCompleted: boolean;
  depositDeadlineDays: number;
  tradeDeadlineDays: number;
}

const InviteCodeProgress = ({
  code,
  depositReward,
  tradeReward,
  minDeposit,
  minTrade,
  depositCompleted,
  tradeCompleted,
  depositDeadlineDays,
  tradeDeadlineDays,
}: InviteCodeProgressProps) => {
  const totalReward = depositReward + tradeReward;
  const earnedReward = (depositCompleted ? depositReward : 0) + (tradeCompleted ? tradeReward : 0);
  const progress = ((depositCompleted ? 1 : 0) + (tradeCompleted ? 1 : 0)) / 2 * 100;

  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Gift className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Invite Code</p>
            <p className="text-sm font-mono font-semibold text-foreground">{code}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Earned</p>
          <p className="text-lg font-bold text-primary">{earnedReward}/{totalReward} pts</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-muted-foreground">{Math.round(progress)}% complete</span>
          <span className="text-[10px] text-muted-foreground">{2 - (depositCompleted ? 1 : 0) - (tradeCompleted ? 1 : 0)} conditions remaining</span>
        </div>
      </div>

      {/* Conditions */}
      <div className="space-y-3">
        {/* Registration */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Registration</p>
            <p className="text-[10px] text-success">Completed</p>
          </div>
        </div>

        {/* Deposit */}
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${depositCompleted ? "bg-success" : "bg-secondary border-2 border-muted-foreground"}`}>
            {depositCompleted ? <Check className="w-3.5 h-3.5 text-white" /> : <ArrowDownLeft className="w-3 h-3 text-muted-foreground" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Deposit</p>
              <span className={`text-sm font-medium ${depositCompleted ? "text-success" : "text-primary"}`}>
                {depositCompleted ? "Completed" : `+${depositReward} pts`}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              {depositCompleted ? "Bonus credited" : `Deposit min $${minDeposit} within ${depositDeadlineDays} days`}
            </p>
          </div>
        </div>

        {/* Trade */}
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${tradeCompleted ? "bg-success" : "bg-secondary border-2 border-muted-foreground"}`}>
            {tradeCompleted ? <Check className="w-3.5 h-3.5 text-white" /> : <TrendingUp className="w-3 h-3 text-muted-foreground" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Trade</p>
              <span className={`text-sm font-medium ${tradeCompleted ? "text-success" : "text-primary"}`}>
                {tradeCompleted ? "Completed" : `+${tradeReward} pts`}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              {tradeCompleted ? "Bonus credited" : `Trade min $${minTrade} within ${tradeDeadlineDays} days`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteCodeProgress;

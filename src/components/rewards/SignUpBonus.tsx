import { CheckCircle, Circle, Gift } from "lucide-react";

interface SignUpBonusProps {
  tasks: { label: string; done: boolean }[];
}

const SignUpBonus = ({ tasks }: SignUpBonusProps) => {
  const completed = tasks.filter(t => t.done).length;
  const total = tasks.length;
  const allDone = completed === total;

  return (
    <div className="bg-gradient-to-br from-accent/15 to-primary/10 border border-accent/20 rounded-2xl p-5 mb-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-accent" />
          <p className="text-sm font-bold text-foreground">Sign-Up Bonus</p>
        </div>
        <span className="text-xs font-bold text-accent">$5 USDT</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full mb-3 overflow-hidden">
        <div
          className="h-2 bg-accent rounded-full transition-all"
          style={{ width: `${(completed / total) * 100}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mb-3">{completed}/{total} tasks completed</p>
      <div className="space-y-2">
        {tasks.map((t, i) => (
          <div key={i} className="flex items-center gap-2.5">
            {t.done ? (
              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            )}
            <span className={`text-xs ${t.done ? "text-foreground line-through opacity-60" : "text-foreground"}`}>{t.label}</span>
          </div>
        ))}
      </div>
      {allDone && (
        <div className="mt-3 bg-accent/20 rounded-lg p-2 text-center">
          <p className="text-xs font-semibold text-accent">🎉 $5 USDT credited to your wallet!</p>
        </div>
      )}
    </div>
  );
};

export default SignUpBonus;

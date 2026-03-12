import { Clock } from "lucide-react";

export interface Redemption {
  id: number;
  points: number;
  cash: string;
  status: "Approved" | "Processing" | "Rejected";
  date: string;
  account: string;
}

interface RedemptionHistoryProps {
  history: Redemption[];
}

const statusStyles: Record<string, string> = {
  Approved: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]",
  Processing: "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]",
  Rejected: "bg-destructive/20 text-destructive",
};

const RedemptionHistory = ({ history }: RedemptionHistoryProps) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">No redemptions yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {history.map(r => (
        <div key={r.id} className="bg-card border border-border rounded-xl px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">{r.points} pts → {r.cash}</p>
            <p className="text-xs text-muted-foreground">{r.date} • {r.account}</p>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyles[r.status] || ""}`}>
            {r.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RedemptionHistory;

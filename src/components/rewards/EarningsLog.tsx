import { useState } from "react";
import { Filter, Clock } from "lucide-react";

export interface EarningEntry {
  id: number;
  source: string;
  category: "referral" | "streak" | "signup" | "cashback" | "trade" | "login";
  points: number;
  date: string;
  period: "today" | "week" | "all";
}

interface EarningsLogProps {
  entries: EarningEntry[];
}

const categoryColors: Record<string, string> = {
  referral: "bg-primary/20 text-primary",
  streak: "bg-[hsl(var(--deex-orange))]/20 text-[hsl(var(--deex-orange))]",
  signup: "bg-accent/20 text-accent",
  cashback: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]",
  trade: "bg-[hsl(var(--deex-purple))]/20 text-[hsl(var(--deex-purple))]",
  login: "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]",
};

const EarningsLog = ({ entries }: EarningsLogProps) => {
  const [filter, setFilter] = useState<"all" | "today" | "week">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filtered = entries.filter(e => {
    const periodMatch = filter === "all" || e.period === filter;
    const catMatch = categoryFilter === "all" || e.category === categoryFilter;
    return periodMatch && catMatch;
  });

  const categories = ["all", "referral", "streak", "signup", "cashback", "trade"];

  return (
    <div>
      {/* Time filter */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex bg-secondary rounded-full p-0.5 flex-1">
          {(["all", "today", "week"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`flex-1 py-1.5 rounded-full text-[10px] font-medium capitalize transition-colors ${filter === f ? "bg-muted text-foreground" : "text-muted-foreground"}`}>
              {f === "all" ? "All Time" : f === "today" ? "Today" : "This Week"}
            </button>
          ))}
        </div>
      </div>

      {/* Category chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-3 no-scrollbar">
        {categories.map(c => (
          <button key={c} onClick={() => setCategoryFilter(c)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-medium whitespace-nowrap transition-colors ${categoryFilter === c ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
            {c === "all" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {/* Entries */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">No earnings found</p>
          </div>
        ) : (
          filtered.map(e => (
            <div key={e.id} className="bg-card border border-border rounded-xl px-4 py-3 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-medium text-foreground">{e.source}</p>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${categoryColors[e.category] || "bg-muted text-muted-foreground"}`}>
                    {e.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{e.date} • ≈ ₦{(e.points * 10).toLocaleString()}</p>
              </div>
              <span className="text-sm font-bold text-[hsl(var(--success))]">+{e.points} pts</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EarningsLog;

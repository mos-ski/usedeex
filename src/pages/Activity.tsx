import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Search } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import BottomNav from "@/components/layout/BottomNav";
import PageTransition from "@/components/PageTransition";
import EmptyState from "@/components/EmptyState";

const transactions = [
  { id: 1, type: "Sold BTC", date: "Mar 8, 2:30 PM", status: "Completed", amount: "₦450,000", category: "crypto", month: "March 2026" },
  { id: 2, type: "Apple Gift Card", date: "Mar 8, 1:00 PM", status: "Completed", amount: "₦75,000", category: "giftcards", month: "March 2026" },
  { id: 3, type: "Airtime - MTN", date: "Mar 7, 11:15 AM", status: "Completed", amount: "₦2,000", category: "crypto", month: "March 2026" },
  { id: 4, type: "Sold ETH", date: "Mar 6, 4:20 PM", status: "Pending", amount: "₦125,000", category: "crypto", month: "March 2026" },
  { id: 5, type: "Google Play Card", date: "Mar 5", status: "Pending", amount: "₦25,000", category: "giftcards", month: "March 2026" },
  { id: 6, type: "Electricity Bill", date: "Mar 4", status: "Completed", amount: "₦15,000", category: "crypto", month: "March 2026" },
  { id: 7, type: "Sold USDT", date: "Feb 28", status: "Completed", amount: "₦780,000", category: "crypto", month: "February 2026" },
  { id: 8, type: "Amazon Gift Card", date: "Feb 25", status: "Completed", amount: "₦120,000", category: "giftcards", month: "February 2026" },
];

const ActivityPage = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [filter, setFilter] = useState<"all" | "crypto" | "giftcards">("all");
  const [hashSearch, setHashSearch] = useState("");

  const filtered = transactions.filter((tx) => filter === "all" || tx.category === filter);
  const grouped = filtered.reduce<Record<string, typeof transactions>>((acc, tx) => {
    (acc[tx.month] = acc[tx.month] || []).push(tx);
    return acc;
  }, {});

  return (
    <MobileLayout>
      <PageTransition>
        <div className="px-4 pt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Activity</h2>

          <div className="bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl p-5 mb-4 border border-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">Total Payout</span>
              <button onClick={() => setShowBalance(!showBalance)}>
                {showBalance ? <Eye className="w-4 h-4 text-muted-foreground" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
              </button>
            </div>
            <p className="text-3xl font-bold text-foreground">{showBalance ? "₦1,592,000" : "••••••"}</p>
          </div>

          <div className="flex gap-2 mb-4">
            {(["all", "crypto", "giftcards"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-full text-sm capitalize ${filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                {f === "giftcards" ? "Gift Cards" : f === "all" ? "All" : "Crypto"}
              </button>
            ))}
          </div>

          {Object.keys(grouped).length === 0 ? (
            <EmptyState title="No transactions yet" description="Your transactions will appear here once you start trading" />
          ) : (
            <div className="space-y-4 mb-4">
              {Object.entries(grouped).map(([month, txns]) => (
                <div key={month}>
                  <p className="text-xs text-muted-foreground mb-2 font-medium">{month}</p>
                  <div className="space-y-2">
                    {txns.map((tx) => (
                      <button key={tx.id} onClick={() => navigate("/receipt")} className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-3">
                        <div className="text-left"><p className="text-sm font-medium text-foreground">{tx.type}</p><p className="text-xs text-muted-foreground">{tx.date}</p></div>
                        <div className="text-right"><p className="text-sm font-semibold text-foreground">{tx.amount}</p><p className={`text-xs ${tx.status === "Completed" ? "text-success" : "text-warning"}`}>{tx.status}</p></div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={hashSearch} onChange={(e) => setHashSearch(e.target.value)} placeholder="Find with Hash ID"
              className="w-full h-12 bg-secondary rounded-xl pl-10 pr-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileLayout>
  );
};

export default ActivityPage;

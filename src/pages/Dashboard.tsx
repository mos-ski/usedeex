import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Eye, EyeOff, ArrowDownLeft, CreditCard, Send, Smartphone, Wifi, Zap, Gamepad2, TrendingUp, ArrowLeftRight, Phone } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import BottomNav from "@/components/layout/BottomNav";

const cryptoRates = [
  { name: "Bitcoin", symbol: "BTC", rate: "₦97,450,000", change: "+2.4%", up: true },
  { name: "Ethereum", symbol: "ETH", rate: "₦5,830,000", change: "+1.8%", up: true },
];

const recentTxns = [
  { id: 1, type: "Sold BTC", amount: "₦450,000", date: "Today, 2:30 PM", status: "Completed" },
  { id: 2, type: "Airtime Purchase", amount: "₦2,000", date: "Today, 11:15 AM", status: "Completed" },
  { id: 3, type: "Sold ETH", amount: "₦125,000", date: "Yesterday", status: "Pending" },
  { id: 4, type: "Electricity Bill", amount: "₦15,000", date: "Mar 5", status: "Completed" },
];

const giftCardTxns = [
  { id: 1, brand: "APPLE", amount: "$4,020.00", date: "Jul 12th, 2024", status: "Pending" },
  { id: 2, brand: "GOOGLE PLAY", amount: "$100.00", date: "Sep 5th, 2023", status: "Pending" },
  { id: 3, brand: "GOOGLE PLAY", amount: "$100.00", date: "Sep 5th, 2023", status: "Pending" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"crypto" | "giftcards">("crypto");
  const [showBalance, setShowBalance] = useState(true);

  return (
    <MobileLayout>
      <div className="px-4 pt-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate("/profile")} className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            JD
          </button>
          <div className="flex bg-secondary rounded-full p-1">
            <button
              onClick={() => setActiveTab("crypto")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "crypto" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
            >
              Crypto
            </button>
            <button
              onClick={() => setActiveTab("giftcards")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "giftcards" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
            >
              Gift cards
            </button>
          </div>
          <button onClick={() => navigate("/notifications")} className="relative w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
            <div className="absolute top-1 right-1 w-3 h-3 bg-warning rounded-full border-2 border-background" />
          </button>
        </div>

        {/* Balance Card */}
        <div className="bg-card rounded-2xl p-5 mb-6 border border-border">
          <p className="text-xs text-muted-foreground tracking-widest text-center mb-2">TOTAL BALANCE</p>
          <div className="flex items-center justify-center gap-2 mb-1">
            <p className="text-3xl font-bold text-foreground">
              {showBalance ? "$12,450.80" : "••••••"}
            </p>
            <button onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? <EyeOff className="w-5 h-5 text-muted-foreground" /> : <Eye className="w-5 h-5 text-muted-foreground" />}
            </button>
          </div>
          <p className="text-sm text-warning text-center">
            {showBalance ? "NGN 19,121,228.00" : "••••••"}
          </p>
          <div className="h-px bg-border my-4" />

          {activeTab === "crypto" ? (
            <div className="flex gap-3">
              <button onClick={() => navigate("/deposit")} className="flex-1 bg-secondary rounded-xl py-3 flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                  <ArrowDownLeft className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs text-foreground font-medium">Deposit</span>
              </button>
              <button onClick={() => navigate("/deex-pay")} className="flex-1 bg-secondary rounded-xl py-3 flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-accent" />
                </div>
                <span className="text-xs text-foreground font-medium">DeeX Pay</span>
              </button>
              <button onClick={() => navigate("/sell-crypto")} className="flex-1 bg-secondary rounded-xl py-3 flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center">
                  <Send className="w-5 h-5 text-success" />
                </div>
                <span className="text-xs text-foreground font-medium">Sell Crypto</span>
              </button>
            </div>
          ) : (
            <button onClick={() => navigate("/giftcards")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold flex items-center justify-center gap-2">
              <ArrowLeftRight className="w-5 h-5" />
              Sell Giftcards
            </button>
          )}
        </div>

        {activeTab === "crypto" ? (
          <>
            {/* Exchange Rates */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">Today's Rates</h3>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                {cryptoRates.map((c) => (
                  <div key={c.symbol} className="flex items-center justify-between bg-secondary rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center text-xs font-bold text-warning">
                        {c.symbol.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{c.rate}</p>
                      <p className={`text-xs ${c.up ? "text-success" : "text-destructive"}`}>{c.change}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bill Payment */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Bill Payment</h3>
              <div className="flex gap-3">
                {[
                  { icon: Smartphone, label: "Airtime", path: "/bills/airtime" },
                  { icon: Wifi, label: "Data", path: "/bills/data" },
                  { icon: Zap, label: "Electricity", path: "/bills/electricity" },
                  { icon: Gamepad2, label: "Betting", path: "/bills/betting" },
                ].map((b) => (
                  <button key={b.label} onClick={() => navigate(b.path)} className="flex-1 bg-secondary rounded-xl py-3 flex flex-col items-center gap-1.5">
                    <b.icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">{b.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">Recent Transactions</h3>
                <button onClick={() => navigate("/activity")} className="text-xs text-primary">See all</button>
              </div>
              <div className="space-y-2">
                {recentTxns.map((tx) => (
                  <button key={tx.id} onClick={() => navigate("/receipt")} className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-3">
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">{tx.type}</p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">{tx.amount}</p>
                      <p className={`text-xs ${tx.status === "Completed" ? "text-success" : "text-warning"}`}>{tx.status}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Gift Cards Recent */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">Recent transactions</h3>
                <button onClick={() => navigate("/activity")} className="text-xs text-primary">See all</button>
              </div>
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                {giftCardTxns.map((tx, i) => (
                  <div key={tx.id}>
                    <button onClick={() => navigate("/receipt")} className="w-full flex items-center justify-between px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-warning" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-foreground">{tx.brand}</p>
                          <p className="text-xs text-muted-foreground">{tx.date} • <span className="text-warning">{tx.status}</span></p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-foreground">{tx.amount}</p>
                    </button>
                    {i < giftCardTxns.length - 1 && <div className="mx-4 h-px bg-border" />}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <BottomNav />
    </MobileLayout>
  );
};

export default Dashboard;

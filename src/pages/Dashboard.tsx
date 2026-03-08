import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Eye, EyeOff, ArrowDownLeft, Send, TrendingUp, ArrowLeftRight, CreditCard, Phone, Wifi, Zap, Gamepad2, Wallet } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import BottomNav from "@/components/layout/BottomNav";
import PageTransition from "@/components/PageTransition";
import CryptoIcon from "@/components/CryptoIcon";
import ProviderIcon from "@/components/ProviderIcon";
import NewBadge from "@/components/NewBadge";

const cryptoRates = [
  { name: "Bitcoin", symbol: "BTC", rate: "₦97,450,000", change: "+2.4%" },
  { name: "Ethereum", symbol: "ETH", rate: "₦5,830,000", change: "+1.8%" },
  { name: "USDT", symbol: "USDT", rate: "₦1,535", change: "+0.1%" },
  { name: "USDC", symbol: "USDC", rate: "₦1,530", change: "+0.05%" },
  { name: "Solana", symbol: "SOL", rate: "₦231,000", change: "+5.2%" },
  { name: "BNB", symbol: "BNB", rate: "₦920,000", change: "-0.3%" },
  { name: "Tron", symbol: "TRX", rate: "₦215", change: "+1.1%" },
];

const recentTxns = [
  { id: 1, type: "Sold BTC", symbol: "BTC", amount: "₦450,000", date: "Today, 2:30 PM", status: "Completed", icon: "sell" },
  { id: 2, type: "Airtime - MTN", symbol: "MTN", amount: "₦2,000", date: "Today, 11:15 AM", status: "Completed", icon: "bill", phone: "08103674006" },
  { id: 3, type: "Sold ETH", symbol: "ETH", amount: "₦125,000", date: "Yesterday", status: "Pending", icon: "sell" },
  { id: 4, type: "Electricity - IKEDC", symbol: "IKEDC", amount: "₦15,000", date: "Mar 5", status: "Completed", icon: "bill" },
];

const giftCardTxns = [
  { id: 1, brand: "APPLE", amount: "$4,020.00", date: "Jul 12th, 2024", status: "Pending" },
  { id: 2, brand: "GOOGLE PLAY", amount: "$100.00", date: "Sep 5th, 2023", status: "Pending" },
  { id: 3, brand: "GOOGLE PLAY", amount: "$100.00", date: "Sep 5th, 2023", status: "Pending" },
];

const giftBrandMap: Record<string, string> = { "APPLE": "Apple", "GOOGLE PLAY": "Google Play" };

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

const RatesTicker = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animFrame: number;
    let pos = 0;
    const animate = () => { pos += 0.5; if (pos >= el.scrollWidth / 2) pos = 0; el.scrollLeft = pos; animFrame = requestAnimationFrame(animate); };
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, []);
  const duplicated = [...cryptoRates, ...cryptoRates];
  return (
    <div ref={scrollRef} className="overflow-hidden whitespace-nowrap mb-6">
      <div className="inline-flex gap-3">
        {duplicated.map((c, i) => (
          <div key={`${c.symbol}-${i}`} className="inline-flex items-center gap-2 bg-secondary rounded-full px-3 py-1.5 shrink-0">
            <CryptoIcon symbol={c.symbol} size="sm" />
            <span className="text-xs font-semibold text-foreground">{c.symbol}</span>
            <span className="text-xs text-muted-foreground">{c.rate}</span>
            <span className={`text-xs font-medium ${c.change.startsWith("+") ? "text-success" : "text-destructive"}`}>{c.change}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"crypto" | "giftcards">("crypto");
  const [showBalance, setShowBalance] = useState(true);

  return (
    <MobileLayout>
      <PageTransition>
        <div className="px-4 pt-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => navigate("/profile")} className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">JD</button>
            <div className="flex bg-secondary rounded-full p-1">
              <button onClick={() => setActiveTab("crypto")} className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "crypto" ? "bg-muted text-foreground" : "text-muted-foreground"}`}>Crypto</button>
              <button onClick={() => setActiveTab("giftcards")} className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "giftcards" ? "bg-muted text-foreground" : "text-muted-foreground"}`}>Gift cards</button>
            </div>
            <button onClick={() => navigate("/notifications")} className="relative w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
              <div className="absolute top-1 right-1 w-3 h-3 bg-warning rounded-full border-2 border-background" />
            </button>
          </div>

          {/* Greeting */}
          <p className="text-sm text-muted-foreground mb-4">{getGreeting()}, <span className="text-foreground font-medium">John</span> 👋</p>

          {/* Balance Card */}
          <div className="bg-card rounded-2xl p-5 mb-6 border border-border">
            <p className="text-xs text-muted-foreground tracking-widest text-center mb-2">TOTAL BALANCE</p>
            <div className="flex items-center justify-center gap-2 mb-1">
              <p className="text-3xl font-bold text-foreground">{showBalance ? "$12,450.80" : "••••••"}</p>
              <button onClick={() => setShowBalance(!showBalance)}>
                {showBalance ? <EyeOff className="w-5 h-5 text-muted-foreground" /> : <Eye className="w-5 h-5 text-muted-foreground" />}
              </button>
            </div>
            <p className="text-sm text-warning text-center">{showBalance ? "NGN 19,121,228.00" : "••••••"}</p>
            <div className="h-px bg-border my-4" />

            {activeTab === "crypto" ? (
              <div className="grid grid-cols-4 gap-2">
                <button onClick={() => navigate("/deposit")} className="bg-secondary rounded-xl py-3 flex flex-col items-center gap-1.5">
                  <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center"><ArrowDownLeft className="w-4 h-4 text-primary" /></div>
                  <span className="text-[10px] text-foreground font-medium">Deposit</span>
                </button>
                <button onClick={() => navigate("/sell-crypto")} className="bg-secondary rounded-xl py-3 flex flex-col items-center gap-1.5">
                  <div className="w-9 h-9 rounded-full bg-success/15 flex items-center justify-center"><Send className="w-4 h-4 text-success" /></div>
                  <span className="text-[10px] text-foreground font-medium">Sell</span>
                </button>
                <button onClick={() => navigate("/deex-pay")} className="bg-secondary rounded-xl py-3 flex flex-col items-center gap-1.5 relative">
                  <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center"><CreditCard className="w-4 h-4 text-accent" /></div>
                  <span className="text-[10px] text-foreground font-medium">DeeX Pay</span>
                  <NewBadge className="absolute -top-1 -right-1" />
                </button>
                <button onClick={() => navigate("/virtual-cards")} className="bg-secondary rounded-xl py-3 flex flex-col items-center gap-1.5 relative">
                  <div className="w-9 h-9 rounded-full bg-warning/15 flex items-center justify-center"><Wallet className="w-4 h-4 text-warning" /></div>
                  <span className="text-[10px] text-foreground font-medium">Cards</span>
                  <NewBadge className="absolute -top-1 -right-1" />
                </button>
              </div>
            ) : (
              <button onClick={() => navigate("/giftcards")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold flex items-center justify-center gap-2">
                <ArrowLeftRight className="w-5 h-5" /> Sell Giftcards
              </button>
            )}
          </div>

          {activeTab === "crypto" ? (
            <>
              <div className="mb-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">Today's Rates</h3>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
                <RatesTicker />
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Bill Payment</h3>
                <div className="flex gap-3">
                  {[
                    { label: "Airtime", path: "/bills/airtime", icon: Phone },
                    { label: "Data", path: "/bills/data", icon: Wifi },
                    { label: "Electricity", path: "/bills/electricity", icon: Zap },
                    { label: "Betting", path: "/bills/betting", icon: Gamepad2 },
                  ].map((b) => (
                    <button key={b.label} onClick={() => navigate(b.path)} className="flex-1 bg-secondary rounded-xl py-3 flex flex-col items-center gap-1.5">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <b.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{b.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">Recent Transactions</h3>
                  <button onClick={() => navigate("/activity")} className="text-xs text-primary">See all</button>
                </div>
                <div className="space-y-2">
                  {recentTxns.map((tx) => (
                    <button key={tx.id} onClick={() => navigate("/transaction-detail", { state: { tx } })} className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-3">
                      <div className="flex items-center gap-3">
                        {tx.icon === "sell" ? <CryptoIcon symbol={tx.symbol} size="md" /> : <ProviderIcon name={tx.symbol} size="md" />}
                        <div className="text-left">
                          <p className="text-sm font-medium text-foreground">{tx.type}</p>
                          <p className="text-xs text-muted-foreground">{tx.date}</p>
                        </div>
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
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">Recent transactions</h3>
                <button onClick={() => navigate("/activity")} className="text-xs text-primary">See all</button>
              </div>
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                {giftCardTxns.map((tx, i) => (
                  <div key={tx.id}>
                    <button onClick={() => navigate("/receipt", { state: { type: "giftcard", data: tx } })} className="w-full flex items-center justify-between px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <ProviderIcon name={giftBrandMap[tx.brand] || tx.brand} size="md" />
                        <div className="text-left"><p className="text-sm font-semibold text-foreground">{tx.brand}</p><p className="text-xs text-muted-foreground">{tx.date} • <span className="text-warning">{tx.status}</span></p></div>
                      </div>
                      <p className="text-sm font-medium text-foreground">{tx.amount}</p>
                    </button>
                    {i < giftCardTxns.length - 1 && <div className="mx-4 h-px bg-border" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </PageTransition>
      <BottomNav />
    </MobileLayout>
  );
};

export default Dashboard;

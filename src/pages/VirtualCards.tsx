import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, CreditCard, Snowflake, Play, Trash2, DollarSign, Eye, EyeOff, Shield, Copy, Settings, ChevronRight, AlertTriangle, Check } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import NewBadge from "@/components/NewBadge";
import { toast } from "sonner";

type CardStatus = "active" | "frozen";
type View = "list" | "create" | "detail" | "fund" | "limits";

interface VCard {
  id: number;
  last4: string;
  label: string;
  balance: string;
  balanceNum: number;
  status: CardStatus;
  created: string;
  dailyLimit: number;
  monthlyLimit: number;
  transactions: { desc: string; amount: string; date: string; type: "debit" | "credit" }[];
}

const mockCards: VCard[] = [
  {
    id: 1, last4: "4291", label: "Shopping Card", balance: "$245.80", balanceNum: 245.80, status: "active", created: "Feb 15, 2026",
    dailyLimit: 500, monthlyLimit: 5000,
    transactions: [
      { desc: "Netflix Subscription", amount: "-$15.99", date: "Mar 7, 2026", type: "debit" },
      { desc: "Funded Card", amount: "+$100.00", date: "Mar 5, 2026", type: "credit" },
      { desc: "Amazon Purchase", amount: "-$34.21", date: "Mar 3, 2026", type: "debit" },
      { desc: "Spotify Premium", amount: "-$9.99", date: "Mar 1, 2026", type: "debit" },
    ]
  },
  {
    id: 2, last4: "8173", label: "Subscriptions", balance: "$52.10", balanceNum: 52.10, status: "frozen", created: "Jan 20, 2026",
    dailyLimit: 200, monthlyLimit: 1000,
    transactions: [
      { desc: "Card Frozen", amount: "$0.00", date: "Feb 28, 2026", type: "debit" },
      { desc: "ChatGPT Plus", amount: "-$20.00", date: "Feb 25, 2026", type: "debit" },
    ]
  },
];

const VirtualCards = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("list");
  const [cards, setCards] = useState(mockCards);
  const [selectedCard, setSelectedCard] = useState<VCard | null>(null);
  const [showNumber, setShowNumber] = useState(false);
  const [fundAmount, setFundAmount] = useState("");
  const [fundSource, setFundSource] = useState("USDT");
  const [createLabel, setCreateLabel] = useState("");
  const [dailyLimit, setDailyLimit] = useState("");
  const [monthlyLimit, setMonthlyLimit] = useState("");

  const kycLevel = 2; // mock; must be >= 2
  const maxCards = 3;
  const creationFee = 2; // $2

  const toggleFreeze = (id: number) => {
    setCards(cards.map(c => c.id === id ? { ...c, status: c.status === "active" ? "frozen" as CardStatus : "active" as CardStatus } : c));
    const card = cards.find(c => c.id === id);
    toast.success(card?.status === "active" ? "Card frozen" : "Card unfrozen");
    if (selectedCard?.id === id) setSelectedCard({ ...selectedCard, status: selectedCard.status === "active" ? "frozen" : "active" });
  };

  const deleteCard = (id: number) => {
    setCards(cards.filter(c => c.id !== id));
    toast.success("Card deleted");
    setView("list");
    setSelectedCard(null);
  };

  // LIST VIEW
  if (view === "list") {
    return (
      <MobileLayout hideNav><PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">Virtual Cards</h2>
            <NewBadge />
          </div>

          {kycLevel < 2 && (
            <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 mb-5 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">KYC Level 2 Required</p>
                <p className="text-xs text-muted-foreground mb-2">You need at least KYC Level 2 to create a virtual card.</p>
                <button onClick={() => navigate("/kyc")} className="text-xs text-primary font-medium">Complete KYC →</button>
              </div>
            </div>
          )}

          <div className="bg-card border border-border rounded-xl p-4 mb-5">
            <div className="flex items-center gap-2 mb-1">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Visa Virtual Card • USD</span>
            </div>
            <p className="text-xs text-muted-foreground">{cards.length}/{maxCards} cards created • ${creationFee} per card</p>
          </div>

          {cards.length === 0 ? (
            <div className="flex flex-col items-center py-12">
              <CreditCard className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <p className="text-sm text-muted-foreground mb-1">No virtual cards yet</p>
              <p className="text-xs text-muted-foreground">Create your first card to start spending</p>
            </div>
          ) : (
            <div className="space-y-3 mb-6">
              {cards.map(card => (
                <button key={card.id} onClick={() => { setSelectedCard(card); setView("detail"); }}
                  className="w-full bg-gradient-to-br from-card to-secondary border border-border rounded-2xl p-5 text-left relative overflow-hidden">
                  <div className="absolute top-3 right-3">
                    {card.status === "frozen" && <span className="text-[10px] bg-info/20 text-info px-2 py-0.5 rounded-full flex items-center gap-1"><Snowflake className="w-3 h-3" /> Frozen</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{card.label}</p>
                  <p className="text-lg font-bold text-foreground mb-3">{card.balance}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground font-mono">•••• •••• •••• {card.last4}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-muted-foreground font-bold tracking-wider">VISA</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {cards.length < maxCards && kycLevel >= 2 && (
            <button onClick={() => setView("create")} className="w-full h-14 bg-primary rounded-xl text-primary-foreground font-semibold flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" /> Create New Card ($2)
            </button>
          )}
        </div>
      </PageTransition></MobileLayout>
    );
  }

  // CREATE VIEW
  if (view === "create") {
    return (
      <MobileLayout hideNav><PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setView("list")} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">Create Virtual Card</h2>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 mb-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center"><CreditCard className="w-6 h-6 text-primary" /></div>
              <div>
                <p className="text-sm font-semibold text-foreground">Visa Virtual Card</p>
                <p className="text-xs text-muted-foreground">USD denominated • International payments</p>
              </div>
            </div>
            <div className="bg-secondary rounded-xl p-3 flex justify-between text-xs">
              <span className="text-muted-foreground">Creation Fee</span>
              <span className="text-foreground font-semibold">${creationFee}.00</span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Card Label</label>
              <input value={createLabel} onChange={e => setCreateLabel(e.target.value)} placeholder="e.g. Shopping, Subscriptions"
                className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Deduct $2 from</label>
              <div className="flex gap-2">
                {["USDT", "BTC", "ETH"].map(s => (
                  <button key={s} onClick={() => setFundSource(s)}
                    className={`flex-1 h-12 rounded-xl text-sm font-medium border ${fundSource === s ? "border-primary bg-primary/10 text-primary" : "border-border bg-secondary text-muted-foreground"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-warning/10 rounded-xl p-3 flex items-start gap-2 mb-6">
            <Shield className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">$2.00 will be deducted from your {fundSource} wallet to create this card.</p>
          </div>

          <button onClick={() => {
            if (!createLabel) { toast.error("Please enter a card label"); return; }
            const newCard: VCard = {
              id: Date.now(), last4: String(Math.floor(1000 + Math.random() * 9000)), label: createLabel,
              balance: "$0.00", balanceNum: 0, status: "active", created: "Mar 8, 2026",
              dailyLimit: 500, monthlyLimit: 5000, transactions: []
            };
            setCards([...cards, newCard]);
            toast.success("Virtual card created!");
            setCreateLabel("");
            setView("list");
          }} className="w-full h-14 bg-primary rounded-xl text-primary-foreground font-semibold">
            Create Card
          </button>
        </div>
      </PageTransition></MobileLayout>
    );
  }

  // FUND VIEW
  if (view === "fund" && selectedCard) {
    return (
      <MobileLayout hideNav><PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setView("detail")} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">Fund Card</h2>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 mb-5">
            <p className="text-xs text-muted-foreground">{selectedCard.label}</p>
            <p className="text-lg font-bold text-foreground">{selectedCard.balance}</p>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Amount (USD)</label>
              <input value={fundAmount} onChange={e => setFundAmount(e.target.value)} placeholder="0.00" type="number"
                className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">From Wallet</label>
              <div className="flex gap-2">
                {["USDT", "BTC", "ETH"].map(s => (
                  <button key={s} onClick={() => setFundSource(s)}
                    className={`flex-1 h-12 rounded-xl text-sm font-medium border ${fundSource === s ? "border-primary bg-primary/10 text-primary" : "border-border bg-secondary text-muted-foreground"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={() => {
            if (!fundAmount || parseFloat(fundAmount) <= 0) { toast.error("Enter a valid amount"); return; }
            toast.success(`$${fundAmount} funded to card`);
            setFundAmount("");
            setView("detail");
          }} className="w-full h-14 bg-primary rounded-xl text-primary-foreground font-semibold">
            Fund Card
          </button>
        </div>
      </PageTransition></MobileLayout>
    );
  }

  // LIMITS VIEW
  if (view === "limits" && selectedCard) {
    return (
      <MobileLayout hideNav><PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setView("detail")} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">Spending Limits</h2>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Daily Limit (USD)</label>
              <input value={dailyLimit || String(selectedCard.dailyLimit)} onChange={e => setDailyLimit(e.target.value)} type="number"
                className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Monthly Limit (USD)</label>
              <input value={monthlyLimit || String(selectedCard.monthlyLimit)} onChange={e => setMonthlyLimit(e.target.value)} type="number"
                className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          <button onClick={() => { toast.success("Limits updated"); setView("detail"); }}
            className="w-full h-14 bg-primary rounded-xl text-primary-foreground font-semibold">
            Save Limits
          </button>
        </div>
      </PageTransition></MobileLayout>
    );
  }

  // DETAIL VIEW
  if (view === "detail" && selectedCard) {
    return (
      <MobileLayout hideNav><PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => { setView("list"); setShowNumber(false); }} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">{selectedCard.label}</h2>
          </div>

          {/* Card Visual */}
          <div className="bg-gradient-to-br from-primary/20 via-card to-accent/10 border border-border rounded-2xl p-6 mb-5 relative">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Balance</p>
                <p className="text-2xl font-bold text-foreground">{selectedCard.balance}</p>
              </div>
              <span className="text-sm font-bold text-muted-foreground tracking-widest">VISA</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <p className="text-sm text-foreground font-mono tracking-widest">
                {showNumber ? `4532 7891 2345 ${selectedCard.last4}` : `•••• •••• •••• ${selectedCard.last4}`}
              </p>
              <button onClick={() => setShowNumber(!showNumber)}>
                {showNumber ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
              </button>
              {showNumber && <button onClick={() => { navigator.clipboard.writeText(`4532789123456${selectedCard.last4}`); toast.success("Copied"); }}><Copy className="w-4 h-4 text-muted-foreground" /></button>}
            </div>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <div><p className="text-[10px]">EXPIRY</p><p className="text-foreground">03/29</p></div>
              <div><p className="text-[10px]">CVV</p><p className="text-foreground">{showNumber ? "412" : "***"}</p></div>
            </div>
            {selectedCard.status === "frozen" && (
              <div className="absolute inset-0 bg-background/60 rounded-2xl flex items-center justify-center">
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border">
                  <Snowflake className="w-4 h-4 text-info" /><span className="text-sm font-medium text-foreground">Card Frozen</span>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            <button onClick={() => setView("fund")} className="bg-secondary rounded-xl py-3 flex flex-col items-center gap-1.5">
              <DollarSign className="w-5 h-5 text-primary" /><span className="text-[10px] text-foreground">Fund</span>
            </button>
            <button onClick={() => toggleFreeze(selectedCard.id)} className="bg-secondary rounded-xl py-3 flex flex-col items-center gap-1.5">
              {selectedCard.status === "active" ? <Snowflake className="w-5 h-5 text-info" /> : <Play className="w-5 h-5 text-success" />}
              <span className="text-[10px] text-foreground">{selectedCard.status === "active" ? "Freeze" : "Unfreeze"}</span>
            </button>
            <button onClick={() => setView("limits")} className="bg-secondary rounded-xl py-3 flex flex-col items-center gap-1.5">
              <Settings className="w-5 h-5 text-muted-foreground" /><span className="text-[10px] text-foreground">Limits</span>
            </button>
            <button onClick={() => deleteCard(selectedCard.id)} className="bg-secondary rounded-xl py-3 flex flex-col items-center gap-1.5">
              <Trash2 className="w-5 h-5 text-destructive" /><span className="text-[10px] text-foreground">Delete</span>
            </button>
          </div>

          {/* Limits info */}
          <div className="bg-card border border-border rounded-xl p-4 mb-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">Spending Limits</p>
              <button onClick={() => setView("limits")} className="text-xs text-primary">Edit</button>
            </div>
            <div className="flex gap-4">
              <div><p className="text-[10px] text-muted-foreground">Daily</p><p className="text-sm font-medium text-foreground">${selectedCard.dailyLimit}</p></div>
              <div><p className="text-[10px] text-muted-foreground">Monthly</p><p className="text-sm font-medium text-foreground">${selectedCard.monthlyLimit}</p></div>
            </div>
          </div>

          {/* Transactions */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Transactions</h3>
          </div>
          {selectedCard.transactions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No transactions yet</p>
          ) : (
            <div className="bg-card border border-border rounded-xl overflow-hidden mb-6">
              {selectedCard.transactions.map((tx, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between px-4 py-3">
                    <div>
                      <p className="text-sm text-foreground">{tx.desc}</p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                    <p className={`text-sm font-medium ${tx.type === "credit" ? "text-success" : "text-foreground"}`}>{tx.amount}</p>
                  </div>
                  {i < selectedCard.transactions.length - 1 && <div className="mx-4 h-px bg-border" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </PageTransition></MobileLayout>
    );
  }

  return null;
};

export default VirtualCards;

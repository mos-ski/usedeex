import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ChevronRight } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import BottomNav from "@/components/layout/BottomNav";
import PageTransition from "@/components/PageTransition";
import CryptoIcon from "@/components/CryptoIcon";

const assets = [
  { symbol: "BTC", name: "Bitcoin", balance: "0.0234", value: "$2,280.12" },
  { symbol: "USDT", name: "Tether", balance: "5,420.00", value: "$5,420.00" },
  { symbol: "USDC", name: "USD Coin", balance: "2,100.00", value: "$2,100.00" },
  { symbol: "SOL", name: "Solana", balance: "12.50", value: "$1,875.00" },
  { symbol: "ETH", name: "Ethereum", balance: "0.15", value: "$487.50" },
  { symbol: "TRX", name: "Tron", balance: "1,200.00", value: "$168.00" },
  { symbol: "DOGE", name: "Dogecoin", balance: "500.00", value: "$120.18" },
];

const Wallet = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [cardIndex, setCardIndex] = useState(0);
  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) setCardIndex(diff > 0 ? 1 : 0);
  };

  return (
    <MobileLayout>
      <PageTransition>
        <div className="px-4 pt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Wallet</h2>

          <div className="bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl p-5 mb-6 border border-border overflow-hidden"
            onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">{cardIndex === 0 ? "Holdings" : "Rewards Earned"}</span>
              <button onClick={() => setShowBalance(!showBalance)}>
                {showBalance ? <Eye className="w-4 h-4 text-muted-foreground" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
              </button>
            </div>
            {cardIndex === 0 ? (
              <>
                <p className="text-3xl font-bold text-foreground">{showBalance ? "$12,450.80" : "••••••"}</p>
                <p className="text-sm text-muted-foreground mt-1">{showBalance ? "≈ NGN 19,121,228" : "••••••"}</p>
              </>
            ) : (
              <>
                <p className="text-3xl font-bold text-primary">{showBalance ? "2,450 pts" : "••••••"}</p>
                <p className="text-sm text-success mt-1">{showBalance ? "≈ ₦24,500" : "••••••"}</p>
                <button onClick={() => navigate("/rewards")} className="mt-3 px-4 py-1.5 bg-primary/15 rounded-full text-xs text-primary font-medium">Redeem Points →</button>
              </>
            )}
            <div className="flex gap-1 mt-3 justify-center">
              <div className={`w-2 h-2 rounded-full transition-colors ${cardIndex === 0 ? "bg-primary" : "bg-muted"}`} />
              <div className={`w-2 h-2 rounded-full transition-colors ${cardIndex === 1 ? "bg-primary" : "bg-muted"}`} />
            </div>
          </div>

          <h3 className="text-sm font-semibold text-foreground mb-3">Assets</h3>
          <div className="space-y-2">
            {assets.map((asset) => (
              <button key={asset.symbol} onClick={() => navigate(`/asset/${asset.symbol.toLowerCase()}`)}
                className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <CryptoIcon symbol={asset.symbol} />
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">{asset.name}</p>
                    <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{showBalance ? asset.balance : "••••"}</p>
                    <p className="text-xs text-muted-foreground">{showBalance ? asset.value : "••••"}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileLayout>
  );
};

export default Wallet;

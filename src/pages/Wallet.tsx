import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ChevronRight } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import BottomNav from "@/components/layout/BottomNav";

const assets = [
  { symbol: "BTC", name: "Bitcoin", balance: "0.0234", value: "$2,280.12", color: "bg-warning/20 text-warning" },
  { symbol: "USDT", name: "Tether", balance: "5,420.00", value: "$5,420.00", color: "bg-success/20 text-success" },
  { symbol: "USDC", name: "USD Coin", balance: "2,100.00", value: "$2,100.00", color: "bg-primary/20 text-primary" },
  { symbol: "SOL", name: "Solana", balance: "12.50", value: "$1,875.00", color: "bg-deex-purple/20 text-deex-purple" },
  { symbol: "ETH", name: "Ethereum", balance: "0.15", value: "$487.50", color: "bg-deex-blue/20 text-deex-blue" },
  { symbol: "TRX", name: "Tron", balance: "1,200.00", value: "$168.00", color: "bg-deex-red/20 text-deex-red" },
  { symbol: "DOGE", name: "Dogecoin", balance: "500.00", value: "$120.18", color: "bg-deex-orange/20 text-deex-orange" },
];

const Wallet = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  return (
    <MobileLayout>
      <div className="px-4 pt-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Wallet</h2>

        {/* Holdings Card */}
        <div className="bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl p-5 mb-6 border border-border">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-muted-foreground">Holdings</span>
            <button onClick={() => setShowBalance(!showBalance)}>
              {showBalance ? <Eye className="w-4 h-4 text-muted-foreground" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
            </button>
          </div>
          <p className="text-3xl font-bold text-foreground">
            {showBalance ? "$12,450.80" : "••••••"}
          </p>
          <div className="flex gap-1 mt-3 justify-center">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-2 h-2 rounded-full bg-muted" />
            <div className="w-2 h-2 rounded-full bg-muted" />
          </div>
        </div>

        {/* Assets */}
        <h3 className="text-sm font-semibold text-foreground mb-3">Assets</h3>
        <div className="space-y-2">
          {assets.map((asset) => (
            <button
              key={asset.symbol}
              onClick={() => navigate(`/asset/${asset.symbol.toLowerCase()}`)}
              className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${asset.color} flex items-center justify-center text-xs font-bold`}>
                  {asset.symbol.substring(0, 2)}
                </div>
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

        {/* Bottom Sheet */}
        {selectedAsset && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setSelectedAsset(null)}>
            <div className="w-full max-w-[430px] bg-card rounded-t-3xl p-6 animate-slide-up" onClick={(e) => e.stopPropagation()}>
              <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-6" />
              <h3 className="text-lg font-bold text-foreground mb-4">{selectedAsset} Actions</h3>
              <div className="space-y-2">
                {[
                  { label: "Sell Gift Cards", action: () => navigate("/giftcards") },
                  { label: "See Rates", action: () => {} },
                  { label: "Trade Crypto", action: () => navigate("/sell-crypto") },
                  { label: "Generate Statement", action: () => {} },
                  { label: "Open Reward", action: () => navigate("/rewards") },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={item.action}
                    className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-3.5"
                  >
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </MobileLayout>
  );
};

export default Wallet;

import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Info, Plus, ArrowUpRight, ArrowLeftRight, X, User, Clock } from "lucide-react";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";
import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import CryptoIcon from "@/components/CryptoIcon";
import NewBadge from "@/components/NewBadge";

const chartDataByAsset: Record<string, number[]> = {
  BTC: [67800, 67200, 66800, 67100, 66500, 66900, 66200, 66600, 65800, 66100, 66800, 67400, 67100, 67500, 67378],
  ETH: [3180, 3210, 3195, 3240, 3220, 3260, 3235, 3250, 3270, 3245, 3280, 3260, 3250, 3255, 3250],
  USDT: [1.000, 1.001, 0.999, 1.000, 1.001, 1.000, 0.999, 1.000, 1.001, 1.000, 1.000, 1.001, 1.000, 1.000, 1.000],
  USDC: [1.000, 1.000, 1.001, 1.000, 0.999, 1.000, 1.000, 1.001, 1.000, 1.000, 1.000, 1.000, 1.001, 1.000, 1.000],
  SOL: [142, 144, 143, 146, 148, 147, 149, 150, 148, 151, 149, 152, 150, 151, 150],
  TRX: [0.128, 0.130, 0.129, 0.131, 0.132, 0.130, 0.133, 0.135, 0.134, 0.136, 0.135, 0.137, 0.136, 0.140, 0.140],
  DOGE: [0.230, 0.232, 0.228, 0.235, 0.233, 0.238, 0.236, 0.240, 0.237, 0.242, 0.240, 0.238, 0.241, 0.240, 0.240],
};

const assetData: Record<string, { name: string; symbol: string; price: string; change: string; changeUsd: string; balance: string; chartColor: string }> = {
  BTC: { name: "Bitcoin", symbol: "BTC", price: "$ 67,378.3", change: "-0.90%", changeUsd: "$ -611.49", balance: "0.02340000 BTC", chartColor: "#EAB308" },
  ETH: { name: "Ethereum", symbol: "ETH", price: "$ 3,250.5", change: "+1.20%", changeUsd: "$ +38.50", balance: "0.15000000 ETH", chartColor: "#3B82F6" },
  USDT: { name: "Tether USD", symbol: "USDT", price: "$ 1.00", change: "+0.01%", changeUsd: "$ +0.01", balance: "5,420.00 USDT", chartColor: "#22C55E" },
  USDC: { name: "USD Coin", symbol: "USDC", price: "$ 1.00", change: "+0.00%", changeUsd: "$ +0.00", balance: "2,100.00 USDC", chartColor: "#3B82F6" },
  SOL: { name: "Solana", symbol: "SOL", price: "$ 150.2", change: "+3.50%", changeUsd: "$ +5.08", balance: "12.50000000 SOL", chartColor: "#8B5CF6" },
  TRX: { name: "Tron", symbol: "TRX", price: "$ 0.140", change: "+1.10%", changeUsd: "$ +0.002", balance: "1,200.00 TRX", chartColor: "#EF4444" },
  DOGE: { name: "Dogecoin", symbol: "DOGE", price: "$ 0.240", change: "+2.30%", changeUsd: "$ +0.005", balance: "500.00 DOGE", chartColor: "#F59E0B" },
};

const recentTxns = [
  { type: "BTC to USDT", date: "Apr 25th, 2024", status: "Completed", amount: "0.00001535 BTC", value: "$0.95" },
  { type: "USDT to BTC", date: "Apr 20th, 2024", status: "Completed", amount: "1.00 USDT", value: "$1.00" },
];

const pastAddresses = [
  { label: "Main Wallet", address: "0x742d35Cc...f2bD68", full: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD68" },
  { label: "Trading Wallet", address: "bc1qxy2kg...0wlh", full: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" },
];

const pastUsernames = [
  { label: "@adebayo", name: "Adebayo Ogunlesi" },
  { label: "@chioma_d", name: "Chioma Daniels" },
];

const timeframes = ["1D", "1W", "1M", "1Y", "All"];
const tourSteps = [
  { title: "Deposit", description: "Tap the Deposit button to receive crypto into your wallet. Select the network carefully." },
  { title: "Withdraw", description: "Send crypto to a DeeX user by username, or to an external wallet address. Past beneficiaries are saved." },
  { title: "Swap", description: "Instantly convert one crypto to another. Rates update in real time." },
];

type WithdrawView = "none" | "choose" | "username" | "address";

const AssetDetail = () => {
  const navigate = useNavigate();
  const { symbol } = useParams<{ symbol: string }>();
  const [activeTimeframe, setActiveTimeframe] = useState("1D");
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [withdrawView, setWithdrawView] = useState<WithdrawView>("none");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [withdrawUsername, setWithdrawUsername] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const key = symbol?.toUpperCase() || "BTC";
  const asset = assetData[key] || assetData.BTC;
  const isNegative = asset.change.startsWith("-");
  const rawData = chartDataByAsset[key] || chartDataByAsset.BTC;
  const chartData = rawData.map((v, i) => ({ t: String(i + 1), v }));

  // Withdraw modal
  const WithdrawSheet = () => {
    if (withdrawView === "none") return null;

    if (withdrawView === "choose") {
      return (
        <div className="fixed inset-0 bg-background/80 z-50 flex items-end justify-center" onClick={() => setWithdrawView("none")}>
          <div className="w-full max-w-[430px] bg-card rounded-t-2xl p-4 pb-8 border-t border-border" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Withdraw {key}</h3>
              <button onClick={() => setWithdrawView("none")} className="text-muted-foreground text-sm">Close</button>
            </div>
            <div className="space-y-2">
              <button onClick={() => setWithdrawView("username")} className="w-full flex items-center gap-3 bg-secondary rounded-xl px-4 py-3.5">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center"><User className="w-5 h-5 text-primary" /></div>
                <div className="text-left"><p className="text-sm font-medium text-foreground">To DeeX Username</p><p className="text-xs text-muted-foreground">Send to a DeeX user instantly</p></div>
              </button>
              <button onClick={() => setWithdrawView("address")} className="w-full flex items-center gap-3 bg-secondary rounded-xl px-4 py-3.5">
                <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center"><ArrowUpRight className="w-5 h-5 text-accent" /></div>
                <div className="text-left"><p className="text-sm font-medium text-foreground">To Wallet Address</p><p className="text-xs text-muted-foreground">Send to an external crypto wallet</p></div>
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (withdrawView === "username") {
      return (
        <div className="fixed inset-0 bg-background/80 z-50 flex items-end justify-center" onClick={() => setWithdrawView("none")}>
          <div className="w-full max-w-[430px] bg-card rounded-t-2xl p-4 pb-8 border-t border-border" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <button onClick={() => setWithdrawView("choose")} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-4 h-4 text-foreground" /></button>
              <h3 className="text-sm font-semibold text-foreground">Send to Username</h3>
            </div>
            {pastUsernames.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Recent</p>
                <div className="flex gap-2">
                  {pastUsernames.map(u => (
                    <button key={u.label} onClick={() => setWithdrawUsername(u.label)} className={`bg-secondary rounded-xl px-3 py-2 ${withdrawUsername === u.label ? "border border-primary" : "border border-transparent"}`}>
                      <p className="text-xs font-medium text-foreground">{u.label}</p>
                      <p className="text-[10px] text-muted-foreground">{u.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <input value={withdrawUsername} onChange={e => setWithdrawUsername(e.target.value)} placeholder="@username"
              className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary mb-3 text-sm" />
            <input value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} placeholder="Amount" type="number"
              className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary mb-4 text-sm" />
            <button onClick={() => { if (withdrawUsername && withdrawAmount) { setWithdrawView("none"); navigate("/receipt", { state: { type: "sell", data: { type: `Sent ${key}`, amount: `${withdrawAmount} ${key}`, destination: withdrawUsername, status: "Completed" } } }); } }}
              className={`w-full h-12 rounded-xl font-semibold ${withdrawUsername && withdrawAmount ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              Send {key}
            </button>
          </div>
        </div>
      );
    }

    // address view
    return (
      <div className="fixed inset-0 bg-background/80 z-50 flex items-end justify-center" onClick={() => setWithdrawView("none")}>
        <div className="w-full max-w-[430px] bg-card rounded-t-2xl p-4 pb-8 border-t border-border" onClick={e => e.stopPropagation()}>
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setWithdrawView("choose")} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-4 h-4 text-foreground" /></button>
            <h3 className="text-sm font-semibold text-foreground">Send to Address</h3>
          </div>
          {pastAddresses.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-2">Past Addresses</p>
              <div className="space-y-1.5">
                {pastAddresses.map(a => (
                  <button key={a.full} onClick={() => setWithdrawAddress(a.full)} className={`w-full bg-secondary rounded-xl px-3 py-2 text-left ${withdrawAddress === a.full ? "border border-primary" : "border border-transparent"}`}>
                    <p className="text-xs font-medium text-foreground">{a.label}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">{a.address}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
          <input value={withdrawAddress} onChange={e => setWithdrawAddress(e.target.value)} placeholder="Paste wallet address"
            className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary mb-3 text-sm font-mono" />
          <input value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} placeholder="Amount" type="number"
            className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary mb-4 text-sm" />
          <button onClick={() => { if (withdrawAddress && withdrawAmount) { setWithdrawView("none"); navigate("/receipt", { state: { type: "sell", data: { type: `Withdrew ${key}`, amount: `${withdrawAmount} ${key}`, destination: withdrawAddress.slice(0, 20) + "...", status: "Processing" } } }); } }}
            className={`w-full h-12 rounded-xl font-semibold ${withdrawAddress && withdrawAmount ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            Withdraw {key}
          </button>
        </div>
      </div>
    );
  };

  return (
    <MobileLayout hideNav>
      <PageTransition>
        <div className="pt-4">
          <div className="px-4 flex items-center justify-between mb-6">
            <button onClick={() => navigate(-1)}><ArrowLeft className="w-6 h-6 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">{asset.symbol}</h2>
            <button onClick={() => { setShowTour(true); setTourStep(0); }}><Info className="w-6 h-6 text-muted-foreground" /></button>
          </div>

          <div className="flex flex-col items-center mb-4 px-4">
            <CryptoIcon symbol={key} size="lg" className="mb-3" />
            <p className="text-sm text-muted-foreground">Current {asset.symbol} Price</p>
            <p className="text-3xl font-bold text-foreground">{asset.price}</p>
            <p className={`text-sm ${isNegative ? "text-destructive" : "text-success"}`}>
              {isNegative ? "▼" : "▲"} {asset.change} ({asset.changeUsd}) (24h)
            </p>
          </div>

          <div className="w-full h-48 mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="v" stroke={asset.chartColor} strokeWidth={2} dot={false} />
                <XAxis dataKey="t" hide />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-around px-4 mb-8">
            {timeframes.map((tf) => (
              <button key={tf} onClick={() => setActiveTimeframe(tf)}
                className={`text-sm px-3 py-1 ${activeTimeframe === tf ? "text-primary border-b-2 border-primary font-medium" : "text-muted-foreground"}`}>
                {tf}
              </button>
            ))}
          </div>

          <div className="mx-4 bg-card border border-border rounded-2xl p-5 mb-6">
            <p className="text-sm text-muted-foreground text-center mb-1">Total {asset.symbol} Balance</p>
            <p className="text-2xl font-bold text-foreground text-center mb-4">{asset.balance}</p>
            <div className="flex gap-3">
              <button onClick={() => navigate("/deposit")} className="flex-1 bg-primary/10 border border-primary/20 rounded-xl py-3 flex items-center justify-center gap-2">
                <Plus className="w-4 h-4 text-primary" /><span className="text-sm text-primary font-medium">Deposit</span>
              </button>
              <button onClick={() => setWithdrawView("choose")} className="flex-1 bg-primary/10 border border-primary/20 rounded-xl py-3 flex items-center justify-center gap-2 relative">
                <ArrowUpRight className="w-4 h-4 text-primary" /><span className="text-sm text-primary font-medium">Withdraw</span>
                <NewBadge className="absolute -top-1 -right-1" />
              </button>
              <button onClick={() => navigate("/swap-crypto")} className="flex-1 bg-primary/10 border border-primary/20 rounded-xl py-3 flex items-center justify-center gap-2">
                <ArrowLeftRight className="w-4 h-4 text-primary" /><span className="text-sm text-primary font-medium">Swap</span>
              </button>
            </div>
          </div>

          <div className="px-4 mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Recent transactions</h3>
              <button onClick={() => navigate("/activity")} className="text-xs text-primary">See all</button>
            </div>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {recentTxns.map((tx, i) => (
                <div key={i}>
                  <button onClick={() => navigate("/receipt", { state: { type: "swap", data: tx } })} className="w-full flex items-center justify-between px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <CryptoIcon symbol={key} />
                      <div className="text-left">
                        <p className="text-sm font-medium text-foreground">{tx.type}</p>
                        <p className="text-xs text-muted-foreground">{tx.date} • <span className="text-success">{tx.status}</span></p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{tx.amount}</p>
                      <p className="text-xs text-muted-foreground">{tx.value}</p>
                    </div>
                  </button>
                  {i < recentTxns.length - 1 && <div className="mx-4 h-px bg-border" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <WithdrawSheet />

        {showTour && (
          <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center px-6" onClick={() => setShowTour(false)}>
            <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-[380px]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-muted-foreground">Step {tourStep + 1} of {tourSteps.length}</span>
                <button onClick={() => setShowTour(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{tourSteps[tourStep].title}</h3>
              <p className="text-sm text-muted-foreground mb-6">{tourSteps[tourStep].description}</p>
              <div className="flex gap-3">
                {tourStep > 0 && (
                  <button onClick={() => setTourStep(tourStep - 1)} className="flex-1 h-10 border border-border rounded-xl text-foreground text-sm font-medium">Back</button>
                )}
                <button onClick={() => tourStep < tourSteps.length - 1 ? setTourStep(tourStep + 1) : setShowTour(false)}
                  className="flex-1 h-10 bg-primary rounded-xl text-primary-foreground text-sm font-semibold">
                  {tourStep < tourSteps.length - 1 ? "Next" : "Got it!"}
                </button>
              </div>
              <div className="flex gap-1 justify-center mt-4">
                {tourSteps.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i === tourStep ? "bg-primary" : "bg-muted"}`} />
                ))}
              </div>
            </div>
          </div>
        )}
      </PageTransition>
    </MobileLayout>
  );
};

export default AssetDetail;

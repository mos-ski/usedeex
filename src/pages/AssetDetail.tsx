import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, AlertCircle, Plus, ArrowUpRight, ArrowLeftRight } from "lucide-react";
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts";
import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";

const assetData: Record<string, { name: string; symbol: string; price: string; change: string; changeUsd: string; balance: string; color: string }> = {
  BTC: { name: "Bitcoin", symbol: "BTC", price: "$ 67,378.3", change: "-0.90%", changeUsd: "$ -611.49", balance: "0.00000000 BTC", color: "bg-warning text-background" },
  ETH: { name: "Ethereum", symbol: "ETH", price: "$ 3,250.5", change: "+1.20%", changeUsd: "$ +38.50", balance: "0.15000000 ETH", color: "bg-deex-blue text-background" },
  USDT: { name: "Tether USD", symbol: "USDT", price: "$ 1.00", change: "+0.01%", changeUsd: "$ +0.01", balance: "5,420.00 USDT", color: "bg-success text-background" },
  USDC: { name: "USD Coin", symbol: "USDC", price: "$ 1.00", change: "+0.00%", changeUsd: "$ +0.00", balance: "2,100.00 USDC", color: "bg-primary text-background" },
  SOL: { name: "Solana", symbol: "SOL", price: "$ 150.2", change: "+3.50%", changeUsd: "$ +5.08", balance: "12.50000000 SOL", color: "bg-deex-purple text-background" },
};

const chartData = [
  { t: "1", v: 67800 }, { t: "2", v: 67200 }, { t: "3", v: 66800 }, { t: "4", v: 67100 },
  { t: "5", v: 66500 }, { t: "6", v: 66900 }, { t: "7", v: 66200 }, { t: "8", v: 66600 },
  { t: "9", v: 65800 }, { t: "10", v: 66100 }, { t: "11", v: 66800 }, { t: "12", v: 67400 },
];

const recentTxns = [
  { type: "BTC to USDT", date: "Apr 25th, 2024", status: "Completed", amount: "0.00001535 BTC", value: "$0.95" },
  { type: "USDT to BTC", date: "Apr 20th, 2024", status: "Completed", amount: "1.00 USDT", value: "$1.00" },
];

const timeframes = ["1D", "1W", "1M", "1Y", "All"];

const AssetDetail = () => {
  const navigate = useNavigate();
  const { symbol } = useParams<{ symbol: string }>();
  const [activeTimeframe, setActiveTimeframe] = useState("1D");
  const asset = assetData[symbol?.toUpperCase() || "BTC"] || assetData.BTC;
  const isNegative = asset.change.startsWith("-");

  return (
    <MobileLayout hideNav>
      <div className="pt-4">
        {/* Header */}
        <div className="px-4 flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h2 className="text-lg font-bold text-foreground">{asset.symbol}</h2>
          <button>
            <AlertCircle className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>

        {/* Icon & Price */}
        <div className="flex flex-col items-center mb-4 px-4">
          <div className={`w-16 h-16 rounded-full ${asset.color} flex items-center justify-center text-lg font-bold mb-3`}>
            {asset.symbol.charAt(0)}
          </div>
          <p className="text-sm text-muted-foreground">Current {asset.symbol} Price</p>
          <p className="text-3xl font-bold text-foreground">{asset.price}</p>
          <p className={`text-sm ${isNegative ? "text-destructive" : "text-success"}`}>
            {isNegative ? "▼" : "▲"} {asset.change} ({asset.changeUsd}) (24h)
          </p>
        </div>

        {/* Chart */}
        <div className="w-full h-48 mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="v" stroke="hsl(213, 80%, 55%)" strokeWidth={2} dot={false} />
              <XAxis dataKey="t" hide />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Timeframe tabs */}
        <div className="flex justify-around px-4 mb-8">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              className={`text-sm px-3 py-1 ${activeTimeframe === tf ? "text-primary border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Balance card */}
        <div className="mx-4 bg-card border border-border rounded-2xl p-5 mb-6">
          <p className="text-sm text-muted-foreground text-center mb-1">Total {asset.symbol} Balance</p>
          <p className="text-2xl font-bold text-foreground text-center mb-4">{asset.balance}</p>
          <div className="flex gap-3">
            <button onClick={() => navigate("/deposit")} className="flex-1 bg-primary/10 border border-primary/20 rounded-xl py-3 flex items-center justify-center gap-2">
              <Plus className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Deposit</span>
            </button>
            <button className="flex-1 bg-primary/10 border border-primary/20 rounded-xl py-3 flex items-center justify-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Withdraw</span>
            </button>
            <button className="flex-1 bg-primary/10 border border-primary/20 rounded-xl py-3 flex items-center justify-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Swap</span>
            </button>
          </div>
        </div>

        {/* Recent transactions */}
        <div className="px-4 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Recent transactions</h3>
            <button onClick={() => navigate("/activity")} className="text-xs text-primary">See all</button>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {recentTxns.map((tx, i) => (
              <div key={i}>
                <button onClick={() => navigate("/receipt")} className="w-full flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${asset.color} flex items-center justify-center text-xs font-bold`}>
                      {asset.symbol.charAt(0)}
                    </div>
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
    </MobileLayout>
  );
};

export default AssetDetail;

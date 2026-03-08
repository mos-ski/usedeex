import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";

const assets = [
  { symbol: "BTC", name: "Bitcoin", rate: "₦97,450,000/BTC" },
  { symbol: "ETH", name: "Ethereum", rate: "₦5,830,000/ETH" },
  { symbol: "USDT", name: "Tether", rate: "₦1,535/USDT" },
  { symbol: "USDC", name: "USD Coin", rate: "₦1,530/USDC" },
];

type Step = "type" | "asset" | "amount" | "address" | "review" | "success";

const SellCrypto = () => {
  const navigate = useNavigate();
  const [sellType, setSellType] = useState<"internal" | "external">("internal");
  const [step, setStep] = useState<Step>("type");
  const [selectedAsset, setSelectedAsset] = useState(assets[0]);
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const ngnAmount = amount ? (parseFloat(amount) * 1535).toLocaleString() : "0";

  const goBack = () => {
    const flow: Step[] = sellType === "internal"
      ? ["type", "asset", "amount", "review", "success"]
      : ["type", "asset", "address", "amount", "review", "success"];
    const idx = flow.indexOf(step);
    if (idx <= 0) navigate(-1);
    else setStep(flow[idx - 1]);
  };

  if (step === "success") {
    return (
      <MobileLayout hideNav>
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <CheckCircle className="w-20 h-20 text-success mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Trade Successful!</h2>
          <p className="text-muted-foreground text-center mb-2">
            You sold {amount} {selectedAsset.symbol}
          </p>
          <p className="text-lg font-semibold text-success mb-8">≈ ₦{ngnAmount}</p>
          <button onClick={() => navigate("/dashboard")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">
            Back to Home
          </button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout hideNav>
      <div className="px-4 pt-4">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={goBack} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-lg font-bold text-foreground">Sell Crypto</h2>
        </div>

        {step === "type" && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">Choose how you want to sell</p>
            <button onClick={() => { setSellType("internal"); setStep("asset"); }} className="w-full bg-secondary rounded-xl p-4 text-left">
              <p className="text-sm font-semibold text-foreground">Internal OTC</p>
              <p className="text-xs text-muted-foreground mt-1">Sell from your DeeX wallet directly</p>
            </button>
            <button onClick={() => { setSellType("external"); setStep("asset"); }} className="w-full bg-secondary rounded-xl p-4 text-left">
              <p className="text-sm font-semibold text-foreground">External OTC</p>
              <p className="text-xs text-muted-foreground mt-1">Send from an external wallet to sell</p>
            </button>
          </div>
        )}

        {step === "asset" && (
          <div>
            <p className="text-sm text-muted-foreground mb-4">Select asset to sell</p>
            <div className="space-y-2">
              {assets.map((a) => (
                <button key={a.symbol} onClick={() => { setSelectedAsset(a); setStep(sellType === "external" ? "address" : "amount"); }} className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center text-xs font-bold text-warning">{a.symbol.substring(0, 2)}</div>
                    <p className="text-sm font-medium text-foreground">{a.name}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{a.rate}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "address" && (
          <div>
            <p className="text-sm text-muted-foreground mb-4">Enter the wallet address you're sending from</p>
            <input
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Paste wallet address"
              className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary mb-4"
            />
            <button onClick={() => setStep("amount")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">
              Continue
            </button>
          </div>
        )}

        {step === "amount" && (
          <div>
            <p className="text-sm text-muted-foreground mb-4">Enter amount of {selectedAsset.symbol} to sell</p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full h-14 bg-secondary rounded-xl px-4 text-2xl text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary text-center mb-2"
            />
            <p className="text-center text-sm text-muted-foreground mb-6">≈ ₦{ngnAmount}</p>
            <button onClick={() => setStep("review")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">
              Continue
            </button>
          </div>
        )}

        {step === "review" && (
          <div>
            <p className="text-sm text-muted-foreground mb-4">Review your trade</p>
            <div className="bg-secondary rounded-xl p-4 space-y-3 mb-6">
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Type</span><span className="text-sm text-foreground capitalize">{sellType} OTC</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Asset</span><span className="text-sm text-foreground">{selectedAsset.symbol}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Amount</span><span className="text-sm text-foreground">{amount} {selectedAsset.symbol}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Rate</span><span className="text-sm text-foreground">{selectedAsset.rate}</span></div>
              <div className="h-px bg-border" />
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">You'll receive</span><span className="text-sm font-bold text-success">₦{ngnAmount}</span></div>
            </div>
            <button onClick={() => setStep("success")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">
              Confirm Trade
            </button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default SellCrypto;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronDown, CheckCircle } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";

const assets = [
  { symbol: "BTC", name: "Bitcoin", network: "BEP-20", rate: "₦97,450,000/BTC" },
  { symbol: "ETH", name: "Ethereum", network: "ERC-20", rate: "₦5,830,000/ETH" },
  { symbol: "USDT", name: "Tether USD", network: "BEP-20", rate: "₦1,535/USDT" },
  { symbol: "USDC", name: "USD Coin", network: "ERC-20", rate: "₦1,530/USDC" },
];

const banks = [
  { name: "PalmPay", account: "8103674006" },
  { name: "Opay", account: "9012345678" },
  { name: "GTBank", account: "0123456789" },
];

const networks = ["BEP-20", "ERC-20", "TRC-20"];

type Step = "form" | "review" | "success";

const SellCrypto = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("form");
  const [selectedAsset, setSelectedAsset] = useState(assets[2]); // USDT default
  const [selectedBank, setSelectedBank] = useState(banks[0]);
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  const [amount, setAmount] = useState("");
  const [showAssetDropdown, setShowAssetDropdown] = useState(false);
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);

  const ngnAmount = amount ? (parseFloat(amount) * 1535).toLocaleString() : "0";

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

  if (step === "review") {
    return (
      <MobileLayout hideNav>
        <div className="px-4 pt-4">
          <div className="flex items-center mb-6">
            <button onClick={() => setStep("form")} className="absolute">
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
            <h2 className="text-lg font-bold text-foreground w-full text-center">Confirm Trade</h2>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 space-y-4 mb-6">
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Asset</span><span className="text-sm text-foreground">{selectedAsset.name}</span></div>
            <div className="h-px bg-border" />
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Network</span><span className="text-sm text-foreground">{selectedNetwork}</span></div>
            <div className="h-px bg-border" />
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Amount</span><span className="text-sm text-foreground">{amount} {selectedAsset.symbol}</span></div>
            <div className="h-px bg-border" />
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Destination</span><span className="text-sm text-foreground">{selectedBank.account} - {selectedBank.name}</span></div>
            <div className="h-px bg-border" />
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Rate</span><span className="text-sm text-foreground">{selectedAsset.rate}</span></div>
            <div className="h-px bg-border" />
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">You'll receive</span><span className="text-sm font-bold text-success">₦{ngnAmount}</span></div>
          </div>
          <button onClick={() => setStep("success")} className="w-full h-14 bg-primary rounded-xl text-primary-foreground font-semibold flex items-center justify-center gap-2">
            Confirm Trade <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout hideNav>
      <div className="px-4 pt-4">
        <div className="flex items-center mb-8">
          <button onClick={() => navigate(-1)} className="absolute">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h2 className="text-lg font-bold text-foreground w-full text-center">Sell Crypto</h2>
        </div>

        {/* Asset selector */}
        <div className="mb-6">
          <label className="text-sm text-foreground mb-2 block">I want to sell</label>
          <div className="relative">
            <button
              onClick={() => setShowAssetDropdown(!showAssetDropdown)}
              className="w-full bg-secondary border border-border rounded-xl px-4 py-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-xs font-bold text-success">
                  {selectedAsset.symbol.substring(0, 2)}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">{selectedAsset.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedAsset.network}</p>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </button>
            {showAssetDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl overflow-hidden z-10">
                {assets.map((a) => (
                  <button key={a.symbol} onClick={() => { setSelectedAsset(a); setShowAssetDropdown(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors">
                    <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-xs font-bold text-success">{a.symbol.substring(0, 2)}</div>
                    <p className="text-sm text-foreground">{a.name}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Destination */}
        <div className="mb-6">
          <label className="text-sm text-foreground mb-2 block">Destination</label>
          <div className="relative">
            <button
              onClick={() => setShowBankDropdown(!showBankDropdown)}
              className="w-full bg-card border border-border rounded-xl px-4 py-4 flex items-center justify-between"
            >
              <p className="text-sm text-foreground">{selectedBank.account} - {selectedBank.name}</p>
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </button>
            {showBankDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl overflow-hidden z-10">
                {banks.map((b) => (
                  <button key={b.name} onClick={() => { setSelectedBank(b); setShowBankDropdown(false); }}
                    className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors">
                    <p className="text-sm text-foreground">{b.account} - {b.name}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Network */}
        <div className="mb-6">
          <label className="text-sm text-foreground mb-2 block">Select network</label>
          <div className="relative">
            <button
              onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
              className="w-full bg-card border border-border rounded-xl px-4 py-4 flex items-center justify-between"
            >
              <p className="text-sm text-foreground">{selectedNetwork}</p>
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </button>
            {showNetworkDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl overflow-hidden z-10">
                {networks.map((n) => (
                  <button key={n} onClick={() => { setSelectedNetwork(n); setShowNetworkDropdown(false); }}
                    className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors">
                    <p className="text-sm text-foreground">{n}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Rate hint */}
        <p className="text-center text-sm text-warning mb-8">$1 ~ $1395 NGN</p>

        {/* Amount input (hidden until proceed is tapped - but we show it for simplicity) */}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full h-14 bg-card border border-border rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary mb-4 text-center"
        />
        {amount && <p className="text-center text-sm text-muted-foreground mb-6">≈ ₦{ngnAmount}</p>}

        {/* Spacer to push button down */}
        <div className="mt-auto pt-8">
          <button
            onClick={() => amount && setStep("review")}
            className={`w-full h-14 rounded-xl font-semibold flex items-center justify-center gap-2 ${amount ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            Proceed <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default SellCrypto;

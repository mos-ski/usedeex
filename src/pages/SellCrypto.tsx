import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronDown, Copy, Check, QrCode, Shield, Clock } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";

const assets = [
  { symbol: "BTC", name: "Bitcoin", network: "BEP-20", rate: "₦97,450,000/BTC", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" },
  { symbol: "ETH", name: "Ethereum", network: "ERC-20", rate: "₦5,830,000/ETH", address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD68" },
  { symbol: "USDT", name: "Tether USD", network: "BEP-20", rate: "₦1,535/USDT", address: "0xD31f1Ec12bd7AaBA45...7D46d6cc" },
  { symbol: "USDC", name: "USD Coin", network: "ERC-20", rate: "₦1,530/USDC", address: "0x892d35Cc6634C0532925a3b844Bc9e7595f2bD12" },
];

const banks = [
  { name: "PalmPay", account: "8103674006" },
  { name: "Opay", account: "9012345678" },
  { name: "GTBank", account: "0123456789" },
];

const networks = ["BEP-20", "ERC-20", "TRC-20"];

type Step = "form" | "review" | "deposit-address" | "pending";

const SellCrypto = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("form");
  const [selectedAsset, setSelectedAsset] = useState(assets[2]);
  const [selectedBank, setSelectedBank] = useState(banks[0]);
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  const [amount, setAmount] = useState("");
  const [showAssetDropdown, setShowAssetDropdown] = useState(false);
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

  const ngnAmount = amount ? (parseFloat(amount) * 1535).toLocaleString() : "0";

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedAsset.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (step === "pending") {
    return (
      <MobileLayout hideNav>
        <PageTransition>
          <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <Clock className="w-20 h-20 text-warning mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Awaiting Deposit</h2>
            <p className="text-muted-foreground text-center mb-2">
              Send {amount} {selectedAsset.symbol} to the address provided
            </p>
            <p className="text-sm text-muted-foreground mb-1">You'll receive</p>
            <p className="text-lg font-semibold text-success mb-8">≈ ₦{ngnAmount}</p>
            <p className="text-xs text-warning mb-4">We'll process your trade once the deposit is confirmed</p>
            <button onClick={() => navigate("/dashboard")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">
              Back to Home
            </button>
          </div>
        </PageTransition>
      </MobileLayout>
    );
  }

  if (step === "deposit-address") {
    return (
      <MobileLayout hideNav>
        <PageTransition>
          <div className="px-4 pt-4">
            <div className="flex items-center mb-6">
              <button onClick={() => setStep("review")} className="absolute">
                <ArrowLeft className="w-6 h-6 text-foreground" />
              </button>
              <h2 className="text-lg font-bold text-foreground w-full text-center">Deposit {selectedAsset.symbol}</h2>
            </div>

            <div className="flex flex-col items-center">
              {/* Summary */}
              <div className="w-full bg-card border border-border rounded-xl p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Selling</span>
                  <span className="text-sm text-foreground font-medium">{amount} {selectedAsset.symbol}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">You'll receive</span>
                  <span className="text-sm font-bold text-success">₦{ngnAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Destination</span>
                  <span className="text-sm text-foreground">{selectedBank.account} - {selectedBank.name}</span>
                </div>
              </div>

              {/* Crypto icon */}
              <div className="w-14 h-14 rounded-full bg-success/20 flex items-center justify-center text-sm font-bold text-success mb-4">
                {selectedAsset.symbol.substring(0, 2)}
              </div>

              {/* QR Code */}
              <div className="w-52 h-52 bg-foreground rounded-2xl flex items-center justify-center mb-4 border-4 border-primary/30">
                <QrCode className="w-36 h-36 text-background" />
              </div>

              <p className="text-sm text-muted-foreground mb-3">Your {selectedAsset.symbol} Address</p>

              {/* Address */}
              <div className="w-full bg-card border border-border rounded-xl px-4 py-3.5 flex items-center justify-between mb-4">
                <p className="text-sm text-foreground font-mono truncate mr-3">{selectedAsset.address}</p>
                <button onClick={handleCopy} className="shrink-0">
                  {copied ? <Check className="w-5 h-5 text-success" /> : <Copy className="w-5 h-5 text-primary" />}
                </button>
              </div>

              {/* Network badge */}
              <div className="flex items-center gap-1.5 bg-card border border-border rounded-full px-4 py-2 mb-6">
                <span className="text-sm text-muted-foreground">Network:</span>
                <span className="text-sm text-warning font-medium">{selectedNetwork}</span>
              </div>

              {/* Warning */}
              <div className="w-full bg-foreground/5 border border-border rounded-xl p-4 flex gap-3 mb-6">
                <Shield className="w-8 h-8 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-foreground leading-relaxed">
                    Only send <span className="font-bold">{selectedAsset.symbol}</span> to this address on the{" "}
                    <span className="font-bold">{selectedNetwork} Network</span>.
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sending other coins may result in permanent loss.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setStep("pending")}
                className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold"
              >
                I've Sent the Crypto
              </button>
            </div>
          </div>
        </PageTransition>
      </MobileLayout>
    );
  }

  if (step === "review") {
    return (
      <MobileLayout hideNav>
        <PageTransition>
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
            <button onClick={() => setStep("deposit-address")} className="w-full h-14 bg-primary rounded-xl text-primary-foreground font-semibold flex items-center justify-center gap-2">
              Proceed to Deposit <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </PageTransition>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout hideNav>
      <PageTransition>
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
                onClick={() => { setShowAssetDropdown(!showAssetDropdown); setShowBankDropdown(false); setShowNetworkDropdown(false); }}
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
                onClick={() => { setShowBankDropdown(!showBankDropdown); setShowAssetDropdown(false); setShowNetworkDropdown(false); }}
                className="w-full bg-card border border-border rounded-xl px-4 py-4 flex items-center justify-between"
              >
                <p className="text-sm text-foreground">{selectedBank.account} - {selectedBank.name}</p>
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </button>
              {showBankDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl overflow-hidden z-10">
                  {banks.map((b) => (
                    <button key={b.name} onClick={() => { setSelectedBank(b); setShowBankDropdown(false); }}
                      className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors text-sm text-foreground">{b.account} - {b.name}</button>
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
                onClick={() => { setShowNetworkDropdown(!showNetworkDropdown); setShowAssetDropdown(false); setShowBankDropdown(false); }}
                className="w-full bg-card border border-border rounded-xl px-4 py-4 flex items-center justify-between"
              >
                <p className="text-sm text-foreground">{selectedNetwork}</p>
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </button>
              {showNetworkDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl overflow-hidden z-10">
                  {networks.map((n) => (
                    <button key={n} onClick={() => { setSelectedNetwork(n); setShowNetworkDropdown(false); }}
                      className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors text-sm text-foreground">{n}</button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <p className="text-center text-sm text-warning mb-6">$1 ~ ₦1,535</p>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full h-14 bg-card border border-border rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary mb-4 text-center"
          />
          {amount && <p className="text-center text-sm text-muted-foreground mb-6">≈ ₦{ngnAmount}</p>}

          <div className="mt-8">
            <button
              onClick={() => amount && setStep("review")}
              className={`w-full h-14 rounded-xl font-semibold flex items-center justify-center gap-2 ${amount ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              Proceed <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default SellCrypto;

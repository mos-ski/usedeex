import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, QrCode, ChevronDown, Shield } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";

const cryptos = [
  { symbol: "BTC", name: "Bitcoin", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", network: "BEP-20", color: "bg-warning/20 text-warning" },
  { symbol: "ETH", name: "Ethereum", address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD68", network: "ERC-20", color: "bg-deex-blue/20 text-deex-blue" },
  { symbol: "USDT", name: "Tether USD", address: "0xD31f1Ec12bd7AaBA45...7D46d6cc", network: "BEP-20", color: "bg-success/20 text-success" },
  { symbol: "USDC", name: "USD Coin", address: "0x892d35Cc6634C0532925a3b844Bc9e7595f2bD12", network: "ERC-20", color: "bg-primary/20 text-primary" },
  { symbol: "SOL", name: "Solana", address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", network: "Solana", color: "bg-deex-purple/20 text-deex-purple" },
];

const Deposit = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"select" | "address">("select");
  const [selectedCrypto, setSelectedCrypto] = useState(cryptos[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedCrypto.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MobileLayout hideNav>
      <div className="px-4 pt-4">
        <div className="flex items-center mb-6">
          <button onClick={() => step === "address" ? setStep("select") : navigate(-1)} className="absolute">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h2 className="text-lg font-bold text-foreground w-full text-center">
            {step === "select" ? "Deposit" : `Receive ${selectedCrypto.name}`}
          </h2>
        </div>

        {step === "select" ? (
          <div>
            <p className="text-sm text-muted-foreground mb-4">Select cryptocurrency to deposit</p>
            <div className="space-y-2">
              {cryptos.map((c) => (
                <button
                  key={c.symbol}
                  onClick={() => { setSelectedCrypto(c); setStep("address"); }}
                  className="w-full flex items-center gap-3 bg-secondary rounded-xl px-4 py-3.5"
                >
                  <div className={`w-10 h-10 rounded-full ${c.color} flex items-center justify-center text-xs font-bold`}>
                    {c.symbol.substring(0, 2)}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.network}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Crypto icon */}
            <div className={`w-16 h-16 rounded-full ${selectedCrypto.color} flex items-center justify-center text-lg font-bold mb-4`}>
              {selectedCrypto.symbol.substring(0, 2)}
            </div>

            {/* QR Code */}
            <div className="w-56 h-56 bg-foreground rounded-2xl flex items-center justify-center mb-4 border-4 border-primary/30">
              <QrCode className="w-40 h-40 text-background" />
            </div>

            {/* Address label */}
            <p className="text-sm text-muted-foreground mb-3">Your {selectedCrypto.symbol} Address</p>

            {/* Address with copy */}
            <div className="w-full bg-card border border-border rounded-xl px-4 py-3.5 flex items-center justify-between mb-4">
              <p className="text-sm text-foreground font-mono truncate mr-3">{selectedCrypto.address}</p>
              <button onClick={handleCopy} className="shrink-0">
                {copied ? <Check className="w-5 h-5 text-success" /> : <Copy className="w-5 h-5 text-primary" />}
              </button>
            </div>

            {/* Network badge */}
            <div className="flex items-center gap-1.5 bg-card border border-border rounded-full px-4 py-2 mb-6">
              <span className="text-sm text-muted-foreground">Network:</span>
              <span className="text-sm text-warning font-medium">{selectedCrypto.network}</span>
              <ChevronDown className="w-4 h-4 text-warning" />
            </div>

            {/* Warning */}
            <div className="w-full bg-foreground/5 border border-border rounded-xl p-4 flex gap-3 mb-6">
              <Shield className="w-8 h-8 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-foreground leading-relaxed">
                  Only send <span className="font-bold">{selectedCrypto.symbol}</span> to this address and on the{" "}
                  <span className="font-bold">{selectedCrypto.network} Network</span>.
                </p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  Sending coins other than <span className="font-bold text-foreground">{selectedCrypto.symbol}</span> or coin from a different network other than{" "}
                  <span className="font-bold text-foreground">{selectedCrypto.network} Network</span> may result in loss.
                </p>
              </div>
            </div>

            {/* Done button */}
            <button
              onClick={() => navigate(-1)}
              className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Deposit;

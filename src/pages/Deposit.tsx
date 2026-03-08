import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, QrCode } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";

const cryptos = [
  { symbol: "BTC", name: "Bitcoin", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", network: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum", address: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD68", network: "ERC-20" },
  { symbol: "USDT", name: "Tether", address: "TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9", network: "TRC-20" },
  { symbol: "USDC", name: "USD Coin", address: "0x892d35Cc6634C0532925a3b844Bc9e7595f2bD12", network: "ERC-20" },
  { symbol: "SOL", name: "Solana", address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", network: "Solana" },
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
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => step === "address" ? setStep("select") : navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-lg font-bold text-foreground">Deposit</h2>
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
                  <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center text-xs font-bold text-warning">
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
            <p className="text-sm text-muted-foreground mb-6">
              Send only <span className="text-foreground font-medium">{selectedCrypto.symbol}</span> ({selectedCrypto.network}) to this address
            </p>

            {/* QR Placeholder */}
            <div className="w-48 h-48 bg-foreground rounded-2xl flex items-center justify-center mb-6">
              <QrCode className="w-32 h-32 text-background" />
            </div>

            {/* Address */}
            <div className="w-full bg-secondary rounded-xl p-4 mb-4">
              <p className="text-xs text-muted-foreground mb-1">Wallet Address</p>
              <p className="text-sm text-foreground break-all font-mono">{selectedCrypto.address}</p>
            </div>

            <button
              onClick={handleCopy}
              className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? "Copied!" : "Copy Address"}
            </button>

            <p className="text-xs text-muted-foreground mt-4 text-center">
              Minimum deposit: 0.0001 {selectedCrypto.symbol}. Deposits below this amount will not be credited.
            </p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Deposit;

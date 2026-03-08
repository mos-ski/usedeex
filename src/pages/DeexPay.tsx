import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, ScanLine } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";

const cryptos = [
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "USDT", name: "Tether" },
  { symbol: "USDC", name: "USD Coin" },
];

type Step = "merchant" | "select" | "amount" | "review" | "success";

const DeexPay = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("merchant");
  const [merchantId, setMerchantId] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState(cryptos[0]);
  const [amount, setAmount] = useState("");

  const goBack = () => {
    const flow: Step[] = ["merchant", "select", "amount", "review", "success"];
    const idx = flow.indexOf(step);
    if (idx <= 0) navigate(-1);
    else setStep(flow[idx - 1]);
  };

  if (step === "success") {
    return (
      <MobileLayout hideNav>
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <CheckCircle className="w-20 h-20 text-success mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Payment Sent!</h2>
          <p className="text-muted-foreground text-center mb-2">Paid {amount} {selectedCrypto.symbol} to</p>
          <p className="text-foreground font-medium mb-8">Merchant #{merchantId}</p>
          <button onClick={() => navigate("/dashboard")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">Back to Home</button>
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
          <h2 className="text-lg font-bold text-foreground">DeeX Pay</h2>
        </div>

        {step === "merchant" && (
          <div>
            <p className="text-sm text-muted-foreground mb-4">Enter merchant ID or scan QR code</p>
            <input
              value={merchantId}
              onChange={(e) => setMerchantId(e.target.value)}
              placeholder="Enter Merchant ID"
              className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary mb-3"
            />
            <button className="w-full h-12 bg-secondary rounded-xl text-foreground font-medium flex items-center justify-center gap-2 mb-4">
              <ScanLine className="w-5 h-5" /> Scan QR Code
            </button>
            <button onClick={() => setStep("select")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">Continue</button>
          </div>
        )}

        {step === "select" && (
          <div>
            <p className="text-sm text-muted-foreground mb-4">Select crypto to pay with</p>
            <div className="space-y-2">
              {cryptos.map((c) => (
                <button key={c.symbol} onClick={() => { setSelectedCrypto(c); setStep("amount"); }} className="w-full flex items-center gap-3 bg-secondary rounded-xl px-4 py-3.5">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{c.symbol.substring(0, 2)}</div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.symbol}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "amount" && (
          <div>
            <p className="text-sm text-muted-foreground mb-4">Enter amount in {selectedCrypto.symbol}</p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full h-14 bg-secondary rounded-xl px-4 text-2xl text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary text-center mb-6"
            />
            <button onClick={() => setStep("review")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">Continue</button>
          </div>
        )}

        {step === "review" && (
          <div>
            <p className="text-sm text-muted-foreground mb-4">Confirm payment</p>
            <div className="bg-secondary rounded-xl p-4 space-y-3 mb-6">
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Merchant</span><span className="text-sm text-foreground">#{merchantId}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Crypto</span><span className="text-sm text-foreground">{selectedCrypto.symbol}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Amount</span><span className="text-sm text-foreground">{amount} {selectedCrypto.symbol}</span></div>
            </div>
            <button onClick={() => setStep("success")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">Pay Now</button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default DeexPay;

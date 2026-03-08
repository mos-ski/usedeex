import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, Shield, Copy, Check, AlertTriangle, Lock } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import CryptoIcon from "@/components/CryptoIcon";
import NewBadge from "@/components/NewBadge";

const assets = [
  { symbol: "BTC", name: "Bitcoin", balance: "0.0234", fee: "0.0001", networks: ["Bitcoin Mainnet", "BEP-20", "Lightning"] },
  { symbol: "ETH", name: "Ethereum", balance: "0.15", fee: "0.002", networks: ["ERC-20", "BEP-20", "Arbitrum"] },
  { symbol: "USDT", name: "Tether", balance: "5,420.00", fee: "1.00", networks: ["TRC-20", "BEP-20", "ERC-20", "Solana"] },
  { symbol: "SOL", name: "Solana", balance: "12.50", fee: "0.01", networks: ["Solana"] },
];

type View = "select" | "form" | "confirm" | "pin" | "success";

const WithdrawCrypto = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("select");
  const [asset, setAsset] = useState(assets[0]);
  const [network, setNetwork] = useState(assets[0].networks[0]);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [showNetwork, setShowNetwork] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  if (view === "success") {
    return (
      <MobileLayout hideNav><PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-6"><Check className="w-10 h-10 text-success" /></div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Withdrawal Submitted</h2>
          <p className="text-muted-foreground text-center mb-2">{amount} {asset.symbol}</p>
          <p className="text-xs text-muted-foreground text-center mb-6 break-all">To: {address}</p>
          <button onClick={() => navigate("/wallet")} className="w-full h-14 bg-primary rounded-xl text-primary-foreground font-semibold">Back to Wallet</button>
        </div>
      </PageTransition></MobileLayout>
    );
  }

  // PIN ENTRY
  if (view === "pin") {
    const correctPin = "1234";
    const handlePinDigit = (digit: string) => {
      if (pin.length >= 4) return;
      const newPin = pin + digit;
      setPin(newPin);
      setPinError(false);
      if (newPin.length === 4) {
        if (newPin === correctPin) {
          setTimeout(() => setView("success"), 300);
        } else {
          setPinError(true);
          setTimeout(() => { setPin(""); setPinError(false); }, 800);
        }
      }
    };
    const handleDelete = () => { setPin(pin.slice(0, -1)); setPinError(false); };

    return (
      <MobileLayout hideNav><PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Enter PIN</h2>
          <p className="text-sm text-muted-foreground mb-8">Confirm withdrawal of {amount} {asset.symbol}</p>

          <div className="flex gap-4 mb-8">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`w-4 h-4 rounded-full transition-colors ${
                pinError ? "bg-destructive" : i < pin.length ? "bg-primary" : "bg-muted"
              }`} />
            ))}
          </div>

          {pinError && <p className="text-xs text-destructive mb-4">Incorrect PIN, try again</p>}

          <div className="grid grid-cols-3 gap-4 w-64">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "del"].map((key, i) => (
              <button key={i}
                onClick={() => { if (key === "del") handleDelete(); else if (key !== null) handlePinDigit(String(key)); }}
                className={`h-14 rounded-xl text-lg font-semibold ${key === null ? "invisible" : key === "del" ? "text-muted-foreground text-sm" : "bg-secondary text-foreground active:bg-muted"}`}>
                {key === "del" ? "⌫" : key !== null ? key : ""}
              </button>
            ))}
          </div>

          <button onClick={() => setView("confirm")} className="mt-6 text-sm text-muted-foreground">Cancel</button>
        </div>
      </PageTransition></MobileLayout>
    );
  }

  if (view === "confirm") {
    return (
      <MobileLayout hideNav><PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setView("form")} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">Confirm Withdrawal</h2>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 space-y-4 mb-6">
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Asset</span><span className="text-sm text-foreground">{asset.symbol}</span></div>
            <div className="h-px bg-border" />
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Amount</span><span className="text-sm text-foreground">{amount} {asset.symbol}</span></div>
            <div className="h-px bg-border" />
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Network</span><span className="text-sm text-foreground">{network}</span></div>
            <div className="h-px bg-border" />
            <div className="flex justify-between items-start"><span className="text-sm text-muted-foreground">To</span><span className="text-sm text-foreground text-right break-all max-w-[200px]">{address}</span></div>
            <div className="h-px bg-border" />
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Network Fee</span><span className="text-sm text-foreground">{asset.fee} {asset.symbol}</span></div>
          </div>
          <div className="flex items-start gap-2 mb-6 bg-warning/10 rounded-xl p-3">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">Please verify the address and network. Wrong transfers cannot be reversed.</p>
          </div>
          <button onClick={() => { setPin(""); setView("pin"); }} className="w-full h-14 bg-primary rounded-xl text-primary-foreground font-semibold">Confirm Withdrawal</button>
        </div>
      </PageTransition></MobileLayout>
    );
  }

  if (view === "form") {
    return (
      <MobileLayout hideNav><PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setView("select")} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">Withdraw {asset.symbol}</h2>
            <NewBadge />
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Wallet Address</label>
              <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter recipient address"
                className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary font-mono text-sm" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Network</label>
              <div className="relative">
                <button onClick={() => setShowNetwork(!showNetwork)} className="w-full h-12 bg-secondary rounded-xl px-4 flex items-center justify-between text-foreground">
                  <span className="text-sm">{network}</span><ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
                {showNetwork && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl overflow-hidden z-20 shadow-lg">
                    {asset.networks.map(n => (
                      <button key={n} onClick={() => { setNetwork(n); setShowNetwork(false); }} className={`w-full px-4 py-3 text-left text-sm ${n === network ? "bg-primary/10 text-primary" : "text-foreground hover:bg-secondary"}`}>{n}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-muted-foreground">Amount</label>
                <span className="text-xs text-muted-foreground">Available: {asset.balance}</span>
              </div>
              <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" type="number"
                className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="bg-secondary rounded-xl p-3 flex justify-between text-xs text-muted-foreground">
              <span>Network Fee</span><span>{asset.fee} {asset.symbol}</span>
            </div>
          </div>
          <button onClick={() => address && amount && setView("confirm")}
            className={`w-full h-14 rounded-xl font-semibold mt-6 ${address && amount ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            Preview Withdrawal
          </button>
        </div>
      </PageTransition></MobileLayout>
    );
  }

  return (
    <MobileLayout hideNav><PageTransition>
      <div className="px-4 pt-4">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
          <h2 className="text-lg font-bold text-foreground">Withdraw</h2>
          <NewBadge />
        </div>
        <p className="text-sm text-muted-foreground mb-4">Select asset to withdraw</p>
        <div className="space-y-2">
          {assets.map(a => (
            <button key={a.symbol} onClick={() => { setAsset(a); setNetwork(a.networks[0]); setView("form"); }} className="w-full flex items-center gap-3 bg-secondary rounded-xl px-4 py-3.5">
              <CryptoIcon symbol={a.symbol} size="md" />
              <div className="text-left flex-1"><p className="text-sm font-medium text-foreground">{a.name}</p><p className="text-xs text-muted-foreground">Balance: {a.balance}</p></div>
            </button>
          ))}
        </div>
      </div>
    </PageTransition></MobileLayout>
  );
};

export default WithdrawCrypto;

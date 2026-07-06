import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowDownUp, ChevronDown, Info, Gift, Check } from "lucide-react";
import { toast } from "sonner";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import CryptoIcon from "@/components/CryptoIcon";
import NewBadge from "@/components/NewBadge";
import InviteCodeInput from "@/components/InviteCodeInput";
import { useInviteCode } from "@/contexts/InviteCodeContext";

const assets = [
  { symbol: "BTC", name: "Bitcoin", balance: "0.0234", rate: 97450 },
  { symbol: "ETH", name: "Ethereum", balance: "0.15", rate: 5830 },
  { symbol: "USDT", name: "Tether", balance: "5,420.00", rate: 1 },
  { symbol: "SOL", name: "Solana", balance: "12.50", rate: 231 },
  { symbol: "USDC", name: "USD Coin", balance: "2,100.00", rate: 1 },
];

type View = "main" | "confirm" | "success";

const SwapCrypto = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState(assets[0]);
  const [to, setTo] = useState(assets[2]);
  const [amount, setAmount] = useState("");
  const [view, setView] = useState<View>("main");
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [showInviteCode, setShowInviteCode] = useState(false);
  const { appliedCode, tradeCompleted, applyCode, completeTrade } = useInviteCode();

  const amtNum = parseFloat(amount) || 0;
  const toAmount = (amtNum * from.rate / to.rate).toFixed(to.rate >= 100 ? 6 : 2);
  const fee = (amtNum * 0.005).toFixed(6);

  useEffect(() => {
    if (view === "success" && appliedCode && !tradeCompleted) {
      completeTrade();
      toast.success(`You earned ${appliedCode.tradeReward} DeeXpoints for trading!`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  if (view === "success") {
    return (
      <MobileLayout hideNav><PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-6"><ArrowDownUp className="w-10 h-10 text-success" /></div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Swap Successful!</h2>
          <p className="text-muted-foreground text-center mb-6">{amount} {from.symbol} → {toAmount} {to.symbol}</p>
          <button onClick={() => navigate("/wallet")} className="w-full h-14 bg-primary rounded-xl text-primary-foreground font-semibold">Back to Wallet</button>
        </div>
      </PageTransition></MobileLayout>
    );
  }

  if (view === "confirm") {
    return (
      <MobileLayout hideNav><PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setView("main")} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">Confirm Swap</h2>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 space-y-4 mb-6">
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">From</span><span className="text-sm text-foreground">{amount} {from.symbol}</span></div>
            <div className="h-px bg-border" />
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">To</span><span className="text-sm text-foreground">{toAmount} {to.symbol}</span></div>
            <div className="h-px bg-border" />
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Rate</span><span className="text-sm text-foreground">1 {from.symbol} = {(from.rate / to.rate).toFixed(to.rate >= 100 ? 4 : 2)} {to.symbol}</span></div>
            <div className="h-px bg-border" />
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Fee (0.5%)</span><span className="text-sm text-foreground">{fee} {from.symbol}</span></div>
            <div className="h-px bg-border" />
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">You receive</span><span className="text-sm font-bold text-success">{toAmount} {to.symbol}</span></div>
          </div>
          <div className="flex items-center gap-2 mb-6 text-xs text-muted-foreground"><Info className="w-4 h-4" /> Rate may change slightly at execution</div>
          <button onClick={() => setView("success")} className="w-full h-14 bg-primary rounded-xl text-primary-foreground font-semibold">Swap Now</button>
        </div>
      </PageTransition></MobileLayout>
    );
  }

  const AssetPicker = ({ show, onClose, onSelect, exclude }: { show: boolean; onClose: () => void; onSelect: (a: typeof assets[0]) => void; exclude: string }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 bg-background/80 z-50 flex items-end justify-center">
        <div className="w-full max-w-[430px] bg-card rounded-t-2xl p-4 pb-8 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Select Asset</h3>
            <button onClick={onClose} className="text-muted-foreground text-sm">Close</button>
          </div>
          <div className="space-y-2">
            {assets.filter(a => a.symbol !== exclude).map(a => (
              <button key={a.symbol} onClick={() => { onSelect(a); onClose(); }} className="w-full flex items-center gap-3 bg-secondary rounded-xl px-4 py-3">
                <CryptoIcon symbol={a.symbol} size="sm" />
                <div className="text-left"><p className="text-sm font-medium text-foreground">{a.name}</p><p className="text-xs text-muted-foreground">Bal: {a.balance}</p></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <MobileLayout hideNav>
      <PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">Swap Crypto</h2>
            <NewBadge />
          </div>

          {/* Invite Code Banner */}
          {!appliedCode && (
            <div className="mb-4">
              <button
                onClick={() => setShowInviteCode(true)}
                className="w-full bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-semibold text-foreground">Have an invite code?</p>
                  <p className="text-xs text-muted-foreground">Enter it to earn DeeXpoints on this trade</p>
                </div>
              </button>
            </div>
          )}

          {appliedCode && !tradeCompleted && (
            <div className="mb-4 bg-success/10 border border-success/20 rounded-xl p-3">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-success" />
                <p className="text-xs text-success font-medium">
                  Invite code applied! Trade ${appliedCode.minTrade}+ to earn {appliedCode.tradeReward} pts
                </p>
              </div>
            </div>
          )}

          {/* From */}
          <div className="bg-card border border-border rounded-xl p-4 mb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">From</span>
              <span className="text-xs text-muted-foreground">Balance: {from.balance}</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowFromPicker(true)} className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
                <CryptoIcon symbol={from.symbol} size="sm" />
                <span className="text-sm font-medium text-foreground">{from.symbol}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
              <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" type="number"
                className="flex-1 text-right text-xl font-bold text-foreground bg-transparent outline-none placeholder:text-muted-foreground" />
            </div>
          </div>

          <div className="flex justify-center -my-2 z-10 relative">
            <button onClick={() => { const t = from; setFrom(to); setTo(t); }} className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <ArrowDownUp className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>

          {/* To */}
          <div className="bg-card border border-border rounded-xl p-4 mt-2 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">To</span>
              <span className="text-xs text-muted-foreground">Balance: {to.balance}</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowToPicker(true)} className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
                <CryptoIcon symbol={to.symbol} size="sm" />
                <span className="text-sm font-medium text-foreground">{to.symbol}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
              <p className="flex-1 text-right text-xl font-bold text-foreground">{amtNum > 0 ? toAmount : "0.00"}</p>
            </div>
          </div>

          <div className="bg-secondary rounded-xl p-3 mb-6">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Rate</span><span>1 {from.symbol} = {(from.rate / to.rate).toFixed(to.rate >= 100 ? 4 : 2)} {to.symbol}</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Fee</span><span>0.5%</span>
            </div>
          </div>

          <button onClick={() => amtNum > 0 && setView("confirm")}
            className={`w-full h-14 rounded-xl font-semibold ${amtNum > 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            Preview Swap
          </button>
        </div>

        <AssetPicker show={showFromPicker} onClose={() => setShowFromPicker(false)} onSelect={setFrom} exclude={to.symbol} />
        <AssetPicker show={showToPicker} onClose={() => setShowToPicker(false)} onSelect={setTo} exclude={from.symbol} />
      </PageTransition>

      {/* Invite Code Modal */}
      {showInviteCode && (
        <InviteCodeInput
          onApply={(code) => {
            applyCode(code);
            setShowInviteCode(false);
          }}
          onClose={() => setShowInviteCode(false)}
        />
      )}
    </MobileLayout>
  );
};

export default SwapCrypto;

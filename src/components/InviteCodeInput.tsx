import { useState } from "react";
import { Gift, X, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface InviteCodeInputProps {
  onApply: (code: string) => void;
  onClose?: () => void;
  preFilledCode?: string;
  variant?: "modal" | "inline" | "banner";
}

const mockValidCode = {
  code: "DX-WELCOME500",
  depositReward: 200,
  tradeReward: 300,
  totalReward: 500,
  minDeposit: 50,
  minTrade: 100,
};

const InviteCodeInput = ({ onApply, onClose, preFilledCode, variant = "modal" }: InviteCodeInputProps) => {
  const [code, setCode] = useState(preFilledCode || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!code.trim()) {
      setError("Please enter an invite code");
      return;
    }
    setLoading(true);
    setError("");

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    if (code.toUpperCase() === mockValidCode.code) {
      setSuccess(true);
      setTimeout(() => {
        onApply(code);
      }, 1500);
    } else {
      setError("Invalid or expired invite code");
    }
    setLoading(false);
  };

  if (variant === "banner") {
    return (
      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Gift className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground mb-1">Have an invite code?</p>
            <p className="text-xs text-muted-foreground mb-3">Enter it to earn DeeXpoints on your first deposit and trade</p>
            <div className="flex gap-2">
              <Input
                placeholder="Enter invite code"
                value={code}
                onChange={e => { setCode(e.target.value.toUpperCase()); setError(""); }}
                className="uppercase text-sm h-9"
                disabled={success}
              />
              <Button onClick={handleApply} disabled={loading || success} className="h-9 px-4 bg-primary text-primary-foreground">
                {loading ? "..." : success ? <Check className="w-4 h-4" /> : "Apply"}
              </Button>
            </div>
            {error && <p className="text-xs text-destructive mt-2">{error}</p>}
            {success && <p className="text-xs text-success mt-2">Code applied! Check your rewards</p>}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className="bg-secondary rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Gift className="w-4 h-4 text-primary" />
          <p className="text-sm font-medium text-foreground">Invite Code</p>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Enter invite code"
            value={code}
            onChange={e => { setCode(e.target.value.toUpperCase()); setError(""); }}
            className="uppercase text-sm"
            disabled={success}
          />
          <Button onClick={handleApply} disabled={loading || success} className="bg-primary text-primary-foreground">
            {loading ? "..." : success ? <Check className="w-4 h-4" /> : "Apply"}
          </Button>
        </div>
        {error && <p className="text-xs text-destructive mt-2">{error}</p>}
        {success && (
          <div className="mt-3 bg-success/10 rounded-lg p-3">
            <p className="text-xs text-success font-medium">Code applied successfully!</p>
            <p className="text-xs text-muted-foreground mt-1">Deposit ${mockValidCode.minDeposit} to earn {mockValidCode.depositReward} pts</p>
            <p className="text-xs text-muted-foreground">Trade ${mockValidCode.minTrade} to earn {mockValidCode.tradeReward} pts</p>
          </div>
        )}
      </div>
    );
  }

  // Modal variant
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50">
      <div className="bg-card rounded-t-2xl sm:rounded-2xl w-full max-w-md mx-4 mb-0 sm:mb-0 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Enter Invite Code</h3>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-4">
          {success ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-success" />
              </div>
              <p className="text-lg font-bold text-foreground mb-2">Code Applied!</p>
              <p className="text-sm text-muted-foreground mb-4">Complete these conditions to earn rewards:</p>
              <div className="bg-secondary rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Deposit ${mockValidCode.minDeposit}</span>
                  <span className="text-sm font-medium text-primary">+{mockValidCode.depositReward} pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Trade ${mockValidCode.minTrade}</span>
                  <span className="text-sm font-medium text-primary">+{mockValidCode.tradeReward} pts</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Enter your invite code to claim DeeXpoint rewards on your first deposit and trade.
              </p>
              <div className="space-y-3">
                <div>
                  <Input
                    placeholder="Enter invite code (e.g. DX-WELCOME500)"
                    value={code}
                    onChange={e => { setCode(e.target.value.toUpperCase()); setError(""); }}
                    className="uppercase text-center text-lg tracking-wider h-12"
                  />
                  {error && <p className="text-xs text-destructive mt-2 text-center">{error}</p>}
                </div>
                <div className="bg-secondary rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-foreground">Preview Rewards</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Deposit reward</span>
                    <span className="font-medium text-foreground">{mockValidCode.depositReward} pts</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Trade reward</span>
                    <span className="font-medium text-foreground">{mockValidCode.tradeReward} pts</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="p-4 border-t border-border">
          {success ? (
            <Button onClick={onClose} className="w-full bg-primary text-primary-foreground">
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleApply} disabled={loading || !code.trim()} className="w-full bg-primary text-primary-foreground">
              {loading ? "Applying..." : "Apply Code"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InviteCodeInput;

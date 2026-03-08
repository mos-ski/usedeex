import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Check, Gift, Flame, Users, ChevronRight, ArrowLeft, Clock } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import BottomNav from "@/components/layout/BottomNav";
import PageTransition from "@/components/PageTransition";

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const streakDays = [true, true, true, false, false, false, false];

const POINTS_BALANCE = 2450;
const POINT_VALUE = 10;

const redemptionHistory = [
  { id: 1, points: 500, cash: "₦5,000", status: "Approved", date: "Mar 6, 2026", account: "8103674006 - PalmPay" },
  { id: 2, points: 200, cash: "₦2,000", status: "Processing", date: "Mar 8, 2026", account: "8103674006 - PalmPay" },
];

type View = "main" | "redeem" | "confirm" | "success";

const Rewards = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<View>("main");
  const [redeemAmount, setRedeemAmount] = useState("");
  const referralLink = "https://deex.app/ref/johndoe";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pointsToRedeem = Number(redeemAmount) || 0;
  const cashValue = pointsToRedeem * POINT_VALUE;
  const maxRedeem = POINTS_BALANCE;

  if (view === "success") {
    return (
      <MobileLayout hideNav>
        <PageTransition>
          <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <Clock className="w-20 h-20 text-warning mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Redemption Submitted!</h2>
            <p className="text-muted-foreground text-center mb-2">{pointsToRedeem} points → ₦{cashValue.toLocaleString()}</p>
            <div className="bg-card border border-border rounded-xl p-4 w-full mb-4">
              <div className="flex justify-between mb-2"><span className="text-sm text-muted-foreground">Credit to</span><span className="text-sm text-foreground">8103674006 - PalmPay</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Status</span><span className="text-sm px-3 py-0.5 rounded-full bg-warning/20 text-warning">Processing</span></div>
            </div>
            <p className="text-xs text-muted-foreground mb-8 text-center">Your redemption is being reviewed by admin. You'll be notified once approved.</p>
            <button onClick={() => navigate("/receipt", { state: { type: "reward", data: { points: `${pointsToRedeem} pts`, cash: `₦${cashValue.toLocaleString()}`, status: "Processing", adminStatus: "Processing", account: "8103674006 - PalmPay" } } })}
              className="w-full h-12 bg-secondary rounded-xl text-foreground font-semibold mb-3">View Receipt</button>
            <button onClick={() => { setView("main"); setRedeemAmount(""); }} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">Back to Rewards</button>
          </div>
        </PageTransition>
      </MobileLayout>
    );
  }

  if (view === "confirm") {
    return (
      <MobileLayout hideNav>
        <PageTransition>
          <div className="px-4 pt-4">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => setView("redeem")} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <h2 className="text-lg font-bold text-foreground">Confirm Redemption</h2>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 space-y-4 mb-6">
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Points</span><span className="text-sm text-foreground">{pointsToRedeem} pts</span></div>
              <div className="h-px bg-border" />
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Rate</span><span className="text-sm text-foreground">1 pt = ₦{POINT_VALUE}</span></div>
              <div className="h-px bg-border" />
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">You'll receive</span><span className="text-sm font-bold text-success">₦{cashValue.toLocaleString()}</span></div>
              <div className="h-px bg-border" />
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Credit to</span><span className="text-sm text-foreground">8103674006 - PalmPay</span></div>
              <div className="h-px bg-border" />
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Remaining</span><span className="text-sm text-foreground">{(POINTS_BALANCE - pointsToRedeem).toLocaleString()} pts</span></div>
            </div>
            <p className="text-xs text-muted-foreground text-center mb-4">Redemptions are processed after admin approval</p>
            <button onClick={() => setView("success")} className="w-full h-14 bg-primary rounded-xl text-primary-foreground font-semibold">Redeem Now</button>
          </div>
        </PageTransition>
      </MobileLayout>
    );
  }

  if (view === "redeem") {
    return (
      <MobileLayout hideNav>
        <PageTransition>
          <div className="px-4 pt-4">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => setView("main")} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <h2 className="text-lg font-bold text-foreground">Redeem Points</h2>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl p-5 mb-6 border border-border text-center">
              <p className="text-sm text-muted-foreground mb-1">Available Points</p>
              <p className="text-3xl font-bold text-primary">{POINTS_BALANCE.toLocaleString()}</p>
              <p className="text-sm text-success">≈ ₦{(POINTS_BALANCE * POINT_VALUE).toLocaleString()}</p>
            </div>
            <div className="mb-4">
              <label className="text-sm text-foreground mb-2 block">Points to redeem</label>
              <input type="number" value={redeemAmount} onChange={(e) => setRedeemAmount(e.target.value)} placeholder="Enter points" max={maxRedeem}
                className="w-full h-14 bg-card border border-border rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary text-center text-xl" />
              {pointsToRedeem > 0 && <p className="text-center text-sm text-success mt-2">= ₦{cashValue.toLocaleString()}</p>}
              {pointsToRedeem > maxRedeem && <p className="text-center text-xs text-destructive mt-1">Exceeds your balance</p>}
            </div>
            <div className="flex gap-2 mb-6">
              {[100, 500, 1000, 2450].map((amt) => (
                <button key={amt} onClick={() => setRedeemAmount(String(Math.min(amt, maxRedeem)))}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium ${Number(redeemAmount) === amt ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                  {amt === maxRedeem ? "All" : amt}
                </button>
              ))}
            </div>
            <button onClick={() => pointsToRedeem > 0 && pointsToRedeem <= maxRedeem && setView("confirm")}
              className={`w-full h-14 rounded-xl font-semibold ${pointsToRedeem > 0 && pointsToRedeem <= maxRedeem ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              Continue
            </button>
          </div>
        </PageTransition>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <PageTransition>
        <div className="px-4 pt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Rewards</h2>

          <div className="bg-gradient-to-r from-primary/30 to-accent/20 rounded-2xl p-5 mb-6 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <Gift className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm font-bold text-foreground">Invite Friends & Earn</p>
                <p className="text-xs text-muted-foreground">Earn ₦500 for every friend who trades</p>
              </div>
            </div>
            <div className="flex gap-2">
              <input readOnly value={referralLink} className="flex-1 h-10 bg-secondary/50 rounded-lg px-3 text-xs text-muted-foreground outline-none" />
              <button onClick={handleCopy} className="h-10 px-4 bg-primary rounded-lg text-primary-foreground text-sm font-medium flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-foreground mb-3">Explore</h3>
          <div className="flex gap-3 mb-6">
            <div className="flex-1 bg-secondary rounded-xl p-4">
              <Flame className="w-6 h-6 text-deex-orange mb-2" />
              <p className="text-sm font-semibold text-foreground">Trade Streak</p>
              <p className="text-xs text-muted-foreground">Trade daily for bonuses</p>
            </div>
            <div className="flex-1 bg-secondary rounded-xl p-4">
              <Users className="w-6 h-6 text-primary mb-2" />
              <p className="text-sm font-semibold text-foreground">Refer & Win</p>
              <p className="text-xs text-muted-foreground">Win up to ₦50,000</p>
            </div>
          </div>

          <div className="bg-secondary rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-foreground">Weekly Cashback</p>
              <span className="text-xs text-muted-foreground">4d 12h left</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full mb-1">
              <div className="h-2 bg-primary rounded-full" style={{ width: "65%" }} />
            </div>
            <p className="text-xs text-muted-foreground">₦6,500 / ₦10,000 target</p>
          </div>

          <button onClick={() => setView("redeem")} className="w-full bg-secondary rounded-xl p-4 mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">DeeXpoints</p>
              <p className="text-2xl font-bold text-primary">{POINTS_BALANCE.toLocaleString()}</p>
              <p className="text-xs text-success">≈ ₦{(POINTS_BALANCE * POINT_VALUE).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary font-medium">Redeem</span>
              <ChevronRight className="w-5 h-5 text-primary" />
            </div>
          </button>

          {/* Redemption History */}
          <h3 className="text-sm font-semibold text-foreground mb-3">Redemption History</h3>
          <div className="space-y-2 mb-4">
            {redemptionHistory.map((r) => (
              <div key={r.id} className="bg-card border border-border rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{r.points} pts → {r.cash}</p>
                  <p className="text-xs text-muted-foreground">{r.date} • {r.account}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${r.status === "Approved" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-secondary rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-foreground mb-3">Daily Streak</p>
            <div className="flex justify-between">
              {days.map((d, i) => (
                <div key={d} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-muted-foreground">{d}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${streakDays[i] ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {streakDays[i] ? "✓" : i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileLayout>
  );
};

export default Rewards;

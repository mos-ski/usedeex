import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Check, Gift, Flame, Users, ChevronRight, ArrowLeft, Clock, Info } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import BottomNav from "@/components/layout/BottomNav";
import PageTransition from "@/components/PageTransition";
import NewBadge from "@/components/NewBadge";
import SignUpBonus from "@/components/rewards/SignUpBonus";
import CashbackCard from "@/components/rewards/CashbackCard";
import EarningsLog, { EarningEntry } from "@/components/rewards/EarningsLog";
import RedemptionHistory, { Redemption } from "@/components/rewards/RedemptionHistory";

const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const streakDays = [true, true, true, false, false, false, false];

const POINTS_BALANCE = 2450;
const POINT_VALUE = 10;
const MIN_REDEEM = 500; // ₦5,000 minimum

const signupTasks = [
  { label: "Complete KYC-1 (BVN + Verification)", done: true },
  { label: "First crypto trade ≥ $50", done: true },
  { label: "Refer a friend who trades > $100", done: false },
];

const earningsLog: EarningEntry[] = [
  { id: 1, source: "Adewale M. traded $25", category: "referral", points: 10, date: "Mar 10, 2026", period: "today" },
  { id: 2, source: "Chidinma O. traded $100", category: "referral", points: 10, date: "Mar 10, 2026", period: "today" },
  { id: 3, source: "7-day trade streak completed", category: "streak", points: 100, date: "Mar 9, 2026", period: "week" },
  { id: 4, source: "Daily trade bonus", category: "trade", points: 50, date: "Mar 9, 2026", period: "week" },
  { id: 5, source: "Ibrahim A. traded $50", category: "referral", points: 10, date: "Mar 8, 2026", period: "week" },
  { id: 6, source: "Sign-up KYC-1 completed", category: "signup", points: 200, date: "Mar 6, 2026", period: "week" },
  { id: 7, source: "First crypto trade bonus", category: "signup", points: 200, date: "Mar 6, 2026", period: "week" },
  { id: 8, source: "Daily trade bonus", category: "trade", points: 50, date: "Mar 5, 2026", period: "all" },
  { id: 9, source: "Fatima K. traded $75", category: "referral", points: 10, date: "Mar 1, 2026", period: "all" },
  { id: 10, source: "Weekly cashback reward", category: "cashback", points: 500, date: "Feb 28, 2026", period: "all" },
  { id: 11, source: "Victor E. traded $200", category: "referral", points: 10, date: "Feb 25, 2026", period: "all" },
];

const redemptionHistory: Redemption[] = [
  { id: 1, points: 500, cash: "₦5,000", status: "Approved", date: "Mar 6, 2026", account: "8103674006 - PalmPay" },
  { id: 2, points: 200, cash: "₦2,000", status: "Rejected", date: "Mar 8, 2026", account: "8103674006 - PalmPay" },
  { id: 3, points: 1000, cash: "₦10,000", status: "Approved", date: "Feb 20, 2026", account: "8103674006 - PalmPay" },
  { id: 4, points: 500, cash: "₦5,000", status: "Processing", date: "Feb 10, 2026", account: "9012345678 - Opay" },
];

type View = "main" | "redeem" | "confirm" | "success";
type MainTab = "rewards" | "earnings" | "history";

const Rewards = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<View>("main");
  const [redeemAmount, setRedeemAmount] = useState("");
  const [activeTab, setActiveTab] = useState<MainTab>("rewards");
  const [showPointsTooltip, setShowPointsTooltip] = useState(false);
  const referralLink = "https://deex.app/ref/johndoe";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pointsToRedeem = Number(redeemAmount) || 0;
  const cashValue = pointsToRedeem * POINT_VALUE;
  const maxRedeem = POINTS_BALANCE;
  const canRedeem = POINTS_BALANCE >= MIN_REDEEM;

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
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Status</span><span className="text-sm px-3 py-0.5 rounded-full bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]">Pending Approval</span></div>
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
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">You'll receive</span><span className="text-sm font-bold text-[hsl(var(--success))]">₦{cashValue.toLocaleString()}</span></div>
              <div className="h-px bg-border" />
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Credit to</span><span className="text-sm text-foreground">8103674006 - PalmPay</span></div>
              <div className="h-px bg-border" />
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Remaining</span><span className="text-sm text-foreground">{(POINTS_BALANCE - pointsToRedeem).toLocaleString()} pts</span></div>
            </div>
            <p className="text-xs text-muted-foreground text-center mb-4">Redemptions require admin approval before disbursement</p>
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
              <p className="text-sm text-[hsl(var(--success))]">≈ ₦{(POINTS_BALANCE * POINT_VALUE).toLocaleString()}</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-3 mb-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-[hsl(var(--warning))] flex-shrink-0" />
              <p className="text-[10px] text-muted-foreground">Minimum redemption: <span className="text-foreground font-medium">500 pts (₦5,000)</span>. Withdrawals go to your saved bank account.</p>
            </div>

            <div className="mb-4">
              <label className="text-sm text-foreground mb-2 block">Points to redeem</label>
              <input type="number" value={redeemAmount} onChange={(e) => setRedeemAmount(e.target.value)} placeholder="Min. 500 points" max={maxRedeem}
                className="w-full h-14 bg-card border border-border rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary text-center text-xl" />
              {pointsToRedeem > 0 && pointsToRedeem < MIN_REDEEM && <p className="text-center text-xs text-destructive mt-1">Minimum {MIN_REDEEM} points (₦{(MIN_REDEEM * POINT_VALUE).toLocaleString()})</p>}
              {pointsToRedeem >= MIN_REDEEM && pointsToRedeem <= maxRedeem && <p className="text-center text-sm text-[hsl(var(--success))] mt-2">= ₦{cashValue.toLocaleString()}</p>}
              {pointsToRedeem > maxRedeem && <p className="text-center text-xs text-destructive mt-1">Exceeds your balance</p>}
            </div>
            <div className="flex gap-2 mb-6">
              {[500, 1000, 2000, maxRedeem].map((amt) => (
                <button key={amt} onClick={() => setRedeemAmount(String(Math.min(amt, maxRedeem)))}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium ${Number(redeemAmount) === amt ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                  {amt === maxRedeem ? "All" : amt}
                </button>
              ))}
            </div>
            <button onClick={() => pointsToRedeem >= MIN_REDEEM && pointsToRedeem <= maxRedeem && setView("confirm")}
              className={`w-full h-14 rounded-xl font-semibold ${pointsToRedeem >= MIN_REDEEM && pointsToRedeem <= maxRedeem ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
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
        <div className="px-4 pt-6 pb-4">
          <h2 className="text-lg font-bold text-foreground mb-4">Rewards</h2>

          {/* Tabs */}
          <div className="flex bg-secondary rounded-full p-1 mb-5">
            {(["rewards", "earnings", "history"] as MainTab[]).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-full text-xs font-medium transition-colors capitalize flex items-center justify-center gap-1 ${activeTab === tab ? "bg-muted text-foreground" : "text-muted-foreground"}`}>
                {tab === "earnings" ? "Earnings Log" : tab === "history" ? "Redemptions" : "Rewards"}
                {tab === "earnings" && <NewBadge />}
              </button>
            ))}
          </div>

          {activeTab === "rewards" && (
            <>
              {/* Sign-Up Bonus */}
              <SignUpBonus tasks={signupTasks} />

              {/* Cashback */}
              <CashbackCard
                currentVolume={650000}
                targetVolume={2000000}
                cashbackReward={50000}
                timeLeft="4d 12h"
              />

              {/* DeeXPoints Card */}
              <button onClick={() => canRedeem ? setView("redeem") : null}
                className="w-full bg-secondary rounded-2xl p-5 mb-5 flex items-center justify-between text-left">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-foreground">DeeXPoints</p>
                    <button onClick={(e) => { e.stopPropagation(); setShowPointsTooltip(!showPointsTooltip); }} className="relative">
                      <Info className="w-3.5 h-3.5 text-muted-foreground" />
                      {showPointsTooltip && (
                        <div className="absolute left-0 top-5 z-10 bg-card border border-border rounded-lg p-3 w-48 shadow-lg">
                          <p className="text-[10px] text-muted-foreground">1 point = ₦10. Redeem to cash when you have ≥500 pts (₦5,000). Withdrawals go to your saved bank account.</p>
                        </div>
                      )}
                    </button>
                  </div>
                  <p className="text-2xl font-bold text-primary">{POINTS_BALANCE.toLocaleString()}</p>
                  <p className="text-xs text-[hsl(var(--success))]">≈ ₦{(POINTS_BALANCE * POINT_VALUE).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium ${canRedeem ? "text-primary" : "text-muted-foreground"}`}>
                    {canRedeem ? "Redeem" : `Need ${MIN_REDEEM - POINTS_BALANCE} more`}
                  </span>
                  <ChevronRight className={`w-5 h-5 ${canRedeem ? "text-primary" : "text-muted-foreground"}`} />
                </div>
              </button>

              {/* Referral Card */}
              <div className="bg-gradient-to-r from-primary/30 to-accent/20 rounded-2xl p-5 mb-5 border border-primary/20">
                <div className="flex items-center gap-3 mb-3">
                  <Gift className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm font-bold text-foreground">Invite Friends & Earn</p>
                    <p className="text-xs text-muted-foreground">Earn 10 pts for every referral trade</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input readOnly value={referralLink} className="flex-1 h-10 bg-secondary/50 rounded-lg px-3 text-xs text-muted-foreground outline-none" />
                  <button onClick={handleCopy} className="h-10 px-4 bg-primary rounded-lg text-primary-foreground text-sm font-medium flex items-center gap-1">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Explore */}
              <h3 className="text-sm font-semibold text-foreground mb-3">Explore</h3>
              <div className="flex gap-3 mb-5">
                <button onClick={() => navigate("/trade-streak")} className="flex-1 bg-secondary rounded-xl p-4 text-left">
                  <Flame className="w-6 h-6 text-[hsl(var(--deex-orange))] mb-2" />
                  <p className="text-sm font-semibold text-foreground">Trade Streak</p>
                  <p className="text-xs text-muted-foreground">100 pts for 7-day streak</p>
                </button>
                <button onClick={() => navigate("/referrals")} className="flex-1 bg-secondary rounded-xl p-4 text-left">
                  <Users className="w-6 h-6 text-primary mb-2" />
                  <p className="text-sm font-semibold text-foreground">Refer & Win</p>
                  <p className="text-xs text-muted-foreground">10 pts per referral trade</p>
                </button>
              </div>

              {/* Daily Streak */}
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

              {/* Reward Breakdown Summary */}
              <div className="bg-card border border-border rounded-xl p-4 mb-4">
                <p className="text-sm font-semibold text-foreground mb-3">How You Earn</p>
                <div className="space-y-2.5">
                  {[
                    { action: "Sign-up Bonus (3 tasks)", reward: "500 pts (₦5,000)", wallet: "DeeXPoints" },
                    { action: "Referral trade (≥ $10)", reward: "10 pts (₦100)", wallet: "DeeXPoints" },
                    { action: "7-day trade streak", reward: "100 pts (₦1,000)", wallet: "DeeXPoints" },
                    { action: "Trade ₦2M weekly", reward: "₦50,000 cashback", wallet: "Bank" },
                  ].map(r => (
                    <div key={r.action} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-xs text-foreground">{r.action}</p>
                        <p className="text-[10px] text-muted-foreground">→ {r.wallet}</p>
                      </div>
                      <span className="text-xs font-semibold text-[hsl(var(--success))]">{r.reward}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "earnings" && <EarningsLog entries={earningsLog} />}

          {activeTab === "history" && <RedemptionHistory history={redemptionHistory} />}
        </div>
      </PageTransition>
      <BottomNav />
    </MobileLayout>
  );
};

export default Rewards;

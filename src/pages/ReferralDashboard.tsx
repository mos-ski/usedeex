import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, Users, Trophy, TrendingUp, ChevronRight } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import NewBadge from "@/components/NewBadge";

const referrals = [
  { name: "Adewale M.", status: "Traded", earned: "₦500", date: "Mar 7" },
  { name: "Chidinma O.", status: "Traded", earned: "₦500", date: "Mar 5" },
  { name: "Ibrahim A.", status: "Signed up", earned: "Pending", date: "Mar 4" },
  { name: "Fatima K.", status: "Traded", earned: "₦500", date: "Mar 1" },
  { name: "Victor E.", status: "Signed up", earned: "Pending", date: "Feb 28" },
];

const leaderboard = [
  { rank: 1, name: "Ibrahim Abubakar", referrals: 86, earned: "₦43,000" },
  { rank: 2, name: "Divine Omajuwa", referrals: 52, earned: "₦26,000" },
  { rank: 3, name: "Chibueze Umeh", referrals: 34, earned: "₦17,000" },
  { rank: 4, name: "You", referrals: 5, earned: "₦2,000" },
];

const ReferralDashboard = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const link = "https://deex.app/ref/johndoe";

  const handleCopy = () => { navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <MobileLayout hideNav>
      <PageTransition>
        <div className="px-4 pt-4 pb-8">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">Referrals</h2>
            <NewBadge />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <Users className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">5</p>
              <p className="text-[10px] text-muted-foreground">Total Referrals</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <TrendingUp className="w-5 h-5 text-success mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">₦2,000</p>
              <p className="text-[10px] text-muted-foreground">Earned</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <Trophy className="w-5 h-5 text-warning mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">₦1,000</p>
              <p className="text-[10px] text-muted-foreground">Pending</p>
            </div>
          </div>

          {/* Link */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
            <p className="text-xs text-muted-foreground mb-2">Your referral link</p>
            <div className="flex gap-2">
              <input readOnly value={link} className="flex-1 h-10 bg-secondary/50 rounded-lg px-3 text-xs text-muted-foreground outline-none" />
              <button onClick={handleCopy} className="h-10 px-4 bg-primary rounded-lg text-primary-foreground text-sm font-medium flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Referral list */}
          <h3 className="text-sm font-semibold text-foreground mb-3">Your Referrals</h3>
          <div className="space-y-2 mb-6">
            {referrals.map((r, i) => (
              <div key={i} className="flex items-center justify-between bg-secondary rounded-xl px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.date} • {r.status}</p>
                </div>
                <span className={`text-xs font-medium ${r.earned === "Pending" ? "text-warning" : "text-success"}`}>{r.earned}</span>
              </div>
            ))}
          </div>

          {/* Leaderboard */}
          <h3 className="text-sm font-semibold text-foreground mb-3">🏆 Leaderboard</h3>
          <div className="space-y-2">
            {leaderboard.map(l => (
              <div key={l.rank} className={`flex items-center justify-between rounded-xl px-4 py-3 ${l.name === "You" ? "bg-primary/10 border border-primary/20" : "bg-secondary"}`}>
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${l.rank <= 3 ? "bg-warning/20 text-warning" : "bg-muted text-muted-foreground"}`}>{l.rank}</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">{l.name}</p>
                    <p className="text-xs text-muted-foreground">{l.referrals} referrals</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground">{l.earned}</span>
              </div>
            ))}
          </div>
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default ReferralDashboard;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check, Share2, QrCode, Gift } from "lucide-react";
import { toast } from "sonner";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import NewBadge from "@/components/NewBadge";
import InviteCodeInput from "@/components/InviteCodeInput";
import InviteCodeProgress from "@/components/InviteCodeProgress";
import { useInviteCode } from "@/contexts/InviteCodeContext";

const myInviteCode = "DX-JOHN4F82";
const shareLink = `https://deexoptions.com/app?code=${myInviteCode}`;

const myReferrals = [
  { name: "Chidinma O.", redeemedAt: "Mar 5, 2026", deposit: true, trade: true, rewards: 500 },
  { name: "Ibrahim A.", redeemedAt: "Mar 8, 2026", deposit: true, trade: false, rewards: 200 },
  { name: "Fatima K.", redeemedAt: "Mar 10, 2026", deposit: false, trade: false, rewards: 0 },
];

const InviteEarn = () => {
  const navigate = useNavigate();
  const { appliedCode, depositCompleted, tradeCompleted, applyCode } = useInviteCode();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(myInviteCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Join me on DeeX", text: `Use my invite code ${myInviteCode} to earn DeeXpoints on DeeX!`, url: shareLink });
        return;
      } catch {
        // user cancelled or share failed, fall back to copy
      }
    }
    navigator.clipboard.writeText(shareLink);
    setCopiedLink(true);
    toast.success("Invite link copied to clipboard");
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <MobileLayout hideNav>
      <PageTransition>
        <div className="px-4 pt-4 pb-8">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h2 className="text-lg font-bold text-foreground">Invite Code</h2>
            <NewBadge />
          </div>

          {/* Enter a code, or track progress on the applied one */}
          {!appliedCode ? (
            <div className="mb-6">
              <InviteCodeInput variant="inline" onApply={applyCode} />
            </div>
          ) : (
            <div className="mb-6">
              <InviteCodeProgress
                code={appliedCode.code}
                depositReward={appliedCode.depositReward}
                tradeReward={appliedCode.tradeReward}
                minDeposit={appliedCode.minDeposit}
                minTrade={appliedCode.minTrade}
                depositCompleted={depositCompleted}
                tradeCompleted={tradeCompleted}
              />
            </div>
          )}

          {/* Your own code to share */}
          <h3 className="text-sm font-semibold text-foreground mb-3">Your Invite Code</h3>
          <div className="bg-card border border-border rounded-2xl p-5 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Gift className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Share this code with friends</p>
                <p className="text-xl font-mono font-bold text-foreground tracking-wider">{myInviteCode}</p>
              </div>
            </div>

            <div className="w-full flex justify-center mb-4">
              <div className="w-40 h-40 bg-foreground rounded-2xl flex items-center justify-center border-4 border-primary/30">
                <QrCode className="w-28 h-28 text-background" />
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={handleCopyCode} className="flex-1 h-11 bg-secondary rounded-xl text-foreground text-sm font-medium flex items-center justify-center gap-2">
                {copiedCode ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                {copiedCode ? "Copied" : "Copy Code"}
              </button>
              <button onClick={handleShare} className="flex-1 h-11 bg-primary rounded-xl text-primary-foreground text-sm font-medium flex items-center justify-center gap-2">
                {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                {copiedLink ? "Link Copied" : "Share Link"}
              </button>
            </div>
          </div>

          {/* Referral status */}
          <h3 className="text-sm font-semibold text-foreground mb-3">Your Referrals</h3>
          <div className="space-y-2">
            {myReferrals.map((r) => (
              <div key={r.name} className="bg-secondary rounded-xl px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">{r.name}</p>
                  <span className="text-sm font-semibold text-primary">{r.rewards} pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Redeemed {r.redeemedAt}</p>
                  <div className="flex gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${r.deposit ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"}`}>Deposit</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${r.trade ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"}`}>Trade</span>
                  </div>
                </div>
              </div>
            ))}
            {myReferrals.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">No referrals yet. Share your code to start earning!</p>
            )}
          </div>
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default InviteEarn;

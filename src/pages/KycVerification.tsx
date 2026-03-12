import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Camera, FileText } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import { Progress } from "@/components/ui/progress";

const levels = [
  { level: 1, title: "Level 1", trading: "₦500K", withdrawal: "₦500K", completed: true },
  { level: 2, title: "Level 2", trading: "₦5M", withdrawal: "₦200K", completed: true },
  { level: 3, title: "Level 3", trading: "₦20M", withdrawal: "₦10M", completed: false },
];

type View = "overview" | "level3";

const KycVerification = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("overview");
  const [uploading, setUploading] = useState(false);

  const completedCount = levels.filter(l => l.completed).length;
  const currentLevel = levels.find(l => !l.completed) || levels[levels.length - 1];
  const progressPercent = (completedCount / levels.length) * 100;

  if (view === "level3") {
    return (
      <MobileLayout hideNav>
        <PageTransition>
          <div className="px-4 pt-4">
            <div className="flex items-center mb-6">
              <button onClick={() => setView("overview")} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <h2 className="text-lg font-bold text-foreground flex-1 text-center pr-10">KYC Level 3</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Government-issued ID</label>
                <div className="w-full h-32 bg-secondary border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Tap to upload (NIN, Passport, Driver's License)</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Live Selfie</label>
                <div className="w-full h-32 bg-secondary border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer">
                  <Camera className="w-8 h-8 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Tap to take a selfie</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Proof of Address</label>
                <div className="w-full h-32 bg-secondary border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Utility bill or bank statement (max 3 months)</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => { setUploading(true); setTimeout(() => { setUploading(false); setView("overview"); }, 1500); }}
              className="w-full h-14 bg-primary rounded-xl text-primary-foreground font-semibold mt-6"
            >
              {uploading ? "Submitting..." : "Submit for Review"}
            </button>
          </div>
        </PageTransition>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout hideNav>
      <PageTransition>
        <div className="px-4 pt-4 pb-8">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h2 className="text-lg font-bold text-foreground flex-1 text-center pr-10">KYC Verification</h2>
          </div>

          {/* Limits Summary Card */}
          <div className="bg-card border border-border rounded-2xl p-5 mb-5">
            <div className="flex">
              {/* Trading */}
              <div className="flex-1 text-center border-r border-border">
                <p className="text-xs font-semibold tracking-wider text-amber-500 mb-1">TRADING</p>
                <p className="text-3xl font-bold text-foreground">{currentLevel.trading}</p>
                <p className="text-xs text-amber-500 mt-1">One-time Payout</p>
              </div>
              {/* Withdrawal */}
              <div className="flex-1 text-center">
                <p className="text-xs font-semibold tracking-wider text-amber-500 mb-1">WITHDRAWAL</p>
                <p className="text-3xl font-bold text-foreground">{currentLevel.withdrawal}</p>
                <p className="text-xs text-amber-500 mt-1">Daily Withdrawal</p>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-5">
              <Progress value={progressPercent} className="h-2.5 bg-muted" />
              <p className="text-xs text-muted-foreground text-right mt-1.5">{completedCount}/{levels.length}</p>
            </div>
          </div>

          {/* Level Cards */}
          <div className="space-y-3">
            {levels.map(l => (
              <div key={l.level} className="bg-card border border-border rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-base font-bold text-foreground">{l.title}</p>
                  {l.completed && (
                    <span className="text-[11px] font-bold text-[hsl(var(--success))] tracking-wide">COMPLETED</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {l.trading} trading • {l.withdrawal} withdrawal
                </p>
              </div>
            ))}
          </div>

          {/* Upgrade CTA */}
          {!currentLevel.completed && (
            <>
              <div className="bg-card border border-border rounded-2xl p-4 mt-3">
                <p className="text-base font-bold text-destructive mb-1">Ready for the highest tier?</p>
                <p className="text-sm text-muted-foreground">
                  Upgrade to Level {currentLevel.level} to unlock {currentLevel.trading} trading and {currentLevel.withdrawal} withdrawal limits with priority processing.
                </p>
              </div>

              <button
                onClick={() => setView("level3")}
                className="w-full h-14 bg-primary rounded-2xl text-primary-foreground font-semibold mt-5"
              >
                Upgrade to level {currentLevel.level}
              </button>
            </>
          )}
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default KycVerification;

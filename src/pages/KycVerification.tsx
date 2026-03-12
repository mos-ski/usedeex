import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Camera, FileText, Briefcase, ShieldCheck, HelpCircle, CheckCircle2 } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const levels = [
  {
    level: 1,
    title: "Level 1",
    tradingLimit: "$1,000",
    withdrawalLimit: "$100",
    requirements: ["BVN submission", "Liveness check (selfie + motion)"],
    completed: false,
  },
  {
    level: 2,
    title: "Level 2",
    tradingLimit: "$10,000",
    withdrawalLimit: "$500",
    requirements: ["Government-issued ID (Passport / NIN / Driver's License)", "Address verification (utility bill / bank statement)"],
    completed: false,
  },
  {
    level: 3,
    title: "Level 3",
    tradingLimit: "$25,000",
    withdrawalLimit: "$1,000",
    requirements: ["Employment / business documentation", "Source of income declaration", "Risk questionnaire", "Mandatory 2FA activation"],
    completed: false,
  },
];

type View = "overview" | "kyc1" | "kyc2" | "kyc3";

const KycVerification = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("overview");
  const [uploading, setUploading] = useState(false);

  const completedCount = levels.filter(l => l.completed).length;
  const nextLevel = levels.find(l => !l.completed);
  const progressPercent = (completedCount / levels.length) * 100;

  // Current max limits (based on highest completed level)
  const currentMaxLevel = levels.filter(l => l.completed).pop() || levels[0];

  const handleSubmit = (levelNum: number) => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      toast.success(`KYC Level ${levelNum} submitted for review`);
      setView("overview");
    }, 1500);
  };

  // KYC Level 1 Flow
  if (view === "kyc1") {
    return (
      <MobileLayout hideNav><PageTransition>
        <div className="px-4 pt-4 pb-8">
          <div className="flex items-center mb-6">
            <button onClick={() => setView("overview")} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h2 className="text-lg font-bold text-foreground flex-1 text-center pr-10">KYC Level 1</h2>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4 mb-4">
            <p className="text-xs text-muted-foreground mb-1">What you'll unlock</p>
            <p className="text-sm text-foreground">$1,000 trading • $100 withdrawal</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">BVN Number</label>
              <input
                type="text"
                placeholder="Enter your 11-digit BVN"
                maxLength={11}
                className="w-full h-12 bg-secondary border border-border rounded-xl px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
              />
              <p className="text-[11px] text-muted-foreground mt-1.5 flex items-center gap-1">
                <HelpCircle className="w-3 h-3" /> Your BVN is used to verify your identity. It is never shared.
              </p>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Liveness Check (Selfie)</label>
              <div className="w-full h-32 bg-secondary border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer">
                <Camera className="w-8 h-8 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Tap to take a live selfie</p>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5 flex items-center gap-1">
                <HelpCircle className="w-3 h-3" /> We need a live selfie to confirm you are a real person.
              </p>
            </div>
          </div>

          <button onClick={() => handleSubmit(1)} className="w-full h-14 bg-primary rounded-2xl text-primary-foreground font-semibold mt-6">
            {uploading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </PageTransition></MobileLayout>
    );
  }

  // KYC Level 2 Flow
  if (view === "kyc2") {
    return (
      <MobileLayout hideNav><PageTransition>
        <div className="px-4 pt-4 pb-8">
          <div className="flex items-center mb-6">
            <button onClick={() => setView("overview")} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h2 className="text-lg font-bold text-foreground flex-1 text-center pr-10">KYC Level 2</h2>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4 mb-4">
            <p className="text-xs text-muted-foreground mb-1">What you'll unlock</p>
            <p className="text-sm text-foreground">$10,000 trading • $500 withdrawal</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Government-issued ID</label>
              <div className="w-full h-32 bg-secondary border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Tap to upload (NIN, Passport, Driver's License)</p>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5 flex items-center gap-1">
                <HelpCircle className="w-3 h-3" /> A valid government ID confirms your legal identity and age.
              </p>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Proof of Address</label>
              <div className="w-full h-32 bg-secondary border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer">
                <FileText className="w-8 h-8 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Utility bill or bank statement (max 3 months old)</p>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5 flex items-center gap-1">
                <HelpCircle className="w-3 h-3" /> Address verification helps us comply with regulatory requirements.
              </p>
            </div>
          </div>

          <button onClick={() => handleSubmit(2)} className="w-full h-14 bg-primary rounded-2xl text-primary-foreground font-semibold mt-6">
            {uploading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </PageTransition></MobileLayout>
    );
  }

  // KYC Level 3 Flow
  if (view === "kyc3") {
    return (
      <MobileLayout hideNav><PageTransition>
        <div className="px-4 pt-4 pb-8">
          <div className="flex items-center mb-6">
            <button onClick={() => setView("overview")} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h2 className="text-lg font-bold text-foreground flex-1 text-center pr-10">KYC Level 3</h2>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4 mb-4">
            <p className="text-xs text-muted-foreground mb-1">What you'll unlock</p>
            <p className="text-sm text-foreground">$25,000 trading • $1,000 withdrawal • Priority processing</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Employment / Business Documentation</label>
              <div className="w-full h-28 bg-secondary border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer">
                <Briefcase className="w-7 h-7 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Employment letter, CAC, or business registration</p>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5 flex items-center gap-1">
                <HelpCircle className="w-3 h-3" /> Helps us understand your source of funds.
              </p>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Source of Income Declaration</label>
              <select className="w-full h-12 bg-secondary border border-border rounded-xl px-4 text-sm text-foreground outline-none focus:border-primary appearance-none">
                <option value="">Select income source</option>
                <option value="salary">Salary / Employment</option>
                <option value="business">Business Income</option>
                <option value="investment">Investment Returns</option>
                <option value="freelance">Freelancing</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Risk Questionnaire</label>
              <div className="bg-secondary border border-border rounded-xl p-4 space-y-3">
                <div>
                  <p className="text-xs text-foreground mb-1.5">What is your expected monthly trading volume?</p>
                  <select className="w-full h-10 bg-card border border-border rounded-lg px-3 text-xs text-foreground outline-none">
                    <option value="">Select range</option>
                    <option value="1k">Less than $1,000</option>
                    <option value="5k">$1,000 – $5,000</option>
                    <option value="10k">$5,000 – $10,000</option>
                    <option value="25k">$10,000 – $25,000</option>
                  </select>
                </div>
                <div>
                  <p className="text-xs text-foreground mb-1.5">What do you primarily use DeeX for?</p>
                  <select className="w-full h-10 bg-card border border-border rounded-lg px-3 text-xs text-foreground outline-none">
                    <option value="">Select purpose</option>
                    <option value="trading">Crypto trading</option>
                    <option value="payments">Payments & transfers</option>
                    <option value="savings">Savings / holding</option>
                    <option value="business">Business operations</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">2FA Required</p>
                <p className="text-xs text-muted-foreground">Two-factor authentication must be enabled before Level 3 activation.</p>
              </div>
            </div>
          </div>

          <button onClick={() => handleSubmit(3)} className="w-full h-14 bg-primary rounded-2xl text-primary-foreground font-semibold mt-6">
            {uploading ? "Submitting..." : "Submit for Review"}
          </button>
        </div>
      </PageTransition></MobileLayout>
    );
  }

  // Overview
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
              <div className="flex-1 text-center border-r border-border">
                <p className="text-xs font-semibold tracking-wider text-[hsl(var(--warning))] mb-1">TRADING</p>
                <p className="text-3xl font-bold text-foreground">{currentMaxLevel.tradingLimit}</p>
                <p className="text-xs text-[hsl(var(--warning))] mt-1">One-time Payout</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-xs font-semibold tracking-wider text-[hsl(var(--warning))] mb-1">WITHDRAWAL</p>
                <p className="text-3xl font-bold text-foreground">{currentMaxLevel.withdrawalLimit}</p>
                <p className="text-xs text-[hsl(var(--warning))] mt-1">Daily Withdrawal</p>
              </div>
            </div>

            <div className="mt-5">
              <Progress value={progressPercent} className="h-2.5 bg-muted" />
              <p className="text-xs text-muted-foreground text-right mt-1.5">{completedCount}/{levels.length}</p>
            </div>
          </div>

          {/* Level Cards */}
          <div className="space-y-3">
            {levels.map(l => (
              <button
                key={l.level}
                onClick={() => !l.completed && setView(`kyc${l.level}` as View)}
                className={`w-full text-left bg-card border rounded-2xl p-4 transition-colors ${l.completed ? "border-[hsl(var(--success))]/30" : "border-border active:bg-secondary"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <p className="text-base font-bold text-foreground">{l.title}</p>
                    {l.completed && (
                      <span className="text-[11px] font-bold text-[hsl(var(--success))] tracking-wide flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> COMPLETED
                      </span>
                    )}
                  </div>
                  {!l.completed && (
                    <span className="text-xs text-primary font-medium">Start →</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {l.tradingLimit} trading • {l.withdrawalLimit} withdrawal
                </p>
              </button>
            ))}
          </div>

          {/* Upgrade CTA */}
          {nextLevel && (
            <>
              <div className="bg-card border border-border rounded-2xl p-4 mt-3">
                <p className="text-base font-bold text-destructive mb-1">Ready for the highest tier?</p>
                <p className="text-sm text-muted-foreground">
                  Upgrade to Level {nextLevel.level} to unlock {nextLevel.tradingLimit} trading and {nextLevel.withdrawalLimit} withdrawal limits with priority processing.
                </p>
              </div>

              <button
                onClick={() => setView(`kyc${nextLevel.level}` as View)}
                className="w-full h-14 bg-primary rounded-2xl text-primary-foreground font-semibold mt-5"
              >
                Upgrade to Level {nextLevel.level}
              </button>
            </>
          )}
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default KycVerification;

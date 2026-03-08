import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Mail, Phone, CreditCard, Camera, FileText, Upload } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import NewBadge from "@/components/NewBadge";

const levels = [
  { level: 1, title: "Basic", desc: "Email & Phone", icon: Mail, items: ["Email verification", "Phone number"], limit: "₦50,000/day", completed: true },
  { level: 2, title: "Standard", desc: "BVN / NIN", icon: CreditCard, items: ["BVN or NIN number", "Date of birth"], limit: "₦500,000/day", completed: true },
  { level: 3, title: "Premium", desc: "ID Upload + Selfie", icon: Camera, items: ["Government-issued ID", "Live selfie", "Proof of address"], limit: "₦5,000,000/day", completed: false },
];

type View = "overview" | "level3";

const KycVerification = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("overview");
  const [uploading, setUploading] = useState(false);

  if (view === "level3") {
    return (
      <MobileLayout hideNav><PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setView("overview")} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">KYC Level 3</h2>
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

          <button onClick={() => { setUploading(true); setTimeout(() => { setUploading(false); setView("overview"); }, 1500); }}
            className="w-full h-14 bg-primary rounded-xl text-primary-foreground font-semibold mt-6">
            {uploading ? "Submitting..." : "Submit for Review"}
          </button>
        </div>
      </PageTransition></MobileLayout>
    );
  }

  return (
    <MobileLayout hideNav>
      <PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">KYC Verification</h2>
            <NewBadge />
          </div>

          <div className="space-y-3">
            {levels.map(l => (
              <div key={l.level} className={`bg-card border rounded-xl p-4 ${l.completed ? "border-success/30" : "border-border"}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${l.completed ? "bg-success/20" : "bg-secondary"}`}>
                      {l.completed ? <Check className="w-5 h-5 text-success" /> : <l.icon className="w-5 h-5 text-muted-foreground" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Level {l.level} — {l.title}</p>
                      <p className="text-xs text-muted-foreground">{l.desc}</p>
                    </div>
                  </div>
                  {l.completed ? (
                    <span className="text-[10px] bg-success/20 text-success px-2 py-0.5 rounded-full">Verified</span>
                  ) : (
                    <button onClick={() => setView("level3")} className="text-xs text-primary font-medium">Start →</button>
                  )}
                </div>
                <div className="ml-13 space-y-1">
                  {l.items.map(item => (
                    <p key={item} className="text-xs text-muted-foreground flex items-center gap-2">
                      {l.completed ? <Check className="w-3 h-3 text-success" /> : <span className="w-3 h-3 rounded-full border border-muted-foreground inline-block" />}
                      {item}
                    </p>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Daily limit: <span className="text-foreground font-medium">{l.limit}</span></p>
              </div>
            ))}
          </div>
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default KycVerification;

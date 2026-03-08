import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Fingerprint, Smartphone, Key, Clock, ChevronRight, LogOut } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import NewBadge from "@/components/NewBadge";

const sessions = [
  { device: "iPhone 15 Pro", location: "Lagos, NG", time: "Active now", current: true },
  { device: "Chrome on MacBook", location: "Lagos, NG", time: "2 hours ago", current: false },
  { device: "Samsung Galaxy S24", location: "Abuja, NG", time: "3 days ago", current: false },
];

const loginHistory = [
  { date: "Mar 8, 2026", time: "2:30 PM", device: "iPhone 15 Pro", status: "Success" },
  { date: "Mar 7, 2026", time: "9:15 AM", device: "Chrome on MacBook", status: "Success" },
  { date: "Mar 5, 2026", time: "11:45 PM", device: "Unknown Device", status: "Failed" },
  { date: "Mar 4, 2026", time: "8:00 AM", device: "iPhone 15 Pro", status: "Success" },
];

const SecuritySettings = () => {
  const navigate = useNavigate();
  const [biometric, setBiometric] = useState(true);
  const [twoFA, setTwoFA] = useState(false);

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <div onClick={onToggle} className={`w-11 h-6 rounded-full flex items-center transition-colors cursor-pointer ${on ? "bg-primary" : "bg-muted"}`}>
      <div className={`w-5 h-5 rounded-full bg-foreground transition-transform ${on ? "translate-x-5.5" : "translate-x-0.5"}`} style={{ transform: `translateX(${on ? 22 : 2}px)` }} />
    </div>
  );

  return (
    <MobileLayout hideNav>
      <PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">Security</h2>
            <NewBadge />
          </div>

          <div className="space-y-2 mb-6">
            <button className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-3.5">
              <div className="flex items-center gap-3"><Key className="w-5 h-5 text-muted-foreground" /><span className="text-sm font-medium text-foreground">Change PIN</span></div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
            <div className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-3.5">
              <div className="flex items-center gap-3"><Fingerprint className="w-5 h-5 text-muted-foreground" /><span className="text-sm font-medium text-foreground">Biometric Login</span></div>
              <Toggle on={biometric} onToggle={() => setBiometric(!biometric)} />
            </div>
            <div className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-3.5">
              <div className="flex items-center gap-3"><Shield className="w-5 h-5 text-muted-foreground" /><span className="text-sm font-medium text-foreground">Two-Factor Auth (2FA)</span></div>
              <Toggle on={twoFA} onToggle={() => setTwoFA(!twoFA)} />
            </div>
          </div>

          <h3 className="text-sm font-semibold text-foreground mb-3">Active Sessions</h3>
          <div className="space-y-2 mb-6">
            {sessions.map((s, i) => (
              <div key={i} className="flex items-center justify-between bg-secondary rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.device} {s.current && <span className="text-[10px] bg-success/20 text-success px-1.5 py-0.5 rounded ml-1">Current</span>}</p>
                    <p className="text-xs text-muted-foreground">{s.location} • {s.time}</p>
                  </div>
                </div>
                {!s.current && <button className="text-xs text-destructive"><LogOut className="w-4 h-4" /></button>}
              </div>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-foreground mb-3">Login History</h3>
          <div className="space-y-2 mb-4">
            {loginHistory.map((l, i) => (
              <div key={i} className="flex items-center justify-between bg-secondary rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{l.device}</p>
                    <p className="text-xs text-muted-foreground">{l.date} • {l.time}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${l.status === "Success" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}`}>{l.status}</span>
              </div>
            ))}
          </div>
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default SecuritySettings;

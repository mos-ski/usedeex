import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Building2, FileText, BadgeCheck, Users, Info, LogOut, ChevronRight, HelpCircle } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import NewBadge from "@/components/NewBadge";

const settingsItems = [
  { icon: Shield, label: "Security", path: "/security", isNew: true },
  { icon: Building2, label: "Bank Accounts", path: "/bank-accounts", isNew: true },
  { icon: FileText, label: "Generate Statement", path: "/profile" },
  { icon: BadgeCheck, label: "KYC Verification", path: "/kyc", badge: true, badgeText: "Verified", isNew: true },
  { icon: Users, label: "Refer & Earn", path: "/referrals", isNew: true },
  { icon: HelpCircle, label: "Help & Support", path: "/support", isNew: true },
  { icon: Info, label: "About DeeX", path: "/profile" },
];

const Profile = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout hideNav>
      <div className="px-4 pt-4">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-lg font-bold text-foreground">Profile</h2>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary mb-3">JD</div>
          <p className="text-lg font-bold text-foreground">John Doe</p>
          <p className="text-sm text-muted-foreground">johndoe@email.com</p>
          <p className="text-xs text-muted-foreground">@johndoe</p>
          <button className="mt-3 px-6 py-2 bg-secondary rounded-full text-sm text-foreground font-medium">Edit Profile</button>
        </div>

        <div className="space-y-2 mb-6">
          {settingsItems.map((item) => (
            <button key={item.label} onClick={() => navigate(item.path || "/profile")} className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-3.5">
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                {item.isNew && <NewBadge />}
              </div>
              <div className="flex items-center gap-2">
                {item.badge && <span className="text-[10px] bg-success/20 text-success px-2 py-0.5 rounded-full">{item.badgeText}</span>}
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>

        <button onClick={() => navigate("/login")} className="w-full flex items-center justify-center gap-2 h-12 border border-destructive rounded-xl text-destructive font-medium">
          <LogOut className="w-5 h-5" /> Log Out
        </button>
      </div>
    </MobileLayout>
  );
};

export default Profile;

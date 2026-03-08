import { useNavigate } from "react-router-dom";
import { Gift, TrendingUp, ArrowDownLeft, Send, Banknote, FileText, X } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";

const QuickAction = () => {
  const navigate = useNavigate();

  const actions = [
    { icon: Gift, label: "Sell Gift Card", path: "/giftcards", color: "bg-warning/15 text-warning" },
    { icon: TrendingUp, label: "See Rates", path: "/dashboard", color: "bg-accent/15 text-accent" },
    { icon: ArrowDownLeft, label: "Deposit Crypto", path: "/deposit", color: "bg-primary/15 text-primary" },
    { icon: Send, label: "Sell Crypto", path: "/sell-crypto", color: "bg-success/15 text-success" },
    { icon: Banknote, label: "Send Money", path: "/send-money", color: "bg-deex-purple/15 text-deex-purple" },
    { icon: FileText, label: "Generate Statement", path: "/profile", color: "bg-deex-orange/15 text-deex-orange" },
  ];

  return (
    <MobileLayout hideNav>
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
          <button onClick={() => navigate(-1)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <X className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-xl font-bold text-foreground mb-8">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3 w-full">
            {actions.map((a) => (
              <button key={a.label} onClick={() => navigate(a.path)} className="bg-secondary rounded-2xl p-4 flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-full ${a.color} flex items-center justify-center`}>
                  <a.icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-medium text-foreground text-center leading-tight">{a.label}</span>
              </button>
            ))}
          </div>
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default QuickAction;

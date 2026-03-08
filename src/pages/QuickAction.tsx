import { useNavigate } from "react-router-dom";
import { ArrowDownLeft, Send, CreditCard, Gift, X } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";

const QuickAction = () => {
  const navigate = useNavigate();

  const actions = [
    { icon: ArrowDownLeft, label: "Deposit", path: "/deposit", color: "bg-primary/15 text-primary" },
    { icon: Send, label: "Sell Crypto", path: "/sell-crypto", color: "bg-success/15 text-success" },
    { icon: CreditCard, label: "DeeX Pay", path: "/deex-pay", color: "bg-accent/15 text-accent" },
    { icon: Gift, label: "Sell Gift Card", path: "/giftcards", color: "bg-warning/15 text-warning" },
  ];

  return (
    <MobileLayout hideNav>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
        <button onClick={() => navigate(-1)} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <X className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="text-xl font-bold text-foreground mb-8">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4 w-full">
          {actions.map((a) => (
            <button key={a.label} onClick={() => navigate(a.path)} className="bg-secondary rounded-2xl p-6 flex flex-col items-center gap-3">
              <div className={`w-14 h-14 rounded-full ${a.color} flex items-center justify-center`}>
                <a.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-foreground">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default QuickAction;

import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Shield, FileText, Scale } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import NewBadge from "@/components/NewBadge";

const AboutDeeX = () => {
  const navigate = useNavigate();

  const items = [
    { icon: FileText, label: "Terms of Service", action: () => {} },
    { icon: Shield, label: "Privacy Policy", action: () => {} },
    { icon: Scale, label: "AML Policy", action: () => {} },
  ];

  return (
    <MobileLayout hideNav>
      <PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">About DeeX</h2>
            <NewBadge />
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center text-2xl font-bold text-primary mb-3">DX</div>
            <p className="text-lg font-bold text-foreground">DeeX</p>
            <p className="text-sm text-muted-foreground">Version 2.4.1</p>
            <p className="text-xs text-muted-foreground mt-1">Build #1842</p>
          </div>

          <p className="text-sm text-muted-foreground text-center mb-8 leading-relaxed">
            DeeX is a fast, secure platform for trading crypto, selling gift cards, paying bills, and sending money — all in one app.
          </p>

          <div className="space-y-2 mb-8">
            {items.map((item) => (
              <button key={item.label} onClick={item.action} className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">© 2026 DeeX Technologies Ltd.</p>
            <p className="text-xs text-muted-foreground mt-1">All rights reserved.</p>
          </div>
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default AboutDeeX;

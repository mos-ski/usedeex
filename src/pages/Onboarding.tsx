import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Coins, CreditCard, Gift } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";

const slides = [
  { icon: Coins, title: "Trade Crypto Instantly", desc: "Buy, sell and swap crypto at the best rates. Get paid directly to your bank in seconds.", color: "text-primary" },
  { icon: CreditCard, title: "Pay Bills & Send Money", desc: "Airtime, data, electricity, betting — all from one app. Send money to any bank for free.", color: "text-accent" },
  { icon: Gift, title: "Earn Rewards on Every Trade", desc: "Collect DeeXpoints with every transaction. Redeem for cash or unlock exclusive perks.", color: "text-[hsl(var(--warning))]" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
    else { localStorage.setItem("deex_onboarded", "1"); navigate("/dashboard"); }
  };

  return (
    <MobileLayout hideNav>
      <div className="min-h-screen flex flex-col px-6 pt-20 pb-10">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className={`w-24 h-24 rounded-3xl bg-secondary flex items-center justify-center mb-8 ${slides[current].color}`}>
            {(() => { const Icon = slides[current].icon; return <Icon className="w-12 h-12" />; })()}
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">{slides[current].title}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px]">{slides[current].desc}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all ${i === current ? "w-8 bg-primary" : "w-2 bg-muted"}`} />
            ))}
          </div>
          <button onClick={next} className="h-14 px-8 bg-primary rounded-2xl text-primary-foreground font-semibold flex items-center gap-2">
            {current === slides.length - 1 ? "Get Started" : "Next"} <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {current < slides.length - 1 && (
          <button onClick={() => { localStorage.setItem("deex_onboarded", "1"); navigate("/dashboard"); }} className="text-muted-foreground text-sm mt-4 text-center">
            Skip
          </button>
        )}
      </div>
    </MobileLayout>
  );
};

export default Onboarding;

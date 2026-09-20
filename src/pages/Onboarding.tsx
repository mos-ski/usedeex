import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { PrimaryButton } from "@/components/dashboard/AppShell";
import { ArrowRightIcon, GiftIcon, PhoneCallIcon, SwapIcon } from "@/components/dashboard/icons";
import { cn } from "@/lib/utils";

const slides = [
  { Icon: SwapIcon, title: "Trade Crypto Instantly", desc: "Buy, sell and swap crypto at the best rates. Get paid directly to your bank in seconds." },
  { Icon: PhoneCallIcon, title: "Pay Bills & Send Money", desc: "Airtime, data, electricity, betting — all from one app. Send money to any bank for free." },
  { Icon: GiftIcon, title: "Earn Rewards on Every Trade", desc: "Collect DeeXpoints with every transaction. Redeem for cash or unlock exclusive perks." },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const last = current === slides.length - 1;

  const finish = () => {
    localStorage.setItem("deex_onboarded", "1");
    navigate("/dashboard");
  };

  const { Icon, title, desc } = slides[current];

  return (
    <div className="min-h-[100dvh] bg-brand-deepNavy font-roboto text-white antialiased">
      <PageTransition>
        <div className="mx-auto flex min-h-[100dvh] w-full max-w-[420px] flex-col px-6 pb-[calc(2.5rem+env(safe-area-inset-bottom))] pt-[max(env(safe-area-inset-top),44px)]">
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <span className="flex size-24 items-center justify-center rounded-3xl bg-white/5 text-brand-blue400">
              <Icon className="size-12" />
            </span>
            <h1 className="pt-8 font-gasoek text-[28px] uppercase leading-[1.3]">{title}</h1>
            <p className="max-w-[280px] pt-3 text-sm leading-[1.6] text-brand-grey400">{desc}</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {slides.map((slide, i) => (
                <span
                  key={slide.title}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === current ? "w-8 bg-brand-blue500" : "w-2 bg-white/20",
                  )}
                />
              ))}
            </div>

            <PrimaryButton
              className="w-auto px-8"
              onClick={() => (last ? finish() : setCurrent(current + 1))}
            >
              {last ? "Get Started" : "Next"}
              <ArrowRightIcon className="size-5" />
            </PrimaryButton>
          </div>

          {!last && (
            <button type="button" onClick={finish} className="pt-4 text-sm leading-[1.6] text-brand-grey500">
              Skip
            </button>
          )}
        </div>
      </PageTransition>
    </div>
  );
};

export default Onboarding;

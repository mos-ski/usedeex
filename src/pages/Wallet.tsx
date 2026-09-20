import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppShell, SectionCard, SectionHeader } from "@/components/dashboard/AppShell";
import FloatingNav from "@/components/dashboard/FloatingNav";
import { GiftIcon, TrendArrowIcon } from "@/components/dashboard/icons";
import AssetRow from "@/components/dashboard/AssetRow";
import { nairaWalletBalance } from "@/data/nairaWalletData";
import { NGN_PER_USD, formatNgn, formatUsd } from "@/lib/format";
import { cn } from "@/lib/utils";

const assets = [
  { symbol: "BTC", name: "Bitcoin", usd: 2280.12 },
  { symbol: "ETH", name: "Ethereum", usd: 487.5 },
  { symbol: "USDT", name: "Tether", usd: 5420 },
  { symbol: "USDC", name: "US Dollar Coin", usd: 2100 },
  { symbol: "TRX", name: "Tron", usd: 168 },
];

const Wallet = () => {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) setSlide(diff > 0 ? 1 : 0);
  };

  return (
    // Mobile mirrors the Figma: navy block flush against a white list that runs to
    // the bottom edge. From `sm` up both become cards in the standard shell.
    <AppShell topColor="bg-brand-deepNavy" innerClassName="flex min-h-[100dvh] flex-col pb-0 sm:block sm:min-h-0 sm:pb-36">
      <PageTransition className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col sm:gap-3 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-5 lg:pt-6">
          {/* Holdings / rewards card */}
          <section
            className="bg-brand-deepNavy text-white lg:sticky lg:top-6"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <header className="flex h-14 items-center justify-between gap-4 px-6">
              <h1 className="min-w-0 flex-1 truncate text-[19px] font-bold leading-[1.4] lg:text-2xl">Wallet</h1>
              <button
                type="button"
                onClick={() => navigate("/rewards")}
                className="flex shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-[13px] font-bold leading-[1.6] text-white transition-opacity hover:opacity-90"
                style={{ backgroundImage: "linear-gradient(121.21deg, rgb(255, 95, 109) 0%, rgb(255, 195, 113) 100%)" }}
              >
                <span className="font-manrope">Rewards</span>
                <GiftIcon className="size-3" />
              </button>
            </header>

            <div className="flex flex-col items-center gap-3 px-6 py-[18px] lg:py-8">
              {slide === 0 ? (
                <>
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-[10px] font-bold uppercase leading-[1.6] text-brand-grey600 lg:text-xs">
                      Holdings
                    </p>
                    <p className="whitespace-nowrap font-gasoek leading-[1.4]">
                      <span className="text-[33px] lg:text-[42px]">$1,458.</span>
                      <span className="text-[17px] lg:text-[22px]">98</span>
                    </p>
                  </div>
                  <p className="flex items-center gap-0.5 font-manrope text-[11px] font-medium leading-[1.6] lg:text-xs">
                    <TrendArrowIcon className="size-3 text-brand-gain" />
                    <span className="text-brand-gain">23%</span>
                    <span className="ml-1 text-brand-primary100">(24h)</span>
                  </p>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center gap-1">
                    <p className="text-[10px] font-bold uppercase leading-[1.6] text-brand-grey600 lg:text-xs">
                      Rewards earned
                    </p>
                    <p className="whitespace-nowrap font-gasoek leading-[1.4]">
                      <span className="text-[33px] lg:text-[42px]">2,450</span>
                      <span className="ml-1 text-[17px] lg:text-[22px]">pts</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("/rewards")}
                    className="font-manrope text-[11px] font-medium leading-[1.6] text-brand-primary100 underline-offset-2 hover:underline lg:text-xs"
                  >
                    ≈ ₦24,500 · Redeem points →
                  </button>
                </>
              )}

              <div className="flex items-center gap-1.5" role="tablist" aria-label="Balance view">
                {["Holdings", "Rewards earned"].map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    role="tab"
                    aria-selected={slide === i}
                    aria-label={label}
                    onClick={() => setSlide(i)}
                    className={cn(
                      "size-[4.33px] rounded-full transition-colors",
                      slide === i ? "bg-brand-surface" : "bg-brand-blue500",
                    )}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Assets */}
          <SectionCard className="flex-1 px-4 pb-28 sm:pb-3 lg:pb-5">
            <SectionHeader title="Assets" />
            <div className="flex flex-col">
              <AssetRow
                symbol="NGN"
                name="Naira Wallet"
                primary={formatNgn(nairaWalletBalance)}
                secondary={formatUsd(nairaWalletBalance / NGN_PER_USD)}
                onClick={() => navigate("/naira-wallet")}
              />

              {assets.map((asset) => (
                <AssetRow
                  key={asset.symbol}
                  symbol={asset.symbol}
                  name={asset.name}
                  primary={formatNgn(asset.usd * NGN_PER_USD)}
                  secondary={formatUsd(asset.usd)}
                  onClick={() => navigate(`/asset/${asset.symbol.toLowerCase()}`)}
                />
              ))}
            </div>
          </SectionCard>
        </div>
      </PageTransition>

      <FloatingNav />
    </AppShell>
  );
};

export default Wallet;

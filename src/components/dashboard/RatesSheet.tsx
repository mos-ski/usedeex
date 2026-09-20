import { useMemo, useState } from "react";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { NGN_PER_USD } from "@/lib/format";
import AssetMark from "./AssetMark";

const rates = [
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "USDT", name: "Tether" },
  { symbol: "USDC", name: "US Dollar Coin" },
  { symbol: "TRX", name: "Tron" },
];

export const RatesSheet = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const [query, setQuery] = useState("");
  const [side, setSide] = useState<"sell" | "buy">("sell");
  const visibleRates = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return rates;
    return rates.filter((rate) => rate.symbol.toLowerCase().includes(normalized) || rate.name.toLowerCase().includes(normalized));
  }, [query]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="rounded-t-lg border-0 bg-white font-roboto [&>div:first-child]:mx-auto [&>div:first-child]:mt-3 [&>div:first-child]:h-1 [&>div:first-child]:w-12 [&>div:first-child]:bg-[#D9D9D9]">
        <DrawerTitle className="sr-only">Todays Rate</DrawerTitle>
        <div className="mx-auto w-full max-w-[560px] px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-9">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search coin to receive"
            aria-label="Search rates"
            className="w-full rounded-lg border border-brand-grey100 bg-white p-4 text-sm leading-[1.6] text-brand-grey900 outline-none placeholder:text-brand-grey300 focus:border-brand-blue500"
          />

          <div className="mt-2 flex gap-3 rounded bg-brand-barBg p-0.5">
            {(["sell", "buy"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSide(option)}
                className={`rounded px-2 py-1.5 text-xs font-semibold leading-[1.4] ${
                  side === option ? "bg-white text-brand-blue500" : "text-brand-grey900"
                }`}
              >
                {option === "sell" ? "Sell" : "Buy"}
              </button>
            ))}
          </div>

          <p className="py-1.5 pt-4 text-xs font-semibold leading-[1.4] text-brand-grey900">Todays Rate</p>
          <div className="flex flex-col">
            {visibleRates.length === 0 ? (
              <p className="py-10 text-center text-sm text-brand-bodyText">No coins match that search.</p>
            ) : (
              visibleRates.map((rate) => (
                <div key={rate.symbol} className="flex items-center gap-4 border-b border-brand-grey100 py-3">
                  <AssetMark symbol={rate.symbol} className="size-8" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">{rate.symbol}</span>
                    <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{rate.name}</span>
                  </div>
                  <span className="whitespace-nowrap text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                    ₦{NGN_PER_USD.toLocaleString("en-NG")}/$
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default RatesSheet;

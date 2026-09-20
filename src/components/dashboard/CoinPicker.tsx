import { useMemo, useState } from "react";
import AssetMark from "./AssetMark";
import AssetRow from "./AssetRow";
import { ChevronRightIcon } from "./icons";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { NGN_PER_USD, formatNgn, formatUsd } from "@/lib/format";

export type PickableCoin = {
  symbol: string;
  name: string;
  networks: string[];
  /** Holding in USD; the row shows it in naira with the dollar value beneath. */
  usd?: number;
};

/**
 * Coin chooser bottom sheet (Figma 299:25076) with the network sheet
 * (Figma 299:25502) layered on top once a coin with several chains is picked.
 */
export const CoinPicker = ({
  open,
  onOpenChange,
  placeholder = "Search coin to receive",
  coins,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
  coins: PickableCoin[];
  /** Fires once both a coin and its network have been chosen. */
  onSelect: (symbol: string, network: string) => void;
}) => {
  const [query, setQuery] = useState("");
  const [pending, setPending] = useState<PickableCoin | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return coins;
    return coins.filter((c) => c.symbol.toLowerCase().includes(q) || c.name.toLowerCase().includes(q));
  }, [coins, query]);

  const choose = (coin: PickableCoin) => {
    if (coin.networks.length > 1) {
      setPending(coin);
      return;
    }
    onSelect(coin.symbol, coin.networks[0]);
    onOpenChange(false);
  };

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="border-brand-grey100 bg-white font-roboto">
          <DrawerTitle className="sr-only">Select coin</DrawerTitle>
          <div className="mx-auto w-full max-w-[560px] px-4 pb-8">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              aria-label="Search coins"
              className="w-full rounded-lg border border-brand-grey100 bg-white p-4 text-sm leading-[1.6] text-brand-grey900 outline-none placeholder:text-brand-grey300 focus:border-brand-blue500"
            />

            <p className="py-1.5 pt-4 text-xs font-semibold leading-[1.4] text-brand-grey900">Assets</p>

            <div className="flex max-h-[45vh] flex-col overflow-y-auto">
              {visible.length === 0 ? (
                <p className="py-10 text-center text-sm text-brand-bodyText">No coins match that search.</p>
              ) : (
                visible.map((coin) => (
                  <AssetRow
                    key={coin.symbol}
                    symbol={coin.symbol}
                    name={coin.name}
                    primary={formatNgn((coin.usd ?? 0) * NGN_PER_USD)}
                    secondary={formatUsd(coin.usd ?? 0)}
                    onClick={() => choose(coin)}
                  />
                ))
              )}
            </div>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Select Network (Figma 299:25502) */}
      <Drawer open={Boolean(pending)} onOpenChange={(next) => !next && setPending(null)}>
        <DrawerContent className="border-brand-grey100 bg-white font-roboto">
          <DrawerTitle className="sr-only">Select network</DrawerTitle>
          <div className="mx-auto w-full max-w-[560px] px-4 pb-8">
            <p className="py-1.5 text-xs font-semibold leading-[1.4] text-brand-grey900">Select Network</p>
            <div className="flex flex-col">
              {pending?.networks.map((network) => (
                <button
                  key={network}
                  type="button"
                  onClick={() => {
                    onSelect(pending.symbol, network);
                    setPending(null);
                    onOpenChange(false);
                  }}
                  className="flex items-center gap-4 border-b border-brand-grey100 py-3 text-left transition-colors last:border-b-0 hover:bg-brand-grey50"
                >
                  <AssetMark symbol={pending.symbol} className="size-6" />
                  <span className="min-w-0 flex-1 truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                    {network}
                  </span>
                  <ChevronRightIcon className="size-5 shrink-0 text-brand-grey900" />
                </button>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CoinPicker;

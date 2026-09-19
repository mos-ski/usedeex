import { useMemo, useState } from "react";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader } from "./AppShell";
import AssetMark from "./AssetMark";
import { ChevronRightIcon, FilterLinesIcon } from "./icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

export type PickableCoin = { symbol: string; name: string; networks: string[] };

/** Chain families used by the quick-filter chips. */
const chipFilters = ["All", "BTC", "ETH", "POL"] as const;
type Chip = (typeof chipFilters)[number];

const chipMatches = (chip: Chip, coin: PickableCoin) => {
  if (chip === "All") return true;
  if (chip === "BTC") return coin.symbol === "BTC";
  if (chip === "ETH") return coin.networks.some((n) => /ERC|Arbitrum|Ethereum/i.test(n));
  return coin.networks.some((n) => /POL|Polygon/i.test(n));
};

/**
 * Full-screen coin chooser (Figma 259:1739) with the network bottom sheet
 * (Figma 259:3085) layered on top once a coin is picked.
 */
export const CoinPicker = ({
  title = "Select coin to receive",
  coins,
  onBack,
  onSelect,
}: {
  title?: string;
  coins: PickableCoin[];
  onBack: () => void;
  /** Fires once both a coin and its network have been chosen. */
  onSelect: (symbol: string, network: string) => void;
}) => {
  const [query, setQuery] = useState("");
  const [chip, setChip] = useState<Chip>("All");
  const [pending, setPending] = useState<PickableCoin | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return coins.filter(
      (c) => chipMatches(chip, c) && (!q || c.symbol.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)),
    );
  }, [coins, chip, query]);

  return (
    <AppShell className="bg-white" innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title={title} onBack={onBack} />

        <div className="px-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search coin to receive"
            aria-label="Search coins"
            className="w-full rounded-lg border border-brand-grey100 bg-white p-4 text-sm leading-[1.6] text-brand-grey900 outline-none placeholder:text-brand-grey300 focus:border-brand-blue500"
          />

          <div className="mt-2 flex items-center gap-2">
            <div
              role="tablist"
              aria-label="Filter by chain"
              className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto rounded bg-brand-barBg p-0.5"
            >
              {chipFilters.map((c) => (
                <button
                  key={c}
                  role="tab"
                  type="button"
                  aria-selected={chip === c}
                  onClick={() => setChip(c)}
                  className={cn(
                    "shrink-0 rounded px-2 py-1.5 text-xs font-semibold leading-[1.4] transition-colors",
                    chip === c ? "bg-white text-brand-blue500" : "text-brand-grey900 hover:text-brand-blue500",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>

            <Popover>
              <PopoverTrigger
                aria-label="Filter options"
                className="flex shrink-0 items-center rounded p-2 text-brand-blue500 transition-colors hover:bg-brand-grey50"
              >
                <FilterLinesIcon className="size-[18px]" />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-44 border-brand-grey100 bg-white p-1">
                {chipFilters.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setChip(c)}
                    className={cn(
                      "w-full rounded px-2 py-1.5 text-left text-xs font-medium transition-colors hover:bg-brand-grey50",
                      chip === c ? "text-brand-blue500" : "text-brand-grey900",
                    )}
                  >
                    {c === "All" ? "All chains" : `${c} chain`}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col pt-2">
            {visible.length === 0 ? (
              <p className="py-10 text-center text-sm text-brand-bodyText">No coins match that search.</p>
            ) : (
              visible.map((coin) => (
                <button
                  key={coin.symbol}
                  type="button"
                  onClick={() => (coin.networks.length > 1 ? setPending(coin) : onSelect(coin.symbol, coin.networks[0]))}
                  className="flex items-center gap-4 border-b border-brand-grey100 py-3 text-left transition-colors hover:bg-brand-grey50"
                >
                  <AssetMark symbol={coin.symbol} />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                      {coin.symbol}
                    </span>
                    <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{coin.name}</span>
                  </span>
                  <ChevronRightIcon className="size-5 shrink-0 text-brand-grey900" />
                </button>
              ))
            )}
          </div>
        </div>
      </PageTransition>

      {/* Network bottom sheet */}
      <Drawer open={Boolean(pending)} onOpenChange={(open) => !open && setPending(null)}>
        <DrawerContent className="border-brand-grey100 bg-white font-roboto">
          <DrawerTitle className="sr-only">Select network</DrawerTitle>
          <div className="mx-auto w-full max-w-[560px] px-4 pb-8">
            <div className="flex items-start gap-[18px] py-1.5">
              <h2 className="min-w-0 flex-1 text-xs font-semibold leading-[1.4] text-brand-grey900">Select Network</h2>
            </div>
            <div className="flex flex-col">
              {pending?.networks.map((network) => (
                <button
                  key={network}
                  type="button"
                  onClick={() => {
                    onSelect(pending.symbol, network);
                    setPending(null);
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
    </AppShell>
  );
};

export default CoinPicker;

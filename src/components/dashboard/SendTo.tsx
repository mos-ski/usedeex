import { useMemo, useState } from "react";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader } from "./AppShell";
import AssetMark from "./AssetMark";
import { ArrowRightIcon, CaretDownIcon } from "./icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { CryptoDestination } from "@/data/recipientData";

export type Destination = CryptoDestination;

export const chains = [
  { name: "BNB Smart Chain", symbol: "BTC" },
  { name: "Ethereum (ERC-20)", symbol: "ETH" },
  { name: "Tron (TRC-20)", symbol: "TRX" },
  { name: "Solana", symbol: "USDC" },
];

/**
 * Destination picker for crypto sends (Figma 269:5828). Search, a chain filter,
 * a paste shortcut, and Recent / Beneficiary lists — covering both saved
 * addresses and saved usernames.
 */
export const SendTo = ({
  title = "Send to",
  onBack,
  destinations,
  onSelect,
}: {
  title?: string;
  onBack: () => void;
  destinations: Destination[];
  onSelect: (destination: Destination) => void;
}) => {
  const [query, setQuery] = useState("");
  const [chain, setChain] = useState(chains[0]);
  const [tab, setTab] = useState<"recent" | "beneficiary">("recent");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinations.filter(
      (d) =>
        d.kind === tab &&
        (!q || d.value.toLowerCase().includes(q) || d.label.toLowerCase().includes(q) || d.symbol.toLowerCase().includes(q)),
    );
  }, [destinations, tab, query]);

  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setQuery(text.trim());
    } catch {
      // Clipboard read can be blocked; the field stays editable either way.
    }
  };

  return (
    <AppShell className="bg-brand-surface" innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title={title} onBack={onBack} />

        <div className="px-4">
          {/* Search + chain + paste */}
          <div className="flex flex-col items-center gap-1 rounded-lg border border-brand-grey100 bg-brand-surface px-3 pb-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search coin to receive"
              aria-label="Search destinations"
              className="w-full bg-transparent py-3 text-sm leading-[1.6] text-brand-grey900 outline-none placeholder:text-brand-grey300"
            />
            <div className="flex w-full items-center justify-between">
              <Popover>
                <PopoverTrigger
                  aria-label="Choose network"
                  className="flex shrink-0 items-center gap-1 rounded border border-brand-pillBorder bg-brand-pill px-2 py-1.5"
                >
                  <CaretDownIcon className="size-3 text-brand-grey900" />
                  <AssetMark symbol={chain.symbol} className="size-4" />
                  <span className="text-xs font-semibold leading-[1.4] text-brand-grey900">{chain.name}</span>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-56 border-brand-grey100 bg-brand-surface p-1">
                  {chains.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setChain(c)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded px-2 py-2 text-left transition-colors hover:bg-brand-grey50",
                        chain.name === c.name && "bg-brand-tint",
                      )}
                    >
                      <AssetMark symbol={c.symbol} className="size-5" />
                      <span className="text-xs font-semibold text-brand-grey900">{c.name}</span>
                    </button>
                  ))}
                </PopoverContent>
              </Popover>

              <button
                type="button"
                onClick={paste}
                className="p-2 text-xs font-semibold leading-[1.4] text-brand-blue500 transition-opacity hover:opacity-70"
              >
                Paste
              </button>
            </div>
          </div>

          {/* Recent / Beneficiary */}
          <div role="tablist" aria-label="Destination type" className="mt-4 flex items-center gap-3 rounded bg-brand-barBg p-0.5">
            {(["recent", "beneficiary"] as const).map((t) => (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={cn(
                  "shrink-0 rounded px-2 py-1.5 text-xs font-semibold capitalize leading-[1.4] transition-colors",
                  tab === t ? "bg-brand-surface text-brand-blue500" : "text-brand-grey900 hover:text-brand-blue500",
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Destinations */}
          <div className="flex flex-col pt-2">
            {visible.length === 0 ? (
              <p className="py-10 text-center text-sm text-brand-bodyText">
                No {tab} destinations{query ? " match that search" : " yet"}.
              </p>
            ) : (
              visible.map((d, i) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => onSelect(d)}
                  className={cn(
                    "flex items-center gap-4 py-3 text-left transition-colors hover:bg-brand-grey50",
                    i < visible.length - 1 && "border-b border-brand-grey100",
                  )}
                >
                  <AssetMark symbol={d.symbol} />
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                      {d.display}
                    </span>
                    <span className="truncate text-xs leading-[1.3] text-brand-bodyText">
                      {d.label} • {d.network}
                    </span>
                  </span>
                  <ArrowRightIcon className="size-5 shrink-0 text-brand-grey900" />
                </button>
              ))
            )}
          </div>
        </div>
      </PageTransition>
    </AppShell>
  );
};

export default SendTo;

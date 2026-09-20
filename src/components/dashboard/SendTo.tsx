import { useMemo, useState } from "react";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader } from "./AppShell";
import AssetMark from "./AssetMark";
import { ArrowRightIcon, CaretDownIcon } from "./icons";
import OptionSheet from "./OptionSheet";
import { cn } from "@/lib/utils";
import type { CryptoDestination } from "@/data/recipientData";

export type Destination = CryptoDestination;

export const chains = ["BNB Smart Chain", "Ethereum (ERC-20)", "Tron (TRC-20)", "Solana"];

/**
 * Destination picker for crypto sends (Figma 269:5828). An address field with
 * a chain filter and paste shortcut up top, then Recent / Beneficiary lists —
 * saved addresses and saved usernames — with their own search.
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
  const [address, setAddress] = useState("");
  const [tab, setTab] = useState<"recent" | "beneficiary">("recent");
  const [chainOpen, setChainOpen] = useState(false);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinations.filter(
      (d) =>
        d.kind === tab &&
        (!q || d.value.toLowerCase().includes(q) || d.label.toLowerCase().includes(q) || d.symbol.toLowerCase().includes(q)),
    );
  }, [destinations, tab, query]);

  const sendToAddress = () => {
    if (!address) return;
    onSelect({
      id: "typed-address",
      value: address,
      display: address.length > 32 ? `${address.slice(0, 14)}......${address.slice(-14)}` : address,
      label: "New address",
      symbol: "",
      network: chain,
      kind: "recent",
    });
  };

  const paste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setAddress(text.trim());
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
              value={address}
              onChange={(e) => setAddress(e.target.value.trim())}
              onKeyDown={(e) => e.key === "Enter" && sendToAddress()}
              placeholder="Enter wallet address"
              aria-label="Wallet address"
              className="w-full break-all bg-transparent py-3 text-sm leading-[1.6] text-brand-grey900 outline-none placeholder:text-brand-grey300"
            />
            <div className="flex w-full items-center justify-between">
              <button
                type="button"
                aria-label="Choose network"
                onClick={() => setChainOpen(true)}
                className="flex shrink-0 items-center gap-1 rounded border border-brand-pillBorder bg-brand-pill px-2 py-1.5"
              >
                <CaretDownIcon className="size-3 text-brand-grey900" />
                <span className="text-xs font-semibold leading-[1.4] text-brand-grey900">{chain}</span>
              </button>

              <button
                type="button"
                onClick={paste}
                className="p-2 text-xs font-semibold leading-[1.4] text-brand-blue500 transition-opacity hover:opacity-70"
              >
                Paste
              </button>
            </div>
          </div>

          {address && (
            <button
              type="button"
              onClick={sendToAddress}
              className="mt-3 flex w-full items-center gap-4 rounded border border-brand-grey100 px-3 py-3 text-left transition-colors hover:bg-brand-grey50"
            >
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">Send to this address</span>
                <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{chain}</span>
              </span>
              <ArrowRightIcon className="size-5 shrink-0 text-brand-grey900" />
            </button>
          )}

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

          {/* Search the saved destinations */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${tab === "recent" ? "recent" : "beneficiaries"} by name or address`}
            aria-label="Search saved destinations"
            className="mt-3 w-full rounded-lg border border-brand-grey100 bg-brand-surface px-3 py-2.5 text-sm leading-[1.6] text-brand-grey900 outline-none placeholder:text-brand-grey300 focus:border-brand-blue500"
          />

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

      <OptionSheet
        open={chainOpen}
        onOpenChange={setChainOpen}
        title="Select network"
        value={chain}
        options={chains.map((name) => ({ value: name, label: name, mark: null }))}
        onSelect={(name) => setChain(name)}
      />
    </AppShell>
  );
};

export default SendTo;

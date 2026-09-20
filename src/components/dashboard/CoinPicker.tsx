import { useMemo } from "react";
import OptionSheet, { type SheetOption } from "./OptionSheet";
import { NGN_PER_USD, formatNgn, formatUsd } from "@/lib/format";

export type PickableCoin = {
  symbol: string;
  name: string;
  networks: string[];
  /** Holding in USD; the row shows it in naira with the dollar value beneath. */
  usd?: number;
};

/**
 * Coin chooser bottom sheet (Figma 299:25076). Coins with several chains
 * drill into their networks (Figma 299:25502) inside the same sheet; those
 * with none resolve straight away, which is how naira and the DeeX tag work.
 */
export const CoinPicker = ({
  open,
  onOpenChange,
  placeholder = "Search coin to receive",
  coins,
  extras,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
  coins: PickableCoin[];
  /** Rows shown above the coins — naira, the DeeX tag. */
  extras?: SheetOption[];
  /** Network is empty for destinations that do not have one. */
  onSelect: (symbol: string, network: string) => void;
}) => {
  const options = useMemo<SheetOption[]>(
    () => [
      ...(extras ?? []),
      ...coins.map((coin) => ({
        value: coin.symbol,
        label: coin.symbol,
        detail: coin.name,
        primary: formatNgn((coin.usd ?? 0) * NGN_PER_USD),
        secondary: formatUsd(coin.usd ?? 0),
        childrenTitle: "Select Network",
        // No chevron and no extra step when there is only one chain or none.
        children:
          coin.networks.length > 1
            ? coin.networks.map((network) => ({ value: network, label: network, mark: null }))
            : undefined,
      })),
    ],
    [coins, extras],
  );

  return (
    <OptionSheet
      open={open}
      onOpenChange={onOpenChange}
      title="Assets"
      searchPlaceholder={placeholder}
      options={options}
      onSelect={(symbol, network) => {
        const coin = coins.find((c) => c.symbol === symbol);
        onSelect(symbol, network ?? coin?.networks[0] ?? "");
      }}
    />
  );
};

export default CoinPicker;

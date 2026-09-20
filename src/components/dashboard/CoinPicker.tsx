import { useMemo } from "react";
import AssetMark from "./AssetMark";
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
 * drill into their networks (Figma 299:25502) inside the same sheet.
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
  const options = useMemo<SheetOption[]>(
    () =>
      coins.map((coin) => ({
        value: coin.symbol,
        label: coin.symbol,
        detail: coin.name,
        primary: formatNgn((coin.usd ?? 0) * NGN_PER_USD),
        secondary: formatUsd(coin.usd ?? 0),
        childrenTitle: "Select Network",
        // Networks carry the coin's mark, as the frame shows.
        children: coin.networks.map((network) => ({
          value: network,
          label: network,
          mark: <AssetMark symbol={coin.symbol} className="size-6" />,
        })),
      })),
    [coins],
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

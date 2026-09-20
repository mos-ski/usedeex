import { ReactNode } from "react";
import AssetMark from "./AssetMark";
import { cn } from "@/lib/utils";

/**
 * The asset list row used by the Wallet list and the coin picker
 * (Figma 266:3505 / 299:25076): mark, symbol over name, and a right-hand
 * column holding either a balance pair or a trailing control.
 */
export const AssetRow = ({
  symbol,
  name,
  primary,
  secondary,
  trailing,
  markClassName,
  onClick,
  className,
}: {
  symbol: string;
  name: string;
  /** Bold right-hand figure, e.g. the naira balance. */
  primary?: string;
  /** Muted line under it, e.g. the dollar equivalent. */
  secondary?: string;
  /** Replaces the balance column, e.g. a chevron. */
  trailing?: ReactNode;
  markClassName?: string;
  onClick?: () => void;
  className?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "flex items-center gap-4 border-b border-brand-grey100 py-3 text-left transition-colors hover:bg-brand-grey50",
      className,
    )}
  >
    <AssetMark symbol={symbol} className={markClassName} />
    <span className="flex min-w-0 flex-1 flex-col">
      <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">{symbol}</span>
      <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{name}</span>
    </span>
    {trailing ?? (
      <span className="flex shrink-0 flex-col items-end">
        <span className="whitespace-nowrap text-[15px] font-semibold leading-[1.4] text-brand-grey900">{primary}</span>
        <span className="whitespace-nowrap text-xs leading-[1.3] text-brand-bodyText">{secondary}</span>
      </span>
    )}
  </button>
);

export default AssetRow;

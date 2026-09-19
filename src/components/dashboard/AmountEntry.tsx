import { ReactNode } from "react";
import { AppShell, PageHeader, PrimaryButton } from "./AppShell";
import AssetMark from "./AssetMark";
import { CaretDownIcon } from "./icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import PageTransition from "@/components/PageTransition";
import { cn } from "@/lib/utils";

export type CurrencyOption = { symbol: string; name?: string; hint?: string };

/** Strips grouping so a displayed value can be parsed back to a number. */
export const parseAmount = (raw: string) => Number(raw.replace(/,/g, "")) || 0;

/** Re-groups the integer part while leaving a trailing decimal intact. */
export const groupDigits = (raw: string) => {
  const [whole, decimals] = raw.replace(/,/g, "").split(".");
  const grouped = whole ? Number(whole).toLocaleString("en-US") : "";
  return decimals !== undefined ? `${grouped}.${decimals}` : grouped;
};

/** Accepts digits with at most one decimal point. */
export const isAmountInput = (value: string) => /^[\d,]*\.?\d*$/.test(value);

const Pill = ({ symbol, children }: { symbol: string; children?: ReactNode }) => (
  <span className="flex shrink-0 items-center gap-1 rounded border border-[#F0F0F0] bg-[#F8F8F8] px-2 py-1.5">
    <AssetMark symbol={symbol} className="size-4 text-[9px]" />
    <span className="text-xs font-semibold leading-[1.4] text-[#191919]">{symbol}</span>
    {children}
  </span>
);

const OptionList = ({
  options,
  active,
  onSelect,
}: {
  options: CurrencyOption[];
  active: string;
  onSelect: (symbol: string) => void;
}) => (
  <PopoverContent align="end" className="w-52 border-brand-grey100 bg-white p-1">
    {options.map((o) => (
      <button
        key={o.symbol}
        type="button"
        onClick={() => onSelect(o.symbol)}
        className={cn(
          "flex w-full items-center gap-3 rounded px-2 py-2 text-left transition-colors hover:bg-brand-grey50",
          active === o.symbol && "bg-brand-tint",
        )}
      >
        <AssetMark symbol={o.symbol} className="size-6" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-xs font-semibold text-brand-grey900">{o.symbol}</span>
          {o.hint && <span className="truncate text-[10px] text-brand-bodyText">{o.hint}</span>}
        </span>
      </button>
    ))}
  </PopoverContent>
);

/**
 * The shared amount-entry screen behind Withdraw, Sell and Swap
 * (Figma 269:7302 / 269:6883 / 269:6118). A big Gasoek input paired with a
 * currency pill, a converted read-out below it, then a screen-specific footer.
 *
 * The Figma mocks show the OS numeric keyboard; on the web the field uses
 * `inputMode="decimal"` so the device supplies it.
 */
export const AmountEntry = ({
  title,
  onBack,
  value,
  onValueChange,
  fromSymbol,
  fromOptions,
  onFromChange,
  toSymbol,
  toOptions,
  onToChange,
  convertedText,
  error,
  footer,
  submitLabel = "Done",
  submitDisabled,
  onSubmit,
}: {
  title: string;
  onBack: () => void;
  value: string;
  onValueChange: (value: string) => void;
  fromSymbol: string;
  fromOptions: CurrencyOption[];
  onFromChange: (symbol: string) => void;
  toSymbol: string;
  /** Omit to render the target currency as a static pill (e.g. NGN payouts). */
  toOptions?: CurrencyOption[];
  onToChange?: (symbol: string) => void;
  convertedText: string;
  error?: string;
  footer?: ReactNode;
  submitLabel?: string;
  submitDisabled?: boolean;
  onSubmit: () => void;
}) => (
  <AppShell className="bg-white" innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
    <PageTransition>
      <PageHeader title={title} onBack={onBack} />

      <div className="flex flex-col items-end gap-1 px-4 py-14 sm:py-16">
        <div className="flex w-full items-center justify-end gap-2">
          <input
            value={value}
            onChange={(e) => isAmountInput(e.target.value) && onValueChange(groupDigits(e.target.value))}
            inputMode="decimal"
            placeholder="0"
            aria-label={`Amount in ${fromSymbol}`}
            className="min-w-0 flex-1 bg-transparent text-right font-gasoek text-[48px] leading-[1.4] text-[#191919] outline-none placeholder:text-brand-grey300"
          />
          <Popover>
            <PopoverTrigger aria-label="Choose asset">
              <Pill symbol={fromSymbol}>
                <CaretDownIcon className="size-3 text-[#191919]" />
              </Pill>
            </PopoverTrigger>
            <OptionList options={fromOptions} active={fromSymbol} onSelect={onFromChange} />
          </Popover>
        </div>

        <div className="flex w-full items-center justify-end gap-2">
          <span className="truncate font-mono text-xl font-semibold leading-[1.6] text-[#616263]">{convertedText}</span>
          {toOptions && onToChange ? (
            <Popover>
              <PopoverTrigger aria-label="Choose target currency">
                <Pill symbol={toSymbol}>
                  <CaretDownIcon className="size-3 text-[#191919]" />
                </Pill>
              </PopoverTrigger>
              <OptionList options={toOptions} active={toSymbol} onSelect={onToChange} />
            </Popover>
          ) : (
            <Pill symbol={toSymbol} />
          )}
        </div>

        {error && <p className="text-xs text-[#D92D20]">{error}</p>}
      </div>

      <div className="flex flex-col gap-2.5 px-4 py-2.5">
        {footer}
        <PrimaryButton disabled={submitDisabled} onClick={onSubmit}>
          {submitLabel}
        </PrimaryButton>
      </div>
    </PageTransition>
  </AppShell>
);

/** Swap's footer: available balance plus 25/50/75/Max shortcuts. */
export const BalanceShortcuts = ({
  balanceLabel,
  onPick,
}: {
  balanceLabel: string;
  onPick: (fraction: number) => void;
}) => (
  <div className="flex items-center justify-between gap-2">
    <p className="min-w-0 flex-1 truncate font-manrope text-[11px] font-semibold leading-[1.6] text-brand-amberBrown">
      {balanceLabel}
    </p>
    <div className="flex shrink-0 items-start gap-1">
      {[
        { label: "25%", fraction: 0.25 },
        { label: "50%", fraction: 0.5 },
        { label: "75%", fraction: 0.75 },
        { label: "Max", fraction: 1 },
      ].map(({ label, fraction }) => (
        <button
          key={label}
          type="button"
          onClick={() => onPick(fraction)}
          className={cn(
            "rounded bg-brand-grey100 px-2 py-1 font-medium leading-[1.6] text-[11px] transition-colors hover:bg-brand-primary100",
            label === "Max" ? "text-brand-blue400" : "text-brand-grey500",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);

export default AmountEntry;

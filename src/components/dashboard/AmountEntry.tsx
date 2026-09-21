import { ReactNode, useRef, useState } from "react";
import { AppShell, PageHeader, PrimaryButton } from "./AppShell";
import AssetMark from "./AssetMark";
import { CaretDownIcon, ChevronRightIcon } from "./icons";
import NumericKeypad from "./NumericKeypad";
import { useIsMobile } from "@/hooks/use-mobile";
import OptionSheet, { type SheetOption } from "./OptionSheet";
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
  <span className="flex shrink-0 items-center gap-1 rounded border border-brand-pillBorder bg-brand-pill px-2 py-1.5">
    <AssetMark symbol={symbol} className="size-4 text-[9px]" />
    <span className="text-xs font-semibold leading-[1.4] text-brand-grey900">{symbol}</span>
    {children}
  </span>
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
  onFromPress,
  fromPicker,
  toSymbol,
  toOptions,
  onToChange,
  convertedText,
  showConverted = true,
  error,
  topSlot,
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
  /** Optional custom picker trigger/content for flows that use a richer asset sheet. */
  onFromPress?: () => void;
  fromPicker?: ReactNode;
  toSymbol: string;
  /** Omit to render the target currency as a static pill (e.g. NGN payouts). */
  toOptions?: CurrencyOption[];
  onToChange?: (symbol: string) => void;
  convertedText?: string;
  /** Bills are priced in naira only, so they hide the conversion read-out. */
  showConverted?: boolean;
  error?: string;
  /** Sits directly under the header — a source or type selector. */
  topSlot?: ReactNode;
  footer?: ReactNode;
  submitLabel?: string;
  submitDisabled?: boolean;
  onSubmit: () => void;
}) => {
  // Keeps rapid keypad taps from all reading the same stale value.
  const latest = useRef(value);
  latest.current = value;

  const isMobile = useIsMobile();
  const [picker, setPicker] = useState<"from" | "to" | null>(null);
  const toSheet = (list: CurrencyOption[]): SheetOption[] =>
    list.map((o) => ({ value: o.symbol, label: o.symbol, detail: o.hint ?? o.name }));

  return (
  // Fills the viewport so the amount sits in the middle and the footer rides
  // just above the keyboard, instead of both bunching under the header.
  <AppShell
    className="bg-brand-surface"
    innerClassName="flex min-h-[100dvh] flex-col pb-6 sm:pb-8 lg:max-w-[480px] lg:px-4"
  >
    <PageTransition className="flex flex-1 flex-col">
      <PageHeader title={title} onBack={onBack} />

      {topSlot && <div className="px-4 pt-1">{topSlot}</div>}

      <div className="flex flex-1 flex-col items-end justify-center gap-1 px-4 py-8">
        <div data-tour="amount" className="flex w-full items-center justify-end gap-2">
          <input
            value={value}
            onChange={(e) => isAmountInput(e.target.value) && onValueChange(groupDigits(e.target.value))}
            // The keypad drives the value on a phone; desktop types into it.
            readOnly={isMobile}
            inputMode="decimal"
            autoFocus={!isMobile}
            placeholder="0"
            aria-label={`Amount in ${fromSymbol}`}
            className="min-w-0 flex-1 bg-transparent text-right font-gasoek text-[48px] leading-[1.4] text-brand-grey900 caret-brand-blue500 outline-none placeholder:text-brand-grey300"
          />
          {/* A read-only field shows no caret, so stand one in to say "type here". */}
          {isMobile && (
            <span
              aria-hidden="true"
              className="-ml-1 h-[52px] w-0.5 shrink-0 animate-caret-blink rounded-full bg-brand-blue500"
            />
          )}
          <button type="button" aria-label="Choose asset" onClick={() => (onFromPress ? onFromPress() : setPicker("from"))}>
            <Pill symbol={fromSymbol}>
              <CaretDownIcon className="size-3 text-brand-grey900" />
            </Pill>
          </button>
        </div>

        {showConverted && (
          <div data-tour="converted" className="flex w-full items-center justify-end gap-2">
            <span className="truncate font-mono text-xl font-semibold leading-[1.6] text-[#616263]">
              {convertedText}
            </span>
            {toOptions && onToChange ? (
              <button type="button" aria-label="Choose target currency" onClick={() => setPicker("to")}>
                <Pill symbol={toSymbol}>
                  <CaretDownIcon className="size-3 text-brand-grey900" />
                </Pill>
              </button>
            ) : (
              <Pill symbol={toSymbol} />
            )}
          </div>
        )}

        {error && <p className="text-xs text-brand-danger">{error}</p>}
      </div>

      <div data-tour="footer" className="flex flex-col gap-2.5 px-4 py-2.5">
        {footer}
        <PrimaryButton disabled={submitDisabled} onClick={onSubmit}>
          {submitLabel}
        </PrimaryButton>
      </div>

      <OptionSheet
        open={picker !== null}
        onOpenChange={(next) => !next && setPicker(null)}
        title="Assets"
        searchPlaceholder="Search asset"
        value={picker === "to" ? toSymbol : fromSymbol}
        options={toSheet(picker === "to" ? toOptions ?? [] : fromOptions)}
        onSelect={(symbol) => (picker === "to" ? onToChange?.(symbol) : onFromChange(symbol))}
      />

      {fromPicker}

      {isMobile && (
      <NumericKeypad
        onKey={(key) => {
          const raw = latest.current.replace(/,/g, "");
          // One decimal point only, and never lead with one.
          if (key === "." && (raw.includes(".") || !raw)) return;
          latest.current = groupDigits(raw + key);
          onValueChange(latest.current);
        }}
        onBackspace={() => {
          latest.current = groupDigits(latest.current.replace(/,/g, "").slice(0, -1));
          onValueChange(latest.current);
        }}
      />
      )}
    </PageTransition>
  </AppShell>
  );
};

/**
 * Conversion rate line above the shortcuts, e.g. "2,000pts ~ ₦2,000"
 * (Figma 302:31712). The chevron opens whatever detail the screen provides.
 */
export const RateRow = ({ text, onOpen }: { text: string; onOpen?: () => void }) => (
  <button
    type="button"
    onClick={onOpen}
    disabled={!onOpen}
    className="flex w-full items-center justify-between gap-2 py-1 text-left disabled:cursor-default"
  >
    <span className="min-w-0 flex-1 truncate text-sm leading-[1.4] text-brand-grey900">{text}</span>
    <ChevronRightIcon className="size-5 shrink-0 text-brand-grey400" />
  </button>
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

/** Fixed-amount shortcuts (₦200 / ₦500 / …) used by the bill screens. */
export const AmountShortcuts = ({
  balanceLabel,
  options,
  onPick,
}: {
  balanceLabel: string;
  options: { label: string; value: number }[];
  onPick: (value: number) => void;
}) => (
  <div className="flex items-center justify-between gap-2">
    <p className="min-w-0 flex-1 truncate font-manrope text-[11px] font-semibold leading-[1.6] text-brand-amberBrown">
      {balanceLabel}
    </p>
    <div className="flex shrink-0 items-start gap-1">
      {options.map(({ label, value }) => (
        <button
          key={label}
          type="button"
          onClick={() => onPick(value)}
          className="rounded bg-brand-grey100 px-2 py-1 text-[11px] font-medium leading-[1.6] text-brand-grey500 transition-colors hover:bg-brand-primary100"
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);

export default AmountEntry;

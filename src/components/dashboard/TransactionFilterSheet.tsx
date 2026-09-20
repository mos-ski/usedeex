import { useEffect, useState } from "react";
import { CheckIcon } from "./icons";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

export type TransactionActionFilter = "all" | "sell" | "deposit" | "swap" | "withdraw";
export type TransactionStatusFilter = "all" | "completed" | "pending" | "failed";
export type TransactionDateFilter = "all-time" | "last-week" | "last-month" | "last-3-months" | "custom";

export interface TransactionFilters {
  action: TransactionActionFilter;
  status: TransactionStatusFilter;
  dateRange: TransactionDateFilter;
}

export const defaultTransactionFilters: TransactionFilters = {
  action: "all",
  status: "all",
  dateRange: "all-time",
};

const actionOptions: { label: string; value: TransactionActionFilter }[] = [
  { label: "All", value: "all" },
  { label: "Sell", value: "sell" },
  { label: "Deposit", value: "deposit" },
  { label: "Swap", value: "swap" },
  { label: "Withdraw", value: "withdraw" },
];

const statusOptions: { label: string; value: TransactionStatusFilter }[] = [
  { label: "All", value: "all" },
  { label: "In Progress", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Failed", value: "failed" },
];

const dateOptions: { label: string; value: TransactionDateFilter }[] = [
  { label: "All Time", value: "all-time" },
  { label: "Last Week", value: "last-week" },
  { label: "Last Month", value: "last-month" },
  { label: "Last 3 Months", value: "last-3-months" },
  { label: "Custom", value: "custom" },
];

interface TransactionFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: TransactionFilters;
  onApply: (filters: TransactionFilters) => void;
}

const PillGroup = <T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}) => (
  <fieldset className="border-b border-brand-grey100 py-1.5">
    <legend className="text-xs font-normal leading-[1.3] text-brand-bodyText">{label}</legend>
    <div className="mt-1 flex flex-wrap gap-1">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex items-center gap-1 rounded px-1.5 text-[15px] font-semibold leading-[1.4] transition-colors",
              selected
                ? "bg-brand-blue500 text-white"
                : "bg-[#daebf7] text-brand-blue500 hover:bg-brand-primary100",
            )}
          >
            {selected && <CheckIcon className="size-3.5 shrink-0" />}
            {option.label}
          </button>
        );
      })}
    </div>
  </fieldset>
);

export const TransactionFilterSheet = ({ open, onOpenChange, value, onApply }: TransactionFilterSheetProps) => {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    if (open) setDraft(value);
  }, [open, value]);

  const reset = () => setDraft(defaultTransactionFilters);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[88dvh] rounded-t-lg border-brand-grey100 bg-brand-surface p-3 font-roboto [&>div:first-child]:mt-0 [&>div:first-child]:h-1 [&>div:first-child]:w-12 [&>div:first-child]:bg-[#d9d9d9]">
        <div className="mx-auto w-full max-w-[375px] overflow-y-auto pb-[max(0px,env(safe-area-inset-bottom))]">
          <div className="h-9" aria-hidden="true" />
          <DrawerTitle className="py-1.5 text-xs font-semibold leading-[1.4] text-brand-grey900">Filter Transaction</DrawerTitle>

          <div>
            <PillGroup label="Category" options={actionOptions} value={draft.action} onChange={(action) => setDraft((current) => ({ ...current, action }))} />
            <PillGroup label="Status" options={statusOptions} value={draft.status} onChange={(status) => setDraft((current) => ({ ...current, status }))} />
            <PillGroup label="Date Range" options={dateOptions} value={draft.dateRange} onChange={(dateRange) => setDraft((current) => ({ ...current, dateRange }))} />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-6">
            <button type="button" onClick={reset} className="h-12 rounded-lg bg-[#f2f2f2] px-4 py-[11px] font-manrope text-base font-medium leading-[1.6] text-[#202020] transition-colors hover:bg-brand-grey100">
              Reset
            </button>
            <button
              type="button"
              onClick={() => {
                onApply(draft);
                onOpenChange(false);
              }}
              className="h-12 rounded-lg bg-brand-blue500 px-4 py-[11px] font-manrope text-base font-bold leading-[1.6] text-brand-grey50 transition-colors hover:bg-brand-navy"
            >
              Apply
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default TransactionFilterSheet;

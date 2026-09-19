import { useEffect, useState } from "react";
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
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
];

const dateOptions: { label: string; value: TransactionDateFilter }[] = [
  { label: "All time", value: "all-time" },
  { label: "Last week", value: "last-week" },
  { label: "Last month", value: "last-month" },
  { label: "Last 3 months", value: "last-3-months" },
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
  <fieldset>
    <legend className="mb-3 text-sm font-medium text-brand-grey500">{label}</legend>
    <div className="flex flex-wrap gap-2.5">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
              selected
                ? "bg-brand-blue500 text-white"
                : "bg-brand-primary100/60 text-brand-blue500 hover:bg-brand-primary100",
            )}
          >
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
      <DrawerContent className="max-h-[88dvh] border-brand-grey100 bg-white font-roboto">
        <div className="mx-auto w-full max-w-[560px] overflow-y-auto px-6 pb-[max(24px,env(safe-area-inset-bottom))]">
          <DrawerTitle className="pb-6 pt-4 text-xl font-bold text-brand-grey900">Filter transactions</DrawerTitle>

          <div className="space-y-8">
            <PillGroup label="Category" options={actionOptions} value={draft.action} onChange={(action) => setDraft((current) => ({ ...current, action }))} />
            <PillGroup label="Status" options={statusOptions} value={draft.status} onChange={(status) => setDraft((current) => ({ ...current, status }))} />
            <PillGroup label="Date range" options={dateOptions} value={draft.dateRange} onChange={(dateRange) => setDraft((current) => ({ ...current, dateRange }))} />
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3">
            <button type="button" onClick={reset} className="h-[52px] rounded-xl border-2 border-brand-blue500 bg-white text-base font-bold text-brand-blue500 transition-colors hover:bg-brand-tint">
              Reset
            </button>
            <button
              type="button"
              onClick={() => {
                onApply(draft);
                onOpenChange(false);
              }}
              className="h-[52px] rounded-xl bg-brand-blue500 text-base font-bold text-white transition-colors hover:bg-brand-navy"
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

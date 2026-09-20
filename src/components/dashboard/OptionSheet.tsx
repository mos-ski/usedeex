import { ReactNode, useEffect, useMemo, useState } from "react";
import AssetMark from "./AssetMark";
import { ArrowLeftIcon, ChevronRightIcon } from "./icons";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

export type SheetOption = {
  value: string;
  label: string;
  /** Muted line under the label. */
  detail?: string;
  /** Bold figure on the right — a balance, a rate. */
  primary?: string;
  /** Muted line under it. */
  secondary?: string;
  /** Defaults to the asset/provider mark for `value`. */
  mark?: ReactNode;
  /**
   * A second list shown inside this same sheet once the option is picked —
   * networks under a coin, say. Keeps the flow to one modal.
   */
  children?: SheetOption[];
  childrenTitle?: string;
};

const Row = ({ option, active, onClick }: { option: SheetOption; active: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "flex items-center gap-4 border-b border-brand-grey100 py-3 text-left transition-colors last:border-b-0 hover:bg-brand-grey50",
      active && "bg-brand-tint",
    )}
  >
    {option.mark ?? <AssetMark symbol={option.value} />}
    <span className="flex min-w-0 flex-1 flex-col">
      <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">{option.label}</span>
      {option.detail && <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{option.detail}</span>}
    </span>
    {option.primary ? (
      <span className="flex shrink-0 flex-col items-end">
        <span className="whitespace-nowrap text-[15px] font-semibold leading-[1.4] text-brand-grey900">
          {option.primary}
        </span>
        {option.secondary && (
          <span className="whitespace-nowrap text-xs leading-[1.3] text-brand-bodyText">{option.secondary}</span>
        )}
      </span>
    ) : (
      option.children && <ChevronRightIcon className="size-5 shrink-0 text-brand-grey900" />
    )}
  </button>
);

/**
 * The app's one picker: a bottom sheet with an optional search and the asset
 * row treatment (Figma 299:25076). Options carrying `children` drill in
 * within the same sheet rather than stacking a second modal on top
 * (Figma 299:25502).
 */
export const OptionSheet = ({
  open,
  onOpenChange,
  title,
  searchPlaceholder,
  options,
  value,
  onSelect,
  footer,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  /** Omit to hide the search field. */
  searchPlaceholder?: string;
  options: SheetOption[];
  value?: string;
  /** `child` is set when the chosen option drilled into a second list. */
  onSelect: (value: string, child?: string) => void;
  footer?: ReactNode;
}) => {
  const [query, setQuery] = useState("");
  const [drilled, setDrilled] = useState<SheetOption | null>(null);

  // Start clean each time the sheet opens.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setDrilled(null);
  }, [open]);

  const list = drilled?.children ?? options;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((o) => o.label.toLowerCase().includes(q) || o.detail?.toLowerCase().includes(q));
  }, [list, query]);

  const choose = (option: SheetOption) => {
    if (drilled) {
      onSelect(drilled.value, option.value);
      onOpenChange(false);
      return;
    }
    if (option.children?.length) {
      // More than one child is a real choice; a single one needs no step.
      if (option.children.length > 1) {
        setDrilled(option);
        setQuery("");
        return;
      }
      onSelect(option.value, option.children[0].value);
      onOpenChange(false);
      return;
    }
    onSelect(option.value);
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="border-brand-grey100 bg-brand-surface font-roboto">
        <DrawerTitle className="sr-only">{drilled ? drilled.childrenTitle ?? title : title}</DrawerTitle>
        <div className="mx-auto w-full max-w-[560px] px-4 pb-8">
          {searchPlaceholder && !drilled && (
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="w-full rounded-lg border border-brand-grey100 bg-brand-surface p-4 text-sm leading-[1.6] text-brand-grey900 outline-none placeholder:text-brand-grey300 focus:border-brand-blue500"
            />
          )}

          <div className="flex items-center gap-2 py-1.5 pt-4">
            {drilled && (
              <button
                type="button"
                onClick={() => setDrilled(null)}
                aria-label="Back"
                className="-ml-1 flex size-6 items-center justify-center text-brand-grey900"
              >
                <ArrowLeftIcon className="size-4" />
              </button>
            )}
            <p className="text-xs font-semibold leading-[1.4] text-brand-grey900">
              {drilled ? drilled.childrenTitle ?? `${drilled.label} networks` : title}
            </p>
          </div>

          <div className="flex max-h-[45vh] flex-col overflow-y-auto">
            {visible.length === 0 ? (
              <p className="py-10 text-center text-sm text-brand-bodyText">Nothing matches that search.</p>
            ) : (
              visible.map((option) => (
                <Row
                  key={option.value}
                  option={option}
                  active={!drilled && option.value === value}
                  onClick={() => choose(option)}
                />
              ))
            )}
          </div>

          {footer && <div className="pt-3">{footer}</div>}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default OptionSheet;

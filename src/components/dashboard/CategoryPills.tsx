import { PrimaryButton } from "./AppShell";
import { CaretDownIcon, CheckIcon } from "./icons";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

/**
 * Multi-select pill row, in the filter sheet's selected-pill treatment
 * (Figma 297:18420). An empty selection means everything, so "All" is the
 * resting state rather than a value of its own.
 */
export const CategoryPills = ({
  label = "Categories",
  options,
  selected,
  onChange,
}: {
  label?: string;
  options: readonly string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) => {
  const toggle = (option: string) =>
    onChange(selected.includes(option) ? selected.filter((s) => s !== option) : [...selected, option]);

  const Pill = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) => (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex items-center gap-1 rounded px-1.5 text-[15px] font-semibold leading-[1.4] transition-colors",
        active ? "bg-brand-blue500 text-white" : "bg-[#daebf7] text-brand-blue500 hover:bg-brand-primary100",
      )}
    >
      {active && <CheckIcon className="size-3.5 shrink-0" />}
      {children}
    </button>
  );

  return (
    <fieldset className="border-b border-brand-grey100 py-1.5">
      <legend className="text-xs leading-[1.3] text-brand-bodyText">{label}</legend>
      <div className="mt-1 flex flex-wrap gap-1">
        <Pill active={selected.length === 0} onClick={() => onChange([])}>
          All
        </Pill>
        {options.map((option) => (
          <Pill key={option} active={selected.includes(option)} onClick={() => toggle(option)}>
            {option}
          </Pill>
        ))}
      </div>
    </fieldset>
  );
};

/** The category trigger beside the country pill. */
export const CategoryPill = ({ selected, onClick }: { selected: string[]; onClick: () => void }) => (
  <button
    type="button"
    aria-label="Choose categories"
    onClick={onClick}
    className="flex min-w-0 items-center gap-1 rounded border border-brand-pillBorder bg-brand-pill px-2 py-1.5"
  >
    <CaretDownIcon className="size-3 shrink-0 text-brand-grey900" />
    <span className="min-w-0 truncate text-xs font-semibold leading-[1.4] text-brand-grey900">
      {selected.length === 0
        ? "All categories"
        : selected.length === 1
          ? selected[0]
          : `${selected.length} categories`}
    </span>
  </button>
);

/** The pills live in a sheet, opened from the pill above. */
export const CategorySheet = ({
  open,
  onOpenChange,
  options,
  selected,
  onChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options: readonly string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) => (
  <Drawer open={open} onOpenChange={onOpenChange}>
    <DrawerContent className="border-brand-grey100 bg-brand-surface font-roboto">
      <DrawerTitle className="sr-only">Categories</DrawerTitle>
      <div className="mx-auto w-full max-w-[560px] px-4 pb-8">
        <p className="py-1.5 text-xs font-semibold leading-[1.4] text-brand-grey900">Categories</p>
        <CategoryPills label="Pick as many as you like" options={options} selected={selected} onChange={onChange} />
        <div className="pt-6">
          <PrimaryButton className="font-bold" onClick={() => onOpenChange(false)}>
            Done
          </PrimaryButton>
        </div>
      </div>
    </DrawerContent>
  </Drawer>
);

export default CategoryPills;

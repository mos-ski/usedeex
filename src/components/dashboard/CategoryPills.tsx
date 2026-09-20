import { CheckIcon } from "./icons";
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

export default CategoryPills;

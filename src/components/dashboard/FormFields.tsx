import { ReactNode, useState } from "react";
import { CaretDownIcon, CheckIcon } from "./icons";
import OptionSheet from "./OptionSheet";
import { cn } from "@/lib/utils";

/**
 * Underlined control matching the sign-in and sign-up fields (Figma 300:29863),
 * in the light palette: label above, value on a hairline rule.
 */
const CONTROL = "w-full border-b border-brand-grey100 bg-transparent py-2 text-[15px] leading-[1.4]";

/** Label above a control, with optional helper text underneath. */
export const Field = ({
  label,
  helper,
  children,
  className,
}: {
  label: string;
  helper?: ReactNode;
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn("flex min-w-0 flex-col gap-1", className)}>
    <span className="text-xs leading-[1.3] text-brand-bodyText">{label}</span>
    {children}
    {helper && <span className="pt-1 text-xs leading-[1.3] text-brand-grey400">{helper}</span>}
  </div>
);

/** Plain text input in the shared control shell. */
export const TextField = ({
  label,
  helper,
  className,
  ...input
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; helper?: ReactNode; className?: string }) => (
  <Field label={label} helper={helper} className={className}>
    <input
      {...input}
      className={cn(CONTROL, "text-brand-grey900 outline-none placeholder:text-brand-grey300 focus:border-brand-blue500")}
    />
  </Field>
);

export type SelectOption = { value: string; label: string; icon?: ReactNode };

/** Select in the shared control shell; the list opens as the app's bottom sheet. */
export const SelectField = ({
  label,
  helper,
  value,
  options,
  placeholder = "Select",
  onChange,
  className,
  /** Search box in the sheet; worth it for long lists like states. */
  searchPlaceholder,
}: {
  label: string;
  helper?: ReactNode;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  searchPlaceholder?: string;
}) => {
  const [open, setOpen] = useState(false);
  const active = options.find((o) => o.value === value);

  return (
    <Field label={label} helper={helper} className={className}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(CONTROL, "flex items-center gap-2 text-left")}
      >
        {active?.icon}
        <span className={cn("min-w-0 flex-1 truncate", active ? "text-brand-grey900" : "text-brand-grey300")}>
          {active?.label ?? placeholder}
        </span>
        <CaretDownIcon className="size-3 shrink-0 text-brand-grey900" />
      </button>

      <OptionSheet
        open={open}
        onOpenChange={setOpen}
        title={label}
        searchPlaceholder={options.length > 6 ? (searchPlaceholder ?? `Search ${label.toLowerCase()}`) : undefined}
        value={value}
        options={options.map((o) => ({
          value: o.value,
          label: o.label,
          mark: o.icon ? (
            <span className="flex size-8 shrink-0 items-center justify-center">{o.icon}</span>
          ) : (
            <span className="size-0 shrink-0" />
          ),
        }))}
        onSelect={onChange}
      />
    </Field>
  );
};

/** Single-select row with a ring on the left (Figma 4234:16640). */
export const RadioRow = ({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) => (
  <button type="button" onClick={onSelect} className="flex w-full items-center gap-3 py-3 text-left">
    <span
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors",
        selected ? "border-brand-blue500" : "border-brand-grey300",
      )}
    >
      {selected && <span className="size-2.5 rounded-full bg-brand-blue500" />}
    </span>
    <span className={cn("min-w-0 flex-1 text-[15px] leading-[1.4]", selected ? "text-brand-grey900" : "text-brand-grey500")}>
      {label}
    </span>
  </button>
);

/**
 * Numbered progress dots for the identity sub-steps (Figma 4234:16640).
 * Completed steps collapse to a tick, the current one is outlined.
 */
export const Stepper = ({ steps, current }: { steps: string[]; current: number }) => (
  <div className="flex items-center gap-2">
    {steps.map((label, index) => {
      const done = index < current;
      const active = index === current;
      return (
        <span key={label} className="flex items-center gap-2">
          <span
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold leading-none",
              done && "bg-brand-successText text-white",
              active && "border-[1.5px] border-brand-blue500 text-brand-blue500",
              !done && !active && "bg-brand-grey100 text-brand-grey400",
            )}
          >
            {done ? <CheckIcon className="size-3" /> : index + 1}
          </span>
          {active && <span className="text-[13px] font-semibold leading-[1.4] text-brand-grey900">{label}</span>}
        </span>
      );
    })}
  </div>
);

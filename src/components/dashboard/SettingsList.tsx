import { ReactNode } from "react";
import { CaretRightIcon } from "./icons";
import { cn } from "@/lib/utils";

/**
 * The settings row shared by Account and every screen it opens
 * (Figma 302:34180): tinted icon, title over detail, and a trailing control.
 */
export const SettingsRow = ({
  title,
  detail,
  Icon,
  trailing,
  onClick,
  className,
}: {
  title: string;
  detail?: string;
  Icon?: (props: { className?: string }) => JSX.Element;
  /** Replaces the chevron — a toggle, a value, a badge. */
  trailing?: ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  const body = (
    <>
      {Icon && <Icon className="size-6 shrink-0 text-brand-blue500" />}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-[15px] font-semibold leading-[1.4] text-brand-grey900">{title}</span>
        {detail && <span className="truncate text-xs leading-[1.3] text-brand-bodyText">{detail}</span>}
      </span>
      {trailing ?? <CaretRightIcon className="size-5 shrink-0 text-brand-grey600" />}
    </>
  );

  const shell = cn("flex w-full items-center gap-4 border-b border-brand-grey100 py-3 text-left", className);

  // Rows carrying their own control (a toggle) must not be buttons themselves.
  if (!onClick) return <div className={shell}>{body}</div>;

  return (
    <button type="button" onClick={onClick} className={cn(shell, "transition-colors hover:bg-brand-grey50")}>
      {body}
    </button>
  );
};

/** Brand switch used by the security and notification preferences. */
export const Toggle = ({
  on,
  onToggle,
  label,
}: {
  on: boolean;
  onToggle: () => void;
  /** Announced to screen readers, since the row's title sits outside. */
  label: string;
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    aria-label={label}
    onClick={onToggle}
    className={cn(
      "flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors",
      on ? "bg-brand-blue500" : "bg-brand-grey100",
    )}
  >
    <span
      className={cn(
        "size-5 rounded-full bg-brand-surface shadow transition-transform",
        on ? "translate-x-5" : "translate-x-0",
      )}
    />
  </button>
);

/** Small status pill used beside session and history rows. */
export const StatusPill = ({ tone, children }: { tone: "good" | "bad" | "neutral"; children: ReactNode }) => (
  <span
    className={cn(
      "shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold uppercase leading-[1.6]",
      tone === "good" && "bg-brand-tint text-brand-successText",
      tone === "bad" && "bg-brand-noteDanger text-brand-danger",
      tone === "neutral" && "bg-brand-grey100 text-brand-grey500",
    )}
  >
    {children}
  </span>
);

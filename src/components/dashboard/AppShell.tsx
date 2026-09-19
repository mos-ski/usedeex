import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "./icons";

/**
 * Light-theme shell for the rebranded app screens (Figma "New DeeX").
 *
 * Mobile keeps the Figma layout literally: full-bleed white blocks stacked on
 * the grey canvas with a 12px gutter showing through. From `sm` up the blocks
 * become rounded cards inside a centred column, and at `lg` the page widens
 * into two columns so the screen stops being a phone rendered on a monitor.
 */
export const AppShell = ({
  children,
  className,
  innerClassName,
  topColor,
}: {
  children: ReactNode;
  className?: string;
  /** Escape hatch for screens that need to fill the viewport (e.g. Wallet's edge-to-edge list). */
  innerClassName?: string;
  /**
   * Paints the display-cutout strip when the page's top block differs from the
   * shell background (e.g. Wallet's navy header on the grey canvas).
   */
  topColor?: string;
}) => (
  <div className={cn("min-h-[100dvh] bg-brand-canvas font-roboto text-brand-grey900 antialiased", className)}>
    {topColor && (
      <div aria-hidden="true" className={cn("fixed inset-x-0 top-0 z-40 h-[env(safe-area-inset-top)]", topColor)} />
    )}
    <div
      className={cn(
        "mx-auto w-full max-w-[560px] px-0 pb-[calc(8rem+env(safe-area-inset-bottom))] pt-[env(safe-area-inset-top)] sm:pb-[calc(9rem+env(safe-area-inset-bottom))] lg:max-w-[1120px] lg:px-8",
        innerClassName,
      )}
    >
      {children}
    </div>
  </div>
);

/** One white block in the stack. */
export const SectionCard = ({ children, className }: { children: ReactNode; className?: string }) => (
  <section className={cn("bg-white px-6 py-3 lg:px-7 lg:py-5", className)}>{children}</section>
);

/** Full-width primary action button (Figma "Button" component). */
export const PrimaryButton = ({
  children,
  onClick,
  disabled,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "flex w-full items-center justify-center gap-3 rounded-lg px-4 py-[11px] font-manrope text-base font-medium leading-[1.6] transition-colors",
      disabled ? "bg-brand-grey100 text-brand-grey400" : "bg-brand-blue500 text-brand-grey50 hover:opacity-90",
      className,
    )}
  >
    {children}
  </button>
);

/** Back arrow + centred title, for detail screens pushed from a list. */
export const PageHeader = ({ title, onBack }: { title: string; onBack: () => void }) => (
  <header className="flex h-14 items-center gap-2.5 px-4 lg:px-2 lg:py-6">
    <button
      type="button"
      onClick={onBack}
      aria-label="Go back"
      className="flex size-11 shrink-0 items-center justify-center rounded-full text-brand-grey900 transition-colors hover:bg-black/[0.04]"
    >
      <ArrowLeftIcon className="size-6" />
    </button>
    <h1 className="min-w-0 flex-1 truncate pr-11 text-center text-[19px] font-bold leading-[1.4] text-brand-grey900 lg:text-2xl">
      {title}
    </h1>
  </header>
);

/**
 * The tinted icon tile used by the Dashboard's Quick Actions and every Menu
 * group. Tiles sit in a 4-up grid; short groups just leave the row short.
 */
export const ActionTile = ({
  label,
  Icon,
  onClick,
}: {
  label: string;
  Icon: (props: { className?: string }) => JSX.Element;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex flex-col items-center justify-center gap-1 rounded-[2px] bg-brand-tint px-2 py-2 text-brand-navy transition-colors hover:bg-brand-primary100 lg:gap-2 lg:py-5"
  >
    <Icon className="size-6 shrink-0 lg:size-7" />
    <span className="text-center text-[10px] leading-[1.6] text-black lg:text-xs">{label}</span>
  </button>
);

/** "Quick Actions" / "See all" row that heads most sections. */
export const SectionHeader = ({
  title,
  actionLabel = "See all",
  onAction,
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}) => (
  <div className="flex items-start gap-[18px] py-1.5">
    <h2 className="min-w-0 flex-1 text-xs font-semibold leading-[1.4] text-brand-grey900 lg:text-sm">{title}</h2>
    {onAction && (
      <button
        type="button"
        onClick={onAction}
        className="whitespace-nowrap text-xs font-medium leading-[1.6] text-brand-blue500 transition-opacity hover:opacity-70 lg:text-sm"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

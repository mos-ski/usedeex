import { ReactNode } from "react";
import PageTransition from "@/components/PageTransition";
import { cn } from "@/lib/utils";

import swooshA from "@/assets/success/swoosh-a.svg";
import swooshB from "@/assets/success/swoosh-b.svg";

/** Green rounded-square tick from the Figma (Icons/checkbox-fill). */
const CheckBadge = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 59.25 59.25" fill="none" className={className} aria-hidden="true">
    <path
      d="M9.875 7.40625H49.375C50.0298 7.40625 50.6577 7.66635 51.1207 8.12933C51.5837 8.59231 51.8438 9.22025 51.8438 9.875V49.375C51.8438 50.0298 51.5837 50.6577 51.1207 51.1207C50.6577 51.5837 50.0298 51.8438 49.375 51.8438H9.875C9.22025 51.8438 8.59231 51.5837 8.12933 51.1207C7.66635 50.6577 7.40625 50.0298 7.40625 49.375V9.875C7.40625 9.22025 7.66635 8.59231 8.12933 8.12933C8.59231 7.66635 9.22025 7.40625 9.875 7.40625ZM27.1637 39.5L44.6177 22.0435L41.1269 18.5527L27.1637 32.5184L20.1796 25.5343L16.6888 29.0251L27.1637 39.5Z"
      fill="#27F32A"
    />
  </svg>
);

/**
 * Full-bleed confirmation screen (Figma 259:1401) — brand gradient with the
 * decorative swooshes, a green tick, a Gasoek headline and two actions.
 */
export const SuccessScreen = ({
  title,
  message,
  primaryLabel = "Done",
  onPrimary,
  secondaryLabel = "Share receipt",
  onSecondary,
  className,
}: {
  title: string;
  message: ReactNode;
  primaryLabel?: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  /** Omit to hide the secondary action. */
  onSecondary?: () => void;
  className?: string;
}) => (
  <div
    className={cn("relative min-h-screen overflow-hidden font-roboto text-white", className)}
    style={{ backgroundImage: "linear-gradient(334.5deg, #0B75C2 0%, #08426C 100%)" }}
  >
    {/* Decorative background art — non-interactive */}
    <img
      src={swooshB}
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute -left-[112%] -top-[25%] w-[334%] max-w-none rotate-[174.31deg] select-none"
    />
    <img
      src={swooshA}
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute -left-[28%] bottom-0 w-[182%] max-w-none select-none"
    />

    <PageTransition>
      <div className="relative mx-auto flex min-h-screen w-full max-w-[420px] flex-col items-center px-4 pb-10 pt-[119px]">
        <CheckBadge className="size-[59px] shrink-0" />

        <h1 className="mt-6 text-center font-gasoek text-[36px] uppercase leading-[1.01]">{title}</h1>
        <p className="mt-6 max-w-[306px] text-center text-base leading-[1.6] text-[#EAEAEA]">{message}</p>

        <div className="mt-auto flex w-full flex-col gap-4 pt-16">
          <button
            type="button"
            onClick={onPrimary}
            className="w-full rounded-lg bg-white px-4 py-[11px] text-base font-medium leading-[1.6] text-brand-blue500 transition-opacity hover:opacity-90"
          >
            {primaryLabel}
          </button>
          {onSecondary && (
            <button
              type="button"
              onClick={onSecondary}
              className="w-full rounded-lg border-[0.5px] border-white px-4 py-[11px] text-base font-medium leading-[1.6] text-brand-grey50 transition-colors hover:bg-white/10"
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      </div>
    </PageTransition>
  </div>
);

export default SuccessScreen;

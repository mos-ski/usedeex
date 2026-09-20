import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type WalkthroughStep = {
  title: string;
  description: string;
  /** `data-tour` value of the element to spotlight. Omit to centre the card. */
  anchor?: string;
};

type Rect = { top: number; left: number; width: number; height: number };

const PADDING = 8;
const CARD_GAP = 12;

/** Reads the anchored element's box, or null when the step isn't anchored. */
const measure = (anchor?: string): Rect | null => {
  if (!anchor) return null;
  const el = document.querySelector(`[data-tour="${anchor}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
};

/**
 * Coach marks over the live screen: a dimmed backdrop with the current step's
 * element cut out, and a card explaining it. Pass `storageKey` to show the
 * walkthrough only the first time someone lands on a screen.
 */
export const Walkthrough = ({
  steps,
  open,
  onClose,
  storageKey,
}: {
  steps: WalkthroughStep[];
  open: boolean;
  onClose: () => void;
  /** Remembers completion per browser, so the tour does not repeat. */
  storageKey?: string;
}) => {
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);

  const step = steps[index];

  const sync = useCallback(() => setRect(measure(step?.anchor)), [step?.anchor]);

  // Measure after paint, and again whenever the page moves under the card.
  useLayoutEffect(() => {
    if (!open) return;
    sync();
    window.addEventListener("resize", sync);
    window.addEventListener("scroll", sync, true);
    return () => {
      window.removeEventListener("resize", sync);
      window.removeEventListener("scroll", sync, true);
    };
  }, [open, sync]);

  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  const finish = useCallback(() => {
    if (storageKey) {
      try {
        window.localStorage.setItem(storageKey, "seen");
      } catch {
        // Private mode can block storage; the tour simply shows again.
      }
    }
    onClose();
  }, [onClose, storageKey]);

  if (!open || !step) return null;

  const last = index === steps.length - 1;

  // Sit under the spotlight when there is room, otherwise above it.
  const below = rect ? rect.top + rect.height + CARD_GAP : null;
  const roomBelow = below !== null && below + 180 < window.innerHeight;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label={step.title}>
      {/* Dim everything, then punch a hole around the anchored element. */}
      <div className="absolute inset-0 bg-black/60" onClick={finish} />
      {rect && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-xl ring-2 ring-white/70"
          style={{
            top: rect.top - PADDING,
            left: rect.left - PADDING,
            width: rect.width + PADDING * 2,
            height: rect.height + PADDING * 2,
            boxShadow: "0 0 0 9999px rgba(0,0,0,0.6)",
          }}
        />
      )}

      <div
        className={cn(
          "absolute inset-x-4 mx-auto max-w-[520px] rounded-2xl bg-brand-deepNavy p-6 shadow-xl",
          !rect && "top-1/2 -translate-y-1/2",
        )}
        style={
          rect
            ? roomBelow
              ? { top: below! }
              : { bottom: window.innerHeight - rect.top + CARD_GAP }
            : undefined
        }
      >
        <h2 className="text-[17px] font-bold leading-[1.4] text-white">{step.title}</h2>
        <p className="pt-2 text-[15px] leading-[1.5] text-brand-grey400">{step.description}</p>

        <div className="flex items-center justify-between gap-4 pt-6">
          <button type="button" onClick={finish} className="text-[15px] font-semibold leading-[1.4] text-white">
            Skip
          </button>

          <div className="flex items-center gap-4">
            <span className="text-[15px] leading-[1.4] text-brand-grey500">
              {index + 1}/{steps.length}
            </span>
            <button
              type="button"
              onClick={() => (last ? finish() : setIndex((i) => i + 1))}
              className="rounded-full bg-brand-blue500 px-7 py-3 text-[15px] font-semibold leading-[1.2] text-white transition-opacity hover:opacity-90"
            >
              {last ? "Done" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/** True when this browser has not completed the named walkthrough yet. */
export const shouldShowWalkthrough = (storageKey: string) => {
  try {
    return window.localStorage.getItem(storageKey) !== "seen";
  } catch {
    return false;
  }
};

export default Walkthrough;

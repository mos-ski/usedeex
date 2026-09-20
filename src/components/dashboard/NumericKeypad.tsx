import { BackspaceIcon } from "./icons";
import { cn } from "@/lib/utils";

/**
 * The app's own numeric keypad (Figma 306:34909) — a bordered 3×4 grid rather
 * than the OS keyboard, so amount and PIN screens look the same everywhere.
 */
export const NumericKeypad = ({
  onKey,
  onBackspace,
  /** Shows the decimal key; PIN screens turn it off. */
  decimal = true,
  className,
}: {
  onKey: (digit: string) => void;
  onBackspace: () => void;
  decimal?: boolean;
  className?: string;
}) => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", decimal ? "." : "", "0", "back"];

  return (
    <div
      role="group"
      aria-label="Numeric keypad"
      className={cn("flex w-full flex-col gap-3 bg-brand-surface px-8 py-3", className)}
    >
      {[0, 3, 6, 9].map((start) => (
        <div key={start} className="flex items-start justify-center gap-12">
          {keys.slice(start, start + 3).map((key, i) => {
            if (key === "") return <span key={`gap-${i}`} className="h-14 flex-1" aria-hidden="true" />;

            const isBack = key === "back";
            return (
              <button
                key={key}
                type="button"
                aria-label={isBack ? "Delete" : key}
                onClick={() => (isBack ? onBackspace() : onKey(key))}
                className={cn(
                  "flex h-14 flex-1 items-center justify-center rounded border border-brand-grey100",
                  "text-brand-grey900 transition-colors active:bg-brand-grey50",
                )}
              >
                {isBack ? (
                  <BackspaceIcon className="size-6" />
                ) : (
                  <span className="font-mono text-2xl font-bold leading-[1.4]">{key}</span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default NumericKeypad;

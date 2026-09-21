import { useEffect, useRef } from "react";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader } from "./AppShell";
import { FaceIdIcon } from "./icons";
import NumericKeypad from "./NumericKeypad";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

/**
 * PIN entry (Figma 305:34709) — a row of dots with the Face ID shortcut, over
 * the app's own keypad. Desktop types on the real keyboard instead.
 */
export const PinEntry = ({
  title = "Enter PIN",
  caption,
  value,
  onChange,
  length = 6,
  error,
  onBack,
  onBiometric,
}: {
  title?: string;
  /** Optional line above the dots explaining what is being confirmed. */
  caption?: string;
  value: string;
  onChange: (value: string) => void;
  length?: number;
  /** Shown under the dots; also turns them red. */
  error?: string;
  onBack: () => void;
  /** Omit to hide the Face ID shortcut. */
  onBiometric?: () => void;
}) => {
  // Two taps in one tick would otherwise both read the same stale `value`.
  const isMobile = useIsMobile();
  const latest = useRef(value);
  latest.current = value;

  useEffect(() => {
    if (isMobile) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Backspace") {
        latest.current = latest.current.slice(0, -1);
        onChange(latest.current);
        return;
      }
      if (!/^[0-9]$/.test(event.key) || latest.current.length >= length) return;
      latest.current += event.key;
      onChange(latest.current);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobile, length, onChange]);

  return (
    <AppShell className="bg-brand-surface" innerClassName="flex min-h-[100dvh] flex-col pb-0 lg:max-w-[480px] lg:px-4">
      <PageTransition className="flex flex-1 flex-col">
        <PageHeader title={title} onBack={onBack} />

        <div className="flex flex-1 flex-col items-center pt-20">
          {caption && <p className="pb-8 text-sm leading-[1.6] text-brand-bodyText">{caption}</p>}

          <span className="flex items-center gap-4">
            {Array.from({ length }, (_, i) => (
              <span
                key={i}
                className={cn(
                  "size-3.5 rounded-full transition-colors",
                  error ? "bg-brand-danger" : i < value.length ? "bg-brand-grey900" : "bg-brand-grey100",
                )}
              />
            ))}
          </span>

          {error && <p className="pt-4 text-xs leading-[1.3] text-brand-danger">{error}</p>}

          {onBiometric && (
            <button
              type="button"
              aria-label="Use Face ID"
              onClick={onBiometric}
              className="mt-14 text-brand-grey900 transition-opacity hover:opacity-70"
            >
              <FaceIdIcon className="size-12" />
            </button>
          )}
        </div>

        {isMobile && (
        <NumericKeypad
          decimal={false}
          onKey={(d) => {
            if (latest.current.length >= length) return;
            latest.current += d;
            onChange(latest.current);
          }}
          onBackspace={() => {
            latest.current = latest.current.slice(0, -1);
            onChange(latest.current);
          }}
        />
        )}
      </PageTransition>
    </AppShell>
  );
};

export default PinEntry;

import { useEffect, useRef } from "react";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader } from "./AppShell";
import { FaceIdIcon } from "./icons";
import { cn } from "@/lib/utils";

/**
 * PIN entry (Figma 305:34709) — a row of dots over the device's numeric
 * keyboard, with the Face ID shortcut beneath.
 *
 * The Figma shows the OS keypad, so the field is a transparent input with
 * `inputMode="numeric"` and the device supplies the keys.
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
  const input = useRef<HTMLInputElement>(null);

  // Raise the keyboard as soon as the screen appears.
  useEffect(() => {
    const timer = window.setTimeout(() => input.current?.focus(), 250);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AppShell className="bg-brand-surface" innerClassName="flex min-h-[100dvh] flex-col pb-0 lg:max-w-[480px] lg:px-4">
      <PageTransition className="flex flex-1 flex-col">
        <PageHeader title={title} onBack={onBack} />

        <button
          type="button"
          onClick={() => input.current?.focus()}
          aria-label="Enter your PIN"
          className="flex flex-1 cursor-default flex-col items-center pt-24"
        >
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
            <span
              role="button"
              tabIndex={0}
              aria-label="Use Face ID"
              onClick={(e) => {
                e.stopPropagation();
                onBiometric();
              }}
              onKeyDown={(e) => e.key === "Enter" && onBiometric()}
              className="mt-20 text-brand-grey900 transition-opacity hover:opacity-70"
            >
              <FaceIdIcon className="size-11" />
            </span>
          )}
        </button>

        {/* Off-screen field: the device draws the keypad, the dots show progress. */}
        <input
          ref={input}
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, length))}
          inputMode="numeric"
          autoComplete="one-time-code"
          aria-label={title}
          className="pointer-events-none absolute size-px opacity-0"
        />
      </PageTransition>
    </AppShell>
  );
};

export default PinEntry;

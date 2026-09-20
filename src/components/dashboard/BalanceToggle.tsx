import { EyeIcon, EyeOffIcon } from "./icons";
import { useBalanceVisibility } from "@/contexts/BalanceVisibilityContext";
import { cn } from "@/lib/utils";

/**
 * Show/hide control beside a balance heading (Figma 309:35284) — a 9px eye in
 * the label's own colour, using the same pair as the sign-in password field.
 * The glyph names the action, so eye-off shows while the balance is visible.
 * One press hides every balance in the app.
 */
export const BalanceToggle = ({ className }: { className?: string }) => {
  const { hidden, toggle } = useBalanceVisibility();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={hidden ? "Show balances" : "Hide balances"}
      aria-pressed={hidden}
      className={cn("shrink-0 text-current transition-opacity hover:opacity-70", className)}
    >
      {hidden ? <EyeIcon className="size-[9px]" /> : <EyeOffIcon className="size-[9px]" />}
    </button>
  );
};

export default BalanceToggle;

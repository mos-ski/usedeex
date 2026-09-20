import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export const GIFT_CARD_ROUTES = { buy: "/giftcards/buy", sell: "/giftcards" } as const;

export type GiftCardMode = keyof typeof GIFT_CARD_ROUTES;

/**
 * Buy / Sell switch carried at the top of both gift card flows, the way the
 * bill types sit above the bill flow. Each side is its own route, so the tab
 * navigates rather than swapping state.
 */
export const GiftCardModeTabs = ({ mode }: { mode: GiftCardMode }) => {
  const navigate = useNavigate();

  return (
    <div role="tablist" aria-label="Gift card mode" className="flex items-center gap-3 rounded bg-brand-barBg p-0.5">
      {(["buy", "sell"] as const).map((key) => (
        <button
          key={key}
          role="tab"
          type="button"
          aria-selected={mode === key}
          onClick={() => mode !== key && navigate(GIFT_CARD_ROUTES[key])}
          className={cn(
            "flex-1 shrink-0 rounded px-2 py-1.5 text-xs font-semibold capitalize leading-[1.4] transition-colors",
            mode === key ? "bg-brand-surface text-brand-blue500" : "text-brand-grey900 hover:text-brand-blue500",
          )}
        >
          {key}
        </button>
      ))}
    </div>
  );
};

export default GiftCardModeTabs;

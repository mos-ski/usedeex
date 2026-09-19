import { cn } from "@/lib/utils";
import { coinIcons } from "./coinIcons";

import logoMtn from "@/assets/dashboard/bill-mtn.png";
import logoIkedc from "@/assets/dashboard/bill-ikedc.png";
import logoSpottybet from "@/assets/dashboard/bill-spottybet.png";
import logoAmazon from "@/assets/dashboard/bill-amazon.png";
import logoApple from "@/assets/dashboard/bill-apple.png";
import logoGooglePlay from "@/assets/dashboard/bill-googleplay.png";
import logoUba from "@/assets/banks/uba.png";
import logoAccess from "@/assets/banks/access.png";
import logoGtbank from "@/assets/banks/gtbank.png";
import logoZenith from "@/assets/banks/zenith.png";

export const providerLogos: Record<string, string> = {
  MTN: logoMtn,
  IKEDC: logoIkedc,
  SpottyBet: logoSpottybet,
  Amazon: logoAmazon,
  Apple: logoApple,
  "Google Play": logoGooglePlay,
  UBA: logoUba,
  "Access Bank": logoAccess,
  GTBank: logoGtbank,
  "Zenith Bank": logoZenith,
};

/**
 * The 32px circular mark that fronts every asset / transaction row.
 * Resolves a symbol to a coin SVG, a provider logo, or a lettered fallback
 * (₦ for the naira wallet) so rows never render a broken image.
 */
export const AssetMark = ({ symbol, className }: { symbol: string; className?: string }) => {
  const src = coinIcons[symbol] ?? providerLogos[symbol];

  if (src) {
    return <img src={src} alt="" className={cn("size-8 shrink-0 rounded-full object-contain", className)} />;
  }

  const isNaira = symbol === "NGN";

  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full text-[15px] font-bold leading-none text-white",
        // Naira carries the Nigerian green; other fallbacks stay brand navy.
        isNaira ? "bg-brand-naira" : "bg-brand-navy",
        className,
      )}
    >
      {isNaira ? "₦" : symbol.charAt(0).toUpperCase()}
    </span>
  );
};

export default AssetMark;

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

/**
 * Tinted initial used for people rather than assets — the DeeX-tag rows and
 * the Account avatar (Figma 299:27412, 302:34379).
 */
export const InitialMark = ({ name, className }: { name: string; className?: string }) => (
  <span
    className={cn(
      "flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-primary100 text-[13px] font-semibold uppercase leading-none text-brand-blue500",
      className,
    )}
  >
    {name.replace(/^@/, "").charAt(0)}
  </span>
);

/** Brand-adjacent hues the generated avatars pick from. */
const avatarPalette = [
  ["#0B75C2", "#D4EBFD"],
  ["#004D85", "#D0EBFF"],
  ["#008751", "#D6F2E4"],
  ["#BE6B0A", "#FBEFDD"],
  ["#6047DF", "#E4E0FB"],
  ["#C2185B", "#FBE0EA"],
] as const;

/** Stable hash so a given tag always draws the same avatar. */
const hashOf = (seed: string) => [...seed].reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) >>> 0, 7);

/**
 * Generated identicon for a DeeX tag — a mirrored dot grid, so every handle
 * gets a distinct picture without shipping a photo per user.
 */
export const TagAvatar = ({ seed, className }: { seed: string; className?: string }) => {
  const hash = hashOf(seed.replace(/^@/, "").toLowerCase());
  const [ink, bg] = avatarPalette[hash % avatarPalette.length];

  // Build the left three columns, then mirror them for symmetry.
  const cells: boolean[][] = Array.from({ length: 5 }, (_, row) =>
    Array.from({ length: 5 }, (_, col) => {
      const source = col > 2 ? 4 - col : col;
      return ((hash >> (row * 3 + source)) & 1) === 1;
    }),
  );

  return (
    <span
      className={cn("flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full", className)}
      style={{ backgroundColor: bg }}
    >
      <svg viewBox="0 0 5 5" className="size-full" aria-hidden="true">
        {cells.flatMap((row, y) =>
          row.map((on, x) =>
            on ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={ink} /> : null,
          ),
        )}
      </svg>
    </span>
  );
};

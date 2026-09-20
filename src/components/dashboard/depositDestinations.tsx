import AssetMark from "./AssetMark";
import { AvatarIcon } from "./icons";
import type { SheetOption } from "./OptionSheet";
import { nairaWalletBalance } from "@/data/nairaWalletData";
import { NGN_PER_USD, formatNgn, formatUsd } from "@/lib/format";

/** Values the router switches on after the deposit sheet resolves. */
export const NAIRA_DEPOSIT = "NGN";
export const TAG_DEPOSIT = "DEEX_TAG";

/**
 * Non-crypto ways to be paid, shown above the coins in the deposit sheet.
 * Neither has a network, so picking one goes straight to its details.
 */
export const depositExtras: SheetOption[] = [
  {
    value: TAG_DEPOSIT,
    label: "DeeX Tag",
    detail: "Receive from another DeeX user",
    mark: (
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand-blue500">
        <AvatarIcon className="size-5" />
      </span>
    ),
  },
  {
    value: NAIRA_DEPOSIT,
    label: "NGN",
    detail: "Naira Wallet",
    primary: formatNgn(nairaWalletBalance),
    secondary: formatUsd(nairaWalletBalance / NGN_PER_USD),
    mark: <AssetMark symbol="NGN" />,
  },
];

/** Where each deposit destination leads. */
export const depositRouteFor = (symbol: string, network: string) => {
  if (symbol === NAIRA_DEPOSIT) return { path: "/deposit-cash" as const, state: undefined };
  if (symbol === TAG_DEPOSIT) return { path: "/deex-tag" as const, state: undefined };
  return { path: "/deposit" as const, state: { symbol, network } };
};

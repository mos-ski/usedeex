/** Naira/USD conversion used across the rebranded screens. */
export const NGN_PER_USD = 1535;

/** "66,789,879.00NGN" — the suffix is joined with no space, per the Figma. */
export const formatNgn = (amount: number) =>
  `${amount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}NGN`;

export const formatUsd = (amount: number) =>
  `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/**
 * Splits a dollar amount for the two-size Gasoek display ($1,458.98 renders the
 * cents smaller), returning the leading "$1,458." and the trailing "98".
 */
export const splitUsdForDisplay = (amount: number) => {
  const [whole, cents] = amount.toFixed(2).split(".");
  return {
    lead: `$${Number(whole).toLocaleString("en-US")}.`,
    cents,
  };
};

/** Drops trailing zeros from a fixed-decimal string: "0.6100" -> "0.61". */
export const trimZeros = (value: string) => value.replace(/\.?0+$/, "") || "0";

export type ActivityCategory = "crypto" | "giftcards" | "bills" | "payouts";
export type ActivityStatus = "Success" | "Pending" | "Failed";
export type ActivityAction = "sell" | "deposit" | "swap" | "withdraw";

export type ActivityTransaction = {
  id: number;
  title: string;
  symbol: string;
  date: string;
  month: string;
  status: ActivityStatus;
  ngn: number;
  secondaryOverride?: string;
  category: ActivityCategory;
  action: ActivityAction;
  occurredAt: string;
  receiptType: string;
  hashId?: string;
  destination?: string;
  phone?: string;
  provider?: string;
};

const months = [
  { name: "September 2026", iso: "2026-09", days: [18, 15, 12, 8, 3] },
  { name: "August 2026", iso: "2026-08", days: [29, 24, 19, 13, 6] },
  { name: "July 2026", iso: "2026-07", days: [28, 22, 17, 11, 4] },
  { name: "June 2026", iso: "2026-06", days: [27, 21, 16, 10, 3] },
  { name: "May 2026", iso: "2026-05", days: [30, 25, 18, 12, 5] },
  { name: "April 2026", iso: "2026-04", days: [28, 23, 17, 9, 2] },
] as const;

const ordinal = (day: number) => {
  const suffix = day % 10 === 1 && day !== 11 ? "st" : day % 10 === 2 && day !== 12 ? "nd" : day % 10 === 3 && day !== 13 ? "rd" : "th";
  return `${day}${suffix}`;
};

const statuses: ActivityStatus[] = ["Success", "Success", "Pending", "Success", "Failed"];
const cryptoAssets = ["BTC", "ETH", "USDT", "USDC", "TRX"];
const giftCards = ["Apple", "Google Play", "Amazon", "Steam", "Sephora"];
const billItems = [
  { title: "MTN - Airtime", symbol: "MTN", receiptType: "airtime", provider: "MTN" },
  { title: "IKEDC - Electricity", symbol: "IKEDC", receiptType: "electricity", provider: "IKEDC" },
  { title: "Airtel - Data", symbol: "Airtel", receiptType: "data", provider: "Airtel" },
  { title: "SpottyBet - Betting", symbol: "SpottyBet", receiptType: "betting", provider: "SpottyBet" },
  { title: "Glo - Data", symbol: "Glo", receiptType: "data", provider: "Glo" },
];
const payoutProviders = ["PalmPay", "Opay", "GTBank", "Access Bank", "UBA"];

const makeTransaction = (category: ActivityCategory, index: number): ActivityTransaction => {
  const month = months[Math.floor(index / 5)];
  const slot = index % 5;
  const day = month.days[slot];
  const occurredAt = `${month.iso}-${String(day).padStart(2, "0")}`;
  const date = `${month.name.split(" ")[0]} ${ordinal(day)}, 2026`;
  const status = statuses[(index + (category === "bills" ? 1 : category === "payouts" ? 2 : 0)) % statuses.length];
  const idBase = { crypto: 1000, giftcards: 2000, bills: 3000, payouts: 4000 }[category];
  const id = idBase + index + 1;
  const hashId = `TXN-${category.slice(0, 3).toUpperCase()}-${String(index + 1).padStart(4, "0")}`;

  if (category === "crypto") {
    const symbol = cryptoAssets[index % cryptoAssets.length];
    const action: ActivityAction = index % 5 === 2 ? "deposit" : index % 5 === 3 ? "swap" : "sell";
    const ngn = 85000 + index * 37500;
    const quantity = ((index + 1) * (symbol === "BTC" ? 0.00042 : symbol === "ETH" ? 0.012 : 13.75)).toFixed(symbol === "BTC" ? 5 : symbol === "ETH" ? 3 : 2);
    return {
      id, title: `${symbol} - ${action[0].toUpperCase()}${action.slice(1)}`, symbol, date, month: month.name, status, ngn,
      secondaryOverride: `${quantity} ${symbol}`, category, action, occurredAt, receiptType: action, hashId,
      destination: `${8103674000 + index} - ${payoutProviders[index % payoutProviders.length]}`,
    };
  }

  if (category === "giftcards") {
    const symbol = giftCards[index % giftCards.length];
    return {
      id, title: `${symbol} - Giftcard`, symbol, date, month: month.name, status, ngn: 25000 + index * 6500,
      secondaryOverride: `$${50 + (index % 8) * 25}.00`, category, action: "sell", occurredAt, receiptType: "giftcard", hashId,
    };
  }

  if (category === "bills") {
    const bill = billItems[index % billItems.length];
    return {
      id, title: bill.title, symbol: bill.symbol, date, month: month.name, status, ngn: 1000 + (index % 10) * 1500,
      category, action: "withdraw", occurredAt, receiptType: bill.receiptType, hashId, provider: bill.provider,
      phone: `0803${String(674000 + index).padStart(6, "0")}`,
    };
  }

  const provider = payoutProviders[index % payoutProviders.length];
  return {
    id, title: `Payout - ${provider}`, symbol: "NGN", date, month: month.name, status, ngn: 50000 + index * 27500,
    category, action: "withdraw", occurredAt, receiptType: "payout", hashId,
    destination: `${9012345600 + index} - ${provider}`,
  };
};

export const activityTransactions: ActivityTransaction[] = (["crypto", "giftcards", "bills", "payouts"] as const)
  .flatMap((category) => Array.from({ length: 30 }, (_, index) => makeTransaction(category, index)));

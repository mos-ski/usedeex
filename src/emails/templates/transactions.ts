import { emailShell, fillTokens } from "../layout";
import {
  action,
  amountHero,
  callout,
  detailTable,
  heading,
  paragraph,
  rawRow,
  renderBody,
  successBadge,
  teamSignOff,
} from "../primitives";
import type { EmailCategory, EmailPayload, ReceiptRow, TemplateDefinition } from "../types";

type BaseReceiptPayload = EmailPayload & {
  name: string;
  email: string;
  reference: string;
  date: string;
  receiptUrl: string;
};

type ReceiptConfig<T extends BaseReceiptPayload> = {
  label: string;
  category: EmailCategory;
  subject: string;
  headline: (data: T) => string;
  amount: (data: T) => string;
  rows: (data: T) => ReceiptRow[];
  cta?: (data: T) => { label: string; url: string };
};

const renderReceipt = <T extends BaseReceiptPayload>(config: ReceiptConfig<T>, data: T) => {
  const rows: ReceiptRow[] = [
    ...config.rows(data),
    { label: "Reference", value: data.reference },
    { label: "Date", value: data.date },
  ];
  const body = renderBody(
    heading(config.headline(data)) +
      paragraph(`${data.name}, done. That's how money should move.`, { color: "#000000" }) +
      rawRow(amountHero(config.amount(data))) +
      rawRow(successBadge()) +
      rawRow(callout(detailTable(rows))) +
      (config.cta ? rawRow(action(config.cta(data).label, config.cta(data).url)) : "") +
      rawRow(teamSignOff()),
  );

  return fillTokens(emailShell(config.subject, body), { email: data.email });
};

const receiptDefinition = <T extends BaseReceiptPayload>(
  config: ReceiptConfig<T>,
  sample: T,
): TemplateDefinition<T> => ({
  label: config.label,
  category: config.category,
  subject: config.subject,
  previewText: config.headline(sample),
  required: Object.keys(sample) as (keyof T)[],
  sample,
  render: (data) => renderReceipt(config, data),
});

const base = (reference: string) => ({
  name: "Olivia",
  email: "olivia@deex.com",
  reference,
  date: "24 Sep 2026, 8:42 PM",
  receiptUrl: `https://deex.com/receipt/${reference}`,
});

const walletDeposit = receiptDefinition(
  {
    label: "Wallet deposit",
    category: "wallet",
    subject: "Your cash just landed",
    headline: () => "CASH IN. BALANCE UP.",
    amount: ({ amount }) => amount,
    rows: ({ source, account }) => [
      { label: "Type", value: "Naira wallet deposit" },
      { label: "From", value: source },
      { label: "Account", value: account },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Receipt", url: receiptUrl }),
  },
  { ...base("DX-WAL-0001"), amount: "₦250,000.00", source: "GTBank •••• 4812", account: "DeeX Naira Wallet" },
);

const walletWithdrawal = receiptDefinition(
  {
    label: "Wallet withdrawal",
    category: "wallet",
    subject: "Withdrawal complete",
    headline: () => "PAID OUT. RIGHT ON TIME.",
    amount: ({ amount }) => amount,
    rows: ({ destination, fee }) => [
      { label: "Type", value: "Naira withdrawal" },
      { label: "To", value: destination },
      { label: "Fee", value: fee },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Receipt", url: receiptUrl }),
  },
  { ...base("DX-WAL-0002"), amount: "₦120,000.00", destination: "Access Bank •••• 9084", fee: "₦100.00" },
);

const assetReceived = receiptDefinition(
  {
    label: "Asset received",
    category: "digital-assets",
    subject: "Your assets arrived",
    headline: () => "RECEIVED. YOUR BALANCE IS READY.",
    amount: ({ quantity, asset }) => `${quantity} ${asset}`,
    rows: ({ asset, network, transactionHash }) => [
      { label: "Asset", value: asset },
      { label: "Network", value: network },
      { label: "Transaction hash", value: transactionHash },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Transaction", url: receiptUrl }),
  },
  { ...base("DX-CRY-0001"), quantity: "500.00", asset: "USDT", network: "TRON (TRC20)", transactionHash: "8f92…71ca" },
);

const assetSent = receiptDefinition(
  {
    label: "Asset sent",
    category: "digital-assets",
    subject: "Transfer complete",
    headline: () => "SENT. NO WAITING AROUND.",
    amount: ({ quantity, asset }) => `${quantity} ${asset}`,
    rows: ({ asset, network, destination, fee }) => [
      { label: "Asset", value: asset },
      { label: "Network", value: network },
      { label: "To", value: destination },
      { label: "Network fee", value: fee },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Transaction", url: receiptUrl }),
  },
  { ...base("DX-CRY-0002"), quantity: "250.00", asset: "USDT", network: "TRON (TRC20)", destination: "TX7m…4qPa", fee: "1.00 USDT" },
);

const assetBought = receiptDefinition(
  {
    label: "Asset bought",
    category: "digital-assets",
    subject: "Your purchase is complete",
    headline: () => "BOUGHT. YOUR ASSET IS IN.",
    amount: ({ quantity, asset }) => `${quantity} ${asset}`,
    rows: ({ paid, rate, wallet }) => [
      { label: "You paid", value: paid },
      { label: "Rate", value: rate },
      { label: "Credited to", value: wallet },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Receipt", url: receiptUrl }),
  },
  { ...base("DX-CRY-0003"), quantity: "0.012", asset: "BTC", paid: "$1,250.00", rate: "1 BTC = $104,166.67", wallet: "BTC Wallet" },
);

const assetSold = receiptDefinition(
  {
    label: "Asset sold",
    category: "digital-assets",
    subject: "Your payout landed",
    headline: () => "SOLD. CASH DELIVERED.",
    amount: ({ payout }) => payout,
    rows: ({ sold, rate, destination }) => [
      { label: "You sold", value: sold },
      { label: "Rate", value: rate },
      { label: "Paid to", value: destination },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Receipt", url: receiptUrl }),
  },
  { ...base("DX-CRY-0004"), payout: "₦825,000.00", sold: "500.00 USDT", rate: "₦1,650 / USDT", destination: "GTBank •••• 4812" },
);

const assetSwapped = receiptDefinition(
  {
    label: "Asset swapped",
    category: "digital-assets",
    subject: "Swap complete",
    headline: () => "SWAPPED. YOUR NEXT MOVE IS READY.",
    amount: ({ toAmount }) => toAmount,
    rows: ({ fromAmount, toAmount, rate, fee }) => [
      { label: "From", value: fromAmount },
      { label: "To", value: toAmount },
      { label: "Rate", value: rate },
      { label: "Fee", value: fee },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Swap", url: receiptUrl }),
  },
  { ...base("DX-CRY-0005"), fromAmount: "500.00 USDT", toAmount: "0.0048 BTC", rate: "1 BTC = 104,166.67 USDT", fee: "2.50 USDT" },
);

const deexPay = receiptDefinition(
  {
    label: "DeeX Pay payment",
    category: "digital-assets",
    subject: "Payment sent",
    headline: () => "PAID. THAT'S THE WHOLE STORY.",
    amount: ({ amount }) => amount,
    rows: ({ recipient, method, note }) => [
      { label: "To", value: recipient },
      { label: "Method", value: method },
      { label: "Note", value: note },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Payment", url: receiptUrl }),
  },
  { ...base("DX-PAY-0001"), amount: "$320.00", recipient: "Maya Stores", method: "DeeX Pay", note: "September order" },
);

const giftCardBought = receiptDefinition(
  {
    label: "Gift card purchased",
    category: "gift-cards",
    subject: "Your gift card is ready",
    headline: () => "BOUGHT. CODE DELIVERED.",
    amount: ({ value }) => value,
    rows: ({ brand, country, delivery }) => [
      { label: "Brand", value: brand },
      { label: "Country", value: country },
      { label: "Delivered to", value: delivery },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Gift Card", url: receiptUrl }),
  },
  { ...base("DX-GFT-0001"), value: "$100.00", brand: "Apple", country: "United States", delivery: "olivia@deex.com" },
);

const giftCardSold = receiptDefinition(
  {
    label: "Gift card sale paid",
    category: "gift-cards",
    subject: "Your gift card payout landed",
    headline: () => "APPROVED. PAYOUT COMPLETE.",
    amount: ({ payout }) => payout,
    rows: ({ brand, cardValue, rate }) => [
      { label: "Brand", value: brand },
      { label: "Card value", value: cardValue },
      { label: "Rate", value: rate },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Receipt", url: receiptUrl }),
  },
  { ...base("DX-GFT-0002"), payout: "₦142,000.00", brand: "Amazon", cardValue: "$100.00", rate: "₦1,420 / $" },
);

const airtime = receiptDefinition(
  {
    label: "Airtime purchase",
    category: "bills",
    subject: "Airtime delivered",
    headline: () => "TOPPED UP. KEEP TALKING.",
    amount: ({ amount }) => amount,
    rows: ({ provider, phone }) => [
      { label: "Provider", value: provider },
      { label: "Phone number", value: phone },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Receipt", url: receiptUrl }),
  },
  { ...base("DX-BIL-0001"), amount: "₦5,000.00", provider: "MTN", phone: "0803 ••• 4098" },
);

const data = receiptDefinition(
  {
    label: "Data purchase",
    category: "bills",
    subject: "Your data is active",
    headline: () => "CONNECTED. KEEP MOVING.",
    amount: ({ plan }) => plan,
    rows: ({ provider, phone, paid }) => [
      { label: "Provider", value: provider },
      { label: "Phone number", value: phone },
      { label: "You paid", value: paid },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Receipt", url: receiptUrl }),
  },
  { ...base("DX-BIL-0002"), plan: "20GB Monthly", provider: "Airtel", phone: "0802 ••• 7712", paid: "₦6,000.00" },
);

const electricity = receiptDefinition(
  {
    label: "Electricity payment",
    category: "bills",
    subject: "Electricity payment complete",
    headline: () => "POWER PAID. TOKEN READY.",
    amount: ({ amount }) => amount,
    rows: ({ provider, meterNumber, meterToken }) => [
      { label: "Provider", value: provider },
      { label: "Meter number", value: meterNumber },
      { label: "Meter token", value: meterToken },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Receipt", url: receiptUrl }),
  },
  { ...base("DX-BIL-0003"), amount: "₦25,000.00", provider: "IKEDC", meterNumber: "4500 •••• 1132", meterToken: "5273 1049 8210 4438 0012" },
);

const betting = receiptDefinition(
  {
    label: "Betting wallet funded",
    category: "bills",
    subject: "Betting wallet funded",
    headline: () => "FUNDED. YOU'RE GOOD TO GO.",
    amount: ({ amount }) => amount,
    rows: ({ provider, customerId }) => [
      { label: "Provider", value: provider },
      { label: "Customer ID", value: customerId },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Receipt", url: receiptUrl }),
  },
  { ...base("DX-BIL-0004"), amount: "₦10,000.00", provider: "SportyBet", customerId: "SPT-2049831" },
);

const rewardEarned = receiptDefinition(
  {
    label: "Reward earned",
    category: "rewards",
    subject: "You just earned DeeXPoints",
    headline: () => "POINTS UP. ANOTHER WIN.",
    amount: ({ points }) => `${points} DeeXPoints`,
    rows: ({ reason, cashValue }) => [
      { label: "Earned for", value: reason },
      { label: "Cash value", value: cashValue },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Rewards", url: receiptUrl }),
  },
  { ...base("DX-RWD-0001"), points: "200", reason: "First deposit", cashValue: "₦2,000.00" },
);

const referralJoined = receiptDefinition(
  {
    label: "Referral joined",
    category: "rewards",
    subject: "Your referral joined DeeX",
    headline: () => "YOUR NETWORK JUST GREW.",
    amount: () => "1 new referral",
    rows: ({ referredUser, status }) => [
      { label: "Referral", value: referredUser },
      { label: "Status", value: status },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Referrals", url: receiptUrl }),
  },
  { ...base("DX-REF-0001"), referredUser: "Maya O. (maya@example.com)", status: "Joined" },
);

const referralRewardPaid = receiptDefinition(
  {
    label: "Referral reward paid",
    category: "rewards",
    subject: "Your referral reward landed",
    headline: () => "REFERRED. REWARDED. PAID.",
    amount: ({ reward }) => reward,
    rows: ({ referredUser, qualification }) => [
      { label: "Referral", value: referredUser },
      { label: "Qualified by", value: qualification },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Earnings", url: receiptUrl }),
  },
  { ...base("DX-REF-0002"), reward: "100 DeeXPoints", referredUser: "Maya O.", qualification: "$100+ trade" },
);

const rewardRedeemed = receiptDefinition(
  {
    label: "Reward redeemed",
    category: "rewards",
    subject: "Reward redemption complete",
    headline: () => "POINTS OUT. CASH IN.",
    amount: ({ cashValue }) => cashValue,
    rows: ({ points, destination }) => [
      { label: "Points redeemed", value: points },
      { label: "Paid to", value: destination },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Receipt", url: receiptUrl }),
  },
  { ...base("DX-RWD-0002"), cashValue: "₦5,000.00", points: "500 DeeXPoints", destination: "GTBank •••• 4812" },
);

const virtualCardCreated = receiptDefinition(
  {
    label: "Virtual card created",
    category: "virtual-card",
    subject: "Your DeeX card is ready",
    headline: () => "CARD READY. SPEND YOUR WAY.",
    amount: ({ currency }) => `${currency} virtual card`,
    rows: ({ card, status }) => [
      { label: "Card", value: card },
      { label: "Status", value: status },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Card", url: receiptUrl }),
  },
  { ...base("DX-CRD-0001"), currency: "USD", card: "VISA •••• 4567", status: "Active" },
);

const virtualCardFunded = receiptDefinition(
  {
    label: "Virtual card funded",
    category: "virtual-card",
    subject: "Your card balance is up",
    headline: () => "CARD FUNDED. READY TO SPEND.",
    amount: ({ amount }) => amount,
    rows: ({ card, source }) => [
      { label: "Card", value: card },
      { label: "From", value: source },
    ],
    cta: ({ receiptUrl }) => ({ label: "View Card", url: receiptUrl }),
  },
  { ...base("DX-CRD-0002"), amount: "$500.00", card: "VISA •••• 4567", source: "USDT Wallet" },
);

export const transactionDefinitions = {
  "wallet-deposit-success": walletDeposit,
  "wallet-withdrawal-success": walletWithdrawal,
  "asset-received": assetReceived,
  "asset-sent": assetSent,
  "asset-bought": assetBought,
  "asset-sold": assetSold,
  "asset-swapped": assetSwapped,
  "deex-pay-success": deexPay,
  "gift-card-bought": giftCardBought,
  "gift-card-sold": giftCardSold,
  "airtime-success": airtime,
  "data-success": data,
  "electricity-success": electricity,
  "betting-success": betting,
  "reward-earned": rewardEarned,
  "referral-joined": referralJoined,
  "referral-reward-paid": referralRewardPaid,
  "reward-redeemed": rewardRedeemed,
  "virtual-card-created": virtualCardCreated,
  "virtual-card-funded": virtualCardFunded,
} as const;

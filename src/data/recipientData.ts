import { hasAssetLogo } from "@/components/dashboard/AssetMark";

export type RecipientKind = "recent" | "beneficiary";

export type BankRecipient = {
  id: string;
  account: string;
  name: string;
  bank: string;
  kind: RecipientKind;
};

export type CryptoDestination = {
  id: string;
  value: string;
  display: string;
  label: string;
  symbol: string;
  network: string;
  kind: RecipientKind;
};

export type BillRecipient = {
  id: string;
  identifier: string;
  name: string;
  provider: string;
  kind: RecipientKind;
};

const people = [
  "Emeka Okafor", "Adedamola Moses", "Damilola Adeyemi", "Bola Akinwale", "Precious Isioma",
  "Chioma Daniels", "Tunde Balogun", "Amaka Obi", "Femi Williams", "Aisha Bello",
  "Kelechi Nwosu", "Yemi Ajayi", "Zainab Musa", "Chidi Eze", "Temitope Lawal",
] as const;

// Only banks whose logo we hold; the rest would draw a lettered placeholder.
const banks = ["UBA", "Access Bank", "GTBank", "Zenith Bank", "PalmPay", "Opay", "First Bank"].filter(hasAssetLogo);

export const bankRecipients: BankRecipient[] = (["recent", "beneficiary"] as const).flatMap((kind, group) =>
  people.map((name, index) => ({
    id: `bank-${kind}-${index + 1}`,
    account: `${8103674000 + group * 100 + index}`,
    name,
    bank: banks[(index + group * 2) % banks.length],
    kind,
  })),
);

const cryptoProfiles = [
  ["Adebayo Ogunlesi", "BTC", "Bitcoin"], ["Chioma Daniels", "ETH", "Ethereum (ERC-20)"],
  ["Tunde Balogun", "USDT", "Tron (TRC-20)"], ["Amaka Obi", "USDC", "Solana"],
  ["Femi Williams", "TRX", "Tron (TRC-20)"], ["Aisha Bello", "BTC", "Bitcoin"],
  ["Kelechi Nwosu", "ETH", "Ethereum (ERC-20)"], ["Yemi Ajayi", "USDT", "BNB Smart Chain"],
  ["Zainab Musa", "USDC", "Ethereum (ERC-20)"], ["Chidi Eze", "TRX", "Tron (TRC-20)"],
  ["Temitope Lawal", "BTC", "Bitcoin"], ["Ngozi James", "ETH", "Ethereum (ERC-20)"],
  ["Kunle Martins", "USDT", "Tron (TRC-20)"], ["Mary Udo", "USDC", "Solana"],
  ["Ibrahim Sani", "BTC", "Bitcoin"],
] as const;

const addressFor = (index: number) => `0x${(index + 17).toString(16).padStart(2, "0")}42d35Cc6634C0532925a3b844Bc9e7595f2bD${(68 + index).toString(16)}`;
const shortAddress = (value: string) => `${value.slice(0, 12)}......${value.slice(-10)}`;

export const cryptoDestinations: CryptoDestination[] = [
  ...cryptoProfiles.map(([label, symbol, network], index) => {
    const value = addressFor(index);
    return { id: `crypto-recent-${index + 1}`, value, display: shortAddress(value), label, symbol, network, kind: "recent" as const };
  }),
  ...cryptoProfiles.map(([label, symbol], index) => {
    const value = `@${label.toLowerCase().replace(/\s+/g, "_")}`;
    return { id: `crypto-beneficiary-${index + 1}`, value, display: value, label, symbol, network: "DeeX username", kind: "beneficiary" as const };
  }),
];

const makeBillRecipients = (prefix: string, identifiers: string[], allProviders: readonly string[]): BillRecipient[] => {
  // A saved recipient on a provider we cannot badge would draw a lettered
  // circle, so keep only the providers we hold artwork for.
  const providers = allProviders.filter(hasAssetLogo);
  if (providers.length === 0) return [];

  return (["recent", "beneficiary"] as const).flatMap((kind, group) =>
    identifiers.map((identifier, index) => ({
      id: `${prefix}-${kind}-${index + 1}`,
      identifier: group === 0 ? identifier : `${identifier.slice(0, -2)}${String(70 + index).slice(-2)}`,
      name: people[index % people.length],
      provider: providers[(index + group) % providers.length],
      kind,
    })),
  );
};

export const phoneRecipients = makeBillRecipients(
  "phone",
  ["08103674006", "09012345678", "07098765432", "08055512345", "09123456780", "08023456781", "07034567892", "08145678903", "09056789014", "08067890125", "07078901236", "08189012347"],
  ["MTN", "Glo", "Airtel", "9mobile"],
);

export const electricityRecipients = makeBillRecipients(
  "meter",
  ["45123456789", "62987654321", "70123456780", "81234567891", "92345678902", "13456789013", "24567890124", "35678901235", "46789012346", "57890123457"],
  ["IKEDC", "EKEDC", "AEDC", "PHED", "BEDC"],
);

export const bettingRecipients = makeBillRecipients(
  "betting",
  ["BET9JA_1234", "SPORTY_5678", "1XBET_9012", "BETKING_3456", "MSPORT_7890", "BET9JA_2468", "SPORTY_1357", "1XBET_8642", "BETKING_9753", "MSPORT_0246"],
  ["Bet9ja", "SportyBet", "1xBet", "BetKing", "MSport"],
);

export type TagRecipient = { id: string; tag: string; name: string; kind: RecipientKind };

/** DeeX tags you can send to (Figma 299:27412). */
export const tagRecipients: TagRecipient[] = [
  { id: "tag-recent-1", tag: "@moski", name: "Adedamola Adewale", kind: "recent" },
  ...people.slice(0, 8).map((name, index) => ({
    id: `tag-recent-${index + 2}`,
    tag: `@${name.split(" ")[0].toLowerCase()}`,
    name,
    kind: "recent" as const,
  })),
  ...people.slice(8).map((name, index) => ({
    id: `tag-beneficiary-${index + 1}`,
    tag: `@${name.split(" ")[0].toLowerCase()}${index + 1}`,
    name,
    kind: "beneficiary" as const,
  })),
];

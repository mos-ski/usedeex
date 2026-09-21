import { hasAssetLogo } from "@/components/dashboard/AssetMark";

/**
 * Catalogue behind Buy Giftcard: which countries DeeX sells into, and the
 * cards available in each. A card is a brand in one country, so the same
 * brand appears once per country it is issued in — that is how the rates,
 * denominations and redeem terms differ.
 */

export type GiftCardCountry = {
  code: string;
  name: string;
  flag: string;
  /** ISO code of the currency the card is denominated in. */
  currency: string;
  currencyName: string;
};

export const giftCardCountries: GiftCardCountry[] = [
  { code: "US", name: "United States", flag: "🇺🇸", currency: "USD", currencyName: "US Dollar" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP", currencyName: "British Pound Sterling" },
  { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD", currencyName: "Canadian Dollar" },
  { code: "AU", name: "Australia", flag: "🇦🇺", currency: "AUD", currencyName: "Australian Dollar" },
  { code: "DE", name: "Germany", flag: "🇩🇪", currency: "EUR", currencyName: "Euro" },
  { code: "FR", name: "France", flag: "🇫🇷", currency: "EUR", currencyName: "Euro" },
  { code: "IT", name: "Italy", flag: "🇮🇹", currency: "EUR", currencyName: "Euro" },
  { code: "ES", name: "Spain", flag: "🇪🇸", currency: "EUR", currencyName: "Euro" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪", currency: "AED", currencyName: "United Arab Emirates Dirham" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", currency: "NGN", currencyName: "Nigerian Naira" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", currency: "ZAR", currencyName: "South African Rand" },
  { code: "GH", name: "Ghana", flag: "🇬🇭", currency: "GHS", currencyName: "Ghanaian Cedi" },
  { code: "KE", name: "Kenya", flag: "🇰🇪", currency: "KES", currencyName: "Kenyan Shilling" },
  { code: "IN", name: "India", flag: "🇮🇳", currency: "INR", currencyName: "Indian Rupee" },
  { code: "JP", name: "Japan", flag: "🇯🇵", currency: "JPY", currencyName: "Japanese Yen" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", currency: "BRL", currencyName: "Brazilian Real" },
];

export const giftCardCategories = [
  "Entertainment",
  "Shopping",
  "Gaming",
  "Food & Drink",
  "Travel",
] as const;

export type GiftCardCategory = (typeof giftCardCategories)[number];

export type GiftCardProduct = {
  id: string;
  brand: string;
  category: GiftCardCategory;
  /** Country codes this card is issued in. */
  countries: string[];
  /** Face values offered, in the country's own currency. */
  denominations: number[];
  redeemInstruction: string;
};

const allGiftCardProducts: GiftCardProduct[] = [
  {
    id: "netflix",
    brand: "NetFlix",
    category: "Entertainment",
    countries: ["US", "GB", "CA", "DE", "FR", "BR"],
    denominations: [20, 30, 50, 60, 100],
    redeemInstruction:
      "To start watching, go to netflix.com/redeem and enter the code. Valid only towards the Netflix streaming service via a Netflix account (18+ to be a member), in countries where the service is offered in the card's currency. Entire value is credited to your Netflix account on redemption. Nonrefundable and not redeemable for cash except where required by law. Does not expire. No resale.",
  },
  {
    id: "amazon",
    brand: "Amazon",
    category: "Shopping",
    countries: ["US", "GB", "CA", "DE", "FR", "IT", "ES", "AU", "JP", "IN"],
    denominations: [10, 25, 50, 100, 200],
    redeemInstruction:
      "Enter the claim code at checkout or add it to your Amazon balance under Gift Cards. Funds never expire and apply to millions of items sold by Amazon and participating sellers. Cannot be transferred for value or redeemed for cash except where required by law.",
  },
  {
    id: "apple",
    brand: "Apple",
    category: "Entertainment",
    countries: ["US", "GB", "CA", "AU", "DE", "FR", "JP"],
    denominations: [15, 25, 50, 100],
    redeemInstruction:
      "Redeem in the App Store, iTunes Store, Apple Books or Apple TV app, or under Redeem Gift Card in Settings. Use the balance for apps, games, music, films, iCloud+ and more. Valid only in the country of purchase.",
  },
  {
    id: "google-play",
    brand: "Google Play",
    category: "Gaming",
    countries: ["US", "GB", "CA", "AU", "DE", "IN", "BR"],
    denominations: [10, 25, 50, 100],
    redeemInstruction:
      "Open the Google Play Store app, tap your profile, then Payments & subscriptions → Redeem code. The balance applies to apps, games, in-app items, films and books. Valid only in the country of purchase.",
  },
  {
    id: "steam",
    brand: "Steam",
    category: "Gaming",
    countries: ["US", "GB", "CA", "AU", "DE", "BR"],
    denominations: [20, 50, 100],
    redeemInstruction:
      "Sign in to Steam, open your account details and choose Redeem a Steam Gift Card. The value is added to your Steam Wallet for games, software, hardware and in-game items.",
  },
  {
    id: "xbox",
    brand: "Xbox",
    category: "Gaming",
    countries: ["US", "GB", "CA", "AU", "DE"],
    denominations: [10, 25, 50, 100],
    redeemInstruction:
      "Redeem at microsoft.com/redeem or on your Xbox console under Store → Redeem. The balance covers games, add-ons, Game Pass and films. Valid only in the country of purchase.",
  },
  {
    id: "playstation",
    brand: "PlayStation",
    category: "Gaming",
    countries: ["US", "GB", "CA", "AU", "DE", "FR"],
    denominations: [10, 25, 50, 100],
    redeemInstruction:
      "Sign in to PlayStation Store, select your avatar, then Redeem Codes. Funds are added to your PSN wallet for games, add-ons and subscriptions on the account's region.",
  },
  {
    id: "starbucks",
    brand: "Starbucks",
    category: "Food & Drink",
    countries: ["US", "GB", "CA", "AU"],
    denominations: [10, 25, 50],
    redeemInstruction:
      "Add the card to the Starbucks app under Payment → Add card, or hand the code to a barista. Balance can be used at participating stores in the country of issue. Not redeemable for cash.",
  },
  {
    id: "uber-eats",
    brand: "Uber Eats",
    category: "Food & Drink",
    countries: ["US", "GB", "CA", "AU", "FR", "ZA"],
    denominations: [15, 25, 50, 100],
    redeemInstruction:
      "Open the Uber Eats app, go to Account → Wallet → Add promo or gift code and enter the code. Credit applies to orders in the country of issue and does not expire.",
  },
  {
    id: "airbnb",
    brand: "Airbnb",
    category: "Travel",
    countries: ["US", "GB", "CA", "AU", "ES", "IT"],
    denominations: [25, 50, 100, 200],
    redeemInstruction:
      "Go to airbnb.com/gift-cards/redeem while signed in and enter the code. Credit applies automatically to your next eligible booking and never expires.",
  },
  {
    id: "target",
    brand: "Target",
    category: "Shopping",
    countries: ["US"],
    denominations: [10, 25, 50, 100],
    redeemInstruction:
      "Use at any Target store or on target.com at checkout. No fees, no expiry. Not redeemable for cash except where required by law.",
  },
  {
    id: "walmart",
    brand: "Walmart",
    category: "Shopping",
    countries: ["US", "CA"],
    denominations: [25, 50, 100, 200],
    redeemInstruction:
      "Use in Walmart stores or on walmart.com at checkout. Balance does not expire and carries no service fees.",
  },
  {
    id: "nike",
    brand: "Nike",
    category: "Shopping",
    countries: ["US", "GB", "DE", "FR", "ES"],
    denominations: [25, 50, 100],
    redeemInstruction:
      "Enter the code at checkout on nike.com or in the Nike app, or present it in a Nike store. Valid in the country of issue and does not expire.",
  },
  {
    id: "spotify",
    brand: "Spotify",
    category: "Entertainment",
    countries: ["US", "GB", "DE", "FR", "BR", "ZA", "NG"],
    denominations: [10, 30, 60],
    redeemInstruction:
      "Go to spotify.com/redeem while signed in and enter the code to add Premium time to your account. Cannot be combined with an active billed-through-partner plan.",
  },
  {
    id: "sephora",
    brand: "Sephora",
    category: "Shopping",
    countries: ["US", "GB", "CA", "FR", "IT", "ES"],
    denominations: [25, 50, 100],
    redeemInstruction:
      "Enter the code at checkout on sephora.com or present it in store. Applies to beauty products in the country of issue and does not expire.",
  },
  {
    id: "itunes",
    brand: "iTunes",
    category: "Entertainment",
    countries: ["US", "GB", "CA", "AU", "DE", "FR", "JP"],
    denominations: [10, 25, 50, 100],
    redeemInstruction:
      "Redeem under Redeem Gift Card in Settings, or in the App Store and Apple Music. Valid only in the country of purchase.",
  },
  {
    id: "nordstrom",
    brand: "Nordstrom",
    category: "Shopping",
    countries: ["US", "CA"],
    denominations: [25, 50, 100, 250],
    redeemInstruction:
      "Use at any Nordstrom or Nordstrom Rack store, or on nordstrom.com at checkout. No fees and no expiry.",
  },
  {
    id: "jumia",
    brand: "Jumia",
    category: "Shopping",
    countries: ["NG", "GH", "KE"],
    denominations: [5000, 10000, 25000, 50000],
    redeemInstruction:
      "Enter the voucher code at checkout on Jumia in the country of issue. Applies to items sold by Jumia and participating sellers.",
  },
];

/**
 * Only brands we hold a logo for. A lettered circle reads as a placeholder,
 * so a brand stays out of the catalogue until its artwork lands — adding the
 * file to AssetMark is enough to bring it back.
 */
export const giftCardProducts: GiftCardProduct[] = allGiftCardProducts.filter((product) =>
  hasAssetLogo(product.brand),
);

/** Symbol for the amount shown on a card's price pills. */
export const currencySymbols: Record<string, string> = {
  USD: "$",
  GBP: "£",
  EUR: "€",
  CAD: "CA$",
  AUD: "A$",
  AED: "AED ",
  NGN: "₦",
  ZAR: "R",
  GHS: "GH₵",
  KES: "KSh ",
  INR: "₹",
  JPY: "¥",
  BRL: "R$",
};

export const formatCardPrice = (amount: number, currency: string) =>
  `${currencySymbols[currency] ?? `${currency} `}${amount.toLocaleString("en-US", {
    minimumFractionDigits: currency === "NGN" || currency === "JPY" ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;

/** What a foreign-currency card costs in naira, before the DeeX fee. */
export const NGN_PER_CARD_CURRENCY: Record<string, number> = {
  USD: 1535,
  GBP: 1950,
  EUR: 1670,
  CAD: 1120,
  AUD: 1010,
  AED: 418,
  NGN: 1,
  ZAR: 84,
  GHS: 98,
  KES: 11.9,
  INR: 18.4,
  JPY: 10.2,
  BRL: 283,
};

export interface GiftCardRateTier {
  min: number;
  max: number;
  rate: number; // ₦ per $1
}

export interface GiftCardBrand {
  id: string;
  name: string;
  category: "Shopping" | "Entertainment" | "Gaming" | "Prepaid";
  countries: string[];
  cardTypes: ("Physical Card" | "E-Code")[];
  denominations: number[];
  rates: Record<string, GiftCardRateTier[]>; // keyed by country
  enabled: boolean;
}

export interface GiftCardOrder {
  id: string;
  userId: string;
  userName: string;
  brandId: string;
  brandName: string;
  country: string;
  cardType: "Physical Card" | "E-Code";
  amount: number;
  currency: string;
  rate: number;
  ngnPayout: number;
  status: "pending" | "approved" | "rejected";
  cardImage?: string;
  cardCode?: string;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

// Default brands with tiered rates per country
export const DEFAULT_BRANDS: GiftCardBrand[] = [
  {
    id: "apple",
    name: "Apple",
    category: "Shopping",
    countries: ["USA", "UK", "Canada", "EU"],
    cardTypes: ["Physical Card", "E-Code"],
    denominations: [25, 50, 100, 200, 500],
    rates: {
      USA: [{ min: 25, max: 100, rate: 1450 }, { min: 101, max: 200, rate: 1400 }, { min: 201, max: 500, rate: 1350 }],
      UK: [{ min: 25, max: 100, rate: 1500 }, { min: 101, max: 200, rate: 1450 }, { min: 201, max: 500, rate: 1400 }],
      Canada: [{ min: 25, max: 100, rate: 1380 }, { min: 101, max: 200, rate: 1350 }, { min: 201, max: 500, rate: 1300 }],
      EU: [{ min: 25, max: 100, rate: 1420 }, { min: 101, max: 200, rate: 1380 }, { min: 201, max: 500, rate: 1350 }],
    },
    enabled: true,
  },
  {
    id: "google-play",
    name: "Google Play",
    category: "Entertainment",
    countries: ["USA", "UK", "Canada", "EU"],
    cardTypes: ["Physical Card", "E-Code"],
    denominations: [25, 50, 100, 200],
    rates: {
      USA: [{ min: 25, max: 100, rate: 1400 }, { min: 101, max: 200, rate: 1350 }],
      UK: [{ min: 25, max: 100, rate: 1380 }, { min: 101, max: 200, rate: 1330 }],
      Canada: [{ min: 25, max: 100, rate: 1350 }, { min: 101, max: 200, rate: 1300 }],
      EU: [{ min: 25, max: 100, rate: 1370 }, { min: 101, max: 200, rate: 1320 }],
    },
    enabled: true,
  },
  {
    id: "amazon",
    name: "Amazon",
    category: "Shopping",
    countries: ["USA", "UK", "Canada", "EU"],
    cardTypes: ["Physical Card", "E-Code"],
    denominations: [25, 50, 100, 200, 500],
    rates: {
      USA: [{ min: 25, max: 100, rate: 1380 }, { min: 101, max: 200, rate: 1350 }, { min: 201, max: 500, rate: 1300 }],
      UK: [{ min: 25, max: 100, rate: 1400 }, { min: 101, max: 200, rate: 1370 }, { min: 201, max: 500, rate: 1320 }],
      Canada: [{ min: 25, max: 100, rate: 1350 }, { min: 101, max: 200, rate: 1320 }, { min: 201, max: 500, rate: 1280 }],
      EU: [{ min: 25, max: 100, rate: 1370 }, { min: 101, max: 200, rate: 1340 }, { min: 201, max: 500, rate: 1300 }],
    },
    enabled: true,
  },
  {
    id: "steam",
    name: "Steam",
    category: "Gaming",
    countries: ["USA", "UK", "EU"],
    cardTypes: ["Physical Card", "E-Code"],
    denominations: [20, 50, 100],
    rates: {
      USA: [{ min: 20, max: 50, rate: 1350 }, { min: 51, max: 100, rate: 1300 }],
      UK: [{ min: 20, max: 50, rate: 1330 }, { min: 51, max: 100, rate: 1280 }],
      EU: [{ min: 20, max: 50, rate: 1320 }, { min: 51, max: 100, rate: 1270 }],
    },
    enabled: true,
  },
  {
    id: "itunes",
    name: "iTunes",
    category: "Entertainment",
    countries: ["USA", "UK", "Canada"],
    cardTypes: ["Physical Card", "E-Code"],
    denominations: [25, 50, 100, 200],
    rates: {
      USA: [{ min: 25, max: 100, rate: 1420 }, { min: 101, max: 200, rate: 1380 }],
      UK: [{ min: 25, max: 100, rate: 1400 }, { min: 101, max: 200, rate: 1360 }],
      Canada: [{ min: 25, max: 100, rate: 1370 }, { min: 101, max: 200, rate: 1340 }],
    },
    enabled: true,
  },
  {
    id: "walmart",
    name: "Walmart",
    category: "Shopping",
    countries: ["USA"],
    cardTypes: ["Physical Card", "E-Code"],
    denominations: [25, 50, 100, 200],
    rates: {
      USA: [{ min: 25, max: 100, rate: 1300 }, { min: 101, max: 200, rate: 1250 }],
    },
    enabled: true,
  },
  {
    id: "nike",
    name: "Nike",
    category: "Shopping",
    countries: ["USA", "UK"],
    cardTypes: ["Physical Card"],
    denominations: [25, 50, 100],
    rates: {
      USA: [{ min: 25, max: 50, rate: 1250 }, { min: 51, max: 100, rate: 1200 }],
      UK: [{ min: 25, max: 50, rate: 1230 }, { min: 51, max: 100, rate: 1180 }],
    },
    enabled: true,
  },
  {
    id: "sephora",
    name: "Sephora",
    category: "Shopping",
    countries: ["USA"],
    cardTypes: ["Physical Card", "E-Code"],
    denominations: [25, 50, 100],
    rates: {
      USA: [{ min: 25, max: 50, rate: 1200 }, { min: 51, max: 100, rate: 1150 }],
    },
    enabled: true,
  },
];

// Rate calculator
export function getRate(brand: GiftCardBrand, country: string, amount: number): number {
  const countryRates = brand.rates[country];
  if (!countryRates) return 0;
  for (const tier of countryRates) {
    if (amount >= tier.min && amount <= tier.max) return tier.rate;
  }
  return countryRates[countryRates.length - 1]?.rate ?? 0;
}

export function calcPayout(brand: GiftCardBrand, country: string, amount: number): number {
  const rate = getRate(brand, country, amount);
  return amount * rate;
}

// localStorage store
const BRANDS_KEY = "deex_gc_brands";
const ORDERS_KEY = "deex_gc_orders";

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

const MOCK_ORDERS: GiftCardOrder[] = [
  {
    id: "gc_001", userId: "u1", userName: "Ibrahim Abubakar", brandId: "apple", brandName: "Apple",
    country: "USA", cardType: "Physical Card", amount: 200, currency: "USD", rate: 1400, ngnPayout: 280000,
    status: "pending", cardImage: "https://placehold.co/400x250/333/fff?text=Apple+Gift+Card",
    createdAt: "2026-03-10T14:30:00Z",
  },
  {
    id: "gc_002", userId: "u2", userName: "Divine Omajuwa", brandId: "amazon", brandName: "Amazon",
    country: "USA", cardType: "E-Code", amount: 100, currency: "USD", rate: 1380, ngnPayout: 138000,
    status: "pending", cardCode: "AQ7X-9KM2-R4PL",
    createdAt: "2026-03-10T12:15:00Z",
  },
  {
    id: "gc_003", userId: "u3", userName: "Chidinma Obi", brandId: "steam", brandName: "Steam",
    country: "USA", cardType: "E-Code", amount: 50, currency: "USD", rate: 1350, ngnPayout: 67500,
    status: "approved", cardCode: "ST-ABCD-EFGH-1234",
    createdAt: "2026-03-09T09:00:00Z", reviewedAt: "2026-03-09T09:12:00Z", reviewedBy: "Admin",
  },
  {
    id: "gc_004", userId: "u4", userName: "Adewale Musa", brandId: "google-play", brandName: "Google Play",
    country: "UK", cardType: "Physical Card", amount: 50, currency: "USD", rate: 1380, ngnPayout: 69000,
    status: "approved", cardImage: "https://placehold.co/400x250/01875F/fff?text=Google+Play",
    createdAt: "2026-03-08T16:45:00Z", reviewedAt: "2026-03-08T17:00:00Z", reviewedBy: "Admin",
  },
  {
    id: "gc_005", userId: "u5", userName: "Fortune Chigor", brandId: "itunes", brandName: "iTunes",
    country: "USA", cardType: "Physical Card", amount: 25, currency: "USD", rate: 1420, ngnPayout: 35500,
    status: "rejected", cardImage: "https://placehold.co/400x250/EA4CC0/fff?text=iTunes",
    createdAt: "2026-03-07T11:30:00Z", reviewedAt: "2026-03-07T12:00:00Z", reviewedBy: "Admin",
    notes: "Card already redeemed",
  },
  {
    id: "gc_006", userId: "u1", userName: "Ibrahim Abubakar", brandId: "walmart", brandName: "Walmart",
    country: "USA", cardType: "E-Code", amount: 100, currency: "USD", rate: 1300, ngnPayout: 130000,
    status: "pending", cardCode: "WM-5678-IJKL-9012",
    createdAt: "2026-03-10T16:00:00Z",
  },
];

export const giftcardStore = {
  // Brands
  getBrands: (): GiftCardBrand[] => readJson(BRANDS_KEY, DEFAULT_BRANDS),
  saveBrands: (brands: GiftCardBrand[]) => localStorage.setItem(BRANDS_KEY, JSON.stringify(brands)),
  updateBrand: (id: string, updates: Partial<GiftCardBrand>) => {
    const brands = giftcardStore.getBrands();
    const idx = brands.findIndex(b => b.id === id);
    if (idx >= 0) brands[idx] = { ...brands[idx], ...updates };
    giftcardStore.saveBrands(brands);
    return brands;
  },
  addBrand: (brand: GiftCardBrand) => {
    const brands = giftcardStore.getBrands();
    brands.push(brand);
    giftcardStore.saveBrands(brands);
    return brands;
  },
  removeBrand: (id: string) => {
    const brands = giftcardStore.getBrands().filter(b => b.id !== id);
    giftcardStore.saveBrands(brands);
    return brands;
  },

  // Orders
  getOrders: (): GiftCardOrder[] => readJson(ORDERS_KEY, MOCK_ORDERS),
  addOrder: (order: GiftCardOrder) => {
    const list = giftcardStore.getOrders();
    list.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
  },
  updateOrder: (id: string, updates: Partial<GiftCardOrder>) => {
    const list = giftcardStore.getOrders();
    const idx = list.findIndex(o => o.id === id);
    if (idx >= 0) list[idx] = { ...list[idx], ...updates };
    localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
    return list;
  },
};

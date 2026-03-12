// ===== ADMIN MOCK DATA =====

// Dashboard
export const dashboardMetrics = [
  { label: "Total payout", value: "₦2,396,106,090.97", hidden: true },
  { label: "Active Users", value: "1,847", hidden: true },
  { label: "Total customers", value: "2,833", hidden: true },
  { label: "Total merchants", value: "12", hidden: true },
];

export const performanceData = [
  { month: "Jan", crypto: 8500, giftcard: 2000 },
  { month: "Feb", crypto: 22000, giftcard: 3500 },
  { month: "Mar", crypto: 12000, giftcard: 2800 },
];

export const quickLinks = [
  "Slack", "Customer care line", "Google Analytics", "Mixpanel", "Looker Studio", "API Logs"
];

// Wallets
export const deexWallet = {
  totalCrypto: "$23,496.60",
  glydeBalance: "₦7,316.00",
  palmpayBalance: "₦3,874,753.39",
  assets: [
    { symbol: "BTC", amount: "0.029 BTC", usd: "$1,956.11" },
    { symbol: "ETH", amount: "0.009272 ETH", usd: "$17.93" },
    { symbol: "USDT", amount: "21,487.507 USDT", usd: "$21,487.09" },
    { symbol: "SOL", amount: "0.018 SOL", usd: "$1.44" },
    { symbol: "DOGE", amount: "97.946 DOGE", usd: "$8.68" },
  ],
  depositInfo: {
    bankName: "Palmpay",
    accountName: "DEEX OPTIONS LTD",
    accountNumber: "8041234567",
    cryptoAddress: "TXkR4n8JqP9vL2mW5bY7cZ3dF6gH1sA0",
    cryptoNetwork: "TRC-20 (USDT)",
  }
};

export const customersWallet = {
  totalCrypto: "$15,567.92",
  assets: [
    { symbol: "BTC", amount: "0.027 BTC", usd: "$1,816.95" },
    { symbol: "ETH", amount: "0.002018 ETH", usd: "$3.90" },
    { symbol: "USDT", amount: "13,732.176 USDT", usd: "$13,731.91" },
    { symbol: "SOL", amount: "0.005105 SOL", usd: "$0.42" },
    { symbol: "DOGE", amount: "12.994 DOGE", usd: "$1.15" },
  ]
};

export const tradeVolumeData = [
  { month: "Jan", volume: 9500 },
  { month: "Feb", volume: 18200 },
  { month: "Mar", volume: 7800 },
];

export const assetDistribution = [
  { name: "USDT", value: 91.5, color: "#26A17B" },
  { name: "BTC", value: 8.3, color: "#F7931A" },
  { name: "ETH", value: 0.08, color: "#627EEA" },
  { name: "SOL", value: 0.006, color: "#9945FF" },
  { name: "DOGE", value: 0.04, color: "#C2A633" },
  { name: "TRX", value: 0.01, color: "#EF0027" },
];

export const walletActivity = [
  { type: "Debit", provider: "Hizo", sub: "Payout", amount: "-45.474 BTC", ngn: "63,436.65", txId: "69adba40210aef2d638ebe72", status: "COMPLETED", date: "Mar 8th, 2026, 7:04 PM" },
  { type: "Credit", provider: "Obiex", sub: "Deposit", amount: "+0.000680 BTC", ngn: "—", txId: "69adb83210aef2d638e9c3c", status: "COMPLETED", date: "Mar 8th, 2026, 6:56 PM" },
  { type: "Credit", provider: "Obiex", sub: "Deposit", amount: "+500.05 USDT", ngn: "—", txId: "69ada29b210aef2d638c0177", status: "COMPLETED", date: "Mar 8th, 2026, 5:23 PM" },
  { type: "Debit", provider: "Hizo", sub: "Payout", amount: "-24.00 USDT", ngn: "33,480.00", txId: "69ad9d78210aef2d638bab7e", status: "COMPLETED", date: "Mar 8th, 2026, 5:02 PM" },
  { type: "Credit", provider: "Obiex", sub: "Deposit", amount: "+24.00 USDT", ngn: "—", txId: "69ad9d5c210aef2d638baa46", status: "COMPLETED", date: "Mar 8th, 2026, 5:01 PM" },
  { type: "Credit", provider: "Obiex", sub: "Autoswap", amount: "+0.000744 BTC", ngn: "—", txId: "69ad930c210aef2d638af259", status: "COMPLETED", date: "Mar 8th, 2026, 4:17 PM" },
  { type: "Credit", provider: "Obiex", sub: "Deposit", amount: "+0.000744 BTC", ngn: "—", txId: "69ad929f210aef2d638ad6f1", status: "COMPLETED", date: "Mar 8th, 2026, 4:15 PM" },
  { type: "Debit", provider: "Hizo", sub: "Payout", amount: "-50.00 USDT", ngn: "69,750.00", txId: "69ad8fbc210aef2d638a866c", status: "COMPLETED", date: "Mar 8th, 2026, 4:03 PM" },
  { type: "Credit", provider: "Obiex", sub: "Deposit", amount: "+120.00 USDT", ngn: "—", txId: "69ad7fbc210aef2d638a766c", status: "COMPLETED", date: "Mar 8th, 2026, 3:45 PM" },
  { type: "Debit", provider: "Hizo", sub: "Payout", amount: "-75.00 USDT", ngn: "104,625.00", txId: "69ad6fbc210aef2d638a666c", status: "COMPLETED", date: "Mar 8th, 2026, 3:30 PM" },
  { type: "Credit", provider: "Obiex", sub: "Deposit", amount: "+0.0015 BTC", ngn: "—", txId: "69ad5fbc210aef2d638a566c", status: "COMPLETED", date: "Mar 8th, 2026, 2:15 PM" },
  { type: "Debit", provider: "Hizo", sub: "Payout", amount: "-200.00 USDT", ngn: "279,000.00", txId: "69ad4fbc210aef2d638a466c", status: "PENDING", date: "Mar 8th, 2026, 1:45 PM" },
];

// Orders
export const ordersData = {
  totalOrder: "$1,344,929.788",
  totalOrderBtc: "4,388.984 BTC",
  orderDistribution: [
    { label: "USDT", pct: 46.0, color: "bg-[#26A17B]" },
    { label: "BTC", pct: 53.0, color: "bg-[#F7931A]" },
    { label: "SOL", pct: 0.0, color: "bg-[#9945FF]" },
    { label: "ETH", pct: 1.0, color: "bg-[#627EEA]" },
    { label: "TRX", pct: 0.0, color: "bg-[#EF0027]" },
    { label: "SHIB", pct: 0.0, color: "bg-muted" },
  ],
  totalPayout: "$1,471,712.982",
  totalPayoutNgn: "₦2,396,106,090.97",
  payoutDistribution: [
    { label: "Crypto", pct: 20.8, color: "bg-deex-blue" },
    { label: "Giftcard", pct: 0.1, color: "bg-deex-orange" },
    { label: "Wallet", pct: 78.7, color: "bg-muted" },
  ],
  failedPayouts: 364,
};

export const ordersList = [
  { name: "Oluwaseun Daramola", asset: "BTC", type: "DEEX-DEPOSITS", amount: "0.000680 BTC", txId: "69adb83210aef2d638e9c3c", date: "Mar 8th, 2026, 6:56 PM", status: "COMPLETED", walletAddress: "bc1q...7x9k", confirmations: 6, payoutRef: "PAY-001" },
  { name: "Divine Omajuwa", asset: "USDT", type: "DEEX-DEPOSITS", amount: "500.05 USDT", txId: "69ada29b210aef2d638c0177", date: "Mar 8th, 2026, 5:23 PM", status: "COMPLETED", walletAddress: "TXkR...sA0", confirmations: 12, payoutRef: "PAY-002" },
  { name: "Victor Odigili", asset: "USDT", type: "DEEX-DEPOSITS", amount: "24.00 USDT", txId: "69ad9d5c210aef2d638baa46", date: "Mar 8th, 2026, 5:01 PM", status: "PENDING", walletAddress: "TXkR...b2P", confirmations: 0, payoutRef: "—" },
  { name: "Divine Omajuwa", asset: "BTC", type: "DEEX-ASSET-SWAPS", amount: "0.000744 BTC → USDT", txId: "69ad930c210aef2d638af259", date: "Mar 8th, 2026, 4:17 PM", status: "COMPLETED", walletAddress: "—", confirmations: 0, payoutRef: "—" },
  { name: "Divine Omajuwa", asset: "BTC", type: "DEEX-DEPOSITS", amount: "0.000744 BTC", txId: "69ad929f210aef2d638ad6f1", date: "Mar 8th, 2026, 4:15 PM", status: "COMPLETED", walletAddress: "bc1q...m3r", confirmations: 3, payoutRef: "PAY-003" },
  { name: "Ibrahim Abubakar", asset: "USDT", type: "DEEX-DEPOSITS", amount: "1,200.00 USDT", txId: "69ad823210aef2d638d9c3c", date: "Mar 8th, 2026, 3:42 PM", status: "COMPLETED", walletAddress: "TXkR...q7Z", confirmations: 15, payoutRef: "PAY-004" },
  { name: "Chidinma Obi", asset: "ETH", type: "DEEX-DEPOSITS", amount: "0.15 ETH", txId: "69ad723210aef2d638c9c3c", date: "Mar 8th, 2026, 2:30 PM", status: "COMPLETED", walletAddress: "0x3f...a9c2", confirmations: 24, payoutRef: "PAY-005" },
  { name: "Adewale Musa", asset: "BTC", type: "DEEX-WITHDRAWALS", amount: "0.005 BTC", txId: "69ad623210aef2d638b9c3c", date: "Mar 8th, 2026, 1:15 PM", status: "COMPLETED", walletAddress: "bc1q...k8w", confirmations: 6, payoutRef: "PAY-006" },
  { name: "Fortune Chigor", asset: "USDT", type: "DEEX-DEPOSITS", amount: "50.00 USDT", txId: "69ad523210aef2d638a9c3c", date: "Mar 7th, 2026, 11:45 PM", status: "FAILED", walletAddress: "TXkR...n3M", confirmations: 0, payoutRef: "—" },
  { name: "Lucky Holland", asset: "USDT", type: "DEEX-DEPOSITS", amount: "300.00 USDT", txId: "69ad423210aef2d63899c3c", date: "Mar 7th, 2026, 10:20 PM", status: "COMPLETED", walletAddress: "TXkR...w5Q", confirmations: 18, payoutRef: "PAY-007" },
  { name: "Efeme Jeremiah", asset: "BTC", type: "DEEX-ASSET-SWAPS", amount: "0.002 BTC → USDT", txId: "69ad323210aef2d63889c3c", date: "Mar 7th, 2026, 8:15 PM", status: "COMPLETED", walletAddress: "—", confirmations: 0, payoutRef: "—" },
  { name: "Quincy James", asset: "SOL", type: "DEEX-DEPOSITS", amount: "2.5 SOL", txId: "69ad223210aef2d63879c3c", date: "Mar 7th, 2026, 6:30 PM", status: "COMPLETED", walletAddress: "5Ht7...vR2", confirmations: 32, payoutRef: "PAY-008" },
  { name: "Grace Nwosu", asset: "USDT", type: "DEEX-DEPOSITS", amount: "75.00 USDT", txId: "69ad123210aef2d63869c3c", date: "Mar 7th, 2026, 4:00 PM", status: "PENDING", walletAddress: "TXkR...y8L", confirmations: 2, payoutRef: "—" },
  { name: "Fatima Kabiru", asset: "ETH", type: "DEEX-WITHDRAWALS", amount: "0.08 ETH", txId: "69ad023210aef2d63859c3c", date: "Mar 7th, 2026, 2:45 PM", status: "COMPLETED", walletAddress: "0x7b...c4d1", confirmations: 18, payoutRef: "PAY-009" },
  { name: "Victor Eze", asset: "BTC", type: "DEEX-DEPOSITS", amount: "0.001 BTC", txId: "69acf23210aef2d63849c3c", date: "Mar 7th, 2026, 12:00 PM", status: "FAILED", walletAddress: "bc1q...p2s", confirmations: 0, payoutRef: "—" },
  { name: "David Enyowhara", asset: "USDT", type: "DEEX-DEPOSITS", amount: "150.00 USDT", txId: "69ace23210aef2d63839c3c", date: "Mar 6th, 2026, 10:30 PM", status: "COMPLETED", walletAddress: "TXkR...m4R", confirmations: 20, payoutRef: "PAY-010" },
];

export const payoutsList = [
  { name: "Oluwaseun Daramola", amount: "₦63,436.65", bank: "Access Bank - 0800538398", orderRef: "69adb83210aef2d638e9c3c", date: "Mar 8th, 2026, 7:04 PM", status: "COMPLETED" },
  { name: "Divine Omajuwa", amount: "₦767,576.75", bank: "Access Bank - 0800538398", orderRef: "69ada29b210aef2d638c0177", date: "Mar 8th, 2026, 5:23 PM", status: "COMPLETED" },
  { name: "Victor Odigili", amount: "₦33,480.00", bank: "GTBank - 0123456789", orderRef: "69ad9d5c210aef2d638baa46", date: "Mar 8th, 2026, 5:01 PM", status: "PENDING" },
  { name: "Ibrahim Abubakar", amount: "₦1,674,000.00", bank: "First Bank - 3087654321", orderRef: "69ad823210aef2d638d9c3c", date: "Mar 8th, 2026, 3:42 PM", status: "COMPLETED" },
  { name: "Fortune Chigor", amount: "₦69,750.00", bank: "UBA - 2109876543", orderRef: "69ad523210aef2d638a9c3c", date: "Mar 7th, 2026, 11:45 PM", status: "FAILED" },
];

export const otcOrdersList = [
  { client: "Whale Capital Ltd", type: "BUY", asset: "BTC", amount: "2.5 BTC", value: "$168,425.00", rate: "₦97,200,000", status: "COMPLETED", date: "Mar 8th, 2026, 3:00 PM" },
  { client: "Apex Trading Co", type: "SELL", asset: "USDT", amount: "50,000 USDT", value: "$50,000.00", rate: "₦1,580", status: "PENDING", date: "Mar 8th, 2026, 11:00 AM" },
  { client: "Divine Omajuwa", type: "BUY", asset: "ETH", amount: "10 ETH", value: "$19,340.00", rate: "₦3,050,000", status: "COMPLETED", date: "Mar 7th, 2026, 5:30 PM" },
];

// Users
export const usersStats = {
  total: 2833,
  starCustomer: { name: "Ibrahim Abubakar", initials: "IA", referrals: 86 },
  biggestClient: { name: "Divine Omajuwa", initials: "DO", volume: "$131,145.473" },
  breakdown: [
    { label: "Leads", count: 0 },
    { label: "Customers", count: "2.8k" },
    { label: "Merchants", count: 12 },
    { label: "Clients", count: 0 },
  ],
};

export const signupData = [
  { month: "Jan", users: 318, clients: 12 },
  { month: "Feb", users: 85, clients: 5 },
  { month: "Mar", users: 95, clients: 8 },
];

export const customersList = [
  { name: "—— ——", email: "5wrjytq6vz@privaterelay.apple", kyc: "Level 2", phone: "07036693498", created: "Jul 20th, 2025, 1:55 PM", lastLogin: "Nov 7th, 2025, 10:04 AM", status: "active" as const },
  { name: "—— ——", email: "fthbx4r7cd@privaterelay.apple", kyc: "Level 1", phone: "09063440156", created: "Aug 15th, 2025, 8:18 PM", lastLogin: "Nov 7th, 2025, 10:04 AM", status: "active" as const },
  { name: "Adewale Musa", email: "adewale@gmail.com", kyc: "Level 3", phone: "08123456789", created: "Jan 5th, 2026, 9:30 AM", lastLogin: "Mar 8th, 2026, 2:15 PM", status: "active" as const },
  { name: "Chidinma Obi", email: "chidinma.obi@yahoo.com", kyc: "Level 2", phone: "07098765432", created: "Feb 12th, 2026, 3:45 PM", lastLogin: "Mar 7th, 2026, 11:20 AM", status: "active" as const },
  { name: "Divine Omajuwa", email: "divineomajuwa@gmail.com", kyc: "Level 3", phone: "08104103948", created: "Jul 1st, 2024, 4:00 AM", lastLogin: "Mar 8th, 2026, 9:28 PM", status: "active" as const },
  { name: "Ibrahim Abubakar", email: "ibrahim.abu@gmail.com", kyc: "Level 3", phone: "08055667788", created: "Jun 15th, 2024, 2:30 PM", lastLogin: "Mar 8th, 2026, 8:00 PM", status: "active" as const },
  { name: "Victor Odigili", email: "victor.odigili@gmail.com", kyc: "Level 2", phone: "09011223344", created: "Sep 3rd, 2025, 10:00 AM", lastLogin: "Mar 8th, 2026, 5:01 PM", status: "flagged" as const },
  { name: "Efeme Jeremiah", email: "ejaifeefemegreat@gmail.com", kyc: "Level 2", phone: "08033445566", created: "Oct 20th, 2025, 6:30 PM", lastLogin: "Mar 7th, 2026, 3:45 PM", status: "active" as const },
  { name: "Lucky Holland", email: "hollandlucky09@gmail.com", kyc: "Level 1", phone: "07044556677", created: "Nov 5th, 2025, 11:15 AM", lastLogin: "Jan 28th, 2026, 2:25 PM", status: "inactive" as const },
  { name: "Fortune Chigor", email: "chigorfortune25@gmail.com", kyc: "Level 2", phone: "08066778899", created: "Dec 1st, 2025, 8:00 AM", lastLogin: "Mar 6th, 2026, 9:00 AM", status: "active" as const },
  { name: "Quincy James", email: "jamesquincy3326@gmail.com", kyc: "Level 3", phone: "09088990011", created: "Jan 10th, 2026, 5:00 PM", lastLogin: "Mar 8th, 2026, 6:30 PM", status: "active" as const },
  { name: "Grace Nwosu", email: "grace.nwosu@gmail.com", kyc: "Level 2", phone: "07099001122", created: "Feb 1st, 2026, 9:45 AM", lastLogin: "Mar 8th, 2026, 4:00 PM", status: "active" as const },
];

// KYC
export const kycLogs = [
  { name: "CHIBUEZE UMEH", email: "chibuezeumeh903@gmail.com", level: "KYC 3", status: "APPROVED", date: "Feb 25th, 2026, 8:03 AM", bvn: "22345678901", document: "Driver's License" },
  { name: "OSASENAGA ERHARUYI", email: "emmosa718@gmail.com", level: "KYC 3", status: "APPROVED", date: "Feb 22nd, 2026, 7:42 AM", bvn: "22345678902", document: "Int'l Passport" },
  { name: "FRIDAY AZIAKPONO", email: "poundsfriday57@gmail.com", level: "KYC 3", status: "APPROVED", date: "Feb 21st, 2026, 9:01 PM", bvn: "22345678903", document: "NIN Slip" },
  { name: "Idris Abdullahi", email: "idris53279@gmail.com", level: "KYC 2", status: "REJECTED", date: "Feb 20th, 2026, 12:20 PM", bvn: "22345678904", document: "Voter's Card" },
  { name: "Donatus Aideyan", email: "sundaydonatusa@gmail.com", level: "KYC 3", status: "APPROVED", date: "Feb 19th, 2026, 7:56 PM", bvn: "22345678905", document: "Driver's License" },
  { name: "Quincy James", email: "jamesquincy3326@gmail.com", level: "KYC 3", status: "APPROVED", date: "Feb 16th, 2026, 3:58 PM", bvn: "22345678906", document: "Int'l Passport" },
  { name: "David Enyowhara", email: "fionabecon57@gmail.com", level: "KYC 2", status: "PENDING", date: "Feb 3rd, 2026, 12:09 AM", bvn: "22345678907", document: "NIN Slip" },
  { name: "Efeme Jeremiah", email: "ejaifeefemegreat@gmail.com", level: "KYC 2", status: "PENDING", date: "Jan 31st, 2026, 12:45 AM", bvn: "22345678908", document: "Driver's License" },
  { name: "Fortune Chigor", email: "chigorfortune25@gmail.com", level: "KYC 2", status: "PENDING", date: "Jan 28th, 2026, 2:28 PM", bvn: "22345678909", document: "Voter's Card" },
  { name: "Lucky Holland", email: "hollandlucky09@gmail.com", level: "KYC 2", status: "PENDING", date: "Jan 28th, 2026, 2:25 PM", bvn: "22345678910", document: "NIN Slip" },
];

// Payroll
export const payrollData = [
  { name: "IKEGBULAM UGOCHUKWU PAU", email: "paulambrose5002@gmail.com", role: "Backend Developer", salary: "₦300,000.00", created: "Jan 23rd, 2026, 11:45 AM" },
  { name: "ATUKALE TAIWO ABIODUN", email: "atukaletaiwo2@gmail.com", role: "QA Engineer", salary: "₦120,000.00", created: "Dec 22nd, 2025, 7:12 PM" },
  { name: "SHITTU KAOTHAR IRETOMIWA", email: "iretomiwashittu@gmail.com", role: "Project Manager", salary: "₦150,000.00", created: "Dec 22nd, 2025, 7:07 PM" },
  { name: "OKOROGBONA DEBORAH", email: "okorogbonadeborah@gmail.co", role: "IT Support Specialist", salary: "₦50,000.00", created: "Oct 20th, 2025, 6:30 PM" },
  { name: "ADEDAMOLA ADEWALE", email: "adedamolamoses@gmail.com", role: "Product Manager", salary: "₦400,000.00", created: "Aug 27th, 2025, 6:32 PM" },
  { name: "WILLIAMS CHIDINMA", email: "willia.vivng@gmail.com", role: "IT Support Specialist", salary: "₦70,000.00", created: "Aug 22nd, 2025, 12:08 PM" },
  { name: "DAWOOD KEHINDE", email: "digitalkhenny@gmail.com", role: "Product Manager", salary: "₦300,000.00", created: "Aug 22nd, 2025, 8:07 AM" },
  { name: "OLALEKAN OLOPADE", email: "olaolalekan4535@gmail.com", role: "Graphic Designer", salary: "₦100,000.00", created: "Mar 23rd, 2025, 5:09 PM" },
  { name: "OLAKUNLE TREASURE", email: "olakunletreasure@gmail.com", role: "Technical Writer", salary: "₦90,000.00", created: "Jan 22nd, 2025, 4:59 PM" },
];

// Reports
export const reportCards = [
  { title: "Revenue", desc: "How much does each user generate to/for us per year. How much money did we spend to acquire a user, etc", color: "text-[hsl(var(--deex-blue))]" },
  { title: "Growth", desc: "Total users per month or week, there source, if they signed up (activated user), if they buy.", color: "text-[hsl(var(--success))]" },
  { title: "Retention", desc: "Users who came back to login by theirselves. Resurrected users are users we got back by ourselves.", color: "text-[hsl(var(--deex-orange))]" },
  { title: "Website", desc: "How much does each user generate to/for us per year. How much money did we spend to acquire a user, etc,", color: "text-[hsl(var(--deex-blue))]" },
  { title: "Happiness", desc: "App Store rating, NPS scores, customer success rating, customer feedback scores, etc.", color: "text-[hsl(var(--deex-orange))]" },
  { title: "Survey", desc: "Collect feedback and data for market research, product development, and more.", color: "text-[hsl(var(--deex-purple))]" },
];

// Compliance
export type ComplianceAlert = {
  id: string;
  userName: string;
  email: string;
  severity: "critical" | "high" | "medium" | "low";
  trigger: string;
  triggerType: "high-frequency" | "multi-device" | "large-withdrawal" | "failed-kyc" | "wash-trading";
  description: string;
  date: string;
  status: "pending" | "reviewing" | "resolved" | "dismissed";
  autoSuspended: boolean;
  details: { label: string; value: string }[];
  timeline: { action: string; time: string; actor: string }[];
};

export const complianceAlerts: ComplianceAlert[] = [
  {
    id: "CA-001", userName: "Victor Odigili", email: "victor.odigili@gmail.com", severity: "critical",
    trigger: "High-Frequency Trading", triggerType: "high-frequency",
    description: "23 trades executed within 4 minutes. Threshold: 10 trades / 5 min.",
    date: "Mar 8, 2026, 4:12 PM", status: "pending", autoSuspended: true,
    details: [
      { label: "Trades in window", value: "23 trades / 4 min" },
      { label: "Total volume", value: "$12,450.00" },
      { label: "Avg trade size", value: "$541.30" },
      { label: "IP Address", value: "102.89.46.211" },
      { label: "Device", value: "iPhone 15 Pro — Safari" },
      { label: "Location", value: "Lagos, Nigeria" },
    ],
    timeline: [
      { action: "System auto-suspended account", time: "4:12 PM", actor: "System" },
      { action: "23rd trade detected — threshold breached", time: "4:12 PM", actor: "System" },
      { action: "10th trade in 3 min — monitoring started", time: "4:10 PM", actor: "System" },
      { action: "First trade in burst", time: "4:08 PM", actor: "Victor Odigili" },
    ],
  },
  {
    id: "CA-002", userName: "Chidinma Obi", email: "chidinma.obi@yahoo.com", severity: "high",
    trigger: "Multiple Device Logins", triggerType: "multi-device",
    description: "Logged in from 4 different devices across 3 countries within 2 hours.",
    date: "Mar 8, 2026, 2:30 PM", status: "reviewing", autoSuspended: false,
    details: [
      { label: "Devices", value: "4 unique devices" },
      { label: "Countries", value: "Nigeria, Ghana, UK" },
      { label: "Time span", value: "2 hours" },
      { label: "Current IP", value: "185.32.109.44" },
      { label: "Device", value: "Samsung Galaxy S24 — Chrome" },
      { label: "Location", value: "London, UK" },
    ],
    timeline: [
      { action: "Login from London, UK (new device)", time: "2:30 PM", actor: "Chidinma Obi" },
      { action: "Login from Accra, Ghana (new device)", time: "1:45 PM", actor: "Chidinma Obi" },
      { action: "Login from Lagos, NG (new device)", time: "1:02 PM", actor: "Chidinma Obi" },
      { action: "Login from Lagos, NG (known device)", time: "12:30 PM", actor: "Chidinma Obi" },
    ],
  },
  {
    id: "CA-003", userName: "Ibrahim Abubakar", email: "ibrahim.abu@gmail.com", severity: "high",
    trigger: "Large Withdrawal Spike", triggerType: "large-withdrawal",
    description: "Withdrew $8,500 in a single transaction — 340% above user's average.",
    date: "Mar 8, 2026, 11:15 AM", status: "pending", autoSuspended: false,
    details: [
      { label: "Withdrawal amount", value: "$8,500.00" },
      { label: "User avg withdrawal", value: "$1,930.00" },
      { label: "Deviation", value: "340% above average" },
      { label: "Destination", value: "External wallet — 0x3f...a9c2" },
      { label: "Device", value: "MacBook Pro — Chrome" },
      { label: "Location", value: "Abuja, Nigeria" },
    ],
    timeline: [
      { action: "Withdrawal of $8,500 initiated", time: "11:15 AM", actor: "Ibrahim Abubakar" },
      { action: "Large amount flag triggered", time: "11:15 AM", actor: "System" },
      { action: "Previous withdrawal: $1,200", time: "Mar 6, 3:00 PM", actor: "Ibrahim Abubakar" },
    ],
  },
  {
    id: "CA-004", userName: "Lucky Holland", email: "hollandlucky09@gmail.com", severity: "medium",
    trigger: "Failed KYC Attempts", triggerType: "failed-kyc",
    description: "5 failed KYC Level 2 verification attempts in 24 hours with different documents.",
    date: "Mar 7, 2026, 8:20 PM", status: "pending", autoSuspended: false,
    details: [
      { label: "Failed attempts", value: "5 in 24 hours" },
      { label: "Documents used", value: "3 different IDs" },
      { label: "Current KYC", value: "Level 1" },
      { label: "IP Address", value: "197.210.55.12" },
      { label: "Device", value: "Tecno Spark 10 — Chrome" },
      { label: "Location", value: "Port Harcourt, Nigeria" },
    ],
    timeline: [
      { action: "5th KYC attempt failed — flag raised", time: "8:20 PM", actor: "System" },
      { action: "4th attempt — different NIN submitted", time: "7:55 PM", actor: "Lucky Holland" },
      { action: "3rd attempt — new document uploaded", time: "6:30 PM", actor: "Lucky Holland" },
      { action: "1st KYC attempt failed", time: "2:15 PM", actor: "Lucky Holland" },
    ],
  },
  {
    id: "CA-005", userName: "Efeme Jeremiah", email: "ejaifeefemegreat@gmail.com", severity: "critical",
    trigger: "Rapid Deposit-Withdraw Cycle", triggerType: "wash-trading",
    description: "6 deposit-withdraw cycles in 30 minutes totaling $15,200. Possible wash trading.",
    date: "Mar 7, 2026, 3:45 PM", status: "resolved", autoSuspended: true,
    details: [
      { label: "Cycles detected", value: "6 in 30 min" },
      { label: "Total volume", value: "$15,200.00" },
      { label: "Net movement", value: "$23.50 (negligible)" },
      { label: "Assets involved", value: "USDT, BTC" },
      { label: "Device", value: "Desktop — Firefox" },
      { label: "Location", value: "Benin City, Nigeria" },
    ],
    timeline: [
      { action: "Account suspended — wash trading confirmed", time: "4:00 PM", actor: "Adedamola A." },
      { action: "6th cycle completed — auto-suspension triggered", time: "3:45 PM", actor: "System" },
      { action: "Pattern detected: deposit-withdraw loop", time: "3:30 PM", actor: "System" },
      { action: "First deposit in cycle", time: "3:15 PM", actor: "Efeme Jeremiah" },
    ],
  },
  {
    id: "CA-006", userName: "Fortune Chigor", email: "chigorfortune25@gmail.com", severity: "low",
    trigger: "Multiple Device Logins", triggerType: "multi-device",
    description: "Logged in from 2 new devices in Lagos within 1 hour. Likely personal devices.",
    date: "Mar 6, 2026, 9:00 AM", status: "dismissed", autoSuspended: false,
    details: [
      { label: "Devices", value: "2 new devices" },
      { label: "Location", value: "Lagos, Nigeria (same city)" },
      { label: "Time span", value: "1 hour" },
      { label: "IP Address", value: "102.89.33.78" },
      { label: "Device", value: "iPhone 14 — Safari" },
      { label: "Previous devices", value: "1 registered" },
    ],
    timeline: [
      { action: "Dismissed — same-city devices", time: "10:00 AM", actor: "Dawood K." },
      { action: "Login from new iPhone", time: "9:45 AM", actor: "Fortune Chigor" },
      { action: "Login from new iPad", time: "9:00 AM", actor: "Fortune Chigor" },
    ],
  },
];

export type ComplianceRule = {
  id: string;
  name: string;
  trigger: string;
  threshold: string;
  action: string;
  enabled: boolean;
  lastTriggered: string;
  triggeredCount: number;
};

export const defaultComplianceRules: ComplianceRule[] = [
  { id: "R1", name: "High-Frequency Trading", trigger: "Trades exceeding threshold in time window", threshold: "10 trades / 5 minutes", action: "Auto-suspend + Alert", enabled: true, lastTriggered: "Mar 8, 2026", triggeredCount: 3 },
  { id: "R2", name: "Multi-Device Login", trigger: "Logins from multiple devices/locations", threshold: "3+ devices / 2 hours", action: "Alert only", enabled: true, lastTriggered: "Mar 8, 2026", triggeredCount: 7 },
  { id: "R3", name: "Large Withdrawal Spike", trigger: "Withdrawal exceeds % above user average", threshold: "200% above average", action: "Hold + Alert", enabled: true, lastTriggered: "Mar 8, 2026", triggeredCount: 2 },
  { id: "R4", name: "Failed KYC Attempts", trigger: "Multiple failed verifications in time window", threshold: "3 failures / 24 hours", action: "Alert only", enabled: true, lastTriggered: "Mar 7, 2026", triggeredCount: 4 },
  { id: "R5", name: "Wash Trading Detection", trigger: "Rapid deposit-withdraw cycles with negligible net", threshold: "3 cycles / 1 hour", action: "Auto-suspend + Alert", enabled: true, lastTriggered: "Mar 7, 2026", triggeredCount: 1 },
  { id: "R6", name: "Geo-Velocity Check", trigger: "Login from impossible travel distance", threshold: ">500km / 1 hour", action: "Auto-suspend + Alert", enabled: false, lastTriggered: "Never", triggeredCount: 0 },
  { id: "R7", name: "Dormant Account Activity", trigger: "Large transaction on inactive account", threshold: "90+ days inactive, >$500 tx", action: "Alert only", enabled: false, lastTriggered: "Never", triggeredCount: 0 },
];

// Audit Log
export const auditLogData = [
  { admin: "Adedamola A.", action: "Approved KYC", target: "Chibueze Umeh", details: "Level 3 verification", date: "Mar 8, 2026, 8:03 AM" },
  { admin: "Adedamola A.", action: "Changed Rate", target: "BTC/NGN", details: "₦97,200,000 → ₦97,450,000", date: "Mar 8, 2026, 7:45 AM" },
  { admin: "Dawood K.", action: "Triggered Payout", target: "Divine Omajuwa", details: "500.05 USDT → ₦767,576.75", date: "Mar 8, 2026, 5:23 PM" },
  { admin: "Dawood K.", action: "Rejected KYC", target: "Idris Abdullahi", details: "Inconsistent documents", date: "Feb 20, 2026, 12:20 PM" },
  { admin: "System", action: "Auto Swap", target: "Platform", details: "0.000744 BTC → USDT", date: "Mar 8, 2026, 4:17 PM" },
  { admin: "Adedamola A.", action: "Updated Fee", target: "Withdrawal Fee", details: "₦25 → ₦50", date: "Mar 7, 2026, 9:30 AM" },
  { admin: "System", action: "Failed Payout", target: "Victor Odigili", details: "Insufficient balance", date: "Mar 6, 2026, 3:12 PM" },
  { admin: "Dawood K.", action: "Added Staff", target: "Payroll", details: "Ikegbulam Ugochukwu - Backend Developer", date: "Jan 23, 2026, 11:45 AM" },
];

// Virtual Cards
export const virtualCardsData = [
  { user: "John Doe", label: "Shopping Card", last4: "4291", balance: "$245.80", status: "ACTIVE", dailyLimit: "$500", created: "Feb 15, 2026" },
  { user: "John Doe", label: "Subscriptions", last4: "8173", balance: "$52.10", status: "FROZEN", dailyLimit: "$200", created: "Jan 20, 2026" },
  { user: "Adewale Musa", label: "Main Card", last4: "6502", balance: "$1,200.00", status: "ACTIVE", dailyLimit: "$1,000", created: "Mar 1, 2026" },
  { user: "Chidinma Obi", label: "Travel", last4: "3817", balance: "$89.50", status: "ACTIVE", dailyLimit: "$500", created: "Feb 28, 2026" },
  { user: "Divine Omajuwa", label: "Business", last4: "9244", balance: "$3,450.00", status: "ACTIVE", dailyLimit: "$2,000", created: "Jan 15, 2026" },
];

// User Detail
export const mockUser = {
  name: "Divine Omajuwa",
  initials: "DO",
  email: "divineomajuwa@gmail.com",
  phone: "08104103948",
  firstName: "Divine",
  lastName: "Omajuwa",
  customerType: "Trader(50k-100k)",
  referralLink: "https://www.deexoptions.com?r=ogbankomi",
  linkedAccounts: [
    { bank: "Access Bank", accountName: "DIVINE OGBANKOMI OMAJUWA", accountNumber: "0800538398" },
  ],
  deexTag: "@ogbankomi",
  birthday: "—",
  lastLogin: "—",
  customerId: "646c6a9f5437a4131ffcf130",
  totalPayout: "₦198,992,162.357",
  totalReferrals: 10,
  pointsEarned: 0,
  totalCommission: "—",
  autoPay: true,
  autoWithdrawal: true,
};

export const userTransactions = [
  { asset: "ETH", type: "Deex-Deposits", amount: "0.041 ETH", txId: "69addc03d54ca8190d9d122f", date: "Mar 8th, 2026 | 9:28 PM", status: "COMPLETED" },
  { asset: "USDT", type: "Deex-Deposits", amount: "200.00 USDT", txId: "69adc991210aef2d6390a7f2", date: "Mar 8th, 2026 | 8:10 PM", status: "COMPLETED" },
  { asset: "USDT", type: "Deex-Deposits", amount: "497.769 USDT", txId: "69adc856210aef2d63908822", date: "Mar 8th, 2026 | 8:04 PM", status: "COMPLETED" },
  { asset: "BTC", type: "Deex-Asset-Swaps", amount: "0.000824\nBTC → USDT", txId: "69adbfce210aef2d638f8ddb", date: "Mar 8th, 2026 | 7:28 PM", status: "COMPLETED" },
  { asset: "BTC", type: "Deex-Deposits", amount: "0.000824 BTC", txId: "69adbfb6210aef2d638f7488", date: "Mar 8th, 2026 | 7:28 PM", status: "COMPLETED" },
  { asset: "USDT", type: "Deex-Deposits", amount: "500.05 USDT", txId: "69ada29b210aef2d638c0177", date: "Mar 8th, 2026 | 5:23 PM", status: "COMPLETED" },
  { asset: "BTC", type: "Deex-Asset-Swaps", amount: "0.000744\nBTC → USDT", txId: "69ad930c210aef2d638af259", date: "Mar 8th, 2026 | 4:17 PM", status: "COMPLETED" },
  { asset: "BTC", type: "Deex-Deposits", amount: "0.000744 BTC", txId: "69ad929f210aef2d638ad6f1", date: "Mar 8th, 2026 | 4:15 PM", status: "COMPLETED" },
];

export const userActivities = [
  { type: "Login", desc: "Logged in from iOS device (iPhone 15 Pro)", time: "Today 8:12 PM", ip: "102.89.47.12", category: "auth" },
  { type: "Deposit", desc: "Deposited 0.041 ETH to wallet", time: "Today 9:28 PM", ip: "102.89.47.12", category: "wallet" },
  { type: "Swap", desc: "Swapped 0.000824 BTC → 79.29 USDT", time: "Today 7:28 PM", ip: "102.89.47.12", category: "trade" },
  { type: "Deposit", desc: "Deposited 200.00 USDT to wallet", time: "Today 8:10 PM", ip: "102.89.47.12", category: "wallet" },
  { type: "KYC", desc: "Submitted KYC Level 3 documents for review", time: "Feb 25th, 2026 | 3:14 PM", ip: "102.89.47.12", category: "kyc" },
  { type: "Security", desc: "Changed account password", time: "Feb 20th, 2026 | 1:02 PM", ip: "102.89.47.12", category: "security" },
  { type: "Bank", desc: "Linked bank account: Access Bank - 0800538398", time: "Jul 3rd, 2024 | 10:22 AM", ip: "41.190.2.45", category: "settings" },
  { type: "Login", desc: "Logged in from Android device (Samsung S24)", time: "Today 7:25 PM", ip: "41.190.2.45", category: "auth" },
  { type: "Withdrawal", desc: "Withdrew ₦150,000 to Access Bank - 0800538398", time: "Mar 5th, 2026 | 2:45 PM", ip: "102.89.47.12", category: "wallet" },
  { type: "Referral", desc: "Referred user ozegbeandrew@gmail.com — earned 300 pts", time: "Aug 13th, 2025 | 5:18 PM", ip: "102.89.47.12", category: "referral" },
  { type: "Profile", desc: "Updated DeeX tag to @ogbankomi", time: "Jul 1st, 2024 | 4:00 AM", ip: "41.190.2.45", category: "settings" },
  { type: "Reward", desc: "Redeemed 500 DeeXpoints for ₦5,000", time: "Mar 6th, 2026 | 11:30 AM", ip: "102.89.47.12", category: "reward" },
];

export const activityCategoryColors: Record<string, string> = {
  auth: "bg-[hsl(var(--deex-blue))]/20 text-[hsl(var(--deex-blue))]",
  wallet: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]",
  trade: "bg-[hsl(var(--deex-orange))]/20 text-[hsl(var(--deex-orange))]",
  kyc: "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]",
  security: "bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))]",
  settings: "bg-muted text-muted-foreground",
  referral: "bg-[hsl(var(--deex-teal))]/20 text-[hsl(var(--deex-teal))]",
  reward: "bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))]",
};

export const userRewards = [
  { date: "Aug 13th, 2025 | 2:07 AM", activity: "Points awarded", description: "Referral bonus — ozegbeandrew@gmail.com signed up", amount: 300 },
  { date: "Aug 29th, 2025 | 6:26 AM", activity: "Points awarded", description: "Referral bonus — abm65858@gmail.com signed up", amount: 300 },
  { date: "Sep 2nd, 2025 | 11:14 AM", activity: "Points awarded", description: "Trade streak reward — 7-day consecutive trading", amount: 300 },
  { date: "Sep 14th, 2025 | 11:13 AM", activity: "Points awarded", description: "Weekly cashback — ₦10,000 target met", amount: 300 },
  { date: "Sep 22nd, 2025 | 2:29 PM", activity: "Points awarded", description: "First deposit bonus — deposited 500 USDT", amount: 300 },
  { date: "Sep 24th, 2025 | 3:51 PM", activity: "Points awarded", description: "KYC Level 3 completion bonus", amount: 300 },
  { date: "Oct 2nd, 2025 | 12:22 AM", activity: "Points awarded", description: "Referral trade bonus — markkmnn2@gmail.com completed first trade", amount: 300 },
];

export const userTasks = [
  { task: "Complete KYC Level 3", status: "Completed", date: "Feb 25th, 2026" },
  { task: "First Deposit", status: "Completed", date: "Jan 10th, 2026" },
  { task: "Verify Email", status: "Completed", date: "Jul 1st, 2024" },
  { task: "Enable 2FA", status: "Pending", date: "—" },
  { task: "Add Bank Account", status: "Completed", date: "Jul 3rd, 2024" },
];

export const userReferrals = [
  { date: "Jul 1st, 2024 | 3:56 AM", email: "paursgenius@gmail.com", pointsEarned: 300, status: "Active" },
  { date: "Jun 19th, 2024 | 11:55 PM", email: "benjaminchibuike002@mail.com", pointsEarned: 300, status: "Active" },
  { date: "Jun 20th, 2024 | 10:24 PM", email: "sundaykenzo@gmail.com", pointsEarned: 0, status: "Signed up" },
  { date: "Jul 2nd, 2024 | 6:39 PM", email: "markkmnn2@gmail.com", pointsEarned: 600, status: "Active" },
  { date: "Jul 5th, 2024 | 9:00 PM", email: "generalpaul954@gmail.com", pointsEarned: 0, status: "Inactive" },
  { date: "Aug 13th, 2025 | 5:18 PM", email: "ozegbeandrew@gmail.com", pointsEarned: 300, status: "Active" },
  { date: "Aug 20th, 2025 | 7:18 PM", email: "abm65858@gmail.com", pointsEarned: 300, status: "Active" },
];

export const kycLevel1 = {
  personal: {
    email: "divineomajuwa@gmail.com",
    emailVerification: "Confirmed",
    firstName: "Divine",
    lastName: "Omajuwa",
    deexTag: "@ogbankomi",
    birthday: "—",
    phone: "08104103948",
    bankName: "Access Bank",
    accountName: "DIVINE OGBANKOMI OMAJUWA",
    accountNumber: "0800538398",
    customerId: "646c6a9f5437a4131ffcf130",
    lastLogin: "—",
  },
  nextOfKin: {
    email: "—",
    fullName: "—",
    relationship: "—",
    phone: "—",
    address: "—",
    referId: "—",
  },
  ipDevice: {
    device: "IOS",
    ip: "—",
  },
};

export const kycLevel3 = {
  type: "Driver's License",
  status: "Approved",
  country: "Nigeria",
  address: "19b, Cbn Choos Estate Mtn Mast.",
};

export const holdingBalance = [
  { symbol: "BTC", amount: "0.002481 BTC", usd: "$167.12" },
  { symbol: "ETH", amount: "0.041 ETH", usd: "$79.29" },
  { symbol: "USDT", amount: "1,247.819 USDT", usd: "$1,247.82" },
  { symbol: "SOL", amount: "0.000 SOL", usd: "$0.00" },
  { symbol: "DOGE", amount: "0.000 DOGE", usd: "$0.00" },
];

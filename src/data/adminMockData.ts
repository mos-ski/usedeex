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
  { type: "Debit", partner: "Hizo", sub: "Payout", amount: "-45.474 BTC", ngn: "63,436.65", txId: "69adba40210aef2d638ebe72", status: "COMPLETED", date: "Mar 8th, 2026, 7:04 PM", balanceBefore: "$23,560.07", balanceAfter: "$23,496.60" },
  { type: "Credit", partner: "Obiex", sub: "Deposit", amount: "+0.000680 BTC", ngn: "—", txId: "69adb83210aef2d638e9c3c", status: "COMPLETED", date: "Mar 8th, 2026, 6:56 PM", balanceBefore: "$23,514.17", balanceAfter: "$23,560.07" },
  { type: "Credit", partner: "Obiex", sub: "Deposit", amount: "+500.05 USDT", ngn: "—", txId: "69ada29b210aef2d638c0177", status: "COMPLETED", date: "Mar 8th, 2026, 5:23 PM", balanceBefore: "$23,014.12", balanceAfter: "$23,514.17" },
  { type: "Debit", partner: "Hizo", sub: "Payout", amount: "-24.00 USDT", ngn: "33,480.00", txId: "69ad9d78210aef2d638bab7e", status: "COMPLETED", date: "Mar 8th, 2026, 5:02 PM", balanceBefore: "$23,038.12", balanceAfter: "$23,014.12" },
  { type: "Credit", partner: "Obiex", sub: "Deposit", amount: "+24.00 USDT", ngn: "—", txId: "69ad9d5c210aef2d638baa46", status: "COMPLETED", date: "Mar 8th, 2026, 5:01 PM", balanceBefore: "$23,014.12", balanceAfter: "$23,038.12" },
  { type: "Credit", partner: "Obiex", sub: "Autoswap", amount: "+0.000744 BTC", ngn: "—", txId: "69ad930c210aef2d638af259", status: "COMPLETED", date: "Mar 8th, 2026, 4:17 PM", balanceBefore: "$22,964.04", balanceAfter: "$23,014.12" },
  { type: "Credit", partner: "Obiex", sub: "Deposit", amount: "+0.000744 BTC", ngn: "—", txId: "69ad929f210aef2d638ad6f1", status: "COMPLETED", date: "Mar 8th, 2026, 4:15 PM", balanceBefore: "$22,913.96", balanceAfter: "$22,964.04" },
  { type: "Debit", partner: "Hizo", sub: "Payout", amount: "-50.00 USDT", ngn: "69,750.00", txId: "69ad8fbc210aef2d638a866c", status: "COMPLETED", date: "Mar 8th, 2026, 4:03 PM", balanceBefore: "$22,963.96", balanceAfter: "$22,913.96" },
  { type: "Credit", partner: "Obiex", sub: "Deposit", amount: "+120.00 USDT", ngn: "—", txId: "69ad7fbc210aef2d638a766c", status: "COMPLETED", date: "Mar 8th, 2026, 3:45 PM", balanceBefore: "$22,843.96", balanceAfter: "$22,963.96" },
  { type: "Debit", partner: "Palmpay", sub: "Payout", amount: "-75.00 USDT", ngn: "104,625.00", txId: "69ad6fbc210aef2d638a666c", status: "COMPLETED", date: "Mar 8th, 2026, 3:30 PM", balanceBefore: "$22,918.96", balanceAfter: "$22,843.96" },
  { type: "Credit", partner: "Obiex", sub: "Deposit", amount: "+0.0015 BTC", ngn: "—", txId: "69ad5fbc210aef2d638a566c", status: "COMPLETED", date: "Mar 8th, 2026, 2:15 PM", balanceBefore: "$22,817.96", balanceAfter: "$22,918.96" },
  { type: "Debit", partner: "Hizo", sub: "Payout", amount: "-200.00 USDT", ngn: "279,000.00", txId: "69ad4fbc210aef2d638a466c", status: "PENDING", date: "Mar 8th, 2026, 1:45 PM", balanceBefore: "$23,017.96", balanceAfter: "$22,817.96" },
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
  { name: "Aisha Mohammed", asset: "USDT", type: "DEEX-DEPOSITS", amount: "85.00 USDT", txId: "69acd23210aef2d63829c3c", date: "Mar 6th, 2026, 8:15 PM", status: "COMPLETED", walletAddress: "TXkR...k9T", confirmations: 14, payoutRef: "PAY-011" },
  { name: "Emeka Nwankwo", asset: "BTC", type: "DEEX-DEPOSITS", amount: "0.0032 BTC", txId: "69acc23210aef2d63819c3c", date: "Mar 6th, 2026, 6:00 PM", status: "COMPLETED", walletAddress: "bc1q...r5v", confirmations: 8, payoutRef: "PAY-012" },
  { name: "Tunde Bakare", asset: "USDT", type: "DEEX-DEPOSITS", amount: "1,500.00 USDT", txId: "69acb23210aef2d63809c3c", date: "Mar 6th, 2026, 4:30 PM", status: "FAILED", walletAddress: "TXkR...z3W", confirmations: 0, payoutRef: "—" },
  { name: "Blessing Okoro", asset: "ETH", type: "DEEX-DEPOSITS", amount: "0.25 ETH", txId: "69aca23210aef2d637f9c3c", date: "Mar 6th, 2026, 2:00 PM", status: "COMPLETED", walletAddress: "0x5c...b8e3", confirmations: 30, payoutRef: "PAY-013" },
  { name: "Yusuf Bello", asset: "USDT", type: "DEEX-DEPOSITS", amount: "200.00 USDT", txId: "69ac923210aef2d637e9c3c", date: "Mar 6th, 2026, 11:45 AM", status: "COMPLETED", walletAddress: "TXkR...f2N", confirmations: 16, payoutRef: "PAY-014" },
  { name: "Chinedu Eze", asset: "BTC", type: "DEEX-DEPOSITS", amount: "0.0015 BTC", txId: "69ac823210aef2d637d9c3c", date: "Mar 6th, 2026, 9:30 AM", status: "PENDING", walletAddress: "bc1q...t7m", confirmations: 1, payoutRef: "—" },
  { name: "Ngozi Okafor", asset: "USDT", type: "DEEX-DEPOSITS", amount: "45.00 USDT", txId: "69ac723210aef2d637c9c3c", date: "Mar 5th, 2026, 10:00 PM", status: "COMPLETED", walletAddress: "TXkR...h4P", confirmations: 22, payoutRef: "PAY-015" },
  { name: "Samuel Adeyemi", asset: "SOL", type: "DEEX-DEPOSITS", amount: "5.0 SOL", txId: "69ac623210aef2d637b9c3c", date: "Mar 5th, 2026, 8:15 PM", status: "COMPLETED", walletAddress: "7Kx2...dR9", confirmations: 40, payoutRef: "PAY-016" },
  { name: "Oluwaseun Daramola", asset: "USDT", type: "DEEX-DEPOSITS", amount: "350.00 USDT", txId: "69ac523210aef2d637a9c3c", date: "Mar 5th, 2026, 6:00 PM", status: "COMPLETED", walletAddress: "TXkR...u6S", confirmations: 18, payoutRef: "PAY-017" },
  { name: "Kelechi Amadi", asset: "BTC", type: "DEEX-DEPOSITS", amount: "0.008 BTC", txId: "69ac423210aef2d63799c3c", date: "Mar 5th, 2026, 4:30 PM", status: "FAILED", walletAddress: "bc1q...w2x", confirmations: 0, payoutRef: "—" },
  { name: "Ruth Adeola", asset: "USDT", type: "DEEX-DEPOSITS", amount: "120.00 USDT", txId: "69ac323210aef2d63789c3c", date: "Mar 5th, 2026, 2:15 PM", status: "COMPLETED", walletAddress: "TXkR...j8V", confirmations: 12, payoutRef: "PAY-018" },
  { name: "Ibrahim Abubakar", asset: "BTC", type: "DEEX-DEPOSITS", amount: "0.012 BTC", txId: "69ac223210aef2d63779c3c", date: "Mar 5th, 2026, 12:00 PM", status: "COMPLETED", walletAddress: "bc1q...q4y", confirmations: 6, payoutRef: "PAY-019" },
  { name: "Precious Igwe", asset: "USDT", type: "DEEX-DEPOSITS", amount: "600.00 USDT", txId: "69ac123210aef2d63769c3c", date: "Mar 5th, 2026, 9:45 AM", status: "COMPLETED", walletAddress: "TXkR...b1Z", confirmations: 25, payoutRef: "PAY-020" },
  { name: "Abdullahi Sani", asset: "ETH", type: "DEEX-DEPOSITS", amount: "0.5 ETH", txId: "69ac023210aef2d63759c3c", date: "Mar 4th, 2026, 11:30 PM", status: "COMPLETED", walletAddress: "0x9a...d2f5", confirmations: 28, payoutRef: "PAY-021" },
  { name: "Chidinma Obi", asset: "USDT", type: "DEEX-DEPOSITS", amount: "90.00 USDT", txId: "69abf23210aef2d63749c3c", date: "Mar 4th, 2026, 9:00 PM", status: "PENDING", walletAddress: "TXkR...n7A", confirmations: 3, payoutRef: "—" },
  { name: "Olu Fashola", asset: "BTC", type: "DEEX-DEPOSITS", amount: "0.004 BTC", txId: "69abe23210aef2d63739c3c", date: "Mar 4th, 2026, 7:15 PM", status: "COMPLETED", walletAddress: "bc1q...g3B", confirmations: 10, payoutRef: "PAY-022" },
  { name: "Hauwa Garba", asset: "USDT", type: "DEEX-DEPOSITS", amount: "250.00 USDT", txId: "69abd23210aef2d63729c3c", date: "Mar 4th, 2026, 5:00 PM", status: "COMPLETED", walletAddress: "TXkR...c8C", confirmations: 19, payoutRef: "PAY-023" },
  { name: "Femi Ogundimu", asset: "USDT", type: "DEEX-DEPOSITS", amount: "180.00 USDT", txId: "69abc23210aef2d63719c3c", date: "Mar 4th, 2026, 3:30 PM", status: "FAILED", walletAddress: "TXkR...e4D", confirmations: 0, payoutRef: "—" },
  { name: "Ada Okonkwo", asset: "BTC", type: "DEEX-DEPOSITS", amount: "0.002 BTC", txId: "69abb23210aef2d63709c3c", date: "Mar 4th, 2026, 1:00 PM", status: "COMPLETED", walletAddress: "bc1q...f9E", confirmations: 7, payoutRef: "PAY-024" },
  { name: "Musa Danjuma", asset: "SOL", type: "DEEX-DEPOSITS", amount: "1.8 SOL", txId: "69aba23210aef2d636f9c3c", date: "Mar 4th, 2026, 10:30 AM", status: "COMPLETED", walletAddress: "3Vn8...hF6", confirmations: 35, payoutRef: "PAY-025" },
  { name: "Segun Afolabi", asset: "USDT", type: "DEEX-DEPOSITS", amount: "400.00 USDT", txId: "69ab923210aef2d636e9c3c", date: "Mar 3rd, 2026, 11:00 PM", status: "COMPLETED", walletAddress: "TXkR...i2G", confirmations: 21, payoutRef: "PAY-026" },
  { name: "Joy Uchenna", asset: "ETH", type: "DEEX-DEPOSITS", amount: "0.12 ETH", txId: "69ab823210aef2d636d9c3c", date: "Mar 3rd, 2026, 9:15 PM", status: "COMPLETED", walletAddress: "0x2d...a7H", confirmations: 16, payoutRef: "PAY-027" },
  { name: "Tayo Olowu", asset: "USDT", type: "DEEX-DEPOSITS", amount: "65.00 USDT", txId: "69ab723210aef2d636c9c3c", date: "Mar 3rd, 2026, 7:00 PM", status: "PENDING", walletAddress: "TXkR...k5J", confirmations: 1, payoutRef: "—" },
  { name: "Aminu Yusuf", asset: "BTC", type: "DEEX-DEPOSITS", amount: "0.006 BTC", txId: "69ab623210aef2d636b9c3c", date: "Mar 3rd, 2026, 5:30 PM", status: "COMPLETED", walletAddress: "bc1q...m1K", confirmations: 9, payoutRef: "PAY-028" },
  { name: "Folake Adeniyi", asset: "USDT", type: "DEEX-DEPOSITS", amount: "800.00 USDT", txId: "69ab523210aef2d636a9c3c", date: "Mar 3rd, 2026, 3:00 PM", status: "COMPLETED", walletAddress: "TXkR...p7L", confirmations: 23, payoutRef: "PAY-029" },
  { name: "Chidi Nwoye", asset: "BTC", type: "DEEX-DEPOSITS", amount: "0.0025 BTC", txId: "69ab423210aef2d63699c3c", date: "Mar 3rd, 2026, 1:15 PM", status: "FAILED", walletAddress: "bc1q...r3M", confirmations: 0, payoutRef: "—" },
  { name: "Zainab Abdullahi", asset: "USDT", type: "DEEX-DEPOSITS", amount: "110.00 USDT", txId: "69ab323210aef2d63689c3c", date: "Mar 3rd, 2026, 11:00 AM", status: "COMPLETED", walletAddress: "TXkR...s9N", confirmations: 17, payoutRef: "PAY-030" },
  { name: "Divine Omajuwa", asset: "USDT", type: "DEEX-DEPOSITS", amount: "750.00 USDT", txId: "69ab223210aef2d63679c3c", date: "Mar 2nd, 2026, 10:00 PM", status: "COMPLETED", walletAddress: "TXkR...t5P", confirmations: 20, payoutRef: "PAY-031" },
  { name: "Emeka Uche", asset: "ETH", type: "DEEX-DEPOSITS", amount: "0.3 ETH", txId: "69ab123210aef2d63669c3c", date: "Mar 2nd, 2026, 8:30 PM", status: "COMPLETED", walletAddress: "0x4e...v1Q", confirmations: 26, payoutRef: "PAY-032" },
  { name: "Bola Tinubu", asset: "USDT", type: "DEEX-DEPOSITS", amount: "55.00 USDT", txId: "69ab023210aef2d63659c3c", date: "Mar 2nd, 2026, 6:00 PM", status: "PENDING", walletAddress: "TXkR...w8R", confirmations: 2, payoutRef: "—" },
  { name: "Kenneth Okafor", asset: "BTC", type: "DEEX-DEPOSITS", amount: "0.009 BTC", txId: "69aaf23210aef2d63649c3c", date: "Mar 2nd, 2026, 4:15 PM", status: "COMPLETED", walletAddress: "bc1q...x4S", confirmations: 11, payoutRef: "PAY-033" },
  { name: "Mercy Edoho", asset: "USDT", type: "DEEX-DEPOSITS", amount: "320.00 USDT", txId: "69aae23210aef2d63639c3c", date: "Mar 2nd, 2026, 2:00 PM", status: "COMPLETED", walletAddress: "TXkR...y6T", confirmations: 15, payoutRef: "PAY-034" },
  { name: "Obinna Okeke", asset: "USDT", type: "DEEX-DEPOSITS", amount: "95.00 USDT", txId: "69aad23210aef2d63629c3c", date: "Mar 2nd, 2026, 11:30 AM", status: "FAILED", walletAddress: "TXkR...z2U", confirmations: 0, payoutRef: "—" },
  { name: "Peter Olamide", asset: "BTC", type: "DEEX-DEPOSITS", amount: "0.0018 BTC", txId: "69aac23210aef2d63619c3c", date: "Mar 1st, 2026, 9:45 PM", status: "COMPLETED", walletAddress: "bc1q...a8V", confirmations: 5, payoutRef: "PAY-035" },
];

export const payoutsList = [
  { name: "Oluwaseun Daramola", amount: "₦63,436.65", bank: "Access Bank - 0800538398", orderRef: "69adb83210aef2d638e9c3c", date: "Mar 8th, 2026, 7:04 PM", status: "COMPLETED" },
  { name: "Divine Omajuwa", amount: "₦767,576.75", bank: "Access Bank - 0800538398", orderRef: "69ada29b210aef2d638c0177", date: "Mar 8th, 2026, 5:23 PM", status: "COMPLETED" },
  { name: "Victor Odigili", amount: "₦33,480.00", bank: "GTBank - 0123456789", orderRef: "69ad9d5c210aef2d638baa46", date: "Mar 8th, 2026, 5:01 PM", status: "PENDING" },
  { name: "Ibrahim Abubakar", amount: "₦1,674,000.00", bank: "First Bank - 3087654321", orderRef: "69ad823210aef2d638d9c3c", date: "Mar 8th, 2026, 3:42 PM", status: "COMPLETED" },
  { name: "Chidinma Obi", amount: "₦290,580.00", bank: "Zenith Bank - 2045678901", orderRef: "69ad723210aef2d638c9c3c", date: "Mar 8th, 2026, 2:30 PM", status: "COMPLETED" },
  { name: "Adewale Musa", amount: "₦456,750.00", bank: "UBA - 1098765432", orderRef: "69ad623210aef2d638b9c3c", date: "Mar 8th, 2026, 1:15 PM", status: "COMPLETED" },
  { name: "Fortune Chigor", amount: "₦69,750.00", bank: "UBA - 2109876543", orderRef: "69ad523210aef2d638a9c3c", date: "Mar 7th, 2026, 11:45 PM", status: "FAILED" },
  { name: "Lucky Holland", amount: "₦418,500.00", bank: "Kuda - 3012345678", orderRef: "69ad423210aef2d63899c3c", date: "Mar 7th, 2026, 10:20 PM", status: "COMPLETED" },
  { name: "Quincy James", amount: "₦385,000.00", bank: "Palmpay - 9087654321", orderRef: "69ad223210aef2d63879c3c", date: "Mar 7th, 2026, 6:30 PM", status: "COMPLETED" },
  { name: "Fatima Kabiru", amount: "₦154,880.00", bank: "FCMB - 7065432109", orderRef: "69ad023210aef2d63859c3c", date: "Mar 7th, 2026, 2:45 PM", status: "COMPLETED" },
  { name: "David Enyowhara", amount: "₦209,250.00", bank: "Sterling Bank - 0198765432", orderRef: "69ace23210aef2d63839c3c", date: "Mar 6th, 2026, 10:30 PM", status: "COMPLETED" },
  { name: "Aisha Mohammed", amount: "₦118,575.00", bank: "Wema Bank - 5034567890", orderRef: "69acd23210aef2d63829c3c", date: "Mar 6th, 2026, 8:15 PM", status: "COMPLETED" },
  { name: "Emeka Nwankwo", amount: "₦292,416.00", bank: "Stanbic IBTC - 0087654321", orderRef: "69acc23210aef2d63819c3c", date: "Mar 6th, 2026, 6:00 PM", status: "COMPLETED" },
  { name: "Tunde Bakare", amount: "₦2,092,500.00", bank: "Access Bank - 0156789012", orderRef: "69acb23210aef2d63809c3c", date: "Mar 6th, 2026, 4:30 PM", status: "FAILED" },
  { name: "Blessing Okoro", amount: "₦484,250.00", bank: "GTBank - 0234567891", orderRef: "69aca23210aef2d637f9c3c", date: "Mar 6th, 2026, 2:00 PM", status: "COMPLETED" },
  { name: "Yusuf Bello", amount: "₦279,000.00", bank: "First Bank - 3076543210", orderRef: "69ac923210aef2d637e9c3c", date: "Mar 6th, 2026, 11:45 AM", status: "COMPLETED" },
  { name: "Chinedu Eze", amount: "₦137,025.00", bank: "Zenith Bank - 2056789012", orderRef: "69ac823210aef2d637d9c3c", date: "Mar 6th, 2026, 9:30 AM", status: "PENDING" },
  { name: "Ngozi Okafor", amount: "₦62,775.00", bank: "UBA - 1087654321", orderRef: "69ac723210aef2d637c9c3c", date: "Mar 5th, 2026, 10:00 PM", status: "COMPLETED" },
  { name: "Samuel Adeyemi", amount: "₦770,000.00", bank: "Kuda - 3023456789", orderRef: "69ac623210aef2d637b9c3c", date: "Mar 5th, 2026, 8:15 PM", status: "COMPLETED" },
  { name: "Oluwaseun Daramola", amount: "₦488,250.00", bank: "Access Bank - 0800538398", orderRef: "69ac523210aef2d637a9c3c", date: "Mar 5th, 2026, 6:00 PM", status: "COMPLETED" },
  { name: "Kelechi Amadi", amount: "₦731,200.00", bank: "Palmpay - 9076543210", orderRef: "69ac423210aef2d63799c3c", date: "Mar 5th, 2026, 4:30 PM", status: "FAILED" },
  { name: "Ruth Adeola", amount: "₦167,400.00", bank: "FCMB - 7054321098", orderRef: "69ac323210aef2d63789c3c", date: "Mar 5th, 2026, 2:15 PM", status: "COMPLETED" },
  { name: "Ibrahim Abubakar", amount: "₦1,097,280.00", bank: "First Bank - 3087654321", orderRef: "69ac223210aef2d63779c3c", date: "Mar 5th, 2026, 12:00 PM", status: "COMPLETED" },
  { name: "Precious Igwe", amount: "₦837,000.00", bank: "Sterling Bank - 0187654321", orderRef: "69ac123210aef2d63769c3c", date: "Mar 5th, 2026, 9:45 AM", status: "COMPLETED" },
  { name: "Abdullahi Sani", amount: "₦968,500.00", bank: "Wema Bank - 5023456789", orderRef: "69ac023210aef2d63759c3c", date: "Mar 4th, 2026, 11:30 PM", status: "COMPLETED" },
  { name: "Chidinma Obi", amount: "₦125,550.00", bank: "Zenith Bank - 2045678901", orderRef: "69abf23210aef2d63749c3c", date: "Mar 4th, 2026, 9:00 PM", status: "PENDING" },
  { name: "Olu Fashola", amount: "₦365,680.00", bank: "Stanbic IBTC - 0076543210", orderRef: "69abe23210aef2d63739c3c", date: "Mar 4th, 2026, 7:15 PM", status: "COMPLETED" },
  { name: "Hauwa Garba", amount: "₦348,750.00", bank: "Access Bank - 0167890123", orderRef: "69abd23210aef2d63729c3c", date: "Mar 4th, 2026, 5:00 PM", status: "COMPLETED" },
  { name: "Femi Ogundimu", amount: "₦251,100.00", bank: "GTBank - 0245678901", orderRef: "69abc23210aef2d63719c3c", date: "Mar 4th, 2026, 3:30 PM", status: "FAILED" },
  { name: "Ada Okonkwo", amount: "₦182,880.00", bank: "First Bank - 3065432109", orderRef: "69abb23210aef2d63709c3c", date: "Mar 4th, 2026, 1:00 PM", status: "COMPLETED" },
  { name: "Musa Danjuma", amount: "₦277,200.00", bank: "UBA - 1076543210", orderRef: "69aba23210aef2d636f9c3c", date: "Mar 4th, 2026, 10:30 AM", status: "COMPLETED" },
  { name: "Segun Afolabi", amount: "₦558,000.00", bank: "Kuda - 3034567890", orderRef: "69ab923210aef2d636e9c3c", date: "Mar 3rd, 2026, 11:00 PM", status: "COMPLETED" },
  { name: "Joy Uchenna", amount: "₦232,440.00", bank: "Palmpay - 9065432109", orderRef: "69ab823210aef2d636d9c3c", date: "Mar 3rd, 2026, 9:15 PM", status: "COMPLETED" },
  { name: "Tayo Olowu", amount: "₦90,675.00", bank: "FCMB - 7043210987", orderRef: "69ab723210aef2d636c9c3c", date: "Mar 3rd, 2026, 7:00 PM", status: "PENDING" },
  { name: "Aminu Yusuf", amount: "₦548,640.00", bank: "Sterling Bank - 0176543210", orderRef: "69ab623210aef2d636b9c3c", date: "Mar 3rd, 2026, 5:30 PM", status: "COMPLETED" },
  { name: "Folake Adeniyi", amount: "₦1,116,000.00", bank: "Wema Bank - 5012345678", orderRef: "69ab523210aef2d636a9c3c", date: "Mar 3rd, 2026, 3:00 PM", status: "COMPLETED" },
  { name: "Chidi Nwoye", amount: "₦228,625.00", bank: "Stanbic IBTC - 0065432109", orderRef: "69ab423210aef2d63699c3c", date: "Mar 3rd, 2026, 1:15 PM", status: "FAILED" },
  { name: "Zainab Abdullahi", amount: "₦153,450.00", bank: "Access Bank - 0178901234", orderRef: "69ab323210aef2d63689c3c", date: "Mar 3rd, 2026, 11:00 AM", status: "COMPLETED" },
  { name: "Divine Omajuwa", amount: "₦1,046,250.00", bank: "Access Bank - 0800538398", orderRef: "69ab223210aef2d63679c3c", date: "Mar 2nd, 2026, 10:00 PM", status: "COMPLETED" },
  { name: "Emeka Uche", amount: "₦581,100.00", bank: "GTBank - 0256789012", orderRef: "69ab123210aef2d63669c3c", date: "Mar 2nd, 2026, 8:30 PM", status: "COMPLETED" },
  { name: "Bola Tinubu", amount: "₦76,725.00", bank: "Zenith Bank - 2067890123", orderRef: "69ab023210aef2d63659c3c", date: "Mar 2nd, 2026, 6:00 PM", status: "PENDING" },
  { name: "Kenneth Okafor", amount: "₦822,960.00", bank: "First Bank - 3054321098", orderRef: "69aaf23210aef2d63649c3c", date: "Mar 2nd, 2026, 4:15 PM", status: "COMPLETED" },
  { name: "Mercy Edoho", amount: "₦446,400.00", bank: "UBA - 1065432109", orderRef: "69aae23210aef2d63639c3c", date: "Mar 2nd, 2026, 2:00 PM", status: "COMPLETED" },
  { name: "Obinna Okeke", amount: "₦132,525.00", bank: "Kuda - 3045678901", orderRef: "69aad23210aef2d63629c3c", date: "Mar 2nd, 2026, 11:30 AM", status: "FAILED" },
  { name: "Peter Olamide", amount: "₦164,556.00", bank: "Palmpay - 9054321098", orderRef: "69aac23210aef2d63619c3c", date: "Mar 1st, 2026, 9:45 PM", status: "COMPLETED" },
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

// KYC Levels Config
export const kycLevelsConfig = [
  {
    level: 1,
    title: "KYC 1",
    tradingLimit: "$1,000",
    withdrawalLimit: "$100",
    requirements: ["BVN submission", "Liveness check (selfie + motion)"],
    unlocks: ["Basic trading", "Low withdrawal access"],
  },
  {
    level: 2,
    title: "KYC 2",
    tradingLimit: "$10,000",
    withdrawalLimit: "$500",
    requirements: ["Valid government-issued ID (Passport / NIN / Driver's License)", "House address verification (utility bill / bank statement)"],
    unlocks: ["Higher sell limits", "Increased withdrawal limits"],
  },
  {
    level: 3,
    title: "KYC 3",
    tradingLimit: "$25,000",
    withdrawalLimit: "$1,000",
    requirements: ["Employment details or business documentation", "Source of income declaration", "Risk questionnaire", "Mandatory 2FA activation"],
    unlocks: ["Highest trading limits", "Highest withdrawal limits", "Priority processing"],
  },
];

// KYC
export const kycLogs = [
  { name: "CHIBUEZE UMEH", email: "chibuezeumeh903@gmail.com", level: "KYC 3", currentLevel: 3, status: "APPROVED", date: "Feb 25th, 2026, 8:03 AM", bvn: "22345678901", document: "Driver's License", twoFaEnabled: true, rejectionReason: "" },
  { name: "OSASENAGA ERHARUYI", email: "emmosa718@gmail.com", level: "KYC 3", currentLevel: 3, status: "APPROVED", date: "Feb 22nd, 2026, 7:42 AM", bvn: "22345678902", document: "Int'l Passport", twoFaEnabled: true, rejectionReason: "" },
  { name: "FRIDAY AZIAKPONO", email: "poundsfriday57@gmail.com", level: "KYC 3", currentLevel: 3, status: "APPROVED", date: "Feb 21st, 2026, 9:01 PM", bvn: "22345678903", document: "NIN Slip", twoFaEnabled: true, rejectionReason: "" },
  { name: "Idris Abdullahi", email: "idris53279@gmail.com", level: "KYC 2", currentLevel: 1, status: "REJECTED", date: "Feb 20th, 2026, 12:20 PM", bvn: "22345678904", document: "Voter's Card", twoFaEnabled: false, rejectionReason: "Document does not match BVN records" },
  { name: "Donatus Aideyan", email: "sundaydonatusa@gmail.com", level: "KYC 3", currentLevel: 3, status: "APPROVED", date: "Feb 19th, 2026, 7:56 PM", bvn: "22345678905", document: "Driver's License", twoFaEnabled: true, rejectionReason: "" },
  { name: "Quincy James", email: "jamesquincy3326@gmail.com", level: "KYC 3", currentLevel: 3, status: "APPROVED", date: "Feb 16th, 2026, 3:58 PM", bvn: "22345678906", document: "Int'l Passport", twoFaEnabled: true, rejectionReason: "" },
  { name: "David Enyowhara", email: "fionabecon57@gmail.com", level: "KYC 2", currentLevel: 1, status: "PENDING", date: "Feb 3rd, 2026, 12:09 AM", bvn: "22345678907", document: "NIN Slip", twoFaEnabled: false, rejectionReason: "" },
  { name: "Efeme Jeremiah", email: "ejaifeefemegreat@gmail.com", level: "KYC 2", currentLevel: 1, status: "PENDING", date: "Jan 31st, 2026, 12:45 AM", bvn: "22345678908", document: "Driver's License", twoFaEnabled: false, rejectionReason: "" },
  { name: "Fortune Chigor", email: "chigorfortune25@gmail.com", level: "KYC 2", currentLevel: 1, status: "PENDING", date: "Jan 28th, 2026, 2:28 PM", bvn: "22345678909", document: "Utility Bill", twoFaEnabled: false, rejectionReason: "" },
  { name: "Lucky Holland", email: "hollandlucky09@gmail.com", level: "KYC 2", currentLevel: 1, status: "PENDING", date: "Jan 28th, 2026, 2:25 PM", bvn: "22345678910", document: "NIN Slip", twoFaEnabled: false, rejectionReason: "" },
  { name: "Grace Nwosu", email: "grace.nwosu@gmail.com", level: "KYC 3", currentLevel: 2, status: "PENDING", date: "Mar 1st, 2026, 10:30 AM", bvn: "22345678911", document: "Employment Letter", twoFaEnabled: true, rejectionReason: "" },
  { name: "Fatima Kabiru", email: "fatima.kab@gmail.com", level: "KYC 3", currentLevel: 2, status: "PENDING", date: "Mar 3rd, 2026, 2:15 PM", bvn: "22345678912", document: "Business Registration", twoFaEnabled: false, rejectionReason: "" },
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
  { asset: "ETH", type: "Deex-Deposits", amount: "0.041 ETH", txId: "69addc03d54ca8190d9d122f", date: "Mar 8th, 2026 | 9:28 PM", status: "COMPLETED", channel: "wallet" as const, creditDebit: "credit" as const, balanceBefore: "$21,298.45", balanceAfter: "$21,375.22", network: "ERC20", walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" },
  { asset: "USDT", type: "Deex-Deposits", amount: "200.00 USDT", txId: "69adc991210aef2d6390a7f2", date: "Mar 8th, 2026 | 8:10 PM", status: "COMPLETED", channel: "wallet" as const, creditDebit: "credit" as const, balanceBefore: "$21,098.45", balanceAfter: "$21,298.45", network: "TRC20", walletAddress: "TJRabPrwbZy45sbavfcjinPJC18kjpRTv8" },
  { asset: "USDT", type: "Deex-Deposits", amount: "497.769 USDT", txId: "69adc856210aef2d63908822", date: "Mar 8th, 2026 | 8:04 PM", status: "COMPLETED", channel: "wallet" as const, creditDebit: "credit" as const, balanceBefore: "$20,600.68", balanceAfter: "$21,098.45", network: "ERC20", walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" },
  { asset: "BTC", type: "Deex-Asset-Swaps", amount: "0.000824\nBTC → USDT", txId: "69adbfce210aef2d638f8ddb", date: "Mar 8th, 2026 | 7:28 PM", status: "COMPLETED", channel: "wallet" as const, creditDebit: "debit" as const, balanceBefore: "$20,680.01", balanceAfter: "$20,600.68", network: "Bitcoin", walletAddress: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" },
  { asset: "BTC", type: "Deex-Deposits", amount: "0.000824 BTC", txId: "69adbfb6210aef2d638f7488", date: "Mar 8th, 2026 | 7:28 PM", status: "COMPLETED", channel: "wallet" as const, creditDebit: "credit" as const, balanceBefore: "$20,600.68", balanceAfter: "$20,680.01", network: "Bitcoin", walletAddress: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" },
  { asset: "USDT", type: "Sell", amount: "500.05 USDT", txId: "69ada29b210aef2d638c0177", date: "Mar 8th, 2026 | 5:23 PM", status: "COMPLETED", channel: "order" as const, creditDebit: "debit" as const, balanceBefore: "$21,100.73", balanceAfter: "$20,600.68", network: "TRC20", walletAddress: "TJRabPrwbZy45sbavfcjinPJC18kjpRTv8" },
  { asset: "BTC", type: "Deex-Asset-Swaps", amount: "0.000744\nBTC → USDT", txId: "69ad930c210aef2d638af259", date: "Mar 8th, 2026 | 4:17 PM", status: "COMPLETED", channel: "wallet" as const, creditDebit: "debit" as const, balanceBefore: "$21,155.89", balanceAfter: "$21,100.73", network: "Bitcoin", walletAddress: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" },
  { asset: "BTC", type: "Deex-Deposits", amount: "0.000744 BTC", txId: "69ad929f210aef2d638ad6f1", date: "Mar 8th, 2026 | 4:15 PM", status: "COMPLETED", channel: "wallet" as const, creditDebit: "credit" as const, balanceBefore: "$21,100.73", balanceAfter: "$21,155.89", network: "Bitcoin", walletAddress: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" },
  { asset: "USDT", type: "Sell", amount: "150.00 USDT", txId: "69ad82bc210aef2d638a166c", date: "Mar 7th, 2026 | 6:30 PM", status: "COMPLETED", channel: "order" as const, creditDebit: "debit" as const, balanceBefore: "$21,250.73", balanceAfter: "$21,100.73", network: "ERC20", walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" },
  { asset: "USDT", type: "Payout", amount: "₦209,250.00", txId: "69ad72bc210aef2d6389066c", date: "Mar 7th, 2026 | 6:32 PM", status: "COMPLETED", channel: "payout" as const, creditDebit: "debit" as const, balanceBefore: "₦209,250.00", balanceAfter: "₦0.00", network: "", walletAddress: "" },
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
  { symbol: "BTC", amount: "0.002481 BTC", usd: "$167.12", network: "Bitcoin", address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" },
  { symbol: "ETH", amount: "0.041 ETH", usd: "$79.29", network: "ERC20", address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" },
  { symbol: "USDT", amount: "847.819 USDT", usd: "$847.82", network: "ERC20", address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e" },
  { symbol: "USDT", amount: "400.000 USDT", usd: "$400.00", network: "TRC20", address: "TJRabPrwbZy45sbavfcjinPJC18kjpRTv8" },
  { symbol: "SOL", amount: "0.000 SOL", usd: "$0.00", network: "Solana", address: "DRpbCBMxVnDK7maPGv7USSemqPHsQbJVTVjmNGCNzkUW" },
  { symbol: "DOGE", amount: "0.000 DOGE", usd: "$0.00", network: "Dogecoin", address: "DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L" },
];

// Bill Payments
export const billPaymentStats = {
  totalTransactions: 1247,
  totalVolume: "₦18,456,320.00",
  successRate: "94.2%",
  failedCount: 72,
};

export const billPaymentsList = [
  { id: "BP-001", user: "Divine Omajuwa", type: "Airtime", provider: "MTN", amount: "₦2,000.00", phone: "08104103948", status: "COMPLETED", date: "Mar 8th, 2026, 6:45 PM", txRef: "bill_69adb83210aef2d" },
  { id: "BP-002", user: "Ibrahim Abubakar", type: "Data", provider: "Airtel", amount: "₦5,000.00", phone: "08055667788", status: "COMPLETED", date: "Mar 8th, 2026, 5:30 PM", txRef: "bill_69ada29b210aef2" },
  { id: "BP-003", user: "Chidinma Obi", type: "Electricity", provider: "IKEDC", amount: "₦15,000.00", phone: "07098765432", status: "FAILED", date: "Mar 8th, 2026, 4:20 PM", txRef: "bill_69ad9d5c210aef2" },
  { id: "BP-004", user: "Adewale Musa", type: "Cable TV", provider: "DSTV", amount: "₦24,500.00", phone: "08123456789", status: "COMPLETED", date: "Mar 8th, 2026, 3:15 PM", txRef: "bill_69ad930c210aef2" },
  { id: "BP-005", user: "Fortune Chigor", type: "Betting", provider: "Sportybet", amount: "₦10,000.00", phone: "08066778899", status: "COMPLETED", date: "Mar 8th, 2026, 2:00 PM", txRef: "bill_69ad929f210aef2" },
  { id: "BP-006", user: "Quincy James", type: "Airtime", provider: "Glo", amount: "₦1,000.00", phone: "09088990011", status: "COMPLETED", date: "Mar 8th, 2026, 12:45 PM", txRef: "bill_69ad823210aef2d" },
  { id: "BP-007", user: "Victor Odigili", type: "Data", provider: "9mobile", amount: "₦3,500.00", phone: "09011223344", status: "PENDING", date: "Mar 8th, 2026, 11:30 AM", txRef: "bill_69ad723210aef2d" },
  { id: "BP-008", user: "Lucky Holland", type: "Electricity", provider: "EKEDC", amount: "₦8,000.00", phone: "07044556677", status: "COMPLETED", date: "Mar 7th, 2026, 10:15 PM", txRef: "bill_69ad623210aef2d" },
  { id: "BP-009", user: "Grace Nwosu", type: "Cable TV", provider: "GOtv", amount: "₦6,800.00", phone: "07099001122", status: "COMPLETED", date: "Mar 7th, 2026, 8:00 PM", txRef: "bill_69ad523210aef2d" },
  { id: "BP-010", user: "Efeme Jeremiah", type: "Betting", provider: "Bet9ja", amount: "₦5,000.00", phone: "08033445566", status: "FAILED", date: "Mar 7th, 2026, 6:45 PM", txRef: "bill_69ad423210aef2d" },
  { id: "BP-011", user: "Aisha Mohammed", type: "Airtime", provider: "MTN", amount: "₦500.00", phone: "08145678901", status: "COMPLETED", date: "Mar 7th, 2026, 5:30 PM", txRef: "bill_69ad323210aef2d" },
  { id: "BP-012", user: "Emeka Nwankwo", type: "Data", provider: "MTN", amount: "₦2,500.00", phone: "08156789012", status: "COMPLETED", date: "Mar 7th, 2026, 4:15 PM", txRef: "bill_69ad223210aef2d" },
  { id: "BP-013", user: "Tunde Bakare", type: "Electricity", provider: "AEDC", amount: "₦20,000.00", phone: "08167890123", status: "COMPLETED", date: "Mar 7th, 2026, 3:00 PM", txRef: "bill_69ad123210aef2d" },
  { id: "BP-014", user: "Blessing Okoro", type: "Airtime", provider: "Airtel", amount: "₦3,000.00", phone: "08178901234", status: "PENDING", date: "Mar 7th, 2026, 1:45 PM", txRef: "bill_69ad023210aef2d" },
  { id: "BP-015", user: "Yusuf Bello", type: "Cable TV", provider: "Startimes", amount: "₦4,200.00", phone: "08189012345", status: "COMPLETED", date: "Mar 7th, 2026, 12:30 PM", txRef: "bill_69acf23210aef2d" },
  { id: "BP-016", user: "Chinedu Eze", type: "Betting", provider: "1xBet", amount: "₦15,000.00", phone: "08190123456", status: "COMPLETED", date: "Mar 6th, 2026, 11:00 PM", txRef: "bill_69ace23210aef2d" },
  { id: "BP-017", user: "Ngozi Okafor", type: "Data", provider: "Glo", amount: "₦1,500.00", phone: "08201234567", status: "COMPLETED", date: "Mar 6th, 2026, 9:45 PM", txRef: "bill_69acd23210aef2d" },
  { id: "BP-018", user: "Samuel Adeyemi", type: "Electricity", provider: "PHEDC", amount: "₦12,000.00", phone: "08212345678", status: "FAILED", date: "Mar 6th, 2026, 8:30 PM", txRef: "bill_69acc23210aef2d" },
  { id: "BP-019", user: "Oluwaseun Daramola", type: "Airtime", provider: "9mobile", amount: "₦1,000.00", phone: "08223456789", status: "COMPLETED", date: "Mar 6th, 2026, 7:15 PM", txRef: "bill_69acb23210aef2d" },
  { id: "BP-020", user: "Kelechi Amadi", type: "Cable TV", provider: "DSTV", amount: "₦29,000.00", phone: "08234567890", status: "COMPLETED", date: "Mar 6th, 2026, 6:00 PM", txRef: "bill_69aca23210aef2d" },
  { id: "BP-021", user: "Ruth Adeola", type: "Betting", provider: "NairaBet", amount: "₦7,500.00", phone: "08245678901", status: "COMPLETED", date: "Mar 6th, 2026, 4:45 PM", txRef: "bill_69ac923210aef2d" },
  { id: "BP-022", user: "Precious Igwe", type: "Airtime", provider: "MTN", amount: "₦5,000.00", phone: "08256789012", status: "PENDING", date: "Mar 6th, 2026, 3:30 PM", txRef: "bill_69ac823210aef2d" },
  { id: "BP-023", user: "Abdullahi Sani", type: "Data", provider: "Airtel", amount: "₦4,000.00", phone: "08267890123", status: "COMPLETED", date: "Mar 5th, 2026, 11:15 PM", txRef: "bill_69ac723210aef2d" },
  { id: "BP-024", user: "Olu Fashola", type: "Electricity", provider: "IBEDC", amount: "₦10,000.00", phone: "08278901234", status: "COMPLETED", date: "Mar 5th, 2026, 9:00 PM", txRef: "bill_69ac623210aef2d" },
  { id: "BP-025", user: "Hauwa Garba", type: "Airtime", provider: "Glo", amount: "₦2,000.00", phone: "08289012345", status: "COMPLETED", date: "Mar 5th, 2026, 7:45 PM", txRef: "bill_69ac523210aef2d" },
];

// Invite Codes
export type InviteCodeStatus = "active" | "used" | "expired" | "deactivated";

export interface InviteCodeConditions {
  minDepositAmount: number;
  minTradeAmount: number;
  requiredTradingPairs: string[];
  tradeDeadlineDays: number | null;
  depositDeadlineDays: number | null;
}

export interface InviteCode {
  id: string;
  code: string;
  createdBy: string;
  inviterId: string | null;
  inviterName: string | null;
  conditions: InviteCodeConditions;
  depositReward: number;
  tradeReward: number;
  totalReward: number;
  maxUses: number;
  currentUses: number;
  expiresAt: string | null;
  status: InviteCodeStatus;
  createdAt: string;
  usedBy: string | null;
  usedAt: string | null;
}

export const inviteCodesList: InviteCode[] = [
  {
    id: "IC-001",
    code: "DX-WELCOME500",
    createdBy: "Adedamola A.",
    inviterId: null,
    inviterName: null,
    conditions: { minDepositAmount: 50, minTradeAmount: 100, requiredTradingPairs: [], tradeDeadlineDays: 30, depositDeadlineDays: 7 },
    depositReward: 200,
    tradeReward: 300,
    totalReward: 500,
    maxUses: 1,
    currentUses: 1,
    expiresAt: "Jun 30th, 2026",
    status: "used",
    createdAt: "Mar 1st, 2026",
    usedBy: "Chidinma Obi",
    usedAt: "Mar 5th, 2026",
  },
  {
    id: "IC-002",
    code: "DX-TRADE100",
    createdBy: "Dawood K.",
    inviterId: "user-001",
    inviterName: "Ibrahim Abubakar",
    conditions: { minDepositAmount: 20, minTradeAmount: 50, requiredTradingPairs: ["BTC/USDT"], tradeDeadlineDays: 14, depositDeadlineDays: 7 },
    depositReward: 40,
    tradeReward: 60,
    totalReward: 100,
    maxUses: 1,
    currentUses: 0,
    expiresAt: "Apr 30th, 2026",
    status: "active",
    createdAt: "Mar 10th, 2026",
    usedBy: null,
    usedAt: null,
  },
  {
    id: "IC-003",
    code: "DX-MEGA2000",
    createdBy: "Adedamola A.",
    inviterId: null,
    inviterName: null,
    conditions: { minDepositAmount: 200, minTradeAmount: 500, requiredTradingPairs: [], tradeDeadlineDays: 60, depositDeadlineDays: 14 },
    depositReward: 800,
    tradeReward: 1200,
    totalReward: 2000,
    maxUses: 1,
    currentUses: 0,
    expiresAt: null,
    status: "active",
    createdAt: "Mar 8th, 2026",
    usedBy: null,
    usedAt: null,
  },
  {
    id: "IC-004",
    code: "DX-BTC500",
    createdBy: "Dawood K.",
    inviterId: "user-003",
    inviterName: "Divine Omajuwa",
    conditions: { minDepositAmount: 100, minTradeAmount: 250, requiredTradingPairs: ["BTC/USDT", "ETH/USDT"], tradeDeadlineDays: 21, depositDeadlineDays: 7 },
    depositReward: 200,
    tradeReward: 300,
    totalReward: 500,
    maxUses: 1,
    currentUses: 0,
    expiresAt: "May 31st, 2026",
    status: "active",
    createdAt: "Mar 5th, 2026",
    usedBy: null,
    usedAt: null,
  },
  {
    id: "IC-005",
    code: "DX-SPRING100",
    createdBy: "Adedamola A.",
    inviterId: null,
    inviterName: null,
    conditions: { minDepositAmount: 10, minTradeAmount: 25, requiredTradingPairs: [], tradeDeadlineDays: 7, depositDeadlineDays: 3 },
    depositReward: 40,
    tradeReward: 60,
    totalReward: 100,
    maxUses: 1,
    currentUses: 1,
    expiresAt: "Mar 15th, 2026",
    status: "expired",
    createdAt: "Feb 15th, 2026",
    usedBy: "Adewale Musa",
    usedAt: "Mar 1st, 2026",
  },
  {
    id: "IC-006",
    code: "DX-NEWUSER75",
    createdBy: "Dawood K.",
    inviterId: null,
    inviterName: null,
    conditions: { minDepositAmount: 5, minTradeAmount: 15, requiredTradingPairs: [], tradeDeadlineDays: 14, depositDeadlineDays: 7 },
    depositReward: 30,
    tradeReward: 45,
    totalReward: 75,
    maxUses: 1,
    currentUses: 0,
    expiresAt: "Apr 15th, 2026",
    status: "active",
    createdAt: "Mar 12th, 2026",
    usedBy: null,
    usedAt: null,
  },
  {
    id: "IC-007",
    code: "DX-PROMO250",
    createdBy: "Adedamola A.",
    inviterId: "user-005",
    inviterName: "Victor Odigili",
    conditions: { minDepositAmount: 30, minTradeAmount: 75, requiredTradingPairs: ["SOL/USDT"], tradeDeadlineDays: 14, depositDeadlineDays: 5 },
    depositReward: 100,
    tradeReward: 150,
    totalReward: 250,
    maxUses: 1,
    currentUses: 1,
    expiresAt: "Mar 20th, 2026",
    status: "used",
    createdAt: "Feb 20th, 2026",
    usedBy: "Grace Nwosu",
    usedAt: "Mar 3rd, 2026",
  },
  {
    id: "IC-008",
    code: "DX-VIP1000",
    createdBy: "Adedamola A.",
    inviterId: null,
    inviterName: null,
    conditions: { minDepositAmount: 100, minTradeAmount: 300, requiredTradingPairs: [], tradeDeadlineDays: 30, depositDeadlineDays: 14 },
    depositReward: 400,
    tradeReward: 600,
    totalReward: 1000,
    maxUses: 1,
    currentUses: 0,
    expiresAt: null,
    status: "active",
    createdAt: "Mar 15th, 2026",
    usedBy: null,
    usedAt: null,
  },
];

export const inviteCodeStats = {
  totalCodes: 8,
  activeCodes: 5,
  usedCodes: 2,
  expiredCodes: 1,
  totalRedeemed: 2,
  totalDeeXpointsAwarded: 750,
  redemptionRate: "25%",
  avgTimeToComplete: "4.5 days",
};

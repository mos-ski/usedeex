import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Wallet, ShoppingCart, Users, Shield, ListChecks, BarChart3,
  Settings, LogOut, Bell, Search, ChevronDown, ChevronRight, Eye, EyeOff,
  ExternalLink, Plus, Upload, Info, AlertCircle, Trash2, FileText, ArrowLeft,
  ChevronLeft, CreditCard, Snowflake, AlertTriangle, ShieldAlert, Zap,
  Monitor, MapPin, Ban, Lock, MessageSquare, ArrowUpRight, Clock, Filter
} from "lucide-react";
import CryptoIcon from "@/components/CryptoIcon";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

const NewBadge = () => (
  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider bg-[hsl(var(--warning))] text-background uppercase animate-pulse ml-1">NEW</span>
);

// ===== TYPES =====
type AdminTab = "dashboard" | "wallets" | "orders" | "users" | "kyc" | "kyc-compliance" | "kyc-rules" | "compliance" | "compliance-alerts" | "compliance-rules" | "compliance-detail" | "reports" | "settings" | "audit-log" | "customer-detail" | "virtual-cards";

// ===== MOCK DATA =====
const dashboardMetrics = [
  { label: "Total payout", value: "₦2,396,106,090.97", hidden: true },
  { label: "Active Users", value: "1,847", hidden: true },
  { label: "Total customers", value: "2,833", hidden: true },
  { label: "Total merchants", value: "12", hidden: true },
];

const performanceData = [
  { month: "Jan", crypto: 8500, giftcard: 2000 },
  { month: "Feb", crypto: 22000, giftcard: 3500 },
  { month: "Mar", crypto: 12000, giftcard: 2800 },
];

const quickLinks = [
  "Slack", "Customer care line", "Google Analytics", "Mixpanel", "Looker Studio", "API Logs"
];

// Wallets
const deexWallet = {
  totalCrypto: "$23,496.60",
  glydeBalance: "₦7,316.00",
  palmpayBalance: "₦3,874,753.39",
  assets: [
    { symbol: "BTC", amount: "0.029 BTC", usd: "$1,956.11" },
    { symbol: "ETH", amount: "0.009272 ETH", usd: "$17.93" },
    { symbol: "USDT", amount: "21,487.507 USDT", usd: "$21,487.09" },
    { symbol: "SOL", amount: "0.018 SOL", usd: "$1.44" },
    { symbol: "DOGE", amount: "97.946 DOGE", usd: "$8.68" },
  ]
};

const customersWallet = {
  totalCrypto: "$15,567.92",
  assets: [
    { symbol: "BTC", amount: "0.027 BTC", usd: "$1,816.95" },
    { symbol: "ETH", amount: "0.002018 ETH", usd: "$3.90" },
    { symbol: "USDT", amount: "13,732.176 USDT", usd: "$13,731.91" },
    { symbol: "SOL", amount: "0.005105 SOL", usd: "$0.42" },
    { symbol: "DOGE", amount: "12.994 DOGE", usd: "$1.15" },
  ]
};

const tradeVolumeData = [
  { month: "Jan", volume: 9500 },
  { month: "Feb", volume: 18200 },
  { month: "Mar", volume: 7800 },
];

const assetDistribution = [
  { name: "USDT", value: 91.5, color: "#26A17B" },
  { name: "BTC", value: 8.3, color: "#F7931A" },
  { name: "ETH", value: 0.08, color: "#627EEA" },
  { name: "SOL", value: 0.006, color: "#9945FF" },
  { name: "DOGE", value: 0.04, color: "#C2A633" },
  { name: "TRX", value: 0.01, color: "#EF0027" },
];

const walletActivity = [
  { type: "Debit", provider: "Hizo", sub: "Payout", amount: "-45.474 BTC", ngn: "63,436.65", txId: "69adba40210aef2d638ebe72", status: "COMPLETED", date: "Mar 8th, 2026, 7:04 PM" },
  { type: "Credit", provider: "Obiex", sub: "Deposit", amount: "+0.000680 BTC", ngn: "—", txId: "69adb83210aef2d638e9c3c", status: "COMPLETED", date: "Mar 8th, 2026, 6:56 PM" },
  { type: "Credit", provider: "Obiex", sub: "Deposit", amount: "+500.05 USDT", ngn: "—", txId: "69ada29b210aef2d638c0177", status: "COMPLETED", date: "Mar 8th, 2026, 5:23 PM" },
  { type: "Debit", provider: "Hizo", sub: "Payout", amount: "-24.00 USDT", ngn: "33,480.00", txId: "69ad9d78210aef2d638bab7e", status: "COMPLETED", date: "Mar 8th, 2026, 5:02 PM" },
  { type: "Credit", provider: "Obiex", sub: "Deposit", amount: "+24.00 USDT", ngn: "—", txId: "69ad9d5c210aef2d638baa46", status: "COMPLETED", date: "Mar 8th, 2026, 5:01 PM" },
  { type: "Credit", provider: "Obiex", sub: "Autoswap", amount: "+0.000744 BTC", ngn: "—", txId: "69ad930c210aef2d638af259", status: "COMPLETED", date: "Mar 8th, 2026, 4:17 PM" },
  { type: "Credit", provider: "Obiex", sub: "Deposit", amount: "+0.000744 BTC", ngn: "—", txId: "69ad929f210aef2d638ad6f1", status: "COMPLETED", date: "Mar 8th, 2026, 4:15 PM" },
  { type: "Debit", provider: "Hizo", sub: "Payout", amount: "-50.00 USDT", ngn: "69,750.00", txId: "69ad8fbc210aef2d638a866c", status: "COMPLETED", date: "Mar 8th, 2026, 4:03 PM" },
];

// Orders
const ordersData = {
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

const ordersList = [
  { name: "Oluwaseun Daramola", asset: "BTC", type: "DEEX-DEPOSITS", amount: "0.000680 BTC", txId: "69adb83210aef2d638e9c3c", date: "Mar 8th, 2026, 6:56 PM", status: "COMPLETED" },
  { name: "Divine Omajuwa", asset: "USDT", type: "DEEX-DEPOSITS", amount: "500.05 USDT", txId: "69ada29b210aef2d638c0177", date: "Mar 8th, 2026, 5:23 PM", status: "COMPLETED" },
  { name: "Victor Odigili", asset: "USDT", type: "DEEX-DEPOSITS", amount: "24.00 USDT", txId: "69ad9d5c210aef2d638baa46", date: "Mar 8th, 2026, 5:01 PM", status: "" },
  { name: "Divine Omajuwa", asset: "BTC", type: "DEEX-ASSET-SWAPS", amount: "0.000744\nBTC → USDT", txId: "69ad930c210aef2d638af259", date: "Mar 8th, 2026, 4:17 PM", status: "COMPLETED" },
  { name: "Divine Omajuwa", asset: "BTC", type: "DEEX-DEPOSITS", amount: "0.000744 BTC", txId: "69ad929f210aef2d638ad6f1", date: "Mar 8th, 2026, 4:15 PM", status: "COMPLETED" },
];

// Users
const usersStats = {
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

const signupData = [
  { month: "Jan", users: 318, clients: 12 },
  { month: "Feb", users: 85, clients: 5 },
  { month: "Mar", users: 95, clients: 8 },
];

const customersList = [
  { name: "—— ——", email: "5wrjytq6vz@privaterelay.apple", kyc: "Level 2", phone: "07036693498", created: "Jul 20th, 2025, 1:55 PM", lastLogin: "Nov 7th, 2025, 10:04 AM" },
  { name: "—— ——", email: "fthbx4r7cd@privaterelay.apple", kyc: "Level 1", phone: "09063440156", created: "Aug 15th, 2025, 8:18 PM", lastLogin: "Nov 7th, 2025, 10:04 AM" },
  { name: "Adewale Musa", email: "adewale@gmail.com", kyc: "Level 3", phone: "08123456789", created: "Jan 5th, 2026, 9:30 AM", lastLogin: "Mar 8th, 2026, 2:15 PM" },
  { name: "Chidinma Obi", email: "chidinma.obi@yahoo.com", kyc: "Level 2", phone: "07098765432", created: "Feb 12th, 2026, 3:45 PM", lastLogin: "Mar 7th, 2026, 11:20 AM" },
];

// KYC
const kycLogs = [
  { name: "CHIBUEZE UMEH", email: "chibuezeumeh903@gmail.com", level: "KYC 3", status: "APPROVED", date: "Feb 25th, 2026, 8:03 AM" },
  { name: "OSASENAGA ERHARUYI", email: "emmosa718@gmail.com", level: "KYC 3", status: "APPROVED", date: "Feb 22nd, 2026, 7:42 AM" },
  { name: "FRIDAY AZIAKPONO", email: "poundsfriday57@gmail.com", level: "KYC 3", status: "APPROVED", date: "Feb 21st, 2026, 9:01 PM" },
  { name: "Idris Abdullahi", email: "idris53279@gmail.com", level: "KYC 2", status: "REJECTED", date: "Feb 20th, 2026, 12:20 PM" },
  { name: "Donatus Aideyan", email: "sundaydonatusa@gmail.com", level: "KYC 3", status: "APPROVED", date: "Feb 19th, 2026, 7:56 PM" },
  { name: "Quincy James", email: "jamesquincy3326@gmail.com", level: "KYC 3", status: "APPROVED", date: "Feb 16th, 2026, 3:58 PM" },
  { name: "David Enyowhara", email: "fionabecon57@gmail.com", level: "KYC 2", status: "PENDING", date: "Feb 3rd, 2026, 12:09 AM" },
  { name: "Efeme Jeremiah", email: "ejaifeefemegreat@gmail.com", level: "KYC 2", status: "PENDING", date: "Jan 31st, 2026, 12:45 AM" },
  { name: "Fortune Chigor", email: "chigorfortune25@gmail.com", level: "KYC 2", status: "PENDING", date: "Jan 28th, 2026, 2:28 PM" },
  { name: "Lucky Holland", email: "hollandlucky09@gmail.com", level: "KYC 2", status: "PENDING", date: "Jan 28th, 2026, 2:25 PM" },
];

// Payroll
const payrollData = [
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
const reportCards = [
  { title: "Revenue", desc: "How much does each user generate to/for us per year. How much money did we spend to acquire a user, etc", color: "text-deex-blue" },
  { title: "Growth", desc: "Total users per month or week, there source, if they signed up (activated user), if they buy.", color: "text-deex-green" },
  { title: "Retention", desc: "Users who came back to login by theirselves. Resurrected users are users we got back by ourselves.", color: "text-deex-orange" },
  { title: "Website", desc: "How much does each user generate to/for us per year. How much money did we spend to acquire a user, etc,", color: "text-deex-blue" },
  { title: "Happiness", desc: "App Store rating, NPS scores, customer success rating, customer feedback scores, etc.", color: "text-deex-orange" },
  { title: "Survey", desc: "Collect feedback and data for market research, product development, and more.", color: "text-deex-purple" },
];

// ===== COMPLIANCE MOCK DATA =====
type ComplianceAlert = {
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

const complianceAlerts: ComplianceAlert[] = [
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

type ComplianceRule = {
  id: string;
  name: string;
  trigger: string;
  threshold: string;
  action: string;
  enabled: boolean;
  lastTriggered: string;
  triggeredCount: number;
};

const defaultComplianceRules: ComplianceRule[] = [
  { id: "R1", name: "High-Frequency Trading", trigger: "Trades exceeding threshold in time window", threshold: "10 trades / 5 minutes", action: "Auto-suspend + Alert", enabled: true, lastTriggered: "Mar 8, 2026", triggeredCount: 3 },
  { id: "R2", name: "Multi-Device Login", trigger: "Logins from multiple devices/locations", threshold: "3+ devices / 2 hours", action: "Alert only", enabled: true, lastTriggered: "Mar 8, 2026", triggeredCount: 7 },
  { id: "R3", name: "Large Withdrawal Spike", trigger: "Withdrawal exceeds % above user average", threshold: "200% above average", action: "Hold + Alert", enabled: true, lastTriggered: "Mar 8, 2026", triggeredCount: 2 },
  { id: "R4", name: "Failed KYC Attempts", trigger: "Multiple failed verifications in time window", threshold: "3 failures / 24 hours", action: "Alert only", enabled: true, lastTriggered: "Mar 7, 2026", triggeredCount: 4 },
  { id: "R5", name: "Wash Trading Detection", trigger: "Rapid deposit-withdraw cycles with negligible net", threshold: "3 cycles / 1 hour", action: "Auto-suspend + Alert", enabled: true, lastTriggered: "Mar 7, 2026", triggeredCount: 1 },
  { id: "R6", name: "Geo-Velocity Check", trigger: "Login from impossible travel distance", threshold: ">500km / 1 hour", action: "Auto-suspend + Alert", enabled: false, lastTriggered: "Never", triggeredCount: 0 },
  { id: "R7", name: "Dormant Account Activity", trigger: "Large transaction on inactive account", threshold: "90+ days inactive, >$500 tx", action: "Alert only", enabled: false, lastTriggered: "Never", triggeredCount: 0 },
];

// ===== STATUS BADGE =====
const statusBadge = (status: string) => {
  const s = status.toUpperCase();
  const styles: Record<string, string> = {
    COMPLETED: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]",
    APPROVED: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]",
    REJECTED: "bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))]",
    PENDING: "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]",
  };
  return <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wider ${styles[s] || "bg-muted text-muted-foreground"}`}>{s}</span>;
};

const severityBadge = (severity: string) => {
  const styles: Record<string, string> = {
    critical: "bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))]",
    high: "bg-[hsl(var(--deex-orange))]/20 text-[hsl(var(--deex-orange))]",
    medium: "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]",
    low: "bg-muted text-muted-foreground",
  };
  return <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wider uppercase ${styles[severity] || "bg-muted text-muted-foreground"}`}>{severity}</span>;
};

const alertStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    pending: "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]",
    reviewing: "bg-[hsl(var(--deex-blue))]/20 text-[hsl(var(--deex-blue))]",
    resolved: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]",
    dismissed: "bg-muted text-muted-foreground",
  };
  return <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wider uppercase ${styles[status] || "bg-muted text-muted-foreground"}`}>{status}</span>;
};

const triggerIcon = (type: string) => {
  const icons: Record<string, typeof AlertTriangle> = {
    "high-frequency": Zap,
    "multi-device": Monitor,
    "large-withdrawal": ArrowUpRight,
    "failed-kyc": ShieldAlert,
    "wash-trading": AlertTriangle,
  };
  const Icon = icons[type] || AlertCircle;
  return <Icon className="w-4 h-4" />;
};

// ===== NAV ITEMS =====
const navItems: { icon: typeof LayoutDashboard; label: string; tab: AdminTab; isNew?: boolean; children?: { label: string; tab: AdminTab; isNew?: boolean }[] }[] = [
  { icon: LayoutDashboard, label: "Dashboard", tab: "dashboard" },
  { icon: Wallet, label: "Wallets", tab: "wallets" },
  { icon: ShoppingCart, label: "Orders", tab: "orders" },
  { icon: CreditCard, label: "Virtual Cards", tab: "virtual-cards", isNew: true },
  { icon: Users, label: "Users", tab: "users" },
  { icon: Shield, label: "Kyc logs", tab: "kyc", children: [
    { label: "Compliance", tab: "kyc-compliance" },
    { label: "Rules Manager", tab: "kyc-rules" },
  ]},
  { icon: AlertTriangle, label: "Compliance", tab: "compliance", isNew: true, children: [
    { label: "Alerts", tab: "compliance-alerts" },
    { label: "Rules Engine", tab: "compliance-rules" },
  ]},
  { icon: FileText, label: "Audit Log", tab: "audit-log", isNew: true },
  { icon: BarChart3, label: "Reports", tab: "reports" },
  { icon: Settings, label: "Settings", tab: "settings" },
];

// ===== MAIN COMPONENT =====
const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [showBalance, setShowBalance] = useState(false);
  const [walletTab, setWalletTab] = useState<"deex" | "customers">("deex");
  const [ordersTab, setOrdersTab] = useState<"orders" | "payouts" | "rewards" | "otc">("orders");
  const [usersTab, setUsersTab] = useState<"customers" | "merchants" | "clients">("customers");
  const [kycFilter, setKycFilter] = useState("All logs");
  const [kycSection, setKycSection] = useState<"customers" | "business">("customers");
  const [settingsTab, setSettingsTab] = useState<"security" | "fees" | "payroll" | "rewards">("security");
  const [perfTab, setPerfTab] = useState<"all" | "crypto" | "giftcard">("all");
  const [autoPay, setAutoPay] = useState(true);
  const [autoSwap, setAutoSwap] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickActionOpen, setQuickActionOpen] = useState(false);
  const [reportDetail, setReportDetail] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customersList[0] | null>(null);
  const [tablePage, setTablePage] = useState(1);
  const perPage = 5;
  const [selectedAlert, setSelectedAlert] = useState<ComplianceAlert | null>(null);
  const [complianceFilter, setComplianceFilter] = useState<"all" | "pending" | "reviewing" | "resolved" | "dismissed">("all");
  const [complianceRules, setComplianceRules] = useState<ComplianceRule[]>(defaultComplianceRules);
  const [complianceNote, setComplianceNote] = useState("");

  const isKycTab = activeTab === "kyc" || activeTab === "kyc-compliance" || activeTab === "kyc-rules";
  const isComplianceTab = activeTab === "compliance" || activeTab === "compliance-alerts" || activeTab === "compliance-rules" || activeTab === "compliance-detail";

  const filteredAlerts = complianceFilter === "all" ? complianceAlerts : complianceAlerts.filter(a => a.status === complianceFilter);
  const alertStats = {
    total: complianceAlerts.length,
    critical: complianceAlerts.filter(a => a.severity === "critical").length,
    pending: complianceAlerts.filter(a => a.status === "pending").length,
    autoSuspended: complianceAlerts.filter(a => a.autoSuspended).length,
  };

  const currentWallet = walletTab === "deex" ? deexWallet : customersWallet;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-[220px] bg-card border-r border-border flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="p-5 border-b border-border flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-deex-teal flex items-center justify-center">
            <span className="text-xs font-bold text-background">D</span>
          </div>
          <span className="text-base font-bold text-foreground">DEE_X</span>
        </div>

        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.tab === activeTab || (item.children && item.children.some(c => c.tab === activeTab));
            const isExpanded = expandedSections[item.tab] || false;
            return (
              <div key={item.tab}>
                <button
                  onClick={() => {
                    if (item.children) {
                      setExpandedSections(prev => ({ ...prev, [item.tab]: !prev[item.tab] }));
                      setActiveTab(item.tab);
                    } else {
                      setActiveTab(item.tab);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-[18px] h-[18px]" />
                    <span>{item.label}</span>
                    {item.isNew && <NewBadge />}
                  </div>
                  {item.children && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  )}
                </button>
                {item.children && isExpanded && (
                  <div className="ml-10 mt-0.5 space-y-0.5">
                    {item.children.map(child => (
                      <button
                        key={child.tab}
                        onClick={() => setActiveTab(child.tab)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeTab === child.tab ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >{child.label}</button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-2 border-t border-border">
          <button onClick={() => navigate("/login")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-[18px] h-[18px]" /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-foreground">
            <span className="text-muted-foreground">—</span>
            <h1 className="text-base font-semibold">
              {activeTab === "dashboard" ? "Dashboard" : activeTab === "wallets" ? "Wallets" : activeTab === "orders" ? "Transactions" : activeTab === "users" ? "Users" : isKycTab ? "" : isComplianceTab ? "Compliance" : activeTab === "reports" ? "Reports" : activeTab === "audit-log" ? "Audit Log" : activeTab === "virtual-cards" ? "Virtual Cards" : "Settings"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-muted-foreground cursor-pointer" />
            <div className="w-8 h-8 rounded-full bg-deex-blue/30 flex items-center justify-center text-xs font-bold text-deex-blue">AD</div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Welcome + Search bar */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Welcome, Admin 👋</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="h-9 w-48 bg-secondary rounded-lg pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setQuickActionOpen(!quickActionOpen)}
                  className="h-9 px-4 bg-deex-blue text-primary-foreground rounded-lg text-sm font-medium flex items-center gap-1"
                >
                  Quick Action <ChevronDown className="w-4 h-4" />
                </button>
                {quickActionOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-xl z-20 py-1">
                    {["Fund wallet", "Create payout", "Add user", "Export data"].map(a => (
                      <button key={a} onClick={() => setQuickActionOpen(false)} className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">{a}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ===== DASHBOARD ===== */}
          {activeTab === "dashboard" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold text-muted-foreground tracking-wider">METRICS</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <button onClick={() => setShowBalance(!showBalance)} className="flex items-center gap-1 hover:text-foreground">
                    {showBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {showBalance ? "HIDE BALANCE" : "SHOW BALANCE"}
                  </button>
                  <span>|</span>
                  <button className="flex items-center gap-1 hover:text-foreground">
                    <Upload className="w-3.5 h-3.5" /> EXPORT
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-8">
                {dashboardMetrics.map(m => (
                  <div key={m.label} className="bg-card border border-border rounded-xl p-5">
                    <p className={`text-sm font-medium mb-2 ${m.label === "Total payout" ? "text-deex-blue" : m.label === "Active Users" ? "text-deex-green" : "text-foreground"}`}>{m.label}</p>
                    <p className="text-xl font-bold text-foreground">{showBalance ? m.value : "********"}</p>
                    <div className="mt-2 h-6 w-16 bg-secondary rounded text-xs flex items-center justify-center text-muted-foreground">
                      {showBalance ? "visible" : "•••••••"}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-4">PERFORMANCE</p>
              <div className="flex gap-6">
                <div className="flex-1 bg-card border border-border rounded-xl p-5">
                  <div className="flex gap-4 mb-4">
                    {(["all", "crypto", "giftcard"] as const).map(t => (
                      <button key={t} onClick={() => setPerfTab(t)} className={`text-sm pb-1 border-b-2 transition-colors ${perfTab === t ? "border-deex-blue text-deex-blue font-medium" : "border-transparent text-muted-foreground"}`}>
                        {t === "all" ? "All" : t === "crypto" ? "Crypto" : "Giftcard"}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Total Traded</p>
                  <p className="text-2xl font-bold text-foreground mb-4">₦2,396,106,090.97</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorCrypto" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(213 80% 55%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(213 80% 55%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
                      <XAxis dataKey="month" tick={{ fill: "hsl(215 15% 55%)", fontSize: 12 }} axisLine={false} />
                      <YAxis tick={{ fill: "hsl(215 15% 55%)", fontSize: 12 }} axisLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)},000`} />
                      <Tooltip contentStyle={{ background: "hsl(220 22% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: 8, color: "#fff" }} />
                      {(perfTab === "all" || perfTab === "crypto") && <Area type="monotone" dataKey="crypto" stroke="hsl(213 80% 55%)" fill="url(#colorCrypto)" strokeWidth={2} />}
                      {(perfTab === "all" || perfTab === "giftcard") && <Area type="monotone" dataKey="giftcard" stroke="hsl(170 60% 45%)" fill="transparent" strokeWidth={2} />}
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="flex gap-4 mt-2 justify-center text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-deex-blue" /> Crypto</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-deex-teal" /> Giftcard</span>
                  </div>
                </div>

                <div className="w-72 shrink-0">
                  <div className="bg-card border border-border rounded-xl p-5">
                    <p className="text-sm font-semibold text-foreground mb-3">Quick Links</p>
                    <div className="space-y-2">
                      {quickLinks.map(link => (
                        <div key={link} className="flex items-center justify-between px-3 py-2.5 bg-secondary rounded-lg">
                          <span className="text-sm text-foreground">{link}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== WALLETS ===== */}
          {activeTab === "wallets" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-3">WALLETS</p>
                  <div className="flex gap-4">
                    <button onClick={() => setWalletTab("deex")} className={`text-sm pb-1 border-b-2 ${walletTab === "deex" ? "border-deex-blue text-deex-blue font-medium" : "border-transparent text-muted-foreground"}`}>DeeX Wallet</button>
                    <button onClick={() => setWalletTab("customers")} className={`text-sm pb-1 border-b-2 ${walletTab === "customers" ? "border-deex-blue text-deex-blue font-medium" : "border-transparent text-muted-foreground"}`}>Customers Wallet</button>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <button onClick={() => setShowBalance(!showBalance)} className="flex items-center gap-1 hover:text-foreground">
                    {showBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {showBalance ? "HIDE BALANCE" : "SHOW BALANCE"}
                  </button>
                  <span>|</span>
                  <button className="flex items-center gap-1 hover:text-foreground"><Upload className="w-3.5 h-3.5" /> EXPORT</button>
                </div>
              </div>

              {/* Balance cards */}
              <div className={`grid ${walletTab === "deex" ? "grid-cols-3" : "grid-cols-1 max-w-[600px]"} gap-4 mb-6`}>
                <div className="bg-card border border-border rounded-xl p-5">
                  <p className="text-xs text-muted-foreground mb-1">Total Crypto</p>
                  <p className="text-2xl font-bold text-foreground">{showBalance ? currentWallet.totalCrypto : "****"}</p>
                  {walletTab === "deex" && (
                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 h-9 bg-deex-blue text-primary-foreground rounded-lg text-sm font-medium flex items-center justify-center gap-1"><Plus className="w-4 h-4" /> Fund Wallet</button>
                      <button className="flex-1 h-9 bg-secondary text-foreground rounded-lg text-sm font-medium flex items-center justify-center gap-1"><Upload className="w-4 h-4" /> Withdraw</button>
                    </div>
                  )}
                </div>
                {walletTab === "deex" && (
                  <>
                    <div className="bg-card border border-border rounded-xl p-5">
                      <p className="text-xs text-muted-foreground mb-1">Glyde Balance</p>
                      <p className="text-2xl font-bold text-foreground">{showBalance ? deexWallet.glydeBalance : "****"}</p>
                      <button className="mt-4 h-9 px-4 bg-deex-blue text-primary-foreground rounded-lg text-sm font-medium flex items-center gap-1"><Plus className="w-4 h-4" /> Fund Wallet</button>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-5">
                      <p className="text-xs text-muted-foreground mb-1">Palmpay Balance</p>
                      <p className="text-2xl font-bold text-foreground">{showBalance ? deexWallet.palmpayBalance : "****"}</p>
                      <button className="mt-4 h-9 px-4 bg-deex-blue text-primary-foreground rounded-lg text-sm font-medium flex items-center gap-1"><Plus className="w-4 h-4" /> Fund Wallet</button>
                    </div>
                  </>
                )}
              </div>

              {/* Asset cards */}
              <div className="flex gap-4 overflow-x-auto pb-2 mb-6">
                {currentWallet.assets.map(a => (
                  <div key={a.symbol} className="bg-card border border-border rounded-xl p-4 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                      <CryptoIcon symbol={a.symbol} size="sm" />
                      <span className="text-sm font-semibold text-foreground">{a.symbol}</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">{a.amount}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-secondary rounded text-xs text-muted-foreground">{a.usd}</span>
                  </div>
                ))}
              </div>

              {/* Performance */}
              <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-4">PERFORMANCE</p>
              <div className="flex gap-6 mb-6">
                <div className="flex-1 bg-card border border-border rounded-xl p-5">
                  <p className="text-sm font-semibold text-foreground mb-4">Trade Volume</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={tradeVolumeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
                      <XAxis dataKey="month" tick={{ fill: "hsl(215 15% 55%)", fontSize: 12 }} axisLine={false} />
                      <YAxis tick={{ fill: "hsl(215 15% 55%)", fontSize: 12 }} axisLine={false} tickFormatter={v => `$${v.toLocaleString()}`} />
                      <Tooltip contentStyle={{ background: "hsl(220 22% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: 8, color: "#fff" }} />
                      <Bar dataKey="volume" fill="hsl(213 80% 55%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex gap-4 mt-2 justify-center text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-deex-blue" /> Crypto</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-deex-teal" /> Giftcard</span>
                  </div>
                </div>
                <div className="w-80 shrink-0 bg-card border border-border rounded-xl p-5">
                  <p className="text-sm font-semibold text-foreground mb-4">Assets</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={assetDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={85} dataKey="value" paddingAngle={2}>
                        {assetDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="text-center -mt-[120px] relative z-0">
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="text-lg font-bold text-foreground">{walletTab === "deex" ? "$23.48K" : "$15.56K"}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-16 justify-center">
                    {assetDistribution.map(a => (
                      <span key={a.name} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <span className="w-2 h-2 rounded-full" style={{ background: a.color }} /> {a.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Activity */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-foreground">Activity</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <label className="flex items-center gap-2">
                    <div className={`w-8 h-4 rounded-full flex items-center transition-colors cursor-pointer ${autoSwap ? "bg-deex-blue" : "bg-muted"}`} onClick={() => setAutoSwap(!autoSwap)}>
                      <div className={`w-3.5 h-3.5 rounded-full bg-foreground transition-transform ${autoSwap ? "translate-x-4" : "translate-x-0.5"}`} />
                    </div>
                    AUTO SWAP: {autoSwap ? "ON" : "OFF"}
                  </label>
                  <span>|</span>
                  <span>AUTO WITHDRAWAL: OFF</span>
                </div>
              </div>
              <div className="flex gap-4 mb-3">
                {["All", "Payroll"].map(t => (
                  <button key={t} className={`text-sm pb-1 border-b-2 ${t === "All" ? "border-deex-blue text-deex-blue font-medium" : "border-transparent text-muted-foreground"}`}>{t}</button>
                ))}
              </div>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border">
                    {["Type", "Amount", "Amount(NGN)", "Trans ID", "Status", "Date"].map(h => (
                      <th key={h} className="text-left text-xs text-muted-foreground font-medium px-4 py-3">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {walletActivity.map((w, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${w.type === "Credit" ? "bg-deex-green" : "bg-deex-blue"}`} />
                            <div>
                              <p className="text-sm font-medium text-foreground">{w.type}</p>
                              <p className="text-xs text-muted-foreground">{w.provider} · {w.sub}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground">{w.amount}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{w.ngn}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{w.txId}</td>
                        <td className="px-4 py-3">{statusBadge(w.status)}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{w.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== ORDERS ===== */}
          {activeTab === "orders" && (
            <div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Total Order */}
                <div className="bg-card border border-border rounded-xl p-5">
                  <p className="text-sm text-muted-foreground mb-1">Total Order</p>
                  <p className="text-2xl font-bold text-foreground">{ordersData.totalOrder}</p>
                  <p className="text-xs text-muted-foreground mb-3">{ordersData.totalOrderBtc}</p>
                  <div className="flex gap-1 mb-2">
                    {ordersData.orderDistribution.map(d => (
                      <div key={d.label} className={`h-6 ${d.color} rounded text-[10px] font-medium flex items-center justify-center text-foreground`} style={{ width: `${Math.max(d.pct, 8)}%` }}>
                        {d.pct > 0 ? `${d.pct}%` : "0.0%"}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 text-[10px] text-muted-foreground">
                    {ordersData.orderDistribution.map(d => <span key={d.label}>{d.label}</span>)}
                  </div>
                </div>

                {/* Total Payout */}
                <div className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total payout</p>
                      <p className="text-2xl font-bold text-foreground">{ordersData.totalPayout}</p>
                      <p className="text-xs text-muted-foreground">{ordersData.totalPayoutNgn}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Status filter</p>
                      <select className="h-8 px-2 bg-secondary text-foreground rounded text-xs outline-none">
                        <option>All</option><option>Completed</option><option>Pending</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-3 mb-2">
                    {ordersData.payoutDistribution.map(d => (
                      <div key={d.label} className={`h-6 ${d.color} rounded text-[10px] font-medium flex items-center justify-center text-foreground`} style={{ width: `${Math.max(d.pct, 8)}%` }}>
                        {d.pct}%
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 text-[10px] text-muted-foreground">
                    {ordersData.payoutDistribution.map(d => <span key={d.label}>{d.label}</span>)}
                  </div>
                  <div className="mt-3 bg-destructive/10 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-destructive" />
                      <div>
                        <p className="text-xs font-medium text-foreground">Some payouts failed</p>
                        <p className="text-[10px] text-muted-foreground">You have {ordersData.failedPayouts} payouts uncompleted.</p>
                      </div>
                    </div>
                    <button className="h-7 px-3 bg-destructive text-destructive-foreground rounded text-xs font-medium">Review</button>
                  </div>
                </div>
              </div>

              {/* Activity */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-foreground">Activity</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <label className="flex items-center gap-2 cursor-pointer" onClick={() => setAutoPay(!autoPay)}>
                    <div className={`w-8 h-4 rounded-full flex items-center transition-colors ${autoPay ? "bg-deex-blue" : "bg-muted"}`}>
                      <div className={`w-3.5 h-3.5 rounded-full bg-foreground transition-transform ${autoPay ? "translate-x-4" : "translate-x-0.5"}`} />
                    </div>
                    AUTO PAY: {autoPay ? "ON" : "OFF"}
                  </label>
                  <span>|</span>
                  <button className="flex items-center gap-1 hover:text-foreground"><Upload className="w-3.5 h-3.5" /> EXPORT</button>
                </div>
              </div>
              <div className="flex gap-4 mb-3">
                {(["orders", "payouts", "rewards", "otc"] as const).map(t => (
                  <button key={t} onClick={() => setOrdersTab(t)} className={`text-sm pb-1 border-b-2 ${ordersTab === t ? "border-deex-blue text-deex-blue font-medium" : "border-transparent text-muted-foreground"}`}>
                    {t === "orders" ? "Orders" : t === "payouts" ? "Payouts" : t === "rewards" ? "Rewards" : "OTC"}
                  </button>
                ))}
              </div>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border">
                    {["Name", "Asset", "Type", "Amount", "Trans ID", "Date", "Status"].map(h => (
                      <th key={h} className="text-left text-xs text-muted-foreground font-medium px-4 py-3">{h} {["Name", "Asset", "Type", "Date"].includes(h) && <span className="inline-block ml-0.5">↕</span>}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {ordersList.map((o, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3 text-sm text-foreground">{o.name}</td>
                        <td className="px-4 py-3"><div className="flex items-center gap-2"><CryptoIcon symbol={o.asset} size="sm" /><span className="text-sm text-foreground">{o.asset}</span></div></td>
                        <td className="px-4 py-3 text-sm text-foreground">{o.type}</td>
                        <td className="px-4 py-3 text-sm text-foreground whitespace-pre-line">{o.amount}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{o.txId}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{o.date}</td>
                        <td className="px-4 py-3">{o.status ? statusBadge(o.status) : null}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== USERS ===== */}
          {activeTab === "users" && (
            <div>
              <div className="flex gap-6 mb-6">
                {/* Total users */}
                <div className="flex-1 bg-card border border-border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-muted-foreground">Total users</p>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="text-3xl font-bold text-foreground">{usersStats.total}</p>
                  <p className="text-xs text-deex-green flex items-center gap-1 mt-1">
                    <span className="w-2 h-2 rounded-full bg-deex-green" /> CURRENTLY ONLINE
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-4 mb-4">
                    <div className="bg-secondary rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-muted-foreground">Star Customer</p>
                        <p className="text-xs text-muted-foreground">{usersStats.starCustomer.referrals} Referrals</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-deex-purple/30 flex items-center justify-center text-xs font-bold text-deex-purple">{usersStats.starCustomer.initials}</div>
                        <span className="text-sm font-medium text-foreground">{usersStats.starCustomer.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-deex-blue ml-auto" />
                      </div>
                    </div>
                    <div className="bg-secondary rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-muted-foreground">Biggest Client</p>
                        <p className="text-xs text-muted-foreground">{usersStats.biggestClient.volume}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-deex-blue/30 flex items-center justify-center text-xs font-bold text-deex-blue">{usersStats.biggestClient.initials}</div>
                        <span className="text-sm font-medium text-foreground">{usersStats.biggestClient.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-deex-purple ml-auto" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {usersStats.breakdown.map(b => (
                      <div key={b.label} className="flex items-center justify-between bg-secondary/60 rounded-lg px-3 py-2">
                        <span className="text-xs font-medium text-deex-blue">{b.label}</span>
                        <span className="text-xs text-muted-foreground">{b.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sign up count */}
                <div className="w-[380px] shrink-0 bg-card border border-border rounded-xl p-5">
                  <p className="text-sm font-semibold text-foreground mb-4">Sign up count</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={signupData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
                      <XAxis dataKey="month" tick={{ fill: "hsl(215 15% 55%)", fontSize: 12 }} axisLine={false} />
                      <YAxis tick={{ fill: "hsl(215 15% 55%)", fontSize: 12 }} axisLine={false} />
                      <Tooltip contentStyle={{ background: "hsl(220 22% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: 8, color: "#fff" }} />
                      <Bar dataKey="users" fill="hsl(213 80% 55%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="clients" fill="hsl(215 15% 55%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex gap-4 mt-2 justify-center text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-deex-blue" /> Users</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-muted" /> Clients</span>
                  </div>
                </div>
              </div>

              {/* Activity */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-foreground">Activity</p>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><Upload className="w-3.5 h-3.5" /> EXPORT</button>
              </div>
              <div className="flex gap-4 mb-3">
                {(["customers", "merchants", "clients"] as const).map(t => (
                  <button key={t} onClick={() => setUsersTab(t)} className={`text-sm pb-1 border-b-2 ${usersTab === t ? "border-deex-blue text-deex-blue font-medium" : "border-transparent text-muted-foreground"}`}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border">
                    {["Name", "Email", "KYC", "Phone number", "Date Created", "Last Login"].map(h => (
                      <th key={h} className="text-left text-xs text-muted-foreground font-medium px-4 py-3">{h} {["Name", "Email"].includes(h) && <span className="inline-block ml-0.5">↕</span>}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {customersList.map((c, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer" onClick={() => navigate(`/admin/users/${i}`)}>
                        <td className="px-4 py-3 text-sm text-foreground">{c.name}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{c.email}</td>
                        <td className="px-4 py-3"><span className="text-[10px] px-2.5 py-1 rounded-full font-medium bg-deex-blue/20 text-deex-blue">{c.kyc}</span></td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{c.phone}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{c.created}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{c.lastLogin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== KYC LOGS ===== */}
          {activeTab === "kyc" && (
            <div>
              <div className="flex gap-4 mb-4">
                <button onClick={() => setKycSection("customers")} className={`text-xs font-semibold tracking-wider ${kycSection === "customers" ? "text-foreground" : "text-muted-foreground"}`}>CUSTOMERS</button>
                <button onClick={() => setKycSection("business")} className={`text-xs font-semibold tracking-wider ${kycSection === "business" ? "text-foreground" : "text-muted-foreground"}`}>BUSINESS</button>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-4">
                  {["All logs", "Completed", "Rejected", "Requests"].map(f => (
                    <button key={f} onClick={() => setKycFilter(f)} className={`text-sm pb-1 border-b-2 ${kycFilter === f ? "border-deex-blue text-deex-blue font-medium" : "border-transparent text-muted-foreground"}`}>{f}</button>
                  ))}
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input placeholder="Search" className="h-9 w-40 bg-secondary rounded-lg pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none" />
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border">
                    {["Name", "Email", "Level", "KYC Status", "Date Created"].map(h => (
                      <th key={h} className="text-left text-xs text-muted-foreground font-medium px-4 py-3">{h} {["Name", "Email", "Date Created"].includes(h) && <span className="inline-block ml-0.5">↕</span>}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {kycLogs.filter(k => {
                      if (kycFilter === "All logs") return true;
                      if (kycFilter === "Completed") return k.status === "APPROVED";
                      if (kycFilter === "Rejected") return k.status === "REJECTED";
                      if (kycFilter === "Requests") return k.status === "PENDING";
                      return true;
                    }).map((k, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3 text-sm text-foreground">{k.name}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{k.email}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{k.level}</td>
                        <td className="px-4 py-3">{statusBadge(k.status)}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{k.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== KYC COMPLIANCE ===== */}
          {activeTab === "kyc-compliance" && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Compliance</h2>
              <p className="text-sm text-muted-foreground mb-4">Flagged users and compliance activity logs.</p>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border">
                    {["User", "Flag Reason", "Risk Level", "Date Flagged", "Action"].map(h => (
                      <th key={h} className="text-left text-xs text-muted-foreground font-medium px-4 py-3">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {[
                      { user: "Idris Abdullahi", reason: "Inconsistent documents", risk: "High", date: "Feb 20th, 2026" },
                      { user: "Anonymous User", reason: "Multiple accounts detected", risk: "Medium", date: "Feb 15th, 2026" },
                      { user: "Lucky Holland", reason: "Expired ID submitted", risk: "Low", date: "Jan 28th, 2026" },
                    ].map((c, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3 text-sm text-foreground">{c.user}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{c.reason}</td>
                        <td className="px-4 py-3"><span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${c.risk === "High" ? "bg-destructive/20 text-destructive" : c.risk === "Medium" ? "bg-warning/20 text-warning" : "bg-muted text-muted-foreground"}`}>{c.risk}</span></td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{c.date}</td>
                        <td className="px-4 py-3"><button className="text-xs text-deex-blue hover:underline">Review</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== KYC RULES MANAGER ===== */}
          {activeTab === "kyc-rules" && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Rules Manager</h2>
              <p className="text-sm text-muted-foreground mb-4">Configure KYC verification rules and limits per level.</p>
              <div className="space-y-4 max-w-2xl">
                {[
                  { level: "KYC Level 1", desc: "Email + Phone verification", dailyLimit: "₦50,000", txLimit: "₦20,000" },
                  { level: "KYC Level 2", desc: "Government ID + Selfie", dailyLimit: "₦500,000", txLimit: "₦200,000" },
                  { level: "KYC Level 3", desc: "Proof of address + Utility bill", dailyLimit: "₦5,000,000", txLimit: "₦2,000,000" },
                ].map(r => (
                  <div key={r.level} className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{r.level}</p>
                        <p className="text-xs text-muted-foreground">{r.desc}</p>
                      </div>
                      <button className="text-xs text-deex-blue hover:underline">Edit</button>
                    </div>
                    <div className="flex gap-6 mt-3">
                      <div><p className="text-[10px] text-muted-foreground mb-0.5">Daily Limit</p><p className="text-sm font-medium text-foreground">{r.dailyLimit}</p></div>
                      <div><p className="text-[10px] text-muted-foreground mb-0.5">Per Transaction</p><p className="text-sm font-medium text-foreground">{r.txLimit}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== REPORTS ===== */}
          {activeTab === "reports" && !reportDetail && (
            <div>
              <div className="grid grid-cols-3 gap-6">
                {reportCards.map(r => (
                  <button key={r.title} onClick={() => setReportDetail(r.title)} className="bg-card border border-border rounded-xl overflow-hidden text-left hover:border-muted-foreground/40 transition-colors">
                    <div className="h-36 bg-secondary flex items-center justify-center">
                      <BarChart3 className="w-16 h-16 text-muted-foreground/30" />
                    </div>
                    <div className="p-4">
                      <p className={`text-sm font-semibold mb-1 ${r.color}`}>{r.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reports" && reportDetail && (
            <div>
              <button onClick={() => setReportDetail(null)} className="text-sm text-deex-blue mb-4 hover:underline">← Back to Reports</button>
              <h2 className="text-lg font-semibold text-foreground mb-4">{reportDetail} Report</h2>
              <div className="bg-card border border-border rounded-xl p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { month: "Jan", value: reportDetail === "Revenue" ? 4500 : reportDetail === "Growth" ? 318 : 85 },
                    { month: "Feb", value: reportDetail === "Revenue" ? 7200 : reportDetail === "Growth" ? 245 : 72 },
                    { month: "Mar", value: reportDetail === "Revenue" ? 5800 : reportDetail === "Growth" ? 190 : 68 },
                    { month: "Apr", value: reportDetail === "Revenue" ? 8100 : reportDetail === "Growth" ? 280 : 90 },
                    { month: "May", value: reportDetail === "Revenue" ? 6300 : reportDetail === "Growth" ? 310 : 78 },
                    { month: "Jun", value: reportDetail === "Revenue" ? 9200 : reportDetail === "Growth" ? 350 : 95 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
                    <XAxis dataKey="month" tick={{ fill: "hsl(215 15% 55%)", fontSize: 12 }} axisLine={false} />
                    <YAxis tick={{ fill: "hsl(215 15% 55%)", fontSize: 12 }} axisLine={false} />
                    <Tooltip contentStyle={{ background: "hsl(220 22% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: 8, color: "#fff" }} />
                    <Bar dataKey="value" fill="hsl(213 80% 55%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {["This Month", "Last Month", "Total"].map((label, i) => (
                    <div key={label} className="bg-secondary rounded-lg p-4">
                      <p className="text-xs text-muted-foreground mb-1">{label}</p>
                      <p className="text-xl font-bold text-foreground">{reportDetail === "Revenue" ? ["$9,200", "$6,300", "$41,100"][i] : reportDetail === "Growth" ? ["350", "310", "1,693"][i] : ["95%", "78%", "81%"][i]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== SETTINGS ===== */}
          {activeTab === "settings" && (
            <div>
              <div className="flex gap-6 mb-6">
                {(["security", "fees", "payroll", "rewards"] as const).map(t => (
                  <button key={t} onClick={() => setSettingsTab(t)} className={`text-sm pb-1 border-b-2 ${settingsTab === t ? "border-deex-blue text-deex-blue font-medium" : "border-transparent text-muted-foreground"}`}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
                {settingsTab === "payroll" && (
                  <button className="ml-auto h-8 px-4 bg-foreground text-background rounded-lg text-sm font-medium">Add member</button>
                )}
              </div>

              {settingsTab === "security" && (
                <div className="bg-card border border-border rounded-xl p-6 max-w-2xl space-y-8">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">Reset password</h3>
                    <p className="text-xs text-muted-foreground mb-2">Considering changing your password?<br />Tap to reset password</p>
                    <button className="text-sm text-deex-blue font-medium hover:underline">Reset Password</button>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">Delete account</h3>
                    <p className="text-xs text-muted-foreground mb-2">This is really sad and we don't want to lose you,<br />but if you really must, tap to delete.</p>
                    <button className="h-9 px-4 bg-destructive/10 text-destructive rounded-lg text-sm font-medium border border-destructive/20 hover:bg-destructive/20">Deactivate account</button>
                  </div>
                </div>
              )}

              {settingsTab === "fees" && (
                <div className="bg-card border border-border rounded-xl p-6 max-w-2xl space-y-4">
                  {[
                    { label: "Crypto Trade Fee", value: "1.0%" },
                    { label: "Gift Card Fee", value: "2.5%" },
                    { label: "Withdrawal Fee", value: "₦50" },
                    { label: "DeeX Pay Fee", value: "0.5%" },
                  ].map(f => (
                    <div key={f.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <p className="text-sm text-foreground">{f.label}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-foreground">{f.value}</span>
                        <button className="text-xs text-deex-blue hover:underline">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {settingsTab === "payroll" && (
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead><tr className="border-b border-border">
                      {["Name", "Email", "Role", "Salary", "Date Created", "Action"].map(h => (
                        <th key={h} className="text-left text-xs text-muted-foreground font-medium px-4 py-3">{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {payrollData.map((p, i) => (
                        <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                          <td className="px-4 py-3 text-sm text-foreground">{p.name}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{p.email}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{p.role}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{p.salary}</td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">{p.created}</td>
                          <td className="px-4 py-3"><button className="text-xs text-destructive hover:underline flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete Staff</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {settingsTab === "rewards" && (
                <div className="bg-card border border-border rounded-xl p-6 max-w-2xl space-y-4">
                  {[
                    { label: "Points per ₦1,000 trade", value: "10 pts" },
                    { label: "Referral bonus", value: "50 pts" },
                    { label: "Point to Naira rate", value: "1 pt = ₦10" },
                    { label: "Min redemption", value: "100 pts" },
                  ].map(r => (
                    <div key={r.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <p className="text-sm text-foreground">{r.label}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-foreground">{r.value}</span>
                        <button className="text-xs text-deex-blue hover:underline">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ===== VIRTUAL CARDS ===== */}
          {activeTab === "virtual-cards" && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Virtual Cards <NewBadge /></h2>
              <p className="text-sm text-muted-foreground mb-4">Manage all user virtual cards, issuance, and limits.</p>

              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Cards Issued", value: "347" },
                  { label: "Active Cards", value: "289" },
                  { label: "Frozen Cards", value: "42" },
                  { label: "Revenue (Fees)", value: "$694" },
                ].map(m => (
                  <div key={m.label} className="bg-card border border-border rounded-xl p-5">
                    <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
                    <p className="text-xl font-bold text-foreground">{m.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-foreground">Recent Card Activity</p>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><Upload className="w-3.5 h-3.5" /> EXPORT</button>
              </div>

              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border">
                    {["User", "Card Label", "Last 4", "Balance", "Status", "Daily Limit", "Created"].map(h => (
                      <th key={h} className="text-left text-xs text-muted-foreground font-medium px-4 py-3">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {[
                      { user: "John Doe", label: "Shopping Card", last4: "4291", balance: "$245.80", status: "ACTIVE", dailyLimit: "$500", created: "Feb 15, 2026" },
                      { user: "John Doe", label: "Subscriptions", last4: "8173", balance: "$52.10", status: "FROZEN", dailyLimit: "$200", created: "Jan 20, 2026" },
                      { user: "Adewale Musa", label: "Main Card", last4: "6502", balance: "$1,200.00", status: "ACTIVE", dailyLimit: "$1,000", created: "Mar 1, 2026" },
                      { user: "Chidinma Obi", label: "Travel", last4: "3817", balance: "$89.50", status: "ACTIVE", dailyLimit: "$500", created: "Feb 28, 2026" },
                      { user: "Divine Omajuwa", label: "Business", last4: "9244", balance: "$3,450.00", status: "ACTIVE", dailyLimit: "$2,000", created: "Jan 15, 2026" },
                    ].map((card, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3 text-sm text-foreground">{card.user}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{card.label}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground font-mono">•••• {card.last4}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{card.balance}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                            card.status === "ACTIVE" ? "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]" : "bg-[hsl(var(--deex-blue))]/20 text-[hsl(var(--deex-blue))]"
                          }`}>{card.status}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{card.dailyLimit}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{card.created}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 bg-card border border-border rounded-xl p-6 max-w-2xl">
                <h3 className="text-sm font-semibold text-foreground mb-4">Card Settings</h3>
                <div className="space-y-4">
                  {[
                    { label: "Card Creation Fee", value: "$2.00" },
                    { label: "Max Cards per User", value: "3" },
                    { label: "Min KYC Level Required", value: "Level 2" },
                    { label: "Default Daily Limit", value: "$500" },
                    { label: "Default Monthly Limit", value: "$5,000" },
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <p className="text-sm text-foreground">{s.label}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-foreground">{s.value}</span>
                        <button className="text-xs text-deex-blue hover:underline">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===== AUDIT LOG ===== */}
          {activeTab === "audit-log" && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Audit Log <NewBadge /></h2>
              <p className="text-sm text-muted-foreground mb-4">Every admin action is recorded here for compliance.</p>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead><tr className="border-b border-border">
                    {["Admin", "Action", "Target", "Details", "Date"].map(h => (
                      <th key={h} className="text-left text-xs text-muted-foreground font-medium px-4 py-3">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {[
                      { admin: "Adedamola A.", action: "Approved KYC", target: "Chibueze Umeh", details: "Level 3 verification", date: "Mar 8, 2026, 8:03 AM" },
                      { admin: "Adedamola A.", action: "Changed Rate", target: "BTC/NGN", details: "₦97,200,000 → ₦97,450,000", date: "Mar 8, 2026, 7:45 AM" },
                      { admin: "Dawood K.", action: "Triggered Payout", target: "Divine Omajuwa", details: "500.05 USDT → ₦767,576.75", date: "Mar 8, 2026, 5:23 PM" },
                      { admin: "Dawood K.", action: "Rejected KYC", target: "Idris Abdullahi", details: "Inconsistent documents", date: "Feb 20, 2026, 12:20 PM" },
                      { admin: "System", action: "Auto Swap", target: "Platform", details: "0.000744 BTC → USDT", date: "Mar 8, 2026, 4:17 PM" },
                      { admin: "Adedamola A.", action: "Updated Fee", target: "Withdrawal Fee", details: "₦25 → ₦50", date: "Mar 7, 2026, 9:30 AM" },
                      { admin: "System", action: "Failed Payout", target: "Victor Odigili", details: "Insufficient balance", date: "Mar 6, 2026, 3:12 PM" },
                      { admin: "Dawood K.", action: "Added Staff", target: "Payroll", details: "Ikegbulam Ugochukwu - Backend Developer", date: "Jan 23, 2026, 11:45 AM" },
                    ].map((log, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3 text-sm text-foreground">{log.admin}</td>
                        <td className="px-4 py-3"><span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                          log.action.includes("Approved") || log.action.includes("Auto") ? "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]" :
                          log.action.includes("Rejected") || log.action.includes("Failed") ? "bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))]" :
                          "bg-[hsl(var(--deex-blue))]/20 text-[hsl(var(--deex-blue))]"
                        }`}>{log.action}</span></td>
                        <td className="px-4 py-3 text-sm text-foreground">{log.target}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{log.details}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{log.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== COMPLIANCE ALERTS ===== */}
          {(activeTab === "compliance" || activeTab === "compliance-alerts") && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Suspicious Activity Alerts <NewBadge /></h2>
              <p className="text-sm text-muted-foreground mb-6">Monitor flagged accounts and take action on compliance violations.</p>

              {/* Stats cards */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Alerts", value: alertStats.total.toString(), color: "text-[hsl(var(--deex-blue))]", bg: "bg-[hsl(var(--deex-blue))]/10" },
                  { label: "Critical", value: alertStats.critical.toString(), color: "text-[hsl(var(--destructive))]", bg: "bg-[hsl(var(--destructive))]/10" },
                  { label: "Pending Review", value: alertStats.pending.toString(), color: "text-[hsl(var(--warning))]", bg: "bg-[hsl(var(--warning))]/10" },
                  { label: "Auto-Suspended", value: alertStats.autoSuspended.toString(), color: "text-[hsl(var(--deex-orange))]", bg: "bg-[hsl(var(--deex-orange))]/10" },
                ].map(s => (
                  <div key={s.label} className="bg-card border border-border rounded-xl p-5">
                    <p className={`text-sm font-medium mb-1 ${s.color}`}>{s.label}</p>
                    <p className="text-2xl font-bold text-foreground">{s.value}</p>
                    <div className={`mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${s.bg} ${s.color}`}>
                      <AlertTriangle className="w-3 h-3" /> Active
                    </div>
                  </div>
                ))}
              </div>

              {/* Filter tabs */}
              <div className="flex items-center gap-2 mb-4">
                {(["all", "pending", "reviewing", "resolved", "dismissed"] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setComplianceFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      complianceFilter === f ? "bg-[hsl(var(--deex-blue))] text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)} {f === "all" ? `(${complianceAlerts.length})` : `(${complianceAlerts.filter(a => a.status === f).length})`}
                  </button>
                ))}
              </div>

              {/* Alerts table */}
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      {["Severity", "User", "Trigger", "Description", "Status", "Date", ""].map(h => (
                        <th key={h} className="text-left text-xs text-muted-foreground font-medium px-4 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAlerts.map(alert => (
                      <tr key={alert.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer" onClick={() => { setSelectedAlert(alert); setActiveTab("compliance-detail"); }}>
                        <td className="px-4 py-3">{severityBadge(alert.severity)}</td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-foreground">{alert.userName}</p>
                            <p className="text-xs text-muted-foreground">{alert.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">{triggerIcon(alert.triggerType)}</span>
                            <span className="text-sm text-foreground">{alert.trigger}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground max-w-[200px] truncate">{alert.description}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            {alertStatusBadge(alert.status)}
                            {alert.autoSuspended && <Ban className="w-3 h-3 text-[hsl(var(--destructive))]" />}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{alert.date}</td>
                        <td className="px-4 py-3"><ChevronRight className="w-4 h-4 text-muted-foreground" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== COMPLIANCE ALERT DETAIL ===== */}
          {activeTab === "compliance-detail" && selectedAlert && (
            <div>
              <button onClick={() => { setActiveTab("compliance-alerts"); setSelectedAlert(null); }} className="text-sm text-[hsl(var(--deex-blue))] mb-4 hover:underline flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" /> Back to Alerts
              </button>

              <div className="flex gap-6">
                {/* Left: Alert info */}
                <div className="flex-1 space-y-4">
                  {/* Alert header */}
                  <div className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {severityBadge(selectedAlert.severity)}
                        {alertStatusBadge(selectedAlert.status)}
                        {selectedAlert.autoSuspended && (
                          <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))] flex items-center gap-1">
                            <Ban className="w-3 h-3" /> AUTO-SUSPENDED
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{selectedAlert.id}</span>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[hsl(var(--deex-blue))]/20 flex items-center justify-center text-base font-bold text-[hsl(var(--deex-blue))]">
                        {selectedAlert.userName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{selectedAlert.userName}</h3>
                        <p className="text-sm text-muted-foreground">{selectedAlert.email}</p>
                      </div>
                    </div>

                    <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-muted-foreground">{triggerIcon(selectedAlert.triggerType)}</span>
                        <h4 className="text-sm font-semibold text-foreground">{selectedAlert.trigger}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{selectedAlert.description}</p>
                    </div>

                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Flagged: {selectedAlert.date}
                    </p>
                  </div>

                  {/* Details grid */}
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h4 className="text-sm font-semibold text-foreground mb-4">Suspicious Activity Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedAlert.details.map(d => (
                        <div key={d.label} className="bg-secondary rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">{d.label}</p>
                          <p className="text-sm font-medium text-foreground">{d.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h4 className="text-sm font-semibold text-foreground mb-4">Event Timeline</h4>
                    <div className="space-y-0">
                      {selectedAlert.timeline.map((event, i) => (
                        <div key={i} className="flex gap-4 relative">
                          <div className="flex flex-col items-center">
                            <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 ${
                              event.actor === "System" ? "bg-[hsl(var(--warning))]" : "bg-[hsl(var(--deex-blue))]"
                            }`} />
                            {i < selectedAlert.timeline.length - 1 && <div className="w-px h-full bg-border min-h-[32px]" />}
                          </div>
                          <div className="pb-4">
                            <p className="text-sm text-foreground">{event.action}</p>
                            <p className="text-xs text-muted-foreground">{event.time} — {event.actor}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="w-80 shrink-0 space-y-4">
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Admin Actions</h4>
                    <div className="space-y-2">
                      <button onClick={() => toast.success("Alert approved — flag cleared")} className="w-full h-9 bg-[hsl(var(--success))]/20 text-[hsl(var(--success))] rounded-lg text-sm font-medium border border-[hsl(var(--success))]/20 hover:bg-[hsl(var(--success))]/30 transition-colors">
                        ✓ Approve / Clear Flag
                      </button>
                      <button onClick={() => toast("Alert dismissed")} className="w-full h-9 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
                        Dismiss Alert
                      </button>
                      <button onClick={() => toast.warning("User account suspended")} className="w-full h-9 bg-[hsl(var(--destructive))]/10 text-[hsl(var(--destructive))] rounded-lg text-sm font-medium border border-[hsl(var(--destructive))]/20 hover:bg-[hsl(var(--destructive))]/20 transition-colors flex items-center justify-center gap-1.5">
                        <Ban className="w-3.5 h-3.5" /> Suspend User
                      </button>
                      <button onClick={() => toast.warning("Wallet frozen for this user")} className="w-full h-9 bg-[hsl(var(--deex-blue))]/10 text-[hsl(var(--deex-blue))] rounded-lg text-sm font-medium border border-[hsl(var(--deex-blue))]/20 hover:bg-[hsl(var(--deex-blue))]/20 transition-colors flex items-center justify-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" /> Freeze Wallet
                      </button>
                      <button onClick={() => toast("KYC re-verification requested")} className="w-full h-9 bg-[hsl(var(--deex-orange))]/10 text-[hsl(var(--deex-orange))] rounded-lg text-sm font-medium border border-[hsl(var(--deex-orange))]/20 hover:bg-[hsl(var(--deex-orange))]/20 transition-colors flex items-center justify-center gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5" /> Request Additional KYC
                      </button>
                      <button onClick={() => toast("Escalated to senior admin")} className="w-full h-9 bg-[hsl(var(--deex-purple))]/10 text-[hsl(var(--deex-purple))] rounded-lg text-sm font-medium border border-[hsl(var(--deex-purple))]/20 hover:bg-[hsl(var(--deex-purple))]/20 transition-colors flex items-center justify-center gap-1.5">
                        <ArrowUpRight className="w-3.5 h-3.5" /> Escalate to Senior Admin
                      </button>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-5">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Internal Notes</h4>
                    <textarea
                      value={complianceNote}
                      onChange={e => setComplianceNote(e.target.value)}
                      placeholder="Add investigation notes..."
                      className="w-full h-24 bg-secondary rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none"
                    />
                    <button
                      onClick={() => { toast.success("Note saved"); setComplianceNote(""); }}
                      className="mt-2 text-xs text-[hsl(var(--deex-blue))] font-medium hover:underline"
                    >Save Note</button>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-5">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Quick Info</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Rule triggered</span>
                        <span className="text-foreground font-medium">{selectedAlert.trigger}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Auto-suspended</span>
                        <span className={`font-medium ${selectedAlert.autoSuspended ? "text-[hsl(var(--destructive))]" : "text-muted-foreground"}`}>{selectedAlert.autoSuspended ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Severity</span>
                        <span className="text-foreground font-medium capitalize">{selectedAlert.severity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== COMPLIANCE RULES ENGINE ===== */}
          {activeTab === "compliance-rules" && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Auto-Suspension Rules Engine <NewBadge /></h2>
              <p className="text-sm text-muted-foreground mb-6">Configure thresholds that trigger automatic flags and suspensions.</p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Active Rules", value: complianceRules.filter(r => r.enabled).length.toString(), color: "text-[hsl(var(--success))]" },
                  { label: "Disabled Rules", value: complianceRules.filter(r => !r.enabled).length.toString(), color: "text-muted-foreground" },
                  { label: "Total Triggers (all time)", value: complianceRules.reduce((sum, r) => sum + r.triggeredCount, 0).toString(), color: "text-[hsl(var(--deex-blue))]" },
                ].map(s => (
                  <div key={s.label} className="bg-card border border-border rounded-xl p-5">
                    <p className={`text-sm font-medium mb-1 ${s.color}`}>{s.label}</p>
                    <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {complianceRules.map(rule => (
                  <div key={rule.id} className={`bg-card border rounded-xl p-5 transition-colors ${rule.enabled ? "border-border" : "border-border opacity-60"}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="text-sm font-semibold text-foreground">{rule.name}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          rule.action.includes("Auto-suspend") ? "bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))]" :
                          rule.action.includes("Hold") ? "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]" :
                          "bg-[hsl(var(--deex-blue))]/20 text-[hsl(var(--deex-blue))]"
                        }`}>{rule.action}</span>
                      </div>
                      <button
                        onClick={() => setComplianceRules(prev => prev.map(r => r.id === rule.id ? { ...r, enabled: !r.enabled } : r))}
                        className={`relative w-11 h-6 rounded-full transition-colors ${rule.enabled ? "bg-[hsl(var(--success))]" : "bg-muted"}`}
                      >
                        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-transform ${rule.enabled ? "left-[22px]" : "left-0.5"}`} />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{rule.trigger}</p>
                    <div className="flex items-center gap-6 text-xs">
                      <div>
                        <span className="text-muted-foreground">Threshold: </span>
                        <span className="text-foreground font-medium">{rule.threshold}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last triggered: </span>
                        <span className="text-foreground font-medium">{rule.lastTriggered}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Times triggered: </span>
                        <span className="text-foreground font-medium">{rule.triggeredCount}</span>
                      </div>
                      <button onClick={() => toast("Threshold editor coming soon")} className="ml-auto text-[hsl(var(--deex-blue))] hover:underline text-xs font-medium">Edit threshold</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "customer-detail" && selectedCustomer && (
            <div>
              <button onClick={() => { setActiveTab("users"); setSelectedCustomer(null); }} className="text-sm text-deex-blue mb-4 hover:underline flex items-center gap-1"><ChevronLeft className="w-4 h-4" /> Back to Users</button>
              <div className="flex gap-6">
                <div className="flex-1">
                  <div className="bg-card border border-border rounded-xl p-6 mb-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-deex-blue/20 flex items-center justify-center text-lg font-bold text-deex-blue">
                        {selectedCustomer.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{selectedCustomer.name} <NewBadge /></h3>
                        <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Phone", value: selectedCustomer.phone },
                        { label: "KYC Level", value: selectedCustomer.kyc },
                        { label: "Created", value: selectedCustomer.created },
                        { label: "Last Login", value: selectedCustomer.lastLogin },
                      ].map(d => (
                        <div key={d.label} className="bg-secondary rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">{d.label}</p>
                          <p className="text-sm font-medium text-foreground">{d.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-foreground mb-3">Transaction History</h3>
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <table className="w-full">
                      <thead><tr className="border-b border-border">
                        {["Type", "Amount", "Status", "Date"].map(h => (
                          <th key={h} className="text-left text-xs text-muted-foreground font-medium px-4 py-3">{h}</th>
                        ))}
                      </tr></thead>
                      <tbody>
                        {[
                          { type: "Sold BTC", amount: "₦450,000", status: "COMPLETED", date: "Mar 8, 2026" },
                          { type: "Deposit USDT", amount: "$500.05", status: "COMPLETED", date: "Mar 8, 2026" },
                          { type: "Airtime MTN", amount: "₦2,000", status: "COMPLETED", date: "Mar 7, 2026" },
                        ].map((tx, i) => (
                          <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30">
                            <td className="px-4 py-3 text-sm text-foreground">{tx.type}</td>
                            <td className="px-4 py-3 text-sm text-foreground">{tx.amount}</td>
                            <td className="px-4 py-3">{statusBadge(tx.status)}</td>
                            <td className="px-4 py-3 text-xs text-muted-foreground">{tx.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="w-72 shrink-0 space-y-4">
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Actions</h4>
                    <div className="space-y-2">
                      <button onClick={() => toast.success("Notification sent")} className="w-full h-9 bg-deex-blue text-primary-foreground rounded-lg text-sm font-medium">Send Notification</button>
                      <button onClick={() => toast("Password reset link sent")} className="w-full h-9 bg-secondary text-foreground rounded-lg text-sm font-medium">Reset Password</button>
                      <button onClick={() => toast.warning("User banned")} className="w-full h-9 bg-destructive/10 text-destructive rounded-lg text-sm font-medium border border-destructive/20">Ban User</button>
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Notes</h4>
                    <textarea placeholder="Add internal notes..." className="w-full h-24 bg-secondary rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none" />
                    <button onClick={() => toast.success("Note saved")} className="mt-2 text-xs text-deex-blue font-medium hover:underline">Save Note</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

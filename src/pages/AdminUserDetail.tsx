import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, ChevronDown, Upload, Copy, Check,
  LayoutDashboard, Wallet, ShoppingCart, Users, Shield, ListChecks, BarChart3,
  Settings, LogOut, Bell, CreditCard, FileText
} from "lucide-react";
import CryptoIcon from "@/components/CryptoIcon";
import { toast } from "sonner";

// ===== SIDEBAR NAV (shared with AdminPanel) =====
const NewBadge = () => (
  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider bg-[hsl(var(--warning))] text-background uppercase animate-pulse ml-1">NEW</span>
);

type SidebarTab = "dashboard" | "wallets" | "orders" | "users" | "kyc" | "virtual-cards" | "audit-log" | "reports" | "settings";

const sidebarItems: { icon: typeof LayoutDashboard; label: string; tab: SidebarTab; isNew?: boolean; hasChildren?: boolean }[] = [
  { icon: LayoutDashboard, label: "Dashboard", tab: "dashboard" },
  { icon: Wallet, label: "Wallets", tab: "wallets" },
  { icon: ShoppingCart, label: "Orders", tab: "orders" },
  { icon: CreditCard, label: "Virtual Cards", tab: "virtual-cards", isNew: true },
  { icon: Users, label: "Users", tab: "users" },
  { icon: Shield, label: "Kyc logs", tab: "kyc", hasChildren: true },
  { icon: FileText, label: "Audit Log", tab: "audit-log", isNew: true },
  { icon: BarChart3, label: "Reports", tab: "reports" },
  { icon: Settings, label: "Settings", tab: "settings" },
];

// ===== MOCK USER DATA =====
const mockUser = {
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

const userTransactions = [
  { asset: "ETH", type: "Deex-Deposits", amount: "0.041 ETH", txId: "69addc03d54ca8190d9d122f", date: "Mar 8th, 2026 | 9:28 PM", status: "COMPLETED" },
  { asset: "USDT", type: "Deex-Deposits", amount: "200.00 USDT", txId: "69adc991210aef2d6390a7f2", date: "Mar 8th, 2026 | 8:10 PM", status: "COMPLETED" },
  { asset: "USDT", type: "Deex-Deposits", amount: "497.769 USDT", txId: "69adc856210aef2d63908822", date: "Mar 8th, 2026 | 8:04 PM", status: "COMPLETED" },
  { asset: "BTC", type: "Deex-Asset-Swaps", amount: "0.000824\nBTC → USDT", txId: "69adbfce210aef2d638f8ddb", date: "Mar 8th, 2026 | 7:28 PM", status: "COMPLETED" },
  { asset: "BTC", type: "Deex-Deposits", amount: "0.000824 BTC", txId: "69adbfb6210aef2d638f7488", date: "Mar 8th, 2026 | 7:28 PM", status: "COMPLETED" },
  { asset: "USDT", type: "Deex-Deposits", amount: "500.05 USDT", txId: "69ada29b210aef2d638c0177", date: "Mar 8th, 2026 | 5:23 PM", status: "COMPLETED" },
  { asset: "BTC", type: "Deex-Asset-Swaps", amount: "0.000744\nBTC → USDT", txId: "69ad930c210aef2d638af259", date: "Mar 8th, 2026 | 4:17 PM", status: "COMPLETED" },
  { asset: "BTC", type: "Deex-Deposits", amount: "0.000744 BTC", txId: "69ad929f210aef2d638ad6f1", date: "Mar 8th, 2026 | 4:15 PM", status: "COMPLETED" },
];

const userActivities = [
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

const activityCategoryColors: Record<string, string> = {
  auth: "bg-[hsl(var(--deex-blue))]/20 text-[hsl(var(--deex-blue))]",
  wallet: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]",
  trade: "bg-[hsl(var(--deex-orange))]/20 text-[hsl(var(--deex-orange))]",
  kyc: "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]",
  security: "bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))]",
  settings: "bg-muted text-muted-foreground",
  referral: "bg-[hsl(var(--deex-teal))]/20 text-[hsl(var(--deex-teal))]",
  reward: "bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))]",
};

const userRewards = [
  { date: "Aug 13th, 2025 | 2:07 AM", activity: "Points awarded", description: "Referral bonus — ozegbeandrew@gmail.com signed up", amount: 300 },
  { date: "Aug 29th, 2025 | 6:26 AM", activity: "Points awarded", description: "Referral bonus — abm65858@gmail.com signed up", amount: 300 },
  { date: "Sep 2nd, 2025 | 11:14 AM", activity: "Points awarded", description: "Trade streak reward — 7-day consecutive trading", amount: 300 },
  { date: "Sep 14th, 2025 | 11:13 AM", activity: "Points awarded", description: "Weekly cashback — ₦10,000 target met", amount: 300 },
  { date: "Sep 22nd, 2025 | 2:29 PM", activity: "Points awarded", description: "First deposit bonus — deposited 500 USDT", amount: 300 },
  { date: "Sep 24th, 2025 | 3:51 PM", activity: "Points awarded", description: "KYC Level 3 completion bonus", amount: 300 },
  { date: "Oct 2nd, 2025 | 12:22 AM", activity: "Points awarded", description: "Referral trade bonus — markkmnn2@gmail.com completed first trade", amount: 300 },
];

const userTasks = [
  { task: "Complete KYC Level 3", status: "Completed", date: "Feb 25th, 2026" },
  { task: "First Deposit", status: "Completed", date: "Jan 10th, 2026" },
  { task: "Verify Email", status: "Completed", date: "Jul 1st, 2024" },
  { task: "Enable 2FA", status: "Pending", date: "—" },
  { task: "Add Bank Account", status: "Completed", date: "Jul 3rd, 2024" },
];

const userReferrals = [
  { date: "Jul 1st, 2024 | 3:56 AM", email: "paursgenius@gmail.com", pointsEarned: 300, status: "Active" },
  { date: "Jun 19th, 2024 | 11:55 PM", email: "benjaminchibuike002@mail.com", pointsEarned: 300, status: "Active" },
  { date: "Jun 20th, 2024 | 10:24 PM", email: "sundaykenzo@gmail.com", pointsEarned: 0, status: "Signed up" },
  { date: "Jul 2nd, 2024 | 6:39 PM", email: "markkmnn2@gmail.com", pointsEarned: 600, status: "Active" },
  { date: "Jul 5th, 2024 | 9:00 PM", email: "generalpaul954@gmail.com", pointsEarned: 0, status: "Inactive" },
  { date: "Aug 13th, 2025 | 5:18 PM", email: "ozegbeandrew@gmail.com", pointsEarned: 300, status: "Active" },
  { date: "Aug 20th, 2025 | 7:18 PM", email: "abm65858@gmail.com", pointsEarned: 300, status: "Active" },
];

const kycLevel1 = {
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

const kycLevel3 = {
  type: "Driver's License",
  status: "Approved",
  country: "Nigeria",
  address: "19b, Cbn Choos Estate Mtn Mast.",
};

const holdingBalance = [
  { symbol: "BTC", amount: "0.002481 BTC", usd: "$167.12" },
  { symbol: "ETH", amount: "0.041 ETH", usd: "$79.29" },
  { symbol: "USDT", amount: "1,247.819 USDT", usd: "$1,247.82" },
  { symbol: "SOL", amount: "0.000 SOL", usd: "$0.00" },
  { symbol: "DOGE", amount: "0.000 DOGE", usd: "$0.00" },
];

const statusBadge = (status: string) => {
  const s = status.toUpperCase();
  const styles: Record<string, string> = {
    COMPLETED: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]",
    APPROVED: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]",
    CONFIRMED: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]",
    REJECTED: "bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))]",
    PENDING: "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]",
  };
  return <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wider ${styles[s] || "bg-muted text-muted-foreground"}`}>{s}</span>;
};

type UserTab = "info" | "transactions" | "activities" | "rewards" | "task" | "referrals" | "kyc";
type SummaryTab = "user-summary" | "holding-balance";
type KycLevel = "level1" | "level2" | "level3";

const AdminUserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [actionOpen, setActionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<UserTab>("info");
  const [summaryTab, setSummaryTab] = useState<SummaryTab>("user-summary");
  const [kycLevel, setKycLevel] = useState<KycLevel>("level1");
  const [autoPay, setAutoPay] = useState(mockUser.autoPay);
  const [autoWithdrawal, setAutoWithdrawal] = useState(mockUser.autoWithdrawal);
  const [copied, setCopied] = useState(false);
  const [kycExpanded, setKycExpanded] = useState(false);
  const [nudgedTasks, setNudgedTasks] = useState<Record<number, boolean>>({});
  const [confirmAction, setConfirmAction] = useState<{ label: string; description: string; onConfirm: () => void; destructive?: boolean } | null>(null);
  const [activityFilter, setActivityFilter] = useState<string>("all");
  const [isInfluencer, setIsInfluencer] = useState(true);
  const [influencerConfig, setInfluencerConfig] = useState({ minTrade: "150", profitShare: "30" });
  const [editingInfluencerConfig, setEditingInfluencerConfig] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAction = (action: string) => {
    setActionOpen(false);
    switch (action) {
      case "send-message":
        toast.success("Message dialog opened (mock)");
        break;
      case "award-points":
        toast.success("500 points awarded to " + mockUser.name);
        break;
      case "remove-otc":
        toast.success("OTC trader status removed for " + mockUser.name);
        break;
      case "make-influencer":
        toast.success(mockUser.name + " marked as Influencer ✅");
        break;
      case "suspend":
        toast.error(mockUser.name + " has been suspended");
        break;
    }
  };

  const userTabs: { key: UserTab; label: string }[] = [
    { key: "info", label: "Info" },
    { key: "transactions", label: "Transactions" },
    { key: "activities", label: "Activities" },
    { key: "rewards", label: "Rewards" },
    { key: "task", label: "Task" },
    { key: "referrals", label: "Referrals" },
    { key: "kyc", label: "KYC" },
  ];

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
          {sidebarItems.map((item) => (
            <div key={item.tab}>
              <button
                onClick={() => {
                  if (item.hasChildren) {
                    setKycExpanded(!kycExpanded);
                  } else {
                    navigate("/admin");
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  item.tab === "users" ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-[18px] h-[18px]" />
                  <span>{item.label}</span>
                  {item.isNew && <NewBadge />}
                </div>
                {item.hasChildren && <ChevronDown className={`w-4 h-4 transition-transform ${kycExpanded ? "rotate-180" : ""}`} />}
              </button>
            </div>
          ))}
        </nav>
        <div className="p-2 border-t border-border">
          <button onClick={() => navigate("/login")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-[18px] h-[18px]" /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-foreground">
            <span className="text-muted-foreground">—</span>
            <h1 className="text-base font-semibold">Users</h1>
          </div>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-muted-foreground cursor-pointer" />
            <div className="w-8 h-8 rounded-full bg-deex-blue/30 flex items-center justify-center text-xs font-bold text-deex-blue">AD</div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {/* Close button */}
          <div className="flex justify-end mb-2">
            <button onClick={() => navigate("/admin")} className="text-deex-blue hover:text-foreground transition-colors">✕</button>
          </div>

          {/* User header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-deex-teal/30 flex items-center justify-center text-lg font-bold text-deex-teal">
                {mockUser.initials}
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{mockUser.name}</h2>
                <p className="text-sm text-deex-blue">{mockUser.email}</p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setActionOpen(!actionOpen)}
                className="flex items-center gap-2 px-5 py-2.5 border border-deex-blue text-deex-blue rounded-lg text-sm font-medium hover:bg-deex-blue/10 transition-colors"
              >
                Action <ChevronDown className={`w-4 h-4 transition-transform ${actionOpen ? "rotate-180" : ""}`} />
              </button>
              {actionOpen && (
                <div className="absolute right-0 top-12 w-52 bg-card border border-border rounded-xl shadow-lg py-2 z-20">
                  <button onClick={() => handleAction("send-message")} className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors">Send message</button>
                  <button onClick={() => handleAction("award-points")} className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors">Award points</button>
                  <button onClick={() => handleAction("remove-otc")} className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors">Remove OTC trader</button>
                  <button onClick={() => handleAction("make-influencer")} className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors flex items-center gap-2">Make Influencer <span className="text-deex-blue">✓</span></button>
                  <div className="h-px bg-border my-1" />
                  <button onClick={() => handleAction("suspend")} className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-secondary transition-colors">Suspend user</button>
                </div>
              )}
            </div>
          </div>

          {/* Summary tabs */}
          <div className="flex gap-6 mb-4 border-b border-border">
            <button onClick={() => setSummaryTab("user-summary")} className={`text-sm pb-2 border-b-2 ${summaryTab === "user-summary" ? "border-deex-blue text-deex-blue font-medium" : "border-transparent text-muted-foreground"}`}>User summary</button>
            <button onClick={() => setSummaryTab("holding-balance")} className={`text-sm pb-2 border-b-2 ${summaryTab === "holding-balance" ? "border-deex-blue text-deex-blue font-medium" : "border-transparent text-muted-foreground"}`}>Holding Balance</button>
          </div>

          {summaryTab === "user-summary" && (
            <>
              {/* Summary cards */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-sm text-deex-orange mb-1">Total transaction payout</p>
                  <p className="text-xl font-bold text-foreground">{mockUser.totalPayout}</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-sm text-destructive mb-1">Total referrals</p>
                  <p className="text-xl font-bold text-foreground">{mockUser.totalReferrals}</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-sm text-deex-orange mb-1">Points earned</p>
                  <p className="text-xl font-bold text-foreground">{mockUser.pointsEarned}</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-sm text-destructive mb-1">Total commission earned</p>
                  <p className="text-xl font-bold text-foreground">{mockUser.totalCommission}</p>
                </div>
              </div>

              {/* Activity header */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-foreground">Activity</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <label className="flex items-center gap-2 cursor-pointer" onClick={() => setAutoPay(!autoPay)}>
                    <div className={`w-8 h-4 rounded-full flex items-center transition-colors ${autoPay ? "bg-deex-blue" : "bg-muted"}`}>
                      <div className={`w-3.5 h-3.5 rounded-full bg-foreground transition-transform ${autoPay ? "translate-x-4" : "translate-x-0.5"}`} />
                    </div>
                    AUTO PAY: {autoPay ? "ON" : "OFF"}
                  </label>
                  <span>|</span>
                  <label className="flex items-center gap-2 cursor-pointer" onClick={() => setAutoWithdrawal(!autoWithdrawal)}>
                    <div className={`w-8 h-4 rounded-full flex items-center transition-colors ${autoWithdrawal ? "bg-deex-blue" : "bg-muted"}`}>
                      <div className={`w-3.5 h-3.5 rounded-full bg-foreground transition-transform ${autoWithdrawal ? "translate-x-4" : "translate-x-0.5"}`} />
                    </div>
                    AUTO WITHDRAWAL: {autoWithdrawal ? "ON" : "OFF"}
                  </label>
                  <span>|</span>
                  <button className="flex items-center gap-1 hover:text-foreground"><Upload className="w-3.5 h-3.5" /> EXPORT</button>
                </div>
              </div>

              {/* User tabs */}
              <div className="flex gap-6 mb-6 border-b border-border">
                {userTabs.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key)}
                    className={`text-sm pb-2 border-b-2 transition-colors ${activeTab === t.key ? "border-deex-blue text-deex-blue font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* ===== INFO TAB ===== */}
              {activeTab === "info" && (
                <div className="space-y-6">
                  <div className="flex items-start gap-16">
                    <p className="text-sm text-foreground font-medium w-44 shrink-0">Full Name</p>
                    <div className="flex gap-8 flex-1">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">First Name</p>
                        <div className="h-11 bg-secondary rounded-lg px-4 flex items-center text-sm text-foreground">{mockUser.firstName}</div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground mb-1">Last Name</p>
                        <div className="h-11 bg-secondary rounded-lg px-4 flex items-center text-sm text-foreground">{mockUser.lastName}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-16">
                    <p className="text-sm text-foreground font-medium w-44 shrink-0">Email Address</p>
                    <div className="flex-1 h-11 bg-secondary rounded-lg px-4 flex items-center text-sm text-muted-foreground">{mockUser.email}</div>
                  </div>
                  <div className="flex items-center gap-16">
                    <p className="text-sm text-foreground font-medium w-44 shrink-0">Phone Number</p>
                    <div className="flex-1 h-11 bg-secondary rounded-lg px-4 flex items-center text-sm text-foreground">{mockUser.phone}</div>
                  </div>
                  <div className="flex items-center gap-16">
                    <p className="text-sm text-foreground font-medium w-44 shrink-0">Customer Type</p>
                    <div className="flex-1 h-11 bg-secondary rounded-lg px-4 flex items-center text-sm text-muted-foreground">{mockUser.customerType}</div>
                  </div>
                  <div className="flex items-center gap-16">
                    <p className="text-sm text-foreground font-medium w-44 shrink-0">Referral Links</p>
                    <div className="flex-1 h-11 bg-secondary rounded-lg px-4 flex items-center justify-between text-sm text-muted-foreground">
                      <span className="truncate">{mockUser.referralLink}</span>
                      <button onClick={() => handleCopy(mockUser.referralLink)} className="ml-2 shrink-0">
                        {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-16">
                    <p className="text-sm text-foreground font-medium w-44 shrink-0">Linked account number</p>
                    <div className="flex gap-8 flex-1">
                      {mockUser.linkedAccounts.map((a, i) => (
                        <div key={i} className="flex-1">
                          <div className="h-11 bg-secondary rounded-lg px-4 flex items-center text-sm text-foreground">{a.accountNumber}</div>
                          <p className="text-xs text-muted-foreground mt-1">{a.bank} — {a.accountName}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ===== TRANSACTIONS TAB ===== */}
              {activeTab === "transactions" && (
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        {["Asset", "Type", "Amount", "Trans ID", "Date", "Status"].map(h => (
                          <th key={h} className="text-left text-xs text-muted-foreground font-medium px-4 py-3">
                            {h} {["Asset", "Amount", "Date"].includes(h) && <span className="inline-block ml-0.5">↕</span>}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {userTransactions.map((t, i) => (
                        <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                          <td className="px-4 py-3"><div className="flex items-center gap-2"><CryptoIcon symbol={t.asset} size="sm" /><span className="text-sm text-foreground">{t.asset}</span></div></td>
                          <td className="px-4 py-3 text-sm text-foreground">{t.type}</td>
                          <td className="px-4 py-3 text-sm text-foreground whitespace-pre-line">{t.amount}</td>
                          <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{t.txId}</td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">{t.date}</td>
                          <td className="px-4 py-3">{statusBadge(t.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* ===== ACTIVITIES TAB (Audit Log) ===== */}
              {activeTab === "activities" && (
                <div>
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    {["all", "auth", "wallet", "trade", "kyc", "security", "settings", "referral", "reward"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActivityFilter(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activityFilter === cat ? "bg-[hsl(var(--deex-blue))] text-background" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                      >
                        {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </button>
                    ))}
                  </div>
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          {["Time", "Category", "Event", "Details", "IP Address"].map(h => (
                            <th key={h} className="text-left text-xs text-muted-foreground font-medium px-4 py-3">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {userActivities
                          .filter(a => activityFilter === "all" || a.category === activityFilter)
                          .map((a, i) => (
                          <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                            <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{a.time}</td>
                            <td className="px-4 py-3">
                              <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wider ${activityCategoryColors[a.category] || "bg-muted text-muted-foreground"}`}>
                                {a.category.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-foreground">{a.type}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{a.desc}</td>
                            <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{a.ip}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ===== REWARDS TAB ===== */}
              {activeTab === "rewards" && (
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        {["Date", "Activity", "Description", "Amount"].map(h => (
                          <th key={h} className={`text-xs text-muted-foreground font-medium px-4 py-3 ${h === "Amount" ? "text-right" : "text-left"}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {userRewards.map((r, i) => (
                        <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                          <td className="px-4 py-3 text-sm text-muted-foreground">{r.date}</td>
                          <td className="px-4 py-3 text-sm text-foreground">{r.activity}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{r.description}</td>
                          <td className="px-4 py-3 text-sm text-foreground text-right">{r.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* ===== TASK TAB ===== */}
              {activeTab === "task" && (
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        {["Task", "Status", "Date Completed", "Action"].map(h => (
                          <th key={h} className={`text-xs text-muted-foreground font-medium px-4 py-3 ${h === "Action" ? "text-right" : "text-left"}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {userTasks.map((t, i) => (
                        <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                          <td className="px-4 py-3 text-sm text-foreground">{t.task}</td>
                          <td className="px-4 py-3">{statusBadge(t.status === "Completed" ? "COMPLETED" : "PENDING")}</td>
                          <td className="px-4 py-3 text-xs text-muted-foreground">{t.date}</td>
                          <td className="px-4 py-3 text-right">
                            {t.status === "Pending" ? (
                              nudgedTasks[i] ? (
                                <span className="text-xs text-[hsl(var(--success))]">✓ Nudged</span>
                              ) : (
                                <button
                                  onClick={() => setConfirmAction({
                                    label: "Nudge User",
                                    description: `Send a push notification to ${mockUser.name} to complete "${t.task}"?`,
                                    onConfirm: () => {
                                      setNudgedTasks(prev => ({ ...prev, [i]: true }));
                                      setConfirmAction(null);
                                    }
                                  })}
                                  className="text-xs px-3 py-1.5 rounded-lg bg-[hsl(var(--deex-blue))]/10 text-[hsl(var(--deex-blue))] hover:bg-[hsl(var(--deex-blue))]/20 font-medium transition-colors"
                                >
                                  Nudge
                                </button>
                              )
                            ) : (
                              <span className="text-xs text-muted-foreground">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* ===== REFERRALS TAB ===== */}
              {activeTab === "referrals" && (
                <div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-card border border-border rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Total Referrals</p>
                      <p className="text-xl font-bold text-foreground">{userReferrals.length}</p>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Total Points Earned</p>
                      <p className="text-xl font-bold text-primary">{userReferrals.reduce((sum, r) => sum + r.pointsEarned, 0).toLocaleString()}</p>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">Active Referrals</p>
                      <p className="text-xl font-bold text-[hsl(var(--success))]">{userReferrals.filter(r => r.status === "Active").length}</p>
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          {["Date", "Email", "Status", "Points Earned"].map(h => (
                            <th key={h} className={`text-xs text-muted-foreground font-medium px-4 py-3 ${h === "Points Earned" ? "text-right" : "text-left"}`}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {userReferrals.map((r, i) => (
                          <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                            <td className="px-4 py-3 text-sm text-muted-foreground">{r.date}</td>
                            <td className="px-4 py-3 text-sm text-foreground">{r.email}</td>
                            <td className="px-4 py-3">
                              <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                                r.status === "Active" ? "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]" :
                                r.status === "Signed up" ? "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]" :
                                "bg-muted text-muted-foreground"
                              }`}>{r.status}</span>
                            </td>
                            <td className="px-4 py-3 text-sm text-foreground text-right">{r.pointsEarned > 0 ? `+${r.pointsEarned} pts` : "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ===== KYC TAB ===== */}
              {activeTab === "kyc" && (
                <div>
                  <div className="flex gap-6 mb-6 border-b border-border">
                    {(["level1", "level2", "level3"] as KycLevel[]).map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setKycLevel(lvl)}
                        className={`text-sm pb-2 border-b-2 transition-colors ${kycLevel === lvl ? "border-deex-blue text-deex-blue font-medium" : "border-transparent text-muted-foreground"}`}
                      >
                        {lvl === "level1" ? "Level 1" : lvl === "level2" ? "Level 2" : "Level 3"}
                      </button>
                    ))}
                  </div>

                  {kycLevel === "level1" && (
                    <div className="bg-card border border-border rounded-xl p-6">
                      <p className="text-xs text-muted-foreground mb-4">Profile Completion</p>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-deex-teal/30 flex items-center justify-center text-xl font-bold text-deex-teal">{mockUser.initials}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-x-12 gap-y-0">
                        {/* Personal */}
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-4">PERSONAL</p>
                          <div className="space-y-3">
                            {Object.entries(kycLevel1.personal).map(([key, val]) => (
                              <div key={key} className="flex items-center justify-between py-1">
                                <span className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                <span className={`text-sm ${key === "email" || key === "emailVerification" || key === "firstName" || key === "lastName" || key === "deexTag" || key === "accountName" || key === "customerId" ? "text-deex-blue" : "text-foreground"}`}>{val}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Next of Kin + IP */}
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-4">Next of KIN</p>
                          <div className="space-y-3">
                            {Object.entries(kycLevel1.nextOfKin).map(([key, val]) => (
                              <div key={key} className="flex items-center justify-between py-1">
                                <span className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                <span className="text-sm text-destructive">{val}</span>
                              </div>
                            ))}
                          </div>
                          <p className="text-xs font-semibold text-muted-foreground tracking-wider mt-6 mb-4">IP and DEVICE</p>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between py-1">
                              <span className="text-sm text-muted-foreground">Device</span>
                              <span className="text-sm text-foreground">{kycLevel1.ipDevice.device}</span>
                            </div>
                            <div className="flex items-center justify-between py-1">
                              <span className="text-sm text-muted-foreground">IP</span>
                              <span className="text-sm text-foreground">{kycLevel1.ipDevice.ip}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {kycLevel === "level2" && (
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-base font-bold text-foreground mb-4">KYC Level 2</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">BVN Verification</span><span className="text-sm text-success">Verified</span></div>
                        <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">NIN Verification</span><span className="text-sm text-success">Verified</span></div>
                        <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">Date Submitted</span><span className="text-sm text-foreground">Jul 3rd, 2024</span></div>
                        <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">Status</span>{statusBadge("APPROVED")}</div>
                      </div>
                    </div>
                  )}

                  {kycLevel === "level3" && (
                    <div className="bg-card border border-border rounded-xl p-6">
                      <h3 className="text-base font-bold text-foreground mb-2">KYC Level 3</h3>
                      <p className="text-xs text-muted-foreground tracking-wider mb-4">GOVT ID</p>
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">Type</span><span className="text-sm text-foreground">{kycLevel3.type}</span></div>
                        <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">Status</span><span className="text-sm text-success">{kycLevel3.status}</span></div>
                        <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">Country</span><span className="text-sm text-deex-blue">{kycLevel3.country}</span></div>
                        <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">Residential Address</span><span className="text-sm text-foreground">{kycLevel3.address}</span></div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-[10px] text-muted-foreground tracking-wider mb-2">ID CARD</p>
                          <div className="h-32 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground text-xs">📄 Document</div>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground tracking-wider mb-2">PROOF OF ADDRESS (RESIDENCE)</p>
                          <div className="h-32 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground text-xs">📄 Document</div>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground tracking-wider mb-2">LIVENESS CHECK</p>
                          <div className="h-32 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground text-xs">📸 Selfie</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* ===== HOLDING BALANCE TAB ===== */}
          {summaryTab === "holding-balance" && (
            <div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">Total Holdings (USD)</p>
                  <p className="text-2xl font-bold text-foreground">$1,494.23</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">Assets Held</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">Largest Holding</p>
                  <p className="text-2xl font-bold text-foreground">USDT</p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      {["Asset", "Amount", "USD Value"].map(h => (
                        <th key={h} className={`text-xs text-muted-foreground font-medium px-4 py-3 ${h === "USD Value" ? "text-right" : "text-left"}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {holdingBalance.map((h, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <CryptoIcon symbol={h.symbol} size="sm" />
                            <span className="text-sm font-medium text-foreground">{h.symbol}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground">{h.amount}</td>
                        <td className="px-4 py-3 text-sm text-foreground text-right">{h.usd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setConfirmAction(null)}>
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md shadow-lg" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-foreground mb-2">{confirmAction.label}</h3>
            <p className="text-sm text-muted-foreground mb-6">{confirmAction.description}</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmAction(null)} className="px-4 py-2 rounded-lg text-sm font-medium bg-secondary text-foreground hover:bg-secondary/80 transition-colors">Cancel</button>
              <button onClick={confirmAction.onConfirm} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${confirmAction.destructive ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "bg-[hsl(var(--deex-blue))] text-background hover:bg-[hsl(var(--deex-blue))]/90"}`}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserDetail;

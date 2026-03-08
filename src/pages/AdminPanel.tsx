import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, ArrowLeftRight, Settings, Gift, Receipt, ChevronDown,
  Search, Bell, Eye, EyeOff, TrendingUp, TrendingDown, CheckCircle, Clock,
  XCircle, ChevronRight, LogOut, FileText, DollarSign, Shield, BarChart3, Menu, X
} from "lucide-react";
import PageTransition from "@/components/PageTransition";

// --- Mock data ---
const stats = [
  { label: "Total Users", value: "12,458", change: "+4.2%", up: true, icon: Users },
  { label: "Total Volume", value: "₦845M", change: "+12.5%", up: true, icon: BarChart3 },
  { label: "Pending Trades", value: "34", change: "-8%", up: false, icon: Clock },
  { label: "Revenue", value: "₦12.4M", change: "+6.1%", up: true, icon: DollarSign },
];

const recentUsers = [
  { id: 1, name: "John Doe", email: "johndoe@email.com", kyc: "Verified", status: "Active", date: "Mar 8, 2026" },
  { id: 2, name: "Jane Smith", email: "janesmith@email.com", kyc: "Pending", status: "Active", date: "Mar 7, 2026" },
  { id: 3, name: "Mike Johnson", email: "mikej@email.com", kyc: "Rejected", status: "Suspended", date: "Mar 6, 2026" },
  { id: 4, name: "Sarah Williams", email: "sarahw@email.com", kyc: "Verified", status: "Active", date: "Mar 5, 2026" },
  { id: 5, name: "David Brown", email: "davidb@email.com", kyc: "Pending", status: "Active", date: "Mar 5, 2026" },
];

const recentTrades = [
  { id: "TXN-001", user: "John Doe", type: "Sell BTC", amount: "0.5 BTC", ngn: "₦48,725,000", status: "Completed", date: "Mar 8, 2:30 PM" },
  { id: "TXN-002", user: "Jane Smith", type: "Sell USDT", amount: "5,000 USDT", ngn: "₦7,675,000", status: "Pending", date: "Mar 8, 1:15 PM" },
  { id: "TXN-003", user: "Mike Johnson", type: "Gift Card", amount: "$200 Apple", ngn: "₦290,000", status: "Pending", date: "Mar 8, 12:00 PM" },
  { id: "TXN-004", user: "Sarah Williams", type: "Sell ETH", amount: "2.0 ETH", ngn: "₦11,660,000", status: "Completed", date: "Mar 7, 4:20 PM" },
  { id: "TXN-005", user: "David Brown", type: "Bill Payment", amount: "₦5,000", ngn: "₦5,000", status: "Completed", date: "Mar 7, 3:00 PM" },
];

const giftCardSubmissions = [
  { id: "GC-001", user: "John Doe", brand: "Apple", value: "$200", rate: "₦1,450/$", payout: "₦290,000", status: "Pending", date: "Mar 8" },
  { id: "GC-002", user: "Jane Smith", brand: "Google Play", value: "$100", rate: "₦1,400/$", payout: "₦140,000", status: "Approved", date: "Mar 7" },
  { id: "GC-003", user: "Mike Johnson", brand: "Amazon", value: "$500", rate: "₦1,350/$", payout: "₦675,000", status: "Rejected", date: "Mar 7" },
];

const rateSettings = [
  { asset: "BTC", buyRate: "₦97,450,000", sellRate: "₦96,500,000", fee: "1.0%" },
  { asset: "ETH", buyRate: "₦5,830,000", sellRate: "₦5,780,000", fee: "1.0%" },
  { asset: "USDT", buyRate: "₦1,535", sellRate: "₦1,520", fee: "0.5%" },
  { asset: "USDC", buyRate: "₦1,530", sellRate: "₦1,515", fee: "0.5%" },
];

type Tab = "dashboard" | "users" | "transactions" | "giftcards" | "rates" | "settings";

const navItems: { icon: typeof LayoutDashboard; label: string; tab: Tab }[] = [
  { icon: LayoutDashboard, label: "Dashboard", tab: "dashboard" },
  { icon: Users, label: "Users & KYC", tab: "users" },
  { icon: ArrowLeftRight, label: "Transactions", tab: "transactions" },
  { icon: Gift, label: "Gift Cards", tab: "giftcards" },
  { icon: DollarSign, label: "Rates", tab: "rates" },
  { icon: Settings, label: "Settings", tab: "settings" },
];

const statusBadge = (status: string) => {
  const styles: Record<string, string> = {
    Completed: "bg-success/20 text-success",
    Approved: "bg-success/20 text-success",
    Active: "bg-success/20 text-success",
    Verified: "bg-success/20 text-success",
    Pending: "bg-warning/20 text-warning",
    Rejected: "bg-destructive/20 text-destructive",
    Suspended: "bg-destructive/20 text-destructive",
  };
  return <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${styles[status] || "bg-muted text-muted-foreground"}`}>{status}</span>;
};

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-64" : "w-0 overflow-hidden"} bg-card border-r border-border transition-all duration-300 flex flex-col shrink-0`}>
        <div className="p-5 border-b border-border">
          <h1 className="text-xl font-bold text-primary">DeeX Admin</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Back Office</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.tab ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <button onClick={() => navigate("/login")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="w-5 h-5" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users, transactions..."
                className="h-9 w-72 bg-secondary rounded-lg pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-destructive rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">A</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <PageTransition>
            {activeTab === "dashboard" && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-card border border-border rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <s.icon className="w-5 h-5 text-muted-foreground" />
                        <div className={`flex items-center gap-1 text-xs font-medium ${s.up ? "text-success" : "text-destructive"}`}>
                          {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {s.change}
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-foreground">{s.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-sm font-semibold text-foreground mb-3">Recent Trades</h3>
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead><tr className="border-b border-border">
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">ID</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">User</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Type</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Amount</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">NGN</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Status</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Date</th>
                      </tr></thead>
                      <tbody>
                        {recentTrades.map((t) => (
                          <tr key={t.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                            <td className="px-4 py-3 text-sm text-primary font-mono">{t.id}</td>
                            <td className="px-4 py-3 text-sm text-foreground">{t.user}</td>
                            <td className="px-4 py-3 text-sm text-foreground">{t.type}</td>
                            <td className="px-4 py-3 text-sm text-foreground">{t.amount}</td>
                            <td className="px-4 py-3 text-sm font-medium text-foreground">{t.ngn}</td>
                            <td className="px-4 py-3">{statusBadge(t.status)}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{t.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "users" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Users & KYC</h2>
                  <div className="flex gap-2">
                    {["All", "Verified", "Pending", "Rejected"].map((f) => (
                      <button key={f} className="px-3 py-1.5 rounded-full text-xs bg-secondary text-muted-foreground hover:bg-primary/15 hover:text-primary transition-colors">{f}</button>
                    ))}
                  </div>
                </div>
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead><tr className="border-b border-border">
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Name</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Email</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">KYC</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Status</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Joined</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Actions</th>
                      </tr></thead>
                      <tbody>
                        {recentUsers.map((u) => (
                          <tr key={u.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{u.name.charAt(0)}</div>
                                <span className="text-sm font-medium text-foreground">{u.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{u.email}</td>
                            <td className="px-4 py-3">{statusBadge(u.kyc)}</td>
                            <td className="px-4 py-3">{statusBadge(u.status)}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{u.date}</td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <button className="text-xs text-primary hover:underline">View</button>
                                {u.kyc === "Pending" && <>
                                  <button className="text-xs text-success hover:underline">Approve</button>
                                  <button className="text-xs text-destructive hover:underline">Reject</button>
                                </>}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "transactions" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Transactions & OTC</h2>
                  <div className="flex gap-2">
                    {["All", "Completed", "Pending"].map((f) => (
                      <button key={f} className="px-3 py-1.5 rounded-full text-xs bg-secondary text-muted-foreground hover:bg-primary/15 hover:text-primary transition-colors">{f}</button>
                    ))}
                  </div>
                </div>
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead><tr className="border-b border-border">
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">ID</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">User</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Type</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Amount</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">NGN Value</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Status</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Date</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Actions</th>
                      </tr></thead>
                      <tbody>
                        {recentTrades.map((t) => (
                          <tr key={t.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                            <td className="px-4 py-3 text-sm text-primary font-mono">{t.id}</td>
                            <td className="px-4 py-3 text-sm text-foreground">{t.user}</td>
                            <td className="px-4 py-3 text-sm text-foreground">{t.type}</td>
                            <td className="px-4 py-3 text-sm text-foreground">{t.amount}</td>
                            <td className="px-4 py-3 text-sm font-medium text-foreground">{t.ngn}</td>
                            <td className="px-4 py-3">{statusBadge(t.status)}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{t.date}</td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <button className="text-xs text-primary hover:underline">View</button>
                                {t.status === "Pending" && <>
                                  <button className="text-xs text-success hover:underline">Approve</button>
                                  <button className="text-xs text-destructive hover:underline">Reject</button>
                                </>}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "giftcards" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Gift Card Submissions</h2>
                  <div className="flex gap-2">
                    {["All", "Pending", "Approved", "Rejected"].map((f) => (
                      <button key={f} className="px-3 py-1.5 rounded-full text-xs bg-secondary text-muted-foreground hover:bg-primary/15 hover:text-primary transition-colors">{f}</button>
                    ))}
                  </div>
                </div>
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead><tr className="border-b border-border">
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">ID</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">User</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Brand</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Value</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Rate</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Payout</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Status</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Actions</th>
                      </tr></thead>
                      <tbody>
                        {giftCardSubmissions.map((gc) => (
                          <tr key={gc.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                            <td className="px-4 py-3 text-sm text-primary font-mono">{gc.id}</td>
                            <td className="px-4 py-3 text-sm text-foreground">{gc.user}</td>
                            <td className="px-4 py-3 text-sm text-foreground">{gc.brand}</td>
                            <td className="px-4 py-3 text-sm text-foreground">{gc.value}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{gc.rate}</td>
                            <td className="px-4 py-3 text-sm font-medium text-success">{gc.payout}</td>
                            <td className="px-4 py-3">{statusBadge(gc.status)}</td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <button className="text-xs text-primary hover:underline">View Card</button>
                                {gc.status === "Pending" && <>
                                  <button className="text-xs text-success hover:underline">Approve</button>
                                  <button className="text-xs text-destructive hover:underline">Reject</button>
                                </>}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "rates" && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">Rates & Fees</h2>
                <div className="bg-card border border-border rounded-xl overflow-hidden mb-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead><tr className="border-b border-border">
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Asset</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Buy Rate</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Sell Rate</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Fee</th>
                        <th className="text-left text-xs text-muted-foreground font-medium px-4 py-3">Actions</th>
                      </tr></thead>
                      <tbody>
                        {rateSettings.map((r) => (
                          <tr key={r.asset} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center text-xs font-bold text-warning">{r.asset.charAt(0)}</div>
                                <span className="text-sm font-medium text-foreground">{r.asset}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-foreground">{r.buyRate}</td>
                            <td className="px-4 py-3 text-sm text-foreground">{r.sellRate}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{r.fee}</td>
                            <td className="px-4 py-3"><button className="text-xs text-primary hover:underline">Edit</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-foreground mb-3">Gift Card Rates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Apple", "Google Play", "Amazon", "Steam"].map((brand) => (
                    <div key={brand} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                      <div><p className="text-sm font-medium text-foreground">{brand}</p><p className="text-xs text-muted-foreground">₦1,450/$</p></div>
                      <button className="text-xs text-primary hover:underline">Edit</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-6">Settings</h2>
                <div className="space-y-4 max-w-lg">
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-4">General</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-muted-foreground block mb-1">Daily Send Limit (NGN)</label>
                        <input defaultValue="50000" className="w-full h-10 bg-secondary rounded-lg px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground block mb-1">Min Deposit (USD)</label>
                        <input defaultValue="1" className="w-full h-10 bg-secondary rounded-lg px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground block mb-1">Trade Processing Time</label>
                        <input defaultValue="5-15 minutes" className="w-full h-10 bg-secondary rounded-lg px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Supported Networks</h3>
                    <div className="flex flex-wrap gap-2">
                      {["BEP-20", "ERC-20", "TRC-20", "Solana"].map((n) => (
                        <span key={n} className="px-3 py-1.5 bg-primary/15 text-primary rounded-full text-xs font-medium">{n}</span>
                      ))}
                    </div>
                  </div>
                  <button className="w-full h-10 bg-primary rounded-lg text-primary-foreground text-sm font-semibold">Save Changes</button>
                </div>
              </div>
            )}
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;

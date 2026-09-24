import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Wallet, ShoppingCart, Users, Shield, BarChart3,
  Settings, LogOut, Bell, ChevronDown, CreditCard, FileText,
  AlertTriangle, Gift, Banknote, Menu, X, Smartphone,
} from "lucide-react";
import { useState } from "react";
import { NewBadge } from "./AdminUtils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import GlobalSearch from "./GlobalSearch";

export type AdminTab =
  | "dashboard" | "wallets" | "orders" | "payouts" | "users" | "kyc"
  | "kyc-compliance" | "kyc-rules"
  | "compliance" | "compliance-alerts" | "compliance-rules" | "compliance-detail"
  | "reports" | "settings" | "audit-log" | "virtual-cards"
  | "rewards-admin" | "giftcards" | "bill-payments" | "invite-codes";

type NavItem = {
  icon: typeof LayoutDashboard;
  label: string;
  tab: AdminTab;
  isNew?: boolean;
  children?: { label: string; tab: AdminTab; isNew?: boolean }[];
};

export const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", tab: "dashboard" },
  { icon: Wallet, label: "Wallets", tab: "wallets" },
  { icon: ShoppingCart, label: "Orders", tab: "orders" },
  { icon: Banknote, label: "Payouts", tab: "payouts", isNew: true },
  { icon: CreditCard, label: "Virtual Cards", tab: "virtual-cards", isNew: true },
  { icon: Gift, label: "Gift Cards", tab: "giftcards", isNew: true },
  { icon: Smartphone, label: "Bill Payments", tab: "bill-payments", isNew: true },
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
  { icon: Gift, label: "Rewards", tab: "rewards-admin", isNew: true },
  { icon: Gift, label: "Invite Codes", tab: "invite-codes", isNew: true },
  { icon: BarChart3, label: "Reports", tab: "reports" },
  { icon: Settings, label: "Settings", tab: "settings" },
];

interface AdminLayoutProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  children: React.ReactNode;
  headerTitle?: string;
}

const AdminLayout = ({ activeTab, onTabChange, children, headerTitle }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const isKycTab = activeTab === "kyc" || activeTab === "kyc-compliance" || activeTab === "kyc-rules";
  const isComplianceTab = activeTab === "compliance" || activeTab === "compliance-alerts" || activeTab === "compliance-rules" || activeTab === "compliance-detail";

  const getHeaderTitle = () => {
    if (headerTitle) return headerTitle;
    const flatItem = navItems.find(i => i.tab === activeTab);
    if (flatItem) return flatItem.label;
    for (const item of navItems) {
      if (item.children) {
        const child = item.children.find(c => c.tab === activeTab);
        if (child) return `${item.label} — ${child.label}`;
      }
    }
    return "Admin";
  };

  const handleTabChange = (tab: AdminTab) => {
    onTabChange(tab);
    setMobileOpen(false);
  };

  const SidebarNav = () => (
    <div className="flex h-full w-full flex-col bg-gray-950">
      <div className="flex h-16 items-center gap-2.5 border-b border-gray-800 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500">
          <span className="text-sm font-bold text-white">D</span>
        </div>
        <span className="font-display text-lg font-bold text-white">DeeX</span>
        <span className="ml-1 rounded-md bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-amber-400">ADMIN</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const isActive = item.tab === activeTab
            || (item.children && item.children.some(c => c.tab === activeTab))
            || (item.tab === "kyc" && isKycTab)
            || (item.tab === "compliance" && isComplianceTab);
          const isExpanded = expandedSections[item.tab] || false;

          return (
            <div key={item.tab}>
              <button
                onClick={() => {
                  if (item.children) {
                    setExpandedSections(prev => ({ ...prev, [item.tab]: !prev[item.tab] }));
                    handleTabChange(item.tab);
                  } else {
                    handleTabChange(item.tab);
                  }
                }}
                className={`w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? "bg-amber-500/10 text-amber-400" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                  {item.isNew && <NewBadge />}
                </div>
                {item.children && (
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                )}
              </button>
              {item.children && isExpanded && (
                <div className="ml-10 mt-0.5 space-y-1">
                  {item.children.map(child => (
                    <button
                      key={child.tab}
                      onClick={() => handleTabChange(child.tab)}
                      className={`w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        activeTab === child.tab ? "bg-amber-500/10 text-amber-400" : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      {child.label}
                      {child.isNew && <NewBadge />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-gray-800 p-3">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-jakarta">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 shrink-0 lg:block">
        <SidebarNav />
      </aside>

      {/* Main content */}
      <div className="flex min-h-screen min-w-0 flex-col lg:pl-60">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-sm sm:h-16 sm:px-6">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 lg:hidden">
                  <Menu className="h-5 w-5 text-gray-600" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-60 bg-gray-950 p-0">
                <SidebarNav />
              </SheetContent>
            </Sheet>
            <h1 className="truncate font-display text-lg font-bold text-gray-900 sm:text-xl">{getHeaderTitle()}</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <GlobalSearch />
            <button className="hidden h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:bg-gray-50 sm:flex">
              <Bell className="h-4 w-4 text-gray-600" />
            </button>
            <div className="flex items-center rounded-lg border border-gray-200 bg-white px-2 py-1.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-50 text-[10px] font-bold text-amber-700">AD</div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

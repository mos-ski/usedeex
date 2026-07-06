import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Wallet, ShoppingCart, Users, Shield, BarChart3,
  Settings, LogOut, Bell, ChevronDown, CreditCard, FileText,
  AlertTriangle, Gift, Banknote, Menu, X, Smartphone,
} from "lucide-react";
import { useState } from "react";
import { NewBadge } from "./AdminUtils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
    <>
      <div className="p-5 border-b border-border flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
          <span className="text-xs font-bold text-background">D</span>
        </div>
        <span className="text-base font-bold text-foreground">DEE_X</span>
      </div>

      <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
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
                      onClick={() => handleTabChange(child.tab)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === child.tab ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
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

      <div className="p-2 border-t border-border">
        <button
          onClick={() => navigate("/login")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut className="w-[18px] h-[18px]" /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[220px] bg-card border-r border-border flex-col shrink-0 sticky top-0 h-screen">
        <SidebarNav />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-foreground">
            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden p-1.5 -ml-1 rounded-lg hover:bg-secondary">
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[260px] p-0 bg-card flex flex-col">
                <SidebarNav />
              </SheetContent>
            </Sheet>
            <span className="text-muted-foreground hidden md:inline">—</span>
            <h1 className="text-sm md:text-base font-semibold truncate">{getHeaderTitle()}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-muted-foreground cursor-pointer" />
            <div className="w-8 h-8 rounded-full bg-primary/30 flex items-center justify-center text-xs font-bold text-primary">AD</div>
          </div>
        </header>

        <main className="flex-1 p-3 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

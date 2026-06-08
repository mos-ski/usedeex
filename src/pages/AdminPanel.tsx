import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminLayout, { AdminTab } from "@/components/admin/AdminLayout";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminWallets from "@/components/admin/AdminWallets";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminPayouts from "@/components/admin/AdminPayouts";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminKYC from "@/components/admin/AdminKYC";
import AdminCompliance from "@/components/admin/AdminCompliance";
import AdminVirtualCards from "@/components/admin/AdminVirtualCards";
import AdminAuditLog from "@/components/admin/AdminAuditLog";
import AdminRewards from "@/components/admin/AdminRewards";
import AdminReports from "@/components/admin/AdminReports";
import AdminSettings from "@/components/admin/AdminSettings";
import AdminGiftCards from "@/components/admin/AdminGiftCards";
import AdminBillPayments from "@/components/admin/AdminBillPayments";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab") as AdminTab | null;
    if (tab) {
      setActiveTab(tab);
      navigate("/admin", { replace: true });
    }
  }, [location.search, navigate]);


  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "dashboard" && <AdminDashboard />}
      {activeTab === "wallets" && <AdminWallets />}
      {activeTab === "orders" && <AdminOrders />}
      {activeTab === "payouts" && <AdminPayouts />}
      {activeTab === "users" && <AdminUsers />}
      {activeTab === "kyc" && <AdminKYC />}
      {(activeTab === "kyc-compliance" || activeTab === "kyc-rules") && (
        <AdminKYC />
      )}
      {(activeTab === "compliance" || activeTab === "compliance-alerts") && (
        <AdminCompliance initialView="alerts" />
      )}
      {activeTab === "compliance-rules" && (
        <AdminCompliance initialView="compliance-rules" />
      )}
      {activeTab === "compliance-detail" && (
        <AdminCompliance initialView="alerts" />
      )}
      {activeTab === "virtual-cards" && <AdminVirtualCards />}
      {activeTab === "giftcards" && <AdminGiftCards />}
      {activeTab === "bill-payments" && <AdminBillPayments />}
      {activeTab === "audit-log" && <AdminAuditLog />}
      {activeTab === "rewards-admin" && <AdminRewards />}
      {activeTab === "reports" && <AdminReports />}
      {activeTab === "settings" && <AdminSettings />}
    </AdminLayout>
  );
};

export default AdminPanel;

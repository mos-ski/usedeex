import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";

// Receipt templates for each transaction type
const receiptTemplates: Record<string, (data: any) => { label: string; value: string; color?: string; isBadge?: boolean }[]> = {
  sell: (d) => [
    { label: "Transaction type", value: "Sell Crypto" },
    { label: "Asset", value: d?.type || "BTC" },
    { label: "Amount", value: d?.amount || "₦450,000", color: "text-primary" },
    { label: "Status", value: d?.status || "Completed", isBadge: true },
    { label: "Timestamp", value: d?.date || "Mar 8, 2026 | 2:30 PM" },
    { label: "Destination", value: d?.destination || "8103674006 - PalmPay" },
  ],
  deposit: (d) => [
    { label: "Transaction type", value: "Deposit" },
    { label: "Asset", value: d?.asset || "USDT" },
    { label: "Amount", value: d?.amount || "500 USDT", color: "text-primary" },
    { label: "Network", value: d?.network || "BEP-20" },
    { label: "Status", value: d?.status || "Confirmed", isBadge: true },
    { label: "Timestamp", value: d?.date || "Mar 7, 2026 | 10:45 AM" },
  ],
  swap: (d) => [
    { label: "Transaction type", value: "Swap" },
    { label: "Amount from", value: d?.from || "16.89 TRX", color: "text-primary" },
    { label: "Amount to", value: d?.to || "0.00 USDT", color: "text-primary" },
    { label: "Status", value: d?.status || "Pending", isBadge: true },
    { label: "Timestamp", value: d?.date || "Apr 10th, 2025 | 9:57 AM" },
    { label: "Description", value: d?.desc || "Swap from TRX to USDT" },
  ],
  airtime: (d) => [
    { label: "Transaction type", value: "Airtime Purchase" },
    { label: "Provider", value: d?.provider || "MTN" },
    { label: "Phone", value: d?.phone || "08103674006" },
    { label: "Amount", value: `₦${d?.amount || "2,000"}`, color: "text-primary" },
    { label: "Status", value: d?.status || "Completed", isBadge: true },
    { label: "Timestamp", value: d?.date || new Date().toLocaleString() },
  ],
  data: (d) => [
    { label: "Transaction type", value: "Data Purchase" },
    { label: "Provider", value: d?.provider || "MTN" },
    { label: "Phone", value: d?.phone || "08103674006" },
    { label: "Plan", value: d?.plan || "2GB - ₦1,000" },
    { label: "Status", value: d?.status || "Completed", isBadge: true },
    { label: "Timestamp", value: d?.date || new Date().toLocaleString() },
  ],
  electricity: (d) => [
    { label: "Transaction type", value: "Electricity" },
    { label: "Provider", value: d?.provider || "IKEDC" },
    { label: "Meter", value: d?.meter || "45123456789" },
    { label: "Amount", value: `₦${d?.amount || "15,000"}`, color: "text-primary" },
    { label: "Token", value: d?.token || "1234-5678-9012-3456" },
    { label: "Status", value: d?.status || "Completed", isBadge: true },
    { label: "Timestamp", value: d?.date || new Date().toLocaleString() },
  ],
  betting: (d) => [
    { label: "Transaction type", value: "Betting Funding" },
    { label: "Platform", value: d?.provider || "Bet9ja" },
    { label: "User ID", value: d?.userId || "BET9JA_1234" },
    { label: "Amount", value: `₦${d?.amount || "5,000"}`, color: "text-primary" },
    { label: "Status", value: d?.status || "Completed", isBadge: true },
    { label: "Timestamp", value: d?.date || new Date().toLocaleString() },
  ],
  giftcard: (d) => [
    { label: "Transaction type", value: "Gift Card Sale" },
    { label: "Brand", value: d?.brand || "Apple" },
    { label: "Card Value", value: d?.amount || "$100.00", color: "text-primary" },
    { label: "Payout", value: d?.payout || "₦145,000", color: "text-success" },
    { label: "Status", value: d?.status || "Pending", isBadge: true },
    { label: "Timestamp", value: d?.date || new Date().toLocaleString() },
  ],
  reward: (d) => [
    { label: "Transaction type", value: "Reward Redemption" },
    { label: "Points redeemed", value: d?.points || "500 pts", color: "text-primary" },
    { label: "Cash value", value: d?.cash || "₦5,000", color: "text-success" },
    { label: "Status", value: d?.status || "Completed", isBadge: true },
    { label: "Timestamp", value: d?.date || new Date().toLocaleString() },
  ],
  receive: (d) => [
    { label: "Transaction type", value: "Receive Crypto" },
    { label: "Asset", value: d?.asset || "BTC" },
    { label: "Amount", value: d?.amount || "0.005 BTC", color: "text-primary" },
    { label: "From", value: d?.from || "External Wallet" },
    { label: "Network", value: d?.network || "BEP-20" },
    { label: "Status", value: d?.status || "Confirmed", isBadge: true },
    { label: "Timestamp", value: d?.date || new Date().toLocaleString() },
  ],
};

const Receipt = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  const state = location.state as { type?: string; data?: any } | null;
  const txType = state?.type || "swap";
  const txData = state?.data || {};
  const txId = `67f788${Math.random().toString(36).substring(2, 14)}`;

  const template = receiptTemplates[txType] || receiptTemplates.swap;
  const fields = template(txData);

  const handleCopy = () => {
    navigator.clipboard.writeText(txId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MobileLayout hideNav>
      <PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center mb-8">
            <button onClick={() => navigate(-1)} className="absolute">
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
            <h2 className="text-lg font-bold text-foreground w-full text-center">Receipt</h2>
          </div>

          <div className="space-y-0">
            {fields.map((f, i) => (
              <div key={i}>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground mb-1">{f.label}</p>
                  {f.isBadge ? (
                    <span className={`text-sm px-3 py-1 rounded-full ${f.value === "Completed" || f.value === "Confirmed" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}`}>
                      {f.value}
                    </span>
                  ) : (
                    <p className={`text-lg font-semibold ${f.color || "text-foreground"}`}>{f.value}</p>
                  )}
                </div>
                <div className="h-px bg-border" />
              </div>
            ))}

            {/* Transaction ID */}
            <div className="py-4">
              <p className="text-sm text-muted-foreground mb-1">Transaction ID</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-primary font-medium">{txId}</p>
                <button onClick={handleCopy}>
                  {copied ? <Check className="w-5 h-5 text-success" /> : <Copy className="w-5 h-5 text-primary" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button className="flex-1 h-12 bg-primary rounded-xl text-primary-foreground font-semibold">
              Share/Download
            </button>
            <button className="flex-1 h-12 border border-primary rounded-xl text-primary font-semibold">
              Report
            </button>
          </div>
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default Receipt;

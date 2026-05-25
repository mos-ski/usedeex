import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Copy, Check, AlertTriangle, ChevronRight, Download, FileText, Image } from "lucide-react";
import { useState, useMemo } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import CryptoIcon from "@/components/CryptoIcon";
import ProviderIcon from "@/components/ProviderIcon";
import NewBadge from "@/components/NewBadge";
import { toast } from "sonner";

const receiptTemplates: Record<string, (d: any) => { label: string; value: string; color?: string; isBadge?: boolean }[]> = {
  sell: (d) => [
    { label: "Transaction type", value: "Sell Crypto" },
    { label: "Asset", value: d?.symbol || d?.type || "BTC" },
    { label: "Amount sold", value: d?.amountCrypto || "0.005 BTC" },
    { label: "Rate", value: d?.rate || "₦97,450,000/BTC" },
    { label: "Payout", value: d?.amount || "₦450,000", color: "text-success" },
    { label: "Destination", value: d?.destination || "8103674006 - PalmPay" },
    { label: "Hash ID", value: d?.hashId || `TXN-${Math.random().toString(36).substring(2, 8).toUpperCase()}` },
    { label: "Status", value: d?.status || "Completed", isBadge: true },
    { label: "Timestamp", value: d?.date || "Mar 8, 2026 | 2:30 PM" },
  ],
  deposit: (d) => [
    { label: "Transaction type", value: "Deposit" },
    { label: "Asset", value: d?.asset || "USDT" },
    { label: "Amount", value: d?.amount || "500 USDT", color: "text-primary" },
    { label: "Network", value: d?.network || "BEP-20" },
    { label: "Deposit ID", value: d?.depositId || `DEP-${Math.random().toString(36).substring(2, 8).toUpperCase()}` },
    { label: "Status", value: d?.status || "Confirmed", isBadge: true },
    { label: "Timestamp", value: d?.date || "Mar 7, 2026 | 10:45 AM" },
  ],
  swap: (d) => [
    { label: "Transaction type", value: "Swap" },
    { label: "From", value: d?.from || "16.89 TRX", color: "text-primary" },
    { label: "To", value: d?.to || "0.00 USDT", color: "text-primary" },
    { label: "Hash ID", value: d?.hashId || `SWP-${Math.random().toString(36).substring(2, 8).toUpperCase()}` },
    { label: "Status", value: d?.status || "Pending", isBadge: true },
    { label: "Timestamp", value: d?.date || "Apr 10th, 2025 | 9:57 AM" },
  ],
  airtime: (d) => [
    { label: "Transaction type", value: "Airtime Purchase" },
    { label: "Provider", value: d?.provider || "MTN" },
    { label: "Phone Number", value: d?.phone || "08103674006" },
    { label: "Amount", value: `₦${d?.amount || "2,000"}`, color: "text-primary" },
    { label: "Payment Method", value: d?.paymentMethod || "Naira Wallet" },
    { label: "Hash ID", value: `AIR-${Math.random().toString(36).substring(2, 8).toUpperCase()}` },
    { label: "Status", value: d?.status || "Completed", isBadge: true },
    { label: "Timestamp", value: d?.date || new Date().toLocaleString() },
  ],
  data: (d) => [
    { label: "Transaction type", value: "Data Purchase" },
    { label: "Provider", value: d?.provider || "MTN" },
    { label: "Phone Number", value: d?.phone || "08103674006" },
    { label: "Plan", value: d?.plan || "2GB - ₦1,000" },
    { label: "Payment Method", value: d?.paymentMethod || "Naira Wallet" },
    { label: "Hash ID", value: `DAT-${Math.random().toString(36).substring(2, 8).toUpperCase()}` },
    { label: "Status", value: d?.status || "Completed", isBadge: true },
    { label: "Timestamp", value: d?.date || new Date().toLocaleString() },
  ],
  electricity: (d) => [
    { label: "Transaction type", value: "Electricity" },
    { label: "Provider", value: d?.provider || "IKEDC" },
    { label: "Meter Number", value: d?.meter || "45123456789" },
    { label: "Amount", value: `₦${d?.amount || "15,000"}`, color: "text-primary" },
    { label: "Token", value: d?.token || "1234-5678-9012-3456" },
    { label: "Payment Method", value: d?.paymentMethod || "Naira Wallet" },
    { label: "Hash ID", value: `ELC-${Math.random().toString(36).substring(2, 8).toUpperCase()}` },
    { label: "Status", value: d?.status || "Completed", isBadge: true },
    { label: "Timestamp", value: d?.date || new Date().toLocaleString() },
  ],
  betting: (d) => [
    { label: "Transaction type", value: "Betting Funding" },
    { label: "Platform", value: d?.provider || "Bet9ja" },
    { label: "User ID", value: d?.userId || "BET9JA_1234" },
    { label: "Amount", value: `₦${d?.amount || "5,000"}`, color: "text-primary" },
    { label: "Payment Method", value: d?.paymentMethod || "Naira Wallet" },
    { label: "Hash ID", value: `BET-${Math.random().toString(36).substring(2, 8).toUpperCase()}` },
    { label: "Status", value: d?.status || "Completed", isBadge: true },
    { label: "Timestamp", value: d?.date || new Date().toLocaleString() },
  ],
  giftcard: (d) => [
    { label: "Transaction type", value: "Gift Card Sale" },
    { label: "Brand", value: d?.brand || "Apple" },
    { label: "Card Value", value: d?.amount || "$100.00", color: "text-primary" },
    { label: "Payout", value: d?.payout || "₦145,000", color: "text-success" },
    { label: "Admin Review", value: "Notified Admin" },
    { label: "Hash ID", value: `GC-${Math.random().toString(36).substring(2, 8).toUpperCase()}` },
    { label: "Status", value: d?.status || "Pending", isBadge: true },
    { label: "Timestamp", value: d?.date || new Date().toLocaleString() },
  ],
  reward: (d) => [
    { label: "Transaction type", value: "Reward Redemption" },
    { label: "Points redeemed", value: d?.points || "500 pts", color: "text-primary" },
    { label: "Cash value", value: d?.cash || "₦5,000", color: "text-success" },
    { label: "Credit to", value: d?.account || "8103674006 - PalmPay" },
    { label: "Admin Approval", value: d?.adminStatus || "Processing" },
    { label: "Hash ID", value: `RWD-${Math.random().toString(36).substring(2, 8).toUpperCase()}` },
    { label: "Status", value: d?.status || "Processing", isBadge: true },
    { label: "Timestamp", value: d?.date || new Date().toLocaleString() },
  ],
  receive: (d) => [
    { label: "Transaction type", value: "Receive Crypto" },
    { label: "Asset", value: d?.asset || "BTC" },
    { label: "Amount", value: d?.amount || "0.005 BTC", color: "text-primary" },
    { label: "From", value: d?.from || "External Wallet" },
    { label: "Network", value: d?.network || "BEP-20" },
    { label: "Deposit ID", value: d?.depositId || `DEP-${Math.random().toString(36).substring(2, 8).toUpperCase()}` },
    { label: "Status", value: d?.status || "Confirmed", isBadge: true },
    { label: "Timestamp", value: d?.date || new Date().toLocaleString() },
  ],
};

const cryptoSymbols = ["BTC", "ETH", "USDT", "USDC", "SOL", "TRX", "DOGE", "BNB"];

const reportReasons = [
  "Wrong amount credited",
  "Transaction not received",
  "Duplicate transaction",
  "Sent to wrong address",
  "Other issue",
];

type ReportView = "none" | "select" | "detail" | "submitted";

const Receipt = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [copied, setCopied] = useState("");
  const [reportView, setReportView] = useState<ReportView>("none");
  const [selectedReason, setSelectedReason] = useState("");
  const [reportNote, setReportNote] = useState("");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  const state = location.state as { type?: string; data?: any } | null;
  const txType = state?.type || "swap";
  const txData = state?.data || {};
  const txId = useMemo(() => `67f788${Math.random().toString(36).substring(2, 14)}`, []);
  const ticketId = useMemo(() => `#DX-${Math.floor(Math.random() * 9000 + 1000)}`, []);

  const template = receiptTemplates[txType] || receiptTemplates.swap;
  const fields = useMemo(() => template(txData), [txType]);

  const assetSymbol = txData?.symbol || txData?.asset;
  const isCrypto = assetSymbol && cryptoSymbols.includes(assetSymbol.toUpperCase());

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(val);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleDownload = (format: "pdf" | "image") => {
    setShowDownloadOptions(false);
    toast.success(`Receipt downloaded as ${format === "pdf" ? "PDF" : "Image"}`, {
      description: `Transaction ${txId}`,
    });
  };

  // Report submitted view
  if (reportView === "submitted") {
    return (
      <MobileLayout hideNav>
        <PageTransition>
          <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Report Submitted</h2>
            <p className="text-muted-foreground text-center mb-2">We've received your report and will investigate.</p>
            <div className="bg-card border border-border rounded-xl p-4 w-full mb-6">
              <div className="flex justify-between mb-2"><span className="text-sm text-muted-foreground">Ticket ID</span><span className="text-sm font-mono text-primary">{ticketId}</span></div>
              <div className="flex justify-between mb-2"><span className="text-sm text-muted-foreground">Reason</span><span className="text-sm text-foreground">{selectedReason}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Transaction</span><span className="text-sm font-mono text-foreground">{txId.slice(0, 16)}...</span></div>
            </div>
            <p className="text-xs text-muted-foreground text-center mb-8">Our team will review this within 24 hours. You'll be notified via email and in-app.</p>
            <button onClick={() => navigate("/dashboard")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">Back to Home</button>
          </div>
        </PageTransition>
      </MobileLayout>
    );
  }

  // Report detail view
  if (reportView === "detail") {
    return (
      <MobileLayout hideNav>
        <PageTransition>
          <div className="px-4 pt-4">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => setReportView("select")} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
              <h2 className="text-lg font-bold text-foreground">Report Details</h2>
            </div>

            <div className="bg-card border border-border rounded-xl p-4 mb-4">
              <p className="text-sm text-muted-foreground mb-1">Selected issue</p>
              <p className="text-sm font-medium text-foreground">{selectedReason}</p>
            </div>

            <div className="mb-4">
              <label className="text-sm text-muted-foreground mb-2 block">Additional details (optional)</label>
              <textarea value={reportNote} onChange={e => setReportNote(e.target.value)} placeholder="Describe the issue in more detail..."
                className="w-full h-28 bg-secondary rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary resize-none text-sm" />
            </div>

            <div className="bg-warning/10 border border-warning/20 rounded-xl p-3 flex items-start gap-2 mb-6">
              <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">Reports are reviewed by our team. False reports may affect your account standing.</p>
            </div>

            <button onClick={() => setReportView("submitted")} className="w-full h-14 bg-primary rounded-xl text-primary-foreground font-semibold">
              Submit Report
            </button>
          </div>
        </PageTransition>
      </MobileLayout>
    );
  }

  // Report reason selection
  if (reportView === "select") {
    return (
      <MobileLayout hideNav>
        <PageTransition>
          <div className="px-4 pt-4">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => setReportView("none")} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
              <h2 className="text-lg font-bold text-foreground">Report Transaction</h2>
              <NewBadge />
            </div>

            <p className="text-sm text-muted-foreground mb-4">What's the issue with this transaction?</p>

            <div className="space-y-2 mb-6">
              {reportReasons.map((reason) => (
                <button key={reason} onClick={() => { setSelectedReason(reason); setReportView("detail"); }}
                  className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{reason}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        </PageTransition>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout hideNav>
      <PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center mb-8">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground w-full text-center">Receipt</h2>
          </div>

          <div className="flex justify-center mb-6">
            {isCrypto ? (
              <CryptoIcon symbol={assetSymbol} size="lg" />
            ) : assetSymbol ? (
              <ProviderIcon name={assetSymbol} size="lg" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">{txType.charAt(0).toUpperCase()}</span>
              </div>
            )}
          </div>

          <div className="space-y-0">
            {fields.map((f, i) => (
              <div key={i}>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground mb-1">{f.label}</p>
                  {f.isBadge ? (
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      f.value === "Completed" || f.value === "Confirmed" ? "bg-success/20 text-success" :
                      f.value === "Processing" ? "bg-primary/20 text-primary" :
                      "bg-warning/20 text-warning"
                    }`}>{f.value}</span>
                  ) : f.label.includes("Hash") || f.label.includes("Deposit ID") ? (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-primary font-mono">{f.value}</p>
                      <button onClick={() => handleCopy(f.value)}>
                        {copied === f.value ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4 text-primary" />}
                      </button>
                    </div>
                  ) : f.label === "Admin Review" || f.label === "Admin Approval" ? (
                    <span className={`text-sm px-3 py-1 rounded-full ${f.value === "Notified Admin" ? "bg-primary/20 text-primary" : f.value === "Approved" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}`}>
                      {f.value}
                    </span>
                  ) : (
                    <p className={`text-lg font-semibold ${f.color || "text-foreground"}`}>{f.value}</p>
                  )}
                </div>
                <div className="h-px bg-border" />
              </div>
            ))}

            <div className="py-4">
              <p className="text-sm text-muted-foreground mb-1">Transaction ID</p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-primary font-medium font-mono">{txId}</p>
                <button onClick={() => handleCopy(txId)}>
                  {copied === txId ? <Check className="w-5 h-5 text-success" /> : <Copy className="w-5 h-5 text-primary" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8 mb-2">
            <div className="flex-1 relative">
              <button onClick={() => setShowDownloadOptions(!showDownloadOptions)} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download
              </button>
              {showDownloadOptions && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-card border border-border rounded-xl overflow-hidden z-20 shadow-lg">
                  <button onClick={() => handleDownload("pdf")} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors">
                    <FileText className="w-4 h-4 text-destructive" />
                    <span className="text-sm text-foreground">PDF</span>
                  </button>
                  <div className="mx-4 h-px bg-border" />
                  <button onClick={() => handleDownload("image")} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-colors">
                    <Image className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">Image</span>
                  </button>
                </div>
              )}
            </div>
            <button onClick={() => setReportView("select")} className="flex-1 h-12 border border-destructive/50 rounded-xl text-destructive font-semibold">Report</button>
          </div>
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default Receipt;

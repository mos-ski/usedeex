import { useNavigate, useLocation } from "react-router-dom";
import { AlertTriangle, Check, ChevronRight, FileText, Image } from "lucide-react";
import { useState, useMemo } from "react";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, PrimaryButton, SectionCard } from "@/components/dashboard/AppShell";
import AssetMark from "@/components/dashboard/AssetMark";
import { ArrowDownIcon, CheckCircleIcon, CopyIcon } from "@/components/dashboard/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const receiptTemplates: Record<string, (d: any) => { label: string; value: string; color?: string; isBadge?: boolean }[]> = {
  sell: (d) => [
    { label: "Transaction type", value: "Sell Crypto" },
    { label: "Asset", value: d?.symbol || d?.type || "BTC" },
    { label: "Amount sold", value: d?.amountCrypto || "0.005 BTC" },
    { label: "Rate", value: d?.rate || "₦97,450,000/BTC" },
    { label: "Payout", value: d?.amount || "₦450,000", color: "text-brand-successText" },
    { label: "Destination", value: d?.destination || "8103674006 - PalmPay" },
    { label: "Hash ID", value: d?.hashId || `TXN-${Math.random().toString(36).substring(2, 8).toUpperCase()}` },
    { label: "Status", value: d?.status || "Completed", isBadge: true },
    { label: "Timestamp", value: d?.date || "Mar 8, 2026 | 2:30 PM" },
  ],
  deposit: (d) => [
    { label: "Transaction type", value: "Deposit" },
    { label: "Asset", value: d?.asset || "USDT" },
    { label: "Amount", value: d?.amount || "500 USDT", color: "text-brand-blue500" },
    { label: "Network", value: d?.network || "BEP-20" },
    { label: "Deposit ID", value: d?.depositId || `DEP-${Math.random().toString(36).substring(2, 8).toUpperCase()}` },
    { label: "Status", value: d?.status || "Confirmed", isBadge: true },
    { label: "Timestamp", value: d?.date || "Mar 7, 2026 | 10:45 AM" },
  ],
  swap: (d) => [
    { label: "Transaction type", value: "Swap" },
    { label: "From", value: d?.from || "16.89 TRX", color: "text-brand-blue500" },
    { label: "To", value: d?.to || "0.00 USDT", color: "text-brand-blue500" },
    { label: "Hash ID", value: d?.hashId || `SWP-${Math.random().toString(36).substring(2, 8).toUpperCase()}` },
    { label: "Status", value: d?.status || "Pending", isBadge: true },
    { label: "Timestamp", value: d?.date || "Apr 10th, 2025 | 9:57 AM" },
  ],
  airtime: (d) => [
    { label: "Transaction type", value: "Airtime Purchase" },
    { label: "Provider", value: d?.provider || "MTN" },
    { label: "Phone Number", value: d?.phone || "08103674006" },
    { label: "Amount", value: `₦${d?.amount || "2,000"}`, color: "text-brand-blue500" },
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
    { label: "Amount", value: `₦${d?.amount || "15,000"}`, color: "text-brand-blue500" },
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
    { label: "Amount", value: `₦${d?.amount || "5,000"}`, color: "text-brand-blue500" },
    { label: "Payment Method", value: d?.paymentMethod || "Naira Wallet" },
    { label: "Hash ID", value: `BET-${Math.random().toString(36).substring(2, 8).toUpperCase()}` },
    { label: "Status", value: d?.status || "Completed", isBadge: true },
    { label: "Timestamp", value: d?.date || new Date().toLocaleString() },
  ],
  giftcard: (d) => [
    { label: "Transaction type", value: "Gift Card Sale" },
    { label: "Brand", value: d?.brand || "Apple" },
    { label: "Card Value", value: d?.amount || "$100.00", color: "text-brand-blue500" },
    { label: "Payout", value: d?.payout || "₦145,000", color: "text-brand-successText" },
    { label: "Admin Review", value: "Notified Admin" },
    { label: "Hash ID", value: `GC-${Math.random().toString(36).substring(2, 8).toUpperCase()}` },
    { label: "Status", value: d?.status || "Pending", isBadge: true },
    { label: "Timestamp", value: d?.date || new Date().toLocaleString() },
  ],
  reward: (d) => [
    { label: "Transaction type", value: "Reward Redemption" },
    { label: "Points redeemed", value: d?.points || "500 pts", color: "text-brand-blue500" },
    { label: "Cash value", value: d?.cash || "₦5,000", color: "text-brand-successText" },
    { label: "Credit to", value: d?.account || "8103674006 - PalmPay" },
    { label: "Admin Approval", value: d?.adminStatus || "Processing" },
    { label: "Hash ID", value: `RWD-${Math.random().toString(36).substring(2, 8).toUpperCase()}` },
    { label: "Status", value: d?.status || "Processing", isBadge: true },
    { label: "Timestamp", value: d?.date || new Date().toLocaleString() },
  ],
  receive: (d) => [
    { label: "Transaction type", value: "Receive Crypto" },
    { label: "Asset", value: d?.asset || "BTC" },
    { label: "Amount", value: d?.amount || "0.005 BTC", color: "text-brand-blue500" },
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
      <AppShell className="bg-brand-surface" innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
        <PageTransition>
          <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <div className="w-20 h-20 rounded-full bg-brand-successText/10 flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-brand-successText" />
            </div>
            <h2 className="text-2xl font-bold text-brand-grey900 mb-2">Report Submitted</h2>
            <p className="text-brand-bodyText text-center mb-2">We've received your report and will investigate.</p>
            <div className="border border-brand-grey100 bg-brand-surface rounded-lg p-4 w-full mb-6">
              <div className="flex justify-between mb-2"><span className="text-sm text-brand-bodyText">Ticket ID</span><span className="text-sm font-mono text-brand-blue500">{ticketId}</span></div>
              <div className="flex justify-between mb-2"><span className="text-sm text-brand-bodyText">Reason</span><span className="text-sm text-brand-grey900">{selectedReason}</span></div>
              <div className="flex justify-between"><span className="text-sm text-brand-bodyText">Transaction</span><span className="text-sm font-mono text-brand-grey900">{txId.slice(0, 16)}...</span></div>
            </div>
            <p className="text-xs text-brand-bodyText text-center mb-8">Our team will review this within 24 hours. You'll be notified via email and in-app.</p>
            <button onClick={() => navigate("/dashboard")} className="w-full h-12 bg-primary rounded-lg text-brand-blue500-foreground font-semibold">Back to Home</button>
          </div>
        </PageTransition>
      </AppShell>
    );
  }

  // Report detail view
  if (reportView === "detail") {
    return (
      <AppShell className="bg-brand-surface" innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
        <PageTransition>
          <div className="px-4 pt-4">
            <PageHeader title="Report Details" onBack={() => setReportView("select")} />

            <div className="border border-brand-grey100 bg-brand-surface rounded-lg p-4 mb-4">
              <p className="text-sm text-brand-bodyText mb-1">Selected issue</p>
              <p className="text-sm font-medium text-brand-grey900">{selectedReason}</p>
            </div>

            <div className="mb-4">
              <label className="text-sm text-brand-bodyText mb-2 block">Additional details (optional)</label>
              <textarea value={reportNote} onChange={e => setReportNote(e.target.value)} placeholder="Describe the issue in more detail..."
                className="w-full h-28 bg-brand-grey50 rounded-lg px-4 py-3 text-brand-grey900 placeholder:text-brand-bodyText outline-none focus:ring-2 focus:border-brand-blue500 resize-none text-sm" />
            </div>

            <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 flex items-start gap-2 mb-6">
              <AlertTriangle className="w-5 h-5 text-brand-warning400 shrink-0 mt-0.5" />
              <p className="text-xs text-brand-bodyText">Reports are reviewed by our team. False reports may affect your account standing.</p>
            </div>

            <button onClick={() => setReportView("submitted")} className="w-full h-14 bg-primary rounded-lg text-brand-blue500-foreground font-semibold">
              Submit Report
            </button>
          </div>
        </PageTransition>
      </AppShell>
    );
  }

  // Report reason selection
  if (reportView === "select") {
    return (
      <AppShell className="bg-brand-surface" innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
        <PageTransition>
          <div className="px-4 pt-4">
            <PageHeader title="Report Transaction" onBack={() => setReportView("none")} />

            <p className="text-sm text-brand-bodyText mb-4">What's the issue with this transaction?</p>

            <div className="space-y-2 mb-6">
              {reportReasons.map((reason) => (
                <button key={reason} onClick={() => { setSelectedReason(reason); setReportView("detail"); }}
                  className="w-full flex items-center justify-between bg-brand-grey50 rounded-lg px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-brand-bodyText" />
                    <span className="text-sm font-medium text-brand-grey900">{reason}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-brand-bodyText" />
                </button>
              ))}
            </div>
          </div>
        </PageTransition>
      </AppShell>
    );
  }

  /* ---------------- Receipt (Figma 269:7465) ---------------- */
  const status = fields.find((f) => f.label === "Status")?.value ?? "Completed";
  const settled = ["Completed", "Confirmed", "Success"].includes(status);
  // Headline prefers the settled value (payout) over the amount sent.
  const headline =
    ["Payout", "Cash value", "Amount", "Amount sold", "To"]
      .map((label) => fields.find((f) => f.label === label)?.value)
      .find(Boolean) ?? "";
  const headlineParts = /^([^\d]*[\d,]+)\.(\d{2})$/.exec(headline);

  const detailRows = fields.filter((f) => f.label !== "Status");
  const isCopyable = (label: string) => /Hash|ID$/.test(label);

  /**
   * Progress rail. Timings are placeholders like the rest of this page's mock
   * data — swap them for the transaction's real timestamps when they exist.
   */
  const sentLabel = fields.find((f) => ["Amount sold", "Amount", "From"].includes(f.label))?.value ?? headline;
  const destination = fields.find((f) => f.label === "Destination")?.value;
  const steps = [
    { title: "Initiated", detail: `You sent ${sentLabel}${destination ? ` to ${destination}` : ""}` },
    {
      title: "In progress",
      detail: settled ? `${headline} was received • 56s` : "Awaiting confirmation",
    },
    ...(settled ? [{ title: "Completed", detail: "Transfer was completed • Total 2mins" }] : []),
  ];

  return (
    <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title="Receipt" onBack={() => navigate(-1)} />

        <div className="flex flex-col gap-3">
          {/* Hero */}
          <SectionCard className="flex flex-col items-center gap-2 px-4 py-3">
            <div className="flex items-center gap-2.5">
              {assetSymbol && <AssetMark symbol={assetSymbol} className="size-12" />}
              <p className="whitespace-nowrap font-gasoek leading-[1.4] text-brand-grey900">
                {headlineParts ? (
                  <>
                    <span className="text-[33px]">{headlineParts[1]}.</span>
                    <span className="text-[17px]">{headlineParts[2]}</span>
                  </>
                ) : (
                  <span className="text-[33px]">{headline || "—"}</span>
                )}
              </p>
            </div>
          </SectionCard>

          {/* Status rail */}
          <SectionCard className="px-4 py-1.5">
            {steps.map((step, i) => {
              const isLast = i === steps.length - 1;
              const active = isLast && settled;
              return (
                <div key={step.title} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <CheckCircleIcon
                      className={cn("size-[18px] shrink-0", active ? "text-[#11C514]" : "text-brand-grey300")}
                    />
                    {!isLast && <span className="w-px flex-1 bg-brand-grey300" />}
                  </div>
                  <div className={cn("min-w-0 flex-1", !isLast && "pb-1")}>
                    <p className="text-[13px] font-semibold leading-[1.4] text-brand-grey900">{step.title}</p>
                    <p className="truncate text-[10px] leading-[1.3] text-brand-bodyText">{step.detail}</p>
                  </div>
                </div>
              );
            })}
          </SectionCard>

          {/* Details */}
          <SectionCard className="px-4">
            {detailRows.map((f) => (
              <div key={f.label} className="flex items-center gap-4 border-b border-brand-grey100 py-1.5">
                <div className="min-w-0 flex-1 py-1.5">
                  <p className="truncate text-xs leading-[1.3] text-brand-bodyText">{f.label}</p>
                  <p
                    className={cn(
                      "truncate text-[15px] font-semibold leading-[1.4]",
                      isCopyable(f.label) ? "text-brand-blue500" : "text-brand-grey900",
                    )}
                  >
                    {f.value}
                  </p>
                </div>
                {isCopyable(f.label) && (
                  <button type="button" onClick={() => handleCopy(f.value)} aria-label={`Copy ${f.label}`}>
                    {copied === f.value ? (
                      <Check className="size-5 text-brand-successText" />
                    ) : (
                      <CopyIcon className="size-5 text-brand-blue500" />
                    )}
                  </button>
                )}
              </div>
            ))}

            <div className="flex items-center gap-4 py-1.5">
              <div className="min-w-0 flex-1 py-1.5">
                <p className="text-xs leading-[1.3] text-brand-bodyText">Transaction ID</p>
                <p className="truncate text-[15px] font-semibold leading-[1.4] text-brand-blue500">{txId}</p>
              </div>
              <button type="button" onClick={() => handleCopy(txId)} aria-label="Copy transaction ID">
                {copied === txId ? (
                  <Check className="size-5 text-brand-successText" />
                ) : (
                  <CopyIcon className="size-5 text-brand-blue500" />
                )}
              </button>
            </div>
          </SectionCard>

          {/* Actions */}
          <div className="flex items-start gap-2 px-4 pt-3 sm:px-0">
            <button
              type="button"
              onClick={() => setReportView("select")}
              className="flex min-w-0 flex-1 items-center justify-center rounded-lg border border-brand-danger bg-brand-surface px-4 py-[11px] font-manrope text-base font-medium leading-[1.6] text-brand-danger transition-colors hover:bg-brand-danger/5"
            >
              Report
            </button>
            <Popover open={showDownloadOptions} onOpenChange={setShowDownloadOptions}>
              <PopoverTrigger className="flex min-w-0 flex-1 items-center justify-center gap-3 rounded-lg bg-brand-blue500 px-4 py-[11px] font-manrope text-base font-medium leading-[1.6] text-brand-grey50 transition-opacity hover:opacity-90">
                <ArrowDownIcon className="size-6" />
                Download
              </PopoverTrigger>
              <PopoverContent align="end" className="w-44 border-brand-grey100 bg-brand-surface p-1">
                <button
                  type="button"
                  onClick={() => handleDownload("pdf")}
                  className="flex w-full items-center gap-3 rounded px-2 py-2 text-left transition-colors hover:bg-brand-grey50"
                >
                  <FileText className="size-4 text-brand-danger" />
                  <span className="text-sm text-brand-grey900">PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload("image")}
                  className="flex w-full items-center gap-3 rounded px-2 py-2 text-left transition-colors hover:bg-brand-grey50"
                >
                  <Image className="size-4 text-brand-blue500" />
                  <span className="text-sm text-brand-grey900">Image</span>
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </PageTransition>
    </AppShell>
  );
};

export default Receipt;

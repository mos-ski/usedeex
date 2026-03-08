import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Copy, Check, Share2, Clock, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import NewBadge from "@/components/NewBadge";

const timeline = [
  { label: "Initiated", time: "2:30:00 PM", status: "done" },
  { label: "Processing", time: "2:30:05 PM", status: "done" },
  { label: "Confirmed on chain", time: "2:30:45 PM", status: "done" },
  { label: "Payout sent", time: "2:31:12 PM", status: "done" },
  { label: "Settled", time: "2:31:15 PM", status: "done" },
];

const TransactionDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [copied, setCopied] = useState("");
  const tx = location.state?.tx || { type: "Sold BTC", amount: "₦450,000", hashId: "TXN-8F3A21D9B7C4", date: "Mar 8, 2026, 2:30 PM", status: "Completed", destination: "8103674006 - PalmPay" };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <MobileLayout hideNav>
      <PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">Transaction Detail</h2>
            <NewBadge />
          </div>

          <div className="bg-card border border-border rounded-xl p-5 mb-4">
            <div className="text-center mb-4">
              <p className="text-2xl font-bold text-foreground">{tx.amount}</p>
              <p className="text-sm text-muted-foreground">{tx.type}</p>
              <span className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-medium ${tx.status === "Completed" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}`}>{tx.status}</span>
            </div>

            <div className="space-y-3">
              {[
                { label: "Date", value: tx.date },
                { label: "Hash ID", value: tx.hashId, copyable: true },
                { label: "Destination", value: tx.destination },
              ].filter(r => r.value).map(r => (
                <div key={r.label} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{r.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-foreground font-mono">{r.value}</span>
                    {r.copyable && (
                      <button onClick={() => handleCopy(r.value!, r.label)}>
                        {copied === r.label ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5 text-primary" />}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-card border border-border rounded-xl p-5 mb-4">
            <h3 className="text-sm font-semibold text-foreground mb-4">Timeline</h3>
            <div className="space-y-0">
              {timeline.map((step, i) => (
                <div key={step.label} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    {step.status === "done" ? (
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                    ) : step.status === "failed" ? (
                      <XCircle className="w-5 h-5 text-destructive shrink-0" />
                    ) : (
                      <Clock className="w-5 h-5 text-muted-foreground shrink-0" />
                    )}
                    {i < timeline.length - 1 && <div className="w-px h-6 bg-border" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium text-foreground">{step.label}</p>
                    <p className="text-xs text-muted-foreground">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full h-12 bg-secondary rounded-xl text-foreground font-medium flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" /> Share Receipt
          </button>
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default TransactionDetail;

import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";

const Receipt = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const txId = "67f788093409caf4217e81c5";

  const handleCopy = () => {
    navigator.clipboard.writeText(txId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fields = [
    { label: "Amount from", value: "16.89 TRX", color: "text-primary" },
    { label: "Amount to", value: "0.00 USDT", color: "text-primary" },
    { label: "Status", value: "Pending", isBadge: true },
    { label: "Transaction type", value: "Swap", color: "text-foreground" },
    { label: "Timestamp", value: "Apr 10th, 2025 | 9:57 AM", color: "text-foreground" },
    { label: "Description", value: "Swap from TRX to USDT", color: "text-foreground" },
  ];

  return (
    <MobileLayout hideNav>
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
                  <span className="text-sm bg-warning/20 text-warning px-3 py-1 rounded-full">{f.value}</span>
                ) : (
                  <p className={`text-lg font-semibold ${f.color}`}>{f.value}</p>
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

        {/* Action buttons */}
        <div className="flex gap-3 mt-8">
          <button className="flex-1 h-12 bg-primary rounded-xl text-primary-foreground font-semibold">
            Share/Download
          </button>
          <button className="flex-1 h-12 border border-primary rounded-xl text-primary font-semibold">
            Report
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Receipt;

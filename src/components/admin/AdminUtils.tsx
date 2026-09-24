import { useState } from "react";
import { Copy, Check, AlertTriangle, Zap, Monitor, ArrowUpRight, ShieldAlert, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// ===== NEW BADGE =====
export const NewBadge = () => (
  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider bg-brand-warning400 text-white uppercase animate-pulse ml-1">NEW</span>
);

// ===== STATUS BADGE =====
export const StatusBadge = ({ status }: { status: string }) => {
  const s = status.toUpperCase();
  const styles: Record<string, string> = {
    COMPLETED: "bg-brand-success/10 text-brand-success",
    APPROVED: "bg-brand-success/10 text-brand-success",
    CONFIRMED: "bg-brand-success/10 text-brand-success",
    ACTIVE: "bg-brand-success/10 text-brand-success",
    REJECTED: "bg-brand-danger/10 text-brand-danger",
    FAILED: "bg-brand-danger/10 text-brand-danger",
    PENDING: "bg-brand-warning400/10 text-brand-warning400",
    FROZEN: "bg-brand-blue500/10 text-brand-blue500",
    INACTIVE: "bg-brand-grey100 text-brand-grey500",
    FLAGGED: "bg-brand-danger/10 text-brand-danger",
  };
  return <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wider ${styles[s] || "bg-brand-grey100 text-brand-grey500"}`}>{s}</span>;
};

// ===== SEVERITY BADGE =====
export const SeverityBadge = ({ severity }: { severity: string }) => {
  const styles: Record<string, string> = {
    critical: "bg-brand-danger/10 text-brand-danger",
    high: "bg-brand-amber/10 text-brand-amber",
    medium: "bg-brand-warning400/10 text-brand-warning400",
    low: "bg-brand-grey100 text-brand-grey500",
  };
  return <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wider uppercase ${styles[severity] || "bg-brand-grey100 text-brand-grey500"}`}>{severity}</span>;
};

// ===== ALERT STATUS BADGE =====
export const AlertStatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    pending: "bg-brand-warning400/10 text-brand-warning400",
    reviewing: "bg-brand-blue500/10 text-brand-blue500",
    resolved: "bg-brand-success/10 text-brand-success",
    dismissed: "bg-brand-grey100 text-brand-grey500",
  };
  return <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wider uppercase ${styles[status] || "bg-brand-grey100 text-brand-grey500"}`}>{status}</span>;
};

// ===== TRIGGER ICON =====
export const TriggerIcon = ({ type }: { type: string }) => {
  const icons: Record<string, typeof AlertTriangle> = {
    "high-frequency": Zap,
    "multi-device": Monitor,
    "large-withdrawal": ArrowUpRight,
    "failed-kyc": ShieldAlert,
    "wash-trading": AlertTriangle,
  };
  const Icon = icons[type] || AlertCircle;
  return <Icon className="w-4 h-4" />;
};

// ===== COPY BUTTON =====
export const CopyButton = ({ text, label }: { text: string; label?: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(label ? `${label} copied` : "Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="shrink-0 p-1 rounded hover:bg-brand-grey50 transition-colors" title="Copy">
      {copied ? <Check className="w-3.5 h-3.5 text-brand-success" /> : <Copy className="w-3.5 h-3.5 text-brand-grey500 hover:text-brand-grey900" />}
    </button>
  );
};

// ===== CONFIRM DIALOG =====
export const ConfirmDialog = ({
  open, onClose, onConfirm, title, description, destructive = false
}: {
  open: boolean; onClose: () => void; onConfirm: () => void;
  title: string; description: string; destructive?: boolean;
}) => (
  <AlertDialog open={open} onOpenChange={(o) => !o && onClose()}>
    <AlertDialogContent className="bg-brand-surface border-brand-grey100">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-brand-grey900">{title}</AlertDialogTitle>
        <AlertDialogDescription className="text-brand-grey500">{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="bg-brand-tint text-brand-blue500 border-brand-grey100 hover:bg-brand-blue500/10">Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
          className={destructive ? "bg-brand-danger text-white hover:bg-red-600" : "bg-brand-blue500 text-white hover:bg-brand-blue400"}
        >
          Confirm
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

// ===== PAGINATION =====
export const AdminPagination = ({
  page, totalPages, totalItems, perPage, onPageChange
}: {
  page: number; totalPages: number; totalItems: number; perPage: number; onPageChange: (p: number) => void;
}) => {
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, totalItems);
  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <p className="text-xs text-brand-grey500">Showing {start}–{end} of {totalItems}</p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="h-8 px-3 text-xs rounded-lg bg-brand-tint text-brand-blue500 disabled:opacity-40 hover:bg-brand-blue500/10"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).slice(
          Math.max(0, page - 3),
          Math.min(totalPages, page + 2)
        ).map(p => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 text-xs rounded-lg font-medium ${p === page ? "bg-brand-blue500 text-white" : "bg-brand-tint text-brand-grey500 hover:text-brand-grey900"}`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="h-8 px-3 text-xs rounded-lg bg-brand-tint text-brand-blue500 disabled:opacity-40 hover:bg-brand-blue500/10"
        >
          Next
        </button>
      </div>
    </div>
  );
};

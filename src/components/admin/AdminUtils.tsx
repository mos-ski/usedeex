import { useState } from "react";
import { Copy, Check, AlertTriangle, Zap, Monitor, ArrowUpRight, ShieldAlert, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// ===== NEW BADGE =====
export const NewBadge = () => (
  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white">NEW</span>
);

// ===== STATUS BADGE =====
export const StatusBadge = ({ status }: { status: string }) => {
  const s = status.toUpperCase();
  const styles: Record<string, string> = {
    COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    CONFIRMED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
    REJECTED: "bg-red-50 text-red-700 border-red-200",
    FAILED: "bg-red-50 text-red-700 border-red-200",
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    FROZEN: "bg-blue-50 text-blue-700 border-blue-200",
    INACTIVE: "bg-gray-50 text-gray-600 border-gray-200",
    FLAGGED: "bg-red-50 text-red-700 border-red-200",
  };
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[s] || "bg-gray-50 text-gray-600 border-gray-200"}`}>{s}</span>;
};

// ===== SEVERITY BADGE =====
export const SeverityBadge = ({ severity }: { severity: string }) => {
  const styles: Record<string, string> = {
    critical: "bg-red-50 text-red-700 border-red-200",
    high: "bg-orange-50 text-orange-700 border-orange-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    low: "bg-blue-50 text-blue-700 border-blue-200",
  };
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase ${styles[severity] || "bg-gray-50 text-gray-600 border-gray-200"}`}>{severity}</span>;
};

// ===== ALERT STATUS BADGE =====
export const AlertStatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    reviewing: "bg-blue-50 text-blue-700 border-blue-200",
    resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dismissed: "bg-gray-50 text-gray-600 border-gray-200",
  };
  return <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase ${styles[status] || "bg-gray-50 text-gray-600 border-gray-200"}`}>{status}</span>;
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
    <button onClick={handleCopy} className="shrink-0 rounded p-1 transition-colors hover:bg-gray-100" title="Copy">
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-500 hover:text-gray-900" />}
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
    <AlertDialogContent className="border-gray-200 bg-white text-gray-900">
      <AlertDialogHeader>
        <AlertDialogTitle className="font-semibold text-gray-900">{title}</AlertDialogTitle>
        <AlertDialogDescription className="text-sm text-gray-500">{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
          className={destructive ? "rounded-lg bg-red-600 text-white hover:bg-red-700" : "rounded-lg bg-amber-500 text-white hover:bg-amber-600"}
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
    <div className="mt-4 flex items-center justify-between px-1">
      <p className="text-xs text-gray-500">Showing {start}–{end} of {totalItems}</p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).slice(
          Math.max(0, page - 3),
          Math.min(totalPages, page + 2)
        ).map(p => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${p === page ? "bg-amber-500 text-white" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

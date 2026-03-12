import { useState } from "react";
import { Copy, Check, AlertTriangle, Zap, Monitor, ArrowUpRight, ShieldAlert, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// ===== NEW BADGE =====
export const NewBadge = () => (
  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider bg-[hsl(var(--warning))] text-background uppercase animate-pulse ml-1">NEW</span>
);

// ===== STATUS BADGE =====
export const StatusBadge = ({ status }: { status: string }) => {
  const s = status.toUpperCase();
  const styles: Record<string, string> = {
    COMPLETED: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]",
    APPROVED: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]",
    CONFIRMED: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]",
    ACTIVE: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]",
    REJECTED: "bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))]",
    FAILED: "bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))]",
    PENDING: "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]",
    FROZEN: "bg-[hsl(var(--deex-blue))]/20 text-[hsl(var(--deex-blue))]",
    INACTIVE: "bg-muted text-muted-foreground",
    FLAGGED: "bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))]",
  };
  return <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wider ${styles[s] || "bg-muted text-muted-foreground"}`}>{s}</span>;
};

// ===== SEVERITY BADGE =====
export const SeverityBadge = ({ severity }: { severity: string }) => {
  const styles: Record<string, string> = {
    critical: "bg-[hsl(var(--destructive))]/20 text-[hsl(var(--destructive))]",
    high: "bg-[hsl(var(--deex-orange))]/20 text-[hsl(var(--deex-orange))]",
    medium: "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]",
    low: "bg-muted text-muted-foreground",
  };
  return <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wider uppercase ${styles[severity] || "bg-muted text-muted-foreground"}`}>{severity}</span>;
};

// ===== ALERT STATUS BADGE =====
export const AlertStatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    pending: "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]",
    reviewing: "bg-[hsl(var(--deex-blue))]/20 text-[hsl(var(--deex-blue))]",
    resolved: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]",
    dismissed: "bg-muted text-muted-foreground",
  };
  return <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wider uppercase ${styles[status] || "bg-muted text-muted-foreground"}`}>{status}</span>;
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
    <button onClick={handleCopy} className="shrink-0 p-1 rounded hover:bg-secondary transition-colors" title="Copy">
      {copied ? <Check className="w-3.5 h-3.5 text-[hsl(var(--success))]" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />}
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
    <AlertDialogContent className="bg-card border-border">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-foreground">{title}</AlertDialogTitle>
        <AlertDialogDescription className="text-muted-foreground">{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="bg-secondary text-foreground border-border hover:bg-secondary/80">Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={onConfirm}
          className={destructive ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "bg-primary text-primary-foreground hover:bg-primary/90"}
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
      <p className="text-xs text-muted-foreground">Showing {start}–{end} of {totalItems}</p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="h-8 px-3 text-xs rounded-lg bg-secondary text-foreground disabled:opacity-40 hover:bg-secondary/80"
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
            className={`w-8 h-8 text-xs rounded-lg font-medium ${p === page ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="h-8 px-3 text-xs rounded-lg bg-secondary text-foreground disabled:opacity-40 hover:bg-secondary/80"
        >
          Next
        </button>
      </div>
    </div>
  );
};

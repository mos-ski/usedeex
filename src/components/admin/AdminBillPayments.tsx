import { useState } from "react";
import { Upload, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { billPaymentStats, billPaymentsList } from "@/data/adminMockData";
import { StatusBadge, CopyButton, AdminPagination, NewBadge } from "./AdminUtils";
import { ResponsiveTable, ResponsiveColumn } from "./ResponsiveTable";

const PER_PAGE = 10;

type BillType = "All" | "Airtime" | "Data" | "Electricity" | "Cable TV" | "Betting";

type BillPayment = typeof billPaymentsList[0];

const AdminBillPayments = () => {
  const [typeFilter, setTypeFilter] = useState<BillType>("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = billPaymentsList.filter(b => {
    const matchType = typeFilter === "All" || b.type === typeFilter;
    const matchStatus = statusFilter === "All" || b.status === statusFilter;
    return matchType && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const statusCounts = {
    All: billPaymentsList.length,
    COMPLETED: billPaymentsList.filter(b => b.status === "COMPLETED").length,
    PENDING: billPaymentsList.filter(b => b.status === "PENDING").length,
    FAILED: billPaymentsList.filter(b => b.status === "FAILED").length,
  };

  const typeCounts: Record<BillType, number> = {
    All: billPaymentsList.length,
    Airtime: billPaymentsList.filter(b => b.type === "Airtime").length,
    Data: billPaymentsList.filter(b => b.type === "Data").length,
    Electricity: billPaymentsList.filter(b => b.type === "Electricity").length,
    "Cable TV": billPaymentsList.filter(b => b.type === "Cable TV").length,
    Betting: billPaymentsList.filter(b => b.type === "Betting").length,
  };

  const handleRetry = (id: string, user: string) => {
    toast.success(`Retrying bill payment for ${user}...`, {
      description: `Transaction ${id} has been queued for retry.`,
    });
  };

  const columns: ResponsiveColumn<BillPayment>[] = [
    {
      key: "user",
      label: "User",
      mobile: true,
      render: (row) => <span className="text-sm text-foreground font-medium truncate">{row.user}</span>,
    },
    {
      key: "type",
      label: "Type",
      mobile: true,
      render: (row) => {
        const colors: Record<string, string> = {
          Airtime: "bg-primary/20 text-primary",
          Data: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]",
          Electricity: "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]",
          "Cable TV": "bg-[hsl(var(--deex-blue))]/20 text-[hsl(var(--deex-blue))]",
          Betting: "bg-[hsl(var(--deex-orange))]/20 text-[hsl(var(--deex-orange))]",
        };
        return <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${colors[row.type] || "bg-muted text-muted-foreground"}`}>{row.type}</span>;
      },
    },
    {
      key: "provider",
      label: "Provider",
      render: (row) => <span className="text-sm text-foreground">{row.provider}</span>,
    },
    {
      key: "amount",
      label: "Amount",
      mobile: true,
      render: (row) => <span className="text-sm font-semibold text-foreground">{row.amount}</span>,
    },
    {
      key: "phone",
      label: "Phone",
      render: (row) => (
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground">{row.phone}</span>
          <CopyButton text={row.phone} label="Phone" />
        </div>
      ),
    },
    {
      key: "txRef",
      label: "Ref",
      render: (row) => (
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground font-mono">{row.txRef.slice(0, 12)}...</span>
          <CopyButton text={row.txRef} label="Ref" />
        </div>
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (row) => <span className="text-xs text-muted-foreground whitespace-nowrap">{row.date}</span>,
    },
    {
      key: "status",
      label: "Status",
      mobile: true,
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "action",
      label: "Action",
      render: (row) => row.status === "FAILED" ? (
        <button
          onClick={(e) => { e.stopPropagation(); handleRetry(row.id, row.user); }}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))] hover:bg-[hsl(var(--warning))]/30 text-[10px] font-semibold transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Retry
        </button>
      ) : <span className="text-xs text-muted-foreground">—</span>,
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-muted-foreground tracking-wider">BILL PAYMENTS</p>
          <NewBadge />
        </div>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <Upload className="w-3.5 h-3.5" /> Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4 md:p-5">
          <p className="text-xs text-muted-foreground mb-1">Total Transactions</p>
          <p className="text-xl md:text-2xl font-bold text-foreground">{billPaymentStats.totalTransactions.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 md:p-5">
          <p className="text-xs text-muted-foreground mb-1">Total Volume</p>
          <p className="text-xl md:text-2xl font-bold text-foreground">{billPaymentStats.totalVolume}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 md:p-5">
          <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
          <p className="text-xl md:text-2xl font-bold text-[hsl(var(--success))]">{billPaymentStats.successRate}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 md:p-5">
          <p className="text-xs text-muted-foreground mb-1">Failed</p>
          <p className="text-xl md:text-2xl font-bold text-destructive">{billPaymentStats.failedCount}</p>
        </div>
      </div>

      {/* Type filter */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
        {(["All", "Airtime", "Data", "Electricity", "Cable TV", "Betting"] as BillType[]).map(t => (
          <button key={t} onClick={() => { setTypeFilter(t); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${typeFilter === t ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
            {t} ({typeCounts[t]})
          </button>
        ))}
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {(["All", "COMPLETED", "PENDING", "FAILED"] as const).map(s => (
          <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${statusFilter === s ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
            {s === "All" ? `All (${statusCounts.All})` : `${s.charAt(0) + s.slice(1).toLowerCase()} (${statusCounts[s]})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <ResponsiveTable
        data={paginated}
        columns={columns}
        startIndex={(page - 1) * PER_PAGE}
      />

      <AdminPagination page={page} totalPages={totalPages} totalItems={filtered.length} perPage={PER_PAGE} onPageChange={setPage} />
    </div>
  );
};

export default AdminBillPayments;

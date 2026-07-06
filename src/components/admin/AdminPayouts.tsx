import { useState } from "react";
import { Upload, RotateCcw, Search } from "lucide-react";
import { toast } from "sonner";
import { payoutsList } from "@/data/adminMockData";
import { StatusBadge, CopyButton, AdminPagination, NewBadge } from "./AdminUtils";
import { ResponsiveTable, ResponsiveColumn } from "./ResponsiveTable";

const PER_PAGE = 10;

type PayoutItem = typeof payoutsList[0];

const AdminPayouts = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = payoutsList.filter(p => {
    const matchStatus = statusFilter === "All" || p.status === statusFilter;
    const s = searchQuery.toLowerCase().trim();
    const matchSearch = !s ||
      p.name.toLowerCase().includes(s) ||
      p.orderRef.toLowerCase().includes(s) ||
      (p.bank || "").toLowerCase().includes(s);
    return matchStatus && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const statusCounts = {
    All: payoutsList.length,
    COMPLETED: payoutsList.filter(p => p.status === "COMPLETED").length,
    PENDING: payoutsList.filter(p => p.status === "PENDING").length,
    FAILED: payoutsList.filter(p => p.status === "FAILED").length,
  };


  const columns: ResponsiveColumn<PayoutItem>[] = [
    { key: "sn", label: "S/N", render: (_, i) => <span className="text-xs text-muted-foreground">{i + 1}</span> },
    { key: "name", label: "Name", mobile: true, render: (p) => <span className="text-sm text-foreground font-medium truncate">{p.name}</span> },
    { key: "amount", label: "Amount", mobile: true, render: (p) => <span className="text-sm font-semibold text-foreground">{p.amount}</span> },
    { key: "bank", label: "Bank Details", render: (p) => <span className="text-xs text-muted-foreground">{p.bank}</span> },
    { key: "orderRef", label: "Order Ref", render: (p) => (
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground font-mono">{p.orderRef.slice(0, 10)}...</span>
        <CopyButton text={p.orderRef} label="Order Ref" />
      </div>
    )},
    { key: "date", label: "Date", render: (p) => <span className="text-xs text-muted-foreground whitespace-nowrap">{p.date}</span> },
    { key: "status", label: "Status", mobile: true, render: (p) => <StatusBadge status={p.status} /> },
    { key: "action", label: "Action", render: (p) => p.status === "FAILED" ? (
      <button onClick={(e) => { e.stopPropagation(); toast.success(`Retrying payout for ${p.name}...`); }}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))] hover:bg-[hsl(var(--warning))]/30 text-[10px] font-semibold transition-colors">
        <RotateCcw className="w-3 h-3" /> Retry
      </button>
    ) : <span className="text-xs text-muted-foreground">—</span> },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-muted-foreground tracking-wider">PAYOUTS</p>
          <NewBadge />
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
              placeholder="Search name, ref, bank…"
              className="h-8 w-48 bg-secondary rounded-lg pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground outline-none" />
          </div>
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <Upload className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4 md:p-5">
          <p className="text-xs text-muted-foreground mb-1">Total Payouts</p>
          <p className="text-2xl font-bold text-foreground">{payoutsList.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 md:p-5">
          <p className="text-xs text-muted-foreground mb-1">Completed</p>
          <p className="text-2xl font-bold text-[hsl(var(--success))]">{statusCounts.COMPLETED}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 md:p-5">
          <p className="text-xs text-muted-foreground mb-1">Failed</p>
          <p className="text-2xl font-bold text-destructive">{statusCounts.FAILED}</p>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {(["All", "COMPLETED", "PENDING", "FAILED"] as const).map(s => (
          <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
            {s === "All" ? `All (${statusCounts.All})` : `${s.charAt(0) + s.slice(1).toLowerCase()} (${statusCounts[s]})`}
          </button>
        ))}
      </div>

      <ResponsiveTable data={paginated} columns={columns} startIndex={(page - 1) * PER_PAGE} />
      <AdminPagination page={page} totalPages={totalPages} totalItems={filtered.length} perPage={PER_PAGE} onPageChange={setPage} />
    </div>
  );
};

export default AdminPayouts;

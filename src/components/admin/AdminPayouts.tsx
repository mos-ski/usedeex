import { useState } from "react";
import { Upload, ArrowUpDown } from "lucide-react";
import { payoutsList } from "@/data/adminMockData";
import { StatusBadge, CopyButton, AdminPagination, NewBadge } from "./AdminUtils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PER_PAGE = 10;

const AdminPayouts = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = payoutsList.filter(p =>
    statusFilter === "All" || p.status === statusFilter
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const statusCounts = {
    All: payoutsList.length,
    COMPLETED: payoutsList.filter(p => p.status === "COMPLETED").length,
    PENDING: payoutsList.filter(p => p.status === "PENDING").length,
    FAILED: payoutsList.filter(p => p.status === "FAILED").length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-muted-foreground tracking-wider">PAYOUTS</p>
          <NewBadge />
        </div>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <Upload className="w-3.5 h-3.5" /> Export
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs text-muted-foreground mb-1">Total Payouts</p>
          <p className="text-2xl font-bold text-foreground">{payoutsList.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs text-muted-foreground mb-1">Completed</p>
          <p className="text-2xl font-bold text-[hsl(var(--success))]">{statusCounts.COMPLETED}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs text-muted-foreground mb-1">Failed</p>
          <p className="text-2xl font-bold text-destructive">{statusCounts.FAILED}</p>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-4">
        {(["All", "COMPLETED", "PENDING", "FAILED"] as const).map(s => (
          <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
            {s === "All" ? `All (${statusCounts.All})` : `${s.charAt(0) + s.slice(1).toLowerCase()} (${statusCounts[s]})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S/N</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Bank Details</TableHead>
              <TableHead>Order Ref</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((p, i) => (
              <TableRow key={i}>
                <TableCell className="text-xs text-muted-foreground">{(page - 1) * PER_PAGE + i + 1}</TableCell>
                <TableCell className="text-sm text-foreground font-medium">{p.name}</TableCell>
                <TableCell className="text-sm font-semibold text-foreground">{p.amount}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{p.bank}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground font-mono">{p.orderRef.slice(0, 10)}...</span>
                    <CopyButton text={p.orderRef} label="Order Ref" />
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{p.date}</TableCell>
                <TableCell><StatusBadge status={p.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AdminPagination page={page} totalPages={totalPages} totalItems={filtered.length} perPage={PER_PAGE} onPageChange={setPage} />
    </div>
  );
};

export default AdminPayouts;

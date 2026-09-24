import { useState } from "react";
import { Upload, RotateCcw, Search } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = billPaymentsList.filter(b => {
    const matchType = typeFilter === "All" || b.type === typeFilter;
    const matchStatus = statusFilter === "All" || b.status === statusFilter;
    const s = searchQuery.toLowerCase().trim();
    const matchSearch = !s ||
      b.user.toLowerCase().includes(s) ||
      b.phone.includes(s) ||
      b.provider.toLowerCase().includes(s) ||
      b.txRef.toLowerCase().includes(s);
    return matchType && matchStatus && matchSearch;
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
      render: (row) => <span className="text-sm text-brand-grey900 font-medium truncate">{row.user}</span>,
    },
    {
      key: "type",
      label: "Type",
      mobile: true,
      render: (row) => {
        const colors: Record<string, string> = {
          Airtime: "bg-brand-blue500/10 text-brand-blue500",
          Data: "bg-brand-success/10 text-brand-success",
          Electricity: "bg-brand-warning400/10 text-brand-warning400",
          "Cable TV": "bg-brand-purple/10 text-brand-purple",
          Betting: "bg-brand-amber/10 text-brand-amber",
        };
        return <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${colors[row.type] || "bg-brand-grey100 text-brand-grey500"}`}>{row.type}</span>;
      },
    },
    {
      key: "provider",
      label: "Provider",
      render: (row) => <span className="text-sm text-brand-grey900">{row.provider}</span>,
    },
    {
      key: "amount",
      label: "Amount",
      mobile: true,
      render: (row) => <span className="text-sm font-semibold text-brand-grey900">{row.amount}</span>,
    },
    {
      key: "phone",
      label: "Phone",
      render: (row) => (
        <div className="flex items-center gap-1">
          <span className="text-xs text-brand-grey500">{row.phone}</span>
          <CopyButton text={row.phone} label="Phone" />
        </div>
      ),
    },
    {
      key: "txRef",
      label: "Ref",
      render: (row) => (
        <div className="flex items-center gap-1">
          <span className="text-xs text-brand-grey500 font-mono">{row.txRef.slice(0, 12)}...</span>
          <CopyButton text={row.txRef} label="Ref" />
        </div>
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (row) => <span className="text-xs text-brand-grey500 whitespace-nowrap">{row.date}</span>,
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
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-brand-warning400/10 text-brand-warning400 hover:bg-brand-warning400/20 text-[10px] font-semibold transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Retry
        </button>
      ) : <span className="text-xs text-brand-grey500">—</span>,
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-brand-grey500 uppercase tracking-wider">BILL PAYMENTS</p>
          <NewBadge />
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-grey500" />
            <input value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
              placeholder="Search user, phone, ref…"
              className="h-8 w-52 bg-brand-surface border border-brand-grey100 rounded-lg pl-8 pr-3 text-xs text-brand-grey900 placeholder:text-brand-grey500 outline-none focus:ring-1 focus:ring-brand-blue500" />
          </div>
          <button className="flex items-center gap-1.5 text-xs text-brand-grey500 hover:text-brand-grey900">
            <Upload className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-brand-surface border border-brand-grey100 rounded-xl p-4 md:p-5">
          <p className="text-xs text-brand-grey500 mb-1">Total Transactions</p>
          <p className="text-xl md:text-2xl font-bold text-brand-grey900">{billPaymentStats.totalTransactions.toLocaleString()}</p>
        </div>
        <div className="bg-brand-surface border border-brand-grey100 rounded-xl p-4 md:p-5">
          <p className="text-xs text-brand-grey500 mb-1">Total Volume</p>
          <p className="text-xl md:text-2xl font-bold text-brand-grey900">{billPaymentStats.totalVolume}</p>
        </div>
        <div className="bg-brand-surface border border-brand-grey100 rounded-xl p-4 md:p-5">
          <p className="text-xs text-brand-grey500 mb-1">Success Rate</p>
          <p className="text-xl md:text-2xl font-bold text-brand-success">{billPaymentStats.successRate}</p>
        </div>
        <div className="bg-brand-surface border border-brand-grey100 rounded-xl p-4 md:p-5">
          <p className="text-xs text-brand-grey500 mb-1">Failed</p>
          <p className="text-xl md:text-2xl font-bold text-brand-danger">{billPaymentStats.failedCount}</p>
        </div>
      </div>

      {/* Type filter */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
        {(["All", "Airtime", "Data", "Electricity", "Cable TV", "Betting"] as BillType[]).map(t => (
          <button key={t} onClick={() => { setTypeFilter(t); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${typeFilter === t ? "bg-brand-blue500 text-white" : "bg-brand-tint text-brand-blue500 hover:bg-brand-blue500/10"}`}>
            {t} ({typeCounts[t]})
          </button>
        ))}
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {(["All", "COMPLETED", "PENDING", "FAILED"] as const).map(s => (
          <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${statusFilter === s ? "bg-brand-amber text-white" : "bg-brand-tint text-brand-blue500 hover:bg-brand-blue500/10"}`}>
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

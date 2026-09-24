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
      render: (row) => <span className="text-sm text-gray-900 font-medium truncate">{row.user}</span>,
    },
    {
      key: "type",
      label: "Type",
      mobile: true,
      render: (row) => {
        const colors: Record<string, string> = {
          Airtime: "border-blue-200 bg-blue-50 text-blue-700",
          Data: "border-emerald-200 bg-emerald-50 text-emerald-700",
          Electricity: "border-amber-200 bg-amber-50 text-amber-700",
          "Cable TV": "border-purple-200 bg-purple-50 text-purple-700",
          Betting: "border-orange-200 bg-orange-50 text-orange-700",
        };
        return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors[row.type] || "border-gray-200 bg-gray-50 text-gray-600"}`}>{row.type}</span>;
      },
    },
    {
      key: "provider",
      label: "Provider",
      render: (row) => <span className="text-sm text-gray-900">{row.provider}</span>,
    },
    {
      key: "amount",
      label: "Amount",
      mobile: true,
      render: (row) => <span className="text-sm font-semibold text-gray-900">{row.amount}</span>,
    },
    {
      key: "phone",
      label: "Phone",
      render: (row) => (
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500">{row.phone}</span>
          <CopyButton text={row.phone} label="Phone" />
        </div>
      ),
    },
    {
      key: "txRef",
      label: "Ref",
      render: (row) => (
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 font-mono">{row.txRef.slice(0, 12)}...</span>
          <CopyButton text={row.txRef} label="Ref" />
        </div>
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (row) => <span className="text-xs text-gray-500 whitespace-nowrap">{row.date}</span>,
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
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-semibold transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Retry
        </button>
      ) : <span className="text-xs text-gray-500">—</span>,
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">BILL PAYMENTS</p>
          <NewBadge />
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input value={searchQuery} onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
              placeholder="Search user, phone, ref…"
              className="h-8 w-52 rounded-lg border border-gray-200 bg-white pl-8 pr-3 text-xs text-gray-900 placeholder:text-gray-400 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400" />
          </div>
          <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900">
            <Upload className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-5">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Transactions</p>
          <p className="text-2xl font-display font-bold text-gray-900">{billPaymentStats.totalTransactions.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-5">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Volume</p>
          <p className="text-2xl font-display font-bold text-gray-900">{billPaymentStats.totalVolume}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-5">
          <p className="text-sm font-medium text-gray-500 mb-1">Success Rate</p>
          <p className="text-2xl font-display font-bold text-emerald-600">{billPaymentStats.successRate}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-5">
          <p className="text-sm font-medium text-gray-500 mb-1">Failed</p>
          <p className="text-2xl font-display font-bold text-red-600">{billPaymentStats.failedCount}</p>
        </div>
      </div>

      {/* Type filter */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
        {(["All", "Airtime", "Data", "Electricity", "Cable TV", "Betting"] as BillType[]).map(t => (
          <button key={t} onClick={() => { setTypeFilter(t); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border whitespace-nowrap transition-colors ${typeFilter === t ? "border-amber-500 bg-amber-500 text-white" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>
            {t} ({typeCounts[t]})
          </button>
        ))}
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {(["All", "COMPLETED", "PENDING", "FAILED"] as const).map(s => (
          <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border whitespace-nowrap transition-colors ${statusFilter === s ? "border-amber-500 bg-amber-500 text-white" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>
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

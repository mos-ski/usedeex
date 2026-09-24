import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Upload } from "lucide-react";
import { usersStats, signupData, customersList } from "@/data/adminMockData";
import { StatusBadge, CopyButton, AdminPagination } from "./AdminUtils";
import { ResponsiveTable, ResponsiveColumn } from "./ResponsiveTable";
import {
  AreaChart, Area, ResponsiveContainer,
} from "recharts";

const PER_PAGE = 10;

type Customer = typeof customersList[0];

const AdminUsers = () => {
  const navigate = useNavigate();
  const [usersTab, setUsersTab] = useState<"customers" | "merchants" | "clients">("customers");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusTab, setStatusTab] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = customersList.filter(c => {
    const matchSearch = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusTab === "all" || c.status === statusTab;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const statusCounts = {
    all: customersList.length,
    active: customersList.filter(c => c.status === "active").length,
    inactive: customersList.filter(c => c.status === "inactive").length,
    flagged: customersList.filter(c => c.status === "flagged").length,
  };

  const getInitials = (name: string) => {
    if (name === "—— ——") return "??";
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  };

  const columns: ResponsiveColumn<Customer>[] = [
    {
      key: "sn",
      label: "S/N",
      render: (_, i) => <span className="text-xs text-gray-500">{i + 1}</span>,
    },
    {
      key: "name",
      label: "Name",
      mobile: true,
      render: (c) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-[10px] font-bold text-amber-700 shrink-0">
            {getInitials(c.name)}
          </div>
          <span className="text-sm text-gray-900 font-medium truncate">{c.name}</span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (c) => (
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-500 truncate">{c.email}</span>
          <CopyButton text={c.email} label="Email" />
        </div>
      ),
    },
    {
      key: "kyc",
      label: "KYC",
      mobile: true,
      render: (c) => <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-blue-50 text-blue-700 border border-blue-200">{c.kyc}</span>,
    },
    {
      key: "phone",
      label: "Phone",
      render: (c) => (
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-500">{c.phone}</span>
          <CopyButton text={c.phone} label="Phone" />
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      mobile: true,
      render: (c) => <StatusBadge status={c.status} />,
    },
    {
      key: "created",
      label: "Date Created",
      render: (c) => <span className="text-xs text-gray-500">{c.created}</span>,
    },
    {
      key: "lastLogin",
      label: "Last Login",
      render: (c) => <span className="text-xs text-gray-500">{c.lastLogin}</span>,
    },
  ];

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-500">Total Customers</p>
          <p className="mt-1.5 font-display text-2xl font-bold text-gray-900">{usersStats.total.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 col-span-2 lg:col-span-2">
          <div className="flex gap-4 mb-2 flex-wrap">
            {usersStats.breakdown.map(b => (
              <div key={b.label}>
                <p className="text-sm font-medium text-gray-500 mb-0.5">{b.label}</p>
                <p className="text-lg font-display font-bold text-gray-900">{b.count}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5 hidden lg:block">
          <p className="text-sm font-medium text-gray-500 mb-2">Signups (chart)</p>
          <ResponsiveContainer width="100%" height={60}>
            <AreaChart data={signupData}>
              <Area type="monotone" dataKey="users" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabs + Search + Export */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="flex gap-2 flex-wrap">
          {(["customers", "merchants", "clients"] as const).map(t => (
            <button key={t} onClick={() => setUsersTab(t)} className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${usersTab === t ? "border-amber-500 bg-amber-500 text-white" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
              placeholder="Search name or email..."
              className="h-10 w-48 rounded-lg border border-gray-200 bg-white pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>
          <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Upload className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Status filter tabs with counts */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {(["all", "active", "inactive", "flagged"] as const).map(s => (
          <button key={s} onClick={() => { setStatusTab(s); setPage(1); }}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${statusTab === s ? "border-amber-500 bg-amber-500 text-white" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>
            {s === "all" ? "All Customers" : s.charAt(0).toUpperCase() + s.slice(1)} ({statusCounts[s]})
          </button>
        ))}
      </div>

      {/* Table */}
      <ResponsiveTable
        data={paginated}
        columns={columns}
        onRowClick={(c, i) => navigate(`/admin/users/${(page - 1) * PER_PAGE + paginated.indexOf(c)}`)}
        startIndex={(page - 1) * PER_PAGE}
      />

      <AdminPagination page={page} totalPages={totalPages} totalItems={filtered.length} perPage={PER_PAGE} onPageChange={setPage} />
    </div>
  );
};

export default AdminUsers;

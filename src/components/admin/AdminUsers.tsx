import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Upload, ArrowUpDown } from "lucide-react";
import { usersStats, signupData, customersList } from "@/data/adminMockData";
import { StatusBadge, CopyButton, AdminPagination } from "./AdminUtils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const PER_PAGE = 10;

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

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs text-muted-foreground mb-1">Total Customers</p>
          <p className="text-2xl font-bold text-foreground">{usersStats.total.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 col-span-2">
          <div className="flex gap-4 mb-2">
            {usersStats.breakdown.map(b => (
              <div key={b.label}>
                <p className="text-xs text-muted-foreground mb-0.5">{b.label}</p>
                <p className="text-lg font-bold text-foreground">{b.count}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs text-muted-foreground mb-2">Signups (chart)</p>
          <ResponsiveContainer width="100%" height={60}>
            <AreaChart data={signupData}>
              <Area type="monotone" dataKey="users" stroke="hsl(213 80% 55%)" fill="hsl(213 80% 55% / 0.1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabs + Search + Export */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          {(["customers", "merchants", "clients"] as const).map(t => (
            <button key={t} onClick={() => setUsersTab(t)} className={`text-sm pb-1 border-b-2 ${usersTab === t ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground"}`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
              placeholder="Search name or email..."
              className="h-9 w-48 bg-secondary rounded-lg pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
          </div>
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <Upload className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Status filter tabs with counts */}
      <div className="flex gap-2 mb-4">
        {(["all", "active", "inactive", "flagged"] as const).map(s => (
          <button key={s} onClick={() => { setStatusTab(s); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${statusTab === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
            {s === "all" ? "All Customers" : s.charAt(0).toUpperCase() + s.slice(1)} ({statusCounts[s]})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">S/N</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>KYC</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Last Login</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((c, i) => (
              <TableRow key={i} className="cursor-pointer" onClick={() => navigate(`/admin/users/${(page - 1) * PER_PAGE + i}`)}>
                <TableCell className="text-xs text-muted-foreground">{(page - 1) * PER_PAGE + i + 1}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                      {getInitials(c.name)}
                    </div>
                    <span className="text-sm text-foreground font-medium">{c.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground">{c.email}</span>
                    <CopyButton text={c.email} label="Email" />
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-[10px] px-2.5 py-1 rounded-full font-medium bg-primary/20 text-primary">{c.kyc}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground">{c.phone}</span>
                    <CopyButton text={c.phone} label="Phone" />
                  </div>
                </TableCell>
                <TableCell><StatusBadge status={c.status} /></TableCell>
                <TableCell className="text-xs text-muted-foreground">{c.created}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{c.lastLogin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AdminPagination page={page} totalPages={totalPages} totalItems={filtered.length} perPage={PER_PAGE} onPageChange={setPage} />
    </div>
  );
};

export default AdminUsers;

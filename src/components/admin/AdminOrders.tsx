import { useState } from "react";
import { ArrowUpDown, AlertCircle, Upload } from "lucide-react";
import { toast } from "sonner";
import { ordersData, ordersList, payoutsList, otcOrdersList } from "@/data/adminMockData";
import { StatusBadge, CopyButton, AdminPagination } from "./AdminUtils";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PER_PAGE = 10;
type OrdersSubTab = "orders" | "payouts" | "rewards" | "otc";
type SortField = "name" | "amount" | "date" | "status";

const AdminOrders = () => {
  const [subTab, setSubTab] = useState<OrdersSubTab>("orders");
  const [autoPay, setAutoPay] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [page, setPage] = useState(1);

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortAsc(!sortAsc);
    else { setSortField(field); setSortAsc(true); }
  };

  const filteredOrders = ordersList.filter(o =>
    statusFilter === "All" || o.status === statusFilter
  );

  let sortedOrders = [...filteredOrders];
  if (sortField) {
    sortedOrders.sort((a, b) => {
      const av = a[sortField] || "";
      const bv = b[sortField] || "";
      return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }

  const totalPages = Math.ceil(sortedOrders.length / PER_PAGE);
  const paginated = sortedOrders.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const SortableHead = ({ label, field }: { label: string; field: SortField }) => (
    <TableHead>
      <button onClick={() => toggleSort(field)} className="flex items-center gap-1 hover:text-foreground">
        {label} <ArrowUpDown className="w-3 h-3" />
      </button>
    </TableHead>
  );

  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-sm text-muted-foreground mb-1">Total Order</p>
          <p className="text-2xl font-bold text-foreground">{ordersData.totalOrder}</p>
          <p className="text-xs text-muted-foreground mb-3">{ordersData.totalOrderBtc}</p>
          <div className="flex gap-1 mb-2">
            {ordersData.orderDistribution.map(d => (
              <div key={d.label} className={`h-6 ${d.color} rounded text-[10px] font-medium flex items-center justify-center text-foreground`} style={{ width: `${Math.max(d.pct, 8)}%` }}>
                {d.pct > 0 ? `${d.pct}%` : "0.0%"}
              </div>
            ))}
          </div>
          <div className="flex gap-3 text-[10px] text-muted-foreground">
            {ordersData.orderDistribution.map(d => <span key={d.label}>{d.label}</span>)}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-sm text-muted-foreground mb-1">Total payout</p>
          <p className="text-2xl font-bold text-foreground">{ordersData.totalPayout}</p>
          <p className="text-xs text-muted-foreground">{ordersData.totalPayoutNgn}</p>
          <div className="flex gap-1 mt-3 mb-2">
            {ordersData.payoutDistribution.map(d => (
              <div key={d.label} className={`h-6 ${d.color} rounded text-[10px] font-medium flex items-center justify-center text-foreground`} style={{ width: `${Math.max(d.pct, 8)}%` }}>
                {d.pct}%
              </div>
            ))}
          </div>
          <div className="mt-3 bg-destructive/10 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <div>
                <p className="text-xs font-medium text-foreground">Some payouts failed</p>
                <p className="text-[10px] text-muted-foreground">You have {ordersData.failedPayouts} payouts uncompleted.</p>
              </div>
            </div>
            <button onClick={() => toast.info("Reviewing failed payouts...")} className="h-7 px-3 bg-destructive text-destructive-foreground rounded text-xs font-medium">Review</button>
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-foreground">Activity</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <label className="flex items-center gap-2">
            <Switch checked={autoPay} onCheckedChange={v => { setAutoPay(v); toast.success(`Auto Pay ${v ? "enabled" : "disabled"}`); }} />
            AUTO PAY: {autoPay ? "ON" : "OFF"}
          </label>
          <span>|</span>
          <button className="flex items-center gap-1 hover:text-foreground"><Upload className="w-3.5 h-3.5" /> EXPORT</button>
        </div>
      </div>

      {/* Sub tabs */}
      <div className="flex gap-4 mb-4">
        {(["orders", "payouts", "rewards", "otc"] as OrdersSubTab[]).map(t => (
          <button key={t} onClick={() => { setSubTab(t); setPage(1); }} className={`text-sm pb-1 border-b-2 ${subTab === t ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground"}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders tab */}
      {subTab === "orders" && (
        <>
          {/* Status filter pills */}
          <div className="flex gap-2 mb-4">
            {["All", "COMPLETED", "PENDING", "FAILED"].map(s => (
              <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                {s === "All" ? `All (${ordersList.length})` : `${s.charAt(0) + s.slice(1).toLowerCase()} (${ordersList.filter(o => o.status === s).length})`}
              </button>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <SortableHead label="Name" field="name" />
                  <TableHead>Asset</TableHead>
                  <TableHead>Type</TableHead>
                  <SortableHead label="Amount" field="amount" />
                  <TableHead>Wallet Address</TableHead>
                  <TableHead>Confirms</TableHead>
                  <TableHead>Trans ID</TableHead>
                  <TableHead>Payout Ref</TableHead>
                  <SortableHead label="Date" field="date" />
                  <SortableHead label="Status" field="status" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((o, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-sm text-foreground font-medium">{o.name}</TableCell>
                    <TableCell className="text-sm text-foreground">{o.asset}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{o.type}</TableCell>
                    <TableCell className="text-sm text-foreground whitespace-pre-line">{o.amount}</TableCell>
                    <TableCell>
                      {o.walletAddress !== "—" ? (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground font-mono">{o.walletAddress}</span>
                          <CopyButton text={o.walletAddress} label="Wallet" />
                        </div>
                      ) : <span className="text-xs text-muted-foreground">—</span>}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{o.confirmations > 0 ? `${o.confirmations} ✓` : "—"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground font-mono">{o.txId.slice(0, 10)}...</span>
                        <CopyButton text={o.txId} label="Trans ID" />
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{o.payoutRef}</TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{o.date}</TableCell>
                    <TableCell><StatusBadge status={o.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <AdminPagination page={page} totalPages={totalPages} totalItems={sortedOrders.length} perPage={PER_PAGE} onPageChange={setPage} />
        </>
      )}

      {/* Payouts tab */}
      {subTab === "payouts" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                {["Name", "Amount", "Bank Details", "Order Ref", "Date", "Status"].map(h => (
                  <TableHead key={h}>{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {payoutsList.map((p, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm text-foreground font-medium">{p.name}</TableCell>
                  <TableCell className="text-sm font-semibold text-foreground">{p.amount}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{p.bank}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground font-mono">{p.orderRef.slice(0, 10)}...</span>
                      <CopyButton text={p.orderRef} label="Order Ref" />
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{p.date}</TableCell>
                  <TableCell><StatusBadge status={p.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Rewards tab */}
      {subTab === "rewards" && (
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <p className="text-muted-foreground text-sm">Reward-related orders will appear here when users redeem points.</p>
        </div>
      )}

      {/* OTC tab */}
      {subTab === "otc" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                {["Client", "Type", "Asset", "Amount", "Value", "Rate", "Status", "Date"].map(h => (
                  <TableHead key={h}>{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {otcOrdersList.map((o, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm text-foreground font-medium">{o.client}</TableCell>
                  <TableCell>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${o.type === "BUY" ? "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]" : "bg-[hsl(var(--deex-orange))]/20 text-[hsl(var(--deex-orange))]"}`}>{o.type}</span>
                  </TableCell>
                  <TableCell className="text-sm text-foreground">{o.asset}</TableCell>
                  <TableCell className="text-sm text-foreground">{o.amount}</TableCell>
                  <TableCell className="text-sm font-semibold text-foreground">{o.value}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{o.rate}</TableCell>
                  <TableCell><StatusBadge status={o.status} /></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{o.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;

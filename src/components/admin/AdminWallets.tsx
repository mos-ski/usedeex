import { useState } from "react";
import { Eye, EyeOff, Plus, Upload } from "lucide-react";
import { toast } from "sonner";
import CryptoIcon from "@/components/CryptoIcon";
import { deexWallet, customersWallet, tradeVolumeData, assetDistribution, walletActivity } from "@/data/adminMockData";
import { StatusBadge, CopyButton, AdminPagination } from "./AdminUtils";
import { Switch } from "@/components/ui/switch";
import { ResponsiveTable, ResponsiveColumn } from "./ResponsiveTable";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

type WalletActivityItem = typeof walletActivity[0];
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

const PER_PAGE = 8;

const AdminWallets = () => {
  const [walletTab, setWalletTab] = useState<"deex" | "customers">("deex");
  const [showBalance, setShowBalance] = useState(false);
  const [autoSwap, setAutoSwap] = useState(true);
  const [autoWithdrawal, setAutoWithdrawal] = useState(false);
  const [typeFilter, setTypeFilter] = useState<"All" | "Credit" | "Debit">("All");
  const [page, setPage] = useState(1);

  const currentWallet = walletTab === "deex" ? deexWallet : customersWallet;

  const filtered = walletActivity.filter(w => typeFilter === "All" || w.type === typeFilter);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const totalCredits = walletActivity.filter(w => w.type === "Credit").length;
  const totalDebits = walletActivity.filter(w => w.type === "Debit").length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-3">WALLETS</p>
          <div className="flex gap-4">
            <button onClick={() => setWalletTab("deex")} className={`text-sm pb-1 border-b-2 ${walletTab === "deex" ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground"}`}>DeeX Wallet</button>
            <button onClick={() => setWalletTab("customers")} className={`text-sm pb-1 border-b-2 ${walletTab === "customers" ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground"}`}>Customers Wallet</button>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <button onClick={() => setShowBalance(!showBalance)} className="flex items-center gap-1 hover:text-foreground">
            {showBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showBalance ? "HIDE BALANCE" : "SHOW BALANCE"}
          </button>
          <span>|</span>
          <button className="flex items-center gap-1 hover:text-foreground"><Upload className="w-3.5 h-3.5" /> EXPORT</button>
        </div>
      </div>

      {/* Balance cards */}
      <div className={`grid ${walletTab === "deex" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-[600px]"} gap-3 md:gap-4 mb-6`}>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs text-muted-foreground mb-1">Total Crypto</p>
          <p className="text-2xl font-bold text-foreground">{showBalance ? currentWallet.totalCrypto : "****"}</p>
          {walletTab === "deex" && (
            <div className="flex gap-2 mt-4">
              <button onClick={() => toast.success("Fund wallet dialog opened")} className="flex-1 h-9 bg-primary text-primary-foreground rounded-lg text-sm font-medium flex items-center justify-center gap-1"><Plus className="w-4 h-4" /> Fund Wallet</button>
              <button onClick={() => toast.success("Withdraw dialog opened")} className="flex-1 h-9 bg-secondary text-foreground rounded-lg text-sm font-medium flex items-center justify-center gap-1"><Upload className="w-4 h-4" /> Withdraw</button>
            </div>
          )}
        </div>
        {walletTab === "deex" && (
          <>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-xs text-muted-foreground mb-1">Glyde Balance</p>
              <p className="text-2xl font-bold text-foreground">{showBalance ? deexWallet.glydeBalance : "****"}</p>
              <button onClick={() => toast.success("Fund Glyde dialog opened")} className="mt-4 h-9 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium flex items-center gap-1"><Plus className="w-4 h-4" /> Fund Wallet</button>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <p className="text-xs text-muted-foreground mb-1">Palmpay Balance</p>
              <p className="text-2xl font-bold text-foreground">{showBalance ? deexWallet.palmpayBalance : "****"}</p>
              <button onClick={() => toast.success("Fund Palmpay dialog opened")} className="mt-4 h-9 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium flex items-center gap-1"><Plus className="w-4 h-4" /> Fund Wallet</button>
            </div>
          </>
        )}
      </div>


      {/* Asset cards */}
      <div className="flex gap-4 overflow-x-auto pb-2 mb-6">
        {currentWallet.assets.map(a => (
          <div key={a.symbol} className="bg-card border border-border rounded-xl p-4 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <CryptoIcon symbol={a.symbol} size="sm" />
              <span className="text-sm font-semibold text-foreground">{a.symbol}</span>
            </div>
            <p className="text-lg font-bold text-foreground">{a.amount}</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-secondary rounded text-xs text-muted-foreground">{a.usd}</span>
          </div>
        ))}
      </div>

      {/* Performance */}
      <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-4">PERFORMANCE</p>
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <div className="flex-1 bg-card border border-border rounded-xl p-5">
          <p className="text-sm font-semibold text-foreground mb-4">Trade Volume</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={tradeVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215 15% 55%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215 15% 55%)", fontSize: 12 }} axisLine={false} tickFormatter={v => `$${v.toLocaleString()}`} />
              <Tooltip contentStyle={{ background: "hsl(220 22% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: 8, color: "#fff" }} />
              <Bar dataKey="volume" fill="hsl(213 80% 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full lg:w-80 lg:shrink-0 bg-card border border-border rounded-xl p-5">
          <p className="text-sm font-semibold text-foreground mb-4">Assets</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={assetDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={85} dataKey="value" paddingAngle={2}>
                {assetDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center -mt-[120px] relative z-0">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-bold text-foreground">{walletTab === "deex" ? "$23.48K" : "$15.56K"}</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-16 justify-center">
            {assetDistribution.map(a => (
              <span key={a.name} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <span className="w-2 h-2 rounded-full" style={{ background: a.color }} /> {a.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
        <p className="text-sm font-semibold text-foreground">Activity</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <label className="flex items-center gap-2">
            <Switch checked={autoSwap} onCheckedChange={v => { setAutoSwap(v); toast.success(`Auto Swap ${v ? "enabled" : "disabled"}`); }} />
            AUTO SWAP: {autoSwap ? "ON" : "OFF"}
          </label>
          <span>|</span>
          <label className="flex items-center gap-2">
            <Switch checked={autoWithdrawal} onCheckedChange={v => { setAutoWithdrawal(v); toast.success(`Auto Withdrawal ${v ? "enabled" : "disabled"}`); }} />
            AUTO WITHDRAWAL: {autoWithdrawal ? "ON" : "OFF"}
          </label>
        </div>
      </div>

      {/* Credit/Debit filter */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex gap-2">
          {(["All", "Credit", "Debit"] as const).map(t => (
            <button key={t} onClick={() => { setTypeFilter(t); setPage(1); }} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${typeFilter === t ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
              {t} {t === "Credit" ? `(${totalCredits})` : t === "Debit" ? `(${totalDebits})` : `(${walletActivity.length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {["Type", "Partner", "Amount", "Amount(NGN)", "Bal Before", "Bal After", "Trans ID", "Status", "Date"].map(h => (
                <TableHead key={h}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((w, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${w.type === "Credit" ? "bg-[hsl(var(--success))]" : "bg-primary"}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{w.type}</p>
                      <p className="text-xs text-muted-foreground">{w.sub}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    w.partner === "Obiex" ? "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]" :
                    w.partner === "Hizo" ? "bg-primary/20 text-primary" :
                    "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]"
                  }`}>{w.partner}</span>
                </TableCell>
                <TableCell className="text-sm text-foreground">{w.amount}</TableCell>
                <TableCell className="text-sm text-foreground">{w.ngn}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{w.balanceBefore}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{w.balanceAfter}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground font-mono">{w.txId.slice(0, 12)}...</span>
                    <CopyButton text={w.txId} label="Trans ID" />
                  </div>
                </TableCell>
                <TableCell><StatusBadge status={w.status} /></TableCell>
                <TableCell className="text-xs text-muted-foreground">{w.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AdminPagination page={page} totalPages={totalPages} totalItems={filtered.length} perPage={PER_PAGE} onPageChange={setPage} />
    </div>
  );
};

export default AdminWallets;

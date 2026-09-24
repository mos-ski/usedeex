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
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">WALLETS</p>
          <div className="flex gap-2">
            <button onClick={() => setWalletTab("deex")} className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${walletTab === "deex" ? "border-amber-500 bg-amber-500 text-white" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>DeeX Wallet</button>
            <button onClick={() => setWalletTab("customers")} className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${walletTab === "customers" ? "border-amber-500 bg-amber-500 text-white" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>Customers Wallet</button>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <button onClick={() => setShowBalance(!showBalance)} className="flex items-center gap-1 hover:text-gray-900">
            {showBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showBalance ? "HIDE BALANCE" : "SHOW BALANCE"}
          </button>
          <span>|</span>
          <button className="flex items-center gap-1 hover:text-gray-900"><Upload className="w-3.5 h-3.5" /> EXPORT</button>
        </div>
      </div>

      {/* Balance cards */}
      <div className={`grid ${walletTab === "deex" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 max-w-[600px]"} gap-4 mb-6`}>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Crypto</p>
          <p className="text-2xl font-display font-bold text-gray-900">{showBalance ? currentWallet.totalCrypto : "****"}</p>
          {walletTab === "deex" && (
            <div className="flex gap-2 mt-4">
              <button onClick={() => toast.success("Fund wallet dialog opened")} className="flex-1 h-9 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1"><Plus className="w-4 h-4" /> Fund Wallet</button>
              <button onClick={() => toast.success("Withdraw dialog opened")} className="flex-1 h-9 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium flex items-center justify-center gap-1"><Upload className="w-4 h-4" /> Withdraw</button>
            </div>
          )}
        </div>
        {walletTab === "deex" && (
          <>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm font-medium text-gray-500 mb-1">Glyde Balance</p>
              <p className="text-2xl font-display font-bold text-gray-900">{showBalance ? deexWallet.glydeBalance : "****"}</p>
              <button onClick={() => toast.success("Fund Glyde dialog opened")} className="mt-4 h-9 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium flex items-center gap-1"><Plus className="w-4 h-4" /> Fund Wallet</button>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <p className="text-sm font-medium text-gray-500 mb-1">Palmpay Balance</p>
              <p className="text-2xl font-display font-bold text-gray-900">{showBalance ? deexWallet.palmpayBalance : "****"}</p>
              <button onClick={() => toast.success("Fund Palmpay dialog opened")} className="mt-4 h-9 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium flex items-center gap-1"><Plus className="w-4 h-4" /> Fund Wallet</button>
            </div>
          </>
        )}
      </div>


      {/* Asset cards */}
      <div className="flex gap-4 overflow-x-auto pb-2 mb-6">
        {currentWallet.assets.map(a => (
          <div key={a.symbol} className="rounded-xl border border-gray-200 bg-white p-4 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <CryptoIcon symbol={a.symbol} size="sm" />
              <span className="text-sm font-semibold text-gray-900">{a.symbol}</span>
            </div>
            <p className="text-lg font-display font-bold text-gray-900">{a.amount}</p>
            <span className="inline-block mt-1 rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-500">{a.usd}</span>
          </div>
        ))}
      </div>

      {/* Performance */}
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">PERFORMANCE</p>
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <div className="flex-1 rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm font-semibold text-gray-900 mb-4">Trade Volume</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={tradeVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickFormatter={v => `$${v.toLocaleString()}`} />
              <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #e5e7eb", borderRadius: 8, color: "#111827", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)" }} />
              <Bar dataKey="volume" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full lg:w-80 lg:shrink-0 rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm font-semibold text-gray-900 mb-4">Assets</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={assetDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={85} dataKey="value" paddingAngle={2}>
                {assetDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center -mt-[120px] relative z-0">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-lg font-display font-bold text-gray-900">{walletTab === "deex" ? "$23.48K" : "$15.56K"}</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-16 justify-center">
            {assetDistribution.map(a => (
              <span key={a.name} className="flex items-center gap-1 text-[10px] text-gray-500">
                <span className="w-2 h-2 rounded-full" style={{ background: a.color }} /> {a.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
        <p className="text-sm font-semibold text-gray-900">Activity</p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
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
            <button key={t} onClick={() => { setTypeFilter(t); setPage(1); }} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${typeFilter === t ? "border-amber-500 bg-amber-500 text-white" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>
              {t} {t === "Credit" ? `(${totalCredits})` : t === "Debit" ? `(${totalDebits})` : `(${walletActivity.length})`}
            </button>
          ))}
        </div>
      </div>

      {(() => {
        const activityColumns: ResponsiveColumn<WalletActivityItem>[] = [
          { key: "type", label: "Type", mobile: true, render: (w) => (
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${w.type === "Credit" ? "bg-emerald-500" : "bg-blue-500"}`} />
              <div>
                <p className="text-sm font-medium text-gray-900">{w.type}</p>
                <p className="text-xs text-gray-500">{w.sub}</p>
              </div>
            </div>
          )},
          { key: "partner", label: "Partner", mobile: true, render: (w) => (
            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
              w.partner === "Obiex" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
              w.partner === "Hizo" ? "bg-blue-50 text-blue-700 border-blue-200" :
              "bg-amber-50 text-amber-700 border-amber-200"
            }`}>{w.partner}</span>
          )},
          { key: "amount", label: "Amount", mobile: true, render: (w) => <span className="text-sm font-medium text-gray-900">{w.amount}</span> },
          { key: "ngn", label: "Amount(NGN)", render: (w) => <span className="text-sm font-medium text-gray-900">{w.ngn}</span> },
          { key: "balBefore", label: "Bal Before", render: (w) => <span className="text-xs text-gray-500">{w.balanceBefore}</span> },
          { key: "balAfter", label: "Bal After", render: (w) => <span className="text-xs text-gray-500">{w.balanceAfter}</span> },
          { key: "txId", label: "Trans ID", render: (w) => (
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500 font-mono">{w.txId.slice(0, 12)}...</span>
              <CopyButton text={w.txId} label="Trans ID" />
            </div>
          )},
          { key: "status", label: "Status", mobile: true, render: (w) => <StatusBadge status={w.status} /> },
          { key: "date", label: "Date", render: (w) => <span className="text-xs text-gray-500">{w.date}</span> },
        ];
        return <ResponsiveTable data={paginated} columns={activityColumns} startIndex={(page - 1) * PER_PAGE} />;
      })()}

      <AdminPagination page={page} totalPages={totalPages} totalItems={filtered.length} perPage={PER_PAGE} onPageChange={setPage} />
    </div>
  );
};

export default AdminWallets;

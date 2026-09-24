import { useState } from "react";
import { Eye, EyeOff, ExternalLink, Wallet, Users, UserPlus, Building2 } from "lucide-react";
import { dashboardMetrics, performanceData, quickLinks } from "@/data/adminMockData";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const metricIcons = [Wallet, Users, UserPlus, Building2];

const AdminDashboard = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [perfTab, setPerfTab] = useState<"all" | "crypto" | "giftcard">("all");

  return (
    <div>
      {/* Metrics */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">OVERVIEW</p>
        <button onClick={() => setShowBalance(!showBalance)} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900">
          {showBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {showBalance ? "HIDE BALANCE" : "SHOW BALANCE"}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {dashboardMetrics.map((m, i) => {
          const Icon = metricIcons[i];
          return (
            <div key={m.label} className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{m.label}</p>
                  <p className="mt-1.5 font-display text-2xl font-bold text-gray-900">{showBalance ? m.value : "********"}</p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1">
                <span className="inline-flex h-6 w-16 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-500">
                  {showBalance ? "visible" : "•••••••"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance */}
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">PERFORMANCE</p>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex gap-2 mb-4">
            {(["all", "crypto", "giftcard"] as const).map(t => (
              <button key={t} onClick={() => setPerfTab(t)} className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${perfTab === t ? "border-amber-500 bg-amber-500 text-white" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>
                {t === "all" ? "All" : t === "crypto" ? "Crypto" : "Giftcard"}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mb-1">Total Traded</p>
          <p className="text-2xl font-display font-bold text-gray-900 mb-4">₦2,396,106,090.97</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorCrypto" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)},000`} />
              <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #e5e7eb", borderRadius: 8, color: "#111827", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)" }} />
              {(perfTab === "all" || perfTab === "crypto") && <Area type="monotone" dataKey="crypto" stroke="#f59e0b" fill="url(#colorCrypto)" strokeWidth={2} />}
              {(perfTab === "all" || perfTab === "giftcard") && <Area type="monotone" dataKey="giftcard" stroke="#fbbf24" fill="transparent" strokeWidth={2} />}
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 justify-center text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Crypto</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Giftcard</span>
          </div>
        </div>

        <div className="w-full lg:w-72 lg:shrink-0">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm font-semibold text-gray-900 mb-3">Quick Links</p>
            <div className="space-y-2">
              {quickLinks.map(link => (
                <div key={link} className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 transition-colors hover:bg-amber-100">
                  <span className="text-sm font-medium text-amber-800">{link}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import { useState } from "react";
import { Eye, EyeOff, ExternalLink } from "lucide-react";
import { dashboardMetrics, performanceData, quickLinks } from "@/data/adminMockData";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [perfTab, setPerfTab] = useState<"all" | "crypto" | "giftcard">("all");

  return (
    <div>
      {/* Metrics */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-brand-grey500 uppercase tracking-wider">OVERVIEW</p>
        <button onClick={() => setShowBalance(!showBalance)} className="flex items-center gap-1.5 text-xs text-brand-grey500 hover:text-brand-grey900">
          {showBalance ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          {showBalance ? "HIDE BALANCE" : "SHOW BALANCE"}
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
        {dashboardMetrics.map(m => (
          <div key={m.label} className="bg-brand-surface border border-brand-grey100 rounded-xl p-5">
            <p className="text-xs text-brand-grey500 mb-2 font-medium uppercase tracking-wider">{m.label}</p>
            <p className="text-xl font-gasoek font-bold text-brand-grey900">{showBalance ? m.value : "********"}</p>
            <div className="mt-2 h-6 w-16 bg-brand-grey100 rounded text-xs flex items-center justify-center text-brand-grey500">
              {showBalance ? "visible" : "•••••••"}
            </div>
          </div>
        ))}
      </div>

      {/* Performance */}
      <p className="text-xs font-semibold text-brand-grey500 uppercase tracking-wider mb-4">PERFORMANCE</p>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-brand-surface border border-brand-grey100 rounded-xl p-5">
          <div className="flex gap-4 mb-4">
            {(["all", "crypto", "giftcard"] as const).map(t => (
              <button key={t} onClick={() => setPerfTab(t)} className={`text-sm pb-1 border-b-2 transition-colors ${perfTab === t ? "border-brand-blue500 text-brand-blue500 font-medium" : "border-transparent text-brand-grey500"}`}>
                {t === "all" ? "All" : t === "crypto" ? "Crypto" : "Giftcard"}
              </button>
            ))}
          </div>
          <p className="text-sm text-brand-grey500 mb-1">Total Traded</p>
          <p className="text-2xl font-gasoek font-bold text-brand-grey900 mb-4">₦2,396,106,090.97</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={performanceData}>
              <defs>
                <linearGradient id="colorCrypto" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0B75C2" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0B75C2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7EBEE" />
              <XAxis dataKey="month" tick={{ fill: "#617889", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "#617889", fontSize: 12 }} axisLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)},000`} />
              <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E7EBEE", borderRadius: 8, color: "#13181B" }} />
              {(perfTab === "all" || perfTab === "crypto") && <Area type="monotone" dataKey="crypto" stroke="#0B75C2" fill="url(#colorCrypto)" strokeWidth={2} />}
              {(perfTab === "all" || perfTab === "giftcard") && <Area type="monotone" dataKey="giftcard" stroke="#FFAF26" fill="transparent" strokeWidth={2} />}
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 justify-center text-xs text-brand-grey500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-brand-blue500" /> Crypto</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-brand-amber" /> Giftcard</span>
          </div>
        </div>

        <div className="w-full lg:w-72 lg:shrink-0">
          <div className="bg-brand-surface border border-brand-grey100 rounded-xl p-5">
            <p className="text-sm font-semibold text-brand-grey900 mb-3">Quick Links</p>
            <div className="space-y-2">
              {quickLinks.map(link => (
                <div key={link} className="flex items-center justify-between px-3 py-2.5 bg-brand-grey50 rounded-lg">
                  <span className="text-sm text-brand-grey900">{link}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-brand-grey500" />
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

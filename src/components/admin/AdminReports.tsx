import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { reportCards } from "@/data/adminMockData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const AdminReports = () => {
  const [reportDetail, setReportDetail] = useState<string | null>(null);

  if (reportDetail) {
    return (
      <div>
        <button onClick={() => setReportDetail(null)} className="text-sm font-medium text-amber-600 hover:text-amber-700 mb-4 hover:underline">← Back to Reports</button>
        <h2 className="font-display text-lg font-bold text-gray-900 mb-4">{reportDetail} Report</h2>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { month: "Jan", value: reportDetail === "Revenue" ? 4500 : reportDetail === "Growth" ? 318 : 85 },
              { month: "Feb", value: reportDetail === "Revenue" ? 7200 : reportDetail === "Growth" ? 245 : 72 },
              { month: "Mar", value: reportDetail === "Revenue" ? 5800 : reportDetail === "Growth" ? 190 : 68 },
              { month: "Apr", value: reportDetail === "Revenue" ? 8100 : reportDetail === "Growth" ? 280 : 90 },
              { month: "May", value: reportDetail === "Revenue" ? 6300 : reportDetail === "Growth" ? 310 : 78 },
              { month: "Jun", value: reportDetail === "Revenue" ? 9200 : reportDetail === "Growth" ? 350 : 95 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #e5e7eb", borderRadius: 8, color: "#111827", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)" }} />
              <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {["This Month", "Last Month", "Total"].map((label, i) => (
              <div key={label} className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-xl font-display font-bold text-gray-900">{reportDetail === "Revenue" ? ["$9,200", "$6,300", "$41,100"][i] : reportDetail === "Growth" ? ["350", "310", "1,693"][i] : ["95%", "78%", "81%"][i]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {reportCards.map(r => (
          <button key={r.title} onClick={() => setReportDetail(r.title)} className="rounded-xl border border-gray-200 bg-white overflow-hidden text-left transition-shadow hover:shadow-md">
            <div className="h-36 bg-gray-50 flex items-center justify-center">
              <BarChart3 className="w-16 h-16 text-gray-300" />
            </div>
            <div className="p-4">
              <p className={`text-sm font-semibold mb-1 ${r.color}`}>{r.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{r.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminReports;

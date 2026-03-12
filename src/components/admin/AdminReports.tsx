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
        <button onClick={() => setReportDetail(null)} className="text-sm text-primary mb-4 hover:underline">← Back to Reports</button>
        <h2 className="text-lg font-semibold text-foreground mb-4">{reportDetail} Report</h2>
        <div className="bg-card border border-border rounded-xl p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { month: "Jan", value: reportDetail === "Revenue" ? 4500 : reportDetail === "Growth" ? 318 : 85 },
              { month: "Feb", value: reportDetail === "Revenue" ? 7200 : reportDetail === "Growth" ? 245 : 72 },
              { month: "Mar", value: reportDetail === "Revenue" ? 5800 : reportDetail === "Growth" ? 190 : 68 },
              { month: "Apr", value: reportDetail === "Revenue" ? 8100 : reportDetail === "Growth" ? 280 : 90 },
              { month: "May", value: reportDetail === "Revenue" ? 6300 : reportDetail === "Growth" ? 310 : 78 },
              { month: "Jun", value: reportDetail === "Revenue" ? 9200 : reportDetail === "Growth" ? 350 : 95 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 18%)" />
              <XAxis dataKey="month" tick={{ fill: "hsl(215 15% 55%)", fontSize: 12 }} axisLine={false} />
              <YAxis tick={{ fill: "hsl(215 15% 55%)", fontSize: 12 }} axisLine={false} />
              <Tooltip contentStyle={{ background: "hsl(220 22% 10%)", border: "1px solid hsl(220 15% 18%)", borderRadius: 8, color: "#fff" }} />
              <Bar dataKey="value" fill="hsl(213 80% 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {["This Month", "Last Month", "Total"].map((label, i) => (
              <div key={label} className="bg-secondary rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">{label}</p>
                <p className="text-xl font-bold text-foreground">{reportDetail === "Revenue" ? ["$9,200", "$6,300", "$41,100"][i] : reportDetail === "Growth" ? ["350", "310", "1,693"][i] : ["95%", "78%", "81%"][i]}</p>
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
          <button key={r.title} onClick={() => setReportDetail(r.title)} className="bg-card border border-border rounded-xl overflow-hidden text-left hover:border-muted-foreground/40 transition-colors">
            <div className="h-36 bg-secondary flex items-center justify-center">
              <BarChart3 className="w-16 h-16 text-muted-foreground/30" />
            </div>
            <div className="p-4">
              <p className={`text-sm font-semibold mb-1 ${r.color}`}>{r.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminReports;

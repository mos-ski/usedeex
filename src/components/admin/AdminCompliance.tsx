import { useState } from "react";
import { ChevronRight, ChevronLeft, Ban, Lock, ShieldAlert, ArrowUpRight, Clock, Info } from "lucide-react";
import { toast } from "sonner";
import { complianceAlerts, defaultComplianceRules, ComplianceAlert, ComplianceRule } from "@/data/adminMockData";
import { SeverityBadge, AlertStatusBadge, TriggerIcon, NewBadge, ConfirmDialog } from "./AdminUtils";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type ComplianceView = "alerts" | "rules" | "detail";

const triggerCircleStyles: Record<string, string> = {
  "high-frequency": "bg-amber-50 text-amber-500",
  "multi-device": "bg-blue-50 text-blue-500",
  "large-withdrawal": "bg-emerald-50 text-emerald-500",
  "failed-kyc": "bg-red-50 text-red-500",
  "wash-trading": "bg-orange-50 text-orange-500",
};

const AdminCompliance = ({ initialView = "alerts" }: { initialView?: string }) => {
  const [view, setView] = useState<ComplianceView>(initialView === "compliance-rules" ? "rules" : "alerts");
  const [selectedAlert, setSelectedAlert] = useState<ComplianceAlert | null>(null);
  const [complianceFilter, setComplianceFilter] = useState<"all" | "pending" | "reviewing" | "resolved" | "dismissed">("all");
  const [complianceRules, setComplianceRules] = useState<ComplianceRule[]>(defaultComplianceRules);
  const [complianceNote, setComplianceNote] = useState("");
  const [confirmAction, setConfirmAction] = useState<{ title: string; description: string; onConfirm: () => void; destructive?: boolean } | null>(null);

  const filteredAlerts = complianceFilter === "all" ? complianceAlerts : complianceAlerts.filter(a => a.status === complianceFilter);
  const alertStats = {
    total: complianceAlerts.length,
    critical: complianceAlerts.filter(a => a.severity === "critical").length,
    pending: complianceAlerts.filter(a => a.status === "pending").length,
    autoSuspended: complianceAlerts.filter(a => a.autoSuspended).length,
  };

  if (view === "detail" && selectedAlert) {
    return (
      <div>
        <button onClick={() => { setView("alerts"); setSelectedAlert(null); }} className="text-sm text-amber-600 hover:text-amber-700 font-medium mb-4 flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Back to Alerts
        </button>
        <div className="flex gap-6">
          <div className="flex-1 space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <SeverityBadge severity={selectedAlert.severity} />
                  <AlertStatusBadge status={selectedAlert.status} />
                  {selectedAlert.autoSuspended && (
                    <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold bg-red-50 text-red-700 border border-red-200 flex items-center gap-1">
                      <Ban className="w-3 h-3" /> AUTO-SUSPENDED
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500">{selectedAlert.id}</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-base font-bold text-amber-700">
                  {selectedAlert.userName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-gray-900">{selectedAlert.userName}</h3>
                  <p className="text-sm text-gray-500">{selectedAlert.email}</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-500"><TriggerIcon type={selectedAlert.triggerType} /></span>
                  <h4 className="text-sm font-semibold text-gray-900">{selectedAlert.trigger}</h4>
                </div>
                <p className="text-sm text-gray-500">{selectedAlert.description}</p>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> Flagged: {selectedAlert.date}</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Suspicious Activity Details</h4>
              <div className="grid grid-cols-2 gap-4">
                {selectedAlert.details.map(d => (
                  <div key={d.label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">{d.label}</p>
                    <p className="text-sm font-medium text-gray-900">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Event Timeline</h4>
              <div className="space-y-0">
                {selectedAlert.timeline.map((event, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className="flex flex-col items-center">
                      <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 ${event.actor === "System" ? "bg-amber-400" : "bg-blue-500"}`} />
                      {i < selectedAlert.timeline.length - 1 && <div className="w-px h-full bg-gray-100 min-h-[32px]" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm text-gray-900">{event.action}</p>
                      <p className="text-xs text-gray-500">{event.time} — {event.actor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-80 shrink-0 space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Admin Actions</h4>
              <div className="space-y-2">
                {[
                  { label: "✓ Approve / Clear Flag", color: "bg-amber-500 text-white border-amber-500 hover:bg-amber-600", desc: `Clear the compliance flag for ${selectedAlert.userName}?` },
                  { label: "Dismiss Alert", color: "bg-white text-gray-700 border-gray-200 hover:bg-gray-50", desc: `Dismiss this alert for ${selectedAlert.userName}?` },
                ].map(btn => (
                  <button key={btn.label} onClick={() => setConfirmAction({ title: btn.label, description: btn.desc, onConfirm: () => { toast.success("Action completed"); setConfirmAction(null); } })}
                    className={`w-full h-9 rounded-lg text-sm font-medium border transition-colors ${btn.color}`}>{btn.label}</button>
                ))}
                <button onClick={() => setConfirmAction({ title: "Suspend User", description: `Suspend ${selectedAlert.userName}'s account?`, destructive: true, onConfirm: () => { toast.error("User suspended"); setConfirmAction(null); } })}
                  className="w-full h-9 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium border border-red-200 transition-colors flex items-center justify-center gap-1.5">
                  <Ban className="w-3.5 h-3.5" /> Suspend User
                </button>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Internal Notes</h4>
              <textarea value={complianceNote} onChange={e => setComplianceNote(e.target.value)} placeholder="Add investigation notes..."
                className="w-full h-24 bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 resize-none" />
              <button onClick={() => { toast.success("Note saved"); setComplianceNote(""); }} className="mt-2 text-xs font-medium text-amber-600 hover:text-amber-700">Save Note</button>
            </div>
          </div>
        </div>
        <ConfirmDialog open={!!confirmAction} onClose={() => setConfirmAction(null)} onConfirm={() => confirmAction?.onConfirm()} title={confirmAction?.title || ""} description={confirmAction?.description || ""} destructive={confirmAction?.destructive} />
      </div>
    );
  }

  return (
    <div>
      {/* View toggle */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setView("alerts")} className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${view === "alerts" ? "border-amber-500 bg-amber-500 text-white" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>Alerts</button>
        <button onClick={() => setView("rules")} className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${view === "rules" ? "border-amber-500 bg-amber-500 text-white" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>Rules Engine</button>
      </div>

      {view === "alerts" && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            {[
              { label: "Total Alerts", value: alertStats.total, color: "text-gray-500" },
              { label: "Critical", value: alertStats.critical, color: "text-gray-500" },
              { label: "Pending Review", value: alertStats.pending, color: "text-gray-500" },
              { label: "Auto-Suspended", value: alertStats.autoSuspended, color: "text-gray-500" },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-5">
                <p className={`text-sm font-medium mb-1 ${s.color}`}>{s.label}</p>
                <p className="text-2xl font-display font-bold text-gray-900">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {(["all", "pending", "reviewing", "resolved", "dismissed"] as const).map(f => (
              <button key={f} onClick={() => setComplianceFilter(f)}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${complianceFilter === f ? "border-amber-500 bg-amber-500 text-white" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>
                {f.charAt(0).toUpperCase() + f.slice(1)} ({f === "all" ? complianceAlerts.length : complianceAlerts.filter(a => a.status === f).length})
              </button>
            ))}
          </div>
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            {filteredAlerts.map(alert => (
              <div key={alert.id} onClick={() => { setSelectedAlert(alert); setView("detail"); }}
                className="flex items-center gap-3 border-b border-gray-100 py-3 px-5 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${triggerCircleStyles[alert.triggerType] || "bg-gray-100 text-gray-500"}`}>
                  <TriggerIcon type={alert.triggerType} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="text-sm font-medium text-gray-900">{alert.userName}</p>
                    <SeverityBadge severity={alert.severity} />
                    <AlertStatusBadge status={alert.status} />
                    {alert.autoSuspended && <Ban className="w-3 h-3 text-red-600" />}
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500 truncate">{alert.trigger} — {alert.description}</p>
                  <p className="mt-1 text-[10px] text-gray-400">{alert.email} • {alert.date}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
              </div>
            ))}
          </div>
        </>
      )}

      {view === "rules" && (
        <>
          <h2 className="font-display text-lg font-bold text-gray-900 mb-1">Auto-Suspension Rules Engine <NewBadge /></h2>
          <p className="text-sm text-gray-500 mb-6">Configure thresholds that trigger automatic flags and suspensions.</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
            {[
              { label: "Active Rules", value: complianceRules.filter(r => r.enabled).length, color: "text-gray-500" },
              { label: "Disabled Rules", value: complianceRules.filter(r => !r.enabled).length, color: "text-gray-500" },
              { label: "Total Triggers", value: complianceRules.reduce((sum, r) => sum + r.triggeredCount, 0), color: "text-gray-500" },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-5">
                <p className={`text-sm font-medium mb-1 ${s.color}`}>{s.label}</p>
                <p className="text-2xl font-display font-bold text-gray-900">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {complianceRules.map(rule => (
              <div key={rule.id} className={`bg-white border rounded-xl p-5 transition-colors ${rule.enabled ? "border-gray-200" : "border-gray-200 opacity-60"}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="text-sm font-semibold text-gray-900">{rule.name}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      rule.action.includes("Auto-suspend") ? "bg-red-50 text-red-700 border border-red-200" :
                      rule.action.includes("Hold") ? "bg-amber-50 text-amber-700 border border-amber-200" :
                      "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}>{rule.action}</span>
                  </div>
                  <Switch checked={rule.enabled} onCheckedChange={() => {
                    setComplianceRules(prev => prev.map(r => r.id === rule.id ? { ...r, enabled: !r.enabled } : r));
                    toast.success(`${rule.name} ${rule.enabled ? "disabled" : "enabled"}`);
                  }} />
                </div>
                <p className="text-xs text-gray-500 mb-3">{rule.trigger}</p>
                <div className="flex items-center gap-6 text-xs">
                  <div><span className="text-gray-500">Threshold: </span><span className="text-gray-900 font-medium">{rule.threshold}</span></div>
                  <div><span className="text-gray-500">Last triggered: </span><span className="text-gray-900 font-medium">{rule.lastTriggered}</span></div>
                  <div><span className="text-gray-500">Count: </span><span className="text-gray-900 font-medium">{rule.triggeredCount}</span></div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminCompliance;

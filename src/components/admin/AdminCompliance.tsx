import { useState } from "react";
import { ChevronRight, ChevronLeft, Ban, Lock, ShieldAlert, ArrowUpRight, Clock, Info } from "lucide-react";
import { toast } from "sonner";
import { complianceAlerts, defaultComplianceRules, ComplianceAlert, ComplianceRule } from "@/data/adminMockData";
import { SeverityBadge, AlertStatusBadge, TriggerIcon, NewBadge, ConfirmDialog } from "./AdminUtils";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type ComplianceView = "alerts" | "rules" | "detail";

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
        <button onClick={() => { setView("alerts"); setSelectedAlert(null); }} className="text-sm text-primary mb-4 hover:underline flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Back to Alerts
        </button>
        <div className="flex gap-6">
          <div className="flex-1 space-y-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <SeverityBadge severity={selectedAlert.severity} />
                  <AlertStatusBadge status={selectedAlert.status} />
                  {selectedAlert.autoSuspended && (
                    <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold bg-destructive/20 text-destructive flex items-center gap-1">
                      <Ban className="w-3 h-3" /> AUTO-SUSPENDED
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{selectedAlert.id}</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-base font-bold text-primary">
                  {selectedAlert.userName.split(" ").map(n => n[0]).join("").substring(0, 2)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{selectedAlert.userName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedAlert.email}</p>
                </div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-muted-foreground"><TriggerIcon type={selectedAlert.triggerType} /></span>
                  <h4 className="text-sm font-semibold text-foreground">{selectedAlert.trigger}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{selectedAlert.description}</p>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> Flagged: {selectedAlert.date}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="text-sm font-semibold text-foreground mb-4">Suspicious Activity Details</h4>
              <div className="grid grid-cols-2 gap-4">
                {selectedAlert.details.map(d => (
                  <div key={d.label} className="bg-secondary rounded-lg p-3">
                    <p className="text-xs text-muted-foreground mb-1">{d.label}</p>
                    <p className="text-sm font-medium text-foreground">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="text-sm font-semibold text-foreground mb-4">Event Timeline</h4>
              <div className="space-y-0">
                {selectedAlert.timeline.map((event, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className="flex flex-col items-center">
                      <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 ${event.actor === "System" ? "bg-[hsl(var(--warning))]" : "bg-primary"}`} />
                      {i < selectedAlert.timeline.length - 1 && <div className="w-px h-full bg-border min-h-[32px]" />}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm text-foreground">{event.action}</p>
                      <p className="text-xs text-muted-foreground">{event.time} — {event.actor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-80 shrink-0 space-y-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3">Admin Actions</h4>
              <div className="space-y-2">
                {[
                  { label: "✓ Approve / Clear Flag", color: "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))] border-[hsl(var(--success))]/20", desc: `Clear the compliance flag for ${selectedAlert.userName}?` },
                  { label: "Dismiss Alert", color: "bg-secondary text-foreground border-transparent", desc: `Dismiss this alert for ${selectedAlert.userName}?` },
                ].map(btn => (
                  <button key={btn.label} onClick={() => setConfirmAction({ title: btn.label, description: btn.desc, onConfirm: () => { toast.success("Action completed"); setConfirmAction(null); } })}
                    className={`w-full h-9 rounded-lg text-sm font-medium border transition-colors hover:opacity-80 ${btn.color}`}>{btn.label}</button>
                ))}
                <button onClick={() => setConfirmAction({ title: "Suspend User", description: `Suspend ${selectedAlert.userName}'s account?`, destructive: true, onConfirm: () => { toast.error("User suspended"); setConfirmAction(null); } })}
                  className="w-full h-9 bg-destructive/10 text-destructive rounded-lg text-sm font-medium border border-destructive/20 hover:bg-destructive/20 flex items-center justify-center gap-1.5">
                  <Ban className="w-3.5 h-3.5" /> Suspend User
                </button>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3">Internal Notes</h4>
              <textarea value={complianceNote} onChange={e => setComplianceNote(e.target.value)} placeholder="Add investigation notes..."
                className="w-full h-24 bg-secondary rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none" />
              <button onClick={() => { toast.success("Note saved"); setComplianceNote(""); }} className="mt-2 text-xs font-medium text-primary hover:underline">Save Note</button>
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
      <div className="flex gap-4 mb-6">
        <button onClick={() => setView("alerts")} className={`text-sm pb-1 border-b-2 ${view === "alerts" ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground"}`}>Alerts</button>
        <button onClick={() => setView("rules")} className={`text-sm pb-1 border-b-2 ${view === "rules" ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground"}`}>Rules Engine</button>
      </div>

      {view === "alerts" && (
        <>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total Alerts", value: alertStats.total, color: "text-primary" },
              { label: "Critical", value: alertStats.critical, color: "text-destructive" },
              { label: "Pending Review", value: alertStats.pending, color: "text-[hsl(var(--warning))]" },
              { label: "Auto-Suspended", value: alertStats.autoSuspended, color: "text-[hsl(var(--deex-orange))]" },
            ].map(s => (
              <div key={s.label} className="bg-card border border-border rounded-xl p-5">
                <p className={`text-sm font-medium mb-1 ${s.color}`}>{s.label}</p>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mb-4">
            {(["all", "pending", "reviewing", "resolved", "dismissed"] as const).map(f => (
              <button key={f} onClick={() => setComplianceFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${complianceFilter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                {f.charAt(0).toUpperCase() + f.slice(1)} ({f === "all" ? complianceAlerts.length : complianceAlerts.filter(a => a.status === f).length})
              </button>
            ))}
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {["Severity", "User", "Trigger", "Description", "Status", "Date", ""].map(h => (
                    <TableHead key={h}>{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.map(alert => (
                  <TableRow key={alert.id} className="cursor-pointer" onClick={() => { setSelectedAlert(alert); setView("detail"); }}>
                    <TableCell><SeverityBadge severity={alert.severity} /></TableCell>
                    <TableCell>
                      <p className="text-sm font-medium text-foreground">{alert.userName}</p>
                      <p className="text-xs text-muted-foreground">{alert.email}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground"><TriggerIcon type={alert.triggerType} /></span>
                        <span className="text-sm text-foreground">{alert.trigger}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">{alert.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <AlertStatusBadge status={alert.status} />
                        {alert.autoSuspended && <Ban className="w-3 h-3 text-destructive" />}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{alert.date}</TableCell>
                    <TableCell><ChevronRight className="w-4 h-4 text-muted-foreground" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {view === "rules" && (
        <>
          <h2 className="text-lg font-semibold text-foreground mb-1">Auto-Suspension Rules Engine <NewBadge /></h2>
          <p className="text-sm text-muted-foreground mb-6">Configure thresholds that trigger automatic flags and suspensions.</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Active Rules", value: complianceRules.filter(r => r.enabled).length, color: "text-[hsl(var(--success))]" },
              { label: "Disabled Rules", value: complianceRules.filter(r => !r.enabled).length, color: "text-muted-foreground" },
              { label: "Total Triggers", value: complianceRules.reduce((sum, r) => sum + r.triggeredCount, 0), color: "text-primary" },
            ].map(s => (
              <div key={s.label} className="bg-card border border-border rounded-xl p-5">
                <p className={`text-sm font-medium mb-1 ${s.color}`}>{s.label}</p>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {complianceRules.map(rule => (
              <div key={rule.id} className={`bg-card border rounded-xl p-5 transition-colors ${rule.enabled ? "border-border" : "border-border opacity-60"}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="text-sm font-semibold text-foreground">{rule.name}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      rule.action.includes("Auto-suspend") ? "bg-destructive/20 text-destructive" :
                      rule.action.includes("Hold") ? "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]" :
                      "bg-primary/20 text-primary"
                    }`}>{rule.action}</span>
                  </div>
                  <Switch checked={rule.enabled} onCheckedChange={() => {
                    setComplianceRules(prev => prev.map(r => r.id === rule.id ? { ...r, enabled: !r.enabled } : r));
                    toast.success(`${rule.name} ${rule.enabled ? "disabled" : "enabled"}`);
                  }} />
                </div>
                <p className="text-xs text-muted-foreground mb-3">{rule.trigger}</p>
                <div className="flex items-center gap-6 text-xs">
                  <div><span className="text-muted-foreground">Threshold: </span><span className="text-foreground font-medium">{rule.threshold}</span></div>
                  <div><span className="text-muted-foreground">Last triggered: </span><span className="text-foreground font-medium">{rule.lastTriggered}</span></div>
                  <div><span className="text-muted-foreground">Count: </span><span className="text-foreground font-medium">{rule.triggeredCount}</span></div>
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

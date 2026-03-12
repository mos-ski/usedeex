import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { payrollData } from "@/data/adminMockData";
import { ConfirmDialog } from "./AdminUtils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminSettings = () => {
  const [settingsTab, setSettingsTab] = useState<"security" | "fees" | "payroll" | "rewards">("security");
  const [confirmAction, setConfirmAction] = useState<{ title: string; description: string; onConfirm: () => void; destructive?: boolean } | null>(null);

  return (
    <div>
      <div className="flex gap-6 mb-6">
        {(["security", "fees", "payroll", "rewards"] as const).map(t => (
          <button key={t} onClick={() => setSettingsTab(t)} className={`text-sm pb-1 border-b-2 ${settingsTab === t ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground"}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        {settingsTab === "payroll" && (
          <button onClick={() => toast.info("Add member dialog")} className="ml-auto h-8 px-4 bg-foreground text-background rounded-lg text-sm font-medium">Add member</button>
        )}
      </div>

      {settingsTab === "security" && (
        <div className="bg-card border border-border rounded-xl p-6 max-w-2xl space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Reset password</h3>
            <p className="text-xs text-muted-foreground mb-2">Considering changing your password?<br />Tap to reset password</p>
            <button onClick={() => toast.success("Password reset email sent")} className="text-sm text-primary font-medium hover:underline">Reset Password</button>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Delete account</h3>
            <p className="text-xs text-muted-foreground mb-2">This is really sad and we don't want to lose you,<br />but if you really must, tap to delete.</p>
            <button onClick={() => setConfirmAction({ title: "Deactivate Account", description: "Are you sure you want to deactivate your admin account? This action cannot be undone.", destructive: true, onConfirm: () => { toast.error("Account deactivated"); setConfirmAction(null); } })}
              className="h-9 px-4 bg-destructive/10 text-destructive rounded-lg text-sm font-medium border border-destructive/20 hover:bg-destructive/20">Deactivate account</button>
          </div>
        </div>
      )}

      {settingsTab === "fees" && (
        <div className="bg-card border border-border rounded-xl p-6 max-w-2xl space-y-4">
          {[
            { label: "Crypto Trade Fee", value: "1.0%" },
            { label: "Gift Card Fee", value: "2.5%" },
            { label: "Withdrawal Fee", value: "₦50" },
            { label: "DeeX Pay Fee", value: "0.5%" },
          ].map(f => (
            <div key={f.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <p className="text-sm text-foreground">{f.label}</p>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">{f.value}</span>
                <button className="text-xs text-primary hover:underline">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {settingsTab === "payroll" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <Table>
            <TableHeader><TableRow>
              {["Name", "Email", "Role", "Salary", "Date Created", "Action"].map(h => <TableHead key={h}>{h}</TableHead>)}
            </TableRow></TableHeader>
            <TableBody>
              {payrollData.map((p, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm text-foreground">{p.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{p.email}</TableCell>
                  <TableCell className="text-sm text-foreground">{p.role}</TableCell>
                  <TableCell className="text-sm text-foreground">{p.salary}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{p.created}</TableCell>
                  <TableCell>
                    <button onClick={() => setConfirmAction({ title: "Remove Staff", description: `Remove ${p.name} from payroll?`, destructive: true, onConfirm: () => { toast.success("Staff removed"); setConfirmAction(null); } })}
                      className="text-xs text-destructive hover:underline flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete Staff</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {settingsTab === "rewards" && (
        <div className="bg-card border border-border rounded-xl p-6 max-w-2xl space-y-4">
          {[
            { label: "Points per ₦1,000 trade", value: "10 pts" },
            { label: "Referral bonus", value: "50 pts" },
            { label: "Point to Naira rate", value: "1 pt = ₦10" },
            { label: "Min redemption", value: "100 pts" },
          ].map(r => (
            <div key={r.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <p className="text-sm text-foreground">{r.label}</p>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">{r.value}</span>
                <button className="text-xs text-primary hover:underline">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog open={!!confirmAction} onClose={() => setConfirmAction(null)} onConfirm={() => confirmAction?.onConfirm()} title={confirmAction?.title || ""} description={confirmAction?.description || ""} destructive={confirmAction?.destructive} />
    </div>
  );
};

export default AdminSettings;

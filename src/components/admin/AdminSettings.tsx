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
      <div className="flex flex-wrap gap-2 mb-6">
        {(["security", "fees", "payroll", "rewards"] as const).map(t => (
          <button key={t} onClick={() => setSettingsTab(t)} className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${settingsTab === t ? "border-amber-500 bg-amber-500 text-white" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
        {settingsTab === "payroll" && (
          <button onClick={() => toast.info("Add member dialog")} className="ml-auto h-8 px-4 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600">Add member</button>
        )}
      </div>

      {settingsTab === "security" && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 max-w-2xl space-y-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Reset password</h3>
            <p className="text-xs text-gray-500 mb-2">Considering changing your password?<br />Tap to reset password</p>
            <button onClick={() => toast.success("Password reset email sent")} className="text-sm font-medium text-amber-600 hover:text-amber-700">Reset Password</button>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Delete account</h3>
            <p className="text-xs text-gray-500 mb-2">This is really sad and we don't want to lose you,<br />but if you really must, tap to delete.</p>
            <button onClick={() => setConfirmAction({ title: "Deactivate Account", description: "Are you sure you want to deactivate your admin account? This action cannot be undone.", destructive: true, onConfirm: () => { toast.error("Account deactivated"); setConfirmAction(null); } })}
              className="h-9 px-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100">Deactivate account</button>
          </div>
        </div>
      )}

      {settingsTab === "fees" && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 max-w-2xl space-y-4">
          {[
            { label: "Crypto Trade Fee", value: "1.0%" },
            { label: "Gift Card Fee", value: "2.5%" },
            { label: "Withdrawal Fee", value: "₦50" },
            { label: "DeeX Pay Fee", value: "0.5%" },
          ].map(f => (
            <div key={f.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <p className="text-sm text-gray-900">{f.label}</p>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">{f.value}</span>
                <button className="text-xs font-medium text-amber-600 hover:text-amber-700">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {settingsTab === "payroll" && (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <Table>
            <TableHeader><TableRow className="bg-gray-50 border-b border-gray-200 hover:bg-gray-50">
              {["Name", "Email", "Role", "Salary", "Date Created", "Action"].map(h => <TableHead key={h} className="h-11 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</TableHead>)}
            </TableRow></TableHeader>
            <TableBody>
              {payrollData.map((p, i) => (
                <TableRow key={i} className="border-gray-100 last:border-0 hover:bg-gray-50">
                  <TableCell className="text-sm font-medium text-gray-900">{p.name}</TableCell>
                  <TableCell className="text-sm text-gray-500">{p.email}</TableCell>
                  <TableCell className="text-sm text-gray-900">{p.role}</TableCell>
                  <TableCell className="text-sm font-medium text-gray-900">{p.salary}</TableCell>
                  <TableCell className="text-xs text-gray-500">{p.created}</TableCell>
                  <TableCell>
                    <button onClick={() => setConfirmAction({ title: "Remove Staff", description: `Remove ${p.name} from payroll?`, destructive: true, onConfirm: () => { toast.success("Staff removed"); setConfirmAction(null); } })}
                      className="text-xs font-medium text-red-600 hover:text-red-700 flex items-center gap-1"><Trash2 className="w-3 h-3" /> Delete Staff</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {settingsTab === "rewards" && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 max-w-2xl space-y-4">
          {[
            { label: "Points per ₦1,000 trade", value: "10 pts" },
            { label: "Referral bonus", value: "50 pts" },
            { label: "Point to Naira rate", value: "1 pt = ₦10" },
            { label: "Min redemption", value: "100 pts" },
          ].map(r => (
            <div key={r.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <p className="text-sm text-gray-900">{r.label}</p>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">{r.value}</span>
                <button className="text-xs font-medium text-amber-600 hover:text-amber-700">Edit</button>
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

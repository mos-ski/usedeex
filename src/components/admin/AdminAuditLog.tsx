import { auditLogData } from "@/data/adminMockData";
import { NewBadge, CopyButton } from "./AdminUtils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminAuditLog = () => (
  <div>
    <h2 className="font-display text-lg font-bold text-gray-900 mb-1">Audit Log <NewBadge /></h2>
    <p className="text-sm text-gray-500 mb-4">Every admin action is recorded here for compliance.</p>
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <Table>
        <TableHeader><TableRow className="bg-gray-50 border-b border-gray-200 hover:bg-gray-50">
          {["Admin", "Action", "Target", "Details", "Date"].map(h => (
            <TableHead key={h} className="h-11 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</TableHead>
          ))}
        </TableRow></TableHeader>
        <TableBody>
          {auditLogData.map((log, i) => (
            <TableRow key={i} className="border-gray-100 last:border-0 hover:bg-gray-50">
              <TableCell className="text-sm font-medium text-gray-900">{log.admin}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                  log.action.includes("Approved") || log.action.includes("Auto") ? "border-emerald-200 bg-emerald-50 text-emerald-700" :
                  log.action.includes("Rejected") || log.action.includes("Failed") ? "border-red-200 bg-red-50 text-red-700" :
                  "border-blue-200 bg-blue-50 text-blue-700"
                }`}>{log.action}</span>
              </TableCell>
              <TableCell className="text-sm text-gray-900">{log.target}</TableCell>
              <TableCell className="text-xs text-gray-500">{log.details}</TableCell>
              <TableCell className="text-xs text-gray-500">{log.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

export default AdminAuditLog;

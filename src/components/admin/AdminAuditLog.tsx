import { auditLogData } from "@/data/adminMockData";
import { NewBadge, CopyButton } from "./AdminUtils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminAuditLog = () => (
  <div>
    <h2 className="text-lg font-semibold text-brand-grey900 mb-1">Audit Log <NewBadge /></h2>
    <p className="text-sm text-brand-grey500 mb-4">Every admin action is recorded here for compliance.</p>
    <div className="bg-brand-surface border border-brand-grey100 rounded-xl overflow-hidden">
      <Table>
        <TableHeader><TableRow>
          {["Admin", "Action", "Target", "Details", "Date"].map(h => (
            <TableHead key={h} className="text-brand-grey500 text-xs uppercase tracking-wider">{h}</TableHead>
          ))}
        </TableRow></TableHeader>
        <TableBody>
          {auditLogData.map((log, i) => (
            <TableRow key={i} className="hover:bg-brand-tint/50">
              <TableCell className="text-sm text-brand-grey900">{log.admin}</TableCell>
              <TableCell>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                  log.action.includes("Approved") || log.action.includes("Auto") ? "bg-brand-success/10 text-brand-success" :
                  log.action.includes("Rejected") || log.action.includes("Failed") ? "bg-brand-danger/10 text-brand-danger" :
                  "bg-brand-blue500/10 text-brand-blue500"
                }`}>{log.action}</span>
              </TableCell>
              <TableCell className="text-sm text-brand-grey900">{log.target}</TableCell>
              <TableCell className="text-xs text-brand-grey500">{log.details}</TableCell>
              <TableCell className="text-xs text-brand-grey500">{log.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

export default AdminAuditLog;

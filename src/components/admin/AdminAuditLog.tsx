import { auditLogData } from "@/data/adminMockData";
import { NewBadge, CopyButton } from "./AdminUtils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminAuditLog = () => (
  <div>
    <h2 className="text-lg font-semibold text-foreground mb-1">Audit Log <NewBadge /></h2>
    <p className="text-sm text-muted-foreground mb-4">Every admin action is recorded here for compliance.</p>
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <Table>
        <TableHeader><TableRow>
          {["Admin", "Action", "Target", "Details", "Date"].map(h => (
            <TableHead key={h}>{h}</TableHead>
          ))}
        </TableRow></TableHeader>
        <TableBody>
          {auditLogData.map((log, i) => (
            <TableRow key={i}>
              <TableCell className="text-sm text-foreground">{log.admin}</TableCell>
              <TableCell>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                  log.action.includes("Approved") || log.action.includes("Auto") ? "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]" :
                  log.action.includes("Rejected") || log.action.includes("Failed") ? "bg-destructive/20 text-destructive" :
                  "bg-primary/20 text-primary"
                }`}>{log.action}</span>
              </TableCell>
              <TableCell className="text-sm text-foreground">{log.target}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{log.details}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{log.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

export default AdminAuditLog;

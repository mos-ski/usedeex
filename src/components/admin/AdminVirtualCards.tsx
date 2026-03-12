import { Upload } from "lucide-react";
import { virtualCardsData } from "@/data/adminMockData";
import { StatusBadge, NewBadge } from "./AdminUtils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminVirtualCards = () => (
  <div>
    <h2 className="text-lg font-semibold text-foreground mb-1">Virtual Cards <NewBadge /></h2>
    <p className="text-sm text-muted-foreground mb-4">Manage all user virtual cards, issuance, and limits.</p>
    <div className="grid grid-cols-4 gap-4 mb-6">
      {[
        { label: "Total Cards Issued", value: "347" },
        { label: "Active Cards", value: "289" },
        { label: "Frozen Cards", value: "42" },
        { label: "Revenue (Fees)", value: "$694" },
      ].map(m => (
        <div key={m.label} className="bg-card border border-border rounded-xl p-5">
          <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
          <p className="text-xl font-bold text-foreground">{m.value}</p>
        </div>
      ))}
    </div>
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm font-semibold text-foreground">Recent Card Activity</p>
      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><Upload className="w-3.5 h-3.5" /> EXPORT</button>
    </div>
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <Table>
        <TableHeader><TableRow>
          {["User", "Card Label", "Last 4", "Balance", "Status", "Daily Limit", "Created"].map(h => (
            <TableHead key={h}>{h}</TableHead>
          ))}
        </TableRow></TableHeader>
        <TableBody>
          {virtualCardsData.map((card, i) => (
            <TableRow key={i}>
              <TableCell className="text-sm text-foreground">{card.user}</TableCell>
              <TableCell className="text-sm text-foreground">{card.label}</TableCell>
              <TableCell className="text-sm text-muted-foreground font-mono">•••• {card.last4}</TableCell>
              <TableCell className="text-sm text-foreground">{card.balance}</TableCell>
              <TableCell><StatusBadge status={card.status} /></TableCell>
              <TableCell className="text-sm text-muted-foreground">{card.dailyLimit}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{card.created}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    <div className="mt-6 bg-card border border-border rounded-xl p-6 max-w-2xl">
      <h3 className="text-sm font-semibold text-foreground mb-4">Card Settings</h3>
      <div className="space-y-4">
        {[
          { label: "Card Creation Fee", value: "$2.00" },
          { label: "Max Cards per User", value: "3" },
          { label: "Min KYC Level Required", value: "Level 2" },
          { label: "Default Daily Limit", value: "$500" },
          { label: "Default Monthly Limit", value: "$5,000" },
        ].map(s => (
          <div key={s.label} className="flex items-center justify-between py-3 border-b border-border last:border-0">
            <p className="text-sm text-foreground">{s.label}</p>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">{s.value}</span>
              <button className="text-xs text-primary hover:underline">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AdminVirtualCards;

import { Upload } from "lucide-react";
import { virtualCardsData } from "@/data/adminMockData";
import { StatusBadge, NewBadge } from "./AdminUtils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminVirtualCards = () => (
  <div>
    <h2 className="font-display text-lg font-bold text-gray-900 mb-1">Virtual Cards <NewBadge /></h2>
    <p className="text-sm text-gray-500 mb-4">Manage all user virtual cards, issuance, and limits.</p>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      {[
        { label: "Total Cards Issued", value: "347" },
        { label: "Active Cards", value: "289" },
        { label: "Frozen Cards", value: "42" },
        { label: "Revenue (Fees)", value: "$694" },
      ].map(m => (
        <div key={m.label} className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-500 mb-1">{m.label}</p>
          <p className="text-2xl font-display font-bold text-gray-900">{m.value}</p>
        </div>
      ))}
    </div>
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm font-semibold text-gray-900">Recent Card Activity</p>
      <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900"><Upload className="w-3.5 h-3.5" /> EXPORT</button>
    </div>
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <Table>
        <TableHeader><TableRow className="bg-gray-50 border-b border-gray-200 hover:bg-gray-50">
          {["User", "Card Label", "Last 4", "Balance", "Status", "Daily Limit", "Created"].map(h => (
            <TableHead key={h} className="h-11 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</TableHead>
          ))}
        </TableRow></TableHeader>
        <TableBody>
          {virtualCardsData.map((card, i) => (
            <TableRow key={i} className="border-gray-100 last:border-0 hover:bg-gray-50">
              <TableCell className="text-sm font-medium text-gray-900">{card.user}</TableCell>
              <TableCell className="text-sm text-gray-900">{card.label}</TableCell>
              <TableCell className="text-sm text-gray-500 font-mono">•••• {card.last4}</TableCell>
              <TableCell className="text-sm font-medium text-gray-900">{card.balance}</TableCell>
              <TableCell><StatusBadge status={card.status} /></TableCell>
              <TableCell className="text-sm text-gray-500">{card.dailyLimit}</TableCell>
              <TableCell className="text-xs text-gray-500">{card.created}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 max-w-2xl">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Card Settings</h3>
      <div className="space-y-4">
        {[
          { label: "Card Creation Fee", value: "$2.00" },
          { label: "Max Cards per User", value: "3" },
          { label: "Min KYC Level Required", value: "Level 2" },
          { label: "Default Daily Limit", value: "$500" },
          { label: "Default Monthly Limit", value: "$5,000" },
        ].map(s => (
          <div key={s.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <p className="text-sm text-gray-900">{s.label}</p>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-900">{s.value}</span>
              <button className="text-xs font-medium text-amber-600 hover:text-amber-700">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AdminVirtualCards;

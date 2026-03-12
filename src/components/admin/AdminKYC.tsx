import { useState } from "react";
import { Search, CheckCircle, XCircle, Eye } from "lucide-react";
import { toast } from "sonner";
import { kycLogs } from "@/data/adminMockData";
import { StatusBadge, CopyButton, ConfirmDialog, AdminPagination } from "./AdminUtils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const PER_PAGE = 8;

const AdminKYC = () => {
  const [kycSection, setKycSection] = useState<"customers" | "business">("customers");
  const [kycFilter, setKycFilter] = useState("All logs");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedKyc, setSelectedKyc] = useState<typeof kycLogs[0] | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ title: string; description: string; onConfirm: () => void; destructive?: boolean } | null>(null);

  const filterCounts = {
    "All logs": kycLogs.length,
    "Completed": kycLogs.filter(k => k.status === "APPROVED").length,
    "Rejected": kycLogs.filter(k => k.status === "REJECTED").length,
    "Requests": kycLogs.filter(k => k.status === "PENDING").length,
  };

  const filtered = kycLogs.filter(k => {
    const matchFilter = kycFilter === "All logs" ? true :
      kycFilter === "Completed" ? k.status === "APPROVED" :
      kycFilter === "Rejected" ? k.status === "REJECTED" :
      kycFilter === "Requests" ? k.status === "PENDING" : true;
    const matchSearch = !searchQuery || k.name.toLowerCase().includes(searchQuery.toLowerCase()) || k.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <button onClick={() => setKycSection("customers")} className={`text-xs font-semibold tracking-wider ${kycSection === "customers" ? "text-foreground" : "text-muted-foreground"}`}>CUSTOMERS</button>
        <button onClick={() => setKycSection("business")} className={`text-xs font-semibold tracking-wider ${kycSection === "business" ? "text-foreground" : "text-muted-foreground"}`}>BUSINESS</button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          {(["All logs", "Completed", "Rejected", "Requests"] as const).map(f => (
            <button key={f} onClick={() => { setKycFilter(f); setPage(1); }}
              className={`text-sm pb-1 border-b-2 ${kycFilter === f ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground"}`}>
              {f} <span className="text-[10px] ml-0.5 text-muted-foreground">({filterCounts[f]})</span>
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
            placeholder="Search"
            className="h-9 w-40 bg-secondary rounded-lg pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {["Name", "Email", "Level", "BVN", "Document", "KYC Status", "Date Created", "Actions"].map(h => (
                <TableHead key={h}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((k, i) => (
              <TableRow key={i}>
                <TableCell className="text-sm text-foreground font-medium">{k.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground">{k.email}</span>
                    <CopyButton text={k.email} label="Email" />
                  </div>
                </TableCell>
                <TableCell className="text-sm text-foreground">{k.level}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground font-mono">{k.bvn}</span>
                    <CopyButton text={k.bvn} label="BVN" />
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{k.document}</TableCell>
                <TableCell><StatusBadge status={k.status} /></TableCell>
                <TableCell className="text-xs text-muted-foreground">{k.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => setSelectedKyc(k)} className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80" title="View Details">
                      <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                    {k.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => setConfirmAction({
                            title: "Approve KYC",
                            description: `Approve ${k.name}'s ${k.level} verification?`,
                            onConfirm: () => { toast.success(`${k.name}'s KYC approved`); setConfirmAction(null); },
                          })}
                          className="w-7 h-7 rounded-lg bg-[hsl(var(--success))]/20 flex items-center justify-center hover:bg-[hsl(var(--success))]/30"
                          title="Approve"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-[hsl(var(--success))]" />
                        </button>
                        <button
                          onClick={() => setConfirmAction({
                            title: "Reject KYC",
                            description: `Reject ${k.name}'s ${k.level} verification? They will need to resubmit.`,
                            destructive: true,
                            onConfirm: () => { toast.error(`${k.name}'s KYC rejected`); setConfirmAction(null); },
                          })}
                          className="w-7 h-7 rounded-lg bg-destructive/20 flex items-center justify-center hover:bg-destructive/30"
                          title="Reject"
                        >
                          <XCircle className="w-3.5 h-3.5 text-destructive" />
                        </button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AdminPagination page={page} totalPages={totalPages} totalItems={filtered.length} perPage={PER_PAGE} onPageChange={setPage} />

      {/* KYC Detail Drawer */}
      <Dialog open={!!selectedKyc} onOpenChange={() => setSelectedKyc(null)}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground">{selectedKyc?.name} — {selectedKyc?.level}</DialogTitle>
          </DialogHeader>
          {selectedKyc && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="text-sm text-foreground">{selectedKyc.email}</p>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">BVN</p>
                  <p className="text-sm text-foreground font-mono">{selectedKyc.bvn}</p>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Document Type</p>
                  <p className="text-sm text-foreground">{selectedKyc.document}</p>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <StatusBadge status={selectedKyc.status} />
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Date Submitted</p>
                  <p className="text-sm text-foreground">{selectedKyc.date}</p>
                </div>
              </div>

              {/* Document preview placeholders */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-3">SUBMITTED DOCUMENTS</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-28 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground text-xs">📄 {selectedKyc.document}</div>
                  <div className="h-28 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground text-xs">📸 Selfie / Liveness</div>
                </div>
              </div>

              {/* KYC Level Requirements */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-3">LEVEL REQUIREMENTS</p>
                <div className="space-y-2">
                  {selectedKyc.level === "KYC 2" && (
                    <>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">BVN Verification</span><span className="text-foreground">Required</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">NIN Verification</span><span className="text-foreground">Required</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Daily Limit</span><span className="text-foreground">₦500,000</span></div>
                    </>
                  )}
                  {selectedKyc.level === "KYC 3" && (
                    <>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Government ID</span><span className="text-foreground">Required</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Proof of Address</span><span className="text-foreground">Required</span></div>
                      <div className="flex justify-between text-sm"><span className="text-muted-foreground">Daily Limit</span><span className="text-foreground">₦5,000,000</span></div>
                    </>
                  )}
                </div>
              </div>

              {selectedKyc.status === "PENDING" && (
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => { toast.success(`${selectedKyc.name}'s KYC approved`); setSelectedKyc(null); }}
                    className="flex-1 h-10 bg-[hsl(var(--success))] text-background rounded-lg text-sm font-medium"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => { toast.error(`${selectedKyc.name}'s KYC rejected`); setSelectedKyc(null); }}
                    className="flex-1 h-10 bg-destructive text-destructive-foreground rounded-lg text-sm font-medium"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => confirmAction?.onConfirm()}
        title={confirmAction?.title || ""}
        description={confirmAction?.description || ""}
        destructive={confirmAction?.destructive}
      />
    </div>
  );
};

export default AdminKYC;

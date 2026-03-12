import { useState } from "react";
import { Search, CheckCircle, XCircle, Eye, ShieldCheck, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { kycLogs, kycLevelsConfig } from "@/data/adminMockData";
import { StatusBadge, CopyButton, ConfirmDialog, AdminPagination } from "./AdminUtils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const PER_PAGE = 8;

type KycFilter = "All logs" | "Completed" | "Rejected" | "Requests";

const AdminKYC = () => {
  const [kycSection, setKycSection] = useState<"customers" | "business">("customers");
  const [kycFilter, setKycFilter] = useState<KycFilter>("All logs");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedKyc, setSelectedKyc] = useState<typeof kycLogs[0] | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ title: string; description: string; onConfirm: () => void; destructive?: boolean } | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const filterCounts: Record<KycFilter, number> = {
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

  const getLevelConfig = (levelStr: string) => {
    const num = parseInt(levelStr.replace("KYC ", ""));
    return kycLevelsConfig.find(l => l.level === num);
  };

  return (
    <div>
      {/* Section Toggle */}
      <div className="flex gap-4 mb-4">
        <button onClick={() => setKycSection("customers")} className={`text-xs font-semibold tracking-wider ${kycSection === "customers" ? "text-foreground" : "text-muted-foreground"}`}>CUSTOMERS</button>
        <button onClick={() => setKycSection("business")} className={`text-xs font-semibold tracking-wider ${kycSection === "business" ? "text-foreground" : "text-muted-foreground"}`}>BUSINESS</button>
      </div>

      {/* Limits Reference Cards */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {kycLevelsConfig.map(l => (
          <div key={l.level} className="bg-card border border-border rounded-xl p-3">
            <p className="text-xs font-semibold text-foreground mb-2">{l.title}</p>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground">Trading</span>
                <span className="text-foreground font-medium">{l.tradingLimit}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-muted-foreground">Withdrawal</span>
                <span className="text-foreground font-medium">{l.withdrawalLimit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          {(["All logs", "Completed", "Rejected", "Requests"] as const).map(f => (
            <button key={f} onClick={() => { setKycFilter(f); setPage(1); }}
              className={`text-sm pb-1 border-b-2 ${kycFilter === f ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground"}`}>
              {f} <span className="text-[10px] ml-0.5 bg-secondary px-1.5 py-0.5 rounded-full">{filterCounts[f]}</span>
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

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {["Name", "Email", "Applying For", "Current Level", "BVN", "Document", "2FA", "Status", "Date", "Actions"].map(h => (
                <TableHead key={h}>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((k, i) => {
              const levelConfig = getLevelConfig(k.level);
              return (
                <TableRow key={i}>
                  <TableCell className="text-sm text-foreground font-medium">{k.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted-foreground truncate max-w-[140px]">{k.email}</span>
                      <CopyButton text={k.email} label="Email" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-medium text-foreground bg-secondary px-2 py-1 rounded-md">{k.level}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground">Level {k.currentLevel}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground font-mono">{k.bvn}</span>
                      <CopyButton text={k.bvn} label="BVN" />
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{k.document}</TableCell>
                  <TableCell>
                    {k.twoFaEnabled ? (
                      <ShieldCheck className="w-4 h-4 text-[hsl(var(--success))]" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-[hsl(var(--warning))]" />
                    )}
                  </TableCell>
                  <TableCell><StatusBadge status={k.status} /></TableCell>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{k.date}</TableCell>
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
                              description: `Approve ${k.name}'s ${k.level} verification? Trading limit: ${levelConfig?.tradingLimit}, Withdrawal limit: ${levelConfig?.withdrawalLimit}`,
                              onConfirm: () => { toast.success(`${k.name}'s KYC approved — limits updated`); setConfirmAction(null); },
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
              );
            })}
          </TableBody>
        </Table>
      </div>

      <AdminPagination page={page} totalPages={totalPages} totalItems={filtered.length} perPage={PER_PAGE} onPageChange={setPage} />

      {/* KYC Detail Dialog */}
      <Dialog open={!!selectedKyc} onOpenChange={() => setSelectedKyc(null)}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground">{selectedKyc?.name} — {selectedKyc?.level}</DialogTitle>
          </DialogHeader>
          {selectedKyc && (
            <div className="space-y-4">
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="text-sm text-foreground truncate">{selectedKyc.email}</p>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">BVN</p>
                  <p className="text-sm text-foreground font-mono">{selectedKyc.bvn}</p>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Current Level</p>
                  <p className="text-sm text-foreground">Level {selectedKyc.currentLevel}</p>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <StatusBadge status={selectedKyc.status} />
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">2FA</p>
                  <p className="text-sm text-foreground flex items-center gap-1">
                    {selectedKyc.twoFaEnabled ? (
                      <><ShieldCheck className="w-3.5 h-3.5 text-[hsl(var(--success))]" /> Enabled</>
                    ) : (
                      <><AlertTriangle className="w-3.5 h-3.5 text-[hsl(var(--warning))]" /> Not enabled</>
                    )}
                  </p>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">Date Submitted</p>
                  <p className="text-sm text-foreground">{selectedKyc.date}</p>
                </div>
              </div>

              {/* New Limits Preview */}
              {(() => {
                const cfg = getLevelConfig(selectedKyc.level);
                return cfg ? (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-3">LIMITS AFTER APPROVAL</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[hsl(var(--success))]/10 border border-[hsl(var(--success))]/20 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">Trading Limit</p>
                        <p className="text-lg font-bold text-foreground">{cfg.tradingLimit}</p>
                      </div>
                      <div className="bg-[hsl(var(--success))]/10 border border-[hsl(var(--success))]/20 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">Withdrawal Limit</p>
                        <p className="text-lg font-bold text-foreground">{cfg.withdrawalLimit}</p>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}

              {/* Requirements checklist */}
              {(() => {
                const cfg = getLevelConfig(selectedKyc.level);
                return cfg ? (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-3">REQUIREMENTS FOR {selectedKyc.level.toUpperCase()}</p>
                    <div className="space-y-2">
                      {cfg.requirements.map((req, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                          <span className="text-muted-foreground">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null;
              })()}

              {/* Documents */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-3">SUBMITTED DOCUMENTS</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-28 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground text-xs">📄 {selectedKyc.document}</div>
                  {selectedKyc.level === "KYC 3" ? (
                    <div className="h-28 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground text-xs">📋 Risk Questionnaire</div>
                  ) : (
                    <div className="h-28 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground text-xs">📸 Selfie / Liveness</div>
                  )}
                </div>
              </div>

              {/* Rejection reason (if rejected) */}
              {selectedKyc.status === "REJECTED" && selectedKyc.rejectionReason && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <p className="text-xs font-semibold text-destructive mb-1">Rejection Reason</p>
                  <p className="text-sm text-foreground">{selectedKyc.rejectionReason}</p>
                </div>
              )}

              {/* 2FA Warning for KYC 3 */}
              {selectedKyc.level === "KYC 3" && !selectedKyc.twoFaEnabled && selectedKyc.status === "PENDING" && (
                <div className="bg-[hsl(var(--warning))]/10 border border-[hsl(var(--warning))]/20 rounded-lg p-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[hsl(var(--warning))] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-[hsl(var(--warning))]">2FA Not Enabled</p>
                    <p className="text-xs text-muted-foreground">KYC Level 3 requires mandatory 2FA. User must enable it before activation.</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              {selectedKyc.status === "PENDING" && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">Rejection reason (optional)</label>
                    <input
                      value={rejectReason}
                      onChange={e => setRejectReason(e.target.value)}
                      placeholder="e.g., Document does not match BVN records"
                      className="w-full h-9 bg-secondary rounded-lg px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { toast.success(`${selectedKyc.name}'s KYC approved — limits updated to ${getLevelConfig(selectedKyc.level)?.tradingLimit} trading`); setSelectedKyc(null); }}
                      className="flex-1 h-10 bg-[hsl(var(--success))] text-background rounded-lg text-sm font-medium"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => { toast.error(`${selectedKyc.name}'s KYC rejected${rejectReason ? `: ${rejectReason}` : ""}`); setRejectReason(""); setSelectedKyc(null); }}
                      className="flex-1 h-10 bg-destructive text-destructive-foreground rounded-lg text-sm font-medium"
                    >
                      Reject
                    </button>
                  </div>
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

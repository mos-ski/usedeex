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
        <button onClick={() => setKycSection("customers")} className={`text-xs font-semibold tracking-wider transition-colors ${kycSection === "customers" ? "text-gray-900" : "text-gray-500 hover:text-gray-900"}`}>CUSTOMERS</button>
        <button onClick={() => setKycSection("business")} className={`text-xs font-semibold tracking-wider transition-colors ${kycSection === "business" ? "text-gray-900" : "text-gray-500 hover:text-gray-900"}`}>BUSINESS</button>
      </div>

      {/* Limits Reference Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {kycLevelsConfig.map(l => (
          <div key={l.level} className="bg-white border border-gray-200 rounded-xl p-3">
            <p className="text-xs font-semibold text-gray-900 mb-2">{l.title}</p>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-500">Trading</span>
                <span className="text-gray-900 font-medium">{l.tradingLimit}</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-gray-500">Withdrawal</span>
                <span className="text-gray-900 font-medium">{l.withdrawalLimit}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex gap-2 flex-wrap">
          {(["All logs", "Completed", "Rejected", "Requests"] as const).map(f => (
            <button key={f} onClick={() => { setKycFilter(f); setPage(1); }}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${kycFilter === f ? "border-amber-500 bg-amber-500 text-white" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>
              {f} <span className={`text-[10px] ml-0.5 px-1.5 py-0.5 rounded-full ${kycFilter === f ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"}`}>{filterCounts[f]}</span>
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setPage(1); }}
            placeholder="Search"
            className="h-10 w-40 rounded-lg border border-gray-200 bg-white pl-9 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 border-gray-200 hover:bg-gray-50">
              {["Name", "Email", "Applying For", "Current Level", "BVN", "Document", "2FA", "Status", "Date", "Actions"].map(h => (
                <TableHead key={h} className="h-11 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((k, i) => {
              const levelConfig = getLevelConfig(k.level);
              return (
                <TableRow key={i} className="border-gray-100 hover:bg-gray-50">
                  <TableCell className="text-sm text-gray-900 font-medium">{k.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-500 truncate max-w-[140px]">{k.email}</span>
                      <CopyButton text={k.email} label="Email" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-medium text-gray-900 bg-gray-50 px-2 py-1 rounded-md">{k.level}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-gray-500">Level {k.currentLevel}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500 font-mono">{k.bvn}</span>
                      <CopyButton text={k.bvn} label="BVN" />
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-gray-500">{k.document}</TableCell>
                  <TableCell>
                    {k.twoFaEnabled ? (
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    )}
                  </TableCell>
                  <TableCell><StatusBadge status={k.status} /></TableCell>
                  <TableCell className="text-xs text-gray-500 whitespace-nowrap">{k.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setSelectedKyc(k)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors" title="View Details">
                        <Eye className="w-3.5 h-3.5 text-gray-600" />
                      </button>
                      {k.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => setConfirmAction({
                              title: "Approve KYC",
                              description: `Approve ${k.name}'s ${k.level} verification? Trading limit: ${levelConfig?.tradingLimit}, Withdrawal limit: ${levelConfig?.withdrawalLimit}`,
                              onConfirm: () => { toast.success(`${k.name}'s KYC approved — limits updated`); setConfirmAction(null); },
                            })}
                            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          </button>
                          <button
                            onClick={() => setConfirmAction({
                              title: "Reject KYC",
                              description: `Reject ${k.name}'s ${k.level} verification? They will need to resubmit.`,
                              destructive: true,
                              onConfirm: () => { toast.error(`${k.name}'s KYC rejected`); setConfirmAction(null); },
                            })}
                            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                            title="Reject"
                          >
                            <XCircle className="w-3.5 h-3.5 text-red-600" />
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
        <DialogContent className="bg-white text-gray-900 border-gray-200 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-gray-900 font-semibold">{selectedKyc?.name} — {selectedKyc?.level}</DialogTitle>
          </DialogHeader>
          {selectedKyc && (
            <div className="space-y-4">
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-sm text-gray-900 truncate">{selectedKyc.email}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">BVN</p>
                  <p className="text-sm text-gray-900 font-mono">{selectedKyc.bvn}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Current Level</p>
                  <p className="text-sm text-gray-900">Level {selectedKyc.currentLevel}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <StatusBadge status={selectedKyc.status} />
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">2FA</p>
                  <p className="text-sm text-gray-900 flex items-center gap-1">
                    {selectedKyc.twoFaEnabled ? (
                      <><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Enabled</>
                    ) : (
                      <><AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Not enabled</>
                    )}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Date Submitted</p>
                  <p className="text-sm text-gray-900">{selectedKyc.date}</p>
                </div>
              </div>

              {/* New Limits Preview */}
              {(() => {
                const cfg = getLevelConfig(selectedKyc.level);
                return cfg ? (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 tracking-wider mb-3">LIMITS AFTER APPROVAL</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
                        <p className="text-xs text-amber-700 mb-1">Trading Limit</p>
                        <p className="text-lg font-display font-bold text-gray-900">{cfg.tradingLimit}</p>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
                        <p className="text-xs text-amber-700 mb-1">Withdrawal Limit</p>
                        <p className="text-lg font-display font-bold text-gray-900">{cfg.withdrawalLimit}</p>
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
                    <p className="text-xs font-semibold text-gray-500 tracking-wider mb-3">REQUIREMENTS FOR {selectedKyc.level.toUpperCase()}</p>
                    <div className="space-y-2">
                      {cfg.requirements.map((req, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                          <span className="text-gray-500">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null;
              })()}

              {/* Documents */}
              <div>
                <p className="text-xs font-semibold text-gray-500 tracking-wider mb-3">SUBMITTED DOCUMENTS</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-28 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 text-xs">📄 {selectedKyc.document}</div>
                  {selectedKyc.level === "KYC 3" ? (
                    <div className="h-28 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 text-xs">📋 Risk Questionnaire</div>
                  ) : (
                    <div className="h-28 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 text-xs">📸 Selfie / Liveness</div>
                  )}
                </div>
              </div>

              {/* Rejection reason (if rejected) */}
              {selectedKyc.status === "REJECTED" && selectedKyc.rejectionReason && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-xs font-semibold text-red-700 mb-1">Rejection Reason</p>
                  <p className="text-sm text-gray-900">{selectedKyc.rejectionReason}</p>
                </div>
              )}

              {/* 2FA Warning for KYC 3 */}
              {selectedKyc.level === "KYC 3" && !selectedKyc.twoFaEnabled && selectedKyc.status === "PENDING" && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-amber-800">2FA Not Enabled</p>
                    <p className="text-xs text-amber-700">KYC Level 3 requires mandatory 2FA. User must enable it before activation.</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              {selectedKyc.status === "PENDING" && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1.5 block">Rejection reason (optional)</label>
                    <input
                      value={rejectReason}
                      onChange={e => setRejectReason(e.target.value)}
                      placeholder="e.g., Document does not match BVN records"
                      className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { toast.success(`${selectedKyc.name}'s KYC approved — limits updated to ${getLevelConfig(selectedKyc.level)?.tradingLimit} trading`); setSelectedKyc(null); }}
                      className="flex-1 h-10 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => { toast.error(`${selectedKyc.name}'s KYC rejected${rejectReason ? `: ${rejectReason}` : ""}`); setRejectReason(""); setSelectedKyc(null); }}
                      className="flex-1 h-10 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
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

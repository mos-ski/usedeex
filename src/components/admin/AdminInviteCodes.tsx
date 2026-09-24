import { useState } from "react";
import { Plus, Search, Copy, Check, X, Gift, Clock, Users, TrendingUp, ChevronDown, Trash2, Eye, Calendar, Trophy, Percent, UserPlus, RotateCcw } from "lucide-react";
import { inviteCodesList, inviteCodeStats, topInviters, type InviteCode, type InviteCodeStatus, type InviteCodeEligibility } from "@/data/adminMockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const statusColors: Record<InviteCodeStatus, string> = {
  active: "bg-brand-success/10 text-brand-success",
  used: "bg-brand-blue500/10 text-brand-blue500",
  expired: "bg-brand-warning400/10 text-brand-warning400",
  deactivated: "bg-brand-danger/10 text-brand-danger",
};

const eligibilityOptions: { value: InviteCodeEligibility; label: string; icon: typeof Users }[] = [
  { value: "all", label: "All Users", icon: Users },
  { value: "new", label: "New Users", icon: UserPlus },
  { value: "existing", label: "Existing Users", icon: RotateCcw },
];

const eligibilityLabels: Record<InviteCodeEligibility, string> = {
  all: "All Users",
  new: "New Users",
  existing: "Existing Users",
};

const AdminInviteCodes = () => {
  const [codes, setCodes] = useState<InviteCode[]>(inviteCodesList);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<InviteCodeStatus | "all">("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState<InviteCode | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [newCode, setNewCode] = useState({
    code: "",
    quantity: 1,
    depositReward: 100,
    tradeReward: 100,
    minDeposit: 20,
    minTrade: 50,
    pairs: "",
    expiry: "",
    inviterName: "",
    eligibility: "all" as InviteCodeEligibility,
  });

  const filtered = codes.filter(c => {
    const matchSearch = c.code.toLowerCase().includes(search.toLowerCase()) || (c.usedBy?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchStatus = statusFilter === "all" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreate = () => {
    const quantity = Math.min(Math.max(newCode.quantity || 1, 1), 100);
    const inviterName = newCode.inviterName.trim() || null;
    const created: InviteCode[] = Array.from({ length: quantity }, (_, i) => ({
      id: `IC-${String(codes.length + i + 1).padStart(3, "0")}`,
      code: quantity > 1
        ? `${newCode.code || "DX-BULK"}-${String(i + 1).padStart(2, "0")}`
        : (newCode.code || `DX-${Math.random().toString(36).substring(2, 8).toUpperCase()}`),
      createdBy: "Admin",
      inviterId: inviterName ? `user-${inviterName.toLowerCase().replace(/\s+/g, "-")}` : null,
      inviterName,
      conditions: {
        minDepositAmount: newCode.minDeposit,
        minTradeAmount: newCode.minTrade,
        requiredTradingPairs: newCode.pairs ? newCode.pairs.split(",").map(p => p.trim()) : [],
        eligibility: newCode.eligibility,
      },
      depositReward: newCode.depositReward,
      tradeReward: newCode.tradeReward,
      totalReward: newCode.depositReward + newCode.tradeReward,
      maxUses: 1,
      currentUses: 0,
      expiresAt: newCode.expiry || null,
      status: "active",
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      usedBy: null,
      usedAt: null,
    }));
    setCodes([...created, ...codes]);
    setShowCreateModal(false);
    setNewCode({ code: "", quantity: 1, depositReward: 100, tradeReward: 100, minDeposit: 20, minTrade: 50, pairs: "", expiry: "", inviterName: "", eligibility: "all" });
  };

  const handleDeactivate = (id: string) => {
    setCodes(codes.map(c => c.id === id ? { ...c, status: "deactivated" as InviteCodeStatus } : c));
    setShowDetailModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Codes", value: inviteCodeStats.totalCodes, icon: Gift, color: "text-brand-blue500" },
          { label: "Active Codes", value: inviteCodeStats.activeCodes, icon: TrendingUp, color: "text-brand-success" },
          { label: "Redeemed", value: inviteCodeStats.totalRedeemed, icon: Users, color: "text-brand-warning400" },
          { label: "Points Awarded", value: `${inviteCodeStats.totalDeeXpointsAwarded}`, icon: Clock, color: "text-brand-purple" },
        ].map((stat) => (
          <div key={stat.label} className="bg-brand-surface border border-brand-grey100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-brand-grey900">{stat.value}</p>
            <p className="text-xs text-brand-grey500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Analytics */}
      <div className="bg-brand-surface border border-brand-grey100 rounded-xl p-4">
        <h3 className="text-sm font-bold text-brand-grey900 mb-4">Invite Code Analytics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          {[
            { label: "Redemption Rate", value: inviteCodeStats.redemptionRate, icon: Percent },
            { label: "Deposit Completion", value: inviteCodeStats.depositCompletionRate, icon: TrendingUp },
            { label: "Trade Completion", value: inviteCodeStats.tradeCompletionRate, icon: TrendingUp },
            { label: "Avg. Time to Complete", value: inviteCodeStats.avgTimeToComplete, icon: Clock },
          ].map((stat) => (
            <div key={stat.label} className="bg-brand-grey50 rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <stat.icon className="w-3.5 h-3.5 text-brand-grey500" />
                <p className="text-[10px] text-brand-grey500">{stat.label}</p>
              </div>
              <p className="text-lg font-bold text-brand-grey900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-4 h-4 text-brand-warning400" />
          <p className="text-xs font-semibold text-brand-grey900">Top Inviters by Successful Referrals</p>
        </div>
        <div className="space-y-2">
          {topInviters.map((inviter, i) => (
            <div key={inviter.inviterId} className="flex items-center justify-between bg-brand-grey50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${i === 0 ? "bg-brand-warning400/10 text-brand-warning400" : "bg-brand-grey100 text-brand-grey500"}`}>{i + 1}</span>
                <p className="text-sm font-medium text-brand-grey900">{inviter.inviterName}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-brand-grey900">{inviter.successfulReferrals} referrals</p>
                <p className="text-[10px] text-brand-grey500">{inviter.pointsEarned} pts distributed</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-brand-grey900">Invite Codes</h2>
          <p className="text-sm text-brand-grey500">Create and manage invite codes for user acquisition</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="bg-brand-blue500 hover:bg-brand-blue400 text-white">
          <Plus className="w-4 h-4 mr-2" /> Create Code
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-grey500" />
          <Input placeholder="Search codes or users..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-brand-surface border-brand-grey100 text-brand-grey900 placeholder:text-brand-grey500" />
        </div>
        <div className="flex gap-2">
          {(["all", "active", "used", "expired", "deactivated"] as const).map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${statusFilter === status ? "bg-brand-blue500 text-white" : "bg-brand-tint text-brand-blue500 hover:bg-brand-blue500/10"}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-brand-surface border border-brand-grey100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-grey100 bg-brand-grey50">
                <th className="text-left text-xs font-medium text-brand-grey500 px-4 py-3 uppercase tracking-wider">Code</th>
                <th className="text-left text-xs font-medium text-brand-grey500 px-4 py-3 uppercase tracking-wider">Reward</th>
                <th className="text-left text-xs font-medium text-brand-grey500 px-4 py-3 uppercase tracking-wider">Conditions</th>
                <th className="text-left text-xs font-medium text-brand-grey500 px-4 py-3 uppercase tracking-wider">Status</th>
                <th className="text-left text-xs font-medium text-brand-grey500 px-4 py-3 uppercase tracking-wider">Used By</th>
                <th className="text-left text-xs font-medium text-brand-grey500 px-4 py-3 uppercase tracking-wider">Expiry</th>
                <th className="text-left text-xs font-medium text-brand-grey500 px-4 py-3 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((code) => (
                <tr key={code.id} className="border-b border-brand-grey100 last:border-0 hover:bg-brand-tint/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-semibold text-brand-grey900">{code.code}</span>
                      <button onClick={() => handleCopy(code.code, code.id)} className="text-brand-grey500 hover:text-brand-grey900">
                        {copiedId === code.id ? <Check className="w-3.5 h-3.5 text-brand-success" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-[10px] text-brand-grey500 mt-0.5">Created by {code.createdBy}</p>
                    {code.inviterName && <p className="text-[10px] text-brand-blue500 mt-0.5">Inviter: {code.inviterName}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-brand-grey900">{code.totalReward} pts</span>
                    <p className="text-[10px] text-brand-grey500">Deposit: {code.depositReward} / Trade: {code.tradeReward}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-brand-grey900">Deposit: ${code.conditions.minDepositAmount}</p>
                    <p className="text-xs text-brand-grey900">Trade: ${code.conditions.minTradeAmount}</p>
                    {code.conditions.requiredTradingPairs.length > 0 && (
                      <p className="text-[10px] text-brand-grey500">{code.conditions.requiredTradingPairs.join(", ")}</p>
                    )}
                    <p className="text-[10px] text-brand-blue500 mt-0.5">{eligibilityLabels[code.conditions.eligibility]}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-medium ${statusColors[code.status]}`}>
                      {code.status.charAt(0).toUpperCase() + code.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {code.usedBy ? (
                      <span className="text-sm text-brand-grey900">{code.usedBy}</span>
                    ) : (
                      <span className="text-xs text-brand-grey500">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {code.expiresAt ? (
                      <span className="text-xs text-brand-grey900">{code.expiresAt}</span>
                    ) : (
                      <span className="text-xs text-brand-grey500">Never</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm" onClick={() => setShowDetailModal(code)} className="text-brand-grey500 hover:text-brand-grey900 hover:bg-brand-grey50">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-brand-grey500 text-sm">No invite codes found</div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-brand-surface border border-brand-grey100 rounded-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-brand-grey100">
              <h3 className="text-lg font-bold text-brand-grey900">Create Invite Code</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-brand-grey500 hover:text-brand-grey900"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-medium text-brand-grey500">Code (auto-generated if empty)</label>
                  <Input placeholder="e.g. DX-SUMMER100" value={newCode.code} onChange={e => setNewCode({ ...newCode, code: e.target.value })} className="mt-1 bg-brand-surface border-brand-grey100 text-brand-grey900" />
                </div>
                <div>
                  <label className="text-xs font-medium text-brand-grey500">Quantity</label>
                  <Input type="number" min={1} max={100} value={newCode.quantity} onChange={e => setNewCode({ ...newCode, quantity: Number(e.target.value) })} className="mt-1 bg-brand-surface border-brand-grey100 text-brand-grey900" />
                </div>
              </div>
              {newCode.quantity > 1 && (
                <p className="text-[10px] text-brand-grey500 -mt-2">Generates {newCode.quantity} codes numbered {newCode.code || "DX-BULK"}-01 … {newCode.code || "DX-BULK"}-{String(newCode.quantity).padStart(2, "0")}</p>
              )}
              <div>
                <label className="text-xs font-medium text-brand-grey500">Assign to Inviter (optional)</label>
                <Input placeholder="e.g. Ibrahim Abubakar" value={newCode.inviterName} onChange={e => setNewCode({ ...newCode, inviterName: e.target.value })} className="mt-1 bg-brand-surface border-brand-grey100 text-brand-grey900" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-brand-grey500">Deposit Reward (pts)</label>
                  <Input type="number" value={newCode.depositReward} onChange={e => setNewCode({ ...newCode, depositReward: Number(e.target.value) })} className="mt-1 bg-brand-surface border-brand-grey100 text-brand-grey900" />
                </div>
                <div>
                  <label className="text-xs font-medium text-brand-grey500">Trade Reward (pts)</label>
                  <Input type="number" value={newCode.tradeReward} onChange={e => setNewCode({ ...newCode, tradeReward: Number(e.target.value) })} className="mt-1 bg-brand-surface border-brand-grey100 text-brand-grey900" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-brand-grey500">Min Deposit ($)</label>
                  <Input type="number" value={newCode.minDeposit} onChange={e => setNewCode({ ...newCode, minDeposit: Number(e.target.value) })} className="mt-1 bg-brand-surface border-brand-grey100 text-brand-grey900" />
                </div>
                <div>
                  <label className="text-xs font-medium text-brand-grey500">Min Trade ($)</label>
                  <Input type="number" value={newCode.minTrade} onChange={e => setNewCode({ ...newCode, minTrade: Number(e.target.value) })} className="mt-1 bg-brand-surface border-brand-grey100 text-brand-grey900" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-brand-grey500">Required Trading Pairs (comma-separated, empty = any)</label>
                <Input placeholder="e.g. BTC/USDT, ETH/USDT" value={newCode.pairs} onChange={e => setNewCode({ ...newCode, pairs: e.target.value })} className="mt-1 bg-brand-surface border-brand-grey100 text-brand-grey900" />
              </div>
              <div>
                <label className="text-xs font-medium text-brand-grey500">Expiry Date (optional)</label>
                <Input type="date" value={newCode.expiry} onChange={e => setNewCode({ ...newCode, expiry: e.target.value })} className="mt-1 bg-brand-surface border-brand-grey100 text-brand-grey900" />
              </div>
              <div>
                <label className="text-xs font-medium text-brand-grey500">Eligible Users</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {eligibilityOptions.map((opt) => {
                    const checked = newCode.eligibility === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setNewCode({ ...newCode, eligibility: opt.value })}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition-colors ${checked ? "border-brand-blue500 bg-brand-blue500/10" : "border-brand-grey100 bg-brand-grey50"}`}
                      >
                        <span className={`w-4 h-4 rounded shrink-0 flex items-center justify-center border ${checked ? "bg-brand-blue500 border-brand-blue500" : "border-brand-grey500"}`}>
                          {checked && <Check className="w-3 h-3 text-white" />}
                        </span>
                        <span className="text-xs font-medium text-brand-grey900">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="bg-brand-grey50 rounded-xl p-3">
                <p className="text-xs font-medium text-brand-grey500 mb-2">Total Reward Preview{newCode.quantity > 1 ? ` (per code × ${newCode.quantity})` : ""}</p>
                <p className="text-xl font-bold text-brand-grey900">{newCode.depositReward + newCode.tradeReward} DeeXpoints</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 border-t border-brand-grey100">
              <Button variant="outline" onClick={() => setShowCreateModal(false)} className="flex-1 border-brand-grey100 text-brand-grey900 hover:bg-brand-grey50">Cancel</Button>
              <Button onClick={handleCreate} className="flex-1 bg-brand-blue500 hover:bg-brand-blue400 text-white">Create Code</Button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-brand-surface border border-brand-grey100 rounded-2xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-4 border-b border-brand-grey100">
              <h3 className="text-lg font-bold text-brand-grey900">Code Details</h3>
              <button onClick={() => setShowDetailModal(null)} className="text-brand-grey500 hover:text-brand-grey900"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div className="text-center bg-brand-grey50 rounded-xl p-4">
                <p className="text-xs text-brand-grey500 mb-1">Invite Code</p>
                <p className="text-xl font-mono font-bold text-brand-grey900">{showDetailModal.code}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-brand-grey50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-brand-grey900">{showDetailModal.totalReward}</p>
                  <p className="text-[10px] text-brand-grey500">Total Reward (pts)</p>
                </div>
                <div className="bg-brand-grey50 rounded-xl p-3 text-center">
                  <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-medium ${statusColors[showDetailModal.status]}`}>
                    {showDetailModal.status.charAt(0).toUpperCase() + showDetailModal.status.slice(1)}
                  </span>
                  <p className="text-[10px] text-brand-grey500 mt-1">Status</p>
                </div>
              </div>
              <div className="space-y-2">
                {showDetailModal.inviterName && (
                  <div className="flex justify-between text-sm"><span className="text-brand-grey500">Assigned Inviter</span><span className="font-medium text-brand-grey900">{showDetailModal.inviterName}</span></div>
                )}
                <div className="flex justify-between text-sm"><span className="text-brand-grey500">Deposit Reward</span><span className="font-medium text-brand-grey900">{showDetailModal.depositReward} pts</span></div>
                <div className="flex justify-between text-sm"><span className="text-brand-grey500">Trade Reward</span><span className="font-medium text-brand-grey900">{showDetailModal.tradeReward} pts</span></div>
                <div className="h-px bg-brand-grey100" />
                <div className="flex justify-between text-sm"><span className="text-brand-grey500">Min Deposit</span><span className="font-medium text-brand-grey900">${showDetailModal.conditions.minDepositAmount}</span></div>
                <div className="flex justify-between text-sm"><span className="text-brand-grey500">Min Trade</span><span className="font-medium text-brand-grey900">${showDetailModal.conditions.minTradeAmount}</span></div>
                {showDetailModal.conditions.requiredTradingPairs.length > 0 && (
                  <div className="flex justify-between text-sm"><span className="text-brand-grey500">Trading Pairs</span><span className="font-medium text-brand-grey900">{showDetailModal.conditions.requiredTradingPairs.join(", ")}</span></div>
                )}
                <div className="flex justify-between text-sm"><span className="text-brand-grey500">Eligible Users</span><span className="font-medium text-brand-grey900">{eligibilityLabels[showDetailModal.conditions.eligibility]}</span></div>
                <div className="h-px bg-brand-grey100" />
                <div className="flex justify-between text-sm"><span className="text-brand-grey500">Created</span><span className="font-medium text-brand-grey900">{showDetailModal.createdAt}</span></div>
                <div className="flex justify-between text-sm"><span className="text-brand-grey500">Expiry</span><span className="font-medium text-brand-grey900">{showDetailModal.expiresAt || "Never"}</span></div>
                {showDetailModal.usedBy && <div className="flex justify-between text-sm"><span className="text-brand-grey500">Used By</span><span className="font-medium text-brand-grey900">{showDetailModal.usedBy}</span></div>}
                {showDetailModal.usedAt && <div className="flex justify-between text-sm"><span className="text-brand-grey500">Used At</span><span className="font-medium text-brand-grey900">{showDetailModal.usedAt}</span></div>}
              </div>
            </div>
            <div className="flex gap-3 p-4 border-t border-brand-grey100">
              {showDetailModal.status === "active" && (
                <Button variant="destructive" onClick={() => handleDeactivate(showDetailModal.id)} className="flex-1 bg-brand-danger hover:bg-red-600">Deactivate</Button>
              )}
              <Button variant="outline" onClick={() => setShowDetailModal(null)} className="flex-1 border-brand-grey100 text-brand-grey900 hover:bg-brand-grey50">Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInviteCodes;

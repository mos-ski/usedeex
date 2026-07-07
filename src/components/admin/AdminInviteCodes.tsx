import { useState } from "react";
import { Plus, Search, Copy, Check, X, Gift, Clock, Users, TrendingUp, ChevronDown, Trash2, Eye, Calendar, Trophy, Percent, UserPlus, RotateCcw } from "lucide-react";
import { inviteCodesList, inviteCodeStats, topInviters, type InviteCode, type InviteCodeStatus, type InviteCodeEligibility } from "@/data/adminMockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const statusColors: Record<InviteCodeStatus, string> = {
  active: "bg-success/20 text-success",
  used: "bg-[hsl(var(--deex-blue))]/20 text-[hsl(var(--deex-blue))]",
  expired: "bg-warning/20 text-warning",
  deactivated: "bg-destructive/20 text-destructive",
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
          { label: "Total Codes", value: inviteCodeStats.totalCodes, icon: Gift, color: "text-[hsl(var(--deex-blue))]" },
          { label: "Active Codes", value: inviteCodeStats.activeCodes, icon: TrendingUp, color: "text-success" },
          { label: "Redeemed", value: inviteCodeStats.totalRedeemed, icon: Users, color: "text-warning" },
          { label: "Points Awarded", value: `${inviteCodeStats.totalDeeXpointsAwarded}`, icon: Clock, color: "text-[hsl(var(--deex-purple))]" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Analytics */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="text-sm font-bold text-foreground mb-4">Invite Code Analytics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          {[
            { label: "Redemption Rate", value: inviteCodeStats.redemptionRate, icon: Percent },
            { label: "Deposit Completion", value: inviteCodeStats.depositCompletionRate, icon: TrendingUp },
            { label: "Trade Completion", value: inviteCodeStats.tradeCompletionRate, icon: TrendingUp },
            { label: "Avg. Time to Complete", value: inviteCodeStats.avgTimeToComplete, icon: Clock },
          ].map((stat) => (
            <div key={stat.label} className="bg-secondary rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <stat.icon className="w-3.5 h-3.5 text-muted-foreground" />
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-4 h-4 text-warning" />
          <p className="text-xs font-semibold text-foreground">Top Inviters by Successful Referrals</p>
        </div>
        <div className="space-y-2">
          {topInviters.map((inviter, i) => (
            <div key={inviter.inviterId} className="flex items-center justify-between bg-secondary rounded-lg px-3 py-2">
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${i === 0 ? "bg-warning/20 text-warning" : "bg-muted text-muted-foreground"}`}>{i + 1}</span>
                <p className="text-sm font-medium text-foreground">{inviter.inviterName}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{inviter.successfulReferrals} referrals</p>
                <p className="text-[10px] text-muted-foreground">{inviter.pointsEarned} pts distributed</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground">Invite Codes</h2>
          <p className="text-sm text-muted-foreground">Create and manage invite codes for user acquisition</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Create Code
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search codes or users..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <div className="flex gap-2">
          {(["all", "active", "used", "expired", "deactivated"] as const).map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${statusFilter === status ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Code</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Reward</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Conditions</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Used By</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Expiry</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((code) => (
                <tr key={code.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono font-semibold text-foreground">{code.code}</span>
                      <button onClick={() => handleCopy(code.code, code.id)} className="text-muted-foreground hover:text-foreground">
                        {copiedId === code.id ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Created by {code.createdBy}</p>
                    {code.inviterName && <p className="text-[10px] text-primary mt-0.5">Inviter: {code.inviterName}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-semibold text-foreground">{code.totalReward} pts</span>
                    <p className="text-[10px] text-muted-foreground">Deposit: {code.depositReward} / Trade: {code.tradeReward}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-foreground">Deposit: ${code.conditions.minDepositAmount}</p>
                    <p className="text-xs text-foreground">Trade: ${code.conditions.minTradeAmount}</p>
                    {code.conditions.requiredTradingPairs.length > 0 && (
                      <p className="text-[10px] text-muted-foreground">{code.conditions.requiredTradingPairs.join(", ")}</p>
                    )}
                    <p className="text-[10px] text-primary mt-0.5">{eligibilityLabels[code.conditions.eligibility]}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-medium ${statusColors[code.status]}`}>
                      {code.status.charAt(0).toUpperCase() + code.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {code.usedBy ? (
                      <span className="text-sm text-foreground">{code.usedBy}</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {code.expiresAt ? (
                      <span className="text-xs text-foreground">{code.expiresAt}</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">Never</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm" onClick={() => setShowDetailModal(code)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">No invite codes found</div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">Create Invite Code</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-medium text-muted-foreground">Code (auto-generated if empty)</label>
                  <Input placeholder="e.g. DX-SUMMER100" value={newCode.code} onChange={e => setNewCode({ ...newCode, code: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Quantity</label>
                  <Input type="number" min={1} max={100} value={newCode.quantity} onChange={e => setNewCode({ ...newCode, quantity: Number(e.target.value) })} className="mt-1" />
                </div>
              </div>
              {newCode.quantity > 1 && (
                <p className="text-[10px] text-muted-foreground -mt-2">Generates {newCode.quantity} codes numbered {newCode.code || "DX-BULK"}-01 … {newCode.code || "DX-BULK"}-{String(newCode.quantity).padStart(2, "0")}</p>
              )}
              <div>
                <label className="text-xs font-medium text-muted-foreground">Assign to Inviter (optional)</label>
                <Input placeholder="e.g. Ibrahim Abubakar" value={newCode.inviterName} onChange={e => setNewCode({ ...newCode, inviterName: e.target.value })} className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Deposit Reward (pts)</label>
                  <Input type="number" value={newCode.depositReward} onChange={e => setNewCode({ ...newCode, depositReward: Number(e.target.value) })} className="mt-1" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Trade Reward (pts)</label>
                  <Input type="number" value={newCode.tradeReward} onChange={e => setNewCode({ ...newCode, tradeReward: Number(e.target.value) })} className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Min Deposit ($)</label>
                  <Input type="number" value={newCode.minDeposit} onChange={e => setNewCode({ ...newCode, minDeposit: Number(e.target.value) })} className="mt-1" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Min Trade ($)</label>
                  <Input type="number" value={newCode.minTrade} onChange={e => setNewCode({ ...newCode, minTrade: Number(e.target.value) })} className="mt-1" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Required Trading Pairs (comma-separated, empty = any)</label>
                <Input placeholder="e.g. BTC/USDT, ETH/USDT" value={newCode.pairs} onChange={e => setNewCode({ ...newCode, pairs: e.target.value })} className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Expiry Date (optional)</label>
                <Input type="date" value={newCode.expiry} onChange={e => setNewCode({ ...newCode, expiry: e.target.value })} className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Eligible Users</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {eligibilityOptions.map((opt) => {
                    const checked = newCode.eligibility === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setNewCode({ ...newCode, eligibility: opt.value })}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition-colors ${checked ? "border-primary bg-primary/10" : "border-border bg-secondary"}`}
                      >
                        <span className={`w-4 h-4 rounded shrink-0 flex items-center justify-center border ${checked ? "bg-primary border-primary" : "border-muted-foreground"}`}>
                          {checked && <Check className="w-3 h-3 text-primary-foreground" />}
                        </span>
                        <span className="text-xs font-medium text-foreground">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-3">
                <p className="text-xs font-medium text-muted-foreground mb-2">Total Reward Preview{newCode.quantity > 1 ? ` (per code × ${newCode.quantity})` : ""}</p>
                <p className="text-xl font-bold text-foreground">{newCode.depositReward + newCode.tradeReward} DeeXpoints</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 border-t border-border">
              <Button variant="outline" onClick={() => setShowCreateModal(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleCreate} className="flex-1 bg-primary text-primary-foreground">Create Code</Button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">Code Details</h3>
              <button onClick={() => setShowDetailModal(null)} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div className="text-center bg-secondary rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">Invite Code</p>
                <p className="text-xl font-mono font-bold text-foreground">{showDetailModal.code}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-foreground">{showDetailModal.totalReward}</p>
                  <p className="text-[10px] text-muted-foreground">Total Reward (pts)</p>
                </div>
                <div className="bg-secondary rounded-xl p-3 text-center">
                  <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-medium ${statusColors[showDetailModal.status]}`}>
                    {showDetailModal.status.charAt(0).toUpperCase() + showDetailModal.status.slice(1)}
                  </span>
                  <p className="text-[10px] text-muted-foreground mt-1">Status</p>
                </div>
              </div>
              <div className="space-y-2">
                {showDetailModal.inviterName && (
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Assigned Inviter</span><span className="font-medium text-foreground">{showDetailModal.inviterName}</span></div>
                )}
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Deposit Reward</span><span className="font-medium text-foreground">{showDetailModal.depositReward} pts</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Trade Reward</span><span className="font-medium text-foreground">{showDetailModal.tradeReward} pts</span></div>
                <div className="h-px bg-border" />
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Min Deposit</span><span className="font-medium text-foreground">${showDetailModal.conditions.minDepositAmount}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Min Trade</span><span className="font-medium text-foreground">${showDetailModal.conditions.minTradeAmount}</span></div>
                {showDetailModal.conditions.requiredTradingPairs.length > 0 && (
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Trading Pairs</span><span className="font-medium text-foreground">{showDetailModal.conditions.requiredTradingPairs.join(", ")}</span></div>
                )}
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Eligible Users</span><span className="font-medium text-foreground">{eligibilityLabels[showDetailModal.conditions.eligibility]}</span></div>
                <div className="h-px bg-border" />
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Created</span><span className="font-medium text-foreground">{showDetailModal.createdAt}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Expiry</span><span className="font-medium text-foreground">{showDetailModal.expiresAt || "Never"}</span></div>
                {showDetailModal.usedBy && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Used By</span><span className="font-medium text-foreground">{showDetailModal.usedBy}</span></div>}
                {showDetailModal.usedAt && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Used At</span><span className="font-medium text-foreground">{showDetailModal.usedAt}</span></div>}
              </div>
            </div>
            <div className="flex gap-3 p-4 border-t border-border">
              {showDetailModal.status === "active" && (
                <Button variant="destructive" onClick={() => handleDeactivate(showDetailModal.id)} className="flex-1">Deactivate</Button>
              )}
              <Button variant="outline" onClick={() => setShowDetailModal(null)} className="flex-1">Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInviteCodes;

import { useState } from "react";
import { Trash2, Plus, Info, Download, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "./AdminUtils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type SubTab = "config" | "payouts" | "earners" | "activity" | "influencers";

const AdminRewards = () => {
  const [subTab, setSubTab] = useState<SubTab>("config");
  const [confirmAction, setConfirmAction] = useState<{ title: string; description: string; onConfirm: () => void; destructive?: boolean } | null>(null);
  const [showInfluencerForm, setShowInfluencerForm] = useState(false);
  const [influencerFormData, setInfluencerFormData] = useState({ username: "", minTrade: "100", profitShare: "50" });
  const [editingInfluencer, setEditingInfluencer] = useState<string | null>(null);
  const [mockInfluencers, setMockInfluencers] = useState([
    { id: "1", user: "Ibrahim Abubakar", email: "ibrahim.abu@gmail.com", status: "Active" as const, referrals: 86, minTrade: 100, profitShare: 50, totalEarned: 12500 },
    { id: "2", user: "Divine Omajuwa", email: "divineomajuwa@gmail.com", status: "Active" as const, referrals: 52, minTrade: 150, profitShare: 30, totalEarned: 6800 },
    { id: "3", user: "Chibueze Umeh", email: "chibuezeumeh903@gmail.com", status: "Paused" as const, referrals: 34, minTrade: 100, profitShare: 40, totalEarned: 4200 },
    { id: "4", user: "Fatima Kabiru", email: "fatima.k@gmail.com", status: "Active" as const, referrals: 12, minTrade: 200, profitShare: 60, totalEarned: 3100 },
  ]);

  return (
    <div>
      <h2 className="font-display text-lg font-bold text-gray-900 mb-4">Rewards Management</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        {(["config", "payouts", "earners", "activity", "influencers"] as SubTab[]).map(t => (
          <button key={t} onClick={() => setSubTab(t)} className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${subTab === t ? "border-amber-500 bg-amber-500 text-white" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {subTab === "config" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Points Issued", value: "482,350", color: "text-gray-500" },
              { label: "Total Redeemed", value: "₦3,210,000", color: "text-gray-500" },
              { label: "Active Streaks", value: "127", color: "text-gray-500" },
              { label: "Pending Redemptions", value: "8", color: "text-gray-500" },
            ].map(m => (
              <div key={m.label} className="rounded-xl border border-gray-200 bg-white p-5">
                <p className={`text-sm font-medium mb-1 ${m.color}`}>{m.label}</p>
                <p className="text-2xl font-display font-bold text-gray-900">{m.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 max-w-2xl">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Reward Rules</h3>
            {[
              { trigger: "Referral signs up + completes KYC 1", reward: "100 pts (one-time)", editable: true },
              { trigger: "Referral first trade > $100", reward: "100 pts (one-time)", editable: true },
              { trigger: "7-day trade streak", reward: "100 pts", editable: true },
              { trigger: "14-day trade streak", reward: "250 pts", editable: true },
              { trigger: "Sign-up bonus (complete 3 tasks)", reward: "500 pts", editable: true },
              { trigger: "Daily trade bonus", reward: "50 pts", editable: true },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <p className="text-sm text-gray-900">{r.trigger}</p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-amber-600">{r.reward}</span>
                  <button className="text-xs font-medium text-amber-600 hover:text-amber-700">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === "payouts" && (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <Table>
            <TableHeader><TableRow className="bg-gray-50 border-b border-gray-200 hover:bg-gray-50">
              {["User", "Points", "Cash Value", "Bank Account", "Date", "Status", "Action"].map(h => <TableHead key={h} className="h-11 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</TableHead>)}
            </TableRow></TableHeader>
            <TableBody>
              {[
                { user: "Ibrahim Abubakar", email: "ibrahim.abu@gmail.com", points: 2000, cash: "₦20,000", account: "Access Bank - 0800538398", date: "Mar 9, 2026", status: "Pending" },
                { user: "Grace Nwosu", email: "grace.nwosu@gmail.com", points: 500, cash: "₦5,000", account: "GTBank - 0123456789", date: "Mar 8, 2026", status: "Approved" },
              ].map((p, i) => (
                <TableRow key={i} className="border-gray-100 last:border-0 hover:bg-gray-50">
                  <TableCell><p className="text-sm font-medium text-gray-900">{p.user}</p><p className="text-[10px] text-gray-500">{p.email}</p></TableCell>
                  <TableCell className="text-sm text-gray-900">{p.points.toLocaleString()} pts</TableCell>
                  <TableCell className="text-sm font-medium text-gray-900">{p.cash}</TableCell>
                  <TableCell className="text-xs text-gray-500">{p.account}</TableCell>
                  <TableCell className="text-xs text-gray-500">{p.date}</TableCell>
                  <TableCell><span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${p.status === "Pending" ? "border-amber-200 bg-amber-50 text-amber-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>{p.status}</span></TableCell>
                  <TableCell>{p.status === "Pending" ? (
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => toast.success("Payout approved")} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"><CheckCircle className="w-3.5 h-3.5 text-emerald-600" /></button>
                      <button onClick={() => toast.error("Payout rejected")} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"><XCircle className="w-3.5 h-3.5 text-red-600" /></button>
                    </div>
                  ) : <span className="text-xs text-gray-500">—</span>}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {subTab === "earners" && (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <Table>
            <TableHeader><TableRow className="bg-gray-50 border-b border-gray-200 hover:bg-gray-50">
              {["Rank", "User", "Total Earned", "Referrals", "Streak", "Redeemed", "Balance"].map(h => <TableHead key={h} className="h-11 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</TableHead>)}
            </TableRow></TableHeader>
            <TableBody>
              {[
                { rank: 1, user: "Ibrahim Abubakar", total: 15200, referrals: 86, streak: 42, redeemed: 12000, balance: 3200 },
                { rank: 2, user: "Divine Omajuwa", total: 8900, referrals: 52, streak: 28, redeemed: 6000, balance: 2900 },
                { rank: 3, user: "Chibueze Umeh", total: 6450, referrals: 34, streak: 21, redeemed: 4000, balance: 2450 },
                { rank: 4, user: "Adewale Martins", total: 4300, referrals: 18, streak: 14, redeemed: 3000, balance: 1300 },
                { rank: 5, user: "Fatima Kabiru", total: 3800, referrals: 12, streak: 30, redeemed: 2500, balance: 1300 },
              ].map(e => (
                <TableRow key={e.rank} className="border-gray-100 last:border-0 hover:bg-gray-50">
                  <TableCell><span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${e.rank <= 3 ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-500"}`}>{e.rank}</span></TableCell>
                  <TableCell className="text-sm font-medium text-gray-900">{e.user}</TableCell>
                  <TableCell className="text-sm font-semibold text-emerald-600">{e.total.toLocaleString()} pts</TableCell>
                  <TableCell className="text-sm text-gray-900">{e.referrals}</TableCell>
                  <TableCell className="text-sm text-gray-900">{e.streak} days</TableCell>
                  <TableCell className="text-sm text-gray-500">{e.redeemed.toLocaleString()} pts</TableCell>
                  <TableCell className="text-sm text-gray-900">{e.balance.toLocaleString()} pts</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {subTab === "activity" && (
        <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
          <p className="text-sm text-gray-500">Reward activity log — referrals, streaks, redemptions, and more will appear here.</p>
        </div>
      )}

      {subTab === "influencers" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">Manage influencer accounts with custom profit-share referral rewards</p>
            <button onClick={() => { setShowInfluencerForm(true); setEditingInfluencer(null); setInfluencerFormData({ username: "", minTrade: "100", profitShare: "50" }); }}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-white rounded-lg text-xs font-medium hover:bg-amber-600">
              <Plus className="w-3.5 h-3.5" /> Appoint Influencer
            </button>
          </div>
          {showInfluencerForm && (
            <div className="rounded-xl border border-gray-200 bg-white p-5 mb-6 max-w-2xl">
              <h4 className="text-sm font-semibold text-gray-900 mb-4">{editingInfluencer ? "Edit Influencer Config" : "Appoint New Influencer"}</h4>
              <div className="space-y-4">
                {!editingInfluencer && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Username / Email</label>
                    <input value={influencerFormData.username} onChange={e => setInfluencerFormData(p => ({ ...p, username: e.target.value }))} placeholder="Search user..." className="w-full h-10 rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400" />
                  </div>
                )}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Min Trade Value ($)</label>
                    <input type="number" value={influencerFormData.minTrade} onChange={e => setInfluencerFormData(p => ({ ...p, minTrade: e.target.value }))} className="w-full h-10 rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Profit Share %</label>
                    <input type="number" value={influencerFormData.profitShare} onChange={e => setInfluencerFormData(p => ({ ...p, profitShare: e.target.value }))} min="1" max="100" className="w-full h-10 rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { if (editingInfluencer) setMockInfluencers(prev => prev.map(inf => inf.id === editingInfluencer ? { ...inf, minTrade: Number(influencerFormData.minTrade), profitShare: Number(influencerFormData.profitShare) } : inf)); setShowInfluencerForm(false); toast.success("Saved"); }} className="px-5 py-2 bg-amber-500 text-white rounded-lg text-xs font-medium hover:bg-amber-600">{editingInfluencer ? "Save Changes" : "Appoint"}</button>
                  <button onClick={() => setShowInfluencerForm(false)} className="px-5 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-xs font-medium hover:bg-gray-50">Cancel</button>
                </div>
              </div>
            </div>
          )}
          <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <Table>
              <TableHeader><TableRow className="bg-gray-50 border-b border-gray-200 hover:bg-gray-50">
                {["User", "Status", "Referrals", "Min Trade", "Profit Share", "Total Earned", "Actions"].map(h => <TableHead key={h} className="h-11 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</TableHead>)}
              </TableRow></TableHeader>
              <TableBody>
                {mockInfluencers.map(inf => (
                  <TableRow key={inf.id} className="border-gray-100 last:border-0 hover:bg-gray-50">
                    <TableCell><p className="text-sm font-medium text-gray-900">{inf.user}</p><p className="text-[10px] text-gray-500">{inf.email}</p></TableCell>
                    <TableCell><span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${inf.status === "Active" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-amber-200 bg-amber-50 text-amber-700"}`}>{inf.status}</span></TableCell>
                    <TableCell className="text-sm text-gray-900">{inf.referrals}</TableCell>
                    <TableCell className="text-sm text-gray-900">${inf.minTrade}</TableCell>
                    <TableCell className="text-sm font-medium text-amber-600">{inf.profitShare}%</TableCell>
                    <TableCell className="text-sm font-semibold text-emerald-600">{inf.totalEarned.toLocaleString()} pts</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => { setEditingInfluencer(inf.id); setInfluencerFormData({ username: inf.user, minTrade: String(inf.minTrade), profitShare: String(inf.profitShare) }); setShowInfluencerForm(true); }} className="text-xs font-medium text-amber-600 hover:text-amber-700">Edit</button>
                        <span className="text-gray-400">|</span>
                        <button onClick={() => setMockInfluencers(prev => prev.map(i => i.id === inf.id ? { ...i, status: i.status === "Active" ? "Paused" as const : "Active" as const } : i))} className="text-xs font-medium text-gray-600 hover:text-gray-900">{inf.status === "Active" ? "Pause" : "Activate"}</button>
                        <span className="text-gray-400">|</span>
                        <button onClick={() => setConfirmAction({ title: "Remove Influencer", description: `Remove ${inf.user} as influencer?`, destructive: true, onConfirm: () => { setMockInfluencers(prev => prev.filter(i => i.id !== inf.id)); setConfirmAction(null); toast.success("Removed"); } })} className="text-xs font-medium text-red-600 hover:text-red-700">Remove</button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!confirmAction} onClose={() => setConfirmAction(null)} onConfirm={() => confirmAction?.onConfirm()} title={confirmAction?.title || ""} description={confirmAction?.description || ""} destructive={confirmAction?.destructive} />
    </div>
  );
};

export default AdminRewards;

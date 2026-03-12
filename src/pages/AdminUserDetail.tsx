import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown, Upload, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import CryptoIcon from "@/components/CryptoIcon";
import AdminLayout from "@/components/admin/AdminLayout";
import { StatusBadge, CopyButton, ConfirmDialog } from "@/components/admin/AdminUtils";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  mockUser, userTransactions, userActivities, activityCategoryColors,
  userRewards, userTasks, userReferrals, kycLevel1, kycLevel3, holdingBalance
} from "@/data/adminMockData";

type UserTab = "info" | "transactions" | "activities" | "rewards" | "task" | "referrals" | "kyc";
type SummaryTab = "user-summary" | "holding-balance";
type KycLevel = "level1" | "level2" | "level3";

const AdminUserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [actionOpen, setActionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<UserTab>("info");
  const [summaryTab, setSummaryTab] = useState<SummaryTab>("user-summary");
  const [kycLevel, setKycLevel] = useState<KycLevel>("level1");
  const [autoPay, setAutoPay] = useState(mockUser.autoPay);
  const [autoWithdrawal, setAutoWithdrawal] = useState(mockUser.autoWithdrawal);
  const [nudgedTasks, setNudgedTasks] = useState<Record<number, boolean>>({});
  const [confirmAction, setConfirmAction] = useState<{ title: string; description: string; onConfirm: () => void; destructive?: boolean } | null>(null);
  const [activityFilter, setActivityFilter] = useState<string>("all");

  const handleAction = (action: string) => {
    setActionOpen(false);
    switch (action) {
      case "send-message": toast.success("Message dialog opened (mock)"); break;
      case "award-points": toast.success("500 points awarded to " + mockUser.name); break;
      case "suspend": toast.error(mockUser.name + " has been suspended"); break;
      case "reset-password": toast.success("Password reset email sent to " + mockUser.email); break;
      case "credit-debit": toast.info("Credit/Debit wallet dialog opened"); break;
      case "override-kyc": toast.success("KYC override applied for " + mockUser.name); break;
      case "flag": toast.warning(mockUser.name + " has been flagged"); break;
    }
  };

  const userTabs: { key: UserTab; label: string }[] = [
    { key: "info", label: "Info" },
    { key: "transactions", label: "Transactions" },
    { key: "activities", label: "Activities" },
    { key: "rewards", label: "Rewards" },
    { key: "task", label: "Task" },
    { key: "referrals", label: "Referrals" },
    { key: "kyc", label: "KYC" },
  ];

  return (
    <AdminLayout activeTab="users" onTabChange={(tab) => navigate("/admin")} headerTitle="Users">
      {/* Close button */}
      <div className="flex justify-end mb-2">
        <button onClick={() => navigate("/admin")} className="text-primary hover:text-foreground transition-colors">✕</button>
      </div>

      {/* User header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-accent/30 flex items-center justify-center text-lg font-bold text-accent">
            {mockUser.initials}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{mockUser.name}</h2>
            <p className="text-sm text-primary">{mockUser.email}</p>
          </div>
        </div>
        <div className="relative">
          <button onClick={() => setActionOpen(!actionOpen)}
            className="flex items-center gap-2 px-5 py-2.5 border border-primary text-primary rounded-lg text-sm font-medium hover:bg-primary/10 transition-colors">
            Action <ChevronDown className={`w-4 h-4 transition-transform ${actionOpen ? "rotate-180" : ""}`} />
          </button>
          {actionOpen && (
            <div className="absolute right-0 top-12 w-56 bg-card border border-border rounded-xl shadow-lg py-2 z-20">
              {[
                { key: "send-message", label: "Send message" },
                { key: "award-points", label: "Award points" },
                { key: "credit-debit", label: "Credit / Debit Wallet" },
                { key: "reset-password", label: "Reset Password" },
                { key: "override-kyc", label: "Override KYC" },
                { key: "flag", label: "Flag Account", destructive: false },
              ].map(a => (
                <button key={a.key} onClick={() => handleAction(a.key)} className="w-full text-left px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors">{a.label}</button>
              ))}
              <div className="h-px bg-border my-1" />
              <button onClick={() => setConfirmAction({ title: "Suspend User", description: `Suspend ${mockUser.name}'s account? They will be unable to trade or withdraw.`, destructive: true, onConfirm: () => { handleAction("suspend"); setConfirmAction(null); } })}
                className="w-full text-left px-4 py-2.5 text-sm text-destructive hover:bg-secondary transition-colors">Suspend user</button>
            </div>
          )}
        </div>
      </div>

      {/* Summary tabs */}
      <div className="flex gap-6 mb-4 border-b border-border">
        <button onClick={() => setSummaryTab("user-summary")} className={`text-sm pb-2 border-b-2 ${summaryTab === "user-summary" ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground"}`}>User summary</button>
        <button onClick={() => setSummaryTab("holding-balance")} className={`text-sm pb-2 border-b-2 ${summaryTab === "holding-balance" ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground"}`}>Holding Balance</button>
      </div>

      {summaryTab === "user-summary" && (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm text-[hsl(var(--deex-orange))] mb-1">Total transaction payout</p>
              <p className="text-xl font-bold text-foreground">{mockUser.totalPayout}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm text-destructive mb-1">Total referrals</p>
              <p className="text-xl font-bold text-foreground">{mockUser.totalReferrals}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm text-[hsl(var(--deex-orange))] mb-1">Points earned</p>
              <p className="text-xl font-bold text-foreground">{mockUser.pointsEarned}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm text-destructive mb-1">Total commission earned</p>
              <p className="text-xl font-bold text-foreground">{mockUser.totalCommission}</p>
            </div>
          </div>

          {/* Activity header with Switch */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <p className="text-sm font-semibold text-foreground">Activity</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <label className="flex items-center gap-2">
                <Switch checked={autoPay} onCheckedChange={v => { setAutoPay(v); toast.success(`Auto Pay ${v ? "enabled" : "disabled"}`); }} />
                AUTO PAY: {autoPay ? "ON" : "OFF"}
              </label>
              <span>|</span>
              <label className="flex items-center gap-2">
                <Switch checked={autoWithdrawal} onCheckedChange={v => { setAutoWithdrawal(v); toast.success(`Auto Withdrawal ${v ? "enabled" : "disabled"}`); }} />
                AUTO WITHDRAWAL: {autoWithdrawal ? "ON" : "OFF"}
              </label>
              <span>|</span>
              <button className="flex items-center gap-1 hover:text-foreground"><Upload className="w-3.5 h-3.5" /> EXPORT</button>
            </div>
          </div>

          {/* User tabs */}
          <div className="flex gap-4 md:gap-6 mb-6 border-b border-border overflow-x-auto pb-0">
            {userTabs.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)}
                className={`text-sm pb-2 border-b-2 transition-colors ${activeTab === t.key ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
                {t.label}
              </button>
            ))}
          </div>

          {/* INFO TAB */}
          {activeTab === "info" && (
            <div className="space-y-6">
              {[
                { label: "Email Address", value: mockUser.email },
                { label: "Phone Number", value: mockUser.phone },
                { label: "Customer Type", value: mockUser.customerType },
                { label: "DeeX Tag", value: mockUser.deexTag },
                { label: "Customer ID", value: mockUser.customerId },
              ].map(field => (
                <div key={field.label} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 md:gap-16">
                  <p className="text-sm text-foreground font-medium sm:w-44 shrink-0">{field.label}</p>
                  <div className="flex-1 h-11 bg-secondary rounded-lg px-4 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{field.value}</span>
                    <CopyButton text={field.value} label={field.label} />
                  </div>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 md:gap-16">
                <p className="text-sm text-foreground font-medium w-44 shrink-0">Referral Link</p>
                <div className="flex-1 h-11 bg-secondary rounded-lg px-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span className="truncate">{mockUser.referralLink}</span>
                  <CopyButton text={mockUser.referralLink} label="Referral link" />
                </div>
              </div>
              {mockUser.linkedAccounts.map(acc => (
                <div key={acc.accountNumber} className="flex items-center gap-16">
                  <p className="text-sm text-foreground font-medium w-44 shrink-0">Linked Account</p>
                  <div className="flex-1 h-11 bg-secondary rounded-lg px-4 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{acc.bank} — {acc.accountName} — {acc.accountNumber}</span>
                    <CopyButton text={acc.accountNumber} label="Account number" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TRANSACTIONS TAB */}
          {activeTab === "transactions" && (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <Table>
                <TableHeader><TableRow>
                  {["Asset", "Type", "Channel", "C/D", "Amount", "Bal Before", "Bal After", "Trans ID", "Date", "Status"].map(h => <TableHead key={h}>{h}</TableHead>)}
                </TableRow></TableHeader>
                <TableBody>
                  {userTransactions.map((t, i) => (
                    <TableRow key={i}>
                      <TableCell><div className="flex items-center gap-2"><CryptoIcon symbol={t.asset} size="sm" /><span className="text-sm text-foreground">{t.asset}</span></div></TableCell>
                      <TableCell className="text-sm text-foreground">{t.type}</TableCell>
                      <TableCell>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          t.channel === "wallet" ? "bg-primary/20 text-primary" :
                          t.channel === "order" ? "bg-[hsl(var(--deex-orange))]/20 text-[hsl(var(--deex-orange))]" :
                          "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]"
                        }`}>
                          {t.channel === "wallet" ? "Wallet" : t.channel === "order" ? "Order" : "Payout"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          t.creditDebit === "credit" ? "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]" : "bg-destructive/20 text-destructive"
                        }`}>
                          {t.creditDebit === "credit" ? "CR" : "DR"}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-foreground whitespace-pre-line">{t.amount}</TableCell>
                      <TableCell className="text-xs text-muted-foreground font-mono">{t.balanceBefore}</TableCell>
                      <TableCell className="text-xs text-muted-foreground font-mono">{t.balanceAfter}</TableCell>
                      <TableCell><div className="flex items-center gap-1"><span className="text-xs text-muted-foreground font-mono">{t.txId.slice(0, 12)}...</span><CopyButton text={t.txId} label="Trans ID" /></div></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{t.date}</TableCell>
                      <TableCell><StatusBadge status={t.status} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* ACTIVITIES TAB */}
          {activeTab === "activities" && (
            <div>
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {["all", "auth", "wallet", "trade", "kyc", "security", "settings", "referral", "reward"].map(cat => (
                  <button key={cat} onClick={() => setActivityFilter(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activityFilter === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                    {cat === "all" ? "All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <Table>
                  <TableHeader><TableRow>
                    {["Time", "Category", "Event", "Details", "IP Address"].map(h => <TableHead key={h}>{h}</TableHead>)}
                  </TableRow></TableHeader>
                  <TableBody>
                    {userActivities.filter(a => activityFilter === "all" || a.category === activityFilter).map((a, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</TableCell>
                        <TableCell>
                          <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wider ${activityCategoryColors[a.category] || "bg-muted text-muted-foreground"}`}>
                            {a.category.toUpperCase()}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm font-medium text-foreground">{a.type}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{a.desc}</TableCell>
                        <TableCell className="text-xs text-muted-foreground font-mono">{a.ip}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* REWARDS TAB */}
          {activeTab === "rewards" && (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <Table>
                <TableHeader><TableRow>
                  {["Date", "Activity", "Description", "Amount"].map(h => <TableHead key={h} className={h === "Amount" ? "text-right" : ""}>{h}</TableHead>)}
                </TableRow></TableHeader>
                <TableBody>
                  {userRewards.map((r, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-sm text-muted-foreground">{r.date}</TableCell>
                      <TableCell className="text-sm text-foreground">{r.activity}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{r.description}</TableCell>
                      <TableCell className="text-sm text-foreground text-right">{r.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* TASK TAB */}
          {activeTab === "task" && (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <Table>
                <TableHeader><TableRow>
                  {["Task", "Status", "Date Completed", "Action"].map(h => <TableHead key={h} className={h === "Action" ? "text-right" : ""}>{h}</TableHead>)}
                </TableRow></TableHeader>
                <TableBody>
                  {userTasks.map((t, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-sm text-foreground">{t.task}</TableCell>
                      <TableCell><StatusBadge status={t.status === "Completed" ? "COMPLETED" : "PENDING"} /></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{t.date}</TableCell>
                      <TableCell className="text-right">
                        {t.status === "Pending" ? (
                          nudgedTasks[i] ? (
                            <span className="text-xs text-[hsl(var(--success))]">✓ Nudged</span>
                          ) : (
                            <button onClick={() => setConfirmAction({ title: "Nudge User", description: `Send a push notification to ${mockUser.name} to complete "${t.task}"?`, onConfirm: () => { setNudgedTasks(prev => ({ ...prev, [i]: true })); toast.success("Nudge sent!"); setConfirmAction(null); } })}
                              className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-medium transition-colors">Nudge</button>
                          )
                        ) : <span className="text-xs text-muted-foreground">—</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* REFERRALS TAB */}
          {activeTab === "referrals" && (
            <div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">Total Referrals</p>
                  <p className="text-xl font-bold text-foreground">{userReferrals.length}</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">Total Points Earned</p>
                  <p className="text-xl font-bold text-primary">{userReferrals.reduce((sum, r) => sum + r.pointsEarned, 0).toLocaleString()}</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">Active Referrals</p>
                  <p className="text-xl font-bold text-[hsl(var(--success))]">{userReferrals.filter(r => r.status === "Active").length}</p>
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <Table>
                  <TableHeader><TableRow>
                    {["Date", "Email", "Status", "Points Earned"].map(h => <TableHead key={h} className={h === "Points Earned" ? "text-right" : ""}>{h}</TableHead>)}
                  </TableRow></TableHeader>
                  <TableBody>
                    {userReferrals.map((r, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-sm text-muted-foreground">{r.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-foreground">{r.email}</span>
                            <CopyButton text={r.email} label="Email" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                            r.status === "Active" ? "bg-[hsl(var(--success))]/20 text-[hsl(var(--success))]" :
                            r.status === "Signed up" ? "bg-[hsl(var(--warning))]/20 text-[hsl(var(--warning))]" :
                            "bg-muted text-muted-foreground"
                          }`}>{r.status}</span>
                        </TableCell>
                        <TableCell className="text-sm text-foreground text-right">{r.pointsEarned > 0 ? `+${r.pointsEarned} pts` : "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* KYC TAB */}
          {activeTab === "kyc" && (
            <div>
              <div className="flex gap-6 mb-6 border-b border-border">
                {(["level1", "level2", "level3"] as KycLevel[]).map(lvl => (
                  <button key={lvl} onClick={() => setKycLevel(lvl)}
                    className={`text-sm pb-2 border-b-2 transition-colors ${kycLevel === lvl ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground"}`}>
                    {lvl === "level1" ? "Level 1" : lvl === "level2" ? "Level 2" : "Level 3"}
                  </button>
                ))}
              </div>
              {kycLevel === "level1" && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="grid grid-cols-2 gap-x-12 gap-y-0">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-4">PERSONAL</p>
                      <div className="space-y-3">
                        {Object.entries(kycLevel1.personal).map(([key, val]) => (
                          <div key={key} className="flex items-center justify-between py-1">
                            <span className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <div className="flex items-center gap-1">
                              <span className="text-sm text-foreground">{val}</span>
                              {["email", "phone", "accountNumber", "customerId"].includes(key) && <CopyButton text={val} label={key} />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-4">Next of KIN</p>
                      <div className="space-y-3">
                        {Object.entries(kycLevel1.nextOfKin).map(([key, val]) => (
                          <div key={key} className="flex items-center justify-between py-1">
                            <span className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="text-sm text-destructive">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {kycLevel === "level2" && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-base font-bold text-foreground mb-4">KYC Level 2</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">BVN Verification</span><span className="text-sm text-[hsl(var(--success))]">Verified</span></div>
                    <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">NIN Verification</span><span className="text-sm text-[hsl(var(--success))]">Verified</span></div>
                    <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">Date Submitted</span><span className="text-sm text-foreground">Jul 3rd, 2024</span></div>
                    <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">Status</span><StatusBadge status="APPROVED" /></div>
                  </div>
                </div>
              )}
              {kycLevel === "level3" && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-base font-bold text-foreground mb-2">KYC Level 3</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">Type</span><span className="text-sm text-foreground">{kycLevel3.type}</span></div>
                    <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">Status</span><span className="text-sm text-[hsl(var(--success))]">{kycLevel3.status}</span></div>
                    <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">Country</span><span className="text-sm text-primary">{kycLevel3.country}</span></div>
                    <div className="flex justify-between py-1"><span className="text-sm text-muted-foreground">Address</span><span className="text-sm text-foreground">{kycLevel3.address}</span></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div><p className="text-[10px] text-muted-foreground tracking-wider mb-2">ID CARD</p><div className="h-32 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground text-xs">📄 Document</div></div>
                    <div><p className="text-[10px] text-muted-foreground tracking-wider mb-2">PROOF OF ADDRESS</p><div className="h-32 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground text-xs">📄 Document</div></div>
                    <div><p className="text-[10px] text-muted-foreground tracking-wider mb-2">LIVENESS CHECK</p><div className="h-32 bg-secondary rounded-lg flex items-center justify-center text-muted-foreground text-xs">📸 Selfie</div></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* HOLDING BALANCE TAB */}
      {summaryTab === "holding-balance" && (
        <div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Holdings (USD)</p>
              <p className="text-2xl font-bold text-foreground">$1,494.23</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Assets Held</p>
              <p className="text-2xl font-bold text-foreground">3</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-1">Largest Holding</p>
              <p className="text-2xl font-bold text-foreground">USDT</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <Table>
              <TableHeader><TableRow>
                {["Asset", "Amount", "USD Value"].map(h => <TableHead key={h} className={h === "USD Value" ? "text-right" : ""}>{h}</TableHead>)}
              </TableRow></TableHeader>
              <TableBody>
                {holdingBalance.map((h, i) => (
                  <TableRow key={i}>
                    <TableCell><div className="flex items-center gap-2"><CryptoIcon symbol={h.symbol} size="sm" /><span className="text-sm font-medium text-foreground">{h.symbol}</span></div></TableCell>
                    <TableCell className="text-sm text-foreground">{h.amount}</TableCell>
                    <TableCell className="text-sm text-foreground text-right">{h.usd}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!confirmAction} onClose={() => setConfirmAction(null)} onConfirm={() => confirmAction?.onConfirm()} title={confirmAction?.title || ""} description={confirmAction?.description || ""} destructive={confirmAction?.destructive} />
    </AdminLayout>
  );
};

export default AdminUserDetail;

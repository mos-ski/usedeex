import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Building2, Star, Trash2, CheckCircle2, Wallet, Phone } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import NewBadge from "@/components/NewBadge";
import CryptoIcon from "@/components/CryptoIcon";
import { toast } from "sonner";

type BeneficiaryTab = "banks" | "wallets" | "bills";

const initialBanks = [
  { id: 1, bank: "PalmPay", account: "8103674006", name: "JOHN DOE", isDefault: true, verified: true },
  { id: 2, bank: "Opay", account: "9012345678", name: "JOHN DOE", isDefault: false, verified: true },
  { id: 3, bank: "GTBank", account: "0123456789", name: "JOHN DOE", isDefault: false, verified: false },
];

const initialWallets = [
  { id: 1, label: "Main BTC Wallet", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", network: "Bitcoin", symbol: "BTC" },
  { id: 2, label: "Trading USDT", address: "TJYs...X8nP", network: "TRC-20", symbol: "USDT" },
  { id: 3, label: "@adebayo", address: "@adebayo", network: "DeeX Username", symbol: "USER" },
];

const initialBills = [
  { id: 1, label: "MTN - Personal", type: "Airtime", number: "08103674006", provider: "MTN" },
  { id: 2, label: "IKEDC - Home", type: "Electricity", number: "04521234567", provider: "IKEDC" },
  { id: 3, label: "Bet9ja", type: "Betting", number: "BET9JA-123456", provider: "Bet9ja" },
];

const BankAccounts = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<BeneficiaryTab>("banks");
  const [banks, setBanks] = useState(initialBanks);
  const [wallets, setWallets] = useState(initialWallets);
  const [bills, setBills] = useState(initialBills);
  const [showAdd, setShowAdd] = useState(false);

  const setDefault = (id: number) => setBanks(banks.map(b => ({ ...b, isDefault: b.id === id })));
  const removeBank = (id: number) => { setBanks(banks.filter(b => b.id !== id)); toast.success("Bank removed"); };
  const removeWallet = (id: number) => { setWallets(wallets.filter(w => w.id !== id)); toast.success("Wallet removed"); };
  const removeBill = (id: number) => { setBills(bills.filter(b => b.id !== id)); toast.success("Beneficiary removed"); };

  const tabs: { key: BeneficiaryTab; label: string }[] = [
    { key: "banks", label: "Banks" },
    { key: "wallets", label: "Wallets" },
    { key: "bills", label: "Bills" },
  ];

  return (
    <MobileLayout hideNav>
      <PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">Manage Beneficiaries</h2>
            <NewBadge />
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-secondary rounded-xl p-1 mb-5">
            {tabs.map(t => (
              <button key={t.key} onClick={() => { setActiveTab(t.key); setShowAdd(false); }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === t.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
                {t.label}
              </button>
            ))}
          </div>

          {/* Banks Tab */}
          {activeTab === "banks" && (
            <>
              <div className="space-y-3 mb-6">
                {banks.map(b => (
                  <div key={b.id} className={`bg-card border rounded-xl p-4 ${b.isDefault ? "border-primary" : "border-border"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm font-semibold text-foreground">{b.bank}</span>
                        {b.isDefault && <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded">Default</span>}
                        {b.verified ? <CheckCircle2 className="w-4 h-4 text-success" /> : <span className="text-[10px] bg-warning/20 text-warning px-1.5 py-0.5 rounded">Pending</span>}
                      </div>
                    </div>
                    <p className="text-sm text-foreground font-mono mb-1">{b.account}</p>
                    <p className="text-xs text-muted-foreground mb-3">{b.name}</p>
                    <div className="flex gap-2">
                      {!b.isDefault && <button onClick={() => setDefault(b.id)} className="flex items-center gap-1 text-xs text-primary"><Star className="w-3 h-3" /> Set Default</button>}
                      <button onClick={() => removeBank(b.id)} className="flex items-center gap-1 text-xs text-destructive ml-auto"><Trash2 className="w-3 h-3" /> Remove</button>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowAdd(!showAdd)} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" /> Add Bank Account
              </button>
              {showAdd && (
                <div className="mt-4 bg-card border border-border rounded-xl p-4 space-y-3">
                  <input placeholder="Bank name" className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary" />
                  <input placeholder="Account number" className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary" />
                  <button onClick={() => { setShowAdd(false); toast.success("Bank added"); }} className="w-full h-12 bg-success rounded-xl text-foreground font-semibold">Verify & Add</button>
                </div>
              )}
            </>
          )}

          {/* Wallets Tab */}
          {activeTab === "wallets" && (
            <>
              <div className="space-y-3 mb-6">
                {wallets.map(w => (
                  <div key={w.id} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {w.symbol === "USER" ? (
                        <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center"><Wallet className="w-4 h-4 text-primary" /></div>
                      ) : (
                        <CryptoIcon symbol={w.symbol} size="sm" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{w.label}</p>
                        <p className="text-xs text-muted-foreground">{w.network}</p>
                      </div>
                      <button onClick={() => removeWallet(w.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono break-all">{w.address}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowAdd(!showAdd)} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" /> Add Wallet Address
              </button>
              {showAdd && (
                <div className="mt-4 bg-card border border-border rounded-xl p-4 space-y-3">
                  <input placeholder="Label (e.g. Main BTC Wallet)" className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary" />
                  <input placeholder="Wallet address or @username" className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary font-mono" />
                  <input placeholder="Network (e.g. TRC-20, BEP-20)" className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary" />
                  <button onClick={() => { setShowAdd(false); toast.success("Wallet saved"); }} className="w-full h-12 bg-success rounded-xl text-foreground font-semibold">Save Wallet</button>
                </div>
              )}
            </>
          )}

          {/* Bills Tab */}
          {activeTab === "bills" && (
            <>
              <div className="space-y-3 mb-6">
                {bills.map(b => (
                  <div key={b.id} className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center"><Phone className="w-4 h-4 text-primary" /></div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{b.label}</p>
                        <p className="text-xs text-muted-foreground">{b.type} • {b.provider}</p>
                      </div>
                      <button onClick={() => removeBill(b.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></button>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono">{b.number}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setShowAdd(!showAdd)} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" /> Add Bill Beneficiary
              </button>
              {showAdd && (
                <div className="mt-4 bg-card border border-border rounded-xl p-4 space-y-3">
                  <input placeholder="Label (e.g. MTN - Personal)" className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary" />
                  <select className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select type</option>
                    <option value="Airtime">Airtime</option>
                    <option value="Data">Data</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Betting">Betting</option>
                  </select>
                  <input placeholder="Phone/Meter/Account number" className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary" />
                  <button onClick={() => { setShowAdd(false); toast.success("Beneficiary saved"); }} className="w-full h-12 bg-success rounded-xl text-foreground font-semibold">Save Beneficiary</button>
                </div>
              )}
            </>
          )}
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default BankAccounts;

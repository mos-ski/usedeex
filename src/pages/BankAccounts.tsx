import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Building2, Star, Trash2, CheckCircle2 } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import NewBadge from "@/components/NewBadge";

const initialBanks = [
  { id: 1, bank: "PalmPay", account: "8103674006", name: "JOHN DOE", isDefault: true, verified: true },
  { id: 2, bank: "Opay", account: "9012345678", name: "JOHN DOE", isDefault: false, verified: true },
  { id: 3, bank: "GTBank", account: "0123456789", name: "JOHN DOE", isDefault: false, verified: false },
];

const BankAccounts = () => {
  const navigate = useNavigate();
  const [banks, setBanks] = useState(initialBanks);
  const [showAdd, setShowAdd] = useState(false);

  const setDefault = (id: number) => setBanks(banks.map(b => ({ ...b, isDefault: b.id === id })));
  const remove = (id: number) => setBanks(banks.filter(b => b.id !== id));

  return (
    <MobileLayout hideNav>
      <PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">Bank Accounts</h2>
            <NewBadge />
          </div>

          <div className="space-y-3 mb-6">
            {banks.map(b => (
              <div key={b.id} className={`bg-card border rounded-xl p-4 ${b.isDefault ? "border-primary" : "border-border"}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-semibold text-foreground">{b.bank}</span>
                    {b.isDefault && <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded">Default</span>}
                    {b.verified ? (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    ) : (
                      <span className="text-[10px] bg-warning/20 text-warning px-1.5 py-0.5 rounded">Pending</span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-foreground font-mono mb-1">{b.account}</p>
                <p className="text-xs text-muted-foreground mb-3">{b.name}</p>
                <div className="flex gap-2">
                  {!b.isDefault && (
                    <button onClick={() => setDefault(b.id)} className="flex items-center gap-1 text-xs text-primary"><Star className="w-3 h-3" /> Set Default</button>
                  )}
                  <button onClick={() => remove(b.id)} className="flex items-center gap-1 text-xs text-destructive ml-auto"><Trash2 className="w-3 h-3" /> Remove</button>
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
              <button onClick={() => setShowAdd(false)} className="w-full h-12 bg-success rounded-xl text-foreground font-semibold">Verify & Add</button>
            </div>
          )}
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default BankAccounts;

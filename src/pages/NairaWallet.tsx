import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, ArrowDownLeft, ArrowUpRight, ChevronRight, CheckCircle, Wallet, ShieldCheck } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import BottomNav from "@/components/layout/BottomNav";
import PageTransition from "@/components/PageTransition";
import ProviderIcon from "@/components/ProviderIcon";
import { nairaWalletBalance, nairaWalletTransactions, nairaBanks } from "@/data/nairaWalletData";
import { toast } from "sonner";

type Step = "requirements" | "home" | "topup-method" | "topup-amount" | "topup-review" | "topup-success";
type RequirementField = {
  key: string;
  label: string;
  type: "select" | "text" | "date";
  placeholder: string;
  options?: string[];
};

const oldUserNairaWalletRequirements: RequirementField[] = [
  {
    key: "gender",
    label: "Gender",
    type: "select",
    placeholder: "Select your gender",
    options: ["Male", "Female", "Prefer not to say"],
  },
  {
    key: "stateOfResidence",
    label: "State of Residence",
    type: "select",
    placeholder: "Select your state",
    options: ["Abuja FCT", "Lagos", "Ogun", "Oyo", "Rivers", "Kano", "Kaduna", "Enugu", "Anambra", "Delta"],
  },
  {
    key: "lga",
    label: "Local Government Area",
    type: "text",
    placeholder: "Enter your LGA",
  },
  {
    key: "address",
    label: "Residential Address",
    type: "text",
    placeholder: "Enter your home address",
  },
];

const oldUserNeedsNairaWalletRequirements = true;

const NairaWallet = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(oldUserNeedsNairaWalletRequirements ? "requirements" : "home");
  const [showBalance, setShowBalance] = useState(true);
  const [selectedBank, setSelectedBank] = useState(nairaBanks[0]);
  const [topupAmount, setTopupAmount] = useState("");
  const [requirements, setRequirements] = useState<Record<string, string>>({});

  const formattedBalance = nairaWalletBalance.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const requiredFieldsComplete = oldUserNairaWalletRequirements.every((field) => requirements[field.key]?.trim());

  const goBack = () => {
    if (step === "requirements") { navigate(-1); return; }
    if (step === "home") { navigate(-1); return; }
    const flow: Step[] = ["home", "topup-method", "topup-amount", "topup-review", "topup-success"];
    const idx = flow.indexOf(step);
    if (idx <= 0) setStep("home");
    else setStep(flow[idx - 1]);
  };

  const updateRequirement = (key: string, value: string) => {
    setRequirements((current) => ({ ...current, [key]: value }));
  };

  const createWallet = () => {
    if (!requiredFieldsComplete) return;
    toast.success("Naira Wallet created successfully");
    setStep("home");
  };

  if (step === "requirements") {
    return (
      <MobileLayout hideNav>
        <PageTransition>
          <div className="min-h-screen bg-brand-canvas px-4 pb-8 pt-4 font-roboto text-brand-grey900">
            <header className="mb-5 flex items-center gap-3">
              <button type="button" onClick={goBack} aria-label="Go back" className="flex size-10 items-center justify-center rounded-full bg-white text-brand-grey900 shadow-sm transition-colors hover:bg-brand-grey50">
                <ArrowLeft className="size-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold leading-tight">Create Naira Wallet</h1>
                <p className="mt-0.5 text-xs text-brand-grey500">Set up your wallet in a minute</p>
              </div>
            </header>

            <section className="mb-4 rounded-2xl bg-brand-deepNavy p-5 text-white shadow-sm">
              <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-white/10">
                <ShieldCheck className="size-6 text-brand-sky" />
              </div>
              <h2 className="mb-2 text-xl font-bold">Complete your profile</h2>
              <p className="text-sm leading-6 text-white/75">
                Add the details below so we can create your secure Naira Wallet.
              </p>
            </section>

            <section className="mb-4 space-y-4 rounded-2xl bg-white p-4 shadow-sm">
              {oldUserNairaWalletRequirements.map((field) => (
                <div key={field.key}>
                  <label className="mb-2 block text-sm font-medium text-brand-grey900">{field.label}</label>
                  {field.type === "select" ? (
                    <select
                      value={requirements[field.key] || ""}
                      onChange={(event) => updateRequirement(field.key, event.target.value)}
                      className={`h-12 w-full rounded-xl border border-brand-grey100 bg-brand-grey50 px-4 text-sm outline-none focus:border-brand-blue500 focus:ring-2 focus:ring-brand-primary100 ${requirements[field.key] ? "text-brand-grey900" : "text-brand-grey500"}`}
                    >
                      <option value="">{field.placeholder}</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={requirements[field.key] || ""}
                      onChange={(event) => updateRequirement(field.key, event.target.value)}
                      placeholder={field.placeholder}
                      className="h-12 w-full rounded-xl border border-brand-grey100 bg-brand-grey50 px-4 text-sm text-brand-grey900 outline-none placeholder:text-brand-grey400 focus:border-brand-blue500 focus:ring-2 focus:ring-brand-primary100"
                    />
                  )}
                </div>
              ))}
            </section>

            <div className="mb-6 rounded-2xl border border-brand-primary100 bg-brand-tint p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-blue500" />
                <div>
                  <p className="mb-1 text-sm font-semibold text-brand-grey900">Your details are protected</p>
                  <p className="text-xs leading-5 text-brand-grey500">We use this information to meet verification requirements and keep your account secure.</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={createWallet}
              disabled={!requiredFieldsComplete}
              className="h-14 w-full rounded-xl bg-brand-blue500 text-base font-bold text-white transition-colors hover:bg-brand-navy disabled:cursor-not-allowed disabled:bg-brand-grey300"
            >
              Create Naira Wallet
            </button>
          </div>
        </PageTransition>
      </MobileLayout>
    );
  }

  if (step === "topup-success") {
    return (
      <MobileLayout hideNav>
        <PageTransition>
          <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <CheckCircle className="w-20 h-20 text-success mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Top-up Successful!</h2>
            <p className="text-muted-foreground text-center mb-2">₦{Number(topupAmount).toLocaleString()} added to your Naira Wallet</p>
            <p className="text-sm text-muted-foreground mb-8">Funded from {selectedBank.name}</p>
            <button onClick={() => { setStep("home"); setTopupAmount(""); }} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold mb-3">View Wallet</button>
            <button onClick={() => navigate("/dashboard")} className="w-full h-12 bg-secondary rounded-xl text-foreground font-semibold">Back to Home</button>
          </div>
        </PageTransition>
      </MobileLayout>
    );
  }

  if (step === "topup-review") {
    return (
      <MobileLayout hideNav>
        <PageTransition>
          <div className="px-4 pt-4">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={goBack} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <h2 className="text-lg font-bold text-foreground">Confirm Top-up</h2>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 space-y-4 mb-6">
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Amount</span><span className="text-sm font-bold text-foreground">₦{Number(topupAmount).toLocaleString()}</span></div>
              <div className="h-px bg-border" />
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Source</span><span className="text-sm text-foreground">{selectedBank.name} ({selectedBank.account})</span></div>
              <div className="h-px bg-border" />
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Destination</span><span className="text-sm text-foreground">Naira Wallet</span></div>
              <div className="h-px bg-border" />
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Current Balance</span><span className="text-sm text-foreground">₦{formattedBalance}</span></div>
              <div className="h-px bg-border" />
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">New Balance</span><span className="text-sm font-bold text-success">₦{(nairaWalletBalance + Number(topupAmount)).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></div>
            </div>
            <button onClick={() => setStep("topup-success")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">Confirm Top-up</button>
          </div>
        </PageTransition>
      </MobileLayout>
    );
  }

  if (step === "topup-amount") {
    return (
      <MobileLayout hideNav>
        <PageTransition>
          <div className="px-4 pt-4">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={goBack} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <h2 className="text-lg font-bold text-foreground">Top-up Amount</h2>
            </div>

            <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{selectedBank.name}</p>
                <p className="text-xs text-muted-foreground">{selectedBank.account}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">Enter amount to top up</p>
            <div className="relative mb-4">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted-foreground font-medium">₦</span>
              <input type="number" value={topupAmount} onChange={(e) => setTopupAmount(e.target.value)} placeholder="0.00"
                className="w-full h-16 bg-secondary rounded-xl pl-10 pr-16 text-2xl text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary text-center" />
            </div>

            <div className="grid grid-cols-4 gap-2 mb-8">
              {[1000, 2000, 5000, 10000].map((amt) => (
                <button key={amt} onClick={() => setTopupAmount(String(amt))}
                  className="bg-secondary rounded-xl py-3 text-sm text-foreground font-medium">
                  ₦{(amt / 1000)}k
                </button>
              ))}
            </div>

            <button onClick={() => topupAmount && Number(topupAmount) > 0 && setStep("topup-review")}
              className={`w-full h-12 rounded-xl font-semibold ${topupAmount && Number(topupAmount) > 0 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              Continue
            </button>
          </div>
        </PageTransition>
      </MobileLayout>
    );
  }

  if (step === "topup-method") {
    return (
      <MobileLayout hideNav>
        <PageTransition>
          <div className="px-4 pt-4">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={goBack} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>
              <h2 className="text-lg font-bold text-foreground">Top up Naira Wallet</h2>
            </div>

            <button
              onClick={() => navigate("/deposit-cash")}
              className="w-full flex items-center justify-between bg-primary/10 border border-primary/20 rounded-xl px-4 py-4 mb-5"
            >
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">Deposit cash</p>
                <p className="text-xs text-muted-foreground">Transfer to your dedicated DeeX account number</p>
              </div>
              <ChevronRight className="w-4 h-4 text-primary" />
            </button>

            <p className="text-sm text-muted-foreground mb-4">Or select a bank account to fund from</p>

            <div className="space-y-2">
              {nairaBanks.map((bank) => (
                <button key={bank.name} onClick={() => { setSelectedBank(bank); setStep("topup-amount"); }}
                  className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-4">
                  <div className="flex items-center gap-3">
                    <ProviderIcon name={bank.name} size="md" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">{bank.name}</p>
                      <p className="text-xs text-muted-foreground">{bank.account}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        </PageTransition>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <PageTransition>
        <div className="px-4 pt-4 pb-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Naira Wallet</h2>

          <div className="bg-gradient-to-br from-primary/20 to-success/10 rounded-2xl p-5 mb-6 border border-border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">Available Balance</span>
              <button onClick={() => setShowBalance(!showBalance)}>
                {showBalance ? <Eye className="w-4 h-4 text-muted-foreground" /> : <EyeOff className="w-4 h-4 text-muted-foreground" />}
              </button>
            </div>
            <p className="text-3xl font-bold text-foreground">{showBalance ? `₦${formattedBalance}` : "••••••"}</p>
            <p className="text-xs text-muted-foreground mt-1">DeeX Naira Wallet</p>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <button onClick={() => setStep("topup-method")} className="bg-primary/20 rounded-xl py-2.5 flex items-center justify-center gap-2">
                <ArrowDownLeft className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Top Up</span>
              </button>
              <button onClick={() => navigate("/bills/airtime")} className="bg-success/20 rounded-xl py-2.5 flex items-center justify-center gap-2">
                <ArrowUpRight className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-success">Pay Bills</span>
              </button>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Airtime", path: "/bills/airtime", icon: "📱" },
                { label: "Data", path: "/bills/data", icon: "📶" },
                { label: "Electricity", path: "/bills/electricity", icon: "⚡" },
                { label: "Betting", path: "/bills/betting", icon: "🎮" },
              ].map((b) => (
                <button key={b.label} onClick={() => navigate(b.path)} className="bg-secondary rounded-xl py-3 flex flex-col items-center gap-1.5">
                  <span className="text-lg">{b.icon}</span>
                  <span className="text-[10px] text-muted-foreground">{b.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Recent Transactions</h3>
              <button onClick={() => navigate("/activity")} className="text-xs text-primary">See all</button>
            </div>
            <div className="space-y-2">
              {nairaWalletTransactions.slice(0, 5).map((tx) => (
                <button key={tx.id} className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${tx.type === "topup" ? "bg-success/15" : "bg-warning/15"}`}>
                      {tx.type === "topup" ? <ArrowDownLeft className="w-4 h-4 text-success" /> : <ArrowUpRight className="w-4 h-4 text-warning" />}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">{tx.label}</p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${tx.amount > 0 ? "text-success" : "text-foreground"}`}>
                      {tx.amount > 0 ? "+" : ""}₦{Math.abs(tx.amount).toLocaleString()}
                    </p>
                    <p className={`text-xs ${tx.status === "Completed" ? "text-success" : "text-warning"}`}>{tx.status}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </PageTransition>
      <BottomNav />
    </MobileLayout>
  );
};

export default NairaWallet;

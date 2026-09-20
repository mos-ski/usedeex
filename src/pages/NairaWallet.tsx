import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowDownLeft, ArrowUpRight, ChevronRight, CheckCircle, Wallet } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import ProviderIcon from "@/components/ProviderIcon";
import { nairaWalletBalance, nairaWalletTransactions, nairaBanks } from "@/data/nairaWalletData";
import { toast } from "sonner";
import createWalletArrow from "@/assets/naira-wallet-create/arrow-left.svg";
import walletArrowDark from "@/assets/naira-wallet-create/arrow-left-dark.svg";
import { ActionTile, AppShell, SectionCard, SectionHeader } from "@/components/dashboard/AppShell";
import { PhoneCallIcon, PlusIcon, SendIcon } from "@/components/dashboard/icons";
import AssetMark from "@/components/dashboard/AssetMark";
import { cn } from "@/lib/utils";

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
  const [selectedBank, setSelectedBank] = useState(nairaBanks[0]);
  const [topupAmount, setTopupAmount] = useState("");
  const [requirements, setRequirements] = useState<Record<string, string>>({});

  const formattedBalance = nairaWalletBalance.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const [balanceLead, balanceCents] = formattedBalance.split(".");
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
      <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
        <PageTransition>
          <div className="flex min-h-[100dvh] flex-col bg-white font-roboto text-brand-grey900">
            <header className="shrink-0 bg-brand-deepNavy text-white">
              <div className="flex flex-col gap-3 px-6 py-[18px]">
                <button type="button" onClick={goBack} className="flex w-fit items-center gap-2.5" aria-label="Back from Create Naira Wallet">
                  <img src={createWalletArrow} alt="" className="size-6" />
                  <span className="text-[10px] font-semibold leading-[1.4]">Create Naira Wallet</span>
                </button>
                <h1 className="text-[19px] font-bold leading-[1.4]">Complete your profile</h1>
                <p className="max-w-[327px] text-sm leading-6 text-white/75">Add the details below so we can create your secure Naira Wallet.</p>
              </div>
            </header>

            <main className="flex flex-1 flex-col gap-3 px-4 py-3">
              {oldUserNairaWalletRequirements.map((field) => (
                <label key={field.key} className="flex min-h-[65px] flex-col gap-1 border-b border-brand-grey100 p-3">
                  <span className="text-xs font-normal leading-[1.3] text-brand-bodyText">{field.label}</span>
                  {field.type === "select" ? (
                    <select
                      aria-label={field.label}
                      value={requirements[field.key] || ""}
                      onChange={(event) => updateRequirement(field.key, event.target.value)}
                      className={`w-full appearance-none bg-transparent p-0 text-[15px] font-normal leading-[1.4] outline-none ${requirements[field.key] ? "text-brand-grey900" : "text-[#c9c9c9]"}`}
                    >
                      <option value="">Select</option>
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
                      aria-label={field.label}
                      className="w-full bg-transparent p-0 text-[15px] font-normal leading-[1.4] text-brand-grey900 outline-none placeholder:text-[#c9c9c9]"
                    />
                  )}
                </label>
              ))}

              <div className="rounded bg-[#fbf7f2] px-2 py-0.5 font-manrope text-[11px] leading-[1.6] text-brand-amberBrown">
                <p className="font-semibold">Your details are protected</p>
                <p>We use this information to meet verification requirements and keep your account secure.</p>
              </div>

              <div className="flex-1" />

              <button
                type="button"
                onClick={createWallet}
                disabled={!requiredFieldsComplete}
                className="mb-[42px] h-12 w-full rounded-lg bg-brand-blue500 px-4 py-[11px] font-manrope text-base font-medium leading-[1.6] text-brand-grey50 transition-opacity disabled:opacity-50"
              >
                Create Naira Wallet
              </button>
            </main>
          </div>
        </PageTransition>
      </AppShell>
    );
  }

  if (step === "topup-success") {
    return (
      <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
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
      </AppShell>
    );
  }

  if (step === "topup-review") {
    return (
      <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
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
      </AppShell>
    );
  }

  if (step === "topup-amount") {
    return (
      <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
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
      </AppShell>
    );
  }

  if (step === "topup-method") {
    return (
      <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
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
      </AppShell>
    );
  }

  return (
    <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <div className="min-h-[100dvh] bg-brand-canvas font-roboto text-brand-grey900">
          <header className="bg-brand-canvas">
            <div className="relative flex h-14 items-center px-4">
              <button type="button" onClick={goBack} aria-label="Go back" className="flex size-11 items-center justify-start p-2.5">
                <img src={walletArrowDark} alt="" className="size-6" />
              </button>
              <h1 className="pointer-events-none absolute inset-x-0 text-center text-[19px] font-bold leading-[1.4]">NGN</h1>
            </div>
          </header>

          <main className="flex flex-col gap-3">
            <SectionCard className="flex flex-col items-center gap-1 px-4 py-[18px]">
              <p className="text-[10px] uppercase leading-[1.6] text-brand-grey600">Your Balance</p>
              <p className="whitespace-nowrap font-gasoek leading-[1.4] text-brand-grey900">
                <span className="text-[33px]">₦{balanceLead}.</span>
                <span className="text-[17px]">{balanceCents}</span>
              </p>
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase leading-[1.6] text-brand-amberBrown">
                <span>₦22.43 today</span><span>•</span>
                <button type="button" onClick={() => navigate("/activity")}>See rates</button>
              </div>
            </SectionCard>

            <SectionCard className="px-4 py-3">
              <SectionHeader title="Quick Actions" />
              <div className="grid grid-cols-3 gap-1">
                {[
                  { label: "Bills", Icon: PhoneCallIcon, onClick: () => navigate("/bills/airtime") },
                  { label: "Withdraw", Icon: SendIcon, onClick: () => navigate("/send-money") },
                  { label: "Deposit", Icon: PlusIcon, onClick: () => setStep("topup-method") },
                ].map((action) => (
                  <ActionTile key={action.label} label={action.label} Icon={action.Icon} onClick={action.onClick} />
                ))}
              </div>
            </SectionCard>

            <SectionCard className="px-4 py-3">
              <SectionHeader title="Transactions" onAction={() => navigate("/activity")} />
              <div className="flex flex-col">
                {nairaWalletTransactions.slice(0, 3).map((tx, index) => (
                  <button
                    key={tx.id}
                    type="button"
                    onClick={() => navigate("/transaction-detail", { state: { ...tx, symbol: "NGN" } })}
                    className={cn(
                      "flex items-center gap-3 py-3 text-left transition-colors hover:bg-brand-grey50",
                      index < 2 && "border-b border-brand-hairline",
                    )}
                  >
                    <AssetMark symbol="NGN" className="size-6 lg:size-8" />
                    <span className="flex min-w-0 flex-1 items-start justify-between gap-3">
                      <span className="flex min-w-0 flex-col">
                        <span className="truncate text-xs font-semibold leading-[1.6] text-brand-grey900 lg:text-sm">NGN {tx.type === "topup" ? "Deposit" : "Withdraw"}</span>
                        <span className="flex items-center gap-2 text-[11px] leading-[1.6] text-brand-grey500">
                          <span>{tx.date.split(",")[0]}</span><span className="size-[3px] rounded-full bg-brand-grey300" />
                          <span className={tx.status === "Completed" ? "font-medium text-brand-success300" : "font-medium text-brand-warning400"}>{tx.status === "Completed" ? "Success" : tx.status}</span>
                        </span>
                      </span>
                      <span className="whitespace-nowrap text-xs font-semibold leading-[1.6] text-brand-grey900 lg:text-sm">₦{Math.abs(tx.amount).toLocaleString("en-NG")}</span>
                    </span>
                  </button>
                ))}
              </div>
            </SectionCard>
          </main>
        </div>
      </PageTransition>
    </AppShell>
  );
};

export default NairaWallet;

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, Wallet } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import ProviderIcon from "@/components/ProviderIcon";
import { nairaWalletBalance } from "@/data/nairaWalletData";

const billConfigs: Record<string, { title: string; providers: string[]; fields: { label: string; placeholder: string; key: string }[]; hasPlans?: boolean; plans?: string[]; beneficiaryLabel: string }> = {
  airtime: {
    title: "Buy Airtime",
    providers: ["MTN", "Glo", "Airtel", "9mobile"],
    fields: [
      { label: "Phone Number", placeholder: "Enter phone number", key: "phone" },
      { label: "Amount (₦)", placeholder: "Enter amount", key: "amount" },
    ],
    beneficiaryLabel: "Recent Numbers",
  },
  data: {
    title: "Buy Data",
    providers: ["MTN", "Glo", "Airtel", "9mobile"],
    hasPlans: true,
    plans: ["1GB - ₦500", "2GB - ₦1,000", "5GB - ₦2,000", "10GB - ₦3,500"],
    fields: [{ label: "Phone Number", placeholder: "Enter phone number", key: "phone" }],
    beneficiaryLabel: "Recent Numbers",
  },
  electricity: {
    title: "Pay Electricity",
    providers: ["IKEDC", "EKEDC", "AEDC", "PHED", "BEDC"],
    fields: [
      { label: "Meter Number", placeholder: "Enter meter number", key: "meter" },
      { label: "Amount (₦)", placeholder: "Enter amount", key: "amount" },
    ],
    beneficiaryLabel: "Recent Meters",
  },
  betting: {
    title: "Fund Betting",
    providers: ["Bet9ja", "SportyBet", "1xBet", "BetKing", "MSport"],
    fields: [
      { label: "User ID", placeholder: "Enter user ID", key: "userId" },
      { label: "Amount (₦)", placeholder: "Enter amount", key: "amount" },
    ],
    beneficiaryLabel: "Recent IDs",
  },
};

const beneficiaryData: Record<string, { id: string; label: string; sub: string }[]> = {
  airtime: [
    { id: "08103674006", label: "08103674006", sub: "MTN • Self" },
    { id: "09012345678", label: "09012345678", sub: "Glo • Mum" },
    { id: "07098765432", label: "07098765432", sub: "Airtel • Bro" },
  ],
  data: [
    { id: "08103674006", label: "08103674006", sub: "MTN • Self" },
    { id: "09012345678", label: "09012345678", sub: "Glo • Mum" },
  ],
  electricity: [
    { id: "45123456789", label: "4512345****", sub: "IKEDC • Home" },
    { id: "62987654321", label: "6298765****", sub: "EKEDC • Office" },
  ],
  betting: [
    { id: "BET9JA_1234", label: "BET9JA_1234", sub: "Bet9ja" },
    { id: "SPORTY_5678", label: "SPORTY_5678", sub: "SportyBet" },
  ],
};

type PaymentMethod = "naira-wallet";
type Step = "provider" | "form" | "payment" | "review" | "success";

const BillPayment = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const config = billConfigs[type || "airtime"];
  const beneficiaries = beneficiaryData[type || "airtime"] || [];
  const [step, setStep] = useState<Step>("provider");
  const [provider, setProvider] = useState("");
  const [plan, setPlan] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("naira-wallet");

  const walletBalance = nairaWalletBalance;
  const billAmount = formData.amount ? Number(formData.amount) : 0;
  const insufficientFunds = billAmount > walletBalance;

  const goBack = () => {
    const flow: Step[] = ["provider", "form", "payment", "review", "success"];
    const idx = flow.indexOf(step);
    if (idx <= 0) navigate(-1);
    else setStep(flow[idx - 1]);
  };

  const handleBeneficiarySelect = (id: string) => {
    const firstKey = config.fields[0]?.key;
    if (firstKey) setFormData({ ...formData, [firstKey]: id });
  };

  if (step === "success") {
    const receiptState = {
      type: type,
      data: { service: config.title, provider, plan, ...formData, status: "Completed", date: new Date().toLocaleString(), paymentMethod: "Naira Wallet" }
    };
    return (
      <MobileLayout hideNav>
        <PageTransition>
          <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <CheckCircle className="w-20 h-20 text-success mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground text-center mb-4">{config.title} - {provider}</p>
            {plan && <p className="text-sm text-foreground mb-2">{plan}</p>}
            {formData.amount && <p className="text-lg font-bold text-success mb-4">₦{Number(formData.amount).toLocaleString()}</p>}
            <div className="bg-card border border-border rounded-xl px-5 py-3 mb-6 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">Paid from Naira Wallet</span>
            </div>
            <button onClick={() => navigate("/receipt", { state: receiptState })} className="w-full h-12 bg-secondary rounded-xl text-foreground font-semibold mb-3">View Receipt</button>
            <button onClick={() => navigate("/dashboard")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">Back to Home</button>
          </div>
        </PageTransition>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout hideNav>
      <PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={goBack} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h2 className="text-lg font-bold text-foreground">{config.title}</h2>
          </div>

          {step === "provider" && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">Select provider</p>
              <div className="grid grid-cols-2 gap-3">
                {config.providers.map((p) => (
                  <button key={p} onClick={() => { setProvider(p); setStep("form"); }}
                    className="bg-secondary rounded-xl py-4 px-4 flex items-center gap-3">
                    <ProviderIcon name={p} size="md" />
                    <span className="text-sm font-medium text-foreground">{p}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "form" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ProviderIcon name={provider} size="sm" />
                <p className="text-sm text-muted-foreground">{provider}</p>
              </div>

              {beneficiaries.length > 0 && (
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">{config.beneficiaryLabel}</label>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {beneficiaries.map((b) => (
                      <button key={b.id} onClick={() => handleBeneficiarySelect(b.id)}
                        className={`shrink-0 bg-card border rounded-xl px-3 py-2 text-left ${formData[config.fields[0]?.key] === b.id ? "border-primary" : "border-border"}`}>
                        <p className="text-xs font-medium text-foreground">{b.label}</p>
                        <p className="text-[10px] text-muted-foreground">{b.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {config.hasPlans && (
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">Select Plan</label>
                  <div className="space-y-2">
                    {config.plans?.map((p) => (
                      <button key={p} onClick={() => setPlan(p)} className={`w-full text-left px-4 py-3 rounded-xl text-sm ${plan === p ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {config.fields.map((f) => (
                <div key={f.key}>
                  <label className="text-xs text-muted-foreground mb-2 block">{f.label}</label>
                  <input value={formData[f.key] || ""} onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })} placeholder={f.placeholder}
                    className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary" />
                </div>
              ))}
              <button onClick={() => setStep("payment")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">Continue</button>
            </div>
          )}

          {step === "payment" && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">Select payment method</p>

              <button onClick={() => setPaymentMethod("naira-wallet")}
                className={`w-full flex items-center gap-4 rounded-xl p-4 border-2 mb-3 ${paymentMethod === "naira-wallet" ? "border-primary bg-primary/5" : "border-border bg-secondary"}`}>
                <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-semibold text-foreground">Naira Wallet</p>
                  <p className="text-xs text-muted-foreground">Balance: ₦{walletBalance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === "naira-wallet" ? "border-primary bg-primary" : "border-muted-foreground"}`}>
                  {paymentMethod === "naira-wallet" && <div className="w-full h-full flex items-center justify-center"><CheckCircle className="w-3 h-3 text-primary-foreground" /></div>}
                </div>
              </button>

              {insufficientFunds && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 mb-4">
                  <p className="text-xs text-destructive">Insufficient balance. You need ₦{(billAmount - walletBalance).toLocaleString()} more.</p>
                  <button onClick={() => navigate("/naira-wallet")} className="text-xs text-primary font-medium mt-1">Top up your wallet →</button>
                </div>
              )}

              <button
                onClick={() => !insufficientFunds && setStep("review")}
                className={`w-full h-12 rounded-xl font-semibold ${!insufficientFunds ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                Continue
              </button>
            </div>
          )}

          {step === "review" && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">Confirm payment</p>
              <div className="bg-secondary rounded-xl p-4 space-y-3 mb-4">
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Service</span><span className="text-sm text-foreground">{config.title}</span></div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Provider</span>
                  <div className="flex items-center gap-2">
                    <ProviderIcon name={provider} size="sm" />
                    <span className="text-sm text-foreground">{provider}</span>
                  </div>
                </div>
                {plan && <div className="flex justify-between"><span className="text-sm text-muted-foreground">Plan</span><span className="text-sm text-foreground">{plan}</span></div>}
                {Object.entries(formData).map(([k, v]) => (
                  <div key={k} className="flex justify-between"><span className="text-sm text-muted-foreground capitalize">{k}</span><span className="text-sm text-foreground">{v}</span></div>
                ))}
              </div>

              <div className="bg-card border border-primary/30 rounded-xl p-4 space-y-3 mb-6">
                <p className="text-xs text-muted-foreground font-medium">Payment Method</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Naira Wallet</p>
                    <p className="text-xs text-muted-foreground">Balance: ₦{walletBalance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}</p>
                  </div>
                </div>
                {formData.amount && (
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="text-sm text-muted-foreground">Amount</span>
                    <span className="text-sm font-bold text-foreground">₦{Number(formData.amount).toLocaleString()}</span>
                  </div>
                )}
                {formData.amount && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Remaining after payment</span>
                    <span className="text-sm text-success">₦{(walletBalance - Number(formData.amount)).toLocaleString("en-NG", { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
              </div>

              <button onClick={() => setStep("success")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">Pay ₦{formData.amount ? Number(formData.amount).toLocaleString() : "0"}</button>
            </div>
          )}
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default BillPayment;
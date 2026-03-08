import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, Clock as ClockIcon } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";

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
    fields: [
      { label: "Phone Number", placeholder: "Enter phone number", key: "phone" },
    ],
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

type Step = "provider" | "form" | "review" | "success";

const BillPayment = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const config = billConfigs[type || "airtime"];
  const beneficiaries = beneficiaryData[type || "airtime"] || [];
  const [step, setStep] = useState<Step>("provider");
  const [provider, setProvider] = useState("");
  const [plan, setPlan] = useState("");
  const [formData, setFormData] = useState<Record<string, string>>({});

  const goBack = () => {
    const flow: Step[] = ["provider", "form", "review", "success"];
    const idx = flow.indexOf(step);
    if (idx <= 0) navigate(-1);
    else setStep(flow[idx - 1]);
  };

  const handleBeneficiarySelect = (id: string) => {
    const firstKey = config.fields[0]?.key;
    if (firstKey) {
      setFormData({ ...formData, [firstKey]: id });
    }
  };

  if (step === "success") {
    const receiptState = {
      type: type,
      data: {
        service: config.title,
        provider,
        plan,
        ...formData,
        status: "Completed",
        date: new Date().toLocaleString(),
      }
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
                  <button key={p} onClick={() => { setProvider(p); setStep("form"); }} className="bg-secondary rounded-xl py-4 px-4 text-sm font-medium text-foreground">
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "form" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">{provider}</p>

              {/* Beneficiaries / History */}
              {beneficiaries.length > 0 && (
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">{config.beneficiaryLabel}</label>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {beneficiaries.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => handleBeneficiarySelect(b.id)}
                        className={`shrink-0 bg-card border rounded-xl px-3 py-2 text-left ${formData[config.fields[0]?.key] === b.id ? "border-primary" : "border-border"}`}
                      >
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
                  <input
                    value={formData[f.key] || ""}
                    onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              ))}
              <button onClick={() => setStep("review")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">Continue</button>
            </div>
          )}

          {step === "review" && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">Confirm payment</p>
              <div className="bg-secondary rounded-xl p-4 space-y-3 mb-6">
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Service</span><span className="text-sm text-foreground">{config.title}</span></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Provider</span><span className="text-sm text-foreground">{provider}</span></div>
                {plan && <div className="flex justify-between"><span className="text-sm text-muted-foreground">Plan</span><span className="text-sm text-foreground">{plan}</span></div>}
                {Object.entries(formData).map(([k, v]) => (
                  <div key={k} className="flex justify-between"><span className="text-sm text-muted-foreground capitalize">{k}</span><span className="text-sm text-foreground">{v}</span></div>
                ))}
              </div>
              <button onClick={() => setStep("success")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">Pay Now</button>
            </div>
          )}
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default BillPayment;

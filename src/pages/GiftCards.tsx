import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, CheckCircle, Clock, Bell } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import ProviderIcon from "@/components/ProviderIcon";

const brands = [
  { name: "Apple", rate: 1450 },
  { name: "Google Play", rate: 1400 },
  { name: "Amazon", rate: 1380 },
  { name: "Steam", rate: 1350 },
  { name: "iTunes", rate: 1420 },
  { name: "Walmart", rate: 1300 },
  { name: "Nike", rate: 1250 },
  { name: "Sephora", rate: 1200 },
];

const countries = ["USA", "UK", "Canada", "EU"];
const cardTypes = ["Physical Card", "E-Code"];
type Step = "brand" | "type" | "value" | "upload" | "review" | "status";

const GiftCards = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("brand");
  const [brand, setBrand] = useState("");
  const [country, setCountry] = useState("USA");
  const [cardType, setCardType] = useState("Physical Card");
  const [value, setValue] = useState("");
  const [uploaded, setUploaded] = useState(false);

  const selectedBrand = brands.find(b => b.name === brand);
  const rate = selectedBrand?.rate || 1450;
  const payout = value ? (parseFloat(value) * rate).toLocaleString() : "0";

  const goBack = () => {
    const flow: Step[] = ["brand", "type", "value", "upload", "review", "status"];
    const idx = flow.indexOf(step);
    if (idx <= 0) navigate(-1);
    else setStep(flow[idx - 1]);
  };

  if (step === "status") {
    return (
      <MobileLayout hideNav>
        <PageTransition>
          <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <div className="relative mb-6">
              <Clock className="w-20 h-20 text-warning" />
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Bell className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Trade Submitted!</h2>
            <p className="text-muted-foreground text-center mb-4">{brand} Gift Card - ${value}</p>
            
            <div className="w-full bg-card border border-border rounded-xl p-4 mb-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Brand</span>
                <div className="flex items-center gap-2"><ProviderIcon name={brand} size="sm" /><span className="text-sm text-foreground">{brand}</span></div>
              </div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Value</span><span className="text-sm text-foreground">${value}</span></div>
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Rate</span><span className="text-sm text-foreground">₦{rate}/$</span></div>
              <div className="h-px bg-border" />
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Payout</span><span className="text-sm font-bold text-success">₦{payout}</span></div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary font-medium">Notified Admin</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center mb-6">Admin has been notified and will review your card. Processing usually takes 5-15 minutes.</p>
            <button onClick={() => navigate("/receipt", { state: { type: "giftcard", data: { brand, amount: `$${value}`, payout: `₦${payout}`, status: "Pending" } } })}
              className="w-full h-12 bg-secondary rounded-xl text-foreground font-semibold mb-3">View Receipt</button>
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
            <h2 className="text-lg font-bold text-foreground">Sell Gift Card</h2>
          </div>

          {step === "brand" && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">Select gift card brand</p>
              <div className="grid grid-cols-2 gap-3">
                {brands.map((b) => (
                  <button key={b.name} onClick={() => { setBrand(b.name); setStep("type"); }}
                    className="bg-secondary rounded-xl p-4 flex items-center gap-3">
                    <ProviderIcon name={b.name} size="md" />
                    <div className="text-left">
                      <span className="text-sm font-medium text-foreground block">{b.name}</span>
                      <span className="text-[10px] text-muted-foreground">₦{b.rate}/$</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "type" && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <ProviderIcon name={brand} size="md" />
                <p className="text-sm text-muted-foreground">{brand} - Select card details</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">Country</label>
                  <div className="flex gap-2 flex-wrap">
                    {countries.map((c) => (
                      <button key={c} onClick={() => setCountry(c)} className={`px-4 py-2 rounded-full text-sm ${country === c ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>{c}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">Card Type</label>
                  <div className="flex gap-2">
                    {cardTypes.map((t) => (
                      <button key={t} onClick={() => setCardType(t)} className={`px-4 py-2 rounded-full text-sm ${cardType === t ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>{t}</button>
                    ))}
                  </div>
                </div>
                <button onClick={() => setStep("value")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold mt-4">Continue</button>
              </div>
            </div>
          )}

          {step === "value" && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">Enter card value (USD)</p>
              <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="0"
                className="w-full h-14 bg-secondary rounded-xl px-4 text-2xl text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary text-center mb-2" />
              <p className="text-center text-sm text-muted-foreground mb-1">Rate: ₦{rate}/$</p>
              <p className="text-center text-sm text-success mb-6">You'll receive: ₦{payout}</p>
              <button onClick={() => setStep("upload")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">Continue</button>
            </div>
          )}

          {step === "upload" && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">Upload card image or enter code</p>
              <button onClick={() => setUploaded(true)} className="w-full h-40 bg-secondary rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 mb-4">
                {uploaded ? (
                  <><CheckCircle className="w-10 h-10 text-success" /><span className="text-sm text-success">Image uploaded</span></>
                ) : (
                  <><Upload className="w-10 h-10 text-muted-foreground" /><span className="text-sm text-muted-foreground">Tap to upload card image</span></>
                )}
              </button>
              <input placeholder="Or enter gift card code" className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary mb-4" />
              <button onClick={() => setStep("review")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">Continue</button>
            </div>
          )}

          {step === "review" && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">Review your trade</p>
              <div className="bg-secondary rounded-xl p-4 space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Brand</span>
                  <div className="flex items-center gap-2"><ProviderIcon name={brand} size="sm" /><span className="text-sm text-foreground">{brand}</span></div>
                </div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Country</span><span className="text-sm text-foreground">{country}</span></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Type</span><span className="text-sm text-foreground">{cardType}</span></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Value</span><span className="text-sm text-foreground">${value}</span></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Rate</span><span className="text-sm text-foreground">₦{rate}/$</span></div>
                <div className="h-px bg-border" />
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Payout</span><span className="text-sm font-bold text-success">₦{payout}</span></div>
              </div>
              <button onClick={() => setStep("status")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">Submit Trade</button>
            </div>
          )}
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default GiftCards;

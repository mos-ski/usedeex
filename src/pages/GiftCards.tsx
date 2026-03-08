import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, CheckCircle, Clock } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";

const brands = [
  { name: "Apple", emoji: "🍎" },
  { name: "Google Play", emoji: "▶️" },
  { name: "Amazon", emoji: "📦" },
  { name: "Steam", emoji: "🎮" },
  { name: "iTunes", emoji: "🎵" },
  { name: "Walmart", emoji: "🛒" },
  { name: "Nike", emoji: "👟" },
  { name: "Sephora", emoji: "💄" },
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

  const rate = 1450;
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
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <Clock className="w-20 h-20 text-warning mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Trade Submitted!</h2>
          <p className="text-muted-foreground text-center mb-2">{brand} Gift Card - ${value}</p>
          <p className="text-sm text-muted-foreground mb-1">Estimated payout</p>
          <p className="text-lg font-semibold text-success mb-2">₦{payout}</p>
          <p className="text-xs text-warning mb-8">Processing... Usually takes 5-15 minutes</p>
          <button onClick={() => navigate("/dashboard")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">Back to Home</button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout hideNav>
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
                <button key={b.name} onClick={() => { setBrand(b.name); setStep("type"); }} className="bg-secondary rounded-xl p-4 flex items-center gap-3">
                  <span className="text-2xl">{b.emoji}</span>
                  <span className="text-sm font-medium text-foreground">{b.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "type" && (
          <div>
            <p className="text-sm text-muted-foreground mb-4">{brand} - Select card details</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Country</label>
                <div className="flex gap-2 flex-wrap">
                  {countries.map((c) => (
                    <button key={c} onClick={() => setCountry(c)} className={`px-4 py-2 rounded-full text-sm ${country === c ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Card Type</label>
                <div className="flex gap-2">
                  {cardTypes.map((t) => (
                    <button key={t} onClick={() => setCardType(t)} className={`px-4 py-2 rounded-full text-sm ${cardType === t ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                      {t}
                    </button>
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
            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="0" className="w-full h-14 bg-secondary rounded-xl px-4 text-2xl text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary text-center mb-2" />
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
                <>
                  <CheckCircle className="w-10 h-10 text-success" />
                  <span className="text-sm text-success">Image uploaded</span>
                </>
              ) : (
                <>
                  <Upload className="w-10 h-10 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Tap to upload card image</span>
                </>
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
              <div className="flex justify-between"><span className="text-sm text-muted-foreground">Brand</span><span className="text-sm text-foreground">{brand}</span></div>
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
    </MobileLayout>
  );
};

export default GiftCards;

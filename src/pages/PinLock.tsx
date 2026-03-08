import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fingerprint, Delete } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import NewBadge from "@/components/NewBadge";

const PinLock = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const correctPin = "1234";

  const handleKey = (key: string) => {
    if (pin.length >= 4) return;
    const newPin = pin + key;
    setPin(newPin);
    setError(false);
    if (newPin.length === 4) {
      if (newPin === correctPin) {
        setTimeout(() => navigate("/dashboard"), 200);
      } else {
        setTimeout(() => { setError(true); setPin(""); }, 300);
      }
    }
  };

  const handleDelete = () => { setPin(pin.slice(0, -1)); setError(false); };

  return (
    <MobileLayout hideNav>
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="mb-2"><NewBadge /></div>
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl mb-4">JD</div>
        <p className="text-foreground font-semibold mb-1">Welcome back, John</p>
        <p className="text-muted-foreground text-sm mb-8">Enter your PIN to continue</p>

        <div className="flex gap-4 mb-2">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`w-4 h-4 rounded-full transition-all ${i < pin.length ? (error ? "bg-destructive scale-110" : "bg-primary scale-110") : "bg-muted"}`} />
          ))}
        </div>
        {error && <p className="text-destructive text-xs mb-4">Incorrect PIN. Try again.</p>}
        {!error && <p className="text-muted-foreground text-xs mb-4">Default PIN: 1234</p>}

        <div className="grid grid-cols-3 gap-4 w-64">
          {["1","2","3","4","5","6","7","8","9"].map(k => (
            <button key={k} onClick={() => handleKey(k)} className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-xl font-semibold text-foreground active:scale-95 transition-transform">
              {k}
            </button>
          ))}
          <button className="w-16 h-16 rounded-2xl flex items-center justify-center text-primary">
            <Fingerprint className="w-7 h-7" />
          </button>
          <button onClick={() => handleKey("0")} className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-xl font-semibold text-foreground active:scale-95 transition-transform">0</button>
          <button onClick={handleDelete} className="w-16 h-16 rounded-2xl flex items-center justify-center text-muted-foreground">
            <Delete className="w-6 h-6" />
          </button>
        </div>

        <button onClick={() => navigate("/login")} className="text-primary text-sm mt-8">Switch Account</button>
      </div>
    </MobileLayout>
  );
};

export default PinLock;

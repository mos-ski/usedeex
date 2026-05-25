import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronDown, Shield, CheckCircle } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";

const banks = ["Select Bank", "GTBank", "First Bank", "UBA", "Access Bank", "Zenith Bank", "PalmPay", "Opay"];
const wallets = ["Select Wallet", "USDT Wallet", "USDC Wallet", "BTC Wallet"];

type Step = "form" | "review" | "success";

const SendMoney = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("form");
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedBank, setSelectedBank] = useState(banks[0]);
  const [accountName, setAccountName] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(wallets[0]);
  const [amount, setAmount] = useState("");
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);

  if (step === "success") {
    return (
      <MobileLayout hideNav>
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <CheckCircle className="w-20 h-20 text-success mb-6" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Transfer Successful!</h2>
          <p className="text-muted-foreground text-center mb-2">₦{Number(amount).toLocaleString()} sent to {accountName || accountNumber}</p>
          <button onClick={() => navigate("/dashboard")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold mt-8">
            Back to Home
          </button>
        </div>
      </MobileLayout>
    );
  }

  if (step === "review") {
    return (
      <MobileLayout hideNav>
        <div className="px-4 pt-4">
          <div className="flex items-center mb-6">
            <button onClick={() => setStep("form")} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h2 className="text-lg font-bold text-foreground w-full text-center">Confirm Transfer</h2>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 space-y-4 mb-6">
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Account</span><span className="text-sm text-foreground">{accountNumber}</span></div>
            <div className="h-px bg-border" />
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Bank</span><span className="text-sm text-foreground">{selectedBank}</span></div>
            <div className="h-px bg-border" />
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Name</span><span className="text-sm text-foreground">{accountName}</span></div>
            <div className="h-px bg-border" />
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Wallet</span><span className="text-sm text-foreground">{selectedWallet}</span></div>
            <div className="h-px bg-border" />
            <div className="flex justify-between"><span className="text-sm text-muted-foreground">Amount</span><span className="text-sm font-bold text-foreground">₦{Number(amount).toLocaleString()}</span></div>
          </div>
          <button onClick={() => setStep("success")} className="w-full h-14 bg-primary rounded-xl text-primary-foreground font-semibold flex items-center justify-center gap-2">
            Confirm <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout hideNav>
      <div className="px-4 pt-4 pb-8">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="text-lg font-bold text-foreground w-full text-center">Send Money</h2>
        </div>

        {/* Daily limit banner */}
        <div className="bg-foreground/10 border border-border rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-primary" />
            <p className="text-sm text-foreground">You can only send 50,000 daily</p>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div className="bg-primary h-1.5 rounded-full" style={{ width: "0%" }} />
          </div>
          <p className="text-xs text-muted-foreground text-right mt-1">0%</p>
        </div>

        {/* Account number */}
        <div className="mb-5">
          <label className="text-sm text-foreground mb-2 block">Account number</label>
          <input
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="10-digit account number"
            className="w-full h-14 bg-card border border-border rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Bank selector */}
        <div className="mb-5">
          <label className="text-sm text-foreground mb-2 block">Choose bank</label>
          <div className="relative">
            <button onClick={() => setShowBankDropdown(!showBankDropdown)} className="w-full h-14 bg-card border border-border rounded-xl px-4 flex items-center justify-between">
              <span className={`text-sm ${selectedBank === banks[0] ? "text-muted-foreground" : "text-foreground"}`}>{selectedBank}</span>
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </button>
            {showBankDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl overflow-hidden z-10 max-h-48 overflow-y-auto">
                {banks.slice(1).map((b) => (
                  <button key={b} onClick={() => { setSelectedBank(b); setShowBankDropdown(false); }}
                    className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors text-sm text-foreground">{b}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Account name */}
        <div className="mb-5">
          <label className="text-sm text-foreground mb-2 block">Account name</label>
          <input
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="Account name"
            className="w-full h-14 bg-secondary border border-border rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Wallet selector */}
        <div className="mb-5">
          <label className="text-sm text-foreground mb-2 block">Select wallet</label>
          <div className="relative">
            <button onClick={() => setShowWalletDropdown(!showWalletDropdown)} className="w-full h-14 bg-card border border-border rounded-xl px-4 flex items-center justify-between">
              <span className={`text-sm ${selectedWallet === wallets[0] ? "text-muted-foreground" : "text-foreground"}`}>{selectedWallet}</span>
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </button>
            {showWalletDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl overflow-hidden z-10">
                {wallets.slice(1).map((w) => (
                  <button key={w} onClick={() => { setSelectedWallet(w); setShowWalletDropdown(false); }}
                    className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors text-sm text-foreground">{w}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Amount */}
        <div className="mb-8">
          <label className="text-sm text-foreground mb-2 block">Amount</label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full h-14 bg-card border border-border rounded-xl px-4 pr-16 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-primary font-medium">NGN</span>
          </div>
        </div>

        <button
          onClick={() => accountNumber && amount && setStep("review")}
          className={`w-full h-14 rounded-xl font-semibold flex items-center justify-center gap-2 ${accountNumber && amount ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
        >
          Proceed <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </MobileLayout>
  );
};

export default SendMoney;

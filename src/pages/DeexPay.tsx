import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, ScanLine, Link2, Send, CreditCard, Copy, Check, ChevronDown } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";

const cryptos = [
  { symbol: "BTC", name: "Bitcoin", balance: "0.0234 BTC" },
  { symbol: "ETH", name: "Ethereum", balance: "0.15 ETH" },
  { symbol: "USDT", name: "Tether", balance: "5,420 USDT" },
  { symbol: "USDC", name: "USD Coin", balance: "2,100 USDC" },
];

const banks = ["GTBank", "First Bank", "UBA", "Access Bank", "Zenith Bank", "PalmPay", "Opay"];

type Mode = "home" | "generate-link" | "send-cash" | "pay-merchant";
type PayStep = "merchant" | "select" | "amount" | "review" | "success";
type SendStep = "form" | "review" | "success";
type LinkStep = "form" | "generated";

const DeexPay = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("home");

  // Pay merchant state
  const [payStep, setPayStep] = useState<PayStep>("merchant");
  const [merchantId, setMerchantId] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState(cryptos[2]);
  const [payAmount, setPayAmount] = useState("");

  // Send cash state
  const [sendStep, setSendStep] = useState<SendStep>("form");
  const [sendWallet, setSendWallet] = useState(cryptos[2]);
  const [sendBank, setSendBank] = useState("");
  const [sendAccount, setSendAccount] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [showBankDrop, setShowBankDrop] = useState(false);
  const dailyLimit = 100000;
  const dailyUsed = 35000;

  // Generate link state
  const [linkStep, setLinkStep] = useState<LinkStep>("form");
  const [linkAmount, setLinkAmount] = useState("");
  const [linkDescription, setLinkDescription] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const generatedLink = `https://deex.app/pay/lnk_${Date.now().toString(36)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const resetAll = () => {
    setMode("home");
    setPayStep("merchant");
    setSendStep("form");
    setLinkStep("form");
    setMerchantId("");
    setPayAmount("");
    setSendAmount("");
    setSendAccount("");
    setLinkAmount("");
    setLinkDescription("");
  };

  const goBack = () => {
    if (mode === "home") { navigate(-1); return; }
    if (mode === "pay-merchant") {
      const flow: PayStep[] = ["merchant", "select", "amount", "review", "success"];
      const idx = flow.indexOf(payStep);
      if (idx <= 0) { resetAll(); } else setPayStep(flow[idx - 1]);
      return;
    }
    if (mode === "send-cash") {
      if (sendStep === "form") resetAll();
      else setSendStep("form");
      return;
    }
    if (mode === "generate-link") {
      if (linkStep === "form") resetAll();
      else setLinkStep("form");
      return;
    }
  };

  // Success screens
  if (mode === "pay-merchant" && payStep === "success") {
    return (
      <MobileLayout hideNav>
        <PageTransition>
          <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <CheckCircle className="w-20 h-20 text-success mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Payment Sent!</h2>
            <p className="text-muted-foreground text-center mb-2">Paid {payAmount} {selectedCrypto.symbol} to</p>
            <p className="text-foreground font-medium mb-8">Merchant #{merchantId}</p>
            <button onClick={() => navigate("/dashboard")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">Back to Home</button>
          </div>
        </PageTransition>
      </MobileLayout>
    );
  }

  if (mode === "send-cash" && sendStep === "success") {
    return (
      <MobileLayout hideNav>
        <PageTransition>
          <div className="min-h-screen flex flex-col items-center justify-center px-6">
            <CheckCircle className="w-20 h-20 text-success mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Transfer Sent!</h2>
            <p className="text-muted-foreground text-center mb-2">₦{Number(sendAmount).toLocaleString()} sent to</p>
            <p className="text-foreground font-medium mb-2">{sendAccount} - {sendBank}</p>
            <p className="text-xs text-muted-foreground mb-8">Deducted from {sendWallet.symbol} wallet</p>
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
            <h2 className="text-lg font-bold text-foreground">DeeX Pay</h2>
          </div>

          {/* HOME */}
          {mode === "home" && (
            <div>
              <p className="text-sm text-muted-foreground mb-6">Pay merchants, send cash, or generate payment links</p>
              <div className="space-y-3">
                <button onClick={() => setMode("pay-merchant")} className="w-full flex items-center gap-4 bg-secondary rounded-xl px-4 py-4">
                  <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center"><ScanLine className="w-6 h-6 text-primary" /></div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-semibold text-foreground">Pay Merchant</p>
                    <p className="text-xs text-muted-foreground">Scan QR, enter ID or paste payment link</p>
                  </div>
                </button>
                <button onClick={() => setMode("send-cash")} className="w-full flex items-center gap-4 bg-secondary rounded-xl px-4 py-4">
                  <div className="w-12 h-12 rounded-full bg-success/15 flex items-center justify-center"><Send className="w-6 h-6 text-success" /></div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-semibold text-foreground">Send Cash to Bank</p>
                    <p className="text-xs text-muted-foreground">Send crypto as Naira to any bank • Up to ₦100k/day</p>
                  </div>
                </button>
                <button onClick={() => setMode("generate-link")} className="w-full flex items-center gap-4 bg-secondary rounded-xl px-4 py-4">
                  <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center"><Link2 className="w-6 h-6 text-accent" /></div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-semibold text-foreground">Generate Payment Link</p>
                    <p className="text-xs text-muted-foreground">Create a link to receive crypto payments</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* PAY MERCHANT */}
          {mode === "pay-merchant" && payStep === "merchant" && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">Enter merchant ID, scan QR, or paste payment link</p>
              <input value={merchantId} onChange={(e) => setMerchantId(e.target.value)} placeholder="Merchant ID or Payment Link"
                className="w-full h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary mb-3" />
              <button className="w-full h-12 bg-secondary rounded-xl text-foreground font-medium flex items-center justify-center gap-2 mb-4">
                <ScanLine className="w-5 h-5" /> Scan QR Code
              </button>
              <button onClick={() => merchantId && setPayStep("select")} className={`w-full h-12 rounded-xl font-semibold ${merchantId ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>Continue</button>
            </div>
          )}

          {mode === "pay-merchant" && payStep === "select" && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">Select crypto to pay with</p>
              <div className="space-y-2">
                {cryptos.map((c) => (
                  <button key={c.symbol} onClick={() => { setSelectedCrypto(c); setPayStep("amount"); }} className="w-full flex items-center justify-between bg-secondary rounded-xl px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">{c.symbol.substring(0, 2)}</div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.balance}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {mode === "pay-merchant" && payStep === "amount" && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">Enter amount in {selectedCrypto.symbol}</p>
              <input type="number" value={payAmount} onChange={(e) => setPayAmount(e.target.value)} placeholder="0.00"
                className="w-full h-14 bg-secondary rounded-xl px-4 text-2xl text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary text-center mb-6" />
              <button onClick={() => payAmount && setPayStep("review")} className={`w-full h-12 rounded-xl font-semibold ${payAmount ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>Continue</button>
            </div>
          )}

          {mode === "pay-merchant" && payStep === "review" && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">Confirm payment</p>
              <div className="bg-secondary rounded-xl p-4 space-y-3 mb-6">
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Merchant</span><span className="text-sm text-foreground">#{merchantId}</span></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Crypto</span><span className="text-sm text-foreground">{selectedCrypto.symbol}</span></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Amount</span><span className="text-sm text-foreground">{payAmount} {selectedCrypto.symbol}</span></div>
              </div>
              <button onClick={() => setPayStep("success")} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">Pay Now</button>
            </div>
          )}

          {/* SEND CASH TO BANK */}
          {mode === "send-cash" && sendStep === "form" && (
            <div>
              {/* Daily limit */}
              <div className="bg-foreground/5 border border-border rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-foreground">Daily limit: ₦{dailyLimit.toLocaleString()}</p>
                  <span className="text-xs text-warning">₦{dailyUsed.toLocaleString()} used</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: `${(dailyUsed / dailyLimit) * 100}%` }} />
                </div>
              </div>

              {/* Wallet */}
              <div className="mb-4">
                <label className="text-sm text-foreground mb-2 block">Pay from wallet</label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {cryptos.map((c) => (
                    <button key={c.symbol} onClick={() => setSendWallet(c)}
                      className={`shrink-0 px-4 py-2 rounded-full text-sm ${sendWallet.symbol === c.symbol ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                      {c.symbol}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bank */}
              <div className="mb-4 relative">
                <label className="text-sm text-foreground mb-2 block">Destination bank</label>
                <button onClick={() => setShowBankDrop(!showBankDrop)} className="w-full h-14 bg-card border border-border rounded-xl px-4 flex items-center justify-between">
                  <span className={`text-sm ${sendBank ? "text-foreground" : "text-muted-foreground"}`}>{sendBank || "Select bank"}</span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </button>
                {showBankDrop && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl overflow-hidden z-10 max-h-48 overflow-y-auto">
                    {banks.map((b) => (
                      <button key={b} onClick={() => { setSendBank(b); setShowBankDrop(false); }}
                        className="w-full px-4 py-3 text-left hover:bg-secondary text-sm text-foreground">{b}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* Account */}
              <div className="mb-4">
                <label className="text-sm text-foreground mb-2 block">Account number</label>
                <input value={sendAccount} onChange={(e) => setSendAccount(e.target.value)} placeholder="10-digit account number"
                  className="w-full h-14 bg-card border border-border rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary" />
              </div>

              {/* Amount */}
              <div className="mb-6">
                <label className="text-sm text-foreground mb-2 block">Amount (₦)</label>
                <input type="number" value={sendAmount} onChange={(e) => setSendAmount(e.target.value)} placeholder="0"
                  className="w-full h-14 bg-card border border-border rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary" />
                {sendAmount && Number(sendAmount) > (dailyLimit - dailyUsed) && (
                  <p className="text-xs text-destructive mt-1">Exceeds remaining daily limit (₦{(dailyLimit - dailyUsed).toLocaleString()})</p>
                )}
              </div>

              <button onClick={() => sendAccount && sendAmount && sendBank && setSendStep("review")}
                className={`w-full h-14 rounded-xl font-semibold ${sendAccount && sendAmount && sendBank ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                Continue
              </button>
            </div>
          )}

          {mode === "send-cash" && sendStep === "review" && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">Confirm transfer</p>
              <div className="bg-card border border-border rounded-xl p-5 space-y-3 mb-6">
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">From</span><span className="text-sm text-foreground">{sendWallet.symbol} Wallet</span></div>
                <div className="h-px bg-border" />
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Bank</span><span className="text-sm text-foreground">{sendBank}</span></div>
                <div className="h-px bg-border" />
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Account</span><span className="text-sm text-foreground">{sendAccount}</span></div>
                <div className="h-px bg-border" />
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Amount</span><span className="text-sm font-bold text-foreground">₦{Number(sendAmount).toLocaleString()}</span></div>
              </div>
              <button onClick={() => setSendStep("success")} className="w-full h-14 bg-primary rounded-xl text-primary-foreground font-semibold">Send Now</button>
            </div>
          )}

          {/* GENERATE PAYMENT LINK */}
          {mode === "generate-link" && linkStep === "form" && (
            <div>
              <p className="text-sm text-muted-foreground mb-4">Create a payment link to receive crypto</p>
              <div className="mb-4">
                <label className="text-sm text-foreground mb-2 block">Amount (USD)</label>
                <input type="number" value={linkAmount} onChange={(e) => setLinkAmount(e.target.value)} placeholder="0.00"
                  className="w-full h-14 bg-card border border-border rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="mb-6">
                <label className="text-sm text-foreground mb-2 block">Description (optional)</label>
                <input value={linkDescription} onChange={(e) => setLinkDescription(e.target.value)} placeholder="What's this payment for?"
                  className="w-full h-14 bg-card border border-border rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <button onClick={() => linkAmount && setLinkStep("generated")}
                className={`w-full h-14 rounded-xl font-semibold ${linkAmount ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                Generate Link
              </button>
            </div>
          )}

          {mode === "generate-link" && linkStep === "generated" && (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-success/15 flex items-center justify-center mb-4">
                <Link2 className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">Link Generated!</h3>
              <p className="text-sm text-muted-foreground mb-6">Share this link to receive ${linkAmount}</p>
              <div className="w-full bg-card border border-border rounded-xl px-4 py-3.5 flex items-center justify-between mb-4">
                <p className="text-sm text-primary font-mono truncate mr-3">{generatedLink}</p>
                <button onClick={handleCopyLink} className="shrink-0">
                  {linkCopied ? <Check className="w-5 h-5 text-success" /> : <Copy className="w-5 h-5 text-primary" />}
                </button>
              </div>
              {linkDescription && <p className="text-sm text-muted-foreground mb-6">"{linkDescription}"</p>}
              <button onClick={resetAll} className="w-full h-12 bg-primary rounded-xl text-primary-foreground font-semibold">Done</button>
            </div>
          )}
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default DeexPay;

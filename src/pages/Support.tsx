import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, ChevronDown, ChevronRight, Send, HelpCircle } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import PageTransition from "@/components/PageTransition";
import NewBadge from "@/components/NewBadge";

const faqs = [
  { q: "How long does a crypto sale take?", a: "Most crypto sales are settled within 1-5 minutes. Payout is sent to your default bank account automatically." },
  { q: "What are DeeXpoints?", a: "DeeXpoints are reward points earned from trading. 1 point = ₦10. You can redeem them for cash anytime." },
  { q: "How do I verify my account?", a: "Go to Profile → KYC Verification. Complete Level 1 (email+phone), Level 2 (BVN), and Level 3 (ID upload) for higher limits." },
  { q: "What networks do you support?", a: "We support BTC, ETH (ERC-20), USDT (TRC-20, BEP-20, ERC-20), SOL, and more. Always check the network before sending." },
  { q: "Can I cancel a transaction?", a: "Blockchain transactions cannot be reversed once confirmed. Bill payments may be reversible within 24 hours." },
];

type View = "main" | "chat";

const messages = [
  { from: "bot", text: "Hi John! 👋 How can I help you today?" },
];

const Support = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("main");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState(messages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setChatMessages([...chatMessages, { from: "user", text: input }, { from: "bot", text: "Thanks for your message! A support agent will respond shortly. Your ticket ID is #DX-" + Math.floor(Math.random() * 9000 + 1000) }]);
    setInput("");
  };

  if (view === "chat") {
    return (
      <MobileLayout hideNav><PageTransition>
        <div className="flex flex-col h-screen">
          <div className="px-4 pt-4 pb-3 border-b border-border">
            <div className="flex items-center gap-3">
              <button onClick={() => setView("main")} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
              <div>
                <h2 className="text-sm font-bold text-foreground">DeeX Support</h2>
                <p className="text-xs text-success">Online</p>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto px-4 py-4 space-y-3">
            {chatMessages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.from === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary text-foreground rounded-bl-sm"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-border">
            <div className="flex gap-2">
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Type your message..."
                className="flex-1 h-12 bg-secondary rounded-xl px-4 text-foreground placeholder:text-muted-foreground outline-none" />
              <button onClick={sendMessage} className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center"><Send className="w-5 h-5 text-primary-foreground" /></button>
            </div>
          </div>
        </div>
      </PageTransition></MobileLayout>
    );
  }

  return (
    <MobileLayout hideNav>
      <PageTransition>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"><ArrowLeft className="w-5 h-5 text-foreground" /></button>
            <h2 className="text-lg font-bold text-foreground">Help & Support</h2>
            <NewBadge />
          </div>

          <button onClick={() => setView("chat")} className="w-full bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3 mb-6">
            <MessageCircle className="w-8 h-8 text-primary" />
            <div className="text-left flex-1">
              <p className="text-sm font-semibold text-foreground">Chat with Support</p>
              <p className="text-xs text-muted-foreground">Get help from our team in real-time</p>
            </div>
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>

          <h3 className="text-sm font-semibold text-foreground mb-3">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-secondary rounded-xl overflow-hidden">
                <button onClick={() => setExpanded(expanded === i ? null : i)} className="w-full flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-sm font-medium text-foreground text-left">{faq.q}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform shrink-0 ${expanded === i ? "rotate-180" : ""}`} />
                </button>
                {expanded === i && (
                  <div className="px-4 pb-3 pl-11">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </PageTransition>
    </MobileLayout>
  );
};

export default Support;

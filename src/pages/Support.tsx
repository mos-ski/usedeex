import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { AppShell, PageHeader, SectionCard, SectionHeader } from "@/components/dashboard/AppShell";
import { SettingsRow } from "@/components/dashboard/SettingsList";
import {
  CaretDownIcon,
  MessageQuestionIcon,
  PhoneCallIcon,
  SendIcon,
} from "@/components/dashboard/icons";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "How long does a crypto sale take?", a: "Most crypto sales are settled within 1-5 minutes. Payout is sent to your default bank account automatically." },
  { q: "What are DeeXpoints?", a: "DeeXpoints are reward points earned from trading. 1 point = ₦10. You can redeem them for cash anytime." },
  { q: "How do I verify my account?", a: "Go to Account → KYC Verification. Complete Level 1 (profile), Level 2 (BVN), and Level 3 (ID upload) for higher limits." },
  { q: "What networks do you support?", a: "We support BTC, ETH (ERC-20), USDT (TRC-20, BEP-20, ERC-20), SOL, and more. Always check the network before sending." },
  { q: "Can I cancel a transaction?", a: "Blockchain transactions cannot be reversed once confirmed. Bill payments may be reversible within 24 hours." },
];

type Message = { from: "bot" | "user"; text: string };

const Support = () => {
  const navigate = useNavigate();
  const [chatting, setChatting] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi John! 👋 How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((list) => [
      ...list,
      { from: "user", text },
      { from: "bot", text: `Thanks for your message! A support agent will respond shortly. Your ticket ID is #DX-${Math.floor(Math.random() * 9000 + 1000)}` },
    ]);
    setInput("");
  };

  /* ---------------- Live chat ---------------- */
  if (chatting) {
    return (
      <AppShell className="bg-white" innerClassName="flex min-h-[100dvh] flex-col pb-4 lg:max-w-[480px] lg:px-4">
        <PageTransition className="flex flex-1 flex-col">
          <PageHeader title="DeeX Support" onBack={() => setChatting(false)} />

          <p className="-mt-3 px-4 text-center text-xs font-semibold text-brand-successText">Online</p>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.map((m, index) => (
              <div key={index} className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}>
                <span
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-[1.6]",
                    m.from === "user"
                      ? "rounded-br-sm bg-brand-blue500 text-white"
                      : "rounded-bl-sm bg-brand-grey50 text-brand-grey900",
                  )}
                >
                  {m.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-brand-grey100 px-4 pt-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type your message..."
              aria-label="Message"
              className="h-12 min-w-0 flex-1 rounded-lg border border-brand-grey100 bg-white px-4 text-sm leading-[1.6] text-brand-grey900 outline-none placeholder:text-brand-grey300 focus:border-brand-blue500"
            />
            <button
              type="button"
              onClick={send}
              aria-label="Send message"
              className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-brand-blue500 text-white transition-opacity hover:opacity-90"
            >
              <SendIcon className="size-5" />
            </button>
          </div>
        </PageTransition>
      </AppShell>
    );
  }

  /* ---------------- Help & Support ---------------- */
  return (
    <AppShell innerClassName="pb-10 sm:pb-12 lg:max-w-[480px] lg:px-4">
      <PageTransition>
        <PageHeader title="Help & Support" onBack={() => navigate(-1)} />

        <SectionCard className="px-4 py-3">
          <SectionHeader title="Contact Us" />
          <div className="flex flex-col">
            <SettingsRow
              title="Live Chat"
              detail="Chat with our team in real-time"
              Icon={MessageQuestionIcon}
              onClick={() => setChatting(true)}
            />
            <SettingsRow
              title="Email Support"
              detail="support@deex.app"
              Icon={SendIcon}
              onClick={() => {
                window.location.href = "mailto:support@deex.app";
              }}
            />
            <SettingsRow
              title="WhatsApp"
              detail="+234 810 367 4006"
              Icon={PhoneCallIcon}
              className="border-b-0"
              onClick={() => window.open("https://wa.me/2348103674006", "_blank", "noopener,noreferrer")}
            />
          </div>
        </SectionCard>

        <SectionCard className="mt-3 px-4 py-3">
          <SectionHeader title="Frequently Asked Questions" />
          <div className="flex flex-col">
            {faqs.map((faq, index) => {
              const open = expanded === index;
              return (
                <div key={faq.q} className="border-b border-brand-grey100 last:border-b-0">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setExpanded(open ? null : index)}
                    className="flex w-full items-center gap-3 py-3 text-left"
                  >
                    <span className="min-w-0 flex-1 text-[15px] font-semibold leading-[1.4] text-brand-grey900">
                      {faq.q}
                    </span>
                    <CaretDownIcon
                      className={cn("size-3 shrink-0 text-brand-grey600 transition-transform", open && "rotate-180")}
                    />
                  </button>
                  {open && <p className="pb-3 text-sm leading-[1.6] text-brand-bodyText">{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </SectionCard>
      </PageTransition>
    </AppShell>
  );
};

export default Support;

import { useState } from "react";
import { renderEmail, emailSamples, type EmailName } from "@/emails";

const NAMES: EmailName[] = ["verify-code", "welcome", "password-reset", "receipt"];

/** Dev-only email template preview. Route is gated with import.meta.env.DEV. */
const EmailPreview = () => {
  const [active, setActive] = useState<EmailName>("verify-code");
  const html = renderEmail(active, emailSamples[active] as never);

  return (
    <div className="min-h-[100dvh] bg-brand-deepNavy font-roboto text-white">
      <div className="mx-auto flex w-full max-w-[900px] flex-col gap-4 px-4 py-8">
        <h1 className="font-gasoek text-2xl">EMAIL PREVIEWS (DEV ONLY)</h1>
        <div className="flex flex-wrap gap-2">
          {NAMES.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setActive(name)}
              className={`rounded-lg px-4 py-2 font-manrope text-xs font-semibold ${active === name ? "bg-brand-blue500 text-white" : "bg-[#0D1D2F] text-[#C9C9C9]"}`}
            >
              {name}
            </button>
          ))}
        </div>
        <iframe title={`Email preview: ${active}`} srcDoc={html} className="h-[80vh] w-full rounded-lg bg-white" />
      </div>
    </div>
  );
};

export default EmailPreview;

import { verifyCodeEmail, type VerifyCodeData } from "./verify-code";
import { welcomeEmail, type WelcomeData } from "./welcome";
import { passwordResetEmail, type PasswordResetData } from "./password-reset";
import { receiptEmail, type ReceiptData } from "./receipt";

export type EmailName = "verify-code" | "welcome" | "password-reset" | "receipt";

export interface EmailDataMap {
  "verify-code": VerifyCodeData;
  "welcome": WelcomeData;
  "password-reset": PasswordResetData;
  "receipt": ReceiptData;
}

const REQUIRED_TOKENS: { [K in EmailName]: Array<keyof EmailDataMap[K]> } = {
  "verify-code": ["name", "email", "d1", "d2", "d3", "d4", "verifyUrl", "minutes"],
  welcome: ["name", "email", "dashboardUrl"],
  "password-reset": ["name", "email", "resetUrl", "minutes"],
  receipt: ["name", "email", "amount", "type", "reference", "date", "receiptUrl"],
};

export function renderEmail<N extends EmailName>(name: N, data: EmailDataMap[N]): string {
  // Brief's verbatim switch delegates directly, but upstream templates call
  // ctaButton(url) before fillTokens, so a missing URL throws a raw TypeError
  // instead of "Missing email token". Pre-validate required keys here so the
  // missing-data test gets the expected error. Matches fillTokens semantics
  // (missing key or undefined value).
  const required = REQUIRED_TOKENS[name as EmailName];
  if (!required) {
    throw new Error(`Unknown email template: ${name}`);
  }
  const record = (data ?? {}) as Record<string, string>;
  for (const key of required) {
    if (!(key in record) || record[key] === undefined) {
      throw new Error(`Missing email token: ${key}`);
    }
  }
  switch (name) {
    case "verify-code":
      return verifyCodeEmail(data as VerifyCodeData);
    case "welcome":
      return welcomeEmail(data as WelcomeData);
    case "password-reset":
      return passwordResetEmail(data as PasswordResetData);
    case "receipt":
      return receiptEmail(data as ReceiptData);
    default:
      throw new Error(`Unknown email template: ${name}`);
  }
}

export const emailSamples: { [K in EmailName]: EmailDataMap[K] } = {
  "verify-code": { name: "Olivia", email: "olivia@deex.com", d1: "3", d2: "0", d3: "6", d4: "6", verifyUrl: "https://deex.com/verify?c=3066", minutes: "5" },
  welcome: { name: "Olivia", email: "olivia@deex.com", dashboardUrl: "https://deex.com/dashboard" },
  "password-reset": { name: "Olivia", email: "olivia@deex.com", resetUrl: "https://deex.com/reset?t=sample", minutes: "15" },
  receipt: { name: "Olivia", email: "olivia@deex.com", amount: "₦50,000.00", type: "Wallet top-up", reference: "DX-2026-000123", date: "23 Sep 2026", receiptUrl: "https://deex.com/receipt/DX-2026-000123" },
};

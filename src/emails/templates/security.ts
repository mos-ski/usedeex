import { emailShell, fillTokens } from "../layout";
import { passwordResetEmail, type PasswordResetData } from "../password-reset";
import { action, detailTable, heading, paragraph, rawRow, renderBody, teamSignOff } from "../primitives";
import type { EmailPayload, ReceiptRow, TemplateDefinition } from "../types";
import { verifyCodeEmail, type VerifyCodeData } from "../verify-code";

type SecurityMessage<T extends EmailPayload> = {
  label: string;
  subject: string;
  previewText: string;
  required: readonly (keyof T)[];
  sample: T;
  title: (data: T) => string;
  intro: (data: T) => string;
  details?: (data: T) => ReceiptRow[];
  cta?: (data: T) => { label: string; url: string };
};

const securityDefinition = <T extends EmailPayload>(config: SecurityMessage<T>): TemplateDefinition<T> => ({
  label: config.label,
  category: "security",
  subject: config.subject,
  previewText: config.previewText,
  required: config.required,
  sample: config.sample,
  render: (data) => {
    const rows =
      heading(config.title(data)) +
      paragraph(config.intro(data), { color: "#000000" }) +
      (config.details ? rawRow(detailTable(config.details(data))) : "") +
      (config.cta ? rawRow(action(config.cta(data).label, config.cta(data).url)) : "") +
      rawRow(teamSignOff());

    return fillTokens(emailShell(config.subject, renderBody(rows)), { email: data.email });
  },
});

const verifyCodeDefinition: TemplateDefinition<VerifyCodeData> = {
  label: "Verify email code",
  category: "onboarding",
  subject: "Verify your email",
  previewText: "Your DeeX verification code is ready.",
  required: ["name", "email", "d1", "d2", "d3", "d4", "verifyUrl", "minutes"],
  sample: {
    name: "Olivia",
    email: "olivia@deex.com",
    d1: "3",
    d2: "0",
    d3: "6",
    d4: "6",
    verifyUrl: "https://deex.com/verify?c=3066",
    minutes: "5",
  },
  render: verifyCodeEmail,
};

const passwordResetDefinition: TemplateDefinition<PasswordResetData> = {
  label: "Password reset",
  category: "onboarding",
  subject: "Reset your DeeX password",
  previewText: "Choose a new password and keep moving.",
  required: ["name", "email", "resetUrl", "minutes"],
  sample: {
    name: "Olivia",
    email: "olivia@deex.com",
    resetUrl: "https://deex.com/reset?t=sample",
    minutes: "15",
  },
  render: passwordResetEmail,
};

const loginSuccess = securityDefinition({
  label: "Successful login",
  subject: "New login to your DeeX account",
  previewText: "A new device just accessed your account.",
  required: ["name", "email", "device", "location", "time", "securityUrl"],
  sample: {
    name: "Olivia",
    email: "olivia@deex.com",
    device: "iPhone 15 Pro",
    location: "Lagos, Nigeria",
    time: "24 Sep 2026, 8:42 PM",
    securityUrl: "https://deex.com/security",
  },
  title: () => "YOU'RE IN.",
  intro: ({ name }) => `${name}, your account was accessed successfully. Here are the details.`,
  details: ({ device, location, time }) => [
    { label: "Device", value: device },
    { label: "Location", value: location },
    { label: "Time", value: time },
  ],
  cta: ({ securityUrl }) => ({ label: "Review Security", url: securityUrl }),
});

const passwordChanged = securityDefinition({
  label: "Password changed",
  subject: "Your DeeX password changed",
  previewText: "Your account credentials were updated.",
  required: ["name", "email", "time", "securityUrl"],
  sample: { name: "Olivia", email: "olivia@deex.com", time: "24 Sep 2026, 8:42 PM", securityUrl: "https://deex.com/security" },
  title: () => "PASSWORD CHANGED.",
  intro: ({ name }) => `${name}, your password was updated. Your account stays in your hands.`,
  details: ({ time }) => [{ label: "Changed", value: time }],
  cta: ({ securityUrl }) => ({ label: "Review Security", url: securityUrl }),
});

const pinChanged = securityDefinition({
  label: "PIN changed",
  subject: "Your DeeX PIN changed",
  previewText: "Your transaction PIN was updated.",
  required: ["name", "email", "time", "securityUrl"],
  sample: { name: "Olivia", email: "olivia@deex.com", time: "24 Sep 2026, 8:45 PM", securityUrl: "https://deex.com/security" },
  title: () => "PIN UPDATED.",
  intro: ({ name }) => `${name}, your transaction PIN changed successfully.`,
  details: ({ time }) => [{ label: "Changed", value: time }],
  cta: ({ securityUrl }) => ({ label: "Review Security", url: securityUrl }),
});

const profileUpdated = securityDefinition({
  label: "Profile updated",
  subject: "Your DeeX profile changed",
  previewText: "Your profile details were updated.",
  required: ["name", "email", "fields", "time", "profileUrl"],
  sample: { name: "Olivia", email: "olivia@deex.com", fields: "Phone number, username", time: "24 Sep 2026, 8:48 PM", profileUrl: "https://deex.com/profile" },
  title: () => "PROFILE UPDATED.",
  intro: ({ name }) => `${name}, your profile details are up to date.`,
  details: ({ fields, time }) => [
    { label: "Updated", value: fields },
    { label: "Time", value: time },
  ],
  cta: ({ profileUrl }) => ({ label: "View Profile", url: profileUrl }),
});

const kycApproved = securityDefinition({
  label: "KYC level approved",
  subject: "Your DeeX limits just moved up",
  previewText: "Your identity check is approved.",
  required: ["name", "email", "level", "tradingLimit", "withdrawalLimit", "kycUrl"],
  sample: { name: "Olivia", email: "olivia@deex.com", level: "Level 2", tradingLimit: "$10,000", withdrawalLimit: "$500 daily", kycUrl: "https://deex.com/kyc" },
  title: () => "APPROVED. MORE ROOM TO MOVE.",
  intro: ({ name, level }) => `${name}, your ${level} verification is complete. Your new limits are active.`,
  details: ({ level, tradingLimit, withdrawalLimit }) => [
    { label: "Verification", value: level },
    { label: "Trading limit", value: tradingLimit },
    { label: "Withdrawal limit", value: withdrawalLimit },
  ],
  cta: ({ kycUrl }) => ({ label: "View Limits", url: kycUrl }),
});

const statementReady = securityDefinition({
  label: "Statement ready",
  subject: "Your DeeX statement is ready",
  previewText: "Your transaction record is ready to download.",
  required: ["name", "email", "period", "generatedAt", "statementUrl"],
  sample: { name: "Olivia", email: "olivia@deex.com", period: "September 2026", generatedAt: "24 Sep 2026, 8:50 PM", statementUrl: "https://deex.com/statements/september-2026" },
  title: () => "YOUR STATEMENT IS READY.",
  intro: ({ name }) => `${name}, your transaction record is ready when you are.`,
  details: ({ period, generatedAt }) => [
    { label: "Period", value: period },
    { label: "Generated", value: generatedAt },
  ],
  cta: ({ statementUrl }) => ({ label: "Download Statement", url: statementUrl }),
});

export const securityDefinitions = {
  "verify-code": verifyCodeDefinition,
  "password-reset": passwordResetDefinition,
  "login-success": loginSuccess,
  "password-changed": passwordChanged,
  "pin-changed": pinChanged,
  "profile-updated": profileUpdated,
  "kyc-approved": kycApproved,
  "statement-ready": statementReady,
} as const;

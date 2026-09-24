import { securityDefinitions } from "./templates/security";
import { transactionDefinitions } from "./templates/transactions";
import { welcomeDefinition } from "./templates/welcome";

export const emailCatalog = {
  welcome: welcomeDefinition,
  ...securityDefinitions,
  ...transactionDefinitions,
} as const;

export type EmailName = keyof typeof emailCatalog;

export type EmailCategoryDefinition = {
  id: string;
  label: string;
  templateIds: readonly EmailName[];
};

export const emailCategories = [
  { id: "onboarding", label: "Onboarding", templateIds: ["welcome", "verify-code", "password-reset"] },
  { id: "security", label: "Security & account", templateIds: ["login-success", "password-changed", "pin-changed", "profile-updated", "kyc-approved", "statement-ready"] },
  { id: "wallet", label: "Wallet", templateIds: ["wallet-deposit-success", "wallet-withdrawal-success"] },
  { id: "digital-assets", label: "Digital assets", templateIds: ["asset-received", "asset-sent", "asset-bought", "asset-sold", "asset-swapped", "deex-pay-success"] },
  { id: "gift-cards", label: "Gift cards", templateIds: ["gift-card-bought", "gift-card-sold"] },
  { id: "bills", label: "Bills", templateIds: ["airtime-success", "data-success", "electricity-success", "betting-success"] },
  { id: "rewards", label: "Rewards & referrals", templateIds: ["reward-earned", "referral-joined", "referral-reward-paid", "reward-redeemed"] },
  { id: "virtual-card", label: "Virtual card", templateIds: ["virtual-card-created", "virtual-card-funded"] },
] as const satisfies readonly EmailCategoryDefinition[];

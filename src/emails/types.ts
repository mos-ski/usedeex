export type EmailCategory =
  | "onboarding"
  | "security"
  | "wallet"
  | "digital-assets"
  | "gift-cards"
  | "bills"
  | "rewards"
  | "virtual-card";

export type EmailPayload = Record<string, string>;

export type ReceiptRow = {
  label: string;
  value: string;
};

export type TemplateDefinition<T extends EmailPayload = EmailPayload> = {
  label: string;
  category: EmailCategory;
  subject: string;
  previewText: string;
  required: readonly (keyof T)[];
  sample: T;
  render: (data: T) => string;
};

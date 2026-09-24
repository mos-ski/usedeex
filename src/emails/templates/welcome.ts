import { emailShell, fillTokens } from "../layout";
import { action, heading, paragraph, personalSignOff, rawRow, renderBody } from "../primitives";
import type { TemplateDefinition } from "../types";

export type WelcomePayload = {
  name: string;
  email: string;
  dashboardUrl: string;
};

const LETTER = renderBody(
  heading("{{nameUpper}}, YOUR MONEY MOVES DIFFERENTLY NOW.") +
    paragraph("Welcome to DeeX—the account built to move at your speed.") +
    paragraph(
      "Hold your assets. Swap them. Send money. Pay bills. Cash out when you decide. No branch. No queue. No permission.",
      { color: "#000000" },
    ) +
    paragraph("Your account is ready. Make your first move.") +
    rawRow("{{cta}}") +
    rawRow(personalSignOff("Omojuwa Divine", "CEO, UseDeeX")),
);

export const welcomeDefinition: TemplateDefinition<WelcomePayload> = {
  label: "Welcome to DeeX",
  category: "onboarding",
  subject: "Your money moves differently now",
  previewText: "One account. Everything your money does.",
  required: ["name", "email", "dashboardUrl"],
  sample: {
    name: "Olivia",
    email: "olivia@deex.com",
    dashboardUrl: "https://deex.com/dashboard",
  },
  render: (data) => {
    const body = LETTER.replace("{{cta}}", () => action("Open DeeX", data.dashboardUrl));
    return fillTokens(emailShell("Welcome to DeeX", body), {
      ...data,
      nameUpper: data.name.toUpperCase(),
    });
  },
};

import { BRAND, emailShell, fillTokens, FONT_BODY } from "../layout";
import { action, heading, paragraph, rawRow, renderBody } from "../primitives";
import type { TemplateDefinition } from "../types";

export type WelcomePayload = {
  name: string;
  email: string;
  dashboardUrl: string;
};

const LETTER = renderBody(
  heading("WELCOME TO DEEX, {{nameUpper}}.") +
    paragraph("I’m Omojuwa Divine, CEO of UseDeeX. I wanted to personally welcome you to DeeX.") +
    paragraph(
      "We built DeeX to make managing your money simpler—whether you’re holding or exchanging digital assets, sending money, paying bills, buying gift cards, or earning rewards.",
    ) +
    paragraph(
      "Your account is ready, and you can start exploring whenever you’re ready. If anything feels unclear or you need help, our team is always here for you.",
    ) +
    paragraph("Thank you for choosing DeeX. We’re glad to have you with us.") +
    rawRow("{{cta}}") +
    paragraph("Welcome aboard,") +
    rawRow(
      `<div style="font-family:${FONT_BODY};font-size:18px;line-height:28px;color:${BRAND.bodyGrey};"><strong>Omojuwa Divine</strong><br />CEO, UseDeeX</div>`,
    ),
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
    const body = LETTER.replace("{{cta}}", () => action("Explore DeeX", data.dashboardUrl));
    return fillTokens(emailShell("Welcome to DeeX", body), {
      ...data,
      nameUpper: data.name.toUpperCase(),
    });
  },
};

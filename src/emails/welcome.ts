import { emailShell, ctaButton, fillTokens, BRAND, FONT_BODY, FONT_CONDENSED } from "./layout";

export interface WelcomeData {
  name: string;
  email: string;
  dashboardUrl: string;
}

const BODY =
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` +
  `<tr><td align="center" style="padding:32px 62px 0;font-family:${FONT_CONDENSED};font-size:36px;line-height:35px;color:${BRAND.primary};">WELCOME TO DEEX, {{name}},</td></tr>` +
  `<tr><td align="center" style="padding:24px 62px 0;font-family:${FONT_BODY};font-size:20px;line-height:30px;color:${BRAND.bodyGrey};">Your account is ready. Send money, buy crypto and pay bills — all in one place.</td></tr>` +
  `<tr><td align="center" style="padding:24px 62px 0;">{{cta}}</td></tr>` +
  `<tr><td align="center" style="padding:24px 62px 32px;font-family:${FONT_BODY};font-size:20px;line-height:30px;color:${BRAND.bodyGrey};">Thanks,<br />The DeeX team</td></tr>` +
  `</table>`;

export function welcomeEmail(data: WelcomeData): string {
  if (data.name == null) throw new Error("Missing email token: name");
  // Heading is uppercase per Figma convention; body greetings elsewhere stay verbatim.
  // Fill AFTER shelling so the footer's {{email}} token is also replaced.
  return fillTokens(emailShell("Welcome to DeeX", BODY.replace("{{cta}}", () => ctaButton("Open DeeX", data.dashboardUrl))), { ...data, name: data.name.toUpperCase() });
}

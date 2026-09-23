import { emailShell, ctaButton, fillTokens, BRAND, FONT_BODY, FONT_CONDENSED } from "./layout";

export interface PasswordResetData {
  name: string;
  email: string;
  resetUrl: string;
  minutes: string;
}

const BODY =
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` +
  `<tr><td align="center" style="padding:32px 62px 0;font-family:${FONT_CONDENSED};font-size:36px;line-height:35px;color:${BRAND.primary};">RESET YOUR PASSWORD</td></tr>` +
  `<tr><td align="center" style="padding:24px 62px 0;font-family:${FONT_BODY};font-size:20px;line-height:30px;color:${BRAND.bodyGrey};">Hi {{name}}, tap the button below to choose a new password. This link is valid for the next {{minutes}} minutes.</td></tr>` +
  `<tr><td align="center" style="padding:24px 62px 0;">{{cta}}</td></tr>` +
  `<tr><td align="center" style="padding:24px 62px 32px;font-family:${FONT_BODY};font-size:20px;line-height:30px;color:${BRAND.bodyGrey};">Didn&#39;t ask for this? You can safely ignore this email.<br />The DeeX team</td></tr>` +
  `</table>`;

export function passwordResetEmail(data: PasswordResetData): string {
  // Fill AFTER shelling so the footer's {{email}} token is also replaced.
  return fillTokens(emailShell("Reset your password", BODY.replace("{{cta}}", ctaButton("Reset Password", data.resetUrl))), { ...data });
}

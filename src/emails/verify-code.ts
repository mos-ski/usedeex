import { emailShell, ctaButton, fillTokens, BRAND, FONT_BODY, FONT_CONDENSED, FONT_MONO } from "./layout";

export interface VerifyCodeData {
  name: string;
  email: string;
  d1: string;
  d2: string;
  d3: string;
  d4: string;
  verifyUrl: string;
  minutes: string;
}

const digit = (token: string) =>
  `<td align="center" width="48" bgcolor="${BRAND.white}" style="width:48px;border:1.5px solid ${BRAND.digitBorder};border-radius:8px;background-color:${BRAND.white};padding:2px 6px;font-family:${FONT_MONO};font-size:51px;line-height:54px;color:${BRAND.primary};">${token}</td>`;

const BODY = (
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` +
  `<tr><td align="center" style="padding:32px 62px 0;font-family:${FONT_CONDENSED};font-size:36px;line-height:35px;color:${BRAND.primary};">HI {{name}},</td></tr>` +
  `<tr><td align="center" style="padding:24px 62px 0;font-family:${FONT_BODY};font-size:20px;line-height:30px;color:${BRAND.bodyGrey};">This is your verification code:</td></tr>` +
  `<tr><td align="center" style="padding:24px 62px 0;">` +
  `<table role="presentation" cellpadding="0" cellspacing="6" border="0"><tr>${digit("{{d1}}")}${digit("{{d2}}")}${digit("{{d3}}")}${digit("{{d4}}")}</tr></table>` +
  `</td></tr>` +
  `<tr><td align="center" style="padding:24px 62px 0;font-family:${FONT_BODY};font-size:20px;line-height:30px;color:${BRAND.black};">This code will only be valid for the next {{minutes}} minutes. If the code does not work, you can use this login verification link:</td></tr>` +
  `<tr><td align="center" style="padding:24px 62px 0;">{{cta}}</td></tr>` +
  `<tr><td align="center" style="padding:24px 62px 32px;font-family:${FONT_BODY};font-size:20px;line-height:30px;color:${BRAND.bodyGrey};">Thanks,<br />The DeeX team</td></tr>` +
  `</table>`
);

export function verifyCodeEmail(data: VerifyCodeData): string {
  if (data.name == null) throw new Error("Missing email token: name");
  const withCta = BODY.replace("{{cta}}", () => ctaButton("Verify Email", data.verifyUrl));
  // Fill after shell so footerSection's {{email}} is also replaced.
  // {{cta}} is replaced before fillTokens so button HTML is not escaped.
  const shell = emailShell("Verify your email", withCta);
  // Figma renders the heading uppercase (textCase UPPER), so uppercase the name.
  return fillTokens(shell, { ...data, name: data.name.toUpperCase() });
}

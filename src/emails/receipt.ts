import { emailShell, ctaButton, fillTokens, BRAND, FONT_BODY, FONT_CONDENSED } from "./layout";

export interface ReceiptData {
  name: string;
  email: string;
  amount: string;
  type: string;
  reference: string;
  date: string;
  receiptUrl: string;
}

const row = (label: string, token: string) =>
  `<tr>` +
  `<td style="padding:8px 0;font-family:${FONT_BODY};font-size:16px;line-height:24px;color:${BRAND.bodyGrey};">${label}</td>` +
  `<td align="right" style="padding:8px 0;font-family:${FONT_BODY};font-size:16px;line-height:24px;color:${BRAND.black};">${token}</td>` +
  `</tr>`;

const BODY =
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` +
  `<tr><td align="center" style="padding:32px 62px 0;font-family:${FONT_CONDENSED};font-size:36px;line-height:35px;color:${BRAND.primary};">TRANSACTION RECEIPT</td></tr>` +
  `<tr><td align="center" style="padding:24px 62px 0;font-family:${FONT_BODY};font-size:20px;line-height:30px;color:${BRAND.bodyGrey};">Hi {{name}}, your transaction was successful.</td></tr>` +
  `<tr><td style="padding:24px 62px 0;">` +
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #E5E7EB;border-radius:8px;">` +
  `<tr><td style="padding:16px 24px;">` +
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` +
  `<tr><td colspan="2" align="center" style="padding:8px 0 16px;font-family:${FONT_CONDENSED};font-size:32px;line-height:32px;color:${BRAND.primary};">{{amount}}</td></tr>` +
  `${row("Type", "{{type}}")}${row("Reference", "{{reference}}")}${row("Date", "{{date}}")}` +
  `</table></td></tr></table>` +
  `</td></tr>` +
  `<tr><td align="center" style="padding:24px 62px 0;">{{cta}}</td></tr>` +
  `<tr><td align="center" style="padding:24px 62px 32px;font-family:${FONT_BODY};font-size:20px;line-height:30px;color:${BRAND.bodyGrey};">Thanks,<br />The DeeX team</td></tr>` +
  `</table>`;

export function receiptEmail(data: ReceiptData): string {
  // Fill AFTER shelling so the footer's {{email}} token is also replaced.
  return fillTokens(emailShell("Your DeeX receipt", BODY.replace("{{cta}}", ctaButton("View Receipt", data.receiptUrl))), { ...data });
}

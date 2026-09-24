export const DEFAULT_ASSET_BASE_URL = "https://deex.com/emails";
export const EMAIL_WIDTH = 720;

export const ASSETS = {
  logo: "logo.svg",
  x: "social-x.svg",
  facebook: "social-facebook.svg",
  instagram: "social-instagram.svg",
  wave: "wave.svg",
};

const asset = (file: string) => `${DEFAULT_ASSET_BASE_URL}/${file}`;

export const BRAND = {
  primary: "#0B75C2",
  hero: "#D0EBFF",
  bodyGrey: "#6B6B6B",
  footerText: "#5C5C5C",
  digitBorder: "#2C98E0",
  buttonText: "#F7F8F9",
  white: "#FFFFFF",
  black: "#000000",
};

export const FONT_BODY = "Roboto, Arial, Helvetica, sans-serif";
export const FONT_CONDENSED = "'Roboto Condensed', 'Arial Narrow', Arial, sans-serif";
export const FONT_MONO = "'Roboto Mono', 'Courier New', monospace";
export const FONT_BUTTON = "Manrope, Arial, Helvetica, sans-serif";

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function fillTokens(html: string, data: Record<string, string>): string {
  return html.replace(/\{\{(\w+)\}\}/g, (_m, key: string) => {
    if (!(key in data) || data[key] === undefined) throw new Error(`Missing email token: ${key}`);
    return escapeHtml(data[key]);
  });
}

export function heroSection(): string {
  return (
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` +
    `<tr><td align="center" height="215" bgcolor="${BRAND.hero}" style="height:215px;background-color:${BRAND.hero};overflow:hidden;position:relative;">` +
    `<img src="${asset(ASSETS.wave)}" alt="" width="699" height="412" style="display:block;border:0;position:absolute;width:699px;height:412px;left:227px;top:83px;transform:rotate(-164.13deg);" />` +
    `<img src="${asset(ASSETS.logo)}" alt="DeeX" width="238" height="64" style="display:block;border:0;position:absolute;width:238px;height:64px;left:241px;top:74px;" />` +
    `</td></tr></table>`
  );
}

export function ctaButton(label: string, url: string): string {
  if (!/^https?:\/\//.test(url)) throw new Error("Unsafe email URL: " + url);
  const safeLabel = escapeHtml(label);
  const safeUrl = escapeHtml(url);
  return (
    `<table role="presentation" align="center" width="280" cellpadding="0" cellspacing="0" border="0" style="width:280px;"><tr><td align="center" bgcolor="${BRAND.primary}" style="border-radius:6px;background-color:${BRAND.primary};">` +
    `<a href="${safeUrl}" style="display:block;width:280px;box-sizing:border-box;padding:11px 12px;font-family:${FONT_BUTTON};font-size:13.5px;font-weight:700;line-height:1.6;color:${BRAND.buttonText};text-decoration:none;">${safeLabel}</a>` +
    `</td></tr></table>`
  );
}

export function footerSection(): string {
  const icon = (file: string, alt: string) =>
    `<img src="${asset(file)}" alt="${alt}" width="20" height="20" style="display:block;border:0;width:20px;height:20px;" />`;
  return (
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` +
    `<tr><td align="center" style="padding:32px 24px 0;font-family:${FONT_BODY};font-size:16px;line-height:24px;color:${BRAND.footerText};">` +
    `This email was sent to {{email}}. If you&#39;d rather not receive this kind of email, you can unsubscribe or manage your email preferences.<br />&copy; 2026 DeeX, Lagos, Nigeria` +
    `</td></tr>` +
    `<tr><td align="center" style="padding:48px 24px 32px;">` +
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>` +
    `<td style="padding:0 8px;">${icon(ASSETS.x, "X")}</td>` +
    `<td style="padding:0 8px;">${icon(ASSETS.facebook, "Facebook")}</td>` +
    `<td style="padding:0 8px;">${icon(ASSETS.instagram, "Instagram")}</td>` +
    `</tr></table></td></tr></table>`
  );
}

export function emailShell(title: string, bodyInner: string): string {
  return (
    `<!DOCTYPE html><html><head><meta charset="utf-8" />` +
    `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` +
    `<title>${escapeHtml(title)}</title></head>` +
    `<body style="margin:0;padding:0;background-color:#F7F8F9;">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` +
    `<tr><td align="center" style="padding:24px 12px;">` +
    `<table role="presentation" width="${EMAIL_WIDTH}" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:${EMAIL_WIDTH}px;background-color:${BRAND.white};">` +
    `<tr><td>${heroSection()}${bodyInner}${footerSection()}</td></tr>` +
    `</table></td></tr></table></body></html>`
  );
}

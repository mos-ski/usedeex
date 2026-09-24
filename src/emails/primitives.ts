import {
  BRAND,
  FONT_BODY,
  FONT_BUTTON,
  FONT_CONDENSED,
  ctaButton,
  escapeHtml,
} from "./layout";
import type { ReceiptRow } from "./types";

const textCell = (content: string, style: string) =>
  `<tr><td style="${style}">${content}</td></tr>`;

export const heading = (text: string, align: "left" | "center" = "center") =>
  textCell(
    escapeHtml(text),
    `padding:0;font-family:${FONT_CONDENSED};font-size:36px;line-height:38px;color:${BRAND.primary};text-align:${align};text-transform:uppercase;`,
  );

export const paragraph = (text: string, options?: { align?: "left" | "center"; color?: string }) =>
  textCell(
    escapeHtml(text),
    `padding:0;font-family:${FONT_BODY};font-size:18px;line-height:28px;color:${options?.color ?? BRAND.bodyGrey};text-align:${options?.align ?? "center"};`,
  );

export const amountHero = (value: string) =>
  `<div style="font-family:${FONT_CONDENSED};font-size:40px;line-height:44px;color:${BRAND.primary};text-align:center;">${escapeHtml(value)}</div>`;

export const successBadge = () =>
  `<span style="display:inline-block;padding:6px 10px;border-radius:999px;background:#E9F9EE;color:#137A3A;font-family:${FONT_BUTTON};font-size:12px;font-weight:700;line-height:16px;">Successful</span>`;

export const detailTable = (rows: ReceiptRow[]) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:${FONT_BODY};font-size:16px;line-height:24px;">${rows
    .map(
      ({ label, value }, index) =>
        `<tr><td align="left" style="text-align:left;padding:10px 0;${index ? "border-top:1px solid #E5E7EB;" : ""}color:${BRAND.bodyGrey};">${escapeHtml(label)}</td><td align="right" style="text-align:right;padding:10px 0;${index ? "border-top:1px solid #E5E7EB;" : ""}color:${BRAND.black};font-weight:600;">${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table>`;

export const callout = (content: string) =>
  `<div style="padding:16px;border:1px solid #E5E7EB;border-radius:10px;background:#F7F8F9;">${content}</div>`;

export const teamSignOff = () =>
  `<div style="font-family:${FONT_BODY};font-size:18px;line-height:28px;color:${BRAND.bodyGrey};">Thanks,<br />The DeeX team</div>`;

export const personalSignOff = (name: string, title: string) =>
  `<div style="font-family:${FONT_BODY};font-size:18px;line-height:28px;color:${BRAND.bodyGrey};"><strong style="color:${BRAND.black};">${escapeHtml(name)}</strong><br />${escapeHtml(title)}</div>`;

export const action = (label: string, url: string) => ctaButton(label, url);

export const renderBody = (rows: string, options?: { align?: "left" | "center" }) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:48px 62px 40px;text-align:${options?.align ?? "center"};"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0 24px;">${rows}</table></td></tr></table>`;

export const rawRow = (html: string, align: "left" | "center" = "center") =>
  textCell(html, `padding:0;text-align:${align};`);

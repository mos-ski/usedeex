# DeeX Email Templates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build four email-client-safe HTML email templates (verify-code, welcome, password-reset, receipt) with a typed `renderEmail()` entry point and a dev-only preview route.

**Architecture:** Hand-coded table HTML with inline styles in small TS builder modules under `src/emails/`, sharing hero/footer partials from `layout.ts`; tokens use `{{name}}` syntax filled by `renderEmail()`; zero new dependencies.

**Tech Stack:** TypeScript, Vitest (`npm test` = `vitest run`), react-router-dom (existing), no new packages.

## Global Constraints

- No new npm dependencies.
- All email HTML: `<table>` layout + inline styles only, no `<style>` blocks, no external CSS, no JavaScript, no webfonts (email-safe fallback stacks only).
- Container width 640px with fluid `max-width:640px; width:100%` for mobile.
- `npm test` (vitest run) must stay green after every task.
- Follow existing test style: `import { describe, it, expect } from "vitest";` (see `src/test/example.test.ts`).
- Brand colors verbatim: primary `#0B75C2`, hero `#D0EBFF`, body grey `#6B6B6B`, footer text `#5C5C5C`, digit border `#2C98E0`, button text `#F7F8F9`.
- Footer sender identity: `noreply@deex.com`; footer address line is exactly `&copy; 2026 DeeX, Lagos, Nigeria`.

---

## File Structure

| File | Responsibility |
|---|---|
| `src/emails/layout.ts` | Brand constants, `escapeHtml`, `fillTokens`, `emailShell`, `heroSection`, `footerSection`, `ctaButton` |
| `src/emails/layout.test.ts` | Unit tests for layout helpers |
| `src/emails/verify-code.ts` | Verify-code body builder (Figma node verbatim) |
| `src/emails/verify-code.test.ts` | Verify-code assertions |
| `src/emails/welcome.ts` | Welcome body builder |
| `src/emails/password-reset.ts` | Password-reset body builder |
| `src/emails/auth.test.ts` | Welcome + password-reset assertions |
| `src/emails/receipt.ts` | Receipt body builder with summary table |
| `src/emails/receipt.test.ts` | Receipt assertions |
| `src/emails/index.ts` | `EmailName`, `EmailData` types, `renderEmail`, `emailSamples` |
| `src/emails/index.test.ts` | Dispatch, missing-token throw, leftover-token guard |
| `src/emails/assets/*` | Logo + social icons moved from `figma-deex-email/` |
| `src/pages/EmailPreview.tsx` | Dev-only iframe preview page |
| `src/App.tsx` (modify) | Add dev-gated `/emails/preview` route |

**Interfaces (locked):**
- `layout.ts` consumes nothing; produces `escapeHtml(s: string): string`, `fillTokens(html: string, data: Record<string, string>): string`, `emailShell(title: string, bodyInner: string): string`, `heroSection(): string`, `footerSection(): string`, `ctaButton(label: string, url: string): string`, const `ASSETS: { logo, x, facebook, instagram, wave }`, const `DEFAULT_ASSET_BASE_URL: string`.
- Template modules consume `layout.ts`; each produces one builder, e.g. `verifyCodeEmail(data: VerifyCodeData): string` returning a **full** HTML document string (shell included).
- `index.ts` consumes all template modules; produces `type EmailName = "verify-code" | "welcome" | "password-reset" | "receipt"`, per-template data types, `renderEmail(name: EmailName, data: EmailDataMap[typeof name], opts?: { assetBaseUrl?: string }): string`, and `emailSamples: Record<EmailName, unknown>` for the preview page.
- `EmailPreview.tsx` consumes `renderEmail` + `emailSamples`; produces default-exported page component.

**Token rule:** templates embed `{{token}}` placeholders; `fillTokens` replaces and throws `Error("Missing email token: name")` when a key is absent; it HTML-escapes every value via `escapeHtml`.

---

### Task 1: Layout partials + helpers

**Files:**
- Create: `src/emails/layout.ts`
- Create: `src/emails/layout.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `escapeHtml`, `fillTokens`, `emailShell`, `heroSection`, `footerSection`, `ctaButton`, `ASSETS`, `DEFAULT_ASSET_BASE_URL` (signatures above).

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from "vitest";
import { escapeHtml, fillTokens, emailShell, heroSection, footerSection, ctaButton } from "./layout";

describe("layout", () => {
  it("escapes html", () => {
    expect(escapeHtml('<b>Olivia & "Co"</b>')).toBe("&lt;b&gt;Olivia &amp; &quot;Co&quot;&lt;/b&gt;");
  });

  it("fills tokens and throws on missing", () => {
    expect(fillTokens("Hi {{name}}", { name: "Olivia" })).toBe("Hi Olivia");
    expect(() => fillTokens("Hi {{name}}", {})).toThrow("Missing email token: name");
  });

  it("shell wraps body in a 640px table", () => {
    const html = emailShell("Verify", "<p>hi</p>");
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("max-width:640px");
    expect(html).toContain("<p>hi</p>");
  });

  it("hero uses brand blue banner and logo", () => {
    expect(heroSection()).toContain("#D0EBFF");
    expect(heroSection()).toContain("logo");
  });

  it("footer has unsubscribe text and social icons", () => {
    expect(footerSection()).toContain("unsubscribe");
    expect(footerSection()).toContain("instagram");
  });

  it("cta button renders label and url", () => {
    expect(ctaButton("Verify Email", "https://deex.com/v")).toContain("Verify Email");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/emails/layout.test.ts`
Expected: FAIL with "Failed to resolve import ./layout" (file does not exist yet).

- [ ] **Step 3: Write minimal implementation**

```ts
export const DEFAULT_ASSET_BASE_URL = "https://deex.com/emails";

export const ASSETS = {
  logo: "logo.svg",
  x: "social-x.svg",
  facebook: "social-facebook.svg",
  instagram: "social-instagram.svg",
  wave: "wave.png",
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
    `<tr><td align="center" bgcolor="${BRAND.hero}" style="background-color:${BRAND.hero};padding:32px 24px;">` +
    `<img src="${asset(ASSETS.logo)}" alt="DeeX" width="180" style="display:block;border:0;width:180px;max-width:60%;height:auto;" />` +
    `</td></tr></table>`
  );
}

export function ctaButton(label: string, url: string): string {
  return (
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" bgcolor="${BRAND.primary}" style="border-radius:6px;background-color:${BRAND.primary};">` +
    `<a href="${url}" style="display:inline-block;padding:12px 48px;font-family:${FONT_BUTTON};font-size:14px;font-weight:700;line-height:1.6;color:${BRAND.buttonText};text-decoration:none;">${label}</a>` +
    `</td></tr></table>`
  );
}

export function footerSection(): string {
  const icon = (file: string, alt: string) =>
    `<img src="${asset(file)}" alt="${alt}" width="20" height="20" style="display:block;border:0;width:20px;height:20px;" />`;
  return (
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` +
    `<tr><td align="center" style="padding:32px 24px;font-family:${FONT_BODY};font-size:16px;line-height:24px;color:${BRAND.footerText};">` +
    `This email was sent to {{email}}. If you&#39;d rather not receive this kind of email, you can unsubscribe or manage your email preferences.<br />&copy; 2026 DeeX, Lagos, Nigeria` +
    `</td></tr>` +
    `<tr><td align="center" style="padding:0 24px 32px;">` +
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
    `<title>${title}</title></head>` +
    `<body style="margin:0;padding:0;background-color:#F7F8F9;">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">` +
    `<tr><td align="center" style="padding:24px 12px;">` +
    `<table role="presentation" width="640" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:640px;background-color:${BRAND.white};">` +
    `<tr><td>${heroSection()}${bodyInner}${footerSection()}</td></tr>` +
    `</table></td></tr></table></body></html>`
  );
}
```

Note: `footerSection` intentionally contains a `{{email}}` token; every template's data must include `email`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/emails/layout.test.ts`
Expected: PASS (7 tests).

- [ ] **Step 5: Move Figma assets into place**

Run: `mkdir -p src/emails/assets && mv figma-deex-email/deex-logo.svg src/emails/assets/logo.svg && mv figma-deex-email/social-x.svg figma-deex-email/social-facebook.svg figma-deex-email/social-instagram.svg src/emails/assets/ && mv figma-deex-email/hero-decoration.svg src/emails/assets/wave.svg && rmdir figma-deex-email && ls src/emails/assets`
Expected: `logo.svg social-x.svg social-facebook.svg social-instagram.svg wave.svg` listed. (The wave ships as SVG source; the PNG export for email clients is produced at send-time hosting — `ASSETS.wave` already points at `wave.png`. Do not add PNG conversion tooling; YAGNI.)

- [ ] **Step 6: Commit**

```bash
git add src/emails/layout.ts src/emails/layout.test.ts src/emails/assets
git commit -m "feat(emails): add shared layout partials and helpers"
```

---

### Task 2: Verify-code template (Figma verbatim)

**Files:**
- Create: `src/emails/verify-code.ts`
- Create: `src/emails/verify-code.test.ts`

**Interfaces:**
- Consumes: `emailShell`, `ctaButton`, `fillTokens`, `BRAND`, `FONT_*` from `./layout`.
- Produces: `export interface VerifyCodeData { name: string; email: string; d1: string; d2: string; d3: string; d4: string; verifyUrl: string; minutes: string; }` and `export function verifyCodeEmail(data: VerifyCodeData): string` (full HTML document).

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from "vitest";
import { verifyCodeEmail } from "./verify-code";

const data = { name: "Olivia", email: "olivia@deex.com", d1: "3", d2: "0", d3: "6", d4: "6", verifyUrl: "https://deex.com/verify?c=3066", minutes: "5" };

describe("verify-code", () => {
  it("renders greeting, digits, expiry and button", () => {
    const html = verifyCodeEmail(data);
    expect(html).toContain("HI OLIVIA,");
    expect(html).toContain("#2C98E0");
    expect(html).toContain("next 5 minutes");
    expect(html).toContain("Verify Email");
    expect(html).toContain("https://deex.com/verify?c=3066");
  });

  it("leaves no unreplaced tokens", () => {
    expect(verifyCodeEmail(data)).not.toContain("{{");
  });

  it("throws when a digit is missing", () => {
    // @ts-expect-error intentionally incomplete
    expect(() => verifyCodeEmail({ ...data, d4: undefined })).toThrow("Missing email token");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/emails/verify-code.test.ts`
Expected: FAIL with "Failed to resolve import ./verify-code".

- [ ] **Step 3: Write minimal implementation**

```ts
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
  const withCta = BODY.replace("{{cta}}", ctaButton("Verify Email", data.verifyUrl));
  // Figma renders the heading uppercase (textCase UPPER), so uppercase the name.
  const filled = fillTokens(withCta, { ...data, name: data.name.toUpperCase() });
  return emailShell("Verify your email", filled);
}
```

Why `{{cta}}` is replaced before `fillTokens`: the button HTML contains no tokens and must not be HTML-escaped; all user values still pass through `fillTokens` + `escapeHtml`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/emails/verify-code.test.ts src/emails/layout.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/emails/verify-code.ts src/emails/verify-code.test.ts
git commit -m "feat(emails): add verification-code template"
```

---

### Task 3: Welcome + password-reset templates

**Files:**
- Create: `src/emails/welcome.ts`
- Create: `src/emails/password-reset.ts`
- Create: `src/emails/auth.test.ts`

**Interfaces:**
- Consumes: `emailShell`, `ctaButton`, `fillTokens`, `BRAND`, `FONT_*` from `./layout`.
- Produces: `export interface WelcomeData { name: string; email: string; dashboardUrl: string; }`, `export function welcomeEmail(data: WelcomeData): string`, `export interface PasswordResetData { name: string; email: string; resetUrl: string; minutes: string; }`, `export function passwordResetEmail(data: PasswordResetData): string`.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from "vitest";
import { welcomeEmail } from "./welcome";
import { passwordResetEmail } from "./password-reset";

describe("welcome", () => {
  it("renders greeting and dashboard cta", () => {
    const html = welcomeEmail({ name: "Olivia", email: "olivia@deex.com", dashboardUrl: "https://deex.com/dashboard" });
    expect(html).toContain("WELCOME TO DEEX, OLIVIA");
    expect(html).toContain("Open DeeX");
    expect(html).toContain("https://deex.com/dashboard");
    expect(html).not.toContain("{{");
  });
});

describe("password-reset", () => {
  it("renders reset link with expiry", () => {
    const html = passwordResetEmail({ name: "Olivia", email: "olivia@deex.com", resetUrl: "https://deex.com/reset?t=abc", minutes: "15" });
    expect(html).toContain("RESET YOUR PASSWORD");
    expect(html).toContain("next 15 minutes");
    expect(html).toContain("https://deex.com/reset?t=abc");
    expect(html).not.toContain("{{");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/emails/auth.test.ts`
Expected: FAIL with "Failed to resolve import ./welcome".

- [ ] **Step 3: Write minimal implementation**

`src/emails/welcome.ts`:
```ts
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
  // Heading is uppercase per Figma convention; body greetings elsewhere stay verbatim.
  const filled = fillTokens(BODY.replace("{{cta}}", ctaButton("Open DeeX", data.dashboardUrl)), { ...data, name: data.name.toUpperCase() });
  return emailShell("Welcome to DeeX", filled);
}
```

`src/emails/password-reset.ts`:
```ts
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
  const filled = fillTokens(BODY.replace("{{cta}}", ctaButton("Reset Password", data.resetUrl)), { ...data });
  return emailShell("Reset your password", filled);
}
```

Note: the `{{name}}` in the welcome heading is uppercased by the builder (Figma `textCase: UPPER` convention); password-reset and receipt greetings stay verbatim.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/emails/auth.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/emails/welcome.ts src/emails/password-reset.ts src/emails/auth.test.ts
git commit -m "feat(emails): add welcome and password-reset templates"
```

---

### Task 4: Receipt template

**Files:**
- Create: `src/emails/receipt.ts`
- Create: `src/emails/receipt.test.ts`

**Interfaces:**
- Consumes: `emailShell`, `ctaButton`, `fillTokens`, `BRAND`, `FONT_*` from `./layout`.
- Produces: `export interface ReceiptData { name: string; email: string; amount: string; type: string; reference: string; date: string; receiptUrl: string; }`, `export function receiptEmail(data: ReceiptData): string`.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from "vitest";
import { receiptEmail } from "./receipt";

const data = { name: "Olivia", email: "olivia@deex.com", amount: "₦50,000.00", type: "Wallet top-up", reference: "DX-2026-000123", date: "23 Sep 2026", receiptUrl: "https://deex.com/receipt/DX-2026-000123" };

describe("receipt", () => {
  it("renders summary rows and cta", () => {
    const html = receiptEmail(data);
    expect(html).toContain("₦50,000.00");
    expect(html).toContain("Wallet top-up");
    expect(html).toContain("DX-2026-000123");
    expect(html).toContain("23 Sep 2026");
    expect(html).toContain("View Receipt");
    expect(html).not.toContain("{{");
  });

  it("escapes user content", () => {
    const html = receiptEmail({ ...data, type: "<script>alert(1)</script>" });
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/emails/receipt.test.ts`
Expected: FAIL with "Failed to resolve import ./receipt".

- [ ] **Step 3: Write minimal implementation**

```ts
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
  const filled = fillTokens(BODY.replace("{{cta}}", ctaButton("View Receipt", data.receiptUrl)), { ...data });
  return emailShell("Your DeeX receipt", filled);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/emails/receipt.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/emails/receipt.ts src/emails/receipt.test.ts
git commit -m "feat(emails): add transaction receipt template"
```

---

### Task 5: Public entry point (`renderEmail`)

**Files:**
- Create: `src/emails/index.ts`
- Create: `src/emails/index.test.ts`

**Interfaces:**
- Consumes: `verifyCodeEmail` + `VerifyCodeData`, `welcomeEmail` + `WelcomeData`, `passwordResetEmail` + `PasswordResetData`, `receiptEmail` + `ReceiptData`.
- Produces: `EmailName`, `EmailDataMap`, `renderEmail(name, data)`, `emailSamples`. Exact signatures:
```ts
export type EmailName = "verify-code" | "welcome" | "password-reset" | "receipt";
export interface EmailDataMap {
  "verify-code": VerifyCodeData;
  "welcome": WelcomeData;
  "password-reset": PasswordResetData;
  "receipt": ReceiptData;
}
export function renderEmail<N extends EmailName>(name: N, data: EmailDataMap[N]): string;
export const emailSamples: { [K in EmailName]: EmailDataMap[K] };
```

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from "vitest";
import { renderEmail, emailSamples, type EmailName } from "./index";

describe("renderEmail", () => {
  const names: EmailName[] = ["verify-code", "welcome", "password-reset", "receipt"];

  it("renders every template from samples with no leftover tokens", () => {
    for (const name of names) {
      const html = renderEmail(name, emailSamples[name] as never);
      expect(html).toContain("<!DOCTYPE html>");
      expect(html).not.toContain("{{");
    }
  });

  it("throws on unknown template", () => {
    expect(() => renderEmail("nope" as never, {} as never)).toThrow("Unknown email template");
  });

  it("throws on missing data", () => {
    expect(() => renderEmail("welcome", { name: "Olivia" } as never)).toThrow("Missing email token");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/emails/index.test.ts`
Expected: FAIL with "Failed to resolve import ./index".

- [ ] **Step 3: Write minimal implementation**

```ts
import { verifyCodeEmail, type VerifyCodeData } from "./verify-code";
import { welcomeEmail, type WelcomeData } from "./welcome";
import { passwordResetEmail, type PasswordResetData } from "./password-reset";
import { receiptEmail, type ReceiptData } from "./receipt";

export type EmailName = "verify-code" | "welcome" | "password-reset" | "receipt";

export interface EmailDataMap {
  "verify-code": VerifyCodeData;
  "welcome": WelcomeData;
  "password-reset": PasswordResetData;
  "receipt": ReceiptData;
}

export function renderEmail<N extends EmailName>(name: N, data: EmailDataMap[N]): string {
  switch (name) {
    case "verify-code":
      return verifyCodeEmail(data as VerifyCodeData);
    case "welcome":
      return welcomeEmail(data as WelcomeData);
    case "password-reset":
      return passwordResetEmail(data as PasswordResetData);
    case "receipt":
      return receiptEmail(data as ReceiptData);
    default:
      throw new Error(`Unknown email template: ${name}`);
  }
}

export const emailSamples: { [K in EmailName]: EmailDataMap[K] } = {
  "verify-code": { name: "Olivia", email: "olivia@deex.com", d1: "3", d2: "0", d3: "6", d4: "6", verifyUrl: "https://deex.com/verify?c=3066", minutes: "5" },
  welcome: { name: "Olivia", email: "olivia@deex.com", dashboardUrl: "https://deex.com/dashboard" },
  "password-reset": { name: "Olivia", email: "olivia@deex.com", resetUrl: "https://deex.com/reset?t=sample", minutes: "15" },
  receipt: { name: "Olivia", email: "olivia@deex.com", amount: "₦50,000.00", type: "Wallet top-up", reference: "DX-2026-000123", date: "23 Sep 2026", receiptUrl: "https://deex.com/receipt/DX-2026-000123" },
};
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/emails/index.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/emails/index.ts src/emails/index.test.ts
git commit -m "feat(emails): add renderEmail entry point and samples"
```

---

### Task 6: Dev-only preview route

**Files:**
- Create: `src/pages/EmailPreview.tsx`
- Modify: `src/App.tsx` (add import + dev-gated route before the `*` catch-all)

**Interfaces:**
- Consumes: `renderEmail`, `emailSamples`, `EmailName` from `@/emails`.
- Produces: default-exported `EmailPreview` page component.

- [ ] **Step 1: Create the preview page**

```tsx
import { useState } from "react";
import { renderEmail, emailSamples, type EmailName } from "@/emails";

const NAMES: EmailName[] = ["verify-code", "welcome", "password-reset", "receipt"];

/** Dev-only email template preview. Route is gated with import.meta.env.DEV. */
const EmailPreview = () => {
  const [active, setActive] = useState<EmailName>("verify-code");
  const html = renderEmail(active, emailSamples[active] as never);

  return (
    <div className="min-h-[100dvh] bg-brand-deepNavy font-roboto text-white">
      <div className="mx-auto flex w-full max-w-[900px] flex-col gap-4 px-4 py-8">
        <h1 className="font-gasoek text-2xl">EMAIL PREVIEWS (DEV ONLY)</h1>
        <div className="flex flex-wrap gap-2">
          {NAMES.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setActive(name)}
              className={`rounded-lg px-4 py-2 font-manrope text-xs font-semibold ${active === name ? "bg-brand-blue500 text-white" : "bg-[#0D1D2F] text-[#C9C9C9]"}`}
            >
              {name}
            </button>
          ))}
        </div>
        <iframe title={`Email preview: ${active}`} srcDoc={html} className="h-[80vh] w-full rounded-lg bg-white" />
      </div>
    </div>
  );
};

export default EmailPreview;
```

Class names (`bg-brand-deepNavy`, `font-gasoek`, `bg-brand-blue500`) match existing usage in `src/pages/SignUp.tsx`; if Tailwind reports unknown classes, fall back to arbitrary values already used in the codebase (`bg-[#0D1D2F]`, `bg-[#095B97]`).

- [ ] **Step 2: Wire the dev-gated route in `src/App.tsx`**

Add import (alphabetical spot near other page imports):
```tsx
import EmailPreview from "./pages/EmailPreview";
```
Add route directly above `<Route path="*" element={<NotFound />} />`:
```tsx
{import.meta.env.DEV && <Route path="/emails/preview" element={<EmailPreview />} />}
```

- [ ] **Step 3: Verify manually**

Run: `npm run dev`, open `http://localhost:5173/emails/preview`, click all four tabs.
Expected: all four templates render in the iframe with hero, body, footer. Then confirm production safety: `npm run build` succeeds and the route is absent from the production bundle path check (DEV-gated, no further action).

- [ ] **Step 4: Full test + typecheck + lint**

Run: `npm test` then `npx tsc --noEmit -p tsconfig.app.json` then `npx eslint src/emails src/pages/EmailPreview.tsx src/App.tsx`
Expected: all green. Fix any issues before committing.

- [ ] **Step 5: Commit**

```bash
git add src/pages/EmailPreview.tsx src/App.tsx
git commit -m "feat(emails): add dev-only email preview route"
```

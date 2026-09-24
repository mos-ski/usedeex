# DeeX Email System Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable operational email system with a brand-led welcome letter, a complete successful-transaction catalogue, essential account/security messages, and a fixed-sidebar fit-to-viewport preview workspace.

**Architecture:** Keep email output as email-client-safe HTML strings, but split the renderer into shared primitives, four template families, and a typed central catalogue. The preview reads directly from that catalogue, groups and searches templates in a left sidebar, and measures/scales the selected 640px email to the available viewport.

**Tech Stack:** TypeScript, React 18, Vite, Vitest, Tailwind CSS for the preview UI, table-based inline HTML/CSS for generated emails.

## Global Constraints

- Preserve the verified 640px Figma shell, hero, local assets, and production asset base.
- Follow `docs/Branding/deex_brand_direction.md`: direct, minimal, confident, user-in-control, no forced slang or generic fintech filler.
- Welcome signature is exactly `Omojuwa Divine` and `CEO, UseDeeX`.
- Transactional emails cover successful outcomes only and read as premium receipts.
- Marketing campaigns, pending/failed/reversed/refunded transactions, and lifecycle promotions are out of scope.
- All user-supplied strings must be HTML escaped and all CTA URLs must be validated as HTTP(S).
- Do not install new runtime dependencies.

---

## File Structure

- `src/emails/types.ts` — shared catalogue, payload, receipt-row, and renderer types.
- `src/emails/primitives.ts` — reusable email-safe text, receipt, badge, CTA, and sign-off HTML helpers.
- `src/emails/templates/welcome.ts` — CEO welcome letter family.
- `src/emails/templates/security.ts` — authentication, security, profile, KYC, and statement templates.
- `src/emails/templates/transactions.ts` — receipt-family builder and wallet, digital-asset, gift-card, bill, reward, referral, and virtual-card definitions.
- `src/emails/catalog.ts` — complete central registry, categories, labels, subjects, required fields, renderers, and samples.
- `src/emails/index.ts` — public `EmailName`, `EmailDataMap`, `renderEmail`, samples, and catalogue exports.
- `src/pages/EmailPreview.tsx` — two-pane searchable preview workspace and fit/100% controls.
- `src/emails/*.test.ts`, `src/pages/EmailPreview.test.tsx` — rendering, security, catalogue, and preview behavior.

---

### Task 1: Shared Email Types and Primitives

**Files:**
- Create: `src/emails/types.ts`
- Create: `src/emails/primitives.ts`
- Modify: `src/emails/layout.ts`
- Test: `src/emails/primitives.test.ts`

**Interfaces:**
- Consumes: `BRAND`, font constants, `escapeHtml`, `ctaButton`, and `emailShell` from `src/emails/layout.ts`.
- Produces: `EmailCategory`, `TemplateDefinition<T>`, `ReceiptRow`, `heading`, `paragraph`, `successBadge`, `amountHero`, `detailTable`, `teamSignOff`, `personalSignOff`, and `renderBody`.

- [ ] **Step 1: Write failing primitive tests**

```ts
import { describe, expect, it } from "vitest";
import { amountHero, detailTable, personalSignOff, successBadge } from "./primitives";

describe("email primitives", () => {
  it("escapes values rendered in receipt rows", () => {
    expect(detailTable([{ label: "Asset", value: "<b>USDT</b>" }])).toContain("&lt;b&gt;USDT&lt;/b&gt;");
  });

  it("renders the successful receipt treatment", () => {
    expect(amountHero("$1,250.00")).toContain("$1,250.00");
    expect(successBadge()).toContain("Successful");
  });

  it("renders the approved CEO signature", () => {
    const html = personalSignOff("Omojuwa Divine", "CEO, UseDeeX");
    expect(html).toContain("Omojuwa Divine");
    expect(html).toContain("CEO, UseDeeX");
  });
});
```

- [ ] **Step 2: Run the tests and verify RED**

Run: `npm test -- src/emails/primitives.test.ts`  
Expected: FAIL because `./primitives` does not exist.

- [ ] **Step 3: Add shared types**

```ts
export type EmailCategory = "onboarding" | "security" | "wallet" | "digital-assets" | "gift-cards" | "bills" | "rewards" | "virtual-card";
export type EmailPayload = Record<string, string>;
export type ReceiptRow = { label: string; value: string };

export type TemplateDefinition<T extends EmailPayload> = {
  label: string;
  category: EmailCategory;
  subject: string;
  previewText: string;
  required: readonly (keyof T)[];
  sample: T;
  render: (data: T) => string;
};
```

- [ ] **Step 4: Implement primitives with escaping at their boundary**

```ts
export const amountHero = (value: string) =>
  `<div style="font-family:${FONT_CONDENSED};font-size:40px;line-height:44px;color:${BRAND.primary};text-align:center;">${escapeHtml(value)}</div>`;

export const successBadge = () =>
  `<span style="display:inline-block;padding:6px 10px;border-radius:999px;background:#E9F9EE;color:#137A3A;font-family:${FONT_BUTTON};font-size:12px;font-weight:700;">Successful</span>`;

export const detailTable = (rows: ReceiptRow[]) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${rows.map(({ label, value }) => `<tr><td style="padding:8px 0;color:${BRAND.bodyGrey};">${escapeHtml(label)}</td><td align="right" style="padding:8px 0;color:${BRAND.black};">${escapeHtml(value)}</td></tr>`).join("")}</table>`;
```

- [ ] **Step 5: Run primitive and existing email tests**

Run: `npm test -- src/emails/primitives.test.ts src/emails/layout.test.ts src/emails/verify-code.test.ts`  
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/emails/types.ts src/emails/primitives.ts src/emails/layout.ts src/emails/primitives.test.ts
git commit -m "refactor(emails): add shared rendering primitives"
```

---

### Task 2: Welcome and Security Template Families

**Files:**
- Create: `src/emails/templates/welcome.ts`
- Create: `src/emails/templates/security.ts`
- Test: `src/emails/templates/welcome.test.ts`
- Test: `src/emails/templates/security.test.ts`

**Interfaces:**
- Consumes: primitives from Task 1.
- Produces: `welcomeDefinition` and `securityDefinitions` keyed by stable template IDs.

- [ ] **Step 1: Write failing welcome copy tests**

```ts
it("renders a personal welcome letter from the CEO", () => {
  const html = welcomeDefinition.render(welcomeDefinition.sample);
  expect(html).toContain("OLIVIA, YOUR MONEY MOVES DIFFERENTLY NOW.");
  expect(html).toContain("Omojuwa Divine");
  expect(html).toContain("CEO, UseDeeX");
  expect(html).not.toContain("seamless");
});
```

- [ ] **Step 2: Run the welcome test and verify RED**

Run: `npm test -- src/emails/templates/welcome.test.ts`  
Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the welcome definition**

```ts
type WelcomePayload = { name: string; email: string; dashboardUrl: string };

export const welcomeDefinition: TemplateDefinition<WelcomePayload> = {
  label: "Welcome to DeeX",
  category: "onboarding",
  subject: "Your money moves differently now",
  previewText: "One account. Everything your money does.",
  required: ["name", "email", "dashboardUrl"],
  sample: { name: "Olivia", email: "olivia@deex.com", dashboardUrl: "https://deex.com/dashboard" },
  render: (data) => renderLetter({
    title: `${data.name.toUpperCase()}, YOUR MONEY MOVES DIFFERENTLY NOW.`,
    paragraphs: [
      "Welcome to DeeX—the account built to move at your speed.",
      "Hold your assets. Swap them. Send money. Pay bills. Cash out when you decide. No branch. No queue. No permission.",
      "Your account is ready. Make your first move.",
    ],
    cta: { label: "Open DeeX", url: data.dashboardUrl },
    email: data.email,
    signer: { name: "Omojuwa Divine", title: "CEO, UseDeeX" },
  }),
};
```

- [ ] **Step 4: Write failing tests for security definitions**

```ts
const ids = ["verify-code", "password-reset", "login-success", "password-changed", "pin-changed", "profile-updated", "kyc-approved", "statement-ready"];

it.each(ids)("renders %s without unresolved tokens", (id) => {
  const definition = securityDefinitions[id];
  expect(definition.render(definition.sample)).not.toContain("{{");
});
```

- [ ] **Step 5: Run security tests and verify RED**

Run: `npm test -- src/emails/templates/security.test.ts`  
Expected: FAIL because `securityDefinitions` does not exist.

- [ ] **Step 6: Implement the security family**

Use a `renderSecurityMessage` helper taking `{ title, intro, details, cta?, email }`. Preserve the verified OTP layout for `verify-code`; use the shared concise account-notification layout for the other seven definitions. Login includes device, location, and time; KYC includes approved level and unlocked limits; statement-ready includes period and download CTA.

- [ ] **Step 7: Run both family test files**

Run: `npm test -- src/emails/templates/welcome.test.ts src/emails/templates/security.test.ts`  
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/emails/templates/welcome.ts src/emails/templates/security.ts src/emails/templates/*.test.ts
git commit -m "feat(emails): add welcome and security families"
```

---

### Task 3: Successful Transaction Receipt Family

**Files:**
- Create: `src/emails/templates/transactions.ts`
- Test: `src/emails/templates/transactions.test.ts`

**Interfaces:**
- Consumes: `TemplateDefinition`, `ReceiptRow`, and primitives from Task 1.
- Produces: `transactionDefinitions`, a record containing 20 successful operational scenarios.

- [ ] **Step 1: Write failing catalogue and scenario tests**

```ts
const expectedIds = [
  "wallet-deposit-success", "wallet-withdrawal-success",
  "asset-received", "asset-sent", "asset-bought", "asset-sold", "asset-swapped", "deex-pay-success",
  "gift-card-bought", "gift-card-sold",
  "airtime-success", "data-success", "electricity-success", "betting-success",
  "reward-earned", "referral-joined", "referral-reward-paid", "reward-redeemed",
  "virtual-card-created", "virtual-card-funded",
] as const;

it("contains every successful transaction scenario", () => {
  expect(Object.keys(transactionDefinitions)).toEqual(expectedIds);
});

it.each(expectedIds)("renders %s as a successful receipt", (id) => {
  const definition = transactionDefinitions[id];
  const html = definition.render(definition.sample);
  expect(html).toContain("Successful");
  expect(html).toContain("Reference");
  expect(html).toContain("Date");
  expect(html).not.toContain("{{");
});
```

- [ ] **Step 2: Run the transaction test and verify RED**

Run: `npm test -- src/emails/templates/transactions.test.ts`  
Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement one receipt factory**

```ts
type ReceiptConfig<T extends EmailPayload> = {
  label: string;
  category: EmailCategory;
  subject: string;
  headline: (data: T) => string;
  amount: (data: T) => string;
  rows: (data: T) => ReceiptRow[];
  cta: (data: T) => { label: string; url: string };
};

const receiptDefinition = <T extends BaseReceiptPayload>(config: ReceiptConfig<T>, sample: T): TemplateDefinition<T> => ({
  label: config.label,
  category: config.category,
  subject: config.subject,
  previewText: config.headline(sample),
  required: Object.keys(sample) as (keyof T)[],
  sample,
  render: (data) => renderReceipt({ ...config, data }),
});
```

- [ ] **Step 4: Add all 20 definitions with scenario-specific rows**

Each sample includes `name`, `email`, `reference`, `date`, and a relevant URL. Add only relevant fields:

- wallet: amount, bank/account destination;
- asset movement: asset, quantity, network, address/hash;
- swap: from amount, to amount, rate;
- gift card: brand, denomination/value, payout or delivery;
- bills: provider plus phone, plan, meter/token, or betting customer ID;
- rewards/referrals: points, cash value, referred user, reason;
- virtual card: masked card, funding amount, currency.

- [ ] **Step 5: Run transaction tests**

Run: `npm test -- src/emails/templates/transactions.test.ts`  
Expected: PASS for all 20 definitions.

- [ ] **Step 6: Commit**

```bash
git add src/emails/templates/transactions.ts src/emails/templates/transactions.test.ts
git commit -m "feat(emails): add successful transaction receipts"
```

---

### Task 4: Central Typed Catalogue and Public Renderer

**Files:**
- Create: `src/emails/catalog.ts`
- Modify: `src/emails/index.ts`
- Modify: `src/emails/index.test.ts`
- Remove after migration: `src/emails/welcome.ts`, `src/emails/password-reset.ts`, `src/emails/receipt.ts`

**Interfaces:**
- Consumes: all definitions from Tasks 2 and 3.
- Produces: `emailCatalog`, `emailCategories`, `EmailName`, `EmailDataMap`, `renderEmail`, and `emailSamples`.

- [ ] **Step 1: Expand the failing registry test**

```ts
it("renders every registered sample safely", () => {
  expect(Object.keys(emailCatalog)).toHaveLength(29);
  for (const [id, definition] of Object.entries(emailCatalog)) {
    const html = renderEmail(id as EmailName, definition.sample as never);
    expect(html, id).toContain("<!DOCTYPE html>");
    expect(html, id).not.toContain("{{");
  }
});

it("has unique labels inside every category", () => {
  for (const category of emailCategories) {
    const labels = category.templateIds.map((id) => emailCatalog[id].label);
    expect(new Set(labels).size).toBe(labels.length);
  }
});
```

- [ ] **Step 2: Run registry tests and verify RED**

Run: `npm test -- src/emails/index.test.ts`  
Expected: FAIL because the catalogue still contains only four templates.

- [ ] **Step 3: Compose the catalogue**

```ts
export const emailCatalog = {
  welcome: welcomeDefinition,
  ...securityDefinitions,
  ...transactionDefinitions,
} as const;

export type EmailName = keyof typeof emailCatalog;
export type EmailDataMap = { [K in EmailName]: (typeof emailCatalog)[K]["sample"] };
```

Define ordered category metadata with labels `Onboarding`, `Security & account`, `Wallet`, `Digital assets`, `Gift cards`, `Bills`, `Rewards & referrals`, and `Virtual card`.

- [ ] **Step 4: Replace the switch renderer with registry dispatch and pre-validation**

```ts
export function renderEmail<N extends EmailName>(name: N, data: EmailDataMap[N]): string {
  const definition = emailCatalog[name];
  if (!definition) throw new Error(`Unknown email template: ${name}`);
  const record = (data ?? {}) as Record<string, string>;
  for (const key of definition.required) {
    if (record[String(key)] === undefined) throw new Error(`Missing email token: ${String(key)}`);
  }
  return definition.render(data as never);
}
```

- [ ] **Step 5: Run all email tests**

Run: `npm test -- src/emails`  
Expected: PASS.

- [ ] **Step 6: Remove superseded standalone template files and update imports**

Delete only after all callers use `src/emails/index.ts`. Keep `verify-code.ts` if the security family imports its verified renderer.

- [ ] **Step 7: Commit**

```bash
git add src/emails
git commit -m "refactor(emails): centralize typed template catalogue"
```

---

### Task 5: Left-Navigation Fit-to-Viewport Preview

**Files:**
- Modify: `src/pages/EmailPreview.tsx`
- Create: `src/pages/EmailPreview.test.tsx`

**Interfaces:**
- Consumes: `emailCatalog`, `emailCategories`, `emailSamples`, `renderEmail`, and `EmailName` from Task 4.
- Produces: searchable category navigation, selected-template preview, fit scaling, and 100% inspection mode.

- [ ] **Step 1: Write failing preview behavior tests**

```tsx
it("renders grouped navigation and switches templates", async () => {
  render(<EmailPreview />);
  expect(screen.getByRole("navigation", { name: "Email templates" })).toBeInTheDocument();
  expect(screen.getByText("Digital assets")).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "Asset swapped" }));
  expect(screen.getByTitle("Email preview: asset-swapped")).toBeInTheDocument();
});

it("filters the sidebar by label", async () => {
  render(<EmailPreview />);
  await userEvent.type(screen.getByPlaceholderText("Search templates"), "electricity");
  expect(screen.getByRole("button", { name: "Electricity payment" })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "Welcome to DeeX" })).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run preview tests and verify RED**

Run: `npm test -- src/pages/EmailPreview.test.tsx`  
Expected: FAIL because the current page uses horizontal tabs and has no search/navigation landmark.

- [ ] **Step 3: Implement grouped sidebar and search**

Use a desktop grid `grid-cols-[260px_minmax(0,1fr)]`, a viewport-height shell, sticky sidebar, category headings, and registry-driven buttons. On narrow screens, expose the same catalogue through a compact selector above the canvas.

- [ ] **Step 4: Implement Fit and 100% modes**

```ts
const [zoomMode, setZoomMode] = useState<"fit" | "actual">("fit");
const [emailHeight, setEmailHeight] = useState(1024);
const [viewport, setViewport] = useState({ width: 640, height: 1024 });
const scale = zoomMode === "fit" ? Math.min(1, viewport.width / 640, viewport.height / emailHeight) : 1;
```

On iframe load, read `iframe.contentDocument?.documentElement.scrollHeight`; observe the canvas container with `ResizeObserver`; render a 640px iframe inside a wrapper sized to `640 * scale` by `emailHeight * scale`; apply `transform: scale(scale)` with top-left origin. Outer page remains fixed; actual-size mode scrolls only the canvas pane.

- [ ] **Step 5: Run preview tests**

Run: `npm test -- src/pages/EmailPreview.test.tsx`  
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/pages/EmailPreview.tsx src/pages/EmailPreview.test.tsx
git commit -m "feat(emails): add catalogue preview workspace"
```

---

### Task 6: Full Verification and Visual QA

**Files:**
- Modify only files with failures proven to be in scope.

**Interfaces:**
- Consumes: completed catalogue and preview.
- Produces: verified implementation and an evidence-backed completion report.

- [ ] **Step 1: Run email and preview tests**

Run: `npm test -- src/emails src/pages/EmailPreview.test.tsx`  
Expected: all in-scope tests PASS.

- [ ] **Step 2: Run the full project test suite**

Run: `npm test`  
Expected: report the known unrelated survey-count failure separately if it remains; no new email or preview failures.

- [ ] **Step 3: Run the production build**

Run: `npm run build`  
Expected: exit code 0.

- [ ] **Step 4: Run lint**

Run: `npm run lint`  
Expected: no new errors in changed files; report existing unrelated errors separately.

- [ ] **Step 5: Visually verify desktop Fit mode**

Open `http://127.0.0.1:8080/emails/preview`. Verify the sidebar remains visible, search works, every category opens a template, and the full selected email fits without outer-page scrolling.

- [ ] **Step 6: Visually verify narrow layout and assets**

At a narrow viewport, verify navigation remains usable and the email fits the canvas. For each visible image in representative welcome, security, and receipt templates, confirm the local asset loads with non-zero natural dimensions and correct rendered geometry.

- [ ] **Step 7: Review the final diff for scope**

Run: `git status --short && git diff --check && git diff --stat`  
Expected: only email-system, preview, test, asset, spec, and plan changes are attributed to this work; unrelated user edits remain untouched.

- [ ] **Step 8: Commit verification fixes if any**

```bash
git add src/emails src/pages/EmailPreview.tsx src/pages/EmailPreview.test.tsx public/emails
git commit -m "test(emails): verify expanded template system"
```

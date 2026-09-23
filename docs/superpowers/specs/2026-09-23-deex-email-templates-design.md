# DeeX Transactional Email Templates Design

**Date:** 2026-09-23
**Status:** Approved
**Source:** Figma `New DeeX` (`8Yje6j71JNtHk6SNKuHKfv`), node `219:7051` (verification-code email)
**Approach:** Hand-coded table HTML + TS partials + renderer (no new dependencies)

## Goal

Ship four email-client-safe HTML email templates in the Figma style — blue hero
banner, centered body, shared footer — with `{{token}}` personalization, a single
typed `renderEmail(name, data)` entry point for the backend, and a dev-only
preview route for visual sign-off.

## Templates (all share hero + footer)

1. **verify-code** — the Figma node verbatim: `HI {{name}},` heading, 4 digit
   boxes (`{{d1}}`–`{{d4}}`), expiry + fallback-link paragraph (`{{minutes}}`,
   `{{verifyUrl}}`), `Verify Email` button, `Thanks, The team` sign-off.
2. **welcome** — greeting + short value props + `Open DeeX` button
   (`{{dashboardUrl}}`).
3. **password-reset** — expiry-aware reset CTA (`{{resetUrl}}`, `{{minutes}}`).
4. **receipt** — transaction summary table (`{{amount}}`, `{{type}}`,
   `{{reference}}`, `{{date}}`) + `View receipt` button (`{{receiptUrl}}`).

## Architecture

- `src/emails/layout.ts` — hero + footer partials, brand constants
  (colors `#0B75C2` / `#D0EBFF` / `#6B6B6B`, widths, font stacks).
- `src/emails/<template>.ts` — one module per template, exports HTML builder.
- `src/emails/index.ts` — `renderEmail(name, data)` + `EmailData` types.
  Throws on missing tokens; warns/errors on unreplaced `{{...}}`.
- `src/emails/assets/` — DeeX logo, X/FB/IG icons, wave PNG exported from
  Figma, referenced via configurable `DEEX_EMAIL_ASSET_BASE_URL` (email
  clients block local paths).
- `src/emails/emails.test.ts` — every template renders with sample data, no
  `{{` remains, missing data throws.
- Dev-only `/emails/preview` route rendering each template in an iframe.

## Figma → email-client translation

- Tables + inline styles only; 640px container, fluid `max-width:640px` for
  mobile.
- Webfonts replaced with email-safe stacks: `'Roboto Condensed', Arial Narrow,
  Arial, sans-serif` for headings; `'Roboto Mono', Courier New, monospace`
  for code digits; Manrope/Roboto body falls back to Arial/Helvetica.
- Wavy hero SVG becomes a PNG background over a `#D0EBFF` fallback (SVG and
  absolute positioning are unsupported in most clients).
- The overlapping hero illustration could not be extracted (empty frames in
  Figma data): reuse a fitting app illustration if one exists, otherwise ship
  the hero clean (blue + wave + logo).
- Copy rebranded to DeeX (`The DeeX team`, sender `noreply@deex.com`);
  physical footer address to be confirmed at implementation.
  Figma structure and 5-minute expiry wording preserved for verify-code.

## Testing

Vitest coverage per template (renders, no leftover tokens, missing-data
throws) plus visual sign-off via the preview route.

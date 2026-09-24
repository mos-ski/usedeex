# DeeX Email System Expansion — Design Specification

**Date:** 2026-09-24  
**Status:** Approved for planning  
**Source of truth:** DeeX brand direction and guide, product PRDs, and the current user app's Menu, Activity, Notifications, Profile, Security, KYC, Rewards, Gift Card, Bill Payment, Crypto, Wallet, and Virtual Card flows.

## Objective

Turn the existing four-template prototype into a maintainable operational email system. It must express the DeeX brand consistently, cover the user app's successful transaction and essential account/security scenarios, and provide a preview workspace where the full email can be reviewed without scrolling the outer page.

Marketing campaigns, promotional lifecycle messages, pending transactions, failed transactions, reversals, and refunds are outside this release.

## Brand Voice

The email voice follows the repository's verbal identity:

- Direct, minimal, confident, and written to one person.
- Short declarative sentences in active voice.
- The user is in control; DeeX keeps up.
- Successful transactions create a “loud win”: clear completion, confidence, and momentum.
- Security and account messages create a “quiet win”: calm, factual, and reassuring without over-explaining.
- Use `DeeX` in product copy and `UseDeeX` in the CEO's title/signature.
- Avoid pidgin, forced slang, generic fintech language, defensive trust claims, and unnecessary repetition of “crypto” or “dollars.”

The welcome email is a personal letter signed:

> Omojuwa Divine  
> CEO, UseDeeX

It explains what DeeX is for, frames the user's money as under their control, and points to a small set of useful first actions. It is not formatted as a receipt.

## Architecture

### Shared primitives

The system will retain email-client-safe table markup and add focused render helpers:

- document shell, brand hero, and footer;
- typography and spacing tokens;
- heading, paragraph, divider, and callout;
- primary CTA and safe text link;
- status badge and success mark;
- amount/value hero;
- labelled detail rows and receipt summary card;
- personal and team sign-offs;
- escaping, required-token validation, and safe URL validation.

Primitives return HTML strings and have no scenario knowledge. A global visual change is made once and flows into every template.

### Template families

1. **Letter** — personal, left-aligned editorial layout for the CEO welcome.
2. **Authentication and security** — concise alert or action layout for verification, reset, login, credential changes, and profile/KYC updates.
3. **Transaction receipt** — successful state, amount/value, scenario-specific details, reference, timestamp, and one useful CTA.
4. **Account notification** — operational confirmation that is not a monetary receipt, such as a statement becoming available.

Templates compose primitives and supply scenario-specific copy and fields. They do not duplicate the shared shell.

### Typed catalogue

A central registry is the single source of truth for:

- stable template ID;
- human label and category;
- subject line and preview text;
- renderer;
- required typed payload;
- representative sample data.

The renderer, preview navigation, tests, and later backend integration all consume this registry. Unknown templates and missing required values fail explicitly. User-supplied values are escaped before insertion; CTA URLs accept only safe HTTP(S) schemes.

## Template Catalogue

### Onboarding and access

- Welcome letter
- Verify email code
- Password reset

### Security and account

- Successful login alert
- Password changed
- PIN changed
- Profile updated
- KYC level approved
- Statement ready

### Wallet and money movement

- Naira wallet top-up/deposit successful
- Naira withdrawal successful

### Digital assets

- Asset received
- Asset sent
- Asset bought
- Asset sold
- Asset swapped
- DeeX Pay payment successful

### Gift cards

- Gift card purchase successful
- Gift card sale approved/paid

### Bills

- Airtime purchase successful
- Data purchase successful
- Electricity payment successful
- Betting wallet funding successful

### Rewards and referrals

- Reward earned
- Referral joined
- Referral reward paid
- Reward redeemed

### Virtual card

- Virtual card created
- Virtual card funded

All transaction emails cover successful outcomes only. Each receipt uses only fields relevant to its scenario—for example network and transaction hash for an asset transfer, meter token for electricity, or phone number and provider for airtime.

## Preview Workspace

The development-only preview becomes a two-pane workspace.

### Left navigation

- Fixed/sticky sidebar on desktop.
- Templates grouped under the catalogue categories above.
- Search filters labels and categories.
- Clear selected state and template count.
- On narrow screens, the sidebar becomes a compact drawer or selector so the preview remains usable.

### Preview canvas

- The right pane uses the remaining viewport height.
- The selected 640px email is measured and uniformly scaled down to fit the available width and height, so its full composition is visible without scrolling the outer page.
- A `Fit` / `100%` control permits close inspection. At 100%, only the canvas pane may scroll; navigation remains fixed.
- Switching templates preserves the chosen zoom mode.
- Sample-data rendering errors are shown in the canvas rather than breaking the entire workspace.

## Receipt Composition

Successful transaction emails follow a consistent hierarchy:

1. Brand hero.
2. Short success headline in the “loud win” voice.
3. Amount or primary value.
4. Status badge (`Successful`).
5. Scenario-specific detail card.
6. Reference and timestamp.
7. One relevant CTA such as `View receipt`, `Open wallet`, or `View rewards`.
8. Concise brand sign-off and shared footer.

The content should feel like a premium proof of completion, not an advertisement.

## Responsive and Email Constraints

- Generated email width remains 640px maximum.
- Markup remains table-based with inline CSS and conservative email-client features.
- Critical information is text, never embedded only in artwork.
- Decorative assets include empty alt text; meaningful assets include concise alt text.
- The local preview rewrites the production asset base only in development.
- Mobile styles preserve readable type and allow receipt rows to wrap without hiding values.

## Testing and Verification

- Unit tests for every primitive's escaping, URL safety, and token handling.
- Registry test that renders every sample with no unresolved tokens.
- Catalogue tests for unique IDs, category membership, required payloads, and scenario-specific receipt fields.
- Copy assertions for the CEO signature and core brand lines where they are part of the product requirement.
- Production build verification.
- Browser visual QA of the preview workspace at desktop and narrow widths.
- Asset QA: every visible static asset must exist locally, load successfully, and render in the intended slot.

Pre-existing unrelated test or lint failures will be reported separately and will not be silently modified as part of this work.

## Delivery Sequence

1. Refactor shared primitives and typed catalogue without regressing the verified Figma template.
2. Build the new left-navigation, fit-to-viewport preview workspace.
3. Implement the welcome letter and authentication/security family.
4. Implement the reusable transaction receipt family and scenario catalogue.
5. Add account, rewards/referrals, virtual card, and statement notifications.
6. Run automated and visual verification across the full catalogue.

## Success Criteria

- Every listed operational scenario is selectable and renders from the central registry.
- A shared primitive change updates all relevant templates.
- The welcome email reads as a personal letter from Omojuwa Divine, CEO, UseDeeX.
- Transaction emails look and read like clear premium receipts.
- The full selected email is visible in Fit mode without scrolling the outer preview page.
- No template contains unresolved tokens, unsafe URLs, missing assets, or unescaped user data.
